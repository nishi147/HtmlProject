// ─────────────────────────────────────────────
// js/player.js — UI Shell, Modals & Init
// ─────────────────────────────────────────────

// ── DOM INIT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  btnPrev          = document.getElementById('btn-prev-slide');
  btnNext          = document.getElementById('btn-next-slide');
  // seek / play elements may be absent after controls removal — safe refs
  playIcon         = document.getElementById('play-icon');
  pauseIcon        = document.getElementById('pause-icon');
  seekFill         = document.getElementById('seek-fill-progress');
  seekHandle       = document.getElementById('seek-handle-node');
  slideCountBadge  = document.getElementById('slide-count-badge');
  playerActiveTitle = document.getElementById('player-active-title');

  // Slide 0 is pre-completed (Course Navigation)
  slideCompleted[0] = true;

  updateSidebarMenu();
  updateControls();
});

// ── COURSE ENTRY ──────────────────────────────
function enterCourse() {
  document.getElementById('landing-screen').classList.remove('active');
  document.getElementById('dashboard-screen').classList.add('active');
  goToSlide(0);
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
  if (currentSlide === 8) {
    slideInteractions[8] = { alarmReviewed: false, hilTested: false };
    
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

    const warning = document.getElementById('slide-lock-warning-8');
    if (warning) {
      warning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Complete both DCS alarm board review and HIL simulator testing to proceed.</p>`;
      warning.style.display = 'block';
    }

    slideCompleted[8] = false;
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
