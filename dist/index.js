/**
 * Pi Multilingual GBNF Extension
 *
 * Provides grammar-constrained, noise-free outputs in multiple languages.
 * Supports: English, Swedish, German, Spanish, French, Italian, Portuguese, Dutch, Polish
 *
 * @version 1.0.0
 * @author Community
 */
import { Type } from '@sinclair/typebox';
import { MultilingualGrammarValidator } from './validator.js';
import { MultilingualResponseConstrain } from './constrain.js';
import { detectLanguage, getSupportedLanguages, getLanguageName } from './locales/index.js';
export default function (pi, config) {
    const validator = new MultilingualGrammarValidator();
    const constrain = new MultilingualResponseConstrain();
    // Store constraint state
    let activeConstraint = null;
    // Subscribe to response events to apply constraints
    pi.on('tool_result', async (event, ctx) => {
        if (activeConstraint && event.result?.content) {
            const originalText = event.result.content
                .filter((c) => c.type === 'text')
                .map((c) => c.text)
                .join('');
            if (originalText) {
                const constrained = constrain.apply(originalText, {
                    mode: activeConstraint.mode,
                    language: activeConstraint.language,
                    maxTokens: activeConstraint.maxTokens,
                });
                // Update result
                event.result.content = [{ type: 'text', text: constrained }];
            }
            // Clear constraint after application
            activeConstraint = null;
        }
    });
    // Register tools
    pi.registerTool({
        name: 'validate_grammar',
        label: 'Validate Grammar',
        description: 'Validate text against multilingual GBNF grammar and return structured result',
        parameters: Type.Object({
            text: Type.String({ description: 'Text to validate' }),
            mode: Type.String({
                description: 'Grammar mode',
                examples: ['file_ops', 'terse', 'json', 'code', 'plan', 'api', 'sql']
            }),
            language: Type.Optional(Type.String({
                description: 'Language code or "auto"',
                default: 'auto',
                examples: ['en', 'sv', 'de', 'auto']
            })),
        }),
        async execute(toolCallId, params, signal, onUpdate, ctx) {
            const result = validator.validate(params.text, params.mode, {
                language: params.language,
            });
            return {
                content: [{
                        type: 'text',
                        text: `Grammar Validation Result:
• Valid: ${result.valid ? '✓ Yes' : '✗ No'}
• Mode: ${params.mode}
• Detected Language: ${result.detectedLanguage} (${getLanguageName(result.detectedLanguage || 'en')})
• Errors: ${result.errors.length > 0 ? result.errors.join(', ') : 'None'}
• Warnings: ${result.warnings.length > 0 ? result.warnings.join(', ') : 'None'}
• Tokens Saved: ${result.metrics.tokensSaved}
${result.valid ? `\nNormalized Output:\n${result.normalized}` : ''}`
                    }],
                details: result,
            };
        },
    });
    pi.registerTool({
        name: 'constrain_response',
        label: 'Constrain Response',
        description: 'Apply output constraints to next agent response (multilingual)',
        parameters: Type.Object({
            mode: Type.String({
                description: 'Constraint mode',
                enum: ['file_ops', 'terse', 'json', 'code', 'plan', 'api', 'sql']
            }),
            language: Type.Optional(Type.String({
                description: 'Target language or auto-detect',
                default: 'auto',
                examples: ['en', 'sv', 'de', 'es', 'auto']
            })),
            maxTokens: Type.Optional(Type.Number({
                description: 'Maximum tokens in response',
                minimum: 1,
                maximum: 4000
            })),
        }),
        async execute(toolCallId, params, signal, onUpdate, ctx) {
            activeConstraint = {
                mode: params.mode,
                language: (params.language || 'auto'),
                maxTokens: params.maxTokens,
            };
            return {
                content: [{
                        type: 'text',
                        text: `✓ Response constrained: ${params.mode} mode (${params.language || 'auto'}${params.maxTokens ? `, max ${params.maxTokens} tokens` : ''})`
                    }],
                details: { constrained: true, ...activeConstraint },
            };
        },
    });
    pi.registerTool({
        name: 'detect_language',
        label: 'Detect Language',
        description: 'Detect the language of input text',
        parameters: Type.Object({
            text: Type.String({ description: 'Text to analyze' }),
        }),
        async execute(toolCallId, params, signal, onUpdate, ctx) {
            const detected = detectLanguage(params.text);
            return {
                content: [{
                        type: 'text',
                        text: `🌐 Detected Language: ${detected} (${getLanguageName(detected)})`
                    }],
                details: {
                    detected,
                    name: getLanguageName(detected),
                    confidence: 'high'
                },
            };
        },
    });
    pi.registerTool({
        name: 'list_languages',
        label: 'List Languages',
        description: 'List all supported languages',
        parameters: Type.Object({}),
        async execute(toolCallId, params, signal, onUpdate, ctx) {
            const languages = getSupportedLanguages();
            const list = languages.map(code => `• ${code} - ${getLanguageName(code)}`).join('\n');
            return {
                content: [{
                        type: 'text',
                        text: `🌍 Supported Languages (${languages.length}):\n\n${list}`
                    }],
                details: { languages },
            };
        },
    });
    // Register commands
    pi.registerCommand('gbnf', {
        description: 'Multilingual GBNF commands',
        handler: async (args, ctx) => {
            const [subcommand, ...rest] = args?.split(' ') || [];
            const subcommandArgs = rest.join(' ');
            switch (subcommand) {
                case 'languages': {
                    const langs = getSupportedLanguages();
                    ctx.ui.notify(`Supported: ${langs.map(getLanguageName).join(', ')}`, 'info');
                    break;
                }
                case 'detect': {
                    const detected = detectLanguage(subcommandArgs || '');
                    ctx.ui.notify(`Detected: ${getLanguageName(detected)}`, 'info');
                    break;
                }
                case 'constrain': {
                    const [mode] = subcommandArgs.split(' ') || [];
                    if (mode) {
                        activeConstraint = {
                            mode: mode,
                            language: 'auto',
                        };
                        ctx.ui.notify(`Constraint: ${mode}`, 'success');
                    }
                    else {
                        ctx.ui.notify('Usage: /gbnf constrain <mode>', 'warning');
                    }
                    break;
                }
                default:
                    ctx.ui.notify('Available subcommands: languages, detect, constrain', 'info');
            }
        },
    });
    // Show extension loaded notification
    pi.on('session_start', async (_event, ctx) => {
        ctx.ui.notify('🌐 Multilingual GBNF loaded. Use /gbnf languages for supported languages.', 'info');
    });
    console.log('✓ Multilingual GBNF extension loaded');
    console.log(`  Supported: ${getSupportedLanguages().length} languages`);
    console.log('  Tools: validate_grammar, constrain_response, detect_language, list_languages');
    console.log('  Command: /gbnf');
}
//# sourceMappingURL=index.js.map