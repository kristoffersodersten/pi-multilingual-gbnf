/**
 * Multilingual Grammar Validator
 * Validates text against GBNF-style patterns with full i18n support
 */

import type { 
  LanguageCode, 
  GrammarMode, 
  ValidationResult, 
  GrammarConstraint 
} from './types.js';
import { detectLanguage, getLocale } from './locales/index.js';

export class MultilingualGrammarValidator {
  private grammars: Map<GrammarMode, GrammarDefinition>;

  constructor() {
    this.grammars = this.loadGrammars();
  }

  /**
   * Validate text against a grammar mode
   */
  validate(
    text: string,
    mode: GrammarMode,
    constraint: Partial<GrammarConstraint> = {}
  ): ValidationResult {
    // Validate input
    if (text === null || text === undefined) {
      return {
        valid: false,
        errors: ['Input text is null or undefined'],
        warnings: [],
        normalized: '',
        matches: [],
        metrics: { originalTokens: 0, normalizedTokens: 0, tokensSaved: 0 },
        detectedLanguage: 'en'
      };
    }

    if (typeof text !== 'string') {
      return {
        valid: false,
        errors: ['Input text must be a string'],
        warnings: [],
        normalized: '',
        matches: [],
        metrics: { originalTokens: 0, normalizedTokens: 0, tokensSaved: 0 },
        detectedLanguage: 'en'
      };
    }

    if (!mode) {
      return {
        valid: false,
        errors: ['Grammar mode is required'],
        warnings: [],
        normalized: text,
        matches: [],
        metrics: this.calculateMetrics(text, text),
        detectedLanguage: 'en'
      };
    }

    const lang = constraint.language === 'auto'
      ? detectLanguage(text)
      : (constraint.language ?? detectLanguage(text));

    const grammar = this.grammars.get(mode);
    if (!grammar) {
      return {
        valid: false,
        errors: [`Unknown grammar mode: ${mode}`],
        warnings: [],
        normalized: text,
        matches: [],
        metrics: this.calculateMetrics(text, text),
        detectedLanguage: lang
      };
    }

    try {
      return grammar.validate(text, lang, constraint);
    } catch (error) {
      return {
        valid: false,
        errors: [`Validation error: ${(error as Error).message}`],
        warnings: [],
        normalized: text,
        matches: [],
        metrics: this.calculateMetrics(text, text),
        detectedLanguage: lang
      };
    }
  }

  /**
   * Load all grammar definitions
   */
  private loadGrammars(): Map<GrammarMode, GrammarDefinition> {
    const grammars = new Map<GrammarMode, GrammarDefinition>();

    grammars.set('file_ops', new FileOpsGrammar());
    grammars.set('terse', new TerseGrammar());
    grammars.set('json', new JsonGrammar());
    grammars.set('code', new CodeGrammar());
    grammars.set('plan', new PlanGrammar());
    grammars.set('api', new ApiGrammar());
    grammars.set('sql', new SqlGrammar());

    return grammars;
  }

  private calculateMetrics(original: string, normalized: string) {
    const estimate = (s: string) => Math.ceil(s.length / 4);
    return {
      originalTokens: estimate(original),
      normalizedTokens: estimate(normalized),
      tokensSaved: estimate(original) - estimate(normalized)
    };
  }
}

/**
 * Base grammar definition
 */
interface GrammarDefinition {
  validate(
    text: string, 
    lang: LanguageCode, 
    constraint: Partial<GrammarConstraint>
  ): ValidationResult;
}

/**
 * File Operations Grammar
 */
class FileOpsGrammar implements GrammarDefinition {
  validate(
    text: string, 
    lang: LanguageCode,
    constraint: Partial<GrammarConstraint>
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const locale = getLocale(lang);
    
    // Build pattern from locale
    const actions = [
      ...locale.create, 
      ...locale.read, 
      ...locale.edit,
      ...locale.delete
    ].join('|');
    
    // Multilingual file operation pattern
    // Supports: ACTION path [size]
    const pattern = new RegExp(
      `^(WRITE|READ|EDIT|DELETE|${actions})\\s+([\\w\\\\.\\/\\\\-\\u00e4\\u00e5\\u00f6\\u00c4\\u00c5\\u00d6]+)(?:\\s+(\\d+\\s*(?:bytes?|KB|MB|GB|byte|kilobyte|megabyte|kilobyte)?))?$`,
      'gmi'
    );
    
    const matches = [...text.matchAll(pattern)];
    
    if (matches.length === 0) {
      errors.push('Does not match file_ops grammar pattern');
    }
    
    // Validate each match
    const normalized = matches.map(m => m[0]).join('\n');
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized: normalized || text,
      matches: matches.map(m => ({ full: m[0], groups: m.slice(1) })),
      metrics: { 
        originalTokens: Math.ceil(text.length / 4),
        normalizedTokens: Math.ceil(normalized.length / 4),
        tokensSaved: Math.ceil((text.length - normalized.length) / 4)
      },
      detectedLanguage: lang
    };
  }
}

/**
 * Terse Response Grammar
 */
class TerseGrammar implements GrammarDefinition {
  validate(
    text: string,
    lang: LanguageCode,
    constraint: Partial<GrammarConstraint>
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for empty or whitespace-only text
    if (!text || !text.trim()) {
      errors.push('Empty or whitespace-only text');
      return {
        valid: false,
        errors,
        warnings,
        normalized: '',
        matches: [],
        metrics: {
          originalTokens: 0,
          normalizedTokens: 0,
          tokensSaved: 0
        },
        detectedLanguage: lang
      };
    }

    // Icons valid across all locales
    const icons = '[✓✏️🔧❌📖→•◦⚠️⏳]';

    // Check for single line constraint
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length > 1) {
      errors.push(`Too many lines: ${lines.length} > 1`);
    }
    
    // Check for icon prefix
    if (!new RegExp(`^${icons}`).test(text.trim())) {
      warnings.push('Missing icon prefix');
    }
    
    // Check for noise words in detected language
    const noiseWords: Record<string, string[]> = {
      en: ['certainly', 'sure', 'i\'d be happy', 'of course', 'let me', 'i can', 'i will', 'hope this helps'],
      sv: ['gärna', 'absolut', 'jag kan', 'jag vill', 'låt mig', 'hoppas det hjälper'],
      de: ['natürlich', 'sicher', 'ich würde', 'ich kann', 'lass mich', 'hoffe das hilft'],
      es: ['seguro', 'por supuesto', 'me encantaría', 'puedo', 'espero que ayude'],
      fr: ['certainement', 'bien sûr', 'je serais', 'je peux', 'j\'espère que ça aide'],
      it: ['certamente', 'sicuro', 'mi piacerebbe', 'posso', 'spero sia utile'],
        pt: ['certamente', 'com certeza', 'eu ficaria', 'posso', 'espero que ajude'],
      nl: ['zeker', 'natuurlijk', 'ik zou', 'ik kan', 'laat me', 'hopelijk helpt dit'],
      pl: ['oczywiście', 'pewnie', 'chętnie', 'mogę', 'mam nadzieję że to pomoże'],
    };
    
    const lower = text.toLowerCase();
    for (const word of noiseWords[lang] ?? noiseWords.en) {
      if (lower.includes(word)) {
        errors.push(`Noise word detected: "${word}"`);
      }
    }
    
    // Check max length
    if (text.length > 120) {
      warnings.push(`Text exceeds recommended length: ${text.length} > 120`);
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized: text.trim(),
      matches: [],
      metrics: {
        originalTokens: Math.ceil(text.length / 4),
        normalizedTokens: Math.ceil(text.length / 4),
        tokensSaved: 0
      },
      detectedLanguage: lang
    };
  }
}

/**
 * JSON Grammar
 */
class JsonGrammar implements GrammarDefinition {
  validate(
    text: string,
    lang: LanguageCode,
    constraint: Partial<GrammarConstraint>
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for empty or whitespace-only text
    if (!text || !text.trim()) {
      errors.push('Empty or whitespace-only text');
      return {
        valid: false,
        errors,
        warnings,
        normalized: '',
        matches: [],
        metrics: {
          originalTokens: 0,
          normalizedTokens: 0,
          tokensSaved: 0
        },
        detectedLanguage: lang
      };
    }

    // Prose markers by language
    const proseMarkers: Record<string, string[]> = {
      en: ['here is', 'the following', 'below is', 'here are', 'i have', 'this is'],
      sv: ['här är', 'följande', 'nedan är', 'här finns', 'jag har', 'detta är'],
      de: ['hier ist', 'folgendes', 'unten ist', 'hier sind', 'ich habe', 'das ist'],
      es: ['aquí está', 'lo siguiente', 'abajo está', 'aquí hay', 'tengo', 'esto es'],
      fr: ['voici', 'ce qui suit', 'ci-dessous', 'j\'ai', 'voilà', 'ceci est'],
      it: ['ecco', 'il seguente', 'qui sotto', 'qui ci sono', 'ho', 'questo è'],
      pt: ['aqui está', 'o seguinte', 'abaixo está', 'aqui estão', 'eu tengo', 'isto é'],
      nl: ['hier is', 'het volgende', 'hieronder is', 'hier zijn', 'ik heb', 'dit is'],
      pl: ['oto', 'poniżej', 'tutaj jest', 'tutaj są', 'mam', 'to jest'],
    };
    
    let normalized = text;
    
    // Check for code fences
    if (/```json\n[\s\S]*?```/.test(text)) {
      const match = text.match(/```json\n([\s\S]*?)```/);
      if (match) normalized = match[1].trim();
    }
    
    // Check for prose markers
    const lower = text.toLowerCase();
    for (const marker of proseMarkers[lang] ?? proseMarkers.en) {
      if (lower.includes(marker)) {
        errors.push(`Prose marker detected: "${marker}"`);
      }
    }
    
    // Validate JSON
    try {
      JSON.parse(normalized);
    } catch (e) {
      errors.push(`Invalid JSON: ${(e as Error).message}`);
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized,
      matches: [],
      metrics: {
        originalTokens: Math.ceil(text.length / 4),
        normalizedTokens: Math.ceil(normalized.length / 4),
        tokensSaved: Math.ceil((text.length - normalized.length) / 4)
      },
      detectedLanguage: lang
    };
  }
}

/**
 * Code Grammar
 */
class CodeGrammar implements GrammarDefinition {
  validate(
    text: string, 
    lang: LanguageCode,
    constraint: Partial<GrammarConstraint>
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Extract code blocks
    const blocks: string[] = [];
    const pattern = /```[\w]*\n([\s\S]*?)```/g;
    let match;
    
    while ((match = pattern.exec(text)) !== null) {
      blocks.push(match[1]);
    }
    
    if (blocks.length === 0 && text.trim()) {
      // No fenced blocks but has content
      if (constraint.allowProse) {
        warnings.push('No code fences found, treating as raw code');
      } else {
        errors.push('No code fences found');
      }
    }
    
    const normalized = blocks.join('\n\n') || text;
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized,
      matches: blocks.map(b => ({ full: b, groups: [] })),
      metrics: {
        originalTokens: Math.ceil(text.length / 4),
        normalizedTokens: Math.ceil(normalized.length / 4),
        tokensSaved: Math.ceil((text.length - normalized.length) / 4)
      },
      detectedLanguage: lang
    };
  }
}

/**
 * Plan Grammar
 */
class PlanGrammar implements GrammarDefinition {
  validate(
    text: string, 
    lang: LanguageCode,
    constraint: Partial<GrammarConstraint>
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Hierarchical bullet pattern
    const pattern = /^(→|•|◦|\-|\*)\s+.+$/gm;
    const matches = [...text.matchAll(pattern)];
    
    if (matches.length === 0) {
      errors.push('No plan items found (use →, •, or ◦)');
    }
    
    // Check indentation consistency
    const lines = text.split('\n');
    let prevIndent = 0;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      const indent = line.length - line.trimStart().length;
      if (indent % 2 !== 0) {
        warnings.push(`Irregular indentation: "${line.slice(0, 30)}..."`);
      }
      
      prevIndent = indent;
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized: matches.map(m => m[0]).join('\n'),
      matches: matches.map(m => ({ full: m[0], groups: [m[1]] })),
      metrics: {
        originalTokens: Math.ceil(text.length / 4),
        normalizedTokens: Math.ceil((matches.map(m => m[0]).join('\n').length) / 4),
        tokensSaved: Math.ceil((text.length - matches.map(m => m[0]).join('\n').length) / 4)
      },
      detectedLanguage: lang
    };
  }
}

/**
 * API Grammar
 */
class ApiGrammar implements GrammarDefinition {
  validate(
    text: string, 
    lang: LanguageCode,
    constraint: Partial<GrammarConstraint>
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Method + path pattern
    const pattern = /^(GET|POST|PUT|DELETE|PATCH)\s+([\w\/{}\-]+)$/gm;
    const matches = [...text.matchAll(pattern)];
    
    if (matches.length === 0) {
      errors.push('No API endpoints found');
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized: text,
      matches: matches.map(m => ({ full: m[0], groups: [m[1], m[2]] })),
      metrics: {
        originalTokens: Math.ceil(text.length / 4),
        normalizedTokens: Math.ceil(text.length / 4),
        tokensSaved: 0
      },
      detectedLanguage: lang
    };
  }
}

/**
 * SQL Grammar
 */
class SqlGrammar implements GrammarDefinition {
  validate(
    text: string, 
    lang: LanguageCode,
    constraint: Partial<GrammarConstraint>
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Basic SQL statement detection
    const keywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER'];
    const pattern = new RegExp(`^(${keywords.join('|')})\\b`, 'i');
    
    if (!pattern.test(text.trim())) {
      errors.push('Not a valid SQL statement');
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized: text,
      matches: [],
      metrics: {
        originalTokens: Math.ceil(text.length / 4),
        normalizedTokens: Math.ceil(text.length / 4),
        tokensSaved: 0
      },
      detectedLanguage: lang
    };
  }
}