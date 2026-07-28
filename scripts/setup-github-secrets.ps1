<#
.SYNOPSIS
  Sets the GitHub Actions repository secrets needed by .github/workflows/deploy.yml
  (SSH_HOSTNAME, SSH_USERNAME, SSH_PRIVATE_KEY, DEPLOY_PATH) using the GitHub CLI.

.DESCRIPTION
  Run this once from the repo root after enabling SSH and generating an SSH key pair
  in the Xserver control panel. Requires `gh` to be installed and authenticated
  (`gh auth login`) with access to this repository.

.EXAMPLE
  ./scripts/setup-github-secrets.ps1
  ./scripts/setup-github-secrets.ps1 -KeyPath "C:\keys\xserver_id_rsa"
#>

param(
    [string]$KeyPath
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "GitHub CLI ('gh') was not found on PATH. Install it from https://cli.github.com/ first."
    exit 1
}

gh auth status *>$null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Not logged in to GitHub CLI. Run 'gh auth login' first."
    exit 1
}

function Read-RequiredValue([string]$Prompt) {
    do {
        $value = Read-Host $Prompt
    } while ([string]::IsNullOrWhiteSpace($value))
    return $value
}

Write-Host "This configures secrets for the current repo's GitHub Actions Xserver deploy workflow." -ForegroundColor Cyan
Write-Host ""

$sshHostname = Read-RequiredValue "SSH_HOSTNAME (e.g. svXXXX.xserver.jp)"
$sshUsername = Read-RequiredValue "SSH_USERNAME (Xserver server ID, e.g. xsXXXXXX)"
$deployPath  = Read-RequiredValue "DEPLOY_PATH (absolute path on server, e.g. /home/xsXXXXXX/your-domain.com/public_html)"

if (-not $KeyPath) {
    $KeyPath = Read-RequiredValue "Path to the SSH private key file (downloaded from Xserver's SSH key-pair generator)"
}
$KeyPath = $KeyPath.Trim('"')
if (-not (Test-Path $KeyPath)) {
    Write-Error "Private key file not found at: $KeyPath"
    exit 1
}

Write-Host ""
Write-Host "Setting secrets via gh..." -ForegroundColor Cyan

$sshHostname | gh secret set SSH_HOSTNAME
$sshUsername | gh secret set SSH_USERNAME
$deployPath  | gh secret set DEPLOY_PATH
Get-Content -Raw -LiteralPath $KeyPath | gh secret set SSH_PRIVATE_KEY

Write-Host ""
Write-Host "Done. Verify with: gh secret list" -ForegroundColor Green
