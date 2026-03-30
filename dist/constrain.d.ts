/**
 * Response Constrain - Apply multilingual constraints to outputs
 */
import type { GrammarConstraint } from './types.js';
export declare class MultilingualResponseConstrain {
    /**
     * Apply constraint to response
     */
    apply(response: string, constraint: Partial<GrammarConstraint>): string;
    /**
     * Convert to terse format
     */
    private toTerse;
    /**
     * Extract JSON only
     */
    private toJsonOnly;
    /**
     * Extract code blocks only
     */
    private toCodeOnly;
    /**
     * Convert to file operations format
     */
    private toFileOps;
    /**
     * Convert to plan format
     */
    private toPlan;
    /**
     * Convert to API format
     */
    private toApiFormat;
    /**
     * Generic cleaning for any language
     */
    private genericClean;
    /**
     * Remove prose markers
     */
    private removeProse;
    /**
     * Truncate to token limit
     */
    private truncateToTokens;
}
//# sourceMappingURL=constrain.d.ts.map