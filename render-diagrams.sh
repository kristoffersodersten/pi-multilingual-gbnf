#!/bin/bash
# Render all D2 diagrams for pi-multilingual-gbnf

echo "🎨 Rendering D2 Diagrams for Signal Amplification"
echo "=================================================="
echo ""

cd "$(dirname "$0")/diagrams"

# Function to render with different styles
render_diagram() {
    local file=$1
    local name=$(basename "$file" .d2)
    
    echo "📊 Processing: $name"
    
    # SVG (default)
    d2 "$file" "${name}.svg"
    echo "  ✓ ${name}.svg"
    
    # Dark theme
    d2 -t 7 "$file" "${name}-dark.svg"
    echo "  ✓ ${name}-dark.svg"
    
    # Sketch mode
    d2 --sketch "$file" "${name}-sketch.svg"
    echo "  ✓ ${name}-sketch.svg"
    
    # PNG (high res)
    d2 --scale 2 "$file" "${name}.png"
    echo "  ✓ ${name}.png"
    
    echo ""
}

# Check if d2 is available
if ! command -v d2 &> /dev/null; then
    echo "❌ Error: D2 is not installed"
    echo ""
    echo "Install with:"
    echo "  brew install terrastruct/tap/d2"
    echo ""
    exit 1
fi

# Process all .d2 files
for diagram in *.d2; do
    if [ -f "$diagram" ]; then
        render_diagram "$diagram"
    fi
done

echo "=================================================="
echo "✅ All diagrams rendered!"
echo ""
echo "Generated files:"
ls -lh *.svg *.png 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
echo ""
echo "Next steps:"
echo "  1. Add to README: ![Diagram](./diagrams/signal-flow.svg)"
echo "  2. Commit: git add diagrams/*.svg diagrams/*.png"
echo "  3. Push: git push origin main"
