/**
 * Multilingual locale definitions
 * Maps actions to their translations across languages
 */
import type { LocaleStrings, LanguageCode } from '../types.js';
export declare const locales: Record<LanguageCode, LocaleStrings>;
/**
 * Get locale strings for a specific language
 */
export declare function getLocale(lang: LanguageCode): LocaleStrings;
/**
 * Detect language from text content
 */
export declare function detectLanguage(text: string): LanguageCode;
/**
 * Get supported language codes
 */
export declare function getSupportedLanguages(): LanguageCode[];
/**
 * Get human-readable language name
 */
export declare function getLanguageName(code: LanguageCode): string;
//# sourceMappingURL=index.d.ts.map