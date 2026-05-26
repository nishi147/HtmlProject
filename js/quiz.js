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
