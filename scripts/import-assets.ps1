# =====================================================================
#  Ami Optics - asset importer
#  Copies the chosen real shop assets out of the "Ami Optics Website
#  Assets" folder into ami-optics-website/public with the exact paths
#  the site expects. Run once from the project root:
#
#      powershell -ExecutionPolicy Bypass -File scripts\import-assets.ps1
#
#  Re-running is safe (it overwrites). Destinations are relative to
#  /public, so this also handles /public/videos and /public/images/brand.
#  Keep this file ASCII-only (PowerShell 5.1 mis-parses non-ASCII strings).
# =====================================================================

$ErrorActionPreference = "Stop"

# assets root = the "Ami Optics Website Assets" folder (two levels up from this script)
$assets = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$public = (Resolve-Path (Join-Path $PSScriptRoot "..\public")).Path

# source (relative to the assets root)  ->  destination (relative to /public)
$map = @(
  # --- Hero: BOTH brothers together (still image; see Hero.tsx for why) ---
  @{ from = "02. Photos\Founders\Dad & Uncle\IMG_2460_.jpg";          to = "images\hero\founders-2460.jpg" }

  # --- Brand: the real logo (transparent, full colour) -----------------
  @{ from = "01 Branding\AMI OPTICS LOGO.svg";                        to = "images\brand\ami-optics-logo.svg" }

  # --- Heritage / history: GRANDFATHER only (Vinodchandra Vora) ---------
  @{ from = "02. Photos\Founders\Grandfather\IMG_2134_.jpg";          to = "images\heritage\grandfather.jpg" }

  # --- Brothers: distinct, role-appropriate (confirm name<->face) -------
  #   jignesh = operations/bench (leaner brother); jatin = eye testing/care.
  @{ from = "02. Photos\Founders\Dad\IMG_2439_.jpg";                  to = "images\founders\jignesh.jpg" }
  @{ from = "02. Photos\Founders\Uncle\IMG_2161_.jpg";                to = "images\founders\jatin.jpg" }   # best available uncle working photo (to be replaced later)

  # --- Services / Collections -----------------------------------------
  @{ from = "02. Photos\Founders\Uncle\IMG_2170_.jpg";               to = "images\shop\eye-testing.jpeg" }   # upright eye test
  @{ from = "05. Products\Spectacle Frames\Sheet\IMG-20240507-WA0014.jpeg"; to = "images\products\spectacle-frames.jpeg" }
  @{ from = "05. Products\Lens Type\Bifocal\B7D58461-D441-426E-B17A-9DF9C641584F.png"; to = "images\products\prescription-lenses.png" }
  @{ from = "02. Photos\Shop Interior\97620A66-C14A-4A44-8F8C-AA21356DCA15_.jpg";       to = "images\products\spectacle-frames-collection.jpeg" }

  # --- Optional moving hero (disabled in code; kept available) ----------
  @{ from = "03. Videos\Dad Working.mp4";                            to = "videos\hero.mp4" }

  # --- Eye Care Journey: per-step videos (matched by clip name to step) --
  @{ from = "03. Videos\Eye Test.mp4";                               to = "videos\journey\step-1-eye-test.mp4" }
  @{ from = "03. Videos\Attending Customer.mp4";                     to = "videos\journey\step-2-choose-frame.mp4" }
  @{ from = "03. Videos\Checking Number Through Glass.mp4";          to = "videos\journey\step-3-choose-lens.mp4" }
  @{ from = "03. Videos\Automatic Lens Cutting.mp4";                 to = "videos\journey\step-4-lens-processing.mp4" }
  @{ from = "03. Videos\Uncle Fitting Specs.mp4";                    to = "videos\journey\step-5-fitting.mp4" }
  @{ from = "03. Videos\Spectacles 2.mp4";                           to = "videos\journey\step-6-result.mp4" }
)

Write-Host "Importing Ami Optics assets ->" $public -ForegroundColor Cyan
$ok = 0; $miss = 0
foreach ($m in $map) {
  $src = Join-Path $assets $m.from
  $out = Join-Path $public $m.to
  if (Test-Path $src) {
    New-Item -ItemType Directory -Force -Path (Split-Path $out) | Out-Null
    Copy-Item -Path $src -Destination $out -Force
    Write-Host ("  [ok]   {0}" -f $m.to) -ForegroundColor Green
    $ok++
  } else {
    Write-Host ("  [miss] {0}  <- {1}" -f $m.to, $m.from) -ForegroundColor Yellow
    $miss++
  }
}

Write-Host ""
Write-Host ("Done. {0} copied, {1} missing." -f $ok, $miss) -ForegroundColor Cyan
if ($miss -gt 0) {
  Write-Host "Some sources were not found - check the [miss] paths above against your Assets folder." -ForegroundColor Yellow
}
