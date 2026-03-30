/**
 * Simple tests for multilingual GBNF
 */
import { MultilingualGrammarValidator } from './validator.js';
import { detectLanguage, getSupportedLanguages } from './locales/index.js';
const validator = new MultilingualGrammarValidator();
console.log('═'.repeat(60));
console.log('MULTILINGUAL GBNF TESTS');
console.log('═'.repeat(60));
console.log();
// Test language detection
const detectionTests = [
    { text: 'Hello world', expected: 'en' },
    { text: 'Här är resultatet', expected: 'sv' },
    { text: 'Hier ist das Ergebnis', expected: 'de' },
    { text: 'Aquí está el resultado', expected: 'es' },
    { text: 'Voici le résultat', expected: 'fr' },
];
console.log('📍 Language Detection Tests:');
for (const test of detectionTests) {
    const detected = detectLanguage(test.text);
    const status = detected === test.expected ? '✓' : '✗';
    console.log(`  ${status} "${test.text.slice(0, 20)}..." → ${detected} (expected: ${test.expected})`);
}
console.log();
console.log(`📚 Supported Languages: ${getSupportedLanguages().length}`);
// Test validation
const validationTests = [
    { text: '✏️ Created: ./test.js', mode: 'terse', expected: true },
    { text: '{"status":"ok"}', mode: 'json', expected: true },
    { text: 'Certainly, I can help', mode: 'terse', expected: false },
];
console.log();
console.log('📝 Validation Tests:');
for (const test of validationTests) {
    const result = validator.validate(test.text, test.mode, { language: 'auto' });
    const status = result.valid === test.expected ? '✓' : '✗';
    const lang = result.detectedLanguage || 'en';
    console.log(`  ${status} ${test.mode} [${lang}]: ${result.valid ? 'valid' : `invalid - ${result.errors[0]}`}`);
}
console.log();
console.log('═'.repeat(60));
console.log('TESTS COMPLETE');
console.log('═'.repeat(60));
//# sourceMappingURL=test.js.map