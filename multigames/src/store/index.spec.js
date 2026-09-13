import { describe, it, expect, beforeEach } from 'vitest'
import store from './index.js'

describe('store mutations', () => {
  beforeEach(() => {
    store.state.datosPJactual.atributes.money = 2
    store.state.fichasConcentracion = []
    store.state.diceImages = []
    store.state.achievements = []
    store.state.coins = 0
    store.state.musicaActiva = true
  })

  it('updateMoney suma y restarDinero/sumarDinero ajustan el dinero del investigador', () => {
    store.commit('updateMoney', 5)
    expect(store.state.datosPJactual.atributes.money).toBe(7)

    store.commit('restarDinero', 3)
    expect(store.state.datosPJactual.atributes.money).toBe(4)

    store.commit('sumarDinero', 1)
    expect(store.state.datosPJactual.atributes.money).toBe(5)
  })

  it('restarDinero puede dejar el dinero en negativo (no hay guarda contra saldo insuficiente)', () => {
    store.commit('restarDinero', 100)
    expect(store.state.datosPJactual.atributes.money).toBe(2 - 100)
  })

  it('removeConcentrationToken no rompe si no quedan fichas', () => {
    expect(store.state.fichasConcentracion).toHaveLength(0)
    expect(() => store.commit('removeConcentrationToken')).not.toThrow()
    expect(store.state.fichasConcentracion).toHaveLength(0)
  })

  it('addConcentrationToken/removeConcentrationToken respetan el orden FIFO', () => {
    store.commit('addConcentrationToken', 'ficha-1')
    store.commit('addConcentrationToken', 'ficha-2')
    expect(store.state.fichasConcentracion).toEqual(['ficha-1', 'ficha-2'])

    store.commit('removeConcentrationToken')
    expect(store.state.fichasConcentracion).toEqual(['ficha-2'])
  })

  it('setDiceImages/setAchievements/setCoins caen a un valor seguro si reciben null o undefined', () => {
    store.commit('setDiceImages', null)
    expect(store.state.diceImages).toEqual([])

    store.commit('setAchievements', undefined)
    expect(store.state.achievements).toEqual([])

    store.commit('setCoins', null)
    expect(store.state.coins).toBe(0)
  })

  it('setCoins acepta 0 explícito sin perderlo por el fallback', () => {
    store.state.coins = 50
    store.commit('setCoins', 0)
    expect(store.state.coins).toBe(0)
  })

  it('toggleModal cambia cualquier flag de modal por nombre', () => {
    store.commit('toggleModal', { modal: 'modalPertenenciasDetalle', modalState: true })
    expect(store.state.modalPertenenciasDetalle).toBe(true)

    store.commit('toggleModal', { modal: 'modalPertenenciasDetalle', modalState: false })
    expect(store.state.modalPertenenciasDetalle).toBe(false)
  })

  it('SET_MUSICA_ACTIVA guarda exactamente el valor recibido', () => {
    store.commit('SET_MUSICA_ACTIVA', false)
    expect(store.state.musicaActiva).toBe(false)
  })
})
