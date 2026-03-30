/**
 * Response Constrain - Apply multilingual constraints to outputs
 */
import { detectLanguage, getLocale } from './locales/index.js';
export class MultilingualResponseConstrain {
    /**
     * Apply constraint to response
     */
    apply(response, constraint) {
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
            default:
                cleaned = this.genericClean(response, lang);
        }
        // Apply token limit if specified
        if (constraint.maxTokens) {
            cleaned = this.truncateToTokens(cleaned, constraint.maxTokens);
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
    toTerse(text, lang) {
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
    toJsonOnly(text) {
        // Try to find JSON in markdown
        const jsonMatch = text.match(/```json\n([\s\S]*?)```/);
        if (jsonMatch) {
            try {
                JSON.parse(jsonMatch[1]);
                return jsonMatch[1].trim();
            }
            catch { }
        }
        // Try to parse entire text
        try {
            JSON.parse(text.trim());
            return text.trim();
        }
        catch { }
        // Fall back to structure
        return JSON.stringify({ text: text.slice(0, 500) });
    }
    /**
     * Extract code blocks only
     */
    toCodeOnly(text) {
        const blocks = [];
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
    toFileOps(text, lang) {
        const ops = [];
        const locale = getLocale(lang);
        // Detect file mentions with locale-aware actions
        const createPattern = new RegExp(`(?:created?|wrote?|${locale.create.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s+['\`]?([\\w./\\\\-\\u00e4\\u00e5\\u00f6\\u00c4\\u00c5\\u00d6]+)['\`]?`, 'gi');
        const editPattern = new RegExp(`(?:edited?|updated?|${locale.edit.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s+['\`]?([\\w./\\\\-]+)['\`]?`, 'gi');
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
    toPlan(text) {
        const lines = text.split('\n').filter(l => l.trim());
        const plan = [];
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
    toApiFormat(text) {
        return text
            .replace(/^(?:Endpoint|API|Endpoint)[\s:]*$/im, '')
            .replace(/^(?:Method|HTTP)[\s:]*$/im, '')
            .trim();
    }
    /**
     * Generic cleaning for any language
     */
    genericClean(text, lang) {
        const noiseByLang = {
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
    removeProse(text, lang) {
        const proseByLang = {
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
    truncateToTokens(text, maxTokens) {
        const chars = maxTokens * 4;
        return text.length > chars ? text.slice(0, chars) + '...' : text;
    }
}
//# sourceMappingURL=constrain.js.map