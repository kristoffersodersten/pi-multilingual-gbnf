# D2 Diagrams - Snabbstart

## 🎯 Vad du har nu

5 professionella D2-diagram är klara:

```
diagrams/
├── signal-flow.d2              # Dataflöde genom systemet
├── comparison.d2               # Före/Efter jämförelse
├── multilingual-support.d2     # 9 språk visualisering
├── cost-savings.d2             # Kostnadsbesparing
└── README.md                   # Dokumentation
```

## 🚀 Rendera Diagrammen (med din installerade D2)

### Rendera alla till SVG (bäst för web)

```bash
cd /Users/kristoffersodersten/pi-multilingual-gbnf/diagrams

# Alla på en gång
for file in *.d2; do
  d2 "$file" "${file%.d2}.svg"
done

# Eller en och en
d2 signal-flow.d2 signal-flow.svg
d2 comparison.d2 comparison.svg
d2 multilingual-support.d2 multilingual-support.svg
d2 cost-savings.d2 cost-savings.svg
```

### Med olika teman

```bash
# Mörkt tema (midnight)
d2 -t 7 signal-flow.d2 signal-flow-dark.svg

# Sketch mode (handritat)
d2 --sketch comparison.d2 comparison-sketch.svg

# Animerad
d2 --animate cost-savings.d2 cost-savings-animated.svg
```

### Live reload (under redigering)

```bash
d2 --watch signal-flow.d2 signal-flow.svg
# Ändra filen - se uppdateringar automatiskt!
```

## 🌐 Alternativ: Online Playground

Kan du inte kör lokalt? Använd D2 Playground:

1. Gå till: **https://play.d2lang.com/**
2. Kopiera innehållet från `signal-flow.d2`
3. Se diagrammet direkt!

### Snabbkopiera för D2 Playground:

```bash
# Klistra in i terminalen för att kopiera till clipboard
cat /Users/kristoffersodersten/pi-multilingual-gbnf/diagrams/signal-flow.d2 | pbcopy
# (nu kan du klistra in på https://play.d2lang.com/)
```

## 📊 Resultat

Efter rendering får du:

```
diagrams/
├── signal-flow.svg         # ← Ny fil!
├── comparison.svg          # ← Ny fil!
├── multilingual-support.svg # ← Ny fil!
├── cost-savings.svg        # ← Ny fil!
└── ... (original .d2 filer)
```

## 📝 Använd i README

```markdown
## Signal Amplification Flow

![Signal Flow](./diagrams/signal-flow.svg)

## Before vs After

<img src="./diagrams/comparison.svg" width="800">

## Multilingual Support

<img src="./diagrams/multilingual-support.svg" width="600">
```

## 🎨 Teman

| Kommando | Resultat |
|----------|----------|
| `d2 -t 0 file.d2 out.svg` | Default |
| `d2 -t 5 file.d2 out.svg` | Sunset (varm) |
| `d2 -t 7 file.d2 out.svg` | Midnight (mörk) |
| `d2 --sketch file.d2 out.svg` | Handritat |

## 💡 Tips

### För bästa resultat i GitHub README

```bash
# SVG är bäst för web
# Använd sketch mode för "human touch"
# Använd theme 7 för modern look

d2 -t 7 --sketch signal-flow.d2 signal-flow-final.svg
```

### Export till andra format

```bash
# PNG (för Word/PowerPoint)
d2 file.d2 file.png

# PDF (för tryck)
d2 file.d2 file.pdf

# Med specifik upplösning
d2 --scale 2 file.d2 file.png  # 2x upplösning
```

## 🔬 Testa din egen D2-installation

```bash
# Check version
d2 --version

# Quick test
echo 'a -> b -> c' | d2 - test.svg
open test.svg
```

## 📚 Lär dig mer

- **D2 Docs**: https://d2lang.com/
- **Playground**: https://play.d2lang.com/
- **Examples**: https://d2lang.com/tour/intro/

---

**Dina diagram är redo att renderas!** Kör kommandona ovan 🚀
