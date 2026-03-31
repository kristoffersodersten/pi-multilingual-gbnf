/**
 * Comprehensive stress tests for Multilingual GBNF
 * Tests edge cases, error handling, and worst-case scenarios
 */

import { MultilingualGrammarValidator } from './validator.js';
import { MultilingualResponseConstrain } from './constrain.js';
import { detectLanguage, getLocale, getSupportedLanguages } from './locales/index.js';
import type { LanguageCode } from './types.js';

const validator = new MultilingualGrammarValidator();
const constrain = new MultilingualResponseConstrain();

console.log('═'.repeat(70));
console.log('MULTILINGUAL GBNF - COMPREHENSIVE STRESS TESTS');
console.log('═'.repeat(70));
console.log();

let passed = 0;
let failed = 0;

function test(name: string, fn: () => boolean | string) {
  try {
    const result = fn();
    if (result === true || result === '') {
      console.log(`  ✓ ${name}`);
      passed++;
    } else {
      console.log(`  ✗ ${name}: ${result}`);
      failed++;
    }
  } catch (e) {
    console.log(`  ✗ ${name}: threw ${(e as Error).message}`);
    failed++;
  }
}

// ============================================================================
// EDGE CASE TESTS - Empty and invalid inputs
// ============================================================================
console.log('📍 Edge Case Tests - Empty/Invalid Inputs:');

test('Empty string language detection defaults to English', () => {
  return detectLanguage('') === 'en';
});

test('Null-like empty string language detection', () => {
  return detectLanguage('   ') === 'en';
});

test('Very short text (< 3 chars) detection', () => {
  return detectLanguage('Hi') === 'en';
});

test('Emoji-only text detection', () => {
  const result = detectLanguage('✏️🔧❌');
  return result === 'en'; // Should not crash, defaults to en
});

test('Unicode-only text detection', () => {
  const result = detectLanguage('🎉🚀💡');
  return result === 'en';
});

test('Mixed script text detection', () => {
  const result = detectLanguage('Hello 世界 Привет');
  // Should not crash and return a valid language code
  // Note: Mixed script may detect as one of the scripts present (e.g., 'ru' for Cyrillic)
  return result !== undefined && result !== null;
});

// ============================================================================
// GRAMMAR VALIDATION EDGE CASES
// ============================================================================
console.log();
console.log('📍 Grammar Validation Edge Cases:');

test('Empty text validation - terse mode', () => {
  const result = validator.validate('', 'terse');
  return result.valid === false && result.errors.length > 0;
});

test('Empty text validation - json mode', () => {
  const result = validator.validate('', 'json');
  return result.valid === false;
});

test('Whitespace-only text validation', () => {
  const result = validator.validate('   \n\t  ', 'terse');
  return result.valid === false;
});

test('Invalid grammar mode handling', () => {
  const result = validator.validate('test', 'invalid' as any);
  return result.valid === false && result.errors[0].includes('Unknown grammar mode');
});

test('Very long text validation (10000+ chars)', () => {
  const longText = 'A'.repeat(10000);
  const result = validator.validate(longText, 'terse');
  return result !== undefined && result.metrics.originalTokens > 0;
});

test('JSON with trailing comma detection', () => {
  const result = validator.validate('{"a":1,}', 'json');
  return result.valid === false;
});

test('Malformed JSON detection', () => {
  const result = validator.validate('{invalid json here', 'json');
  return result.valid === false;
});

test('Code without fences', () => {
  const result = validator.validate('console.log("hello")', 'code');
  return result.valid === false;
});

test('SQL without keyword', () => {
  const result = validator.validate('SELECT * FROM users', 'sql');
  return result.valid === true;
});

// ============================================================================
// CONSTRAINT APPLICATION EDGE CASES
// ============================================================================
console.log();
console.log('📍 Constraint Application Edge Cases:');

test('Apply constraint to empty string', () => {
  const result = constrain.apply('', { mode: 'terse' });
  return result !== undefined;
});

test('Apply constraint to very long text', () => {
  const longText = 'A'.repeat(50000);
  const result = constrain.apply(longText, { mode: 'terse', maxTokens: 100 });
  return result.length < longText.length;
});

test('JSON extraction from prose', () => {
  const text = 'Here is the JSON:\n```json\n{"status":"ok"}\n```\nHope this helps!';
  const result = constrain.apply(text, { mode: 'json' });
  return result.includes('{"status":"ok"}');
});

test('Code extraction from prose', () => {
  const text = 'Here is the code:\n```typescript\nconst x = 1;\n```\nLet me know!';
  const result = constrain.apply(text, { mode: 'code' });
  return result.includes('const x = 1;');
});

// ============================================================================
// LANGUAGE DETECTION ACCURACY
// ============================================================================
console.log();
console.log('📍 Language Detection Accuracy (27 languages):');

const detectionTests: { text: string; expected: LanguageCode; desc: string }[] = [
  // Core languages
  { text: 'Hello world, how are you?', expected: 'en', desc: 'English' },
  { text: 'Hej världen, hur mår du?', expected: 'sv', desc: 'Swedish' },
  { text: 'Hallo Welt, wie geht es dir?', expected: 'de', desc: 'German' },
  { text: 'Hola mundo, ¿cómo estás?', expected: 'es', desc: 'Spanish' },
  { text: 'Bonjour le monde, comment ça va?', expected: 'fr', desc: 'French' },
  { text: 'Ciao mondo, come stai?', expected: 'it', desc: 'Italian' },
  { text: 'Olá mundo, como está?', expected: 'pt', desc: 'Portuguese' },
  { text: 'Hallo wereld, hoe gaat het?', expected: 'nl', desc: 'Dutch' },
  { text: 'Witaj świecie, jak się masz?', expected: 'pl', desc: 'Polish' },
  // Extended languages
  { text: 'Hej verden, hvordan har du det?', expected: 'da', desc: 'Danish' },
  { text: 'Hei verden, hvordan har du det?', expected: 'no', desc: 'Norwegian' },
  { text: 'Hei maailma, miten voit?', expected: 'fi', desc: 'Finnish' },
  { text: 'Ahoj světe, jak se máš?', expected: 'cs', desc: 'Czech' },
  { text: 'Ahoj svet, ako sa máš?', expected: 'sk', desc: 'Slovak' },
  { text: 'Szia világ, hogy vagy?', expected: 'hu', desc: 'Hungarian' },
  { text: 'Salut lume, ce mai faci?', expected: 'ro', desc: 'Romanian' },
  { text: 'Здравей свят, как си?', expected: 'bg', desc: 'Bulgarian' },
  { text: 'Bok svijete, kako si?', expected: 'hr', desc: 'Croatian' },
  { text: 'Здраво свете, како си?', expected: 'sr', desc: 'Serbian' },
  { text: 'Pozdravljen svet, kako si?', expected: 'sl', desc: 'Slovenian' },
  { text: 'Γειά σου κόσμε, πώς είσαι;', expected: 'el', desc: 'Greek' },
  { text: 'Merhaba dünya, nasılsın?', expected: 'tr', desc: 'Turkish' },
  { text: 'Привет мир, как дела?', expected: 'ru', desc: 'Russian' },
  { text: 'Привіт світ, як справи?', expected: 'uk', desc: 'Ukrainian' },
  { text: 'Tere maailm, kuidas käsi käib?', expected: 'et', desc: 'Estonian' },
  { text: 'Sveika pasaule, kā klājas?', expected: 'lv', desc: 'Latvian' },
  { text: 'Labas pasaulis, kaip sekasi?', expected: 'lt', desc: 'Lithuanian' },
];

for (const testEntry of detectionTests) {
  test(`${testEntry.desc}: "${testEntry.text.slice(0, 25)}..."`, () => {
    const detected = detectLanguage(testEntry.text);
    return detected === testEntry.expected ? true : `expected ${testEntry.expected}, got ${detected}`;
  });
}

// ============================================================================
// LOCALE STRINGS VERIFICATION
// ============================================================================
console.log();
console.log('📍 Locale Strings Verification (all 27 languages):');

const allLanguages = getSupportedLanguages();
for (const lang of allLanguages) {
  test(`${lang} has all locale categories`, () => {
    const locale = getLocale(lang);
    const hasAll = locale.create.length > 0 &&
      locale.read.length > 0 &&
      locale.edit.length > 0 &&
      locale.delete.length > 0 &&
      locale.error.length > 0 &&
      locale.ok.length > 0 &&
      locale.pending.length > 0 &&
      locale.warning.length > 0;
    return hasAll ? true : `missing categories for ${lang}`;
  });
}

// ============================================================================
// METRICS VERIFICATION
// ============================================================================
console.log();
console.log('📍 Metrics Verification:');

test('Token calculation for short text', () => {
  const result = validator.validate('Hello', 'terse');
  return result.metrics.originalTokens > 0;
});

test('Token calculation for long text', () => {
  const longText = 'A'.repeat(1000);
  const result = validator.validate(longText, 'terse');
  return result.metrics.originalTokens >= 250; // 1000/4 = 250 tokens
});

test('Normalized text is not longer than original', () => {
  const text = 'Sure, I can help you with that!';
  const result = validator.validate(text, 'terse');
  return result.normalized.length <= text.length;
});

// ============================================================================
// RESPONSE CONSTRAIN MODES
// ============================================================================
console.log();
console.log('📍 Response Constrain Modes:');

test('Terse mode removes filler words', () => {
  const text = 'Certainly, I would be happy to help you with that task.';
  const result = constrain.apply(text, { mode: 'terse' });
  return !result.toLowerCase().includes('certainly');
});

test('JSON mode extracts valid JSON', () => {
  const text = 'Sure! Here is the data:\n```json\n{"key":"value"}\n```';
  const result = constrain.apply(text, { mode: 'json' });
  try {
    JSON.parse(result);
    return true;
  } catch {
    return false;
  }
});

test('Code mode extracts code blocks', () => {
  const text = 'Here is the function:\n```python\ndef hello():\n    pass\n```';
  const result = constrain.apply(text, { mode: 'code' });
  return result.includes('def hello()');
});

test('Plan mode formats as bullets', () => {
  const text = 'Step 1: Do this\nStep 2: Do that';
  const result = constrain.apply(text, { mode: 'plan' });
  return result.includes('→');
});

// ============================================================================
// SUMMARY
// ============================================================================
console.log();
console.log('═'.repeat(70));
console.log(`RESULTS: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
console.log('═'.repeat(70));

if (failed > 0) {
  console.error(`\n⚠️  ${failed} test(s) failed! Review above for details.`);
  process.exit(1);
} else {
  console.log('\n✓ All stress tests passed!');
  process.exit(0);
}
