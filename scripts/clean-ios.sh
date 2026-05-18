#!/usr/bin/env bash
# Clean iOS build artifacts.
#
# Examples:
#   scripts/clean-ios.sh             # remove build outputs
#   scripts/clean-ios.sh --deep      # also wipe DerivedData and synced web assets

set -euo pipefail

DEEP=0

usage() {
  cat <<'EOF'
Usage: scripts/clean-ios.sh [--deep]

Removes:
  ios/App/build/
  ios/App/DerivedData/
  ios/App/output/
  build/ios/

With --deep, also removes:
  ~/Library/Developer/Xcode/DerivedData/App-*  (global Xcode cache)
  ios/App/App/public/                          (synced web bundle)
  ios/App/App/capacitor.config.json
  ios/App/App/config.xml

On macOS the script also runs `xcodebuild clean` if Xcode is available.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --deep) DEEP=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "$(uname)" == "Darwin" ]] && command -v xcodebuild >/dev/null 2>&1; then
  WORKSPACE="ios/App/App.xcworkspace"
  PROJECT="ios/App/App.xcodeproj"
  if [[ -d "$WORKSPACE" ]]; then
    XC_TARGET=(-workspace "$WORKSPACE")
  else
    XC_TARGET=(-project "$PROJECT")
  fi
  echo "==> xcodebuild clean"
  xcodebuild "${XC_TARGET[@]}" -scheme App -configuration Debug   clean || true
  xcodebuild "${XC_TARGET[@]}" -scheme App -configuration Release clean || true
fi

echo "==> Removing build outputs"
rm -rf ios/App/build
rm -rf ios/App/DerivedData
rm -rf ios/App/output
rm -rf build/ios

if [[ "$DEEP" -eq 1 ]]; then
  echo "==> Deep clean: synced web assets + global DerivedData"
  rm -rf ios/App/App/public
  rm -f  ios/App/App/capacitor.config.json
  rm -f  ios/App/App/config.xml
  if [[ -d "$HOME/Library/Developer/Xcode/DerivedData" ]]; then
    rm -rf "$HOME/Library/Developer/Xcode/DerivedData"/App-*
  fi
fi

echo "iOS clean complete."
