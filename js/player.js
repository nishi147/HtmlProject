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

  // Slides 0 & 1 are pre-completed (Welcome + Navigation tour)
  slideCompleted[0] = true;
  slideCompleted[1] = true;

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
  if (currentSlide === 5) {
    slideInteractions[5] = { step1: false, step2: false, step3: false };
    const detailBox = document.getElementById('step-detail-container');
    if (detailBox) detailBox.innerHTML = 'Click on a workflow timeline node to inspect roles and checklist details.';
    const warning = document.getElementById('slide-lock-warning-5');
    if (warning) warning.style.display = 'block';
    document.querySelectorAll('.mini-timeline-item').forEach(item => item.classList.remove('clicked'));
    slideCompleted[5] = false;
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
