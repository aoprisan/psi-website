#!/usr/bin/env bash
# Build an Android artifact (APK or AAB) from the Capacitor project.
#
# Examples:
#   scripts/build-android.sh                # debug APK
#   scripts/build-android.sh --release      # release APK (signed if configured)
#   scripts/build-android.sh --aab          # release App Bundle for Play Store
#   scripts/build-android.sh --skip-web     # reuse the current dist/

set -euo pipefail

VARIANT="debug"
FORMAT="apk"
SKIP_WEB=0

usage() {
  cat <<'EOF'
Usage: scripts/build-android.sh [--release] [--aab] [--skip-web]

Options:
  --release      Build the release variant (default: debug). For a signed
                 release, configure signingConfigs in android/app/build.gradle
                 or supply android/keystore.properties.
  --aab          Produce an Android App Bundle (.aab). Implies --release.
  --skip-web     Skip the web build + cap sync step (reuse existing dist/).
  -h, --help     Show this help.

Release builds (--release / --aab) auto-bump the patch version: package.json
"version" gets bumped (e.g. 0.1.0 -> 0.1.1), and android/app/build.gradle is
synced (versionName matches, versionCode increments by 1). This keeps Play
Console uploads from colliding on versionCode.

Output is copied to build/android/ as <package-name>-v<versionName>-<suffix>.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --release)  VARIANT="release"; shift ;;
    --aab)      VARIANT="release"; FORMAT="aab"; shift ;;
    --skip-web) SKIP_WEB=1; shift ;;
    -h|--help)  usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ -z "${ANDROID_HOME:-}" && -z "${ANDROID_SDK_ROOT:-}" ]]; then
  echo "warn: neither ANDROID_HOME nor ANDROID_SDK_ROOT is set; Gradle may fail to locate the SDK." >&2
fi

if [[ "$VARIANT" == "release" ]]; then
  GRADLE_FILE="$ROOT/android/app/build.gradle"
  OLD_VERSION="$(node -p "require('$ROOT/package.json').version")"
  NEW_VERSION="$(npm --prefix "$ROOT" --no-git-tag-version version patch | tail -1 | sed 's/^v//')"
  OLD_CODE="$(grep -E '^[[:space:]]*versionCode' "$GRADLE_FILE" | sed -E 's/[^0-9]//g' | head -1)"
  NEW_CODE=$((OLD_CODE + 1))
  sed -i '' -E "s/versionCode[[:space:]]+[0-9]+/versionCode $NEW_CODE/" "$GRADLE_FILE"
  sed -i '' -E "s/versionName[[:space:]]+\"[^\"]+\"/versionName \"$NEW_VERSION\"/" "$GRADLE_FILE"
  echo "==> Version bumped: $OLD_VERSION -> $NEW_VERSION (versionCode $OLD_CODE -> $NEW_CODE)"
fi

if [[ "$SKIP_WEB" -eq 0 ]]; then
  echo "==> Building web bundle (MOBILE=1)"
  npm run build:mobile
  echo "==> Syncing Capacitor (android)"
  npx cap sync android
fi

APP_NAME="$(node -p "require('$ROOT/package.json').name" 2>/dev/null || echo app)"

cd android

VERSION_NAME="$(grep -E '^[[:space:]]*versionName' app/build.gradle | sed -E 's/.*"([^"]+)".*/\1/' | head -1)"
[[ -z "$VERSION_NAME" ]] && VERSION_NAME="0"

case "$VARIANT:$FORMAT" in
  debug:apk)
    TASK="assembleDebug"
    SEARCH_DIR="app/build/outputs/apk/debug"
    ;;
  release:apk)
    TASK="assembleRelease"
    SEARCH_DIR="app/build/outputs/apk/release"
    ;;
  release:aab)
    TASK="bundleRelease"
    SEARCH_DIR="app/build/outputs/bundle/release"
    ;;
  *)
    echo "unsupported variant/format: $VARIANT/$FORMAT" >&2
    exit 2
    ;;
esac

echo "==> Gradle: $TASK"
./gradlew "$TASK"

OUT_DIR="$ROOT/build/android"
mkdir -p "$OUT_DIR"

shopt -s nullglob
artifacts=("$SEARCH_DIR"/*."$FORMAT")
shopt -u nullglob
if [[ ${#artifacts[@]} -eq 0 ]]; then
  echo "error: no .$FORMAT artifact found under android/$SEARCH_DIR" >&2
  exit 1
fi

renamed=()
for a in "${artifacts[@]}"; do
  base="$(basename "$a")"
  suffix="${base#app-}"
  new_name="${APP_NAME}-v${VERSION_NAME}-${suffix}"
  cp -f "$a" "$OUT_DIR/$new_name"
  renamed+=("$new_name")
done

echo
echo "Build complete. Artifacts:"
for r in "${renamed[@]}"; do
  echo "  build/android/$r"
done

if [[ "$VARIANT" == "release" ]]; then
  for r in "${renamed[@]}"; do
    if [[ "$r" == *"-unsigned"* ]]; then
      echo
      echo "note: release artifact is unsigned. Configure signing in" >&2
      echo "      android/app/build.gradle to produce an installable build." >&2
      break
    fi
  done
fi
