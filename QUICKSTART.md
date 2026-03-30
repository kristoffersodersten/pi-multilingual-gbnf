# Quick Start Guide

This is a **work-in-progress** multilingual GBNF extension for Pi.

## Installation

```bash
pi install github:yourusername/pi-multilingual-gbnf
```

Or manually:

```bash
# Clone
git clone https://github.com/yourusername/pi-multilingual-gbnf.git

# Install
pi install ./pi-multilingual-gbnf
```

## Usage

```
# Detect language
@detect_language text="Här är resultatet"

# Validate grammar
@validate_grammar 
  text="SKRIV ./fil.ts" 
  mode=file_ops

# Constrain response
@constrain_response mode=terse language=sv
```

## Supported Languages

- 🇬🇧 English (en)
- 🇸🇪 Svenska/Swedish (sv)
- 🇩🇪 Deutsch/German (de)
- 🇪🇸 Español/Spanish (es)
- 🇫🇷 Français/French (fr)
- 🇮🇹 Italiano/Italian (it)
- 🇵🇹 Português/Portuguese (pt)
- 🇳🇱 Nederlands/Dutch (nl)
- 🇵🇱 Polski/Polish (pl)

## Publishing to NPM

1. Update package.json with your name and repo
2. Run `npm run build` (after fixing TS errors)
3. `npm publish --access public`

## Files Ready

✅ package.json - NPM config
✅ README.md - Full documentation
✅ LICENSE - MIT
✅ src/ - Source code (9 languages)
✅ locales/ - Translation data
✅ types.ts - Type definitions

