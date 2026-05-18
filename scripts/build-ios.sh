#!/usr/bin/env bash
# Build an iOS artifact (.xcarchive and .ipa) from the Capacitor project.
# Requires macOS with Xcode and the iOS SDK.
#
# Examples:
#   scripts/build-ios.sh                          # release archive + IPA (development export)
#   scripts/build-ios.sh --export-method app-store
#   scripts/build-ios.sh --archive-only           # skip IPA export
#   scripts/build-ios.sh --simulator              # .app for the iOS Simulator
#   scripts/build-ios.sh --skip-web               # reuse current dist/

set -euo pipefail

CONFIGURATION="Release"
SCHEME="App"
EXPORT_METHOD="development"
SKIP_WEB=0
SIMULATOR=0
ARCHIVE_ONLY=0

usage() {
  cat <<'EOF'
Usage: scripts/build-ios.sh [--configuration Debug|Release]
                            [--export-method development|app-store|ad-hoc|enterprise]
                            [--simulator] [--archive-only] [--skip-web]

Options:
  --configuration   Xcode configuration (default: Release).
  --export-method   IPA export method (default: development). Needs a
                    matching signing profile.
  --simulator       Build for the iOS Simulator (no signing, no IPA).
  --archive-only    Produce an .xcarchive but skip IPA export.
  --skip-web        Skip the web build + cap sync step.
  -h, --help        Show this help.

Outputs are written to build/ios/. To customize export, place an
ExportOptions.plist at ios/ExportOptions.plist and it will be used as-is.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --configuration) CONFIGURATION="$2"; shift 2 ;;
    --export-method) EXPORT_METHOD="$2"; shift 2 ;;
    --simulator)     SIMULATOR=1; shift ;;
    --archive-only)  ARCHIVE_ONLY=1; shift ;;
    --skip-web)      SKIP_WEB=1; shift ;;
    -h|--help)       usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
done

if [[ "$(uname)" != "Darwin" ]]; then
  echo "error: iOS builds require macOS with Xcode installed." >&2
  exit 1
fi

if ! command -v xcodebuild >/dev/null 2>&1; then
  echo "error: xcodebuild not found. Install Xcode and run 'xcode-select --install'." >&2
  exit 1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "$SKIP_WEB" -eq 0 ]]; then
  echo "==> Building web bundle (MOBILE=1)"
  npm run build:mobile
  echo "==> Syncing Capacitor (ios)"
  npx cap sync ios
fi

# Prefer the workspace if present (CocoaPods-style); fall back to the
# bare project (SPM-only setups, which is what Capacitor 6+ generates).
WORKSPACE="ios/App/App.xcworkspace"
PROJECT="ios/App/App.xcodeproj"
if [[ -d "$WORKSPACE" ]]; then
  XC_TARGET=(-workspace "$WORKSPACE")
else
  XC_TARGET=(-project "$PROJECT")
fi

OUT_DIR="$ROOT/build/ios"
mkdir -p "$OUT_DIR"

if [[ "$SIMULATOR" -eq 1 ]]; then
  echo "==> Building for iOS Simulator ($CONFIGURATION)"
  xcodebuild "${XC_TARGET[@]}" \
    -scheme "$SCHEME" \
    -configuration "$CONFIGURATION" \
    -sdk iphonesimulator \
    -derivedDataPath "$OUT_DIR/DerivedData" \
    CODE_SIGNING_ALLOWED=NO \
    build
  APP_PATH="$OUT_DIR/DerivedData/Build/Products/$CONFIGURATION-iphonesimulator/$SCHEME.app"
  echo
  echo "Simulator build complete: $APP_PATH"
  exit 0
fi

ARCHIVE_PATH="$OUT_DIR/$SCHEME.xcarchive"
echo "==> Archiving ($CONFIGURATION)"
xcodebuild "${XC_TARGET[@]}" \
  -scheme "$SCHEME" \
  -configuration "$CONFIGURATION" \
  -sdk iphoneos \
  -destination 'generic/platform=iOS' \
  -archivePath "$ARCHIVE_PATH" \
  archive

if [[ "$ARCHIVE_ONLY" -eq 1 ]]; then
  echo
  echo "Archive complete: $ARCHIVE_PATH"
  exit 0
fi

EXPORT_PLIST="$ROOT/ios/ExportOptions.plist"
if [[ ! -f "$EXPORT_PLIST" ]]; then
  EXPORT_PLIST="$OUT_DIR/ExportOptions.plist"
  cat > "$EXPORT_PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key><string>$EXPORT_METHOD</string>
  <key>signingStyle</key><string>automatic</string>
  <key>stripSwiftSymbols</key><true/>
</dict>
</plist>
PLIST
fi

echo "==> Exporting IPA (method: $EXPORT_METHOD)"
xcodebuild -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportPath "$OUT_DIR" \
  -exportOptionsPlist "$EXPORT_PLIST"

echo
echo "Export complete:"
ls -1 "$OUT_DIR"/*.ipa 2>/dev/null || echo "  (no .ipa produced; check Xcode signing configuration)"
