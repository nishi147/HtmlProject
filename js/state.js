// ─────────────────────────────────────────────
// js/state.js — Global State & Data Definitions
// ─────────────────────────────────────────────

// Course State Variables
let currentSlide = 0;
const totalSlides = 27; // slides 0 – 26
let slideCompleted = Array(totalSlides).fill(false);
let slideTimer = null;
let slideProgressPercent = 0;
let isPlaying = false;
let soundEnabled = false;
let playbackSpeed = 1.0;

// Narration Transcripts Database
const slideTranscripts = {
  0:  "Before beginning the training, please review the player layout to understand the interface controls. The left panel allows you to track progress, inspect glossary terms, or download guidelines. The bottom bar contains playback narration controls.",
  1:  "This training module has been developed to give an overview of the document practices in use for the SeaRose FPSO with respect to the Change Advice Notice Process or CANs.",
  2:  "The Change Advice Notice (CAN) is categorized into three specific types to manage modifications: Permanent, Temporary, and Urgent CANs.",
  3:  "Knowledge Check 1: Review the prompt and choose the correct answer to evaluate your understanding of the baseline safety system configuration limits control on the FPSO.",
  4:  "CAN 100 Process: Initiation and Scope, Engineering Assessment, and Approvals. Click each step in the timeline to investigate active checklists and responsible roles.",
  5:  "Offshore execution requires strict safety case boundary mapping. All physical work packs on the SeaRose FPSO or deep sea drilling ships must reference the specific CAN ID matching the configuration change.",
  6:  "Onshore support acts as the design vetting clearinghouse. Lead discipline experts coordinate drawings updates and structural modeling calculations.",
  7:  "Knowledge Check 2: Test your understanding of who performs structural calculations and checks drawing accuracy during design assessment phases.",
  8:  "The CAN 400 workflow controls process alarm limits changes and safety-critical software upgrades. Perform both review actions to unlock detail details.",
  9:  "CAN 600 represents procedural changes and operational deviations from standard manuals.",
  10: "Drawing configuration integrity must be maintained. Redline drawings are physically marked up in red by field technicians.",
  11: "Knowledge Check 3: Confirm drawing markup standard colors used in field configuration redlines on mechanical drawings.",
  12: "Critical safety documents represent safety-critical parameters defined in safety cases.",
  13: "Vendor manuals and equipment package specifications must reflect physical equipment modifications.",
  14: "When changes are superseded by subsequent modifications, the old CAN records must be officially cross-referenced.",
  15: "Temporary modifications must either be removed or officially merged into parent master files before CAN closeout.",
  16: "Revisions are categorized based on risk impacts: Major revisions require full engineering re-assessment.",
  17: "Revision numbering follows strict controls: draft revisions are alphabetical letters (Rev A, Rev B), and approved baselines are published as numerical digits (Rev 0, Rev 1).",
  18: "Knowledge Check 4: Test your understanding of drawing revision naming formats for approved baseline files ready for installation.",
  19: "There are four common respiratory hazards that can be found in confined spaces or around hazardous materials releases. Review each hazard category.",
  20: "Understanding the nine core components of the Self-Contained Breathing Apparatus (SCBA) is critical for operator safety and gear maintenance.",
  21: "Proper operation and safety procedures for Mobile Elevated Work Platforms (MEWPs) are essential. Watch the training video to inspect field operations.",
  22: "Review the primary chemical properties and characteristics of Hydrogen Sulphide (H2S) gas, including flammability, odor thresholds, and density.",
  23: "Understand fire classifications from Class A to Class K, along with their respective fuel sources and recommended extinguisher agents.",
  24: "Examine the fire tetrahedron concept, mapping out the four components necessary to sustain an exothermic combustion reaction.",
  25: "Review your quiz performance details below. If you passed, click next to generate your certificate. Otherwise, you can retake the quiz.",
  26: "Congratulations! You have completed the Change Advice Notice Process training. Please enter your name below to generate your official Training Certificate."
};

// Course Interactions State
let slideInteractions = {
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

// Quiz State
let selectedQuizChoices = {
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
let quizAttempts      = { 3: 0,    7: 0,    11: 0,    18: 0    };
const quizCorrectMapping = { 3: 1, 7: 0, 11: 1, 18: 1 };

// DOM Element References (populated on DOMContentLoaded)
let btnPrev, btnNext, playIcon, pauseIcon,
    seekFill, seekHandle, slideCountBadge, playerActiveTitle;

// Sound is fully disabled — no-op stub kept so call-sites don't throw
function playSound(type) { /* audio-less */ }
