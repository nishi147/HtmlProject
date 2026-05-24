// Storyline Player Controller with Transcripts & Notes Printing

// Course State Variables
let currentSlide = 0;
const totalSlides = 9; // 0 to 8 (Welcome to Knowledge Check 2)
let slideCompleted = Array(totalSlides).fill(false); // track if slide is completed
let slideTimer = null;
let slideProgressPercent = 0;
let isPlaying = false;
let soundEnabled = true;
let playbackSpeed = 1.0;

// Narration Transcripts Database
const slideTranscripts = {
  0: "Welcome to the digital competency module on the Change Advice Notice (CAN) Process. This course will cover management controls, thresholds, and operational roles for engineering changes on Atlantic installations.",
  1: "Before beginning the training, please review the player layout to understand the interface controls. The left panel allows you to track progress, inspect glossary terms, or download guidelines. The bottom bar contains playback narration controls.",
  2: "This training module has been developed to give an overview of the document practices in use for the SeaRose FPSO with respect to the Change Advice Notice Process or CANs.",
  3: "The Change Advice Notice (CAN) is categorized into three specific types to manage modifications: Permanent, Temporary, and Urgent CANs. In this slide we outline the main questions you will learn to answer regarding these types: What is a Permanent Change Advice Notice? When is a Temporary Bypass CAN required? What defines an Urgent Engineering CAN? Who reviews and approves each specific CAN type? And how are safety-critical controls bypassed safely?",
  4: "Knowledge Check 1: Review the prompt and choose the correct answer to evaluate your understanding of the baseline safety system configuration limits control on the FPSO.",
  5: "CAN 100 Process: Initiation and Scope, Engineering Assessment, and Approvals. Click each step in the timeline to investigate active checklists and responsible roles.",
  6: "Offshore execution requires strict safety case boundary mapping. All physical work packs on the SeaRose FPSO or deep sea drilling ships must reference the specific CAN ID matching the configuration change.",
  7: "Onshore support acts as the design vetting clearinghouse. Lead discipline experts coordinate drawings updates and structural modeling calculations. No redlines are committed to standard libraries without onshore engineering sign-off.",
  8: "Knowledge Check 2: Test your understanding of who performs structural calculations and checks drawing accuracy during design assessment phases.",
  9: "The CAN 400 workflow controls process alarm limits changes and safety-critical software upgrades. Software logic shifts must undergo hardware-in-the-loop (HIL) simulators testing to prevent unexpected trip patterns.",
  10: "CAN 600 represents procedural changes and operational deviations from standard manuals. Departures from operating procedures must be rigorously backed by safety risk matrix approvals and operations manager sign-off.",
  11: "Drawing configuration integrity must be maintained. Redline drawings are physically marked up in red by field technicians and committed to CAD drafts for revision updates to prevent operational hazards.",
  12: "Knowledge Check 3: Confirm drawing markup standard colors used in field configuration redlines on mechanical drawings.",
  13: "Critical safety documents represent safety-critical parameters defined in safety cases. Changes to escape routes or fire and gas envelopes require regulatory notification and C-NLOPB compliance reviews.",
  14: "Vendor manuals and equipment package specifications must reflect physical equipment modifications to prevent operational maintenance errors on the platform.",
  15: "When changes are superseded by subsequent modifications, the old CAN records must be officially cross-referenced, flagged as 'Superseded' or 'Void' in the system database, and locked to read-only.",
  16: "Temporary modifications must either be removed or officially merged into parent master files before CAN closeout to avoid document sprawl and ensure drawing integrity.",
  17: "Revisions are categorized based on risk impacts: Major revisions require full engineering re-assessment, while Minor revisions require Technical Authority review only. Never slip extra changes into minor logs.",
  18: "Revision numbering follows strict controls: draft revisions are alphabetical letters (Rev A, Rev B), and approved baselines are published as numerical digits (Rev 0, Rev 1).",
  19: "Knowledge Check 4: Test your understanding of drawing revision naming formats for approved baseline files ready for installation.",
  20: "Congratulations! You have completed the Change Advice Notice Process training. Please enter your name below to generate your official Training Certificate."
};

// Course Interactions State
let slideInteractions = {
  5: { step1: false, step2: false, step3: false }  // CAN 100 Process: requires clicking 3 timeline nodes
};

// Redesigned Quiz State
let selectedQuizChoices = {
  4: null,
  8: null,
  12: null,
  19: null
};
let quizAttempts = {
  4: 0,
  8: 0,
  12: 0,
  19: 0
};
const quizCorrectMapping = {
  4: 1,  // B
  8: 0,  // A
  12: 1, // B
  19: 1  // B
};

// DOM Elements
let btnPrev, btnNext, playIcon, pauseIcon, seekFill, seekHandle, slideCountBadge, playerActiveTitle;

// Synthetic Sound Synthesizer (Web Audio API)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (!soundEnabled) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  
  if (type === 'click') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  } else if (type === 'success') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523, now); // C5
    osc.frequency.setValueAtTime(659, now + 0.08); // E5
    osc.frequency.setValueAtTime(784, now + 0.16); // G5
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.35);
  } else if (type === 'error') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.25);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'complete') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(554, now + 0.1);
    osc.frequency.setValueAtTime(659, now + 0.2);
    osc.frequency.setValueAtTime(880, now + 0.3);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.start(now);
    osc.stop(now + 0.6);
  }
}

// Initialize Course
document.addEventListener('DOMContentLoaded', () => {
  btnPrev = document.getElementById('btn-prev-slide');
  btnNext = document.getElementById('btn-next-slide');
  playIcon = document.getElementById('play-icon');
  pauseIcon = document.getElementById('pause-icon');
  seekFill = document.getElementById('seek-fill-progress');
  seekHandle = document.getElementById('seek-handle-node');
  slideCountBadge = document.getElementById('slide-count-badge');
  playerActiveTitle = document.getElementById('player-active-title');
  
  // Set initial completion states for Welcome & Navigation
  slideCompleted[0] = true;
  slideCompleted[1] = true;
  
  updateSidebarMenu();
  updateControls();
});

// ENTER COURSE
function enterCourse() {
  playSound('click');
  document.getElementById('landing-screen').classList.remove('active');
  document.getElementById('dashboard-screen').classList.add('active');
  goToSlide(0);
}

// SLIDE NAVIGATOR
function goToSlide(slideIdx) {
  if (slideIdx < 0 || slideIdx >= totalSlides) return;
  
  // Stop existing seek timers
  stopSeekTimer();
  
  // Remove active classes
  document.getElementById(`slide-${currentSlide}`).classList.remove('active');
  document.getElementById(`outline-item-${currentSlide}`).classList.remove('active');
  
  currentSlide = slideIdx;
  
  // Add active classes
  document.getElementById(`slide-${currentSlide}`).classList.add('active');
  const outlineNode = document.getElementById(`outline-item-${currentSlide}`);
  outlineNode.classList.add('active');
  
  // Scroll list to center outline item
  outlineNode.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Update header titles and pill counters
  const titleText = outlineNode.querySelector('.outline-title').innerText;
  playerActiveTitle.innerText = titleText;
  slideCountBadge.innerText = `${currentSlide + 1} of ${totalSlides}`;
  
  // Update floating transcript text dynamically
  const transText = slideTranscripts[currentSlide] || "No transcript available.";
  document.getElementById('transcript-text').innerText = transText;
  
  // Initialize slide progress
  slideProgressPercent = 0;
  updateProgressBar();
  
  // If slide is already completed, set progress to 100% instantly
  if (slideCompleted[currentSlide]) {
    slideProgressPercent = 100;
    updateProgressBar();
    updateControls();
  } else {
    // If not completed, auto start playing simulation
    startPlay();
  }
  
  // Show appropriate quiz states if we are on a quiz slide
  if ([4, 8, 12, 19].includes(slideIdx)) {
    const wrapper = document.getElementById(`feedback-card-wrapper-${slideIdx}`);
    if (wrapper) {
      wrapper.querySelectorAll('.quiz-feedback-card').forEach(card => {
        card.classList.remove('active');
      });
      
      const selectedOption = selectedQuizChoices[slideIdx];
      const group = document.getElementById(`quiz-options-${slideIdx}`);
      
      if (slideCompleted[slideIdx]) {
        const isCorrect = selectedOption === quizCorrectMapping[slideIdx];
        if (isCorrect) {
          document.getElementById(`quiz-correct-${slideIdx}`).classList.add('active');
        } else {
          document.getElementById(`quiz-incorrect-${slideIdx}`).classList.add('active');
        }
        
        group.querySelectorAll('.quiz-option-row').forEach((row, idx) => {
          row.classList.add('disabled');
          if (idx === selectedOption) {
            row.classList.add('selected');
          } else {
            row.classList.remove('selected');
          }
        });
        
        const submitBtn = document.getElementById(`btn-quiz-submit-${slideIdx}`);
        submitBtn.disabled = true;
        submitBtn.classList.remove('active');
      } else {
        group.querySelectorAll('.quiz-option-row').forEach((row, idx) => {
          row.classList.remove('disabled');
          if (selectedOption !== null && idx === selectedOption) {
            row.classList.add('selected');
          } else {
            row.classList.remove('selected');
          }
        });
        
        const submitBtn = document.getElementById(`btn-quiz-submit-${slideIdx}`);
        if (selectedOption !== null) {
          submitBtn.disabled = false;
          submitBtn.classList.add('active');
        } else {
          submitBtn.disabled = true;
          submitBtn.classList.remove('active');
        }
      }
    }
  }
  
  // Setup specifics for slide types
  if (currentSlide === 20) {
    validateCertNameInput();
  }
  
  // Initialize Slide 1 Interactive Diagram state
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
  playSound('click');
  goToSlide(currentSlide + direction);
}

// PROGRESS TIMER SIMULATION
function startPlay() {
  isPlaying = true;
  playIcon.style.display = 'none';
  pauseIcon.style.display = 'block';
  syncDiagramPlayPause(true);
  
  // Clear any existing intervals
  if (slideTimer) clearInterval(slideTimer);
  
  // Simulate standard duration progression
  slideTimer = setInterval(() => {
    // Check specific slide requirements
    const lockedByInteractions = isSlideLockedByInteractions(currentSlide);
    
    if (!lockedByInteractions) {
      slideProgressPercent += 5; // increment progress
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
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  if (slideTimer) clearInterval(slideTimer);
  syncDiagramPlayPause(false);
}

function togglePlayPause() {
  playSound('click');
  if (isPlaying) {
    pausePlay();
  } else {
    startPlay();
  }
}

function stopSeekTimer() {
  isPlaying = false;
  playIcon.style.display = 'block';
  pauseIcon.style.display = 'none';
  if (slideTimer) clearInterval(slideTimer);
  syncDiagramPlayPause(false);
}

// Seek slide duration on progress bar click
function seekSlideTimeline(event) {
  const seekTrack = document.getElementById('seek-track-bar');
  const rect = seekTrack.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = Math.round((clickX / rect.width) * 100);
  
  playSound('click');
  
  if (slideCompleted[currentSlide]) {
    slideProgressPercent = Math.max(0, Math.min(percentage, 100));
  } else {
    slideProgressPercent = Math.max(0, Math.min(percentage, 99)); // cap at 99 so they can't bypass click requirements
  }
  updateProgressBar();
  
  if (isPlaying) {
    startPlay();
  }
}

// Render Seek progress bar positions
function updateProgressBar() {
  seekFill.style.width = `${slideProgressPercent}%`;
  seekHandle.style.left = `${slideProgressPercent}%`;
  
  const diagSeekFill = document.getElementById('diag-seek-fill');
  const diagSeekHandle = document.getElementById('diag-seek-handle');
  if (diagSeekFill && diagSeekHandle) {
    diagSeekFill.style.width = `${slideProgressPercent}%`;
    diagSeekHandle.style.left = `${slideProgressPercent}%`;
  }
}

// Set slide complete
function markSlideComplete(slideIdx) {
  slideCompleted[slideIdx] = true;
  const outlineNode = document.getElementById(`outline-item-${slideIdx}`);
  if (outlineNode) {
    outlineNode.classList.add('completed');
  }
  playSound('success');
  updateControls();
}

// Update control actions availability
function updateControls() {
  btnPrev.disabled = currentSlide === 0;
  
  const canGoNext = slideCompleted[currentSlide];
  btnNext.disabled = !canGoNext;
  
  const diagPrev = document.getElementById('diag-prev-btn');
  const diagNext = document.getElementById('diag-next-btn');
  if (diagPrev) {
    diagPrev.disabled = currentSlide === 0;
  }
  if (diagNext) {
    diagNext.disabled = !canGoNext;
  }
}

// SIDEBAR SUB-TABS MANAGER
function switchSidebarTab(tabName) {
  playSound('click');
  
  // Deactivate all tab buttons & lists
  document.querySelectorAll('.sidebar-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.sidebar-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Active selected
  document.getElementById(`tab-btn-${tabName}`).classList.add('active');
  document.getElementById(`tab-content-${tabName}`).classList.add('active');
  
  // Toggle search box visible state
  const searchBox = document.getElementById('sidebar-search-box');
  if (tabName === 'menu') {
    searchBox.style.display = 'block';
  } else {
    searchBox.style.display = 'none';
  }
}

// SEARCH FILTER logic
function filterOutlineList() {
  const query = document.getElementById('outline-search').value.toLowerCase();
  
  document.querySelectorAll('.outline-item').forEach(item => {
    const title = item.querySelector('.outline-title').innerText.toLowerCase();
    if (title.includes(query)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// COLLAPSE / EXPAND SIDEBAR
function toggleSidebar() {
  playSound('click');
  const sidebar = document.getElementById('player-sidebar');
  sidebar.classList.toggle('collapsed');
}

// VOLUME MUTE/UNMUTE
function toggleVolume() {
  soundEnabled = !soundEnabled;
  const volOn = document.getElementById('vol-on-svg');
  const volOff = document.getElementById('vol-off-svg');
  
  if (soundEnabled) {
    volOn.style.display = 'block';
    volOff.style.display = 'none';
    playSound('click');
  } else {
    volOn.style.display = 'none';
    volOff.style.display = 'block';
  }
  
  syncDiagramVolume(soundEnabled);
}


/* TOP UTILITY ACTION BAR BUTTONS */

// 1. TRANSCRIPT Toggle
function toggleTranscript() {
  playSound('click');
  const bubble = document.getElementById('transcript-bubble');
  bubble.classList.toggle('active');
}

// 2. MY NOTES MODAL
function openNotesModal() {
  playSound('click');
  // Pause course narration background timer
  pausePlay();
  
  document.getElementById('notes-modal').classList.add('active');
}

function closeNotesModal() {
  playSound('click');
  document.getElementById('notes-modal').classList.remove('active');
}

// Custom Notes Printing Action
function printNotes() {
  const textarea = document.getElementById('notes-text-area');
  const notesText = textarea.value;
  if (!notesText.trim()) {
    playSound('error');
    textarea.classList.add('warning-shake');
    textarea.placeholder = "Notes area is empty. Please type some study notes before printing...";
    setTimeout(() => {
      textarea.classList.remove('warning-shake');
    }, 500);
    return;
  }
  
  playSound('click');
  
  // Open printing iframe/window
  const printWindow = window.open('', '_blank', 'width=600,height=500');
  printWindow.document.write(`
    <html>
    <head>
      <title>Manshu Learning - CAN Process Notes</title>
      <style>
        body { font-family: sans-serif; padding: 40px; color: #333; line-height: 1.6; }
        h2 { color: #244c5a; border-bottom: 2px solid #f26522; padding-bottom: 10px; font-family: sans-serif; }
        .date { font-size: 0.85rem; color: #777; margin-bottom: 25px; }
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
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 3. HELP MODAL
function openHelpModal() {
  playSound('click');
  pausePlay();
  document.getElementById('help-modal').classList.add('active');
}

function closeHelpModal() {
  playSound('click');
  document.getElementById('help-modal').classList.remove('active');
}

// 4. EXIT COURSE
function exitCourse() {
  playSound('click');
  pausePlay();
  document.getElementById('exit-modal').classList.add('active');
}

function closeExitModal() {
  playSound('click');
  document.getElementById('exit-modal').classList.remove('active');
}

function confirmExitCourse() {
  playSound('click');
  document.getElementById('exit-modal').classList.remove('active');
  // Reset page back to welcome screen
  document.getElementById('dashboard-screen').classList.remove('active');
  document.getElementById('landing-screen').classList.add('active');
}


/* PAGE INTERACTION CHECKS */

function isSlideLockedByInteractions(slideIdx) {
  if (slideIdx === 5) {
    // Locked until step 1, 2, and 3 are clicked in the workflow slide
    return !Object.values(slideInteractions[5]).every(val => val === true);
  }
  // Quizzes lock until answered
  if ([4, 8, 12, 19].includes(slideIdx)) {
    return !slideCompleted[slideIdx];
  }
  return false;
}

// Slide 5 details trigger click
function triggerSlideInteraction(slideIdx, elementKey, elementDOM) {
  if (slideIdx === 5) {
    playSound('click');
    slideInteractions[5][elementKey] = true;
    
    elementDOM.parentElement.querySelectorAll('.mini-timeline-item').forEach(item => {
      item.classList.remove('clicked');
    });
    elementDOM.classList.add('clicked');
    
    const detailBox = document.getElementById('step-detail-container');
    if (elementKey === 'step1') {
      detailBox.innerHTML = `
        <div style="text-align:left; width:100%;">
          <h5 style="color:var(--accent-orange); margin-bottom:10px;">Step 1: Initiation</h5>
          <p style="font-size:0.8rem; line-height:1.4; color:#555;">The initiator creates the CAN entry, attaches support specifications, and outlines the rationale. A cross-functional review determines preliminary risk categories.</p>
        </div>
      `;
    } else if (elementKey === 'step2') {
      detailBox.innerHTML = `
        <div style="text-align:left; width:100%;">
          <h5 style="color:var(--accent-orange); margin-bottom:10px;">Step 2: Engineering Assessment</h5>
          <p style="font-size:0.8rem; line-height:1.4; color:#555;">Discipline specialists review drawings (P&IDs), verify materials bounds, and complete hazard evaluations (HAZOP/HAZID) mapping barrier tolerances.</p>
        </div>
      `;
    } else if (elementKey === 'step3') {
      detailBox.innerHTML = `
        <div style="text-align:left; width:100%;">
          <h5 style="color:var(--accent-orange); margin-bottom:10px;">Step 3: Approvals</h5>
          <p style="font-size:0.8rem; line-height:1.4; color:#555;">The Technical Authority evaluates the safety documentation packages. Final operational execution is approved based on platform authorization rules.</p>
        </div>
      `;
    }
    
    if (!isSlideLockedByInteractions(5)) {
      document.getElementById('slide-lock-warning-5').style.display = 'none';
    }
  }
}

// Redesigned Quiz Functionality
function selectQuizOption(slideIdx, optionIdx, element) {
  if (slideCompleted[slideIdx]) return;
  if (element.classList.contains('disabled')) return;
  
  playSound('click');
  selectedQuizChoices[slideIdx] = optionIdx;
  
  const group = document.getElementById(`quiz-options-${slideIdx}`);
  group.querySelectorAll('.quiz-option-row').forEach((row, idx) => {
    if (idx === optionIdx) {
      row.classList.add('selected');
    } else {
      row.classList.remove('selected');
    }
  });
  
  const submitBtn = document.getElementById(`btn-quiz-submit-${slideIdx}`);
  submitBtn.disabled = false;
  submitBtn.classList.add('active');
}

function submitQuizAnswer(slideIdx) {
  const selectedIdx = selectedQuizChoices[slideIdx];
  if (selectedIdx === null) return;
  
  const correctIdx = quizCorrectMapping[slideIdx];
  const submitBtn = document.getElementById(`btn-quiz-submit-${slideIdx}`);
  const group = document.getElementById(`quiz-options-${slideIdx}`);
  
  group.querySelectorAll('.quiz-option-row').forEach(row => {
    row.classList.add('disabled');
  });
  
  submitBtn.disabled = true;
  submitBtn.classList.remove('active');
  
  const wrapper = document.getElementById(`feedback-card-wrapper-${slideIdx}`);
  wrapper.querySelectorAll('.quiz-feedback-card').forEach(card => {
    card.classList.remove('active');
  });
  
  if (selectedIdx === correctIdx) {
    playSound('success');
    document.getElementById(`quiz-correct-${slideIdx}`).classList.add('active');
    markSlideComplete(slideIdx);
  } else {
    const attempt = quizAttempts[slideIdx];
    quizAttempts[slideIdx]++;
    
    if (attempt === 0) {
      playSound('error');
      document.getElementById(`quiz-try-again-${slideIdx}`).classList.add('active');
    } else {
      playSound('error');
      document.getElementById(`quiz-incorrect-${slideIdx}`).classList.add('active');
      markSlideComplete(slideIdx);
    }
  }
}

function retryQuizQuestion(slideIdx) {
  playSound('click');
  
  const wrapper = document.getElementById(`feedback-card-wrapper-${slideIdx}`);
  wrapper.querySelectorAll('.quiz-feedback-card').forEach(card => {
    card.classList.remove('active');
  });
  
  selectedQuizChoices[slideIdx] = null;
  
  const group = document.getElementById(`quiz-options-${slideIdx}`);
  group.querySelectorAll('.quiz-option-row').forEach(row => {
    row.classList.remove('selected', 'disabled');
  });
  
  const submitBtn = document.getElementById(`btn-quiz-submit-${slideIdx}`);
  submitBtn.disabled = true;
  submitBtn.classList.remove('active');
}


/* CERTIFICATE SETUP & PRINT OVERLAYS */

function validateCertNameInput() {
  const nameInput = document.getElementById('final-cert-name');
  const btn = document.getElementById('btn-generate-cert');
  if (nameInput.value.trim().length >= 3) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

function generateFinalCertificate() {
  playSound('complete');
  
  const name = document.getElementById('final-cert-name').value.trim();
  document.getElementById('display-recipient-name').innerText = name;
  
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const todayStr = new Date().toLocaleDateString('en-US', dateOptions);
  document.getElementById('display-cert-date').innerText = todayStr;
  
  const uid = Math.floor(100000 + Math.random() * 900000);
  document.getElementById('display-cert-uid').innerText = `MANSHU-${uid}-CAN`;
  
  document.getElementById('cert-setup-container').style.display = 'none';
  document.getElementById('final-certificate-box').style.display = 'block';
  
  markSlideComplete(20);
}

// RESTART COURSE FROM SLIDE 0
function restartCourseRedesign() {
  playSound('click');
  
  slideCompleted = Array(totalSlides).fill(false);
  slideCompleted[0] = true;
  slideCompleted[1] = true;
  
  slideInteractions = {
    5: { step1: false, step2: false, step3: false }
  };
  
  // Reset redesigned quiz states
  selectedQuizChoices = {
    4: null,
    8: null,
    12: null,
    19: null
  };
  quizAttempts = {
    4: 0,
    8: 0,
    12: 0,
    19: 0
  };
  
  // Reset quiz option rows in DOM
  document.querySelectorAll('.quiz-option-row').forEach(row => {
    row.classList.remove('selected', 'disabled');
  });
  
  // Reset quiz submit buttons in DOM
  document.querySelectorAll('.btn-quiz-submit').forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('active');
  });
  
  // Hide all quiz feedback cards
  document.querySelectorAll('.quiz-feedback-card').forEach(card => {
    card.classList.remove('active');
  });
  
  document.getElementById('final-cert-name').value = '';
  document.getElementById('cert-setup-container').style.display = 'block';
  document.getElementById('final-certificate-box').style.display = 'none';
  
  document.querySelectorAll('.outline-item').forEach((node, idx) => {
    node.classList.remove('completed', 'active');
    if (idx === 0 || idx === 1) {
      node.classList.add('completed');
    }
  });
  
  document.querySelectorAll('.mini-timeline-item').forEach(item => item.classList.remove('clicked'));
  document.getElementById('slide-lock-warning-5').style.display = 'block';
  document.getElementById('step-detail-container').innerHTML = 'Click on a workflow timeline node to inspect roles and checklist details.';
  
  goToSlide(0);
}

function updateSidebarMenu() {
  slideCompleted.forEach((done, idx) => {
    const item = document.getElementById(`outline-item-${idx}`);
    if (item) {
      if (done) {
        item.classList.add('completed');
      } else {
        item.classList.remove('completed');
      }
    }
  });
}

// 5. TOAST NOTIFICATION SYSTEM
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.innerText = message;
  
  // Apply standard design token styles to toast
  toast.style.background = 'var(--primary-teal)';
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '6px';
  toast.style.boxShadow = 'var(--shadow-lg)';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '600';
  toast.style.fontFamily = 'var(--font-body)';
  toast.style.borderLeft = '4px solid var(--accent-orange)';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px)';
  toast.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  
  container.appendChild(toast);
  
  // Trigger entry animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);
  
  // Trigger exit animation and remove toast after display
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// 6. RESOURCE DOWNLOAD SIMULATION
function downloadResource(filename) {
  playSound('click');
  showToast(`Downloading: ${filename}`);
}

// 7. DIAGRAM INTERACTIVE SYNC HOOKS
function togglePlayPauseFromDiagram() {
  togglePlayPause();
}

function toggleVolumeFromDiagram() {
  toggleVolume();
}

function seekFromDiagram(event) {
  const track = document.getElementById('diag-seek-track');
  if (!track) return;
  
  const rect = track.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = Math.round((clickX / rect.width) * 100);
  
  playSound('click');
  
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

// Sleek Control Bar Actions
function replaySlide() {
  playSound('click');
  slideProgressPercent = 0;
  updateProgressBar();
  if (currentSlide === 5) {
    slideInteractions[5] = { step1: false, step2: false, step3: false };
    const detailBox = document.getElementById('step-detail-container');
    if (detailBox) {
      detailBox.innerHTML = 'Click on a workflow timeline node to inspect roles and checklist details.';
    }
    const warning = document.getElementById('slide-lock-warning-5');
    if (warning) {
      warning.style.display = 'block';
    }
    document.querySelectorAll('.mini-timeline-item').forEach(item => item.classList.remove('clicked'));
    slideCompleted[5] = false;
    updateControls();
  }
  startPlay();
}

function showSettings() {
  playSound('click');
  if (playbackSpeed === 1.0) {
    playbackSpeed = 1.25;
  } else if (playbackSpeed === 1.25) {
    playbackSpeed = 1.5;
  } else if (playbackSpeed === 1.5) {
    playbackSpeed = 2.0;
  } else {
    playbackSpeed = 1.0;
  }
  showToast(`Playback Speed: ${playbackSpeed}x`);
  if (isPlaying) {
    startPlay();
  }
}

function toggleFullscreen() {
  playSound('click');
  const container = document.documentElement;
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
