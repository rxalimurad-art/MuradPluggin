#!/bin/sh
# Renders SVG icon masters into an Xcode AppIcon.appiconset using only built-in macOS tools
# (qlmanage + sips). Usage: render-icon.sh <masters-dir> <AppIcon.appiconset-dir>
# <masters-dir> holds icon.svg (required, opaque), icon-dark.svg and icon-tinted.svg (optional).
set -eu

src=${1:?usage: render-icon.sh <masters-dir> <AppIcon.appiconset-dir>}
out=${2:?usage: render-icon.sh <masters-dir> <AppIcon.appiconset-dir>}
[ -f "$src/icon.svg" ] || { echo "missing $src/icon.svg" >&2; exit 1; }
mkdir -p "$out"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

render() { # <svg> <png>: rasterize at 1024x1024
  # qlmanage pads non-square art onto a square canvas, so check the viewBox up front.
  vb=$(tr '\n' ' ' < "$1" | sed -n 's/.*viewBox="\([^"]*\)".*/\1/p' | tr ',' ' ')
  echo "$vb" | awk 'NF != 4 || $3 != $4 { exit 1 }' || { echo "$1 needs a square viewBox (got \"$vb\")" >&2; exit 1; }
  qlmanage -t -s 1024 -o "$tmp" "$1" >/dev/null 2>&1
  png="$tmp/$(basename "$1").png"
  [ -f "$png" ] || { echo "failed to render $1" >&2; exit 1; }
  mv "$png" "$2"
}

# The App Store rejects a primary icon with an alpha channel, so flatten it through JPEG.
render "$src/icon.svg" "$tmp/light.png"
sips -s format jpeg -s formatOptions 100 "$tmp/light.png" --out "$tmp/light.jpg" >/dev/null
sips -s format png "$tmp/light.jpg" --out "$out/AppIcon-1024.png" >/dev/null

images='    { "filename" : "AppIcon-1024.png", "idiom" : "universal", "platform" : "ios", "size" : "1024x1024" }'
# Dark and tinted variants may keep transparency; the system draws the background.
for variant in dark tinted; do
  [ -f "$src/icon-$variant.svg" ] || continue
  render "$src/icon-$variant.svg" "$out/AppIcon-$variant.png"
  images="$images,
    { \"appearances\" : [ { \"appearance\" : \"luminosity\", \"value\" : \"$variant\" } ], \"filename\" : \"AppIcon-$variant.png\", \"idiom\" : \"universal\", \"platform\" : \"ios\", \"size\" : \"1024x1024\" }"
done

cat > "$out/Contents.json" <<EOF
{
  "images" : [
$images
  ],
  "info" : { "author" : "xcode", "version" : 1 }
}
EOF

echo "Wrote $(ls "$out" | tr '\n' ' ')to $out"
sips -g hasAlpha "$out/AppIcon-1024.png" | awk '/hasAlpha/ { if ($2 != "no") { print "primary icon still has alpha" > "/dev/stderr"; exit 1 } }'
