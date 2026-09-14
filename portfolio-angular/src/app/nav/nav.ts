import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { TranslatePipe } from '../i18n/translate.pipe';

@Component({
  selector: 'app-nav',
  imports: [TranslatePipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  readonly languageService = inject(LanguageService);
}
