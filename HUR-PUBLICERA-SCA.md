# 🚀 Hur Publicera till https://shittycodingagent.ai/packages

## ✅ Steg-för-Steg

### 1. Förbered paketet 🔧

```bash
cd /Users/kristoffersodersten/pi-multilingual-gbnf
./build-for-sca.sh
```
Detta skapar filen: `pi-multilingual-gbnf-v1.0.0.zip`

### 2. Gå till SCA Packages 🌐

Öppna: **https://shittycodingagent.ai/packages**

### 3. Logga in / Skapa konto 👤

- Klicka "Sign In" eller "Register"
- Använd GitHub-konto eller email

### 4. Publicera nytt paket ➕

Klicka på **"Publish Package"** eller **"+ New Package"** knappen

### 5. Fyll i formuläret 📝

| Fält | Vad du ska skriva |
|------|-------------------|
| **Package Name** | `pi-multilingual-gbnf` |
| **Display Name** | `Multilingual GBNF` |
| **Version** | `1.0.0` |
| **Description** | `Grammar constraints for 9 languages (EN, SV, DE, ES, FR, IT, PT, NL, PL). Noise-free, deterministic outputs.` |
| **Icon** | 🌍 |
| **Tags** | `language`, `i18n`, `constraints`, `gbnf`, `multilingual` |
| **Author** | Ditt namn |
| **License** | MIT |

### 6. Ladda upp filer 📤

- Klicka "Upload" eller dra filen
- Välj: `pi-multilingual-gbnf-v1.0.0.zip`
- **Entry Point**: `dist/index.js`

### 7. Klicka Publicera 🎯

- Klicka "Publish" eller "Submit"
- Vänta på godkännande (om det finns moderation)

### 8. Testa installationen ✅

```bash
# Installera från SCA (när det är live)
pi install sca:pi-multilingual-gbnf

# eller om de använder npm:
pi install @sca/pi-multilingual-gbnf

# Testa
pi
> @list_languages
```

## 📋 Kontrollera innan du publicerar

Filer som MÅSTE finnas i ZIP:
- ✅ `dist/index.js` (byggd TypeScript)
- ✅ `dist/validator.js` (validator class)
- ✅ `dist/constrain.js` (constraint class)
- ✅ `dist/locales/index.js` (språkdata)
- ✅ `sca-package.json` (metadata)
- ✅ `README.md` (dokumentation)
- ✅ `LICENSE` (MIT licens)

## 🔍 Verifiera ZIP-innehåll

```bash
# Kolla vad som finns i ZIPen
unzip -l pi-multilingual-gbnf-v1.0.0.zip

# Resultat ska visa:
#   dist/index.js
#   dist/validator.js
#   dist/constrain.js
#   dist/locales/index.js
#   README.md
#   LICENSE
#   sca-package.json
```

## 📐 Paket-storlek

- **Förväntad storlek**: ~30-50 KB
- **För stort?**: Exkluderade `node_modules` automatiskt
- **För litet?**: Dubbelkolla att `dist/` finns med

## 🔥 Vanliga fel

| Fel | Lösning |
|-----|---------|
| "Entry point not found" | Kör `./build-for-sca.sh` igen |
| "Invalid JSON" | Kontrollera `sca-package.json` med JSON validator |
| "Name taken" | Lägg till prefix: `@ditt-namn/pi-multilingual-gbnf` |
| "Too large" | Exkludera onödiga filer från ZIP |

## 💡 Tips för framgång

1. **README**: Gör den klar och koncis
2. **Tags**: Använd relevanta sökord
3. **Icon**: 🌍 fungerar bra (multilingual)
4. **Beskrivning**: Nämn alla 9 språk tydligt
5. **Exempel**: Visa hur man använder `@constrain_response`

## 📞 Support på SCA

Om något går fel:
- **Discord**: ShittyCodingAgent community
- **GitHub**: https://github.com/shittycodingagent
- **Email**: support@shittycodingagent.ai

## ✨ Efter Publicering

Dela med världen! 🎉

```
Just published pi-multilingual-gbnf on @ShittyCodingAgent!

🌍 Grammar constraints for 9 languages
✅ English, Swedish, German, Spanish, French, Italian, Portuguese, Dutch, Polish
🔧 Tools: @validate_grammar, @constrain_response, @detect_language

Install: pi install pi-multilingual-gbnf
```

Lycka till! 🚀🌍
