# tools/verify-renovasi.ps1
# Verifikasi identitas konten halaman hasil renovasi (sebelum vs sesudah ganti kulit).
# Pemakaian:
#   powershell -File tools\verify-renovasi.ps1 -Before <file-lama.html> -After <file-baru.html>
# Membandingkan: title, meta description, canonical, teks h1, urutan teks h2/h3,
# dan seluruh blok JSON-LD (dibandingkan sebagai JSON yang dinormalisasi, bukan string mentah).
param(
  [Parameter(Mandatory = $true)][string]$Before,
  [Parameter(Mandatory = $true)][string]$After
)

function Extract([string]$path) {
  $h = Get-Content $path -Raw

  # Normalisasi entitas HTML agar perbandingan bersifat semantik (&amp; == &)
  function Decode([string]$s) {
    if (-not $s) { return $s }
    $t = $s -replace '&amp;', '&' -replace '&lt;', '<' -replace '&gt;', '>' -replace '&quot;', '"' -replace '&#39;', "'" -replace '&apos;', "'"
    return $t
  }

  $title = Decode ([regex]::Match($h, '<title>(.*?)</title>').Groups[1].Value.Trim())
  $desc  = [regex]::Match($h, '<meta name="description" content="(.*?)"').Groups[1].Value
  $canon = [regex]::Match($h, '<link rel="canonical" href="(.*?)"').Groups[1].Value

  $h1 = ([regex]::Matches($h, '<h1[^>]*>(.*?)</h1>', 'Singleline') |
    ForEach-Object { Decode (($_.Groups[1].Value -replace '<[^>]+>', '').Trim()) }) -join "`n"

  $hx = ([regex]::Matches($h, '<h[23][^>]*>(.*?)</h[23]>', 'Singleline') |
    ForEach-Object { Decode (($_.Groups[1].Value -replace '<[^>]+>', '').Trim()) }) -join "`n"

  $ld = [regex]::Matches($h, '<script type="application/ld\+json"[^>]*>(.*?)</script>', 'Singleline') |
    ForEach-Object {
      try { $_.Groups[1].Value | ConvertFrom-Json | ConvertTo-Json -Depth 64 -Compress }
      catch { "PARSE-ERROR: " + $_.Groups[1].Value.Substring(0, 80) }
    } |
    Sort-Object

  [pscustomobject]@{ title = $title; desc = $desc; canon = $canon; h1 = $h1; hx = $hx; ld = ($ld -join "`n") }
}

$b = Extract $Before
$a = Extract $After
$fail = 0
foreach ($k in 'title', 'desc', 'canon', 'h1', 'hx', 'ld') {
  if ("$($b.$k)" -ne "$($a.$k)") {
    Write-Host "BEDA: $k" -ForegroundColor Red
    if ($k -eq 'ld') {
      $bl = $b.ld -split "`n"; $al = $a.ld -split "`n"
      Write-Host ("  before blok: " + $bl.Count + ", after blok: " + $al.Count)
      foreach ($x in (Compare-Object $bl $al)) {
        $tanda = if ($x.SideIndicator -eq '<=') { 'hanya-di-before' } else { 'hanya-di-after' }
        Write-Host ("  [$tanda] " + $x.InputObject.Substring(0, [Math]::Min(160, $x.InputObject.Length)))
      }
    } elseif ($k -eq 'hx') {
      $bl = $b.hx -split "`n"; $al = $a.hx -split "`n"
      Write-Host ("  before heading: " + $bl.Count + ", after heading: " + $al.Count)
      $max = [Math]::Max($bl.Count, $al.Count)
      for ($i = 0; $i -lt $max; $i++) {
        $bv = if ($i -lt $bl.Count) { $bl[$i] } else { '(kosong)' }
        $av = if ($i -lt $al.Count) { $al[$i] } else { '(kosong)' }
        if ($bv -ne $av) { Write-Host ("  #" + ($i + 1) + " before: [" + $bv + "]  after: [" + $av + "]") }
      }
    } elseif ("$($b.$k)".Length -le 400) {
      Write-Host ("  before: " + $b.$k)
      Write-Host ("  after : " + $a.$k)
    }
    $fail++
  } else {
    Write-Host "OK: $k" -ForegroundColor Green
  }
}
exit $fail
