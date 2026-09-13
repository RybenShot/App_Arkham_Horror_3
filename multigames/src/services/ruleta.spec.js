import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Ruleta } from './ruleta.js'

function crearRuleta(opciones) {
  const contenedor = document.createElement('div')
  return new Ruleta(contenedor, opciones)
}

describe('Ruleta.elegir()', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('respeta el peso relativo de cada carta', () => {
    const cartas = [{ id: 'a', peso: 3 }, { id: 'b', peso: 7 }]
    const ruleta = crearRuleta({ cartas, peso: (c) => c.peso })

    // total = 10. random()=0.2 -> n=2 -> cae dentro del tramo de "a" (peso 3)
    vi.spyOn(Math, 'random').mockReturnValue(0.2)
    expect(ruleta.elegir().id).toBe('a')

    // random()=0.5 -> n=5 -> ya pasó el tramo de "a" (3), cae en "b"
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    expect(ruleta.elegir().id).toBe('b')
  })

  it('trata los pesos negativos como cero en vez de restar probabilidad a las demás', () => {
    const cartas = [{ id: 'negativa', peso: -5 }, { id: 'positiva', peso: 5 }]
    const ruleta = crearRuleta({ cartas, peso: (c) => c.peso })

    // total real = 5 (la negativa aporta 0). Con random()=0.5 no debería
    // "tomar prestado" probabilidad de la negativa ni devolverla a ella.
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    expect(ruleta.elegir().id).toBe('positiva')
  })

  it('si todas las cartas tienen peso 0, cae a un sorteo uniforme en vez de romperse', () => {
    const cartas = [{ id: 'a', peso: 0 }, { id: 'b', peso: 0 }, { id: 'c', peso: 0 }]
    const ruleta = crearRuleta({ cartas, peso: (c) => c.peso })

    vi.spyOn(Math, 'random').mockReturnValue(0.999)
    // total<=0 -> Math.floor(0.999 * 3) = 2 -> cartas[2]
    expect(ruleta.elegir().id).toBe('c')
  })

  it('con una sola carta, siempre la devuelve', () => {
    const cartas = [{ id: 'unica', peso: 1 }]
    const ruleta = crearRuleta({ cartas, peso: (c) => c.peso })

    expect(ruleta.elegir().id).toBe('unica')
  })
})

describe('Ruleta.girar()', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }))
    vi.stubGlobal('requestAnimationFrame', vi.fn()) // nunca avanza la animación a propósito
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('rechaza si no hay cartas cargadas', async () => {
    const ruleta = crearRuleta({ cartas: [] })
    await expect(ruleta.girar()).rejects.toThrow('no hay cartas')
  })

  it('rechaza una segunda llamada mientras ya está girando', async () => {
    const ruleta = crearRuleta({ cartas: [{ id: 1 }, { id: 2 }] })

    ruleta.girar() // queda "girando" porque requestAnimationFrame está mockeado y no resuelve
    await expect(ruleta.girar()).rejects.toThrow('ya está girando')
  })

  it('respeta el premio forzado en vez de sortear uno nuevo', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true })) // sin animación, resuelve ya
    const cartas = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    const ruleta = crearRuleta({ cartas, largo: 5 })

    const premio = cartas[1]
    const ganador = await ruleta.girar(premio)
    expect(ganador).toBe(premio)
  })
})
