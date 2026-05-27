// ─────────────────────────────────────────────
// js/cert.js — Certificate & Course Reset Logic
// ─────────────────────────────────────────────

function validateCertNameInput() {
  const nameInput = document.getElementById('final-cert-name');
  const btn       = document.getElementById('btn-generate-cert');
  btn.disabled = nameInput.value.trim().length < 3;
}

function generateFinalCertificate() {
  const name = document.getElementById('final-cert-name').value.trim();
  document.getElementById('display-recipient-name').innerText = name;

  const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('display-cert-date').innerText = todayStr;

  const uid = Math.floor(100000 + Math.random() * 900000);
  document.getElementById('display-cert-uid').innerText = `MANSHU-${uid}-CAN`;

  document.getElementById('cert-setup-container').style.display = 'none';
  document.getElementById('final-certificate-box').style.display = 'block';

  markSlideComplete(19);
}

function restartCourseRedesign() {
  slideCompleted = Array(totalSlides).fill(false);
  slideCompleted[0] = true;

  slideInteractions = {
    4: { step1: false, step2: false, step3: false },
    8: { alarmReviewed: false, hilTested: false }
  };

  selectedQuizChoices = { 3: null, 7: null, 11: null, 18: null };
  quizAttempts        = { 3: 0,    7: 0,    11: 0,    18: 0    };

  // Reset quiz DOM
  document.querySelectorAll('.quiz-option-row').forEach(row => row.classList.remove('selected', 'disabled'));
  document.querySelectorAll('.btn-quiz-submit').forEach(btn => { btn.disabled = true; btn.classList.remove('active'); });
  document.querySelectorAll('.quiz-feedback-card').forEach(card => card.classList.remove('active'));

  // Reset certificate panel
  document.getElementById('final-cert-name').value = '';
  document.getElementById('cert-setup-container').style.display = 'block';
  document.getElementById('final-certificate-box').style.display = 'none';

  // Reset sidebar outline
  document.querySelectorAll('.outline-item').forEach((node, idx) => {
    node.classList.remove('completed', 'active');
    if (idx === 0) node.classList.add('completed');
  });

  // Reset timeline slide 4
  document.querySelectorAll('.mini-timeline-item').forEach(item => {
    item.classList.remove('clicked', 'visited');
  });
  const progressBar = document.getElementById('timeline-progress-bar-4');
  if (progressBar) progressBar.style.height = '0%';

  const lockWarning = document.getElementById('slide-lock-warning-4');
  if (lockWarning) {
    lockWarning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all three timeline nodes above to proceed.</p>`;
    lockWarning.style.display = 'block';
  }
  const detailBox = document.getElementById('step-detail-container');
  if (detailBox) {
    detailBox.innerHTML = 'Click on a workflow timeline node to inspect roles and checklist details.';
    detailBox.className = '';
  }

  // Reset slide 8 interactive dashboard DOM elements
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

  document.querySelectorAll('.plc-led').forEach(led => {
    led.className = 'plc-led';
  });

  const reveal1 = document.getElementById('reveal-card-gatekeeping');
  if (reveal1) reveal1.classList.remove('active');
  const reveal2 = document.getElementById('reveal-card-risk');
  if (reveal2) reveal2.classList.remove('active');
  const placeholder = document.getElementById('placeholder-deck-card');
  if (placeholder) placeholder.style.display = 'flex';

  const warning8 = document.getElementById('slide-lock-warning-8');
  if (warning8) {
    warning8.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Complete both DCS alarm board review and HIL simulator testing to proceed.</p>`;
    warning8.style.display = 'block';
  }

  goToSlide(0);
}

// Helper — Notes print HTML escaping
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Custom Notes Printing
function printNotes() {
  const textarea = document.getElementById('notes-text-area');
  const notesText = textarea.value;
  if (!notesText.trim()) {
    textarea.classList.add('warning-shake');
    textarea.placeholder = 'Notes area is empty. Please type some study notes before printing...';
    setTimeout(() => textarea.classList.remove('warning-shake'), 500);
    return;
  }

  const printWindow = window.open('', '_blank', 'width=600,height=500');
  printWindow.document.write(`
    <html>
    <head>
      <title>Manshu Learning - CAN Process Notes</title>
      <style>
        body { font-family: sans-serif; padding: 40px; color: #333; line-height: 1.6; }
        h2   { color: #244c5a; border-bottom: 2px solid #f26522; padding-bottom: 10px; }
        .date    { font-size: 0.85rem; color: #777; margin-bottom: 25px; }
        .content { font-size: 1rem; white-space: pre-wrap; font-family: monospace; background: #f8f9fa; padding: 15px; border: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <h2>Change Advice Notice Process - Study Notes</h2>
      <div class="date">Printed on: ${new Date().toLocaleDateString()}</div>
      <div class="content">${escapeHtml(notesText)}</div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
}
