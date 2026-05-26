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

  markSlideComplete(20);
}

function restartCourseRedesign() {
  slideCompleted = Array(totalSlides).fill(false);
  slideCompleted[0] = true;
  slideCompleted[1] = true;

  slideInteractions = { 5: { step1: false, step2: false, step3: false } };

  selectedQuizChoices = { 4: null, 8: null, 12: null, 19: null };
  quizAttempts        = { 4: 0,    8: 0,    12: 0,    19: 0    };

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
    if (idx === 0 || idx === 1) node.classList.add('completed');
  });

  // Reset timeline slide
  document.querySelectorAll('.mini-timeline-item').forEach(item => {
    item.classList.remove('clicked', 'visited');
  });
  const progressBar = document.getElementById('timeline-progress-bar-5');
  if (progressBar) progressBar.style.height = '0%';

  const lockWarning = document.getElementById('slide-lock-warning-5');
  if (lockWarning) {
    lockWarning.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all three timeline nodes above to proceed.</p>`;
    lockWarning.style.display = 'block';
  }
  const detailBox = document.getElementById('step-detail-container');
  if (detailBox) {
    detailBox.innerHTML = 'Click on a workflow timeline node to inspect roles and checklist details.';
    detailBox.className = '';
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
