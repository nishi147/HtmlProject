$f = 'c:\Users\ASUS\Desktop\HtmlProject\index.html'
$c = [IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

# Normalize to LF for reliable matching
$c = $c.Replace("`r`n", "`n")

$NL = "`n"
$I  = "                "   # 16 spaces
$I2 = "                  " # 18 spaces
$I3 = "                    " # 20 spaces

function Make-OldPanel {
    param($bg, $title, $desc)
    return ($I + '<div style="background-color:' + $bg + '; border-radius:12px; padding:30px; display:flex; flex-direction:column; justify-content:center; height:100%;">' + $NL +
            $I2 + '<h5 style="margin-bottom:10px; color:var(--primary-teal); font-family:var(--font-heading);">' + $title + '</h5>' + $NL +
            $I2 + '<p style="font-size:0.85rem; color:#555;">' + $desc + '</p>' + $NL +
            $I + '</div>')
}

function Make-NewPanel {
    param($class, $tag, $title, $desc, $icon)
    return ($I + '<div class="slide-info-panel ' + $class + '">' + $NL +
            $I2 + '<div class="sip-icon-ring">' + $NL +
            $I3 + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + $icon + '</svg>' + $NL +
            $I2 + '</div>' + $NL +
            $I2 + '<span class="sip-tag">' + $tag + '</span>' + $NL +
            $I2 + '<h5 class="sip-title">' + $title + '</h5>' + $NL +
            $I2 + '<p class="sip-desc">' + $desc + '</p>' + $NL +
            $I + '</div>')
}

# -- Slide 6: Offshore Operations → ip-sky
$c = $c.Replace(
    (Make-OldPanel '#eef' 'Offshore Operations' 'All physical work packs on the SeaRose FPSO or deep sea drilling ships must reference the specific CAN ID matching the configuration change.'),
    (Make-NewPanel 'ip-sky' 'Offshore Field Operations' 'Offshore Operations' 'All physical work packs on the SeaRose FPSO or deep sea drilling ships must reference the specific CAN ID matching the configuration change.' '<polygon points="3 11 22 2 13 21 11 13 3 11"/>')
)

# -- Slide 7: Onshore Engineering Support → ip-teal
$c = $c.Replace(
    (Make-OldPanel '#efe' 'Onshore Engineering Support' 'Onshore teams hold responsibility for final master drawing check-ins. No red-lines are committed to standard libraries without their sign-off.'),
    (Make-NewPanel 'ip-teal' 'Onshore Engineering' 'Onshore Engineering Support' 'Onshore teams hold responsibility for final master drawing check-ins. No red-lines are committed to standard libraries without their sign-off.' '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>')
)

# -- Slide 9: Software Risk Control → ip-rose
$c = $c.Replace(
    (Make-OldPanel '#ffeef4' 'Software Risk Control' 'Software adjustments can cascade into unexpected tripping patterns. CAN 400 ensures every logic node is assessed.'),
    (Make-NewPanel 'ip-rose' 'Software Risk Control' 'Software Risk Control' 'Software adjustments can cascade into unexpected tripping patterns. CAN 400 ensures every logic node is assessed.' '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>')
)

# -- Slide 10: Procedural Changes → ip-sky
$c = $c.Replace(
    (Make-OldPanel '#eef8ff' 'Procedural Changes' 'Operating procedures are legal bounds. Departures must be rigorously backed by safety matrix approvals.'),
    (Make-NewPanel 'ip-sky' 'Procedural Deviations' 'Procedural Changes' 'Operating procedures are legal bounds. Departures must be rigorously backed by safety matrix approvals.' '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>')
)

# -- Slide 11: Drawing Integrity → ip-amber
$c = $c.Replace(
    (Make-OldPanel '#fef8e8' 'Drawing Integrity' 'P&IDs guide operations safety. Errors in drawings lead to operational hazard exposures.'),
    (Make-NewPanel 'ip-amber' 'Drawing Integrity' 'Drawing Integrity' 'P&IDs guide operations safety. Errors in drawings lead to operational hazard exposures.' '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>')
)

# -- Slide 13: Regulated Integrity → ip-rose
$c = $c.Replace(
    (Make-OldPanel '#fee' 'Regulated Integrity' 'Regulatory guidelines demand notification if safety-critical systems operational margins are shifted.'),
    (Make-NewPanel 'ip-rose' 'Regulated Safety' 'Regulated Integrity' 'Regulatory guidelines demand notification if safety-critical systems operational margins are shifted.' '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>')
)

# -- Slide 14: Vendor Integration → ip-purple
$c = $c.Replace(
    (Make-OldPanel '#f6f6ff' 'Vendor Integration' 'Equipment packages manuals must match as-built installation models to prevent operational error during maintenance.'),
    (Make-NewPanel 'ip-purple' 'Vendor Alignment' 'Vendor Integration' 'Equipment packages manuals must match as-built installation models to prevent operational error during maintenance.' '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>')
)

# -- Slide 15: Audit Trail → ip-teal
$c = $c.Replace(
    (Make-OldPanel '#eef' 'Audit Trail' 'Clear status labeling prevents engineers from building designs off outdated modifications.'),
    (Make-NewPanel 'ip-teal' 'Audit Trail' 'Audit Trail' 'Clear status labeling prevents engineers from building designs off outdated modifications.' '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>')
)

# -- Slide 16: Master Library Update → ip-mint
$c = $c.Replace(
    (Make-OldPanel '#e8f8f5' 'Master Library Update' 'Closing files ensures drawings reflect physical equipment layouts, avoiding document sprawl.'),
    (Make-NewPanel 'ip-mint' 'Master Library' 'Master Library Update' 'Closing files ensures drawings reflect physical equipment layouts, avoiding document sprawl.' '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>')
)

# -- Slide 17: Change Scope Limits → ip-amber
$c = $c.Replace(
    (Make-OldPanel '#fff3cd' 'Change Scope Limits' 'Scope increases require major revision logs. Never slip extra modifications into minor logs.'),
    (Make-NewPanel 'ip-amber' 'Change Scope' 'Change Scope Limits' 'Scope increases require major revision logs. Never slip extra modifications into minor logs.' '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>')
)

# -- Slide 18: Configuration Identifiers → ip-sky
$c = $c.Replace(
    (Make-OldPanel '#f0f8ff' 'Configuration Identifiers' 'Numeric values represent approved design baselines. Alphabetical letters are saved for drafts.'),
    (Make-NewPanel 'ip-sky' 'Configuration IDs' 'Configuration Identifiers' 'Numeric values represent approved design baselines. Alphabetical letters are saved for drafts.' '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>')
)

# -- Slide 20: Upgrade cert setup container to premium card
$oldCert = ($I + '<div id="cert-setup-container" style="max-width:500px; margin:0 auto; text-align:center; padding:30px; background-color:white; border-radius:12px; box-shadow:var(--shadow-sm); border:1px solid rgba(0,0,0,0.06);">' + $NL +
            $I2 + '<div class="completion-badge">' + $NL +
            $I3 + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:40px; height:40px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' + $NL +
            $I2 + '</div>' + $NL +
            $I2 + '<h4 style="font-family:var(--font-heading); font-size:1.4rem; color:var(--primary-teal); margin-bottom:15px;">Assessment Complete!</h4>' + $NL +
            $I2 + '<p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:20px;">Enter your name below to generate your official Training Certificate.</p>' + $NL +
            $I2 + $NL +
            $I2 + '<input type="text" id="final-cert-name" class="input-user-name" placeholder="Your Full Name" style="width:100%; margin-bottom:15px;" oninput="validateCertNameInput()">' + $NL +
            $I2 + '<button class="quiz-submit-btn" id="btn-generate-cert" onclick="generateFinalCertificate()" disabled>GENERATE CERTIFICATE</button>' + $NL +
            $I + '</div>')

$newCert = ($I + '<div id="cert-setup-container" class="cert-setup-card">' + $NL +
            $I2 + '<div class="cert-completion-badge">' + $NL +
            $I3 + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' + $NL +
            $I2 + '</div>' + $NL +
            $I2 + '<h4 class="cert-setup-title">Assessment Complete!</h4>' + $NL +
            $I2 + '<p class="cert-setup-subtitle">Enter your name below to generate your official Training Certificate.</p>' + $NL +
            $I2 + '<input type="text" id="final-cert-name" class="cert-name-input" placeholder="Your Full Name" oninput="validateCertNameInput()">' + $NL +
            $I2 + '<button class="cert-generate-btn" id="btn-generate-cert" onclick="generateFinalCertificate()" disabled>GENERATE CERTIFICATE</button>' + $NL +
            $I + '</div>')

$c = $c.Replace($oldCert, $newCert)

# Restore CRLF line endings
$c = $c.Replace("`n", "`r`n")

[IO.File]::WriteAllText($f, $c, [System.Text.Encoding]::UTF8)

# Count how many premium panels exist in the file
$count = ([regex]::Matches($c, 'slide-info-panel')).Count
Write-Host "Done! slide-info-panel occurrences in file: $count"
