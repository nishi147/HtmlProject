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

  markSlideComplete(26);
}

function restartCourseRedesign() {
  slideCompleted = Array(totalSlides).fill(false);
  slideCompleted[0] = true;

  slideInteractions = {
    4: { step1: false, step2: false, step3: false },
    8: { alarmReviewed: false, hilTested: false },
    19: { hazard0: false, hazard1: false, hazard2: false, hazard3: false },
    20: { comp0: false, comp1: false, comp2: false, comp3: false, comp4: false, comp5: false, comp6: false, comp7: false, comp8: false },
    21: { videoPlayed: false },
    22: { prop0: false, prop1: false, prop2: false, prop3: false, prop4: false, prop5: false },
    23: { class0: false, class1: false, class2: false, class3: false, class4: false, class5: false },
    24: { tetra0: false, tetra1: false, tetra2: false, tetra3: false },
    25: { reviewed: false }
  };

  selectedQuizChoices = {
    3: null,
    7: null,
    11: null,
    18: [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]
  };
  quizAttempts        = { 3: 0,    7: 0,    11: 0,    18: 0    };

  // Reset quiz DOM
  document.querySelectorAll('.quiz-option-row').forEach(row => row.classList.remove('selected', 'disabled'));
  document.querySelectorAll('.btn-quiz-submit').forEach(btn => { btn.disabled = true; btn.classList.remove('active'); });
  document.querySelectorAll('.quiz-feedback-card').forEach(card => card.classList.remove('active'));

  // Reset slide 18 matrix elements
  document.querySelectorAll('.matrix-check').forEach(chk => {
    chk.checked = false;
    chk.disabled = false;
  });
  const matrixTableContainer = document.getElementById('quiz-matrix-container-18');
  if (matrixTableContainer) matrixTableContainer.style.display = 'block';
  const matrixFeedbackContainer = document.getElementById('quiz-feedback-container-18');
  if (matrixFeedbackContainer) matrixFeedbackContainer.style.display = 'none';

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

  // Reset slide 19 elements
  document.querySelectorAll('.hazard-btn').forEach(btn => btn.className = 'hazard-btn pulsing');
  const hazardArrow = document.getElementById('hazard-arrow-indicator');
  const hazardCard = document.getElementById('hazard-detail-card');
  if (hazardArrow) hazardArrow.style.display = 'none';
  if (hazardCard) hazardCard.style.display = 'none';
  const warning19 = document.getElementById('slide-lock-warning-19');
  if (warning19) {
    warning19.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all four respiratory hazards above to proceed.</p>`;
    warning19.style.display = 'block';
  }

  // Reset slide 20 elements
  document.querySelectorAll('.scba-comp-btn').forEach(btn => btn.className = 'scba-comp-btn pulsing');
  const scbaCard = document.getElementById('scba-detail-card');
  if (scbaCard) scbaCard.style.display = 'none';
  const warning20 = document.getElementById('slide-lock-warning-20');
  if (warning20) {
    warning20.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Inspect all nine SCBA components on the left to proceed.</p>`;
    warning20.style.display = 'block';
  }

  // Reset slide 21 elements
  if (videoInterval) clearInterval(videoInterval);
  videoProgress = 0;
  isVideoPlaying = false;
  const videoFill = document.getElementById('video-seek-fill');
  if (videoFill) videoFill.style.width = '0%';
  const videoTime = document.getElementById('video-current-time');
  if (videoTime) videoTime.innerText = '00:00';
  const centerPlayBtn = document.getElementById('video-center-play-btn');
  if (centerPlayBtn) centerPlayBtn.style.display = 'flex';
  const frameImg = document.getElementById('video-frame-img');
  if (frameImg) {
    frameImg.style.transform = 'scale(1) translateY(0)';
  }
  const warning21 = document.getElementById('slide-lock-warning-21');
  if (warning21) {
    warning21.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Watch the simulated MEWP operations video to proceed.</p>`;
    warning21.style.display = 'block';
  }

  // Reset slide 22 elements
  document.querySelectorAll('.h2s-node-btn').forEach(node => {
    node.setAttribute('class', 'h2s-node-btn pulsing');
    const circle = node.querySelector('circle');
    if (circle) circle.style.stroke = '#5b8c9e';
  });
  const popup22 = document.getElementById('h2s-detail-popup');
  if (popup22) popup22.style.display = 'none';
  const warning22 = document.getElementById('slide-lock-warning-22');
  if (warning22) {
    warning22.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all six H2S properties above to proceed.</p>`;
    warning22.style.display = 'block';
  }

  // Reset slide 23 elements
  document.querySelectorAll('.fire-class-card').forEach(card => {
    card.className = 'fire-class-card pulsing';
  });
  const card23 = document.getElementById('fire-class-detail-card');
  if (card23) card23.style.display = 'none';
  const arrow23 = document.getElementById('fire-class-arrow');
  if (arrow23) arrow23.style.display = 'none';
  const warning23 = document.getElementById('slide-lock-warning-23');
  if (warning23) {
    warning23.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all six fire classifications above to proceed.</p>`;
    warning23.style.display = 'block';
  }

  // Reset slide 24 elements
  document.querySelectorAll('.tetra-facet').forEach(facet => {
    facet.setAttribute('class', 'tetra-facet pulsing');
  });
  const card24 = document.getElementById('tetra-detail-card');
  if (card24) card24.style.display = 'none';
  const warning24 = document.getElementById('slide-lock-warning-24');
  if (warning24) {
    warning24.innerHTML = `<p class="lock-status-text warning-glow">⚠️ Click and inspect all four facets of the Fire Tetrahedron to proceed.</p>`;
    warning24.style.display = 'block';
  }

  // Reset slide 25 elements
  const scoredEl = document.getElementById('results-scored');
  const maxEl = document.getElementById('results-max');
  const correctEl = document.getElementById('results-correct');
  const totalEl = document.getElementById('results-total');
  const accuracyEl = document.getElementById('results-accuracy');
  const attemptsEl = document.getElementById('results-attempts');
  const statusLabel = document.getElementById('results-status-label');
  if (scoredEl) scoredEl.innerText = '0';
  if (maxEl) maxEl.innerText = '7';
  if (correctEl) correctEl.innerText = '0';
  if (totalEl) totalEl.innerText = '7';
  if (accuracyEl) accuracyEl.innerText = '0%';
  if (attemptsEl) attemptsEl.innerText = '0';
  if (statusLabel) {
    statusLabel.innerText = "Failure";
    statusLabel.style.color = "#ef4444";
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

function downloadCertificate() {
  const name = document.getElementById('display-recipient-name').innerText;
  const date = document.getElementById('display-cert-date').innerText;
  const uid = document.getElementById('display-cert-uid').innerText;
  
  // Set dimensions for high quality landscape certificate
  const width = 1200;
  const height = 850;
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#fdfdfd';
  ctx.fillRect(0, 0, width, height);
  
  // Draw double border
  ctx.strokeStyle = '#244c5a'; // primary-teal
  
  // Outer thick border
  ctx.lineWidth = 12;
  ctx.strokeRect(30, 30, width - 60, height - 60);
  
  // Inner thin border
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, width - 96, height - 96);
  
  // Load Logo
  const logo = new Image();
  logo.src = 'assets/logo.png';
  logo.onload = function() {
    // Logo layout: center at top
    const logoWidth = 220;
    const logoHeight = (logo.naturalHeight / logo.naturalWidth) * logoWidth || 55;
    const logoX = (width - logoWidth) / 2;
    const logoY = 90;
    ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
    
    // Y tracker
    let currentY = logoY + logoHeight + 60;
    
    // CERTIFICATE OF ACHIEVEMENT
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f26522'; // accent-orange
    ctx.font = 'bold 28px Calibri, sans-serif';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', width / 2, currentY);
    
    // This certifies that
    currentY += 45;
    ctx.fillStyle = '#64748b'; // text-muted
    ctx.font = 'italic 20px Calibri, sans-serif';
    ctx.fillText('This certifies that', width / 2, currentY);
    
    // Recipient Name
    currentY += 65;
    ctx.fillStyle = '#244c5a'; // primary-teal
    ctx.font = 'bold 46px Calibri, sans-serif';
    ctx.fillText(name, width / 2, currentY);
    
    // Underline below name
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.moveTo(width / 2 - 180, currentY + 30);
    ctx.lineTo(width / 2 + 180, currentY + 30);
    ctx.stroke();
    
    // Description text
    currentY += 80;
    ctx.fillStyle = '#334155'; // text-dark
    ctx.font = '19px Calibri, sans-serif';
    const descText = 'has successfully met the training requirements and passed the competency evaluations for the course:';
    ctx.fillText(descText, width / 2, currentY);
    
    // Course title
    currentY += 55;
    ctx.fillStyle = '#244c5a'; // primary-teal
    ctx.font = 'bold 30px Calibri, sans-serif';
    ctx.fillText('Change Advice Notice Process', width / 2, currentY);
    
    // Manshu
    currentY += 30;
    ctx.fillStyle = '#f26522'; // accent-orange
    ctx.font = 'bold 18px Calibri, sans-serif';
    ctx.fillText('Manshu', width / 2, currentY);
    
    // Metadata block
    currentY += 85;
    
    // Y-position for the lines of meta columns
    const lineY = currentY;
    const labelY = currentY + 20;
    const valY = currentY + 45;
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 1.5;
    
    // Col 1: Completion Date
    ctx.beginPath();
    ctx.moveTo(180, lineY);
    ctx.lineTo(380, lineY);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '16px Calibri, sans-serif';
    ctx.fillText('Completion Date', 280, labelY);
    ctx.fillStyle = '#244c5a';
    ctx.font = 'bold 17px Calibri, sans-serif';
    ctx.fillText(date, 280, valY);
    
    // Col 2: Assessment
    ctx.beginPath();
    ctx.moveTo(500, lineY);
    ctx.lineTo(700, lineY);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '16px Calibri, sans-serif';
    ctx.fillText('Assessment', 600, labelY);
    ctx.fillStyle = '#244c5a';
    ctx.font = 'bold 17px Calibri, sans-serif';
    ctx.fillText('Passed (100%)', 600, valY);
    
    // Col 3: Verification ID
    ctx.beginPath();
    ctx.moveTo(820, lineY);
    ctx.lineTo(1020, lineY);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '16px Calibri, sans-serif';
    ctx.fillText('Verification ID', 920, labelY);
    ctx.fillStyle = '#244c5a';
    ctx.font = 'bold 17px Calibri, sans-serif';
    ctx.fillText(uid, 920, valY);
    
    // Trigger download
    const link = document.createElement('a');
    link.download = `Manshu_Certificate_${name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  logo.onerror = function() {
    console.error('Failed to load logo image, drawing fallback text logo.');
    // Draw simple text logo fallback
    ctx.textAlign = 'center';
    ctx.fillStyle = '#244c5a';
    ctx.font = 'bold 36px Calibri, sans-serif';
    ctx.fillText('MANSHU', width / 2, 120);
    // Proceed with logo onload code synthetically
    logo.onload();
  };
}
