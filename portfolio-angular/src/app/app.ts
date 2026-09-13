import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Nav } from './nav/nav';
import { Hero } from './hero/hero';
import { Experience } from './experience/experience';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, Experience, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  @ViewChild('glow') private glowRef?: ElementRef<HTMLDivElement>;

  private reduceMotion = false;

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------- resplandor del cursor (toda la página) ---------- */

  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove(e: MouseEvent): void {
    if (this.reduceMotion || !this.glowRef) return;
    const glow = this.glowRef.nativeElement;
    glow.style.transform = `translate(${e.clientX - 240}px,${e.clientY - 240}px)`;
    const half = window.innerWidth / 2;
    const creativeSide = e.clientX > half;
    document.documentElement.style.setProperty(
      '--glow-color',
      creativeSide ? 'rgba(221,154,77,0.10)' : 'rgba(61,218,176,0.10)'
    );
  }
}
