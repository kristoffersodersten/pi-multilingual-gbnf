/**
 * Type definitions for Multilingual GBNF
 *
 * Core languages (9): Full support with locale strings
 * Extended languages: Detection only (can be added with locale strings as needed)
 */

// Core supported languages with full locale support
export type LanguageCode =
  | 'en'  // English
  | 'sv'  // Swedish
  | 'de'  // German
  | 'es'  // Spanish
  | 'fr'  // French
  | 'it'  // Italian
  | 'pt'  // Portuguese
  | 'nl'  // Dutch
  | 'pl'  // Polish
  // Extended languages (detection + basic support - add locale strings as needed)
  | 'da'  // Danish
  | 'no'  // Norwegian
  | 'fi'  // Finnish
  | 'cs'  // Czech
  | 'sk'  // Slovak
  | 'hu'  // Hungarian
  | 'ro'  // Romanian
  | 'bg'  // Bulgarian
  | 'hr'  // Croatian
  | 'sr'  // Serbian
  | 'sl'  // Slovenian
  | 'el'  // Greek
  | 'tr'  // Turkish
  | 'ru'  // Russian
  | 'uk'  // Ukrainian
  | 'et'  // Estonian
  | 'lv'  // Latvian
  | 'lt'; // Lithuanian

export type GrammarMode = 
  | 'file_ops' 
  | 'terse' 
  | 'json' 
  | 'code' 
  | 'plan' 
  | 'api' 
  | 'sql';

export interface GrammarConstraint {
  mode: GrammarMode;
  language: LanguageCode | 'auto';
  maxTokens?: number;
  allowProse?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  normalized: string;
  matches: Array<{
    full: string;
    groups: string[];
  }>;
  metrics: {
    originalTokens: number;
    normalizedTokens: number;
    tokensSaved: number;
  };
  detectedLanguage?: LanguageCode;
}

export interface ActionDefinition {
  en: string[];
  sv: string[];
  de: string[];
  es: string[];
  fr: string[];
  it: string[];
  pt: string[];
  nl: string[];
  pl: string[];
  da: string[];
  no: string[];
  fi: string[];
  cs: string[];
  sk: string[];
  hu: string[];
  ro: string[];
  bg: string[];
  hr: string[];
  sr: string[];
  sl: string[];
  el: string[];
  tr: string[];
  ru: string[];
  uk: string[];
  et: string[];
  lv: string[];
  lt: string[];
}

export interface LocaleStrings {
  create: string[];
  read: string[];
  edit: string[];
  delete: string[];
  error: string[];
  ok: string[];
  pending: string[];
  warning: string[];
}

export interface MultilingualConfig {
  defaultLanguage: LanguageCode;
  supportedLanguages: LanguageCode[];
  autoDetect: boolean;
  strictMode: boolean;
}
