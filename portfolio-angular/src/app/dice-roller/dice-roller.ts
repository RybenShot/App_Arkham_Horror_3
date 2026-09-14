import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';
import DiceEngine from '../dice-engine';
import { TranslatePipe } from '../i18n/translate.pipe';

interface DiceResult {
  marked: number;
  total: number;
}

const THEME_CLASICO = {
  ink: '#2c2c2a',
  board: 'transparent',
  die: [247, 240, 222],
  dieMarked: [61, 218, 176],
  pipOne: '#e0342c',
  confetti: ['#3ddab0', '#a6ffe6', '#1fae86', '#0c3d30']
};

const DICE_COUNT = 5;
const RESULT_DISPLAY_MS = 2000;

/* ---------- física del dado flotante al hacer scroll ---------- */
// Resorte amortiguado: el scroll "empuja" una velocidad objetivo y el dado la
// persigue; al frenar en seco, el objetivo cae a 0 de golpe y el subamortiguo
// hace que el dado se pase de largo y rebote antes de asentarse.
const SPRING_STIFFNESS = 180; // rigidez del resorte
const SPRING_DAMPING = 11.2;  // amortiguación (subamortiguado -> rebota una vez; -20% = rebote más marcado)
const SCROLL_IMPULSE = 0.012; // cuánta velocidad de scroll (px/s) se traduce en desplazamiento (+20%)
const MAX_OFFSET = 10.8;      // tope en px de cuánto puede desplazarse el dado (+20%)
const VELOCITY_SMOOTHING = 0.25; // filtro paso-bajo para no vibrar con cada "tick" de rueda

@Component({
  selector: 'app-dice-roller',
  imports: [TranslatePipe],
  templateUrl: './dice-roller.html',
  styleUrl: './dice-roller.css',
})
export class DiceRoller implements AfterViewInit, OnDestroy {
  @ViewChild('diceCanvas') private diceCanvasRef?: ElementRef<HTMLCanvasElement>;
  @ViewChild('diePhysics') private diePhysicsRef?: ElementRef<HTMLDivElement>;

  diceStatusText = 'dice.status.summoning';
  resultState: DiceResult | null = null;
  isOpen = false;
  totalHits = 0;

  private diceTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private autoCloseTimeoutId: ReturnType<typeof setTimeout> | null = null;
  // Tipado como `any`: el motor real (dice-engine.ts) se copia tal cual del
  // proyecto Vue y no lleva tipos, para no reescribir su matemática vectorial.
  private diceEngine: any = null;
  private diceHasRolled = false;
  private dicePending = false;

  private scrollPhysicsRafId: number | null = null;
  private lastFrameTime = 0;
  private lastScrollY = 0;
  private scrollVelocity = 0; // px/s, suavizada
  private diePos = 0;         // desplazamiento actual del resorte, en px
  private dieVel = 0;         // velocidad del resorte, px/s

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initDiceEngine();
    this.initScrollPhysics();
  }

  ngOnDestroy(): void {
    if (this.diceTimeoutId) clearTimeout(this.diceTimeoutId);
    if (this.autoCloseTimeoutId) clearTimeout(this.autoCloseTimeoutId);
    if (this.scrollPhysicsRafId !== null) cancelAnimationFrame(this.scrollPhysicsRafId);
    this.diceEngine?.destroy();
    if (this.isOpen) document.body.style.removeProperty('overflow');
  }

  /** Arranca el loop de física del dado, fuera de la zona de Angular para no
   *  disparar change detection en cada frame (se corre ~60 veces/segundo). */
  private initScrollPhysics(): void {
    if (!this.diePhysicsRef) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.lastScrollY = window.scrollY;
    this.lastFrameTime = performance.now();
    this.ngZone.runOutsideAngular(() => {
      this.scrollPhysicsRafId = requestAnimationFrame(this.tickScrollPhysics);
    });
  }

  private tickScrollPhysics = (time: number): void => {
    const dt = Math.min((time - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = time;

    const y = window.scrollY;
    const instVelocity = dt > 0 ? (y - this.lastScrollY) / dt : 0;
    this.lastScrollY = y;
    this.scrollVelocity += (instVelocity - this.scrollVelocity) * VELOCITY_SMOOTHING;

    // Scroll hacia abajo (velocidad +) -> el dado sube (offset -).
    // Scroll hacia arriba (velocidad -) -> el dado baja (offset +).
    const target = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, -this.scrollVelocity * SCROLL_IMPULSE));

    const accel = SPRING_STIFFNESS * (target - this.diePos) - SPRING_DAMPING * this.dieVel;
    this.dieVel += accel * dt;
    this.diePos += this.dieVel * dt;

    if (this.diePhysicsRef) {
      this.diePhysicsRef.nativeElement.style.transform = `translateY(${this.diePos.toFixed(2)}px)`;
    }

    this.scrollPhysicsRafId = requestAnimationFrame(this.tickScrollPhysics);
  };

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.closeTray();
  }

  private initDiceEngine(): void {
    const canvas = this.diceCanvasRef?.nativeElement;
    if (!canvas) return;
    this.diceEngine = new DiceEngine(canvas, {
      count: DICE_COUNT,
      view: 'top',
      interactive: false,
      showBoard: false,
      markFrom: 5,
      theme: THEME_CLASICO,
      onSettled: (result: { marked: number }) => {
        if (!this.diceHasRolled) return;
        this.finishRoll(result.marked, DICE_COUNT);
      }
    });
  }

  /** Abre la bandeja de dados a pantalla completa y lanza la tirada al instante. */
  openTray(): void {
    if (this.isOpen || !this.diceEngine) return;
    if (this.autoCloseTimeoutId) {
      clearTimeout(this.autoCloseTimeoutId);
      this.autoCloseTimeoutId = null;
    }
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    this.diceEngine.start();
    this.rollDice();
  }

  closeTray(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    document.body.style.removeProperty('overflow');
    this.diceEngine?.stop();
    if (this.autoCloseTimeoutId) {
      clearTimeout(this.autoCloseTimeoutId);
      this.autoCloseTimeoutId = null;
    }
  }

  private rollDice(): void {
    if (!this.diceEngine) return;
    if (this.diceTimeoutId) {
      clearTimeout(this.diceTimeoutId);
      this.diceTimeoutId = null;
    }
    this.diceHasRolled = true;
    this.dicePending = true;
    this.resultState = null;
    this.diceStatusText = 'dice.status.rolling';
    this.diceEngine.roll(1);
    // Salvaguarda: con muchos dados la física a veces no declara "asentado" del
    // todo (varios cuerpos rozándose sin llegar nunca a la calma exacta). Si
    // tarda demasiado, se da el resultado por bueno igualmente.
    this.diceTimeoutId = setTimeout(() => {
      this.finishRoll(this.diceEngine!.marked, DICE_COUNT);
    }, 4500);
  }

  private finishRoll(marked: number, total: number): void {
    if (!this.dicePending) return;
    this.dicePending = false;
    if (this.diceTimeoutId) {
      clearTimeout(this.diceTimeoutId);
      this.diceTimeoutId = null;
    }
    this.resultState = { marked, total };
    this.totalHits += marked;
    // Deja el resultado a la vista un momento y luego cierra la bandeja sola.
    this.autoCloseTimeoutId = setTimeout(() => this.closeTray(), RESULT_DISPLAY_MS);
  }
}
