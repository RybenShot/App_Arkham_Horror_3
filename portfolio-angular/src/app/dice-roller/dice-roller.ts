import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import DiceEngine from '../dice-engine';

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

@Component({
  selector: 'app-dice-roller',
  imports: [],
  templateUrl: './dice-roller.html',
  styleUrl: './dice-roller.css',
})
export class DiceRoller implements AfterViewInit, OnDestroy {
  @ViewChild('diceCanvas') private diceCanvasRef?: ElementRef<HTMLCanvasElement>;

  diceCount = 3;
  rollDisabled = false;
  diceStatusText = 'Pulsa "Tirar" para lanzar los dados.';
  resultState: DiceResult | null = null;

  private diceTimeoutId: ReturnType<typeof setTimeout> | null = null;
  // Tipado como `any`: el motor real (dice-engine.ts) se copia tal cual del
  // proyecto Vue y no lleva tipos, para no reescribir su matemática vectorial.
  private diceEngine: any = null;
  private diceHasRolled = false;
  private dicePending = false;

  ngAfterViewInit(): void {
    this.initDiceEngine();
  }

  ngOnDestroy(): void {
    if (this.diceTimeoutId) clearTimeout(this.diceTimeoutId);
    this.diceEngine?.destroy();
  }

  private initDiceEngine(): void {
    const canvas = this.diceCanvasRef?.nativeElement;
    if (!canvas) return;
    this.diceEngine = new DiceEngine(canvas, {
      count: this.diceCount,
      view: 'top',
      interactive: false,
      showBoard: false,
      markFrom: 5,
      theme: THEME_CLASICO,
      onSettled: (result: { marked: number }) => {
        if (!this.diceHasRolled) return;
        this.finishRoll(result.marked, this.diceCount);
      }
    });
    this.diceEngine.start();
  }

  decDice(): void {
    this.diceCount = Math.max(1, this.diceCount - 1);
    this.diceEngine?.setCount(this.diceCount);
  }

  incDice(): void {
    this.diceCount = Math.min(6, this.diceCount + 1);
    this.diceEngine?.setCount(this.diceCount);
  }

  rollDice(): void {
    if (!this.diceEngine) return;
    this.rollDisabled = true;
    this.diceHasRolled = true;
    this.dicePending = true;
    this.resultState = null;
    this.diceStatusText = 'Rodando…';
    this.diceEngine.roll(1);
    // Salvaguarda: con muchos dados la física a veces no declara "asentado" del
    // todo (varios cuerpos rozándose sin llegar nunca a la calma exacta). Si
    // tarda demasiado, se da el resultado por bueno igualmente.
    this.diceTimeoutId = setTimeout(() => {
      this.finishRoll(this.diceEngine!.marked, this.diceEngine!.dice.length);
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
    this.rollDisabled = false;
  }
}
