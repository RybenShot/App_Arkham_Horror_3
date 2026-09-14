import { Injectable, signal } from '@angular/core';

export type Lang = 'es' | 'en' | 'pt';

const STORAGE_KEY = 'portfolio-lang';
const SUPPORTED: Lang[] = ['es', 'en', 'pt'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(this.detectInitialLang());

  setLang(lang: Lang): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  private detectInitialLang(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (this.isSupported(stored)) return stored;
    const browserLang = navigator.language?.slice(0, 2).toLowerCase() ?? '';
    return this.isSupported(browserLang) ? browserLang : 'es';
  }

  private isSupported(value: string | null): value is Lang {
    return !!value && (SUPPORTED as string[]).includes(value);
  }
}
