import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { TranslatePipe } from '../i18n/translate.pipe';

const AVATAR_VARIATIONS = [
  '/img/avatar-v1.jpg', // Cthulhu / Guardián
  '/img/avatar-v2.jpg', // cyberpunk
  '/img/avatar-v3.jpg', // fantasía
  '/img/avatar-v4.jpg', // noche de juegos
  '/img/avatar-v5.jpg', // cómic
  '/img/avatar-v6.jpg'  // cazador oscuro
];

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('avatarCircle') private avatarCircleRef?: ElementRef<HTMLDivElement>;

  glitchSrc = AVATAR_VARIATIONS[0];

  private reduceMotion = false;
  private glitchTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.scheduleGlitch();
  }

  ngOnDestroy(): void {
    if (this.glitchTimeoutId) clearTimeout(this.glitchTimeoutId);
  }

  private scheduleGlitch(): void {
    if (this.reduceMotion) return;
    const delay = 6000 + Math.random() * 7000;
    this.glitchTimeoutId = setTimeout(() => {
      this.glitchSrc = AVATAR_VARIATIONS[Math.floor(Math.random() * AVATAR_VARIATIONS.length)];
      const circle = this.avatarCircleRef?.nativeElement;
      circle?.classList.add('glitching');
      setTimeout(() => circle?.classList.remove('glitching'), 520);
      this.scheduleGlitch();
    }, delay);
  }
}
