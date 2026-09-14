import { Component } from '@angular/core';
import { TranslatePipe } from '../i18n/translate.pipe';

@Component({
  selector: 'app-experience',
  imports: [TranslatePipe],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  onCardMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - r.left}px`);
    card.style.setProperty('--my', `${event.clientY - r.top}px`);
  }
}
