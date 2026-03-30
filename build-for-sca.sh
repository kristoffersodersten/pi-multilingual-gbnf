#!/bin/bash
# Build script for ShittyCodingAgent.ai/packages

echo "🌍 Building Multilingual GBNF for SCA..."

# Install
npm install

# Build
npm run build

# Create ZIP (exclude node_modules and source maps)
OUTPUT="pi-multilingual-gbnf-v1.0.0.zip"

rm -f "$OUTPUT"
zip -r "$OUTPUT" \
  dist/ \
  README.md \
  LICENSE \
  sca-package.json \
  -x "*.map" \
  -x "*.test.*" \
  -x "*.DS_Store"

# Show result
SIZE=$(du -h "$OUTPUT" | cut -f1)
echo ""
echo "✅ Package created: $OUTPUT"
echo "📦 Size: $SIZE"
echo ""
echo "📤 Upload to: https://shittycodingagent.ai/packages"
echo "   - Package name: pi-multilingual-gbnf"
echo "   - Version: 1.0.0"
echo "   - Entry: dist/index.js"
