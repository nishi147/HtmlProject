// ─────────────────────────────────────────────
// js/player.js — UI Shell, Modals & Init
// ─────────────────────────────────────────────

// ── DOM INIT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadSlidesAndInit();
});

function loadSlidesAndInit() {
  const canvas = document.getElementById('slide-canvas');
  if (!canvas) return;

  // Initialize SCORM (loads bookmark/suspend_data)
  if (typeof initScorm === 'function') {
    initScorm();
  }

  try {
    const templates = window.COURSE_TEMPLATES || {};

    // Load Landing
    if (templates['components/landing.html']) {
      document.getElementById('landing-screen').innerHTML = templates['components/landing.html'];
    }

    // Load Sidebar Menu
    if (templates['components/menu.html']) {
      document.getElementById('tab-content-menu').innerHTML = templates['components/menu.html'];
    }

    // Load Sidebar Glossary
    if (templates['components/glossary.html']) {
      document.getElementById('tab-content-glossary').innerHTML = templates['components/glossary.html'];
    }

    // Load Sidebar Resources
    if (templates['components/resources.html']) {
      document.getElementById('tab-content-resources').innerHTML = templates['components/resources.html'];
    }

    // Load Modals
    if (templates['components/notes-modal.html']) {
      document.getElementById('notes-modal-container').innerHTML = templates['components/notes-modal.html'];
    }
    if (templates['components/help-modal.html']) {
      document.getElementById('help-modal-container').innerHTML = templates['components/help-modal.html'];
    }
    if (templates['components/exit-modal.html']) {
      document.getElementById('exit-modal-container').innerHTML = templates['components/exit-modal.html'];
    }

    let slideHtmlContent = '';
    // Load all slides
    for (let i = 0; i < totalSlides; i++) {
      const slideKey = `slides/slide-${i}.html`;
      if (templates[slideKey]) {
        slideHtmlContent += templates[slideKey];
      } else {
        throw new Error(`Failed to load ${slideKey} from templates`);
      }
    }
    canvas.innerHTML = '<div class="watermark-bg"></div>' + slideHtmlContent;
  } catch (err) {
    console.error('Error loading course assets from templates:', err);
    canvas.innerHTML = '<div class="watermark-bg"></div><div style="padding:40px; color:red; font-weight:700;">Error: Failed to load course assets. Please check console.</div>';
  }

  btnPrev          = document.getElementById('btn-prev-slide');
  btnNext          = document.getElementById('btn-next-slide');
  playIcon         = document.getElementById('play-icon');
  pauseIcon        = document.getElementById('pause-icon');
  seekFill         = document.getElementById('seek-fill-progress');
  seekHandle       = document.getElementById('seek-handle-node');
  slideCountBadge  = document.getElementById('slide-count-badge');
  playerActiveTitle = document.getElementById('player-active-title');

  // Slide 0 is pre-completed (Course Navigation)
  slideCompleted[0] = true;

  // Change "ENTER" button to "RESUME" if there is SCORM bookmark progress
  const enterBtn = document.getElementById('btn-enter-course');
  if (enterBtn && currentSlide > 0) {
    enterBtn.innerText = 'RESUME';
  }

  updateSidebarMenu();
  updateControls();
}

// ── COURSE ENTRY ──────────────────────────────
function enterCourse() {
  document.getElementById('landing-screen').classList.remove('active');
  document.getElementById('dashboard-screen').classList.add('active');
  goToSlide(currentSlide);
}

// ── SIDEBAR ───────────────────────────────────
function toggleSidebar() {
  document.getElementById('player-sidebar').classList.toggle('collapsed');
}

// ── VOLUME (stub — app is audio-less) ─────────
function toggleVolume() { /* audio-less */ }
function toggleVolumeFromDiagram() { /* audio-less */ }
function togglePlayPauseFromDiagram() { togglePlayPause(); }

// Replay current slide from the beginning
function replaySlide() {
  slideProgressPercent = 0;
  updateProgressBar();
  if (currentSlide === 4) {
    slideInteractions[4] = { step1: false, step2: false, step3: false };
    const detailBox = document.getElementById('step-detail-container');
    if (detailBox) detailBox.innerHTML = 'Click on a workflow timeline node to inspect roles and checklist details.';
    const warning = document.getElementById('slide-lock-warning-4');
    if (warning) warning.style.display = 'block';
    document.querySelectorAll('.mini-timeline-item').forEach(item => item.classList.remove('clicked'));
    slideCompleted[4] = false;
    updateControls();
  }
  if (currentSlide === 6) {
    slideInteractions[6] = { alarmReviewed: false, hilTested: false };
    
    // Reset Gauge
    const gauge = document.getElementById('gauge-node-400');
    const val = document.getElementById('gauge-val-400');
    const badge = document.getElementById('gauge-badge-400');
    const cardAlarm = document.getElementById('sim-card-alarm');
    const btnAlarm = document.getElementById('btn-sim-alarm');
    
    if (gauge) gauge.className = 'gauge-outer active-gauge';
    if (val) {
      val.className = 'gauge-readout active-glow';
      val.innerText = '85.2';
    }
    if (badge) {
      badge.className = 'gauge-status-badge pending';
      badge.innerText = 'Pending Review';
    }
    if (cardAlarm) cardAlarm.classList.remove('completed-state');
    if (btnAlarm) {
      btnAlarm.disabled = false;
      btnAlarm.innerText = 'BOARD REVIEW & APPROVE';
      btnAlarm.className = 'sim-action-btn pulsing';
    }

    // Reset HIL
    const cardHil = document.getElementById('sim-card-hil');
    const btnHil = document.getElementById('btn-sim-hil');
    const wrapper = document.getElementById('progress-wrapper-hil');
    const fill = document.getElementById('progress-fill-hil');
    const txt = document.getElementById('progress-text-hil');
    
    if (cardHil) cardHil.classList.remove('completed-state');
    if (btnHil) {
      btnHil.disabled = false;
      btnHil.innerText = 'RUN HIL SIMULATION';
      btnHil.className = 'sim-action-btn pulsing';
    }
    if (wrapper) wrapper.style.display = 'none';
    if (fill) fill.style.width = '0%';
    if (txt) {
      txt.innerText = 'Test Pending...';
      txt.style.color = '';
    }

    // Reset LEDs
    document.querySelectorAll('.plc-led').forEach(led => {
      led.className = 'plc-led';
    });

    // Hide reveal cards and show placeholder
    const reveal1 = document.getElementById('reveal-card-gatekeeping');
    if (reveal1) reveal1.classList.remove('active');
    const reveal2 = document.getElementById('reveal-card-risk');
    if (reveal2) reveal2.classList.remove('active');
    const placeholder = document.getElementById('placeholder-deck-card');
    if (placeholder) placeholder.style.display = 'flex';

    const warning = document.getElementById('slide-lock-warning-6');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Complete both DCS alarm board review and HIL simulator testing to proceed.</p>`;
      warning.style.display = 'block';
    }

    slideCompleted[6] = false;
    updateControls();
  }
  if (currentSlide === 16) {
    retryMatrixQuestion();
    slideCompleted[16] = false;
    updateControls();
  }
  if (currentSlide === 17) {
    slideInteractions[17] = { hazard0: false, hazard1: false, hazard2: false, hazard3: false };
    document.querySelectorAll('.hazard-btn').forEach(btn => btn.className = 'hazard-btn pulsing');
    const arrow = document.getElementById('hazard-arrow-indicator');
    const card = document.getElementById('hazard-detail-card');
    if (arrow) arrow.style.display = 'none';
    if (card) card.style.display = 'none';
    const warning = document.getElementById('slide-lock-warning-17');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all four respiratory hazards above to proceed.</p>`;
      warning.style.display = 'block';
    }
    slideCompleted[17] = false;
    updateControls();
  }
  if (currentSlide === 18) {
    slideInteractions[18] = { comp0: false, comp1: false, comp2: false, comp3: false, comp4: false, comp5: false, comp6: false, comp7: false, comp8: false };
    document.querySelectorAll('.scba-comp-btn').forEach(btn => btn.className = 'scba-comp-btn pulsing');
    const card = document.getElementById('scba-detail-card');
    if (card) card.style.display = 'none';
    const warning = document.getElementById('slide-lock-warning-18');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Inspect all nine SCBA components on the left to proceed.</p>`;
      warning.style.display = 'block';
    }
    slideCompleted[18] = false;
    updateControls();
  }
  if (currentSlide === 19) {
    slideInteractions[19] = { videoPlayed: false };
    if (videoInterval) clearInterval(videoInterval);
    videoProgress = 0;
    isVideoPlaying = false;
    const fill = document.getElementById('video-seek-fill');
    if (fill) fill.style.width = '0%';
    const timerText = document.getElementById('video-current-time');
    if (timerText) timerText.innerText = '00:00';
    const centerBtn = document.getElementById('video-center-play-btn');
    if (centerBtn) centerBtn.style.display = 'flex';
    const frameImg = document.getElementById('video-frame-img');
    if (frameImg) {
      frameImg.style.transform = 'scale(1) translateY(0)';
    }
    const warning = document.getElementById('slide-lock-warning-19');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Watch the simulated MEWP operations video to proceed.</p>`;
      warning.style.display = 'block';
    }
    slideCompleted[19] = false;
    updateControls();
  }
  if (currentSlide === 20) {
    slideInteractions[20] = { prop0: false, prop1: false, prop2: false, prop3: false, prop4: false, prop5: false };
    document.querySelectorAll('.h2s-node-btn').forEach(node => {
      node.setAttribute('class', 'h2s-node-btn pulsing');
      node.querySelector('circle').style.stroke = '#5b8c9e';
    });
    const popup = document.getElementById('h2s-detail-popup');
    if (popup) popup.style.display = 'none';
    const warning = document.getElementById('slide-lock-warning-20');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all six H2S properties above to proceed.</p>`;
      warning.style.display = 'block';
    }
    slideCompleted[20] = false;
    updateControls();
  }
  if (currentSlide === 21) {
    slideInteractions[21] = { class0: false, class1: false, class2: false, class3: false, class4: false, class5: false };
    document.querySelectorAll('.fire-class-card').forEach(card => card.className = 'fire-class-card pulsing');
    const card = document.getElementById('fire-class-detail-card');
    if (card) card.style.display = 'none';
    const arrow = document.getElementById('fire-class-arrow');
    if (arrow) arrow.style.display = 'none';
    const warning = document.getElementById('slide-lock-warning-21');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all six fire classifications above to proceed.</p>`;
      warning.style.display = 'block';
    }
    slideCompleted[21] = false;
    updateControls();
  }
  if (currentSlide === 22) {
    slideInteractions[22] = { tetra0: false, tetra1: false, tetra2: false, tetra3: false };
    document.querySelectorAll('.tetra-facet').forEach(facet => facet.setAttribute('class', 'tetra-facet pulsing'));
    const card = document.getElementById('tetra-detail-card');
    if (card) card.style.display = 'none';
    const warning = document.getElementById('slide-lock-warning-22');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all four facets of the Fire Tetrahedron to proceed.</p>`;
      warning.style.display = 'block';
    }
    slideCompleted[22] = false;
    updateControls();
  }
  if (currentSlide === 23) {
    showQuizResults();
  }
  if (currentSlide === 24) {
    const nameInput = document.getElementById('final-cert-name');
    if (nameInput) nameInput.value = '';
    const setup = document.getElementById('cert-setup-container');
    if (setup) setup.style.display = 'block';
    const certBox = document.getElementById('final-certificate-box');
    if (certBox) certBox.style.display = 'none';
    slideCompleted[24] = false;
    updateControls();
  }
  startPlay();
}

// Cycle playback speed (settings button)
function showSettings() {
  const speeds = [1.0, 1.25, 1.5, 2.0];
  const next   = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
  playbackSpeed = next;
  showToast(`Playback Speed: ${playbackSpeed}x`);
  if (isPlaying) startPlay();
}

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Fullscreen error: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// ── TRANSCRIPT ────────────────────────────────
function toggleTranscript() {
  const bubble = document.getElementById('transcript-bubble');
  bubble.classList.toggle('active');
  if (bubble.classList.contains('active')) alignTranscriptBubble();
}

function alignTranscriptBubble() {
  const bubble        = document.getElementById('transcript-bubble');
  const transcriptBtn = document.querySelector(".utility-link-btn[onclick='toggleTranscript()']");
  if (!bubble || !transcriptBtn) return;

  const btnRect   = transcriptBtn.getBoundingClientRect();
  const btnCenter = btnRect.left + btnRect.width / 2;

  if (window.innerWidth > 767) {
    const dashboard   = document.getElementById('dashboard-screen');
    const dashRect    = dashboard.getBoundingClientRect();
    const bubbleWidth = 320;
    let leftPos = (btnRect.left - dashRect.left + btnRect.width / 2) - bubbleWidth / 2;
    leftPos = Math.max(20, Math.min(leftPos, dashRect.width - bubbleWidth - 20));
    bubble.style.left  = `${leftPos}px`;
    bubble.style.right = 'auto';
  } else {
    bubble.style.left  = '';
    bubble.style.right = '';
  }

  const bubbleRect = bubble.getBoundingClientRect();
  bubble.style.setProperty('--transcript-arrow-right', `${(bubbleRect.right - btnCenter) - 7}px`);
}

window.addEventListener('resize', () => {
  const bubble = document.getElementById('transcript-bubble');
  if (bubble && bubble.classList.contains('active')) alignTranscriptBubble();
});

// ── MODALS ────────────────────────────────────
function openNotesModal()  { pausePlay(); document.getElementById('notes-modal').classList.add('active'); }
function closeNotesModal() { document.getElementById('notes-modal').classList.remove('active'); }
function openHelpModal()   { pausePlay(); document.getElementById('help-modal').classList.add('active'); }
function closeHelpModal()  { document.getElementById('help-modal').classList.remove('active'); }
function exitCourse()      { pausePlay(); document.getElementById('exit-modal').classList.add('active'); }
function closeExitModal()  { document.getElementById('exit-modal').classList.remove('active'); }

function confirmExitCourse() {
  document.getElementById('exit-modal').classList.remove('active');
  document.getElementById('dashboard-screen').classList.remove('active');
  document.getElementById('landing-screen').classList.add('active');
}

// ── TOAST ─────────────────────────────────────
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.innerText = message;
  Object.assign(toast.style, {
    background:    'var(--primary-teal)',
    color:         '#ffffff',
    padding:       '12px 24px',
    borderRadius:  '6px',
    boxShadow:     'var(--shadow-lg)',
    fontSize:      '0.9rem',
    fontWeight:    '600',
    fontFamily:    'var(--font-body)',
    borderLeft:    '4px solid var(--accent-orange)',
    opacity:       '0',
    transform:     'translateY(20px)',
    transition:    'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  });

  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── RESOURCE DOWNLOAD ─────────────────────────
function downloadResource(filename) {
  showToast(`Downloading: ${filename}`);
}
