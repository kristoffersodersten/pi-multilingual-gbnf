/**
 * Type definitions for Multilingual GBNF
 */

export type LanguageCode = 'en' | 'sv' | 'de' | 'es' | 'fr' | 'it' | 'pt' | 'nl' | 'pl';

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
