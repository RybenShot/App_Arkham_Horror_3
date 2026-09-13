import { Component } from '@angular/core';
import { DiceRoller } from '../dice-roller/dice-roller';

@Component({
  selector: 'app-experience',
  imports: [DiceRoller],
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
