# Publishing Guide

## Step 1: GitHub Repository

```bash
# Create repo on GitHub
git init
git add .
git commit -m "Initial commit: Multilingual GBNF extension"
git remote add origin https://github.com/YOUR_USERNAME/pi-multilingual-gbnf.git
git push -u origin main
```

## Step 2: Update package.json

Edit `package.json`:

```json
{
  "name": "pi-multilingual-gbnf",
  "version": "1.0.0",
  "description": "Multilingual GBNF grammar constraints for pi",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/pi-multilingual-gbnf.git"
  },
  "homepage": "https://github.com/YOUR_USERNAME/pi-multilingual-gbnf#readme",
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/pi-multilingual-gbnf/issues"
  }
}
```

## Step 3: Build

```bash
npm install
npm run build
```

## Step 4: Test Locally

```bash
pi install ./pi-multilingual-gbnf
pi
> @list_languages
```

## Step 5: Publish to NPM

```bash
npm login
npm publish --access public
```

## Step 6: Verify Installation

```bash
pi install pi-multilingual-gbnf
```

## Step 7: Share

Update README with badges:

```markdown
[![Version](https://img.shields.io/npm/v/pi-multilingual-gbnf)](https://www.npmjs.com/package/pi-multilingual-gbnf)
[![License](https://img.shields.io/npm/l/pi-multilingual-gbnf)](LICENSE)
```

Submit to pi extensions registry (when available).

