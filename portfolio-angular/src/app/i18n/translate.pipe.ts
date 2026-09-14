import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { TRANSLATIONS } from './translations';

/** Impuro a propósito: debe re-evaluarse cuando cambia el idioma. */
@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(key: string): string {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[this.languageService.lang()] ?? entry.es;
  }
}
