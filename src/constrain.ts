/**
 * Response Constrain - Apply multilingual constraints to outputs
 */

import type { GrammarConstraint, LanguageCode } from './types.js';
import { detectLanguage, getLocale } from './locales/index.js';

export class MultilingualResponseConstrain {
  /**
   * Apply constraint to response
   */
  apply(response: string, constraint: Partial<GrammarConstraint>): string {
    // Validate input
    if (response === null || response === undefined) {
      return '';
    }

    if (typeof response !== 'string') {
      console.warn('MultilingualResponseConstrain.apply: response must be a string');
      return '';
    }

    // Handle empty response
    if (!response.trim()) {
      return '';
    }

    // Validate constraint
    if (!constraint || typeof constraint.mode !== 'string') {
      console.warn('MultilingualResponseConstrain.apply: invalid constraint mode');
      return response.trim();
    }

    const lang = constraint.language === 'auto'
      ? detectLanguage(response)
      : (constraint.language ?? 'en');

    let cleaned = response;

    // Apply mode-specific cleaning
    switch (constraint.mode) {
      case 'terse':
        cleaned = this.toTerse(response, lang);
        break;
      case 'json':
        cleaned = this.toJsonOnly(response);
        break;
      case 'code':
        cleaned = this.toCodeOnly(response);
        break;
      case 'file_ops':
        cleaned = this.toFileOps(response, lang);
        break;
      case 'plan':
        cleaned = this.toPlan(response);
        break;
      case 'api':
        cleaned = this.toApiFormat(response);
        break;
      case 'sql':
        cleaned = this.toSqlFormat(response);
        break;
      default:
        console.warn(`MultilingualResponseConstrain.apply: unknown mode "${constraint.mode}"`);
        cleaned = this.genericClean(response, lang);
    }

    // Apply token limit if specified
    if (constraint.maxTokens) {
      if (typeof constraint.maxTokens !== 'number' || constraint.maxTokens < 1) {
        console.warn('MultilingualResponseConstrain.apply: maxTokens must be a positive number');
      } else {
        cleaned = this.truncateToTokens(cleaned, constraint.maxTokens);
      }
    }

    // Remove prose if not allowed
    if (constraint.allowProse === false) {
      cleaned = this.removeProse(cleaned, lang);
    }

    return cleaned;
  }
  
  /**
   * Convert to terse format
   */
  private toTerse(text: string, lang: LanguageCode): string {
    if (!text || typeof text !== 'string') return '';

    const locale = getLocale(lang);
    const trimmed = text
      .replace(/^(?:Sure|Certainly|I'd be happy to|Of course|Let me|I can|I will)[,\s]*/i, '')
      .replace(/^(?:Gärna|Absolut|Jag kan gärna|Natürlich|Sicher|Certamente|Сertainement)[,\s]*/i, '')
      .replace(/[\s\n]+/g, ' ')
      .trim();

    // Detect action
    const lower = text.toLowerCase();
    const actions = [
      ...locale.create.map(a => ({ word: a.toLowerCase(), icon: '✏️' })),
      ...locale.read.map(a => ({ word: a.toLowerCase(), icon: '📖' })),
      ...locale.edit.map(a => ({ word: a.toLowerCase(), icon: '🔧' })),
      ...locale.delete.map(a => ({ word: a.toLowerCase(), icon: '❌' })),
    ];

    for (const action of actions) {
      if (lower.includes(action.word)) {
        return `${action.icon} ${trimmed.replace(new RegExp(`${action.word}:?\\s*`, 'i'), '').slice(0, 100)}`;
      }
    }

    return `✓ ${trimmed.slice(0, 100)}`;
  }

  /**
   * Extract JSON only
   */
  private toJsonOnly(text: string): string {
    if (!text || typeof text !== 'string') return '';

    // Try to find JSON in markdown
    const jsonMatch = text.match(/```json\n([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        JSON.parse(jsonMatch[1]);
        return jsonMatch[1].trim();
      } catch {}
    }

    // Try to parse entire text
    try {
      JSON.parse(text.trim());
      return text.trim();
    } catch {}

    // Fall back to structure
    return JSON.stringify({ text: text.slice(0, 500) });
  }

  /**
   * Extract code blocks only
   */
  private toCodeOnly(text: string): string {
    if (!text || typeof text !== 'string') return '';

    const blocks: string[] = [];
    const pattern = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = pattern.exec(text)) !== null) {
      blocks.push(match[2]);
    }

    return blocks.join('\n\n');
  }
  
  /**
   * Convert to file operations format
   */
  private toFileOps(text: string, lang: LanguageCode): string {
    if (!text || typeof text !== 'string') return '';

    const ops: string[] = [];
    const locale = getLocale(lang);

    if (!locale) {
      console.warn(`getLocale returned undefined for language: ${lang}`);
      return '';
    }

    // Detect file mentions with locale-aware actions
    const createPattern = new RegExp(
      `(?:created?|wrote?|${locale.create.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s+['\`]?([\\w./\\\\-\\u00e4\\u00e5\\u00f6\\u00c4\\u00c5\\u00d6]+)['\`]?`,
      'gi'
    );

    const editPattern = new RegExp(
      `(?:edited?|updated?|${locale.edit.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s+['\`]?([\\w./\\\\-]+)['\`]?`,
      'gi'
    );

    let match;
    while ((match = createPattern.exec(text)) !== null) {
      ops.push(`WRITE ${match[1]}`);
    }
    while ((match = editPattern.exec(text)) !== null) {
      ops.push(`EDIT ${match[1]}`);
    }

    return ops.join('\n');
  }

  /**
   * Convert to plan format
   */
  private toPlan(text: string): string {
    if (!text || typeof text !== 'string') return '';

    const lines = text.split('\n').filter(l => l.trim());
    const plan: string[] = [];

    for (const line of lines) {
      const norm = line.replace(/^(?:Step|Phase|Part|Steg|Fase|Fase|Etapa)\s*\d*[.:]?\s*/i, '');
      if (norm) {
        plan.push(`→ ${norm.slice(0, 80)}`);
      }
    }

    return plan.join('\n');
  }
  
  /**
   * Convert to API format
   */
  private toApiFormat(text: string): string {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/^(?:Endpoint|API|Endpoint)[\s:]*$/im, '')
      .replace(/^(?:Method|HTTP)[\s:]*$/im, '')
      .trim();
  }

  /**
   * Convert to SQL format
   */
  private toSqlFormat(text: string): string {
    if (!text || typeof text !== 'string') return '';
    // Extract SQL from markdown code blocks
    const sqlMatch = text.match(/```sql\n([\s\S]*?)```/);
    if (sqlMatch) {
      return sqlMatch[1].trim();
    }
    // Return text as-is if it looks like SQL
    return text.trim();
  }
  
  /**
   * Generic cleaning for any language
   */
  private genericClean(text: string, lang: LanguageCode): string {
    if (!text || typeof text !== 'string') return '';

    const noiseByLang: Record<string, string[]> = {
      en: ['Certainly', 'Sure', 'I\'d be happy to', 'Of course', 'Let me', 'Hope this helps'],
      sv: ['Gärna', 'Absolut', 'Jag kan gärna', 'Låt mig', 'Hoppas det hjälper'],
      de: ['Natürlich', 'Sicher', 'Ich würde gerne', 'Lass mich', 'Hoffe das hilft'],
      es: ['Seguro', 'Por supuesto', 'Me encantaría', 'Espero que ayude'],
      fr: ['Certainement', 'Bien sûr', 'Je serais ravi', 'J\'espère que ça aide'],
      it: ['Certamente', 'Sicuro', 'Mi piacerebbe', 'Spero sia utile'],
      pt: ['Certamente', 'Com certeza', 'Eu ficaria feliz', 'Espero que ajude'],
      nl: ['Zeker', 'Natuurlijk', 'Ik zou graag', 'Hopelijk helpt dit'],
      pl: ['Oczywiście', 'Pewnie', 'Chętnie', 'Mam nadzieję że to pomoże'],
    };

    let cleaned = text;
    const noise = noiseByLang[lang] ?? noiseByLang.en;

    for (const phrase of noise) {
      cleaned = cleaned.replace(new RegExp(phrase, 'gi'), '');
    }

    return cleaned.replace(/\s+/g, ' ').trim();
  }

  /**
   * Remove prose markers
   */
  private removeProse(text: string, lang: LanguageCode): string {
    if (!text || typeof text !== 'string') return '';

    const proseByLang: Record<string, string[]> = {
      en: ['Here is', 'Below is', 'The following', 'As you can see'],
      sv: ['Här är', 'Nedan är', 'Följande', 'Som du kan se'],
      de: ['Hier ist', 'Unten ist', 'Folgendes', 'Wie Sie sehen können'],
      es: ['Aquí está', 'Abajo está', 'Lo siguiente', 'Como puedes ver'],
      fr: ['Voici', 'Ci-dessous', 'Ce qui suit', 'Comme vous pouvez voir'],
      it: ['Ecco', 'Qui sotto', 'Il seguente', 'Come puoi vedere'],
      pt: ['Aqui está', 'Abaixo está', 'O seguinte', 'Como você pode ver'],
      nl: ['Hier is', 'Hieronder is', 'Het volgende', 'Zoals u kunt zien'],
      pl: ['Oto', 'Poniżej', 'Następujące', 'Jak widać'],
    };

    let cleaned = text;
    const prose = proseByLang[lang] ?? proseByLang.en;

    for (const phrase of prose) {
      cleaned = cleaned.replace(new RegExp(`${phrase}[^.]*\\.?`, 'gi'), '');
    }

    return cleaned.trim();
  }

  /**
   * Truncate to token limit
   */
  private truncateToTokens(text: string, maxTokens: number): string {
    if (!text || typeof text !== 'string') return '';
    if (typeof maxTokens !== 'number' || maxTokens < 1) return text;

    const chars = maxTokens * 4;
    return text.length > chars ? text.slice(0, chars) + '...' : text;
  }
}