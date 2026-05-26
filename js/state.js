// ─────────────────────────────────────────────
// js/state.js — Global State & Data Definitions
// ─────────────────────────────────────────────

// Course State Variables
let currentSlide = 0;
const totalSlides = 21; // slides 0 – 20
let slideCompleted = Array(totalSlides).fill(false);
let slideTimer = null;
let slideProgressPercent = 0;
let isPlaying = false;
let soundEnabled = false;
let playbackSpeed = 1.0;

// Narration Transcripts Database
const slideTranscripts = {
  0:  "Welcome to the digital competency module on the Change Advice Notice (CAN) Process. This course will cover management controls, thresholds, and operational roles for engineering changes on Atlantic installations.",
  1:  "Before beginning the training, please review the player layout to understand the interface controls. The left panel allows you to track progress, inspect glossary terms, or download guidelines. The bottom bar contains playback narration controls.",
  2:  "This training module has been developed to give an overview of the document practices in use for the SeaRose FPSO with respect to the Change Advice Notice Process or CANs.",
  3:  "The Change Advice Notice (CAN) is categorized into three specific types to manage modifications: Permanent, Temporary, and Urgent CANs.",
  4:  "Knowledge Check 1: Review the prompt and choose the correct answer to evaluate your understanding of the baseline safety system configuration limits control on the FPSO.",
  5:  "CAN 100 Process: Initiation and Scope, Engineering Assessment, and Approvals. Click each step in the timeline to investigate active checklists and responsible roles.",
  6:  "Offshore execution requires strict safety case boundary mapping. All physical work packs on the SeaRose FPSO or deep sea drilling ships must reference the specific CAN ID matching the configuration change.",
  7:  "Onshore support acts as the design vetting clearinghouse. Lead discipline experts coordinate drawings updates and structural modeling calculations.",
  8:  "Knowledge Check 2: Test your understanding of who performs structural calculations and checks drawing accuracy during design assessment phases.",
  9:  "The CAN 400 workflow controls process alarm limits changes and safety-critical software upgrades.",
  10: "CAN 600 represents procedural changes and operational deviations from standard manuals.",
  11: "Drawing configuration integrity must be maintained. Redline drawings are physically marked up in red by field technicians.",
  12: "Knowledge Check 3: Confirm drawing markup standard colors used in field configuration redlines on mechanical drawings.",
  13: "Critical safety documents represent safety-critical parameters defined in safety cases.",
  14: "Vendor manuals and equipment package specifications must reflect physical equipment modifications.",
  15: "When changes are superseded by subsequent modifications, the old CAN records must be officially cross-referenced.",
  16: "Temporary modifications must either be removed or officially merged into parent master files before CAN closeout.",
  17: "Revisions are categorized based on risk impacts: Major revisions require full engineering re-assessment.",
  18: "Revision numbering follows strict controls: draft revisions are alphabetical letters (Rev A, Rev B), and approved baselines are published as numerical digits (Rev 0, Rev 1).",
  19: "Knowledge Check 4: Test your understanding of drawing revision naming formats for approved baseline files ready for installation.",
  20: "Congratulations! You have completed the Change Advice Notice Process training. Please enter your name below to generate your official Training Certificate."
};

// Course Interactions State
let slideInteractions = {
  5: { step1: false, step2: false, step3: false }
};

// Quiz State
let selectedQuizChoices = { 4: null, 8: null, 12: null, 19: null };
let quizAttempts      = { 4: 0,    8: 0,    12: 0,    19: 0    };
const quizCorrectMapping = { 4: 1, 8: 0, 12: 1, 19: 1 };

// DOM Element References (populated on DOMContentLoaded)
let btnPrev, btnNext, playIcon, pauseIcon,
    seekFill, seekHandle, slideCountBadge, playerActiveTitle;

// Sound is fully disabled — no-op stub kept so call-sites don't throw
function playSound(type) { /* audio-less */ }
