#!/usr/bin/env bash
# Clean all mobile build artifacts (web bundle + Android + iOS).
#
# Examples:
#   scripts/clean-mobile.sh              # everything, shallow
#   scripts/clean-mobile.sh --deep       # also wipe gradle/Xcode caches
#   scripts/clean-mobile.sh --android    # only Android
#   scripts/clean-mobile.sh --ios        # only iOS

set -euo pipefail

DEEP_FLAG=""
DO_ANDROID=1
DO_IOS=1
DO_WEB=1

usage() {
  cat <<'EOF'
Usage: scripts/clean-mobile.sh [--android] [--ios] [--no-web] [--deep]

Options:
  --android    Clean only Android artifacts.
  --ios        Clean only iOS artifacts.
  --no-web     Skip removing the web bundle (dist/).
  --deep       Pass --deep through to per-platform scripts (wipes
               gradle cache, DerivedData, synced web assets).
  -h, --help   Show this help.

With no platform flag, cleans both Android and iOS.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --android) DO_ANDROID=1; DO_IOS=0; shift ;;
    --ios)     DO_IOS=1; DO_ANDROID=0; shift ;;
    --no-web)  DO_WEB=0; shift ;;
    --deep)    DEEP_FLAG="--deep"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "$DO_ANDROID" -eq 1 ]]; then
  bash scripts/clean-android.sh $DEEP_FLAG
fi

if [[ "$DO_IOS" -eq 1 ]]; then
  bash scripts/clean-ios.sh $DEEP_FLAG
fi

if [[ "$DO_WEB" -eq 1 ]]; then
  echo "==> Removing web bundle"
  rm -rf dist
  rm -rf build
fi

echo "Mobile clean complete."
