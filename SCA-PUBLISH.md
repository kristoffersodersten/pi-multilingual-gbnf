# Publicering till ShittyCodingAgent.ai/packages

## Förberedelser

### 1. Skapa paket-strukturen

```bash
cd /Users/kristoffersodersten/pi-multilingual-gbnf

# Skapa en package.json för SCA-formatet
cat > sca-package.json << 'SCAJSON'
{
  "name": "pi-multilingual-gbnf",
  "displayName": "Multilingual GBNF",
  "version": "1.0.0",
  "description": "Grammar constraints för 9 språk - för noise-free responses",
  "author": "Ditt Namn",
  "email": "din.email@example.com",
  "license": "MIT",
  "icon": "🌍",
  "tags": ["language", "i18n", "constraints", "gbnf", "multilingual"],
  
  "languages": {
    "en": "English",
    "sv": "Svenska",
    "de": "Deutsch",
    "es": "Español",
    "fr": "Français",
    "it": "Italiano",
    "pt": "Português",
    "nl": "Nederlands",
    "pl": "Polski"
  },
  
  "entry": "dist/index.js",
  "compatiblePiVersion": ">=0.60.0",
  
  "tools": [
    {
      "name": "validate_grammar",
      "description": "Validate text against multilingual GBNF grammar",
      "parameters": ["text", "mode", "language"]
    },
    {
      "name": "constrain_response",
      "description": "Apply constraints to next response",
      "parameters": ["mode", "language", "maxTokens"]
    },
    {
      "name": "detect_language",
      "description": "Detect language from text",
      "parameters": ["text"]
    },
    {
      "name": "list_languages",
      "description": "List all supported languages",
      "parameters": []
    }
  ],
  
  "readme": "README.md",
  "documentation": "https://github.com/ditt-username/pi-multilingual-gbnf",
  
  "files": [
    "dist/",
    "README.md",
    "LICENSE"
  ],
  
  "size": "~50KB",
  "dependencies": []
}
SCAJSON
```

### 2. Bygg paketet

```bash
# Installera dependencies
npm install

# Bygg TypeScript
npm run build

# Verifiera att dist/ skapades
ls -la dist/
```

### 3. Skapa ett ZIP-arkiv

```bash
# Skapa ett paket för uppladdning
zip -r pi-multilingual-gbnf-v1.0.0.zip \
  dist/ \
  README.md \
  LICENSE \
  sca-package.json \
  -x "*.DS_Store" \
  -x "node_modules/*"

# Kontrollera storleken
ls -lh pi-multilingual-gbnf-v1.0.0.zip
```

## Publicerings-process

### Metod 1: Via Web UI (Rekommenderad)

1. **Gå till**: https://shittycodingagent.ai/packages
2. **Logga in** med ditt konto (eller skapa konto)
3. **Klicka**: "Publish Package" / "+ New Package"
4. **Fyll i formuläret**:
   - **Package Name**: `pi-multilingual-gbnf`
   - **Display Name**: `Multilingual GBNF`
   - **Version**: `1.0.0`
   - **Description**: `Grammar constraints for 9 languages. Noise-free, deterministic responses in English, Swedish, German, Spanish, French, Italian, Portuguese, Dutch, and Polish.`
   - **Icon**: 🌍
   - **Tags**: `language`, `i18n`, `constraints`, `gbnf`, `multilingual`
   
5. **Ladda upp filer**:
   - Välj `pi-multilingual-gbnf-v1.0.0.zip`
   - eller dra och släpp filerna
   
6. **Verifikation**:
   - Systemet kontrollerar att `dist/index.js` finns
   - Validerar sca-package.json
   - Kontrollerar README.md
   
7. **Publicera**:
   - Klicka "Publish"
   - Vänta på godkännande (om moderation krävs)

### Metod 2: Via API/CLI (om tillgängligt)

Om SCA har ett CLI/API:

```bash
# Installera SCA CLI (om det finns)
npm install -g @sca/cli

# Logga in
sca login

# Publicera
sca publish \
  --name pi-multilingual-gbnf \
  --version 1.0.0 \
  --file pi-multilingual-gbnf-v1.0.0.zip
```

## Efter Publicering

### Verifiera installation

```bash
# Installera från SCA registry
pi install sca:pi-multilingual-gbnf

# eller om de använder npm-scoped packages:
pi install @shittycodingagent/pi-multilingual-gbnf

# Testa
pi
> @list_languages
```

### Uppdatera paketet

```bash
# Ändra version i package.json
# T.ex. 1.0.1 för bugfix, 1.1.0 för feature, 2.0.0 för breaking change

# Bygg om
npm run build

# Skapa ny ZIP
zip -r pi-multilingual-gbnf-v1.0.1.zip dist/ README.md LICENSE sca-package.json

# Ladda upp som ny version på SCA
```

## Felsökning

### Vanliga problem

**Problem**: "Package entry point not found"
- **Lösning**: Se till att `dist/index.js` finns i ZIP-filen

**Problem**: "Invalid package.json"
- **Lösning**: Kontrollera att `sca-package.json` har alla obligatoriska fält

**Problem**: "Name already taken"
- **Lösning**: Välj ett unikt namn, t.ex. `@ditt-namn/pi-multilingual-gbnf`

**Problem**: "File too large"
- **Lösning**: Exkludera node_modules, källfiler, och dokumentation som inte behövs vid runtime

## Kontakt

Om du har problem med publiceringen:
- **Discord**: ShittyCodingAgent community
- **Email**: support@shittycodingagent.ai
- **GitHub Issues**: https://github.com/shittycodingagent/packages/issues

Lycka till! 🚀