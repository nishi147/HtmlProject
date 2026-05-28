// ─────────────────────────────────────────────
// js/quiz.js — Quiz Interaction Logic
// ─────────────────────────────────────────────

function selectQuizOption(slideIdx, optionIdx, element) {
  if (slideCompleted[slideIdx]) return;
  if (element.classList.contains('disabled')) return;

  selectedQuizChoices[slideIdx] = optionIdx;

  const group = document.getElementById(`quiz-options-${slideIdx}`);
  group.querySelectorAll('.quiz-option-row').forEach((row, idx) => {
    row.classList.toggle('selected', idx === optionIdx);
  });

  const submitBtn = document.getElementById(`btn-quiz-submit-${slideIdx}`);
  submitBtn.disabled = false;
  submitBtn.classList.add('active');
}

function submitQuizAnswer(slideIdx) {
  const selectedIdx = selectedQuizChoices[slideIdx];
  if (selectedIdx === null) return;

  const correctIdx = quizCorrectMapping[slideIdx];
  const submitBtn  = document.getElementById(`btn-quiz-submit-${slideIdx}`);
  const group      = document.getElementById(`quiz-options-${slideIdx}`);

  group.querySelectorAll('.quiz-option-row').forEach(row => row.classList.add('disabled'));
  submitBtn.disabled = true;
  submitBtn.classList.remove('active');

  const wrapper = document.getElementById(`feedback-card-wrapper-${slideIdx}`);
  wrapper.querySelectorAll('.quiz-feedback-card').forEach(card => card.classList.remove('active'));

  if (selectedIdx === correctIdx) {
    document.getElementById(`quiz-correct-${slideIdx}`).classList.add('active');
    markSlideComplete(slideIdx);
  } else {
    const attempt = quizAttempts[slideIdx];
    quizAttempts[slideIdx]++;
    if (attempt === 0) {
      document.getElementById(`quiz-try-again-${slideIdx}`).classList.add('active');
    } else {
      document.getElementById(`quiz-incorrect-${slideIdx}`).classList.add('active');
      markSlideComplete(slideIdx);
    }
  }
}

function retryQuizQuestion(slideIdx) {
  const wrapper = document.getElementById(`feedback-card-wrapper-${slideIdx}`);
  wrapper.querySelectorAll('.quiz-feedback-card').forEach(card => card.classList.remove('active'));

  selectedQuizChoices[slideIdx] = null;

  const group = document.getElementById(`quiz-options-${slideIdx}`);
  group.querySelectorAll('.quiz-option-row').forEach(row => row.classList.remove('selected', 'disabled'));

  const submitBtn = document.getElementById(`btn-quiz-submit-${slideIdx}`);
  submitBtn.disabled = true;
  submitBtn.classList.remove('active');
}

// ── MATRIX QUIZ LOGIC (Slide 16) ────────────────
function toggleMatrixCheckbox(row, col) {
  if (slideCompleted[16]) return;

  selectedQuizChoices[16][row][col] = !selectedQuizChoices[16][row][col];

  // Enable submit button if at least one checkbox is checked
  const hasSelection = selectedQuizChoices[16].some(r => r.some(c => c === true));
  const submitBtn = document.getElementById('btn-quiz-submit-16');
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

function submitMatrixAnswer() {
  if (slideCompleted[16]) return;

  const userGrid = selectedQuizChoices[16];
  
  // Correct mappings:
  // Row 0 (C1, C2) -> Col 1 (Approved for Construction)
  // Row 1 (B1, B2) -> Col 0 (Review EPIC)
  // Row 2 (Z1, Z2) -> Col 3 (As-Built)
  // Row 3 (E1, E2) -> Col 2 (Issued for Use)
  const correctGrid = [
    [false, true, false, false],
    [true, false, false, false],
    [false, false, false, true],
    [false, false, true, false]
  ];

  let isCorrect = true;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (userGrid[r][c] !== correctGrid[r][c]) {
        isCorrect = false;
        break;
      }
    }
    if (!isCorrect) break;
  }

  // Hide table container, disable checkboxes
  document.querySelectorAll('.matrix-check').forEach(chk => chk.disabled = true);
  const tableContainer = document.getElementById('quiz-matrix-container-16');
  if (tableContainer) tableContainer.style.display = 'none';

  const feedbackContainer = document.getElementById('quiz-feedback-container-16');
  if (feedbackContainer) feedbackContainer.style.display = 'block';

  // Hide all feedback cards initially
  document.getElementById('matrix-feedback-correct-16').style.display = 'none';
  document.getElementById('matrix-feedback-try-again-16').style.display = 'none';
  document.getElementById('matrix-feedback-incorrect-16').style.display = 'none';

  const submitBtn = document.getElementById('btn-quiz-submit-16');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.remove('active');
  }

  if (isCorrect) {
    document.getElementById('matrix-feedback-correct-16').style.display = 'block';
    markSlideComplete(16);
  } else {
    quizAttempts[16]++;
    if (quizAttempts[16] === 1) {
      document.getElementById('matrix-feedback-try-again-16').style.display = 'block';
    } else {
      document.getElementById('matrix-feedback-incorrect-16').style.display = 'block';
      markSlideComplete(16);
    }
  }
}

function retryMatrixQuestion() {
  // Reset selectedChoices matrix to all false
  selectedQuizChoices[16] = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ];

  // Re-enable and uncheck all checkboxes
  document.querySelectorAll('.matrix-check').forEach(chk => {
    chk.checked = false;
    chk.disabled = false;
  });

  // Hide feedback, show table
  const feedbackContainer = document.getElementById('quiz-feedback-container-16');
  if (feedbackContainer) feedbackContainer.style.display = 'none';

  const tableContainer = document.getElementById('quiz-matrix-container-16');
  if (tableContainer) tableContainer.style.display = 'block';

  const submitBtn = document.getElementById('btn-quiz-submit-16');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.remove('active');
  }
}
