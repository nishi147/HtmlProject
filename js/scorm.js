// ─────────────────────────────────────────────
// js/scorm.js — SCORM 1.2 LMS Integration
// ─────────────────────────────────────────────

let scormAPI = null;
let scormInitialized = false;

// Search for SCORM API in parent windows and window opener
function findAPI(win) {
  let findAttempts = 0;
  while (win.API == null && win.parent != null && win.parent != win) {
    findAttempts++;
    if (findAttempts > 500) {
      console.warn("SCORM API search exceeded maximum parent depth.");
      return null;
    }
    win = win.parent;
  }
  return win.API;
}

function getAPI() {
  let theAPI = findAPI(window);
  if (theAPI == null && window.opener != null && typeof window.opener !== "undefined") {
    theAPI = findAPI(window.opener);
  }
  return theAPI;
}

// Initialize SCORM session
function initScorm() {
  scormAPI = getAPI();
  if (scormAPI) {
    console.log("SCORM 1.2 API found. Initializing session...");
    const result = scormAPI.LMSInitialize("");
    if (result === "true" || result === true) {
      scormInitialized = true;
      console.log("SCORM 1.2 session initialized successfully.");

      // Check current completion status
      const status = scormAPI.LMSGetValue("cmi.core.lesson_status");
      if (status === "not attempted" || status === "") {
        scormAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");
        scormAPI.LMSCommit("");
      }

      // Load bookmarked state
      loadStateFromScorm();
    } else {
      console.error("SCORM LMSInitialize failed. Error code: " + scormAPI.LMSGetLastError());
    }
  } else {
    console.log("SCORM API not detected. Course is running in offline standalone mode.");
  }
}

// Save current progress to the LMS
function saveStateToScorm() {
  if (!scormInitialized || !scormAPI) return;

  try {
    // Save current slide location
    scormAPI.LMSSetValue("cmi.core.lesson_location", currentSlide.toString());

    // Bundle interactive state variables
    const stateObj = {
      slideCompleted: slideCompleted,
      slideInteractions: slideInteractions,
      selectedQuizChoices: selectedQuizChoices,
      quizAttempts: quizAttempts
    };
    scormAPI.LMSSetValue("cmi.suspend_data", JSON.stringify(stateObj));

    // Calculate score metrics if the quiz results function is loaded
    if (typeof calculateQuizResults === "function") {
      const results = calculateQuizResults();
      scormAPI.LMSSetValue("cmi.core.score.raw", results.score.toString());
      scormAPI.LMSSetValue("cmi.core.score.max", results.maxScore.toString());
      scormAPI.LMSSetValue("cmi.core.score.min", "0");

      if (results.passed) {
        scormAPI.LMSSetValue("cmi.core.lesson_status", "passed");
      } else if (slideCompleted[25]) {
        scormAPI.LMSSetValue("cmi.core.lesson_status", "failed");
      } else {
        scormAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");
      }
    } else {
      // General completion fallbacks if quiz isn't finalized
      if (slideCompleted[totalSlides - 1]) {
        scormAPI.LMSSetValue("cmi.core.lesson_status", "completed");
      } else {
        scormAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");
      }
    }

    const commitResult = scormAPI.LMSCommit("");
    if (commitResult === "true" || commitResult === true) {
      console.log("SCORM state saved successfully at slide " + currentSlide);
    } else {
      console.warn("SCORM LMSCommit failed.");
    }
  } catch (err) {
    console.error("Error writing to SCORM:", err);
  }
}

// Load and restore bookmarked state from the LMS
function loadStateFromScorm() {
  if (!scormInitialized || !scormAPI) return;

  try {
    // Restore slide position
    const location = scormAPI.LMSGetValue("cmi.core.lesson_location");
    if (location && !isNaN(parseInt(location))) {
      currentSlide = parseInt(location);
      console.log("SCORM bookmark found: resuming at slide " + currentSlide);
    }

    // Restore interactive variables
    const suspendData = scormAPI.LMSGetValue("cmi.suspend_data");
    if (suspendData) {
      const stateObj = JSON.parse(suspendData);
      
      if (stateObj.slideCompleted) {
        slideCompleted = stateObj.slideCompleted;
      }
      if (stateObj.slideInteractions) {
        slideInteractions = stateObj.slideInteractions;
      }
      if (stateObj.selectedQuizChoices) {
        selectedQuizChoices = stateObj.selectedQuizChoices;
      }
      if (stateObj.quizAttempts) {
        quizAttempts = stateObj.quizAttempts;
      }
      console.log("SCORM suspend_data variables restored successfully.");
    }
  } catch (err) {
    console.error("Error reading from SCORM suspend_data:", err);
  }
}

// Conclude SCORM session
function finishScorm() {
  if (!scormInitialized || !scormAPI) return;
  
  saveStateToScorm();
  console.log("Terminating SCORM session...");
  const result = scormAPI.LMSFinish("");
  if (result === "true" || result === true) {
    scormInitialized = false;
    console.log("SCORM session finished successfully.");
  } else {
    console.warn("SCORM LMSFinish failed.");
  }
}

// Hook browser unload events to guarantee final save
window.addEventListener("beforeunload", () => {
  finishScorm();
});
