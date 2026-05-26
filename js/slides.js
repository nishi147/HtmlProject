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
  if (![4, 5, 8, 12, 19, 20].includes(slideIdx)) {
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
  if ([4, 8, 12, 19].includes(slideIdx)) {
    restoreQuizState(slideIdx);
  }

  // Certificate slide
  if (currentSlide === 20) validateCertNameInput();

  // Slide 1 interactive diagram sync
  if (slideIdx === 1) {
    setTimeout(() => {
      syncDiagramPlayPause(isPlaying);
      syncDiagramVolume(soundEnabled);
      updateProgressBar();
      updateControls();
    }, 50);
  }
}

function changeSlideRedesign(direction) {
  goToSlide(currentSlide + direction);
}

// Restore full quiz UI when navigating back to a quiz slide
function restoreQuizState(slideIdx) {
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
  if (slideIdx === 5) {
    return !Object.values(slideInteractions[5]).every(v => v === true);
  }
  if ([4, 8, 12, 19].includes(slideIdx)) {
    return !slideCompleted[slideIdx];
  }
  return false;
}

// Slide 5 timeline node click handler
function triggerSlideInteraction(slideIdx, elementKey, elementDOM) {
  if (slideIdx !== 5) return;

  slideInteractions[5][elementKey] = true;
  elementDOM.parentElement.querySelectorAll('.mini-timeline-item').forEach(item => item.classList.remove('clicked'));
  elementDOM.classList.add('clicked');
  elementDOM.classList.add('visited');

  // Update timeline connector progress bar height based on which steps have been visited
  const steps = slideInteractions[5];
  const progressBar = document.getElementById('timeline-progress-bar-5');
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

  if (!isSlideLockedByInteractions(5)) {
    markSlideComplete(5);
    const warning = document.getElementById('slide-lock-warning-5');
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
