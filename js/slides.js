// ─────────────────────────────────────────────
// js/slides.js — Slide Navigation & Progress
// ─────────────────────────────────────────────

// ── SLIDE NAVIGATION ──────────────────────────
function goToSlide(slideIdx) {
  if (slideIdx < 0 || slideIdx >= totalSlides) return;

  stopSeekTimer();

  document.getElementById(`slide-${currentSlide}`).classList.remove('active');
  document.getElementById(`outline-item-${currentSlide}`).classList.remove('active');

  currentSlide = slideIdx;

  document.getElementById(`slide-${currentSlide}`).classList.add('active');
  const outlineNode = document.getElementById(`outline-item-${currentSlide}`);
  outlineNode.classList.add('active');
  outlineNode.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Update header title and slide counter
  playerActiveTitle.innerText = outlineNode.querySelector('.outline-title').innerText;
  slideCountBadge.innerText   = `${currentSlide + 1} of ${totalSlides}`;

  // Update transcript text
  const transText = slideTranscripts[currentSlide] || 'No transcript available.';
  document.getElementById('transcript-text').innerText = transText;

  // Auto-complete simple content slides instantly so user doesn't wait on a hidden timer
  if (![3, 4, 5, 6, 9, 16, 17, 18, 19, 20, 21, 22, 23, 24].includes(slideIdx)) {
    slideCompleted[slideIdx] = true;
    const outline = document.getElementById(`outline-item-${slideIdx}`);
    if (outline) outline.classList.add('completed');
  }

  // Reset and start progress
  slideProgressPercent = 0;
  updateProgressBar();

  if (slideCompleted[currentSlide]) {
    slideProgressPercent = 100;
    updateProgressBar();
    updateControls();
  } else {
    startPlay();
  }

  // Restore quiz state when revisiting a quiz slide
  if ([3, 5, 9, 16].includes(slideIdx)) {
    restoreQuizState(slideIdx);
  }

  // Certificate slide
  if (currentSlide === 24) validateCertNameInput();

  // Results slide
  if (currentSlide === 23) showQuizResults();

  // Slide 1 interactive diagram sync
  if (slideIdx === 1) {
    setTimeout(() => {
      syncDiagramPlayPause(isPlaying);
      syncDiagramVolume(soundEnabled);
      updateProgressBar();
      updateControls();
    }, 50);
  }

  // Restore interactive UI state if bookmarked
  restoreSlideInteractionUI(slideIdx);

  // Save to SCORM
  if (typeof saveStateToScorm === 'function') {
    saveStateToScorm();
  }
}

function changeSlideRedesign(direction) {
  goToSlide(currentSlide + direction);
}

// Restore full quiz UI when navigating back to a quiz slide
function restoreQuizState(slideIdx) {
  if (slideIdx === 16) {
    const tableContainer = document.getElementById('quiz-matrix-container-16');
    const feedbackContainer = document.getElementById('quiz-feedback-container-16');
    const submitBtn = document.getElementById('btn-quiz-submit-16');

    // Hide all feedback cards initially
    document.getElementById('matrix-feedback-correct-16').style.display = 'none';
    document.getElementById('matrix-feedback-try-again-16').style.display = 'none';
    document.getElementById('matrix-feedback-incorrect-16').style.display = 'none';

    if (slideCompleted[16]) {
      if (tableContainer) tableContainer.style.display = 'none';
      if (feedbackContainer) feedbackContainer.style.display = 'block';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.remove('active');
      }

      // Check if user answer is correct to show appropriate card
      const correctGrid = [
        [false, true, false, false],
        [true, false, false, false],
        [false, false, false, true],
        [false, false, true, false]
      ];
      let isCorrect = true;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (selectedQuizChoices[16][r][c] !== correctGrid[r][c]) {
            isCorrect = false;
            break;
          }
        }
        if (!isCorrect) break;
      }

      if (isCorrect) {
        document.getElementById('matrix-feedback-correct-16').style.display = 'block';
      } else {
        document.getElementById('matrix-feedback-incorrect-16').style.display = 'block';
      }
      
      // Disable checkboxes
      document.querySelectorAll('.matrix-check').forEach(chk => chk.disabled = true);
    } else {
      if (tableContainer) tableContainer.style.display = 'block';
      if (feedbackContainer) feedbackContainer.style.display = 'none';

      // Restore checkbox checked states from selectedQuizChoices[16]
      const checkboxes = document.querySelectorAll('.matrix-check');
      checkboxes.forEach((chk, idx) => {
        const r = Math.floor(idx / 4);
        const c = idx % 4;
        chk.checked = selectedQuizChoices[16][r][c];
        chk.disabled = false;
      });

      // Restore submit button state
      const hasSelection = selectedQuizChoices[16].some(r => r.some(c => c === true));
      if (submitBtn) {
        if (hasSelection) {
          submitBtn.disabled = false;
          submitBtn.classList.add('active');
        } else {
          submitBtn.disabled = true;
          submitBtn.classList.remove('active');
        }
      }
    }
    return;
  }

  const wrapper = document.getElementById(`feedback-card-wrapper-${slideIdx}`);
  if (!wrapper) return;
  wrapper.querySelectorAll('.quiz-feedback-card').forEach(card => card.classList.remove('active'));

  const selectedOption = selectedQuizChoices[slideIdx];
  const group          = document.getElementById(`quiz-options-${slideIdx}`);
  const submitBtn      = document.getElementById(`btn-quiz-submit-${slideIdx}`);

  if (slideCompleted[slideIdx]) {
    const isCorrect = selectedOption === quizCorrectMapping[slideIdx];
    const cardId    = isCorrect ? `quiz-correct-${slideIdx}` : `quiz-incorrect-${slideIdx}`;
    document.getElementById(cardId).classList.add('active');
    group.querySelectorAll('.quiz-option-row').forEach((row, idx) => {
      row.classList.add('disabled');
      row.classList.toggle('selected', idx === selectedOption);
    });
    submitBtn.disabled = true;
    submitBtn.classList.remove('active');
  } else {
    group.querySelectorAll('.quiz-option-row').forEach((row, idx) => {
      row.classList.remove('disabled');
      row.classList.toggle('selected', selectedOption !== null && idx === selectedOption);
    });
    if (selectedOption !== null) {
      submitBtn.disabled = false;
      submitBtn.classList.add('active');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('active');
    }
  }
}

// ── PROGRESS SIMULATION ───────────────────────
function startPlay() {
  isPlaying = true;
  if (playIcon) playIcon.style.display = 'none';
  if (pauseIcon) pauseIcon.style.display = 'block';
  syncDiagramPlayPause(true);

  if (slideTimer) clearInterval(slideTimer);

  slideTimer = setInterval(() => {
    if (!isSlideLockedByInteractions(currentSlide)) {
      slideProgressPercent += 5;
      if (slideProgressPercent >= 100) {
        slideProgressPercent = 100;
        markSlideComplete(currentSlide);
        stopSeekTimer();
      }
      updateProgressBar();
    }
  }, Math.round(350 / playbackSpeed));
}

function pausePlay() {
  isPlaying = false;
  if (playIcon) playIcon.style.display = 'block';
  if (pauseIcon) pauseIcon.style.display = 'none';
  if (slideTimer) clearInterval(slideTimer);
  syncDiagramPlayPause(false);
}

function stopSeekTimer() {
  isPlaying = false;
  if (playIcon) playIcon.style.display = 'block';
  if (pauseIcon) pauseIcon.style.display = 'none';
  if (slideTimer) clearInterval(slideTimer);
  syncDiagramPlayPause(false);
}

function togglePlayPause() {
  if (isPlaying) { pausePlay(); } else { startPlay(); }
}

// ── PROGRESS BAR ──────────────────────────────
function updateProgressBar() {
  if (seekFill)   seekFill.style.width   = `${slideProgressPercent}%`;
  if (seekHandle) seekHandle.style.left  = `${slideProgressPercent}%`;

  const diagSeekFill = document.getElementById('diag-seek-fill');
  const diagSeekHandle = document.getElementById('diag-seek-handle');
  if (diagSeekFill && diagSeekHandle) {
    diagSeekFill.style.width = `${slideProgressPercent}%`;
    diagSeekHandle.style.left = `${slideProgressPercent}%`;
  }
}

// ── SLIDE COMPLETION ──────────────────────────
function markSlideComplete(slideIdx) {
  slideCompleted[slideIdx] = true;
  const outlineNode = document.getElementById(`outline-item-${slideIdx}`);
  if (outlineNode) outlineNode.classList.add('completed');
  updateControls();

  if (typeof saveStateToScorm === 'function') {
    saveStateToScorm();
  }
}

// ── BUTTON STATE ──────────────────────────────
function updateControls() {
  if (btnPrev) btnPrev.disabled = (currentSlide === 0);
  if (btnNext) btnNext.disabled = !slideCompleted[currentSlide];

  const diagPrev = document.getElementById('diag-prev-btn');
  const diagNext = document.getElementById('diag-next-btn');
  if (diagPrev) diagPrev.disabled = (currentSlide === 0);
  if (diagNext) diagNext.disabled = !slideCompleted[currentSlide];
}

// ── SLIDE INTERACTION LOCKS ───────────────────
function isSlideLockedByInteractions(slideIdx) {
  if (slideIdx === 4) {
    return !Object.values(slideInteractions[4]).every(v => v === true);
  }
  if (slideIdx === 6) {
    return !Object.values(slideInteractions[6]).every(v => v === true);
  }
  if (slideIdx === 17) {
    return !Object.values(slideInteractions[17]).every(v => v === true);
  }
  if (slideIdx === 18) {
    return !Object.values(slideInteractions[18]).every(v => v === true);
  }
  if (slideIdx === 19) {
    return !slideInteractions[19].videoPlayed;
  }
  if (slideIdx === 20) {
    return !Object.values(slideInteractions[20]).every(v => v === true);
  }
  if (slideIdx === 21) {
    return !Object.values(slideInteractions[21]).every(v => v === true);
  }
  if (slideIdx === 22) {
    return !Object.values(slideInteractions[22]).every(v => v === true);
  }
  if ([3, 5, 9, 16, 23, 24].includes(slideIdx)) {
    return !slideCompleted[slideIdx];
  }
  return false;
}

// Slide 4 timeline node click handler
function triggerSlideInteraction(slideIdx, elementKey, elementDOM) {
  if (slideIdx !== 4) return;

  slideInteractions[4][elementKey] = true;
  elementDOM.parentElement.querySelectorAll('.mini-timeline-item').forEach(item => item.classList.remove('clicked'));
  elementDOM.classList.add('clicked');
  elementDOM.classList.add('visited');

  // Update timeline connector progress bar height based on which steps have been visited
  const steps = slideInteractions[4];
  const progressBar = document.getElementById('timeline-progress-bar-4');
  if (progressBar) {
    let visitedCount = 0;
    if (steps.step1) visitedCount++;
    if (steps.step2) visitedCount++;
    if (steps.step3) visitedCount++;

    if (visitedCount === 1) progressBar.style.height = '0%';
    else if (visitedCount === 2) progressBar.style.height = '50%';
    else if (visitedCount === 3) progressBar.style.height = '100%';
  }

  const detailBox = document.getElementById('step-detail-container');
  const details = {
    step1: `<div class="fade-in-slide-up premium-detail-card">
              <div class="detail-card-badge initiation">STEP 01 • INITIATION</div>
              <h4 class="detail-card-title">Initiation & Scope</h4>
              <p class="detail-card-description">
                The initiator officially triggers the Change Advice Notice (CAN) workflow by documenting the baseline configuration modification scope, attaching initial redlines, and establishing the formal engineering rationale.
              </p>
              
              <div class="detail-card-section">
                <span class="section-subtitle-text">ACTIVE CHECKLIST DELIVERABLES:</span>
                <ul class="checklist-deliverables">
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Establish formal change scope and boundary maps in database.</span>
                  </li>
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Attach baseline engineering documents and initial redlines.</span>
                  </li>
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Assess preliminary risk indices and select standard or urgent path.</span>
                  </li>
                </ul>
              </div>
              
              <div class="detail-card-role-panel">
                <div class="role-avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div class="role-text-block">
                  <span class="role-label">RESPONSIBLE ROLE</span>
                  <strong class="role-name">CAN Initiator & Field Engineer</strong>
                </div>
              </div>
            </div>`,
    step2: `<div class="fade-in-slide-up premium-detail-card">
              <div class="detail-card-badge assessment">STEP 02 • ASSESSMENT</div>
              <h4 class="detail-card-title">Engineering Assessment</h4>
              <p class="detail-card-description">
                Discipline safety specialists review drawing boundaries (P&IDs), verify materials limits, and complete rigorous hazard reviews (HAZOP/HAZID) mapping barrier tolerances.
              </p>
              
              <div class="detail-card-section">
                <span class="section-subtitle-text">ACTIVE CHECKLIST DELIVERABLES:</span>
                <ul class="checklist-deliverables">
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Piping & Instrumentation Diagram (P&ID) limit validation.</span>
                  </li>
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Hazard Review compliance (HAZID, HAZOP) mapping barrier status.</span>
                  </li>
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Verify structural limits and material bounds calculations.</span>
                  </li>
                </ul>
              </div>
              
              <div class="detail-card-role-panel" style="border-left-color: var(--primary-teal-light);">
                <div class="role-avatar" style="background-color: rgba(44, 80, 100, 0.1); color: var(--primary-teal-light);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div class="role-text-block">
                  <span class="role-label">RESPONSIBLE ROLE</span>
                  <strong class="role-name">Lead Safety Specialists</strong>
                </div>
              </div>
            </div>`,
    step3: `<div class="fade-in-slide-up premium-detail-card">
              <div class="detail-card-badge approvals">STEP 03 • APPROVALS</div>
              <h4 class="detail-card-title">Authorization & Approvals</h4>
              <p class="detail-card-description">
                The designated Technical Authority (TA) performs secondary safety assurance verification. Final operational execution release is signed off and activated.
              </p>
              
              <div class="detail-card-section">
                <span class="section-subtitle-text">ACTIVE CHECKLIST DELIVERABLES:</span>
                <ul class="checklist-deliverables">
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Technical Authority assurance review & formal approvals.</span>
                  </li>
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Review regulatory notifications and boundary constraints.</span>
                  </li>
                  <li>
                    <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Release certified CAN package for execution deployment.</span>
                  </li>
                </ul>
              </div>
              
              <div class="detail-card-role-panel" style="border-left-color: #24ac7d;">
                <div class="role-avatar" style="background-color: rgba(36, 172, 125, 0.1); color: #24ac7d;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div class="role-text-block">
                  <span class="role-label">RESPONSIBLE ROLE</span>
                  <strong class="role-name">Technical Authority & Operations Manager</strong>
                </div>
              </div>
            </div>`
  };

  if (detailBox && details[elementKey]) {
    detailBox.innerHTML = details[elementKey];
    detailBox.className = "step-detail-active";
  }

  if (!isSlideLockedByInteractions(4)) {
    markSlideComplete(4);
    const warning = document.getElementById('slide-lock-warning-4');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>CAN 100 Process unlocked! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

// ── SIDEBAR ───────────────────────────────────
function updateSidebarMenu() {
  slideCompleted.forEach((done, idx) => {
    const item = document.getElementById(`outline-item-${idx}`);
    if (item) item.classList.toggle('completed', done);
  });
}

function switchSidebarTab(tabName) {
  document.querySelectorAll('.sidebar-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.sidebar-tab-content').forEach(content => content.classList.remove('active'));
  document.getElementById(`tab-btn-${tabName}`).classList.add('active');
  document.getElementById(`tab-content-${tabName}`).classList.add('active');
  const searchBox = document.getElementById('sidebar-search-box');
  if (searchBox) searchBox.style.display = (tabName === 'menu') ? 'block' : 'none';
}

function filterOutlineList() {
  const query = document.getElementById('outline-search').value.toLowerCase();
  document.querySelectorAll('.outline-item').forEach(item => {
    const title = item.querySelector('.outline-title').innerText.toLowerCase();
    item.style.display = title.includes(query) ? 'flex' : 'none';
  });
}

// Seek bar click handler (kept for seek-track-bar element if present)
function seekSlideTimeline(event) {
  const seekTrack = document.getElementById('seek-track-bar');
  if (!seekTrack) return;
  const rect       = seekTrack.getBoundingClientRect();
  const percentage = Math.round(((event.clientX - rect.left) / rect.width) * 100);
  slideProgressPercent = slideCompleted[currentSlide]
    ? Math.max(0, Math.min(percentage, 100))
    : Math.max(0, Math.min(percentage, 99));
  updateProgressBar();
  if (isPlaying) startPlay();
}

// ── DIAGRAM SYNC FUNCS ────────────────────────
function seekFromDiagram(event) {
  const track = document.getElementById('diag-seek-track');
  if (!track) return;
  
  const rect = track.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = Math.round((clickX / rect.width) * 100);
  
  if (slideCompleted[currentSlide]) {
    slideProgressPercent = Math.max(0, Math.min(percentage, 100));
  } else {
    slideProgressPercent = Math.max(0, Math.min(percentage, 99));
  }
  updateProgressBar();
  
  if (isPlaying) {
    startPlay();
  }
}

function syncDiagramPlayPause(isPlayingState) {
  const diagPlay = document.getElementById('diag-play-icon');
  const diagPause = document.getElementById('diag-pause-icon');
  if (diagPlay && diagPause) {
    if (isPlayingState) {
      diagPlay.style.display = 'none';
      diagPause.style.display = 'block';
    } else {
      diagPlay.style.display = 'block';
      diagPause.style.display = 'none';
    }
  }
}

function syncDiagramVolume(enabled) {
  const diagVolOn = document.getElementById('diag-vol-on-svg');
  const diagVolOff = document.getElementById('diag-vol-off-svg');
  if (diagVolOn && diagVolOff) {
    if (enabled) {
      diagVolOn.style.display = 'block';
      diagVolOff.style.display = 'none';
    } else {
      diagVolOn.style.display = 'none';
      diagVolOff.style.display = 'block';
    }
  }
}

// ── CAN 400 INTERACTIVE SIMULATION ────────────
function triggerAlarmReview() {
  if (slideInteractions[6].alarmReviewed) return;

  const btn = document.getElementById('btn-sim-alarm');
  if (btn) {
    btn.disabled = true;
    btn.classList.remove('pulsing');
    btn.innerText = 'Board Review Active...';
  }

  // Simulate digital board review check-offs
  let count = 0;
  const interval = setInterval(() => {
    count += 20;
    if (count >= 100) {
      clearInterval(interval);
      slideInteractions[6].alarmReviewed = true;
      
      const gauge = document.getElementById('gauge-node-400');
      const val = document.getElementById('gauge-val-400');
      const badge = document.getElementById('gauge-badge-400');
      const card = document.getElementById('sim-card-alarm');
      
      if (gauge) gauge.className = 'gauge-outer approved-gauge';
      if (val) {
        val.className = 'gauge-readout approved-glow';
        val.innerText = '82.5'; // Approved limit
      }
      if (badge) {
        badge.className = 'gauge-status-badge approved';
        badge.innerText = 'Approved & Locked';
      }
      if (card) card.classList.add('completed-state');
      if (btn) {
        btn.disabled = false;
        btn.innerText = '✓ BOARD REVIEW APPROVED';
        btn.classList.add('completed');
        btn.disabled = true; // keep disabled once fully approved
      }

      // Reveal first checklist card
      const reveal1 = document.getElementById('reveal-card-gatekeeping');
      if (reveal1) reveal1.classList.add('active');

      checkCAN400Completion();
    }
  }, 300);
}

function triggerHILTest() {
  if (slideInteractions[6].hilTested) return;

  const btn = document.getElementById('btn-sim-hil');
  const wrapper = document.getElementById('progress-wrapper-hil');
  const fill = document.getElementById('progress-fill-hil');
  const txt = document.getElementById('progress-text-hil');

  if (btn) {
    btn.disabled = true;
    btn.classList.remove('pulsing');
    btn.innerText = 'Testing Software...';
  }
  if (wrapper) wrapper.style.display = 'block';

  // Animate progress bar
  let percent = 0;
  const interval = setInterval(() => {
    percent += 5;
    if (fill) fill.style.width = `${percent}%`;
    if (txt) txt.innerText = `Running Test: ${percent}%`;

    // Glow some LEDs randomly green
    const leds = document.querySelectorAll('.plc-led');
    if (leds.length > 0 && percent % 15 === 0) {
      const idx = Math.floor(Math.random() * leds.length);
      leds[idx].className = 'plc-led green glowing';
    }

    if (percent >= 100) {
      clearInterval(interval);
      slideInteractions[6].hilTested = true;

      // Glow all LEDs green
      leds.forEach(led => {
        led.className = 'plc-led green glowing';
      });

      const card = document.getElementById('sim-card-hil');
      if (card) card.classList.add('completed-state');
      if (txt) {
        txt.innerText = 'Test Result: PASSED (0 Errors)';
        txt.style.color = '#10b981';
      }
      if (btn) {
        btn.disabled = false;
        btn.innerText = '✓ HIL TESTING PASSED';
        btn.classList.add('completed');
        btn.disabled = true; // keep disabled once fully passed
      }

      // Reveal second checklist card
      const reveal2 = document.getElementById('reveal-card-risk');
      if (reveal2) reveal2.classList.add('active');

      checkCAN400Completion();
    }
  }, 100);
}

function checkCAN400Completion() {
  const steps = slideInteractions[6];
  if (steps.alarmReviewed && steps.hilTested) {
    // Complete slide
    markSlideComplete(6);
    const placeholder = document.getElementById('placeholder-deck-card');
    if (placeholder) placeholder.style.display = 'none';

    const warning = document.getElementById('slide-lock-warning-6');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow" style="margin-top: 15px; display: inline-flex; align-items: center; gap: 8px;">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>CAN 400 workflow requirements completed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

// ── SLIDE 19 INTERACTIVE LOGIC (Hazards) ───────
const hazardData19 = {
  0: {
    title: "Oxygen Deficiency",
    desc: "This deficiency can lead to serious injuries including death. Please consider the following information:",
    bullets: [
      "Normal oxygen level in air is 21%.",
      "OH&S defines oxygen deficient as &lt;19.5%.",
      "Coordination impairment and increased respiratory rate at 17%.",
      "Dizziness, headache, rapid fatigue at 12%.",
      "Unconsciousness at 9%.",
      "Death within a few minutes at 6%."
    ]
  },
  1: {
    title: "Elevated Temperatures",
    desc: "Inhalation of heated air can cause serious damage to the respiratory system.",
    bullets: [
      "Can cause heat stroke and thermal burns to the respiratory tract.",
      "Body's tolerance limit for heated dry air is limited.",
      "Can lead to rapid fluid buildup in lungs (pulmonary edema).",
      "Immediate cooling and breathing air support are required."
    ]
  },
  2: {
    title: "Smoke & Combustion Products",
    desc: "Suspended particles, soot, and aerosols present in smoke pose immediate threats.",
    bullets: [
      "Suspended carbon particles can clog airways and decrease gas exchange.",
      "Soot particles can carry toxic gases deep into the lungs.",
      "Can cause severe eye irritation, blinding workers during escapes.",
      "Hot smoke damages protective tissues instantly."
    ]
  },
  3: {
    title: "Toxic Atmospheres",
    desc: "Presence of toxic gases commonly found in industrial and confined space environments.",
    bullets: [
      "Carbon Monoxide (CO) - binds to hemoglobin, preventing oxygen delivery.",
      "Hydrogen Sulfide (H2S) - extremely lethal, knocks out sense of smell rapidly.",
      "Sulfur Dioxide (SO2) - highly corrosive to respiratory membranes.",
      "Chemical asphyxiants block cellular respiration at the mitochondrial level."
    ]
  }
};

function selectHazard(idx) {
  slideInteractions[17][`hazard${idx}`] = true;
  
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`btn-hazard-${i}`);
    if (btn) {
      btn.classList.toggle('selected', i === idx);
      if (slideInteractions[17][`hazard${i}`]) {
        btn.classList.remove('pulsing');
        btn.classList.add('visited');
      }
    }
  }

  const btnActive = document.getElementById(`btn-hazard-${idx}`);
  const arrow = document.getElementById('hazard-arrow-indicator');
  const card = document.getElementById('hazard-detail-card');
  if (btnActive && arrow && card) {
    const btnRect = btnActive.getBoundingClientRect();
    const rowRect = btnActive.parentElement.getBoundingClientRect();
    const offset = btnRect.left - rowRect.left + (btnRect.width / 2) - 10;
    arrow.style.left = `${offset}px`;
    arrow.style.display = 'block';
    card.style.display = 'flex';
  }

  const data = hazardData19[idx];
  document.getElementById('hazard-title').innerText = data.title;
  document.getElementById('hazard-desc').innerHTML = data.desc;
  
  let listHtml = '';
  data.bullets.forEach(b => {
    listHtml += `<li><svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${b}</span></li>`;
  });
  document.getElementById('hazard-list').innerHTML = listHtml;

  const brainImg = document.getElementById('hazard-image');
  if (brainImg) {
    brainImg.className = 'hazard-image-glow';
    brainImg.style.filter = `hue-rotate(${idx * 75}deg) saturate(1.2)`;
  }

  checkSlide17Completion();
}

function checkSlide17Completion() {
  const steps = slideInteractions[17];
  if (Object.values(steps).every(v => v === true)) {
    markSlideComplete(17);
    const warning = document.getElementById('slide-lock-warning-17');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All respiratory hazards reviewed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

// ── SLIDE 20 INTERACTIVE LOGIC (SCBA Components) ──
const scbaData20 = {
  0: {
    title: "SCBA Harness / SCBA back frame and harness",
    bullets: [
      "Holds cylinder securely in place using double locking latch.",
      "<strong>Industrial</strong> - Sturdy zinc plated steel wire back frame.",
      "<strong>Fire</strong> - Padded Kevlar and webbing.",
      "Holds reducer, high and low pressure hoses and remote gauge in place."
    ],
    hue: 0
  },
  1: {
    title: "SCBA Reducer Assembly",
    bullets: [
      "Lowers high cylinder pressure down to a manageable medium pressure (approx. 80-100 psi).",
      "Equipped with a safety relief valve to prevent over-pressurization.",
      "Connects directly to the cylinder valve via hand-tight connector.",
      "Dual-path design ensures continuous air flow even if one path fails."
    ],
    hue: 45
  },
  2: {
    title: "Mask Mounted Regulator (MMR)",
    bullets: [
      "Controls air flow into the facepiece based on the user's inhalation.",
      "Maintains positive pressure inside the mask to prevent contaminant ingress.",
      "Features a bypass valve for emergency constant-flow air supply.",
      "Easy push-to-connect latching mechanism for rapid donning."
    ],
    hue: 90
  },
  3: {
    title: "Universal Rescue Connection (URC)",
    bullets: [
      "Emergency high-pressure transfill connection for rapid air transfer between cylinders.",
      "Allows rescue personnel to supply air directly to a trapped worker's SCBA.",
      "Standardized fitting compatible with industry-wide rescue lines.",
      "Equipped with a check valve to prevent backflow and pressure loss."
    ],
    hue: 135
  },
  4: {
    title: "Remote Pressure Gauge",
    bullets: [
      "Mounted on the shoulder strap for continuous visibility of remaining air pressure.",
      "Includes a mechanical pressure indicator matching the cylinder gauge reading.",
      "Integrated distress alarm (PASS) sensor often housed within the same assembly.",
      "Luminous dial face for easy readability in dark or smoke-filled environments."
    ],
    hue: 180
  },
  5: {
    title: "High Pressure Coupling & Seal",
    bullets: [
      "Threaded coupling that secures the high-pressure hose to the cylinder valve.",
      "Elastomeric O-ring seal prevents high-pressure leaks at pressures up to 4500 psi.",
      "Requires inspection for cracks, cuts, or degradation before every use.",
      "Hand-wheel design allows quick connection/disconnection without tools."
    ],
    hue: 225
  },
  6: {
    title: "Air Cylinder & Valve - 2216 psi (Low Pressure)",
    bullets: [
      "Composite or aluminum construction providing a 30-minute nominal duration.",
      "Operates at a working pressure of 2216 psi.",
      "Main cylinder valve features a locking mechanism to prevent accidental closure.",
      "Equipped with a burst disc to release over-pressure safely."
    ],
    hue: 270
  },
  7: {
    title: "Air Cylinder & Valve - 4500 psi (High Pressure)",
    bullets: [
      "Lightweight carbon-fiber wrapped cylinder for high-capacity applications.",
      "Operates at a working pressure of 4500 psi, offering 30, 45, or 60-minute durations.",
      "Built-in pressure indicator allows quick status checks.",
      "Impact-resistant valve body design for harsh operational environments."
    ],
    hue: 315
  },
  8: {
    title: "SCBA Full Facepiece",
    bullets: [
      "Silicone or rubber seal providing an airtight barrier against hazardous ambients.",
      "Wide-view polycarbonate lens with anti-scratch and anti-fog coatings.",
      "Five-point head harness for secure fit and seal distribution.",
      "Speech diaphragm ensures clear verbal communication with team members."
    ],
    hue: 360
  }
};

function selectSCBAComponent(idx) {
  slideInteractions[18][`comp${idx}`] = true;

  for (let i = 0; i < 9; i++) {
    const btn = document.getElementById(`btn-scba-${i}`);
    if (btn) {
      btn.classList.toggle('selected', i === idx);
      if (slideInteractions[18][`comp${i}`]) {
        btn.classList.remove('pulsing');
        btn.classList.add('visited');
      }
    }
  }

  const card = document.getElementById('scba-detail-card');
  if (card) card.style.display = 'flex';

  const data = scbaData20[idx];
  document.getElementById('scba-title').innerHTML = data.title;
  
  let listHtml = '';
  data.bullets.forEach(b => {
    listHtml += `<li><svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${b}</span></li>`;
  });
  document.getElementById('scba-list').innerHTML = listHtml;

  const imgs = document.querySelectorAll('#scba-images-row img');
  imgs.forEach((img, index) => {
    img.style.filter = `hue-rotate(${data.hue + (index * 45)}deg) brightness(0.95)`;
    img.style.transform = 'scale(1.05)';
    setTimeout(() => { img.style.transform = 'scale(1)'; }, 200);
  });

  checkSlide18Completion();
}

function checkSlide18Completion() {
  const steps = slideInteractions[18];
  if (Object.values(steps).every(v => v === true)) {
    markSlideComplete(18);
    const warning = document.getElementById('slide-lock-warning-18');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All SCBA components reviewed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

// ── SLIDE 21 INTERACTIVE LOGIC (Video Player) ──
let videoInterval = null;
let videoProgress = 0;
let isVideoPlaying = false;

function startSimulatedVideo() {
  const centerBtn = document.getElementById('video-center-play-btn');
  if (centerBtn) centerBtn.style.display = 'none';
  
  isVideoPlaying = true;
  updateVideoControlsUI();
  runVideoPlayback();
}

function toggleSimulatedVideo() {
  isVideoPlaying = !isVideoPlaying;
  updateVideoControlsUI();
  if (isVideoPlaying) {
    const centerBtn = document.getElementById('video-center-play-btn');
    if (centerBtn) centerBtn.style.display = 'none';
    runVideoPlayback();
  } else {
    if (videoInterval) clearInterval(videoInterval);
  }
}

function updateVideoControlsUI() {
  const playSvg = document.getElementById('video-play-svg');
  const pauseSvg = document.getElementById('video-pause-svg');
  if (playSvg && pauseSvg) {
    if (isVideoPlaying) {
      playSvg.style.display = 'none';
      pauseSvg.style.display = 'block';
    } else {
      playSvg.style.display = 'block';
      pauseSvg.style.display = 'none';
    }
  }
}

function runVideoPlayback() {
  if (videoInterval) clearInterval(videoInterval);
  
  const frameImg = document.getElementById('video-frame-img');
  if (frameImg) {
    frameImg.style.transform = 'scale(1.15) translateY(-20px)';
  }

  videoInterval = setInterval(() => {
    if (!isVideoPlaying) return;
    
    videoProgress += 1.5;
    if (videoProgress >= 100) {
      videoProgress = 100;
      isVideoPlaying = false;
      clearInterval(videoInterval);
      slideInteractions[19].videoPlayed = true;
      markSlideComplete(19);
      
      const warning = document.getElementById('slide-lock-warning-19');
      if (warning) {
        warning.innerHTML = `<div class="lock-status-text success-glow">
          <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>MEWP training video completed! You may now navigate to the next slide.</span>
        </div>`;
      }
      const centerBtn = document.getElementById('video-center-play-btn');
      if (centerBtn) centerBtn.style.display = 'flex';
      
      if (frameImg) {
        frameImg.style.transform = 'scale(1) translateY(0)';
      }
    }
    
    const fill = document.getElementById('video-seek-fill');
    if (fill) fill.style.width = `${videoProgress}%`;

    const currentSecs = Math.floor((videoProgress / 100) * 65);
    const m = Math.floor(currentSecs / 60).toString().padStart(2, '0');
    const s = (currentSecs % 60).toString().padStart(2, '0');
    const timerText = document.getElementById('video-current-time');
    if (timerText) timerText.innerText = `${m}:${s}`;

    updateVideoControlsUI();
  }, 1000);
}

function seekSimulatedVideo(event) {
  const track = document.getElementById('video-seek-track');
  if (!track) return;
  const rect = track.getBoundingClientRect();
  const percentage = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
  videoProgress = percentage;
  
  const fill = document.getElementById('video-seek-fill');
  if (fill) fill.style.width = `${videoProgress}%`;
  
  const currentSecs = Math.floor((videoProgress / 100) * 65);
  const m = Math.floor(currentSecs / 60).toString().padStart(2, '0');
  const s = (currentSecs % 60).toString().padStart(2, '0');
  const timerText = document.getElementById('video-current-time');
  if (timerText) timerText.innerText = `${m}:${s}`;
}

// ── SLIDE 22 INTERACTIVE LOGIC (Properties of H2S) ──
const h2sPropertiesData = {
  0: {
    title: "Colorless",
    desc: "H₂S is completely colorless and invisible. You cannot rely on your eyes to detect it. Gas detection instruments are required for identification."
  },
  1: {
    title: "Odor",
    desc: "It has a distinct 'rotten egg' smell at very low concentrations. However, higher levels of H₂S rapidly paralyze the olfactory nerve, deadening your sense of smell. <strong>Never</strong> use odor as a warning."
  },
  2: {
    title: "Density",
    desc: "It is heavier than air (vapor density of 1.19). It tends to settle and pool in low-lying areas such as pits, trenches, sewers, and sumps."
  },
  3: {
    title: "Solubility",
    desc: "It is soluble in water and liquid hydrocarbons. Agitating, heating, or depressurizing these liquids can release high concentrations of H₂S gas into the air."
  },
  4: {
    title: "Boiling Point",
    desc: "It has a very low boiling point of -60°C (-76°F). This means H₂S is always a gas at normal atmospheric temperatures and pressures."
  },
  5: {
    title: "Flammability",
    desc: "H₂S is extremely flammable. It forms explosive mixtures in air at concentrations between 4.3% and 46% by volume. Burning it produces toxic sulfur dioxide (SO₂)."
  }
};

function selectH2SProperty(idx) {
  slideInteractions[20][`prop${idx}`] = true;
  
  // Highlight node and mark visited
  for (let i = 0; i < 6; i++) {
    const node = document.getElementById(`h2s-node-${i}`);
    if (node) {
      node.classList.toggle('selected', i === idx);
      if (slideInteractions[20][`prop${i}`]) {
        node.classList.remove('pulsing');
        node.classList.add('visited');
        const circle = node.querySelector('circle');
        if (circle) circle.style.stroke = '#24ac7d'; // Completed color
      }
    }
  }

  // Update popup card
  const popup = document.getElementById('h2s-detail-popup');
  const title = document.getElementById('h2s-popup-title');
  const desc = document.getElementById('h2s-popup-desc');
  
  const popupPositions = {
    0: { left: '450px', top: '20px' },   // Color (Top)
    1: { left: '560px', top: '75px' },   // Odor (Top-Right)
    2: { left: '560px', top: '215px' },  // Density (Bottom-Right)
    3: { left: '450px', top: '245px' },  // Solubility (Bottom)
    4: { left: '20px', top: '215px' },   // Boiling Point (Bottom-Left)
    5: { left: '20px', top: '75px' }     // Flammability (Top-Left)
  };

  if (popup && title && desc) {
    const data = h2sPropertiesData[idx];
    title.innerHTML = data.title.toUpperCase();
    desc.innerHTML = data.desc;
    
    // Position beside the selected element
    const pos = popupPositions[idx];
    popup.style.left = pos.left;
    popup.style.top = pos.top;
    popup.style.display = 'block';
  }
  
  checkSlide20Completion();
}

function closeH2SDetailPopup() {
  const popup = document.getElementById('h2s-detail-popup');
  if (popup) popup.style.display = 'none';
  document.querySelectorAll('.h2s-node-btn').forEach(btn => btn.classList.remove('selected'));
}

function checkSlide20Completion() {
  const steps = slideInteractions[20];
  if (Object.values(steps).every(v => v === true)) {
    markSlideComplete(20);
    const warning = document.getElementById('slide-lock-warning-20');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All H2S properties reviewed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

// ── SLIDE 23 INTERACTIVE LOGIC (Fire Classifications) ──
const fireClassData = {
  0: {
    title: "Class A - Ordinary Combustibles",
    subtitle: "Common Combustibles (Wood, Paper, Cloth, Trash, Plastics)",
    bullets: [
      "Fuel Source: Materials that leave an ash when burned.",
      "Symbol: Letter 'A' inside a green triangle.",
      "Extinguishing Method: Cooling with water, smothering with dry chemical.",
      "Key Precaution: Never use water on electrical or flammable liquid fires."
    ],
    icon: `<svg viewBox="0 0 100 100" style="width: 80px; height: 80px;">
             <polygon points="50,10 90,90 10,90" fill="#10b981" />
             <text x="50" y="75" font-family="var(--font-heading)" font-size="42" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
           </svg>`
  },
  1: {
    title: "Class B - Flammable Liquids & Gases",
    subtitle: "Hydrocarbon Materials (Gasoline, Diesel, Oil, Tar, Propane, H2S)",
    bullets: [
      "Fuel Source: Liquids or gases that vaporize and support rapid combustion.",
      "Symbol: Letter 'B' inside a red square.",
      "Extinguishing Method: Smothering with foam, Carbon Dioxide (CO₂), or dry chemical.",
      "Key Precaution: Never use water, as it can spread the burning liquid."
    ],
    icon: `<svg viewBox="0 0 100 100" style="width: 80px; height: 80px;">
             <rect x="10" y="10" width="80" height="80" rx="6" fill="#ef4444" />
             <text x="50" y="65" font-family="var(--font-heading)" font-size="46" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>
           </svg>`
  },
  2: {
    title: "Class C - Electrical Fires",
    subtitle: "Energized Electrical Equipment (Wiring, Motors, Appliances, Panels)",
    bullets: [
      "Fuel Source: Fires involving active electrical current flow.",
      "Symbol: Letter 'C' inside a blue circle.",
      "Extinguishing Method: Non-conductive agents like Carbon Dioxide (CO₂) or dry chemical.",
      "Key Precaution: De-energize the equipment immediately to convert it to Class A."
    ],
    icon: `<svg viewBox="0 0 100 100" style="width: 80px; height: 80px;">
             <circle cx="50" cy="50" r="42" fill="#3b82f6" />
             <text x="50" y="65" font-family="var(--font-heading)" font-size="46" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>
           </svg>`
  },
  3: {
    title: "Class D - Combustible Metals",
    subtitle: "Reactive Metals (Magnesium, Sodium, Titanium, Lithium)",
    bullets: [
      "Fuel Source: Volatile metals that react violently with water or oxygen when heated.",
      "Symbol: Letter 'D' inside a yellow 5-point star.",
      "Extinguishing Method: Special dry powder agents (e.g. Copper-based or Sodium Chloride).",
      "Key Precaution: Standard fire extinguishing agents (water, CO₂) will accelerate the fire."
    ],
    icon: `<svg viewBox="0 0 100 100" style="width: 80px; height: 80px;">
             <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" fill="#eab308" />
             <text x="50" y="63" font-family="var(--font-heading)" font-size="34" font-weight="bold" fill="#1b3644" text-anchor="middle">D</text>
           </svg>`
  },
  4: {
    title: "Class K - Commercial Kitchen Fires",
    subtitle: "Cooking Oils and Fats (Vegetable Oil, Animal Fats, Greases)",
    bullets: [
      "Fuel Source: Deep-fryers and high-temperature cooking appliances.",
      "Symbol: Letter 'K' inside a black hexagon.",
      "Extinguishing Method: Wet chemical agents that saponify (turn fats to soap) and cool.",
      "Key Precaution: Standard dry chemical or water can cause explosive splattering."
    ],
    icon: `<svg viewBox="0 0 100 100" style="width: 80px; height: 80px;">
             <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="#1e293b" />
             <text x="50" y="65" font-family="var(--font-heading)" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">K</text>
           </svg>`
  },
  5: {
    title: "Multiclass Rating Extinguishers",
    subtitle: "Combined Ratings (A-B, B-C, or A-B-C Extinguishers)",
    bullets: [
      "Description: Extinguishers designed to handle more than one classification of fire.",
      "Common Type: Tri-class dry chemical (A-B-C) containing monoammonium phosphate.",
      "Usage: Extremely common in commercial, residential, and offshore installations.",
      "Key Precaution: Make sure to check the rating label before discharge."
    ],
    icon: `<div class="multiclass-rect-badge" style="background: #0d9488; color: white; padding: 12px 10px; font-weight: bold; border-radius: 8px; font-size: 0.9rem; text-align: center; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);">Multiclass</div>`
  }
};

function selectFireClass(idx) {
  slideInteractions[21][`class${idx}`] = true;
  
  for (let i = 0; i < 6; i++) {
    const btn = document.getElementById(`btn-fire-class-${i}`);
    if (btn) {
      btn.classList.toggle('selected', i === idx);
      if (slideInteractions[21][`class${i}`]) {
        btn.classList.remove('pulsing');
        btn.classList.add('visited');
      }
    }
  }

  const btnActive = document.getElementById(`btn-fire-class-${idx}`);
  const arrow = document.getElementById('fire-class-arrow');
  const card = document.getElementById('fire-class-detail-card');
  if (btnActive && arrow && card) {
    const btnRect = btnActive.getBoundingClientRect();
    const rowRect = btnActive.parentElement.getBoundingClientRect();
    const offset = btnRect.left - rowRect.left + (btnRect.width / 2) - 10;
    arrow.style.left = `${offset}px`;
    arrow.style.display = 'block';
    card.style.display = 'flex';
  }

  const data = fireClassData[idx];
  document.getElementById('fire-class-title').innerText = data.title;
  document.getElementById('fire-class-subtitle').innerText = data.subtitle;
  
  let listHtml = '';
  data.bullets.forEach(b => {
    listHtml += `<li><svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${b}</span></li>`;
  });
  document.getElementById('fire-class-bullets').innerHTML = listHtml;
  document.getElementById('fire-class-icon-slot').innerHTML = data.icon;

  checkSlide21Completion();
}

function closeFireClassDetail() {
  const card = document.getElementById('fire-class-detail-card');
  const arrow = document.getElementById('fire-class-arrow');
  if (card) card.style.display = 'none';
  if (arrow) arrow.style.display = 'none';
  document.querySelectorAll('.fire-class-card').forEach(btn => btn.classList.remove('selected'));
}

function checkSlide21Completion() {
  const steps = slideInteractions[21];
  if (Object.values(steps).every(v => v === true)) {
    markSlideComplete(21);
    const warning = document.getElementById('slide-lock-warning-21');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All fire classifications reviewed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

// ── SLIDE 24 INTERACTIVE LOGIC (What is Fire? - Fire Tetrahedron) ──
const tetrahedronData = {
  0: {
    title: "Heat Source",
    desc: "Heat is required to raise the temperature of the fuel to its ignition point. Heat sources include open flames, electrical arcs, friction, and chemical reactions. Extinguishing methods focus on cooling the fuel (e.g. applying water) to lower its temperature below the ignition point."
  },
  1: {
    title: "Oxygen",
    desc: "Oxygen in the surrounding atmosphere supports the chemical processes of combustion. While normal air contains 21% oxygen, fire typically requires at least 16% to burn. Extinguishing methods focus on smothering the fire (e.g. applying Carbon Dioxide or foam) to displace or block oxygen."
  },
  2: {
    title: "Fuel Source",
    desc: "Fuel is any combustible material that undergoes oxidation during a fire. Fuel can exist as a solid (wood, paper), liquid (oil, gasoline), or gas (natural gas, hydrogen sulfide). Extinguishing methods focus on starvation (e.g. shutting off a gas line valve or removing dry combustibles)."
  },
  3: {
    title: "Chemical Chain Reaction",
    desc: "A self-sustaining chemical reaction is the fourth component. Once fire starts, the heat releases vapors which mix with oxygen and ignite, generating more heat in a continuous loop. Extinguishing methods focus on interrupting this reaction using dry chemical agents or clean agents that bind to free radicals."
  }
};

function selectTetrahedronFacet(idx) {
  slideInteractions[22][`tetra${idx}`] = true;
  
  // Highlight facet and mark visited
  for (let i = 0; i < 4; i++) {
    const facet = document.getElementById(`tetra-facet-${i}`);
    if (facet) {
      facet.classList.toggle('selected', i === idx);
      if (slideInteractions[22][`tetra${i}`]) {
        facet.classList.remove('pulsing');
        facet.classList.add('visited');
      }
    }
  }

  // Update detail card
  const card = document.getElementById('tetra-detail-card');
  const title = document.getElementById('tetra-title');
  const desc = document.getElementById('tetra-desc');
  
  if (card && title && desc) {
    const data = tetrahedronData[idx];
    title.innerHTML = data.title;
    desc.innerHTML = data.desc;
    card.style.display = 'block';
  }
  
  checkSlide22Completion();
}

function checkSlide22Completion() {
  const steps = slideInteractions[22];
  if (Object.values(steps).every(v => v === true)) {
    markSlideComplete(22);
    const warning = document.getElementById('slide-lock-warning-22');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Fire Tetrahedron components completed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

// ── SLIDE 25 INTERACTIVE LOGIC (Quiz Results & Retaking) ──
function calculateQuizResults() {
  let score = 0;
  let correctCount = 0;
  
  // Q1 (Slide 3)
  if (selectedQuizChoices[3] === quizCorrectMapping[3]) {
    score += 1;
    correctCount += 1;
  }
  
  // Q2 (Slide 7)
  if (selectedQuizChoices[7] === quizCorrectMapping[7]) {
    score += 1;
    correctCount += 1;
  }
  
  // Q3 (Slide 11)
  if (selectedQuizChoices[11] === quizCorrectMapping[11]) {
    score += 1;
    correctCount += 1;
  }
  
  // Q4-7 (Slide 18)
  const correctGrid = [
    [false, true, false, false],
    [true, false, false, false],
    [false, false, false, true],
    [false, false, true, false]
  ];
  const userGrid = selectedQuizChoices[16];
  let matrixCorrectRows = 0;
  if (userGrid) {
    for (let r = 0; r < 4; r++) {
      let rowCorrect = true;
      for (let c = 0; c < 4; c++) {
        if (userGrid[r][c] !== correctGrid[r][c]) {
          rowCorrect = false;
          break;
        }
      }
      if (rowCorrect) {
        matrixCorrectRows++;
      }
    }
  }
  score += matrixCorrectRows;
  correctCount += matrixCorrectRows;
  
  const totalQuestions = 7;
  const maxScore = 7;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const attempts = (quizAttempts[3] || 0) + (quizAttempts[7] || 0) + (quizAttempts[11] || 0) + (quizAttempts[18] || 0);
  const passed = accuracy >= 70; // 5 out of 7 correct is 71% (Pass)
  
  return {
    score: score,
    maxScore: maxScore,
    correctAnswers: correctCount,
    totalQuestions: totalQuestions,
    accuracy: accuracy,
    attempts: attempts,
    passed: passed
  };
}

function showQuizResults() {
  const results = calculateQuizResults();
  
  const scoredEl = document.getElementById('results-scored');
  const maxEl = document.getElementById('results-max');
  const correctEl = document.getElementById('results-correct');
  const totalEl = document.getElementById('results-total');
  const accuracyEl = document.getElementById('results-accuracy');
  const attemptsEl = document.getElementById('results-attempts');
  const statusLabel = document.getElementById('results-status-label');
  
  if (scoredEl) scoredEl.innerText = results.score;
  if (maxEl) maxEl.innerText = results.maxScore;
  if (correctEl) correctEl.innerText = results.correctAnswers;
  if (totalEl) totalEl.innerText = results.totalQuestions;
  if (accuracyEl) accuracyEl.innerText = results.accuracy + '%';
  if (attemptsEl) attemptsEl.innerText = results.attempts;
  
  if (statusLabel) {
    if (results.passed) {
      statusLabel.innerText = "Success";
      statusLabel.style.color = "#10b981"; // Success Green
    } else {
      statusLabel.innerText = "Failure";
      statusLabel.style.color = "#ef4444"; // Failure Red
    }
  }
  
  if (results.passed) {
    markSlideComplete(23);
  } else {
    slideCompleted[23] = false;
    const outline = document.getElementById('outline-item-23');
    if (outline) outline.classList.remove('completed');
    updateControls();
  }
}

function retakeQuiz() {
  // Reset choices
  selectedQuizChoices[3] = null;
  selectedQuizChoices[7] = null;
  selectedQuizChoices[11] = null;
  selectedQuizChoices[16] = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ];
  
  // Reset attempts
  quizAttempts[3] = 0;
  quizAttempts[5] = 0;
  quizAttempts[9] = 0;
  quizAttempts[16] = 0;
  
  // Reset completion states
  [3, 7, 11, 18, 25, 26].forEach(idx => {
    slideCompleted[idx] = false;
    const outline = document.getElementById(`outline-item-${idx}`);
    if (outline) outline.classList.remove('completed', 'active');
  });
  
  // Reset DOM choices state
  document.querySelectorAll('.quiz-option-row').forEach(row => {
    row.classList.remove('selected', 'disabled');
  });
  
  document.querySelectorAll('.btn-quiz-submit').forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('active');
  });
  
  document.querySelectorAll('.quiz-feedback-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Reset Slide 18 matrix elements
  document.querySelectorAll('.matrix-check').forEach(chk => {
    chk.checked = false;
    chk.disabled = false;
  });
  
  const matrixTable = document.getElementById('quiz-matrix-container-16');
  if (matrixTable) matrixTable.style.display = 'block';
  
  const matrixFeedback = document.getElementById('quiz-feedback-container-16');
  if (matrixFeedback) matrixFeedback.style.display = 'none';
  
  const matrixSubmitBtn = document.getElementById('btn-quiz-submit-16');
  if (matrixSubmitBtn) {
    matrixSubmitBtn.disabled = true;
    matrixSubmitBtn.classList.remove('active');
  }
  
  // Reset certificate input
  const nameInput = document.getElementById('final-cert-name');
  if (nameInput) nameInput.value = '';
  const setup = document.getElementById('cert-setup-container');
  if (setup) setup.style.display = 'block';
  const certBox = document.getElementById('final-certificate-box');
  if (certBox) certBox.style.display = 'none';
  
  goToSlide(3);
}

// ── SCORM BOOKMARK UI RESTORATION ─────────────
function restoreSlideInteractionUI(slideIdx) {
  if (slideIdx === 4) restoreSlide4State();
  else if (slideIdx === 6) restoreSlide6State();
  else if (slideIdx === 17) restoreSlide17State();
  else if (slideIdx === 18) restoreSlide18State();
  else if (slideIdx === 19) restoreSlide19State();
  else if (slideIdx === 20) restoreSlide20State();
  else if (slideIdx === 21) restoreSlide21State();
  else if (slideIdx === 22) restoreSlide22State();
}

function restoreSlide4State() {
  const steps = slideInteractions[4];
  const items = document.querySelectorAll('#slide-4 .mini-timeline-item');
  if (items.length >= 3) {
    if (steps.step1) items[0].classList.add('visited');
    if (steps.step2) items[1].classList.add('visited');
    if (steps.step3) items[2].classList.add('visited');
  }
  const progressBar = document.getElementById('timeline-progress-bar-4');
  if (progressBar) {
    let visitedCount = 0;
    if (steps.step1) visitedCount++;
    if (steps.step2) visitedCount++;
    if (steps.step3) visitedCount++;
    if (visitedCount === 1) progressBar.style.height = '0%';
    else if (visitedCount === 2) progressBar.style.height = '50%';
    else if (visitedCount === 3) progressBar.style.height = '100%';
  }
  if (!isSlideLockedByInteractions(4)) {
    const warning = document.getElementById('slide-lock-warning-4');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>CAN 100 Process unlocked! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

function restoreSlide6State() {
  const state = slideInteractions[6];
  
  if (state.alarmReviewed) {
    const gauge = document.getElementById('gauge-node-400');
    const val = document.getElementById('gauge-val-400');
    const badge = document.getElementById('gauge-badge-400');
    const card = document.getElementById('sim-card-alarm');
    const btn = document.getElementById('btn-sim-alarm');
    
    if (gauge) gauge.className = 'gauge-outer approved-gauge';
    if (val) {
      val.className = 'gauge-readout approved-glow';
      val.innerText = '82.5';
    }
    if (badge) {
      badge.className = 'gauge-status-badge approved';
      badge.innerText = 'Approved & Locked';
    }
    if (card) card.classList.add('completed-state');
    if (btn) {
      btn.innerText = '✓ BOARD REVIEW APPROVED';
      btn.className = 'sim-action-btn completed';
      btn.disabled = true;
    }
    const reveal1 = document.getElementById('reveal-card-gatekeeping');
    if (reveal1) reveal1.classList.add('active');
  }

  if (state.hilTested) {
    const card = document.getElementById('sim-card-hil');
    const btn = document.getElementById('btn-sim-hil');
    const wrapper = document.getElementById('progress-wrapper-hil');
    const fill = document.getElementById('progress-fill-hil');
    const txt = document.getElementById('progress-text-hil');
    
    if (card) card.classList.add('completed-state');
    if (btn) {
      btn.innerText = '✓ HIL TESTING PASSED';
      btn.className = 'sim-action-btn completed';
      btn.disabled = true;
    }
    if (wrapper) wrapper.style.display = 'block';
    if (fill) fill.style.width = '100%';
    if (txt) {
      txt.innerText = 'Test Result: PASSED (0 Errors)';
      txt.style.color = '#10b981';
    }
    document.querySelectorAll('.plc-led').forEach(led => {
      led.className = 'plc-led green glowing';
    });
    const reveal2 = document.getElementById('reveal-card-risk');
    if (reveal2) reveal2.classList.add('active');
  }

  if (state.alarmReviewed && state.hilTested) {
    const placeholder = document.getElementById('placeholder-deck-card');
    if (placeholder) placeholder.style.display = 'none';
    const warning = document.getElementById('slide-lock-warning-6');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow" style="margin-top: 15px; display: inline-flex; align-items: center; gap: 8px;">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>CAN 400 workflow requirements completed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

function restoreSlide17State() {
  const state = slideInteractions[17];
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`btn-hazard-${i}`);
    if (btn && state[`hazard${i}`]) {
      btn.classList.remove('pulsing');
      btn.classList.add('visited');
    }
  }
  if (Object.values(state).every(v => v === true)) {
    const warning = document.getElementById('slide-lock-warning-17');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All respiratory hazards reviewed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

function restoreSlide18State() {
  const state = slideInteractions[18];
  for (let i = 0; i < 9; i++) {
    const btn = document.getElementById(`btn-scba-${i}`);
    if (btn && state[`comp${i}`]) {
      btn.classList.remove('pulsing');
      btn.classList.add('visited');
    }
  }
  if (Object.values(state).every(v => v === true)) {
    const warning = document.getElementById('slide-lock-warning-18');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All SCBA components inspected! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

function restoreSlide19State() {
  const state = slideInteractions[19];
  if (state.videoPlayed) {
    const warning = document.getElementById('slide-lock-warning-19');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Video watched successfully! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

function restoreSlide20State() {
  const state = slideInteractions[20];
  document.querySelectorAll('.h2s-node-btn').forEach((node, idx) => {
    if (state[`prop${idx}`]) {
      node.setAttribute('class', 'h2s-node-btn visited');
      const circle = node.querySelector('circle');
      if (circle) circle.style.stroke = 'var(--primary-teal-light)';
    }
  });
  if (Object.values(state).every(v => v === true)) {
    const warning = document.getElementById('slide-lock-warning-20');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All H2S properties inspected! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

function restoreSlide21State() {
  const state = slideInteractions[21];
  document.querySelectorAll('.fire-class-card').forEach((card, idx) => {
    if (state[`class${idx}`]) {
      card.className = 'fire-class-card visited';
    }
  });
  if (Object.values(state).every(v => v === true)) {
    const warning = document.getElementById('slide-lock-warning-21');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>All fire classifications inspected! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}

function restoreSlide22State() {
  const state = slideInteractions[22];
  document.querySelectorAll('.tetra-facet').forEach((facet, idx) => {
    if (state[`tetra${idx}`]) {
      facet.setAttribute('class', 'tetra-facet visited');
    }
  });
  if (Object.values(state).every(v => v === true)) {
    const warning = document.getElementById('slide-lock-warning-22');
    if (warning) {
      warning.innerHTML = `<div class="lock-status-text success-glow">
        <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>Fire Tetrahedron facets reviewed! You may now navigate to the next slide.</span>
      </div>`;
    }
  }
}
