/**
 * Multilingual Grammar Validator
 * Validates text against GBNF-style patterns with full i18n support
 */
import type { GrammarMode, ValidationResult, GrammarConstraint } from './types.js';
export declare class MultilingualGrammarValidator {
    private grammars;
    constructor();
    /**
     * Validate text against a grammar mode
     */
    validate(text: string, mode: GrammarMode, constraint?: Partial<GrammarConstraint>): ValidationResult;
    /**
     * Load all grammar definitions
     */
    private loadGrammars;
    calculateMetrics(original: string, normalized: string): {
        originalTokens: number;
        normalizedTokens: number;
        tokensSaved: number;
    };
}
//# sourceMappingURL=validator.d.ts.map