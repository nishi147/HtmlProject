window.COURSE_TEMPLATES = {
  "components/exit-modal.html": `<div class="notes-modal-overlay" id="exit-modal">
  <div class="notes-modal-card" style="max-width: 500px;">
    <button class="btn-notes-close" onclick="closeExitModal()" aria-label="Close Exit Modal">&times;</button>
    <div class="notes-modal-header">
      <div class="notes-modal-title-row">
        <h3 class="notes-title-text" style="font-size: 1.8rem;">Exit Course</h3>
        <svg class="notes-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </div>
    </div>
    <div class="notes-modal-body" style="padding-top: 15px;">
      <div style="background: #ffffff; padding: 25px; border-radius: 6px; border: 1px solid #a6c0cd; text-align: center; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
        <p style="font-size: 1.05rem; color: #333; line-height: 1.5; font-weight: 500; margin: 0;">
          Are you sure you want to exit the Change Advice Notice Process training?
        </p>
      </div>
      <div class="modal-btn-row">
        <button class="btn-modal-action secondary" onclick="closeExitModal()">Cancel</button>
        <button class="btn-modal-action primary" onclick="confirmExitCourse()">OK</button>
      </div>
    </div>
    <footer class="notes-modal-footer">
      <span class="notes-footer-course-title">Change Advice Notice Process</span>
    </footer>
  </div>
</div>
`,
  "components/glossary.html": `<div class="glossary-list">
  <div class="glossary-entry">
    <strong class="glossary-term">CAN</strong>
    <p class="glossary-definition">Change Advice Notice - The formal document recording and managing deviations to facility configuration specifications.</p>
  </div>
  <div class="glossary-entry">
    <strong class="glossary-term">MOC</strong>
    <p class="glossary-definition">Management of Change - The structured procedure to ensure safety, technical, and regulatory risks are managed prior to modifications.</p>
  </div>
  <div class="glossary-entry">
    <strong class="glossary-term">C-NLOPB</strong>
    <p class="glossary-definition">Canada-Newfoundland and Labrador Offshore Petroleum Board - The regulatory authority governing safety and operations in the Atlantic Region.</p>
  </div>
  <div class="glossary-entry">
    <strong class="glossary-term">Like-for-Like</strong>
    <p class="glossary-definition">Replacing a component with an identical item meeting identical make, model, specifications, and rating limits.</p>
  </div>
  <div class="glossary-entry">
    <strong class="glossary-term">P&amp;ID</strong>
    <p class="glossary-definition">Piping and Instrumentation Diagram - Schematic drawing showing physical piping, valves, and control elements on the installation.</p>
  </div>
</div>
`,
  "components/help-modal.html": `<div class="notes-modal-overlay" id="help-modal">
  <div class="notes-modal-card" style="max-width: 600px;">
    <button class="btn-notes-close" onclick="closeHelpModal()" aria-label="Close Help Modal">&times;</button>
    <div class="notes-modal-header">
      <div class="notes-modal-title-row">
        <h3 class="notes-title-text">Help</h3>
        <svg class="notes-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <div class="notes-modal-subheader-row">
        <p class="notes-subheader-text" style="color: var(--primary-teal); font-weight: 700; font-size: 1.1rem; margin-top: 10px; margin-bottom: 5px;">Course Navigation Guide:</p>
      </div>
    </div>
    <div class="notes-modal-body" style="padding-top: 10px;">
      <div class="help-content-list" style="background: #ffffff; padding: 25px; border-radius: 6px; border: 1px solid #a6c0cd; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">
        <ul class="help-modal-list">
          <li>
            <strong>Outline List:</strong> Jump directly to any slide by clicking its title in the Menu.
          </li>
          <li>
            <strong>Playback:</strong> Pause and resume narration using the bottom left button.
          </li>
          <li>
            <strong>Seek bar:</strong> Click on the slider to scrub through the timeline.
          </li>
          <li>
            <strong>Transcript:</strong> View active slide text logs from the top utility bar.
          </li>
          <li>
            <strong>Notes:</strong> Save study notes in the notes card modal, and hit print to output to physical files.
          </li>
        </ul>
      </div>
      <div class="modal-btn-row">
        <button class="btn-modal-action primary" onclick="closeHelpModal()">OK</button>
      </div>
    </div>
    <footer class="notes-modal-footer">
      <span class="notes-footer-course-title">Change Advice Notice Process</span>
    </footer>
  </div>
</div>
`,
  "components/landing.html": `<!-- Welcome Card -->
<div class="landing-card" id="welcome-card">
  <!-- Dot Grid background ornament -->
  <div class="landing-dots-bg"></div>
  
  <!-- Orange Decorative Strips -->
  <div class="orange-strip-top"></div>
  <div class="orange-strip-bottom"></div>
  
  <div class="logo-container">
    <img class="logo-img" src="assets/logo.png" alt="Manshu Logo">
  </div>
  
  <div class="region-badge">Atlantic Region</div>
  
  <h1 class="landing-title">Change Advice<br>Notice Process</h1>
  
  <div class="duration-container">
    <svg class="duration-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
      <path d="M12 2 a 10 10 0 0 1 7.54 3.46" stroke-dasharray="4 4"></path>
    </svg>
    <span>Course Duration: <strong>30 minutes</strong></span>
  </div>
  
  <button class="btn-enter" id="btn-enter-course" onclick="enterCourse()">ENTER</button>
</div>

<div class="landing-right">
  <img class="landing-ship-img" src="assets/drillship.png" alt="West Auriga offshore drillship sailing on blue water">
</div>

<div class="landing-ship-overlay">
  <img class="landing-ship-img" src="assets/drillship_processed.png?v=1.2" alt="Offshore drillship cutout overlapping the card">
</div>
`,
  "components/menu.html": `<nav class="outline-list" id="outline-list-container">
  <div class="outline-item completed active" id="outline-item-0" onclick="goToSlide(0)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Course Navigation</span>
  </div>
  
  <div class="outline-item" id="outline-item-1" onclick="goToSlide(1)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Overview</span>
  </div>
  
  <div class="outline-item" id="outline-item-2" onclick="goToSlide(2)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN Types</span>
  </div>
  
  <div class="outline-item" id="outline-item-3" onclick="goToSlide(3)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Knowledge Check 1</span>
  </div>
  
  <div class="outline-item" id="outline-item-4" onclick="goToSlide(4)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN 100 Process</span>
  </div>
  
  <div class="outline-item" id="outline-item-5" onclick="goToSlide(5)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Knowledge Check 2</span>
  </div>
  
  <div class="outline-item" id="outline-item-6" onclick="goToSlide(6)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN 400 Process</span>
  </div>
  
  <div class="outline-item" id="outline-item-7" onclick="goToSlide(7)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN 600 Development</span>
  </div>
  
  <div class="outline-item" id="outline-item-8" onclick="goToSlide(8)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Re-Building of CAN P&amp;ID's</span>
  </div>
  
  <div class="outline-item" id="outline-item-9" onclick="goToSlide(9)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Knowledge Check 3</span>
  </div>
  
  <div class="outline-item" id="outline-item-10" onclick="goToSlide(10)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN's against Critical Documents</span>
  </div>
  
  <div class="outline-item" id="outline-item-11" onclick="goToSlide(11)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN's to Vendor Documents</span>
  </div>
  
  <div class="outline-item" id="outline-item-12" onclick="goToSlide(12)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Superseding/Void CAN's</span>
  </div>
  
  <div class="outline-item" id="outline-item-13" onclick="goToSlide(13)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Incorporating CAN's into Parent Document</span>
  </div>
  
  <div class="outline-item" id="outline-item-14" onclick="goToSlide(14)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN Revision Types</span>
  </div>
  
  <div class="outline-item" id="outline-item-15" onclick="goToSlide(15)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">CAN Revision Number</span>
  </div>
  
  <div class="outline-item" id="outline-item-16" onclick="goToSlide(16)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Knowledge Check 4</span>
  </div>
  
  <div class="outline-item" id="outline-item-17" onclick="goToSlide(17)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Four Common Respiratory Hazards</span>
  </div>
  
  <div class="outline-item" id="outline-item-18" onclick="goToSlide(18)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Components of the SCBA</span>
  </div>
  
  <div class="outline-item" id="outline-item-19" onclick="goToSlide(19)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Proper operation is important</span>
  </div>

  <div class="outline-item" id="outline-item-20" onclick="goToSlide(20)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Properties of H2S</span>
  </div>

  <div class="outline-item" id="outline-item-21" onclick="goToSlide(21)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Fire Classifications</span>
  </div>

  <div class="outline-item" id="outline-item-22" onclick="goToSlide(22)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">What is Fire?</span>
  </div>
  
  <div class="outline-item" id="outline-item-23" onclick="goToSlide(23)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Quiz Results</span>
  </div>
  
  <div class="outline-item" id="outline-item-24" onclick="goToSlide(24)">
    <div class="outline-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="outline-title">Congratulations</span>
  </div>
</nav>
`,
  "components/notes-modal.html": `<div class="notes-modal-overlay" id="notes-modal">
  <div class="notes-modal-card">
    <button class="btn-notes-close" onclick="closeNotesModal()" aria-label="Close Notes Modal">&times;</button>
    <div class="notes-modal-header">
      <div class="notes-modal-title-row">
        <h3 class="notes-title-text">My notes</h3>
        <svg class="notes-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </div>
      <div class="notes-modal-subheader-row">
        <p class="notes-subheader-text">Need to jot down some notes throughout the course? Add them here.</p>
        <button class="btn-notes-print" onclick="printNotes()">Print</button>
      </div>
    </div>
    <div class="notes-modal-body">
      <textarea id="notes-text-area" placeholder="Type your notes here"></textarea>
    </div>
    <footer class="notes-modal-footer">
      <span class="notes-footer-course-title">Change Advice Notice Process</span>
    </footer>
  </div>
</div>
`,
  "components/resources.html": `<div class="resources-list">
  <a href="assets/CAN_Initiation_Guideline.pdf" target="_blank" class="resource-link">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
    <span>CAN Initiation Guideline (PDF)</span>
  </a>
  <a href="assets/Risk_matrix_checklist_template.xlsx" download="Risk_matrix_checklist_template.xlsx" class="resource-link">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
    <span>Risk Matrix Excel Template</span>
  </a>
  <a href="assets/C-NLOPB_Safety_Case_Guidelines.pdf" target="_blank" class="resource-link">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
    <span>C-NLOPB Safety Guidelines (PDF)</span>
  </a>
</div>
`,
  "slides/slide-0.html": `<section id="slide-0" class="slide-pane active">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">Course Navigation</h3>
      <p>Before beginning, review the player layout to understand the interface controls.</p>
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">Interface Reference:</h4>
        <ul class="highlight-bullet-list">
          <li><strong>Left Menu Panel</strong>: Track progress, inspect glossary terms, or download guidelines.</li>
          <li><strong>Prev &amp; Next Buttons</strong>: Switch active slides.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div class="nav-guide-container">
        <div class="nav-guide-card">
          <div class="nav-guide-header">Player Controls Reference</div>
          
          <div class="nav-guide-visual">
            <div class="visual-node">
              <div style="display: flex; gap: 8px; flex-shrink: 0;">
                <button class="visual-nav-btn interactive" id="diag-prev-btn" onclick="changeSlideRedesign(-1)" aria-label="Previous Slide">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="visual-nav-btn active interactive" id="diag-next-btn" onclick="changeSlideRedesign(1)" aria-label="Next Slide">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px;"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
              <span class="visual-label">Slide Navigation controls</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-1.html": `<section id="slide-1" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">Overview</h3>
      <p>This training module has been developed to give an overview of the document practices in use for the SeaRose FPSO with respect to the Change Advice Notice Process or CANs.</p>
      
      <!-- Highlight bullet points card container matching image -->
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">When completed, the user will have an understanding of:</h4>
        <ul class="highlight-bullet-list">
          <li>CAN types</li>
          <li>CAN Process</li>
          <li>Revision Identifier Codes.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <img class="slide-right-illustration green-card" src="assets/overview_illustration.png" alt="Document inspection magnifying glass illustration">
    </div>
  </div>
</section>
`,
  "slides/slide-10.html": `<section id="slide-10" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">CAN's against Critical Documents</h3>
      <p>Critical safety documents represent platforms parameters defined in safety cases. Changes to these require regulatory notification.</p>
      <div class="slide-highlight-card orange">
        <h4 class="card-highlight-title">Critical Document Triggers:</h4>
        <ul class="highlight-bullet-list">
          <li>Escape routes layouts.</li>
          <li>Fire and Gas protection envelopes.</li>
          <li>Safety Case operational parameters.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#fee; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Regulated Integrity</h5>
        <p style="font-size:0.85rem; color:#555;">Regulatory guidelines demand notification if safety-critical systems operational margins are shifted.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-11.html": `<section id="slide-11" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">CAN's to Vendor Documents</h3>
      <p>Vendor datasheets and manual specifications must reflect physical equipment modifications.</p>
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">Vendor Alignment:</h4>
        <ul class="highlight-bullet-list">
          <li>Verify custom tolerances are recorded.</li>
          <li>Update catalog manual reference documents.</li>
          <li>Log vendor software logic updates.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#f6f6ff; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Vendor Integration</h5>
        <p style="font-size:0.85rem; color:#555;">Equipment packages manuals must match as-built installation models to prevent operational error during maintenance.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-12.html": `<section id="slide-12" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">Superseding/Void CAN's</h3>
      <p>When changes are superseded by subsequent modifications, the old CAN records must be officially locked and archived as void.</p>
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">Archiving Rules:</h4>
        <ul class="highlight-bullet-list">
          <li>Cross-reference the new CAN ID on the old record.</li>
          <li>Flag status as 'Superseded' or 'Void' in system database.</li>
          <li>Lock previous documentation files to read-only.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#eef; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Audit Trail</h5>
        <p style="font-size:0.85rem; color:#555;">Clear status labeling prevents engineers from building designs off outdated modifications.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-13.html": `<section id="slide-13" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">Incorporating CAN's into Parent Document</h3>
      <p>Temporary modifications must either be removed or officially merged into parent master files before CAN closeout.</p>
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">Consolidation Stages:</h4>
        <ul class="highlight-bullet-list">
          <li>Verify as-built compliance in field.</li>
          <li>Merge changes into facility safety case databases.</li>
          <li>Close active CAN records officially.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#e8f8f5; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Master Library Update</h5>
        <p style="font-size:0.85rem; color:#555;">Closing files ensures drawings reflect physical equipment layouts, avoiding document sprawl.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-14.html": `<section id="slide-14" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">CAN Revision Types</h3>
      <p>Revisions are categorized based on risk impacts:</p>
      <div class="slide-highlight-card orange">
        <h4 class="card-highlight-title">Revision Categories:</h4>
        <ul class="highlight-bullet-list">
          <li><strong>Major Revision</strong>: Alterations to pressure, piping specifications, or alarm logic. Requires re-assessment.</li>
          <li><strong>Minor Revision</strong>: Typographical corrections or component vendor replacement matching original tolerances. Requires Technical Authority review only.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#fff3cd; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Change Scope Limits</h5>
        <p style="font-size:0.85rem; color:#555;">Scope increases require major revision logs. Never slip extra modifications into minor logs.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-15.html": `<section id="slide-15" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">CAN Revision Number</h3>
      <p>Revision numbering follows strict configuration controls standards.</p>
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">Numbering Format:</h4>
        <ul class="highlight-bullet-list">
          <li>Draft revisions are represented with letters (Rev A, Rev B).</li>
          <li>Once officially approved, revisions are published as numerals (Rev 0, Rev 1).</li>
          <li>Void files carry explicit indicators.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#f0f8ff; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Configuration Identifiers</h5>
        <p style="font-size:0.85rem; color:#555;">Numeric values represent approved design baselines. Alphabetical letters are saved for drafts.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-16.html": `<section id="slide-16" class="slide-pane">
  <div style="max-width: 900px; margin: 0 auto;">
    <h3 class="slide-main-title" style="margin-bottom: 25px;">Knowledge Check</h3>
    
    <div class="quiz-question-container" style="margin-bottom: 20px;">
      <div class="quiz-q-icon" style="border-color: var(--accent-orange); background-color: rgba(242, 101, 34, 0.05);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--accent-orange);">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <div class="quiz-q-text">
        Select the appropriate Revision Identifier Codes for each stage. Choose all that apply.
      </div>
    </div>

    <!-- Matrix Quiz Table -->
    <div id="quiz-matrix-container-16">
      <table class="quiz-matrix-table">
        <thead>
          <tr>
            <th style="width: 20%;"></th>
            <th style="width: 20%;">Review Issue<br>(EPIC)</th>
            <th style="width: 20%;">Approved for<br>Construction Issue,<br>Approved for Purchase</th>
            <th style="width: 20%;">Issued for Use,<br>Issued for<br>Implementation</th>
            <th style="width: 20%;">As-Built / As-<br>Fabricated /<br>Installed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="row-header">C1, C2, etc</td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(0, 0)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(0, 1)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(0, 2)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(0, 3)"></td>
          </tr>
          <tr>
            <td class="row-header">B1, B2 etc</td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(1, 0)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(1, 1)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(1, 2)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(1, 3)"></td>
          </tr>
          <tr>
            <td class="row-header">Z1, Z2, etc</td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(2, 0)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(2, 1)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(2, 2)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(2, 3)"></td>
          </tr>
          <tr>
            <td class="row-header">E1, E2, etc</td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(3, 0)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(3, 1)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(3, 2)"></td>
            <td><input type="checkbox" class="matrix-check" onclick="toggleMatrixCheckbox(3, 3)"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Matrix Feedback Containers -->
    <div id="quiz-feedback-container-16" style="display: none;">
      
      <!-- Correct Feedback -->
      <div class="matrix-feedback-card correct" id="matrix-feedback-correct-16" style="display: none;">
        <div class="matrix-feedback-header">
          <div class="matrix-feedback-icon success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="matrix-feedback-title success">Correct</span>
        </div>
        <div class="matrix-explanation-title">All stages have been correctly matched:</div>
        <ul class="matrix-explanation-list">
          <li>• <strong>C1, C2 etc:</strong> Approved for Construction Issue, Approved for Purchase</li>
          <li>• <strong>B1, B2 etc:</strong> Review Issue (EPIC)</li>
          <li>• <strong>Z1, Z2 etc:</strong> As-Built / As-Fabricated / Installed</li>
          <li>• <strong>E1, E2 etc:</strong> Issued for Use, Issued for Implementation</li>
        </ul>
      </div>

      <!-- Try Again Feedback -->
      <div class="matrix-feedback-card try-again" id="matrix-feedback-try-again-16" style="display: none;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px;">
          <div class="matrix-feedback-icon warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <span class="matrix-feedback-title warning">Please <strong>Try Again.</strong></span>
        </div>
        <button class="btn-quiz-retry" onclick="retryMatrixQuestion()">Try Again</button>
      </div>

      <!-- Incorrect Feedback -->
      <div class="matrix-feedback-card incorrect" id="matrix-feedback-incorrect-16" style="display: none;">
        <div class="matrix-feedback-header">
          <div class="matrix-feedback-icon failure">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <span class="matrix-feedback-title failure">Incorrect</span>
        </div>
        <div class="matrix-explanation-title">The correct answer is:</div>
        <ul class="matrix-explanation-list">
          <li>• <strong>C1, C2 etc:</strong> Approved for Construction Issue, Approved for Purchase</li>
          <li>• <strong>B1, B2 etc:</strong> Review Issue (EPIC)</li>
          <li>• <strong>Z1, Z2 etc:</strong> As-Built / As-Fabricated / Installed</li>
          <li>• <strong>E1, E2 etc:</strong> Issued for Use, Issued for Implementation</li>
        </ul>
      </div>

    </div>

    <!-- Submit Button -->
    <button class="btn-quiz-submit" id="btn-quiz-submit-16" onclick="submitMatrixAnswer()" disabled style="margin-left: 0; margin-top: 25px;">SUBMIT</button>

  </div>
</section>
`,
  "slides/slide-17.html": `<section id="slide-17" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left" style="flex: 0 0 100%; display: flex; flex-direction: column;">
      
      <h3 class="slide-heading-text" style="font-family: var(--font-heading); color: var(--primary-teal); font-size: 1.8rem; font-weight: 700; margin-bottom: 10px;">Four Common Respiratory Hazards</h3>
      <p style="font-size: 1rem; line-height: 1.5; color: var(--text-dark); margin-bottom: 8px;">
        There are four common respiratory hazards that can be found separately or in combination with each other in confined spaces, or around hazardous materials releases or fires.
      </p>
      <p style="font-size: 0.95rem; font-weight: 600; color: var(--accent-orange); margin-bottom: 20px;">
        Click each button to learn more. When done, click the next button to continue.
      </p>

      <!-- Buttons Row -->
      <div class="hazard-buttons-row" style="display: flex; gap: 15px; margin-bottom: 25px;">
        <button class="hazard-btn pulsing" id="btn-hazard-0" onclick="selectHazard(0)">
          <span>Oxygen deficiency</span>
        </button>
        <button class="hazard-btn pulsing" id="btn-hazard-1" onclick="selectHazard(1)">
          <span>Elevated temperatures</span>
        </button>
        <button class="hazard-btn pulsing" id="btn-hazard-2" onclick="selectHazard(2)">
          <span>Smoke or unburned products of combustion</span>
        </button>
        <button class="hazard-btn pulsing" id="btn-hazard-3" onclick="selectHazard(3)">
          <span>Toxic atmospheres</span>
        </button>
      </div>

      <!-- Detail Card (displays underneath with an arrow indicator matching selected button) -->
      <div id="hazard-arrow-indicator" class="hazard-arrow" style="display: none;"></div>
      <div id="hazard-detail-card" class="premium-detail-card fade-in-slide-up" style="display: none; padding: 25px; margin-top: 5px; flex-direction: row; gap: 20px; align-items: center; min-height: 300px;">
        
        <div class="hazard-text-content" style="flex: 1;">
          <h4 id="hazard-title" style="font-family: var(--font-heading); font-size: 1.4rem; color: var(--primary-teal); margin-bottom: 12px; font-weight: 700;">Oxygen Deficiency</h4>
          <p id="hazard-desc" style="font-size: 0.95rem; line-height: 1.5; color: var(--text-muted); margin-bottom: 15px;">
            This deficiency can lead to serious injuries including death. Please consider the following information:
          </p>
          <ul id="hazard-list" class="checklist-deliverables" style="margin-top: 10px;">
            <!-- filled dynamically -->
          </ul>
        </div>
        
        <div class="hazard-image-content" style="width: 280px; display: flex; justify-content: center; align-items: center;">
          <img id="hazard-image" src="assets/brain_anatomy.png" alt="Brain Anatomy Diagram" style="max-width: 100%; border-radius: 8px; box-shadow: var(--shadow-sm); border: 1px solid rgba(0,0,0,0.06);">
        </div>

      </div>

      <!-- Slide unlock warning -->
      <div id="slide-lock-warning-17" class="slide-lock-panel" style="margin-top: 20px;">
        <p class="lock-status-text warning-glow">⚠️ Click and inspect all four respiratory hazards above to proceed.</p>
      </div>

    </div>
  </div>
</section>
`,
  "slides/slide-18.html": `<section id="slide-18" class="slide-pane">
  <div class="slide-wrapper">
    <!-- Split Layout: 9 Vertical buttons on Left, Detail Card on Right -->
    <div style="display: flex; gap: 25px; width: 100%; align-items: stretch; min-height: 480px;">
      
      <!-- Left Column: Components List -->
      <div style="flex: 0 0 38%; display: flex; flex-direction: column; gap: 10px;">
        <h3 class="slide-heading-text" style="font-family: var(--font-heading); color: var(--primary-teal); font-size: 1.6rem; font-weight: 700; margin-bottom: 2px;">Components of the SCBA</h3>
        <p style="font-size: 0.9rem; color: var(--text-dark); margin-bottom: 5px;">There are nine components of the SCBA.</p>
        <p style="font-size: 0.85rem; font-weight: 600; color: var(--accent-orange); margin-bottom: 12px;">Click on each component below to learn more.</p>

        <div class="scba-components-list" style="display: flex; flex-direction: column; gap: 8px;">
          <button class="scba-comp-btn pulsing" id="btn-scba-0" onclick="selectSCBAComponent(0)">
            <span>Back frame and harness</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-1" onclick="selectSCBAComponent(1)">
            <span>SCBA Reducer</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-2" onclick="selectSCBAComponent(2)">
            <span>Mask Mounted Regulator (MMR)</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-3" onclick="selectSCBAComponent(3)">
            <span>Universal Rescue Connection (URC)</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-4" onclick="selectSCBAComponent(4)">
            <span>Remote gauge</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-5" onclick="selectSCBAComponent(5)">
            <span>High pressure coupling seal</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-6" onclick="selectSCBAComponent(6)">
            <span>Air cylinder and valve assembly (2216 psi)</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-7" onclick="selectSCBAComponent(7)">
            <span>Air cylinder and valve assembly (4500 psi)</span>
          </button>
          <button class="scba-comp-btn pulsing" id="btn-scba-8" onclick="selectSCBAComponent(8)">
            <span>Face piece</span>
          </button>
        </div>
      </div>

      <!-- Right Column: Detail Card and Images -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        
        <!-- Detail Panel (has arrow point to selected button) -->
        <div id="scba-detail-card" class="premium-detail-card fade-in-slide-up" style="display: none; padding: 25px; flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 400px; border-left: 4px solid var(--primary-teal);">
          <h4 id="scba-title" style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--primary-teal); margin-bottom: 12px; font-weight: 700;">SCBA Harness / SCBA back frame and harness</h4>
          <ul id="scba-list" class="checklist-deliverables" style="margin-bottom: 20px;">
            <!-- filled dynamically -->
          </ul>
          
          <!-- Image grid for harness component -->
          <div id="scba-images-row" style="display: flex; gap: 15px; margin-top: auto; justify-content: center; align-items: center;">
            <img src="assets/scba_harness.png" alt="SCBA harness 1" style="max-height: 180px; border-radius: 6px; box-shadow: var(--shadow-sm); border: 1px solid rgba(0,0,0,0.06);">
            <img src="assets/scba_harness.png" alt="SCBA harness 2" style="max-height: 180px; border-radius: 6px; box-shadow: var(--shadow-sm); border: 1px solid rgba(0,0,0,0.06); filter: hue-rotate(30deg);">
          </div>
        </div>

        <!-- Slide unlock warning -->
        <div id="slide-lock-warning-18" class="slide-lock-panel" style="margin-top: 15px;">
          <p class="lock-status-text warning-glow">⚠️ Inspect all nine SCBA components on the left to proceed.</p>
        </div>

      </div>

    </div>
  </div>
</section>
`,
  "slides/slide-19.html": `<section id="slide-19" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left" style="flex: 0 0 100%; display: flex; flex-direction: column; align-items: center;">
      
      <h3 class="slide-heading-text" style="font-family: var(--font-heading); color: var(--primary-teal); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px; align-self: flex-start;">Proper operation is important</h3>
      
      <!-- Simulated Video Player -->
      <div class="simulated-video-player" id="video-player-19" style="position: relative; width: 680px; height: 380px; background: #000; border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-lg); border: 2px solid rgba(0,0,0,0.1); margin: 15px 0 10px 0;">
        
        <!-- Video Poster/Content -->
        <img id="video-frame-img" src="assets/scissor_lift.png" alt="MEWP Scissor Lift" style="width: 100%; height: 100%; object-fit: cover; transition: transform 65s linear; transform-origin: center bottom;">
        
        <!-- Black Overlay gradient -->
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.6)); pointer-events: none;"></div>

        <!-- Centered Play Button Overlay -->
        <button class="video-play-overlay-btn" id="video-center-play-btn" onclick="startSimulatedVideo()" aria-label="Play video">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width: 40px; height: 40px; color: white; margin-left: 4px;">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>

        <!-- Video Bottom Control Bar -->
        <div class="video-controls-bar" style="position: absolute; bottom: 0; left: 0; right: 0; height: 45px; background: rgba(15, 23, 42, 0.85); display: flex; align-items: center; padding: 0 15px; gap: 12px; font-family: var(--font-body); color: white; font-size: 0.8rem; z-index: 10;">
          
          <!-- Play/Pause Button -->
          <button id="video-bar-play-btn" onclick="toggleSimulatedVideo()" style="background: none; border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; outline: none;">
            <svg id="video-play-svg" viewBox="0 0 24 24" fill="currentColor" style="width: 18px; height: 18px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg id="video-pause-svg" viewBox="0 0 24 24" fill="currentColor" style="width: 18px; height: 18px; display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>

          <!-- Current Time -->
          <span id="video-current-time">00:00</span>
          
          <!-- Seek Track -->
          <div id="video-seek-track" style="flex: 1; height: 6px; background: rgba(255,255,255,0.2); border-radius: 3px; position: relative; cursor: pointer;" onclick="seekSimulatedVideo(event)">
            <div id="video-seek-fill" style="width: 0%; height: 100%; background: var(--primary-teal-light); border-radius: 3px; transition: width 0.1s linear;"></div>
          </div>
          
          <!-- Duration Time -->
          <span>01:05</span>
          
          <!-- Volume Icon (stub) -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke-dasharray="2 2"></path></svg>
        </div>

      </div>

      <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted); margin-bottom: 20px;">
        Click the image above to watch the video (01:05)
      </p>

      <!-- Slide unlock warning -->
      <div id="slide-lock-warning-19" class="slide-lock-panel" style="width: 680px;">
        <p class="lock-status-text warning-glow">⚠️ Watch the simulated MEWP operations video to proceed.</p>
      </div>

    </div>
  </div>
</section>
`,
  "slides/slide-2.html": `<section id="slide-2" class="slide-pane slide-pane-split">
  <div class="slide-wrapper-split">
    <!-- Left Column: white background, padding, bullet points -->
    <div class="split-col-left">
      <h3 class="slide-main-title">CAN Types</h3>
      <p>The Change Advice Notice (CAN) is categorized into three specific types to manage modifications. In this course, you will learn the answers to these questions:</p>
      <ul class="split-bullet-list">
        <li>What is a Permanent Change Advice Notice?</li>
        <li>When is a Temporary Bypass CAN required?</li>
        <li>What defines an Urgent Engineering CAN?</li>
        <li>Who reviews and approves each specific CAN type?</li>
        <li>How are safety-critical controls bypassed safely?</li>
      </ul>
    </div>
    <!-- Right Column: deep teal background, centered photo with white border -->
    <div class="split-col-right-teal">
      <div class="cert-image-frame">
        <img class="slide-right-illustration" src="assets/gas_detectors.png" alt="Three industrial portable gas detectors in their charging bays">
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-20.html": `<section id="slide-20" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left" style="flex: 0 0 100%; display: flex; flex-direction: column; position: relative;">
      
      <h3 class="slide-heading-text" style="font-family: var(--font-heading); color: var(--primary-teal); font-size: 1.8rem; font-weight: 700; margin-bottom: 5px;">Properties of H<sub>2</sub>S</h3>
      <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-dark); margin-bottom: 25px;">
        <strong>Action:</strong> Click the characteristics of hydrogen sulphide gas for a description of each. View them all before moving to the next page.
      </p>

      <!-- Center container for the properties wheel -->
      <div style="position: relative; width: 820px; height: 420px; margin: 0 auto; background: #eef4f7; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06); box-shadow: var(--shadow-sm); overflow: hidden;">
        
        <!-- SVG properties wheel -->
        <svg id="h2s-wheel-svg" width="600" height="400" viewBox="0 0 600 400" style="position: absolute; top: 10px; left: 110px; z-index: 2;">
          
          <!-- Connectors to center -->
          <line x1="300" y1="200" x2="300" y2="70" stroke="#a0b8c6" stroke-width="3" stroke-dasharray="4 4" />
          <line x1="300" y1="200" x2="413" y2="135" stroke="#a0b8c6" stroke-width="3" stroke-dasharray="4 4" />
          <line x1="300" y1="200" x2="413" y2="265" stroke="#a0b8c6" stroke-width="3" stroke-dasharray="4 4" />
          <line x1="300" y1="200" x2="300" y2="330" stroke="#a0b8c6" stroke-width="3" stroke-dasharray="4 4" />
          <line x1="300" y1="200" x2="187" y2="265" stroke="#a0b8c6" stroke-width="3" stroke-dasharray="4 4" />
          <line x1="300" y1="200" x2="187" y2="135" stroke="#a0b8c6" stroke-width="3" stroke-dasharray="4 4" />

          <!-- Center Molecule Node -->
          <g transform="translate(300, 200)">
            <circle cx="0" cy="0" r="38" fill="var(--primary-teal)" stroke="#ffffff" stroke-width="4" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));" />
            <!-- H2S text -->
            <text x="0" y="7" font-family="var(--font-heading)" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">H₂S</text>
            <!-- Small atoms around -->
            <circle cx="-25" cy="-25" r="12" fill="#88b2c4" stroke="#ffffff" stroke-width="2" />
            <text x="-25" y="-21" font-family="var(--font-heading)" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">H</text>
            <circle cx="25" cy="-25" r="12" fill="#88b2c4" stroke="#ffffff" stroke-width="2" />
            <text x="25" y="-21" font-family="var(--font-heading)" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">H</text>
          </g>

          <!-- Outer Nodes (Clickable Buttons) -->
          <!-- 0: Color (Top) -->
          <g class="h2s-node-btn pulsing" id="h2s-node-0" transform="translate(300, 70)" onclick="selectH2SProperty(0)" style="cursor: pointer;">
            <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#5b8c9e" stroke-width="3" />
            <text x="0" y="5" font-family="monospace" font-size="16" font-weight="bold" fill="#778c96" stroke-dasharray="2 2" text-anchor="middle">H₂S</text>
          </g>

          <!-- 1: Odor (Top-Right) -->
          <g class="h2s-node-btn pulsing" id="h2s-node-1" transform="translate(413, 135)" onclick="selectH2SProperty(1)" style="cursor: pointer;">
            <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#5b8c9e" stroke-width="3" />
            <path d="M-12,-8 C-5,-15 5,-15 12,-8 C5,-4 -5,-4 -12,-8 Z" fill="#eab308" opacity="0.6"/>
            <path d="M-15,5 C-8,0 8,0 15,5 C8,9 -8,9 -15,5 Z" fill="#eab308" opacity="0.6"/>
            <text x="0" y="5" font-family="var(--font-heading)" font-size="10" font-weight="bold" fill="#1b3644" text-anchor="middle">H₂S</text>
          </g>

          <!-- 2: Density (Bottom-Right) -->
          <g class="h2s-node-btn pulsing" id="h2s-node-2" transform="translate(413, 265)" onclick="selectH2SProperty(2)" style="cursor: pointer;">
            <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#5b8c9e" stroke-width="3" />
            <path d="M-12,12 L12,12 M0,12 L0,-8 M-8,-2 L8,-2 M-10,6 L-6,6 M6,6 L10,6" stroke="#475569" stroke-width="2" fill="none"/>
            <text x="0" y="-3" font-family="var(--font-heading)" font-size="9" font-weight="bold" fill="#e25c38" text-anchor="middle">H₂S</text>
          </g>

          <!-- 3: Solubility (Bottom) -->
          <g class="h2s-node-btn pulsing" id="h2s-node-3" transform="translate(300, 330)" onclick="selectH2SProperty(3)" style="cursor: pointer;">
            <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#5b8c9e" stroke-width="3" />
            <rect x="-12" y="-12" width="24" height="24" rx="2" fill="none" stroke="#475569" stroke-width="2" />
            <path d="M-10,6 L10,6 L10,10 L-10,10 Z" fill="#38bdf8" />
            <text x="0" y="0" font-family="var(--font-heading)" font-size="8" font-weight="bold" fill="#1b3644" text-anchor="middle">H₂S</text>
          </g>

          <!-- 4: Boiling Point (Bottom-Left) -->
          <g class="h2s-node-btn pulsing" id="h2s-node-4" transform="translate(187, 265)" onclick="selectH2SProperty(4)" style="cursor: pointer;">
            <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#5b8c9e" stroke-width="3" />
            <rect x="-3" y="-15" width="6" height="22" rx="3" fill="none" stroke="#ef4444" stroke-width="2" />
            <circle cx="0" cy="11" r="6" fill="#ef4444" />
            <text x="0" y="-2" font-family="var(--font-heading)" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">-60°</text>
            <text x="-15" y="-8" font-family="var(--font-heading)" font-size="8" font-weight="bold" fill="#1b3644" text-anchor="middle">H₂S</text>
          </g>

          <!-- 5: Flammability (Top-Left) -->
          <g class="h2s-node-btn pulsing" id="h2s-node-5" transform="translate(187, 135)" onclick="selectH2SProperty(5)" style="cursor: pointer;">
            <circle cx="0" cy="0" r="32" fill="#ffffff" stroke="#5b8c9e" stroke-width="3" />
            <path d="M-10,12 C-10,12 -15,2 -8,-4 C-6,-2 -4,0 -2,-2 C-1,-6 5,-12 3,-2 C8,-4 10,0 8,6 C7,10 2,13 -2,12 C-6,11 -10,12 -10,12 Z" fill="#ef4444" />
            <text x="0" y="5" font-family="var(--font-heading)" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">H₂S</text>
          </g>

        </svg>

        <!-- Floating Detail Popups next to each element (absolutely positioned) -->
        <div id="h2s-detail-popup" class="h2s-floating-card fade-in-slide-up" style="display: none; position: absolute; z-index: 10; background: #ffffff; border-radius: 6px; box-shadow: var(--shadow-lg); border: 1.5px solid var(--primary-teal); padding: 15px; width: 240px;">
          <button onclick="closeH2SDetailPopup()" style="position: absolute; top: 6px; right: 8px; background: none; border: none; font-size: 1.1rem; font-weight: bold; color: var(--text-muted); cursor: pointer; line-height: 1;">&times;</button>
          <h4 id="h2s-popup-title" style="font-family: var(--font-heading); font-size: 1rem; color: var(--primary-teal); font-weight: 700; margin-bottom: 5px;">COLOR</h4>
          <p id="h2s-popup-desc" style="font-size: 0.85rem; line-height: 1.4; color: var(--text-dark); margin: 0;">Colorless, H2S is not visible.</p>
        </div>

      </div>

      <!-- Slide unlock warning -->
      <div id="slide-lock-warning-20" class="slide-lock-panel" style="margin-top: 20px;">
        <p class="lock-status-text warning-glow">⚠️ Click and inspect all six H2S properties above to proceed.</p>
      </div>

    </div>
  </div>
</section>
`,
  "slides/slide-21.html": `<section id="slide-21" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left" style="flex: 0 0 100%; display: flex; flex-direction: column;">
      
      <h3 class="slide-heading-text" style="font-family: var(--font-heading); color: var(--primary-teal); font-size: 1.8rem; font-weight: 700; margin-bottom: 5px;">Fire Classifications</h3>
      <p style="font-size: 1rem; line-height: 1.5; color: var(--text-dark); margin-bottom: 25px;">
        Click each class to learn more about definitions and examples.
      </p>

      <!-- Fire Classes Cards Grid -->
      <div class="fire-classes-grid" style="display: flex; gap: 15px; margin-bottom: 25px; width: 100%;">
        
        <!-- Class A -->
        <button class="fire-class-card pulsing" id="btn-fire-class-0" onclick="selectFireClass(0)">
          <div class="fire-class-shape">
            <svg viewBox="0 0 100 100" style="width: 70px; height: 70px;">
              <polygon points="50,10 90,90 10,90" fill="#10b981" />
              <text x="50" y="75" font-family="var(--font-heading)" font-size="42" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
            </svg>
          </div>
          <div class="fire-class-desc">Common Combustibles.</div>
        </button>

        <!-- Class B -->
        <button class="fire-class-card pulsing" id="btn-fire-class-1" onclick="selectFireClass(1)">
          <div class="fire-class-shape">
            <svg viewBox="0 0 100 100" style="width: 70px; height: 70px;">
              <rect x="10" y="10" width="80" height="80" rx="6" fill="#ef4444" />
              <text x="50" y="65" font-family="var(--font-heading)" font-size="46" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>
            </svg>
          </div>
          <div class="fire-class-desc">Hydrocarbon (flammables & combustibles) materials.</div>
        </button>

        <!-- Class C -->
        <button class="fire-class-card pulsing" id="btn-fire-class-2" onclick="selectFireClass(2)">
          <div class="fire-class-shape">
            <svg viewBox="0 0 100 100" style="width: 70px; height: 70px;">
              <circle cx="50" cy="50" r="42" fill="#3b82f6" />
              <text x="50" y="65" font-family="var(--font-heading)" font-size="46" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>
            </svg>
          </div>
          <div class="fire-class-desc">Energized Electrical Equipment.</div>
        </button>

        <!-- Class D -->
        <button class="fire-class-card pulsing" id="btn-fire-class-3" onclick="selectFireClass(3)">
          <div class="fire-class-shape">
            <svg viewBox="0 0 100 100" style="width: 70px; height: 70px;">
              <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" fill="#eab308" />
              <text x="50" y="63" font-family="var(--font-heading)" font-size="34" font-weight="bold" fill="#1b3644" text-anchor="middle">D</text>
            </svg>
          </div>
          <div class="fire-class-desc">Combustible Metals (magnesium, Sodium, etc).</div>
        </button>

        <!-- Class K -->
        <button class="fire-class-card pulsing" id="btn-fire-class-4" onclick="selectFireClass(4)">
          <div class="fire-class-shape">
            <svg viewBox="0 0 100 100" style="width: 70px; height: 70px;">
              <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="#1e293b" />
              <text x="50" y="65" font-family="var(--font-heading)" font-size="40" font-weight="bold" fill="#ffffff" text-anchor="middle">K</text>
            </svg>
          </div>
          <div class="fire-class-desc">Greases and Fats.</div>
        </button>

        <!-- Class Multiclass -->
        <button class="fire-class-card pulsing" id="btn-fire-class-5" onclick="selectFireClass(5)">
          <div class="fire-class-shape">
            <div class="multiclass-rect-badge" style="background: #0d9488; color: white; padding: 12px 10px; font-weight: bold; border-radius: 8px; font-size: 0.9rem; text-align: center; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);">
              Multiclass
            </div>
          </div>
          <div class="fire-class-desc">Combined rating for multiple combustibles.</div>
        </button>

      </div>

      <!-- Arrow indicator and details card -->
      <div id="fire-class-arrow" class="hazard-arrow" style="display: none; transition: left 0.3s ease;"></div>
      <div id="fire-class-detail-card" class="premium-detail-card fade-in-slide-up" style="display: none; padding: 25px; flex-direction: row; gap: 20px; align-items: center; min-height: 220px; position: relative;">
        <button onclick="closeFireClassDetail()" style="position: absolute; top: 12px; right: 15px; background: none; border: none; font-size: 1.4rem; font-weight: bold; color: var(--text-muted); cursor: pointer;">&times;</button>
        
        <div class="fire-class-text" style="flex: 1;">
          <h4 id="fire-class-title" style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--primary-teal); margin-bottom: 4px; font-weight: 700;">Classification: "A" - Ash</h4>
          <h5 id="fire-class-subtitle" style="font-family: var(--font-heading); font-size: 1rem; color: var(--accent-orange); margin-bottom: 12px; font-weight: 600;">Class A Extinguishers</h5>
          <ul id="fire-class-bullets" class="checklist-deliverables" style="margin-bottom: 0;">
            <!-- dynamically populated -->
          </ul>
        </div>
        
        <div class="fire-class-icon-container" style="width: 140px; display: flex; justify-content: center; align-items: center;" id="fire-class-icon-slot">
          <!-- dynamically populated vector icon -->
        </div>
      </div>

      <!-- Slide unlock warning -->
      <div id="slide-lock-warning-21" class="slide-lock-panel" style="margin-top: 20px;">
        <p class="lock-status-text warning-glow">⚠️ Click and inspect all six fire classifications above to proceed.</p>
      </div>

    </div>
  </div>
</section>
`,
  "slides/slide-22.html": `<section id="slide-22" class="slide-pane">
  <div class="slide-wrapper">
    <div style="display: flex; gap: 30px; width: 100%; align-items: stretch; min-height: 460px;">
      
      <!-- Left Column: Fire Explanations -->
      <div style="flex: 1; display: flex; flex-direction: column;">
        <h3 class="slide-heading-text" style="font-family: var(--font-heading); color: var(--primary-teal); font-size: 1.8rem; font-weight: 700; margin-bottom: 8px;">What is Fire?</h3>
        <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-dark); margin-bottom: 12px;">
          Fire is an 'exothermic reaction.'
        </p>
        <p style="font-size: 0.95rem; color: var(--text-dark); margin-bottom: 8px;">
          It involves 'four' very important items:
        </p>
        
        <ul class="checklist-deliverables" style="margin-left: 10px; margin-bottom: 20px;">
          <li><svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Oxygen</span></li>
          <li><svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>A heat source</span></li>
          <li><svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Fuel source</span></li>
          <li><svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Chemical chain reaction</span></li>
        </ul>

        <p style="font-size: 0.9rem; font-weight: 600; color: var(--accent-orange); margin-bottom: 15px;">
          Click on each tetrahedron side on the right to learn more. When finished, click the Next button.
        </p>

        <!-- Dynamic detail block -->
        <div id="tetra-detail-card" class="premium-detail-card fade-in-slide-up" style="display: none; padding: 20px; border-left: 4px solid var(--accent-orange); margin-top: auto;">
          <h4 id="tetra-title" style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--primary-teal); font-weight: 700; margin-bottom: 5px;">Heat</h4>
          <p id="tetra-desc" style="font-size: 0.88rem; line-height: 1.45; color: var(--text-dark); margin: 0;">Description goes here.</p>
        </div>
      </div>

      <!-- Right Column: Interactive Fire Tetrahedron SVG -->
      <div style="flex: 0 0 45%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        
        <div style="position: relative; width: 340px; height: 340px; display: flex; justify-content: center; align-items: center; background: #ffffff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06); box-shadow: var(--shadow-sm); padding: 20px;">
          
          <svg width="100%" height="100%" viewBox="0 0 400 360" id="fire-tetrahedron-svg">
            
            <!-- Segment 0: Heat (Top) -->
            <polygon class="tetra-facet pulsing" id="tetra-facet-0" points="200,40 120,180 280,180" fill="#ef4444" stroke="#ffffff" stroke-width="3" onclick="selectTetrahedronFacet(0)" style="cursor: pointer; transition: all 0.2s ease;" />
            <text x="200" y="140" font-family="var(--font-heading)" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle" pointer-events="none">Heat</text>

            <!-- Segment 1: Oxygen (Bottom-Left) -->
            <polygon class="tetra-facet pulsing" id="tetra-facet-1" points="40,320 120,180 200,320" fill="#0ea5e9" stroke="#ffffff" stroke-width="3" onclick="selectTetrahedronFacet(1)" style="cursor: pointer; transition: all 0.2s ease;" />
            <text x="120" y="275" font-family="var(--font-heading)" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle" pointer-events="none">Oxygen</text>

            <!-- Segment 2: Fuel (Bottom-Right) -->
            <polygon class="tetra-facet pulsing" id="tetra-facet-2" points="360,320 280,180 200,320" fill="#f97316" stroke="#ffffff" stroke-width="3" onclick="selectTetrahedronFacet(2)" style="cursor: pointer; transition: all 0.2s ease;" />
            <text x="280" y="275" font-family="var(--font-heading)" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle" pointer-events="none">Fuel</text>

            <!-- Segment 3: Chain Reaction (Center) -->
            <polygon class="tetra-facet pulsing" id="tetra-facet-3" points="120,180 280,180 200,320" fill="#10b981" stroke="#ffffff" stroke-width="3" onclick="selectTetrahedronFacet(3)" style="cursor: pointer; transition: all 0.2s ease;" />
            <text x="200" y="240" font-family="var(--font-heading)" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle" pointer-events="none">Chain</text>
            <text x="200" y="260" font-family="var(--font-heading)" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle" pointer-events="none">reaction</text>
            
          </svg>
          
        </div>

        <!-- Slide unlock warning -->
        <div id="slide-lock-warning-22" class="slide-lock-panel" style="width: 100%; margin-top: 15px;">
          <p class="lock-status-text warning-glow">⚠️ Click and inspect all four facets of the Fire Tetrahedron to proceed.</p>
        </div>

      </div>

    </div>
  </div>
</section>
`,
  "slides/slide-23.html": `<section id="slide-23" class="slide-pane">
  <div class="slide-wrapper">
    <!-- Left Column: Quiz Results Parameters -->
    <div class="slide-col-left" style="flex: 0 0 55%; display: flex; flex-direction: column; justify-content: center; padding-right: 20px;">
      
      <div style="text-align: center; margin-bottom: 20px;">
        <span id="results-status-label" style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; text-transform: uppercase; display: block; margin-bottom: 5px; color: #ef4444;">Failure</span>
        <h3 class="slide-heading-text" style="font-family: var(--font-heading); color: var(--primary-teal); font-size: 1.6rem; font-weight: 700; margin: 0;">Quiz Results</h3>
      </div>
      
      <!-- Parameters List Table -->
      <div style="background-color: #ffffff; border: 1.5px solid rgba(0,0,0,0.06); border-radius: 12px; box-shadow: var(--shadow-sm); padding: 20px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">You Scored:</span>
          <span id="results-scored" style="font-size: 0.95rem; font-weight: 700; color: var(--primary-teal);">0</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">Maximum Score:</span>
          <span id="results-max" style="font-size: 0.95rem; font-weight: 700; color: var(--primary-teal);">7</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">Correct Answers:</span>
          <span id="results-correct" style="font-size: 0.95rem; font-weight: 700; color: var(--primary-teal);">0</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">Total Questions:</span>
          <span id="results-total" style="font-size: 0.95rem; font-weight: 700; color: var(--primary-teal);">7</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">Accuracy:</span>
          <span id="results-accuracy" style="font-size: 0.95rem; font-weight: 700; color: var(--primary-teal);">0%</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
          <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">Attempts:</span>
          <span id="results-attempts" style="font-size: 0.95rem; font-weight: 700; color: var(--primary-teal);">0</span>
        </div>
      </div>
      
      <!-- Guidance Messages and Buttons -->
      <div style="display: flex; gap: 20px; align-items: stretch; margin-top: 10px;">
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; background-color: #f8fafc; border-radius: 8px; padding: 15px; border: 1px dashed #cbd5e1;">
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px; line-height: 1.4;">You can review the course by clicking ENTER COURSE below.</p>
          <button onclick="goToSlide(0)" class="quiz-submit-btn active" style="font-size: 0.85rem; padding: 8px 16px; width: auto; background-color: var(--primary-teal-light);">ENTER COURSE</button>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; background-color: #f8fafc; border-radius: 8px; padding: 15px; border: 1px dashed #cbd5e1;">
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px; line-height: 1.4;">You can attempt the quiz again by clicking RETAKE QUIZ below.</p>
          <button onclick="retakeQuiz()" class="quiz-submit-btn active" style="font-size: 0.85rem; padding: 8px 16px; width: auto; background-color: var(--accent-orange);">RETAKE QUIZ</button>
        </div>
      </div>

    </div>
    
    <!-- Right Column: Checkbox Image Illustration -->
    <div class="slide-col-right" style="flex: 0 0 45%; display: flex; justify-content: center; align-items: center;">
      <img src="assets/quiz_results.png" alt="Hand checking off items on digital checklist tablet" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.06);">
    </div>
  </div>
</section>
`,
  "slides/slide-24.html": `<section id="slide-24" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left" style="flex: 0 0 100%;">
      
      <div id="cert-setup-container" style="max-width:500px; margin:0 auto; text-align:center; padding:30px; background-color:white; border-radius:12px; box-shadow:var(--shadow-sm); border:1px solid rgba(0,0,0,0.06);">
        <div class="completion-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:40px; height:40px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <h4 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--primary-teal); margin-bottom:15px;">Assessment Complete!</h4>
        <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:20px;">Enter your name below to generate your official Training Certificate.</p>
        
        <input type="text" id="final-cert-name" class="input-user-name" placeholder="Your Full Name" style="width:100%; margin-bottom:15px;" oninput="validateCertNameInput()">
        <button class="quiz-submit-btn" id="btn-generate-cert" onclick="generateFinalCertificate()" disabled>GENERATE CERTIFICATE</button>
      </div>
      
      <div class="certificate-frame" id="final-certificate-box" style="display:none; max-width: 650px; margin: 0 auto;">
        <div class="cert-logo">
          <img class="logo-img-cert" src="assets/logo.png" alt="Manshu Logo">
        </div>
        
        <div class="cert-heading">Certificate of Achievement</div>
        <div class="cert-recipient-label">This certifies that</div>
        <div class="cert-recipient-name" id="display-recipient-name">Student Name</div>
        <div class="cert-description">has successfully met the training requirements and passed the competency evaluations for the course:</div>
        
        <div style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: var(--primary-teal); margin-bottom: 25px;">
          Change Advice Notice Process<br>
          <span style="font-size: 0.85rem; color: var(--accent-orange); font-weight: 600;">Manshu</span>
        </div>
        
        <div class="cert-meta-row" style="margin-top:20px;">
          <div class="cert-meta-col">
            <div class="cert-meta-line"></div>
            <div class="cert-meta-label">Completion Date</div>
            <div class="cert-meta-val" id="display-cert-date">May 24, 2026</div>
          </div>
          <div class="cert-meta-col">
            <div class="cert-meta-line"></div>
            <div class="cert-meta-label">Assessment</div>
            <div class="cert-meta-val">Passed (100%)</div>
          </div>
          <div class="cert-meta-col">
            <div class="cert-meta-line"></div>
            <div class="cert-meta-label">Verification ID</div>
            <div class="cert-meta-val" id="display-cert-uid">MANSHU-589104-CAN</div>
          </div>
        </div>
        
        <div style="display:flex; justify-content:center; gap:15px; margin-top:35px;" class="cert-actions-hide">
          <button class="btn-cert-action secondary" onclick="downloadCertificate()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download</span>
          </button>
          <button class="btn-cert-action primary" onclick="restartCourseRedesign()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px; height:16px;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
            <span>Restart</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</section>
`,
  "slides/slide-3.html": `<section id="slide-3" class="slide-pane slide-pane-split slide-pane-quiz">
  <div class="slide-wrapper-split">
    <!-- Left Column: white background, question & choices -->
    <div class="split-col-left-quiz">
      <h3 class="quiz-main-title">Knowledge Check</h3>
      
      <div class="quiz-question-container">
        <div class="quiz-q-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="9" r="1" fill="currentColor"></circle>
            <path d="M12 13v-1a1.5 1.5 0 0 1 1.5-1.5h0A1.5 1.5 0 0 0 15 9a3 3 0 0 0-6 0"></path>
          </svg>
        </div>
        <div class="quiz-q-text">
          Which document mechanism governs modifications to the SeaRose FPSO's original safety system configuration limits?
        </div>
      </div>

      <div class="quiz-options-group" id="quiz-options-3">
        <div class="quiz-option-row" onclick="selectQuizOption(3, 0, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">A. The standard work order log</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(3, 1, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">B. Change Advice Notice (CAN)</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(3, 2, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">C. Minor tools inventory datasheet</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(3, 3, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">D. Configuration limits database</span>
        </div>
      </div>

      <button class="btn-quiz-submit" id="btn-quiz-submit-3" onclick="submitQuizAnswer(3)" disabled>SUBMIT</button>
    </div>

    <!-- Right Column: deep teal background, centered feedback card -->
    <div class="split-col-right-teal split-col-right-quiz-bg">
      <div class="quiz-right-bg-image" style="background-image: url('assets/drillship.png');"></div>
      <div class="quiz-right-overlay"></div>
      
      <div class="quiz-feedback-card-wrapper" id="feedback-card-wrapper-3">
        
        <!-- CORRECT CARD -->
        <div class="quiz-feedback-card correct-card" id="quiz-correct-3">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="feedback-status-title success">Correct</span>
          </div>
        </div>

        <!-- TRY AGAIN CARD -->
        <div class="quiz-feedback-card try-again-card" id="quiz-try-again-3">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span class="feedback-status-title warning">Please <strong>Try Again.</strong></span>
          </div>
          <button class="btn-quiz-retry" onclick="retryQuizQuestion(3)">Try Again</button>
        </div>

        <!-- INCORRECT CARD -->
        <div class="quiz-feedback-card incorrect-card" id="quiz-incorrect-3">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon failure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span class="feedback-status-title failure">Incorrect</span>
          </div>
          <p class="feedback-explanation">The correct answer is B.</p>
        </div>

      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-4.html": `<section id="slide-4" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">CAN 100 Process</h3>
      <p>The CAN 100 process governs standard engineering modifications. Click the timeline steps below to view active checklists:</p>
      
      <div class="timeline-track-wrapper">
        <div class="timeline-line-connector">
          <div class="timeline-line-progress" id="timeline-progress-bar-4"></div>
        </div>
        <div class="slide-timeline-mini">
          <div class="mini-timeline-item" onclick="triggerSlideInteraction(4, 'step1', this)">
            <div class="step-icon-container">
              <span class="step-num-circle">1</span>
              <svg class="step-success-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="step-text-container">
              <strong class="step-title-text">Initiation & Scope</strong>
              <span class="step-status-subtext">Click to inspect checklist</span>
            </div>
          </div>
          
          <div class="mini-timeline-item" onclick="triggerSlideInteraction(4, 'step2', this)">
            <div class="step-icon-container">
              <span class="step-num-circle">2</span>
              <svg class="step-success-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="step-text-container">
              <strong class="step-title-text">Engineering Assessment</strong>
              <span class="step-status-subtext">Click to inspect checklist</span>
            </div>
          </div>
          
          <div class="mini-timeline-item" onclick="triggerSlideInteraction(4, 'step3', this)">
            <div class="step-icon-container">
              <span class="step-num-circle">3</span>
              <svg class="step-success-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="step-text-container">
              <strong class="step-title-text">Authorization & Approvals</strong>
              <span class="step-status-subtext">Click to inspect checklist</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="slide-lock-warning" id="slide-lock-warning-4" style="margin-top: 20px;">
        <p class="lock-status-text warning-glow">⚠️ Click and inspect all three timeline nodes above to proceed.</p>
      </div>
    </div>
    <div class="slide-col-right">
      <!-- Details view -->
      <div id="step-detail-container" style="background-color:white; border:1px solid rgba(0,0,0,0.1); border-radius:12px; padding:25px; min-height:220px; display:flex; align-items:center; justify-content:center; color:var(--text-muted); text-align:center;">
        Click on a workflow timeline node to inspect roles and checklist details.
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-5.html": `<section id="slide-5" class="slide-pane slide-pane-split slide-pane-quiz">
  <div class="slide-wrapper-split">
    <!-- Left Column: white background, question & choices -->
    <div class="split-col-left-quiz">
      <h3 class="quiz-main-title">Knowledge Check</h3>
      
      <div class="quiz-question-container">
        <div class="quiz-q-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="9" r="1" fill="currentColor"></circle>
            <path d="M12 13v-1a1.5 1.5 0 0 1 1.5-1.5h0A1.5 1.5 0 0 0 15 9a3 3 0 0 0-6 0"></path>
          </svg>
        </div>
        <div class="quiz-q-text">
          Who is responsible for checking engineering drawing accuracy and performing structural calculations during a CAN design phase?
        </div>
      </div>

      <div class="quiz-options-group" id="quiz-options-5">
        <div class="quiz-option-row" onclick="selectQuizOption(7, 0, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">A. Onshore Engineering Support</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(7, 1, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">B. The offshore crane operator</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(7, 2, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">C. The inventory warehouse clerk</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(7, 3, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">D. Third-party logistics coordinator</span>
        </div>
      </div>

      <button class="btn-quiz-submit" id="btn-quiz-submit-5" onclick="submitQuizAnswer(5)" disabled>SUBMIT</button>
    </div>

    <!-- Right Column: deep teal background, centered feedback card -->
    <div class="split-col-right-teal split-col-right-quiz-bg">
      <div class="quiz-right-bg-image" style="background-image: url('assets/drillship.png');"></div>
      <div class="quiz-right-overlay"></div>
      
      <div class="quiz-feedback-card-wrapper" id="feedback-card-wrapper-5">
        
        <!-- CORRECT CARD -->
        <div class="quiz-feedback-card correct-card" id="quiz-correct-5">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="feedback-status-title success">Correct</span>
          </div>
        </div>

        <!-- TRY AGAIN CARD -->
        <div class="quiz-feedback-card try-again-card" id="quiz-try-again-5">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span class="feedback-status-title warning">Please <strong>Try Again.</strong></span>
          </div>
          <button class="btn-quiz-retry" onclick="retryQuizQuestion(5)">Try Again</button>
        </div>

        <!-- INCORRECT CARD -->
        <div class="quiz-feedback-card incorrect-card" id="quiz-incorrect-5">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon failure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span class="feedback-status-title failure">Incorrect</span>
          </div>
          <p class="feedback-explanation">The correct answer is A.</p>
        </div>

      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-6.html": `<section id="slide-6" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">CAN 400 Process</h3>
      <p>The CAN 400 workflow controls process alarm limits changes and safety-critical software upgrades. Perform both simulated actions below to complete and unlock the slide.</p>
      
      <div class="sim-grid">
        <!-- Simulation Card 1: Alarm Gatekeeping -->
        <div class="sim-card" id="sim-card-alarm">
          <h5 class="sim-card-title">DCS Alarm Review</h5>
          <p class="sim-card-desc">Review and approve shifted alarm configuration thresholds.</p>
          
          <div class="gauge-outer active-gauge" id="gauge-node-400">
            <div class="gauge-readout active-glow" id="gauge-val-400">85.2</div>
            <div class="gauge-unit">°C Limit</div>
            <div class="gauge-status-badge pending" id="gauge-badge-400">Pending Review</div>
          </div>
          
          <button class="sim-action-btn pulsing" id="btn-sim-alarm" onclick="triggerAlarmReview()">BOARD REVIEW & APPROVE</button>
        </div>
        
        <!-- Simulation Card 2: Software logic / HIL test -->
        <div class="sim-card" id="sim-card-hil">
          <h5 class="sim-card-title">Software HIL Simulator</h5>
          <p class="sim-card-desc">Run safety logic code shifts through simulator hardware loops.</p>
          
          <div class="plc-board">
            <div class="plc-led-grid">
              <div class="plc-led-col">
                <div class="plc-led" id="led-1"></div>
                <span class="plc-led-label">PWR</span>
              </div>
              <div class="plc-led-col">
                <div class="plc-led" id="led-2"></div>
                <span class="plc-led-label">RUN</span>
              </div>
              <div class="plc-led-col">
                <div class="plc-led" id="led-3"></div>
                <span class="plc-led-label">COM</span>
              </div>
              <div class="plc-led-col">
                <div class="plc-led" id="led-4"></div>
                <span class="plc-led-label">ERR</span>
              </div>
            </div>
          </div>
          
          <button class="sim-action-btn pulsing" id="btn-sim-hil" onclick="triggerHILTest()">RUN HIL SIMULATION</button>
          
          <div class="card-progress-wrapper" id="progress-wrapper-hil">
            <div class="card-progress-bar">
              <div class="card-progress-fill" id="progress-fill-hil"></div>
            </div>
            <span class="card-progress-text" id="progress-text-hil">Test Pending...</span>
          </div>
        </div>
      </div>
      
      <div class="slide-lock-warning" id="slide-lock-warning-6" style="margin-top: 15px;">
        <p class="lock-status-text warning-glow">⚠️ Complete both DCS alarm board review and HIL simulator testing to proceed.</p>
      </div>
    </div>
    
    <div class="slide-col-right">
      <div class="unlocked-reveal-pane">
        <!-- Default Placeholder Card -->
        <div class="placeholder-deck-card" id="placeholder-deck-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="9"/>
            <line x1="9" y1="13" x2="15" y2="13"/>
            <line x1="9" y1="17" x2="11" y2="17"/>
          </svg>
          <h5 class="placeholder-deck-title">Safety Requirements Locked</h5>
          <p class="placeholder-deck-desc">Perform the reviews on the left panel to load the gatekeeping deliverables.</p>
        </div>
        
        <!-- Reveal Card 1: Alarm Gatekeeping -->
        <div class="reveal-card orange-theme" id="reveal-card-gatekeeping">
          <div class="reveal-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h5 class="reveal-card-title">Alarm &amp; Software Gatekeeping</h5>
          </div>
          <ul class="reveal-card-bullet-list">
            <li>DCS alarm modifications require alarm management board review.</li>
            <li>Independent verification is required to baseline safety settings.</li>
          </ul>
        </div>
        
        <!-- Reveal Card 2: Software risk controls -->
        <div class="reveal-card rose-theme" id="reveal-card-risk">
          <div class="reveal-card-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <h5 class="reveal-card-title">Software Risk Control</h5>
          </div>
          <ul class="reveal-card-bullet-list">
            <li>Safety logic code shifts must undergo hardware-in-the-loop (HIL) simulators testing.</li>
            <li>Software adjustments can cascade into unexpected tripping patterns. CAN 400 ensures every logic node is assessed.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-7.html": `<section id="slide-7" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">CAN 600 Development</h3>
      <p>CAN 600 represents procedural changes and operational deviations from standard manuals.</p>
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">Operational Deviations Scope:</h4>
        <ul class="highlight-bullet-list">
          <li>Temporary operations guidelines.</li>
          <li>Deviations from standard operating manuals limits.</li>
          <li>Authorized by the operations manager.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#eef8ff; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Procedural Changes</h5>
        <p style="font-size:0.85rem; color:#555;">Operating procedures are legal bounds. Departures must be rigorously backed by safety matrix approvals.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-8.html": `<section id="slide-8" class="slide-pane">
  <div class="slide-wrapper">
    <div class="slide-col-left">
      <h3 class="slide-main-title">Re-Building of CAN P&amp;ID's</h3>
      <p>Drawing configuration integrity must be maintained. Redline drawings are committed to drafts for revision updates.</p>
      <div class="slide-highlight-card blue">
        <h4 class="card-highlight-title">Redline Protocol:</h4>
        <ul class="highlight-bullet-list">
          <li>Field technicians must physically markup drawing shifts in red.</li>
          <li>Updates must match the as-built equipment.</li>
          <li>Drafting clerks convert redlines to official CAD revisions.</li>
        </ul>
      </div>
    </div>
    <div class="slide-col-right">
      <div style="background-color:#fef8e8; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">
        <h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">Drawing Integrity</h5>
        <p style="font-size:0.85rem; color:#555;">P&IDs guide operations safety. Errors in drawings lead to operational hazard exposures.</p>
      </div>
    </div>
  </div>
</section>
`,
  "slides/slide-9.html": `<section id="slide-9" class="slide-pane slide-pane-split slide-pane-quiz">
  <div class="slide-wrapper-split">
    <div class="split-col-left-quiz">
      <h3 class="quiz-main-title">Knowledge Check</h3>
      
      <div class="quiz-question-container">
        <div class="quiz-q-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="9" r="1" fill="currentColor"></circle>
            <path d="M12 13v-1a1.5 1.5 0 0 1 1.5-1.5h0A1.5 1.5 0 0 0 15 9a3 3 0 0 0-6 0"></path>
          </svg>
        </div>
        <div class="quiz-q-text">
          What color standard is used by technicians to markup field configuration differences on mechanical drawings?
        </div>
      </div>

      <div class="quiz-options-group" id="quiz-options-9">
        <div class="quiz-option-row" onclick="selectQuizOption(11, 0, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">A. Yellow highlights</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(11, 1, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">B. Red pencil markup</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(11, 2, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">C. Black ink markers</span>
        </div>
        <div class="quiz-option-row" onclick="selectQuizOption(11, 3, this)">
          <div class="quiz-radio-circle"></div>
          <span class="quiz-option-text">D. Blue drafting ink</span>
        </div>
      </div>

      <button class="btn-quiz-submit" id="btn-quiz-submit-9" onclick="submitQuizAnswer(9)" disabled>SUBMIT</button>
    </div>

    <div class="split-col-right-teal split-col-right-quiz-bg">
      <div class="quiz-right-bg-image" style="background-image: url('assets/drillship.png');"></div>
      <div class="quiz-right-overlay"></div>
      
      <div class="quiz-feedback-card-wrapper" id="feedback-card-wrapper-9">
        
        <div class="quiz-feedback-card correct-card" id="quiz-correct-9">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="feedback-status-title success">Correct</span>
          </div>
        </div>

        <div class="quiz-feedback-card try-again-card" id="quiz-try-again-9">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span class="feedback-status-title warning">Please <strong>Try Again.</strong></span>
          </div>
          <button class="btn-quiz-retry" onclick="retryQuizQuestion(9)">Try Again</button>
        </div>

        <div class="quiz-feedback-card incorrect-card" id="quiz-incorrect-9">
          <div class="feedback-icon-title-row">
            <div class="feedback-circle-icon failure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span class="feedback-status-title failure">Incorrect</span>
          </div>
          <p class="feedback-explanation">The correct answer is B.</p>
        </div>

      </div>
    </div>
  </div>
</section>
`,
};
