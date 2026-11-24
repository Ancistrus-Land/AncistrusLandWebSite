/**
 * Ancistrus Land Canada - Internationalization (i18n) Engine
 * Manages active language state (English/French), local storage persistence,
 * and automatic DOM translation across all pages.
 */
import { TRANSLATIONS } from './i18n-dictionary.js';

class I18nManager {
    constructor() {
        this.storageKey = 'ancistrus_lang';
        this.defaultLang = 'en';
        this.currentLang = localStorage.getItem(this.storageKey) || this.defaultLang;
        this.translations = TRANSLATIONS;
    }

    /**
     * Get current active language code ('en' or 'fr')
     */
    getLanguage() {
        return this.currentLang;
    }

    /**
     * Switch language, persist choice, and translate page
     */
    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Unsupported language: ${lang}`);
            return;
        }
        this.currentLang = lang;
        localStorage.setItem(this.storageKey, lang);
        document.documentElement.lang = lang;
        this.translatePage();
        this.updateSwitcherUI();
        window.dispatchEvent(new CustomEvent('language:changed', { detail: { lang } }));
    }

    /**
     * Lookup translated string by key with fallback
     */
    t(key, fallback = '') {
        const dict = this.translations[this.currentLang] || this.translations[this.defaultLang];
        return dict[key] || fallback || key;
    }

    /**
     * Scan document for elements with [data-i18n] and translate text/placeholders
     */
    translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                // If element has child icons, preserve them
                const icon = el.querySelector('i');
                if (icon) {
                    const iconClone = icon.cloneNode(true);
                    el.innerHTML = '';
                    el.appendChild(iconClone);
                    el.appendChild(document.createTextNode(' ' + translation));
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Translate inputs with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
            const key = input.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            if (translation) {
                input.placeholder = translation;
            }
        });
    }

    /**
     * Updates active badge or label in language dropdown
     */
    updateSwitcherUI() {
        const label = document.getElementById('active-lang-label');
        if (label) {
            label.textContent = this.currentLang.toUpperCase();
        }
        document.querySelectorAll('.lang-select-option').forEach(opt => {
            const optLang = opt.getAttribute('data-lang');
            if (optLang === this.currentLang) {
                opt.classList.add('active', 'fw-bold');
            } else {
                opt.classList.remove('active', 'fw-bold');
            }
        });
    }

    /**
     * Initialize on DOM Ready
     */
    init() {
        document.documentElement.lang = this.currentLang;
        this.translatePage();
        this.updateSwitcherUI();
    }
}

// Singleton i18n instance
export const i18n = new I18nManager();

if (typeof window !== 'undefined') {
    window.i18n = i18n;
    window.setLanguage = (lang) => i18n.setLanguage(lang);
}
