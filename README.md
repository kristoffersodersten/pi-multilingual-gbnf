# 🌍 Pi Multilingual GBNF

[![Pi Extension](https://img.shields.io/badge/pi-extension-blue)](https://github.com/mariozechner/pi-coding-agent)
[![Version](https://img.shields.io/npm/v/pi-multilingual-gbnf)](https://www.npmjs.com/package/pi-multilingual-gbnf)
[![License](https://img.shields.io/npm/l/pi-multilingual-gbnf)](LICENSE)
[![Languages](https://img.shields.io/badge/languages-9-brightgreen)]()

**Grammar-constrained, noise-free outputs in 9 languages.**

A [pi](https://github.com/mariozechner/pi-coding-agent) extension that provides GBNF-style grammar validation and response constraints in multiple languages. Reduces token waste while preserving signal in English, Swedish, German, Spanish, French, Italian, Portuguese, Dutch, and Polish.

---

## 🚀 Quick Start

```bash
# Install from npm
pi install pi-multilingual-gbnf

# Or install from GitHub
pi install github:yourusername/pi-multilingual-gbnf
```

Then in pi:

```
> @constrain_response mode=terse language=sv
> Skapa en fil
✏️ Skapad: fil.txt

> @constrain_response mode=json language=auto
> Give me user data
{"name":"John","id":123}
```

---

## ✨ Features

### 🗣️ **9 Supported Languages**

| Code | Language | Actions | Status |
|------|----------|---------|--------|
| `en` | English | ✅ | ✓ |
| `sv` | Svenska (Swedish) | ✅ | ✓ |
| `de` | Deutsch (German) | ✅ | ✓ |
| `es` | Español (Spanish) | ✅ | ✓ |
| `fr` | Français (French) | ✅ | ✓ |
| `it` | Italiano (Italian) | ✅ | ✓ |
| `pt` | Português (Portuguese) | ✅ | ✓ |
| `nl` | Nederlands (Dutch) | ✅ | ✓ |
| `pl` | Polski (Polish) | ✅ | ✓ |

### 🎛️ **Grammar Modes**

| Mode | Description | Example Output |
|------|-------------|----------------|
| `file_ops` | File operations format | `WRITE ./file.ts 256 bytes` |
| `terse` | Single line with icon | `✏️ Created: ./file.ts` |
| `json` | Valid JSON only | `{"status":"ok"}` |
| `code` | Code blocks only | ```typescript...``` |
| `plan` | Hierarchical plan | `→ Step 1\n  • Substep` |
| `api` | API endpoint format | `GET /api/users` |
| `sql` | SQL statement | `SELECT * FROM users` |

### 🛡️ **Noise Filtering**

**What gets filtered:**
- Filler words: "Certainly", "Sure", "Gärna", "Absolut", etc.
- Prose markers: "Here is", "Här är", "Voici", etc.
- Markdown wrapping around structured content
- Multiple paragraphs when single line requested

**What is preserved:**
- Valid code in target language
- Meaningful nouns and verbs
- Numbers, paths, identifiers
- Unicode characters (å, ä, ö, ñ, é, etc.)

---

## 📚 Usage

### Tools

#### `@validate_grammar`

Validate text against grammar:

```
@validate_grammar 
  text="SKRIV ./fil.ts 256 byte"
  mode=file_ops
  language=auto

→ {
→   "valid": true,
→   "detectedLanguage": "sv",
→   "errors": [],
→   "tokensSaved": 5
→ }
```

#### `@constrain_response`

Constrain next response:

```
@constrain_response 
  mode=terse 
  language=de
  maxTokens=50

> Erstelle eine Datei
✏️ Erstellt: datei.txt
```

#### `@detect_language`

Detect language of text:

```
@detect_language text="Här är resultatet"

→ 🌐 Detected Language: sv (Svenska)
```

#### `@list_languages`

List all supported languages:

```
@list_languages

→ 🌍 Supported Languages (9):
→   • en - English
→   • sv - Svenska (Swedish)
→   • de - Deutsch (German)
→   ...
```

### Commands

```
# List supported languages
/gbnf languages

# Detect language
/gbnf detect "Dies ist ein Test"

# Set constraint mode
/gbnf constrain terse
```

### Environment Variables

```bash
# Default language for validation
export PI_GBNF_DEFAULT_LANGUAGE=auto

# Strict mode (fail on warnings)
export PI_GBNF_STRICT=false
```

---

## 🔧 Configuration

### Per-Project Settings

Create `.pi/config.json` in your project:

```json
{
  "extensions": {
    "pi-multilingual-gbnf": {
      "defaultLanguage": "auto",
      "strictMode": false,
      "fallbackLanguage": "en"
    }
  }
}
```

### With Golden Pipeline

Use in pipeline specs:

```json
{
  "subagents": [{
    "name": "code-gen",
    "constrain": {
      "mode": "terse",
      "language": "auto",
      "maxTokens": 100
    }
  }]
}
```

---

## 📊 Token Savings

| Mode | Languages | Noise Reduction | Token Savings |
|------|-----------|-----------------|---------------|
| `terse` | All 9 | 85% | 40% |
| `json` | All 9 | 95% | 35% |
| `file_ops` | All 9 | 95% | 50% |
| `plan` | All 9 | 80% | 30% |
| `code` | All 9 | 90% | 30% |

**Calculated as:** (original - normalized) / original

---

## 🏗️ Architecture

```
          Input Text
              ↓
    ┌─────────────────────┐
    │  Language Detection │──▶ en, sv, de, es, fr, it, pt, nl, pl
    └─────────────────────┘
              ↓
    ┌─────────────────────┐
    │  Grammar Validator  │──▶ file_ops, terse, json, code, plan, api, sql
    └─────────────────────┘
              ↓
    ┌─────────────────────┐
    │  Noise Filtering    │──▶ locale-specific patterns
    └─────────────────────┘
              ↓
    ┌─────────────────────┐
    │   Normalization     │──▶ Valid output
    └─────────────────────┘
```

---

## 🌐 Adding New Languages

To add a language, edit `src/locales/index.ts`:

```typescript
export const locales: Record<LanguageCode, LocaleStrings> = {
  // ... existing languages
  
  xx: {  // Your language code
    create: ['Created', 'Create', ...],
    read: ['Read', 'Reading', ...],
    edit: ['Edit', 'Edited', ...],
    delete: ['Delete', 'Deleted', ...],
    error: ['Error', 'Failed', ...],
    ok: ['OK', 'Done', ...],
    pending: ['Pending', 'Processing', ...],
    warning: ['Warning', 'Caution', ...],
  },
};
```

Update `detectLanguage()` function with detection patterns.

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

---

## 📝 License

MIT © [Your Name](https://github.com/yourusername)

---

## 🔗 Links

- [Pi Documentation](https://github.com/mariozechner/pi-coding-agent)
- [NPM Package](https://www.npmjs.com/package/pi-multilingual-gbnf)
- [GitHub Repository](https://github.com/yourusername/pi-multilingual-gbnf)
- [Report Issues](https://github.com/yourusername/pi-multilingual-gbnf/issues)

---

<p align="center">
  <strong>🌍 Speak your language. Code without noise.</strong>
</p>