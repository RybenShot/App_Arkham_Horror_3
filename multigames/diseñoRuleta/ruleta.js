/**
 * Ruleta de selección — mecánica pura, sin estética.
 * Sin dependencias. Funciona igual dentro de Vue, Fable/JS o HTML plano.
 *
 * Cada entrada de `cartas` es un objeto tuyo, con los campos que quieras.
 * El único campo que lee el módulo es el peso (configurable con `peso`).
 * El objeto ganador se devuelve tal cual, sin copiar ni mutar.
 *
 * CSS mínimo obligatorio (el resto es cosa tuya):
 *   .ruleta      { position:relative; overflow:hidden; }
 *   .ruleta-cinta{ display:flex; will-change:transform; }
 *   .ruleta-carta{ flex:0 0 auto; }
 */
export class Ruleta {
  /**
   * @param {HTMLElement} contenedor  elemento con overflow hidden
   * @param {Object} opciones
   * @param {Array<Object>} opciones.cartas    baraja de objetos disponibles
   * @param {(c:Object)=>number} [opciones.peso]     peso relativo de cada carta (por defecto 1)
   * @param {(c:Object)=>string|Node} opciones.render  cómo se dibuja una carta
   * @param {number} [opciones.ancho=120]      ancho de carta en px
   * @param {number} [opciones.separacion=10]  hueco entre cartas en px
   * @param {number} [opciones.largo=60]       cartas que se generan en la cinta
   * @param {number} [opciones.indiceGanador]  posición del premio en la cinta
   * @param {number} [opciones.duracion=6000]  ms de giro
   * @param {number} [opciones.tension=4.4]    dureza de la frenada (más alto = frena más tarde)
   * @param {(c:Object,i:number)=>void} [opciones.onPaso]  se dispara al pasar cada carta por la aguja
   */
  constructor(contenedor, opciones = {}) {
    this.el = contenedor;
    this.o = Object.assign({
      cartas: [],
      peso: () => 1,
      render: (c) => String(c.nombre ?? c.id ?? ''),
      ancho: 120,
      separacion: 10,
      largo: 60,
      indiceGanador: null,
      duracion: 6000,
      tension: 4.4,
      onPaso: null
    }, opciones);

    if (this.o.indiceGanador === null) {
      this.o.indiceGanador = Math.floor(this.o.largo * 0.85);
    }

    this.girando = false;
    this.cinta = document.createElement('div');
    this.cinta.className = 'ruleta-cinta';
    this.el.appendChild(this.cinta);
    this.pintar(this.generar(12)); // relleno inicial
  }

  get paso() { return this.o.ancho + this.o.separacion; }

  /** Sorteo ponderado. Aislado a propósito: sustitúyelo si el resultado lo decide tu servidor. */
  elegir() {
    const cartas = this.o.cartas;
    let total = 0;
    for (const c of cartas) total += Math.max(0, this.o.peso(c));
    if (total <= 0) return cartas[Math.floor(Math.random() * cartas.length)];
    let n = Math.random() * total;
    for (const c of cartas) {
      n -= Math.max(0, this.o.peso(c));
      if (n <= 0) return c;
    }
    return cartas[cartas.length - 1];
  }

  generar(n) {
    return Array.from({ length: n }, () => this.elegir());
  }

  pintar(lista) {
    this.cinta.textContent = '';
    for (const carta of lista) {
      const nodo = document.createElement('div');
      nodo.className = 'ruleta-carta';
      nodo.style.width = this.o.ancho + 'px';
      nodo.style.marginRight = this.o.separacion + 'px';
      const contenido = this.o.render(carta);
      if (contenido instanceof Node) nodo.appendChild(contenido);
      else nodo.innerHTML = contenido;
      nodo.__carta = carta;           // referencia al objeto original
      this.cinta.appendChild(nodo);
    }
    this.cinta.style.transform = 'translate3d(0,0,0)';
  }

  /**
   * Lanza el giro.
   * @param {Object} [premio] resultado forzado (útil si lo decide el servidor)
   * @returns {Promise<Object>} el objeto ganador
   */
  girar(premio) {
    if (this.girando) return Promise.reject(new Error('ya está girando'));
    if (!this.o.cartas.length) return Promise.reject(new Error('no hay cartas'));
    this.girando = true;

    const ganadora = premio ?? this.elegir();
    const idx = this.o.indiceGanador;
    const lista = this.generar(this.o.largo);
    lista[idx] = ganadora;
    this.pintar(lista);

    // La carta ganadora queda bajo el centro del contenedor, con desvío
    // aleatorio dentro de su propio ancho para que no caiga siempre clavada.
    const centro = this.el.clientWidth / 2;
    const desvio = (Math.random() - 0.5) * this.o.ancho * 0.7;
    const destino = idx * this.paso + this.o.ancho / 2 - centro + desvio;

    const lento = matchMedia('(prefers-reduced-motion: reduce)').matches;

    return new Promise((resolver) => {
      const fin = () => {
        this.cinta.style.transform = `translate3d(${-destino}px,0,0)`;
        this.girando = false;
        this.el.dispatchEvent(new CustomEvent('ruleta:fin', { detail: ganadora }));
        resolver(ganadora);
      };
      if (lento) return fin();

      const t0 = performance.now();
      let ultimo = -1;
      const marco = (t) => {
        const p = Math.min(1, (t - t0) / this.o.duracion);
        const e = 1 - Math.pow(1 - p, this.o.tension); // frenada exponencial
        const x = destino * e;
        this.cinta.style.transform = `translate3d(${-x}px,0,0)`;

        if (this.o.onPaso) {
          const i = Math.round((x + centro) / this.paso);
          if (i !== ultimo) {
            ultimo = i;
            this.o.onPaso(lista[i], i, 1 - e); // 1-e = velocidad restante, 1 → 0
          }
        }
        if (p < 1) requestAnimationFrame(marco); else fin();
      };
      requestAnimationFrame(marco);
    });
  }

  /** Recalcula tras un cambio de tamaño o de baraja. */
  reiniciar(cartas) {
    if (cartas) this.o.cartas = cartas;
    if (!this.girando) this.pintar(this.generar(12));
  }

  destruir() {
    this.girando = false;
    this.cinta.remove();
  }
}

export default Ruleta;
