# D2 Diagrams - Signal Amplification Visualizations

## About D2

These diagrams are created with [D2](https://d2lang.com/) - Declarative Diagramming. 
D2 uses simple text files to generate beautiful, professional diagrams.

## Available Diagrams

| Diagram | Description | File |
|---------|-------------|------|
| **Signal Flow** | Data flow through the system | `signal-flow.d2` |
| **Comparison** | Before/After GBNF comparison | `comparison.d2` |
| **Multilingual** | 9 languages support visualization | `multilingual-support.d2` |
| **Cost Savings** | Token economy visualization | `cost-savings.d2` |

## Render All Diagrams

### SVG (Recommended for web)

```bash
# Render all diagrams to SVG
cd /Users/kristoffersodersten/pi-multilingual-gbnf/diagrams

for file in *.d2; do
  d2 "$file" "${file%.d2}.svg"
done

# Creates:
# - signal-flow.svg
# - comparison.svg
# - multilingual-support.svg
# - cost-savings.svg
```

### PNG (For documents)

```bash
# Render to PNG
for file in *.d2; do
  d2 "$file" "${file%.d2}.png"
done
```

### PDF (For printing)

```bash
# Render to PDF
for file in *.d2; do
  d2 "$file" "${file%.d2}.pdf"
done
```

## D2 Installation

If not installed:

```bash
# macOS
brew install terrastruct/tap/d2

# Linux
curl -fsSL https://d2.dev/install.sh | sh -s -- --tala

# Verify installation
d2 --version
```

## Usage in Documentation

### Embed in README.md

```markdown
![Signal Flow](./diagrams/signal-flow.svg)

## Comparison

![](./diagrams/comparison.svg)

## Multilingual Support

<img src="./diagrams/multilingual-support.svg" width="600">
```

### Theme Options

D2 supports beautiful themes:

```bash
# With dark theme
d2 -t 7 signal-flow.d2 signal-flow-dark.svg

# With sketch mode (hand-drawn look)
d2 --sketch signal-flow.d2 signal-flow-sketch.svg

# With animated connections
d2 --animate signal-flow.d2 signal-flow-animated.svg
```

Available themes (0-7):
- 0: Default
- 1: Neutral
- 2: Berry Blue
- 3: Mint Cream
- 4: Mixed
- 5: Sunset
- 6: Ocean
- 7: Midnight

## Edit Diagrams

```bash
# Live reload while editing
d2 --watch signal-flow.d2 signal-flow.svg

# Then edit signal-flow.d2 and see changes instantly
```

## Preview Before Commit

```bash
# Quick preview
d2 signal-flow.d2 /tmp/preview.svg && open /tmp/preview.svg
```
