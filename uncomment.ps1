$file = 'c:\Users\ASUS\Desktop\HtmlProject\index.html'
$lines = Get-Content $file -Encoding UTF8
$result = [System.Collections.Generic.List[string]]::new()

foreach ($line in $lines) {
    $t = $line.Trim()
    if ($t -eq '<!--') { continue }
    if ($t -eq '-->') { continue }
    if ($t -match '^\[InnerComment:') { continue }
    $result.Add($line)
}

[System.IO.File]::WriteAllLines($file, $result, [System.Text.Encoding]::UTF8)
Write-Host "Done. Original lines: $($lines.Count) | Resulting lines: $($result.Count) | Removed: $($lines.Count - $result.Count)"
