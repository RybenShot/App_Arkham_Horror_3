<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold">🤝 Intercambio</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal()"></i>
        </header>

        <section class="modal-card-body py-3" style="min-height: 300px;">

          <!-- LOADING -->
          <div v-if="tradeStatus === 'loading'" class="has-text-centered py-5">
            <button class="button is-loading is-white is-large is-rounded"></button>
            <p class="mt-3 subtitle is-6">Cargando intercambio...</p>
          </div>

          <!-- HOST: composing offer -->
          <div v-else-if="tradeStatus === 'waitingOffer' && isHost">
            <p class="title is-5 has-text-centered mb-3">Preparar oferta</p>

            <p class="label is-small mb-1">
              Objetos de <strong>{{ rivalName }}</strong>
              <span class="tag is-light ml-1">selecciona lo que quieres</span>
            </p>
            <div v-if="rivalPossessions.length === 0" class="notification is-light py-2 mb-3">
              <p class="is-size-7 has-text-centered">{{ rivalName }} no tiene objetos</p>
            </div>
            <div class="columns is-mobile is-multiline is-gapless mb-4" v-else>
              <div v-for="item in rivalPossessions" :key="item.id" class="column is-half p-1">
                <div class="box py-2 px-3 item-card"
                  :class="{ 'is-selected-want': isSelectedWant(item.id) }"
                  @click="toggleWant(item.id)">
                  <p class="is-size-7 has-text-weight-semibold">{{ itemName(item) }}</p>
                  <span v-if="isSelectedWant(item.id)" class="tag is-warning is-small mt-1">🔍 Quiero</span>
                </div>
              </div>
            </div>

            <p class="label is-small mb-1">
              Mis objetos
              <span class="tag is-light ml-1">selecciona lo que ofreces</span>
            </p>
            <div v-if="myPossessions.length === 0" class="notification is-light py-2 mb-3">
              <p class="is-size-7 has-text-centered">No tienes objetos para ofrecer</p>
            </div>
            <div class="columns is-mobile is-multiline is-gapless mb-3" v-else>
              <div v-for="item in myPossessions" :key="item.id" class="column is-half p-1">
                <div class="box py-2 px-3 item-card"
                  :class="{ 'is-selected-give': isSelectedGive(item.id) }"
                  @click="toggleGive(item.id)">
                  <p class="is-size-7 has-text-weight-semibold">{{ itemName(item) }}</p>
                  <span v-if="isSelectedGive(item.id)" class="tag is-info is-small mt-1">↑ Ofrezco</span>
                </div>
              </div>
            </div>

            <div class="box has-background-light mb-3">
              <p class="is-size-7 mb-1"><strong>Resumen:</strong></p>
              <p class="is-size-7">🎁 Das: {{ selectedGive.length > 0 ? selectedGive.map(id => itemNameById(id, 'mine')).join(', ') : 'Nada' }}</p>
              <p class="is-size-7">🔍 Quieres: {{ selectedWant.length > 0 ? selectedWant.map(id => itemNameById(id, 'rival')).join(', ') : 'Nada' }}</p>
            </div>

            <button class="button is-success is-fullwidth" @click="sendOffer()">
              📤 Enviar oferta
            </button>
          </div>

          <!-- GUEST: waiting for host's offer -->
          <div v-else-if="tradeStatus === 'waitingOffer' && !isHost" class="has-text-centered py-5">
            <button class="button is-loading is-white is-large is-rounded"></button>
            <p class="mt-3 subtitle is-6">{{ rivalName }} está preparando una oferta...</p>
          </div>

          <!-- HOST: offer sent, waiting for guest -->
          <div v-else-if="tradeStatus === 'offerPending' && isHost" class="has-text-centered py-3">
            <button class="button is-loading is-white is-large is-rounded mb-3"></button>
            <p class="subtitle is-6">Esperando respuesta de {{ rivalName }}...</p>
            <div class="box mx-2 mt-2 has-text-left">
              <p class="is-size-7 has-text-grey mb-2"><strong>Tu oferta enviada:</strong></p>
              <p class="is-size-7 mb-1">🎁 <strong>Das:</strong> {{ formatIdList(currentOffer.fromHost, 'mine') }}</p>
              <p class="is-size-7">🔍 <strong>Quieres:</strong> {{ formatIdList(currentOffer.fromGuest, 'rival') }}</p>
            </div>
          </div>

          <!-- GUEST: reviewing offer -->
          <div v-else-if="tradeStatus === 'offerPending' && !isHost">
            <p class="title is-5 has-text-centered mb-3">Oferta de {{ rivalName }}</p>

            <div class="box mb-3">
              <p class="label is-small mb-2">{{ rivalName }} te ofrece:</p>
              <div v-if="currentOffer.fromHost.length === 0" class="has-text-grey is-size-7 mb-2">Nada</div>
              <div class="tags" v-else>
                <span v-for="id in currentOffer.fromHost" :key="id" class="tag is-success is-light is-medium">
                  🎁 {{ itemNameById(id, 'rival') }}
                </span>
              </div>

              <hr class="my-2">

              <p class="label is-small mb-2">A cambio quiere de ti:</p>
              <div v-if="currentOffer.fromGuest.length === 0" class="has-text-grey is-size-7 mb-2">Nada</div>
              <div class="tags" v-else>
                <span v-for="id in currentOffer.fromGuest" :key="id" class="tag is-warning is-light is-medium">
                  📦 {{ itemNameById(id, 'mine') }}
                </span>
              </div>
            </div>

            <div class="buttons is-centered mb-0" v-if="!makingCounteroffer">
              <button class="button is-success is-medium" @click="acceptOffer()">✅ Aceptar</button>
              <button class="button is-warning is-medium" @click="startCounteroffer()">🔄 Contraoferta</button>
            </div>

            <!-- Counteroffer builder -->
            <div v-if="makingCounteroffer" class="mt-3">
              <hr>
              <p class="title is-6 mb-1">Tu contraoferta</p>
              <p class="is-size-7 has-text-grey mb-3">
                {{ rivalName }} seguirá ofreciendo los mismos objetos. Selecciona qué darás tú en cambio.
              </p>

              <p class="label is-small mb-1">Selecciona lo que ofreces:</p>
              <div v-if="myPossessions.length === 0" class="notification is-light py-2 mb-2">
                <p class="is-size-7 has-text-centered">No tienes objetos para ofrecer</p>
              </div>
              <div class="columns is-mobile is-multiline is-gapless mb-3" v-else>
                <div v-for="item in myPossessions" :key="item.id" class="column is-half p-1">
                  <div class="box py-2 px-3 item-card"
                    :class="{ 'is-selected-give': isCounterSelectedGive(item.id) }"
                    @click="toggleCounterGive(item.id)">
                    <p class="is-size-7 has-text-weight-semibold">{{ itemName(item) }}</p>
                    <span v-if="isCounterSelectedGive(item.id)" class="tag is-success is-small mt-1">↑ Ofrezco</span>
                  </div>
                </div>
              </div>

              <button class="button is-warning is-fullwidth mb-2" @click="sendCounteroffer()">📤 Enviar contraoferta</button>
              <button class="button is-light is-fullwidth" @click="makingCounteroffer = false">Volver</button>
            </div>
          </div>

          <!-- GUEST: counteroffer sent, waiting for host -->
          <div v-else-if="tradeStatus === 'counterofferPending' && !isHost" class="has-text-centered py-5">
            <button class="button is-loading is-white is-large is-rounded mb-3"></button>
            <p class="subtitle is-6">Esperando respuesta de {{ rivalName }}...</p>
            <div class="box mx-2 mt-2">
              <p class="is-size-7 has-text-grey">Tu contraoferta fue enviada.</p>
            </div>
          </div>

          <!-- HOST: reviewing counteroffer -->
          <div v-else-if="tradeStatus === 'counterofferPending' && isHost">
            <p class="title is-5 has-text-centered mb-3">Contraoferta de {{ rivalName }}</p>

            <div class="box mb-3">
              <p class="label is-small mb-2">{{ rivalName }} propone dar:</p>
              <div v-if="currentCounteroffer.fromGuest.length === 0" class="has-text-grey is-size-7 mb-2">Nada</div>
              <div class="tags" v-else>
                <span v-for="id in currentCounteroffer.fromGuest" :key="id" class="tag is-warning is-light is-medium">
                  📦 {{ itemNameById(id, 'rival') }}
                </span>
              </div>

              <hr class="my-2">

              <p class="label is-small mb-2">A cambio recibirá de ti (tu oferta original):</p>
              <div v-if="currentCounteroffer.fromHost.length === 0" class="has-text-grey is-size-7 mb-2">Nada</div>
              <div class="tags" v-else>
                <span v-for="id in currentCounteroffer.fromHost" :key="id" class="tag is-info is-light is-medium">
                  🎁 {{ itemNameById(id, 'mine') }}
                </span>
              </div>
            </div>

            <div class="buttons is-centered">
              <button class="button is-success is-medium" @click="acceptCounteroffer()">✅ Aceptar</button>
              <button class="button is-danger is-medium" @click="rejectCounteroffer()">❌ Rechazar</button>
            </div>
          </div>

          <!-- FINISHED: trade completed -->
          <div v-else-if="tradeStatus === 'finished'">
            <div class="notification is-success is-light has-text-centered">
              <p class="title is-3 has-text-success mb-2">🤝 ¡Intercambio realizado!</p>
              <p class="subtitle is-6 mb-3">Los objetos han sido intercambiados.</p>

              <div class="box mb-2">
                <p class="is-size-7 has-text-grey mb-1">Recibiste:</p>
                <div v-if="myNewItems.length === 0" class="has-text-grey is-size-7">Ningún objeto</div>
                <div class="tags is-centered" v-else>
                  <span v-for="item in myNewItems" :key="item.id" class="tag is-success is-medium">🎁 {{ itemName(item) }}</span>
                </div>
              </div>

              <div class="box">
                <p class="is-size-7 has-text-grey mb-1">Diste:</p>
                <div v-if="myLostItems.length === 0" class="has-text-grey is-size-7">Ningún objeto</div>
                <div class="tags is-centered" v-else>
                  <span v-for="item in myLostItems" :key="item.id" class="tag is-light is-medium">📤 {{ itemName(item) }}</span>
                </div>
              </div>

              <button class="button is-success mt-3" @click="closeFinished()">Cerrar</button>
            </div>
          </div>

          <!-- CANCELLED -->
          <div v-else-if="tradeStatus === 'cancelled'" class="has-text-centered">
            <div class="notification is-warning is-light">
              <p class="title is-4 mb-2">Intercambio cancelado</p>
              <p class="subtitle is-6">No se realizó ningún intercambio.</p>
              <button class="button is-warning mt-2" @click="closeFinished()">Cerrar</button>
            </div>
          </div>

        </section>

        <footer v-if="tradeStatus !== 'finished' && tradeStatus !== 'cancelled'" class="">
          <button @click="closeModal()" class="button is-danger is-fullwidth">
            Cancelar intercambio
          </button>
        </footer>

      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js'

export default {
  name: 'EventoIntercambio',
  data() {
    return {
      tradeStatus: 'loading',
      isHost: false,
      rivalName: '',
      myPossessions: [],
      rivalPossessions: [],

      selectedWant: [],
      selectedGive: [],
      counterSelectedGive: [],
      makingCounteroffer: false,

      currentOffer: { fromHost: [], fromGuest: [] },
      currentCounteroffer: { fromHost: [], fromGuest: [] },

      myNewItems: [],
      myLostItems: [],

      tradeApplied: false,
      pollingInterval: null,
      idInteraction: null,
      myIdUser: null,
    }
  },
  methods: {

    itemName(item) {
      return item?.translations?.es?.name || item?.name || 'Objeto desconocido'
    },

    itemNameById(id, who) {
      const list = who === 'mine' ? this.myPossessions : this.rivalPossessions
      const item = list.find(p => p.id == id)
      return item ? this.itemName(item) : `Objeto (${id})`
    },

    formatIdList(ids, who) {
      if (!ids || ids.length === 0) return 'Nada'
      return ids.map(id => this.itemNameById(id, who)).join(', ')
    },

    isSelectedWant(id) { return this.selectedWant.includes(id) },
    isSelectedGive(id) { return this.selectedGive.includes(id) },
    isCounterSelectedGive(id) { return this.counterSelectedGive.includes(id) },

    toggleWant(id) {
      const idx = this.selectedWant.indexOf(id)
      if (idx === -1) this.selectedWant.push(id)
      else this.selectedWant.splice(idx, 1)
      console.log('🔍 [toggleWant]', this.selectedWant)
    },
    toggleGive(id) {
      const idx = this.selectedGive.indexOf(id)
      if (idx === -1) this.selectedGive.push(id)
      else this.selectedGive.splice(idx, 1)
      console.log('📦 [toggleGive]', this.selectedGive)
    },
    toggleCounterGive(id) {
      const idx = this.counterSelectedGive.indexOf(id)
      if (idx === -1) this.counterSelectedGive.push(id)
      else this.counterSelectedGive.splice(idx, 1)
      console.log('🔄 [toggleCounterGive]', this.counterSelectedGive)
    },

    initPlayers() {
      const interaction = this.$store.state.interactionData
      const myId = this.$store.state.IDUserHost
      this.isHost = interaction.idUserHost === myId
      console.log('👤 [initPlayers] isHost:', this.isHost, '| myId:', myId)

      const getItems = (invData) => {
        if (Array.isArray(invData?.possessionsInPlay) && invData.possessionsInPlay.length > 0) return invData.possessionsInPlay
        if (Array.isArray(invData?.possessions)) return invData.possessions
        console.warn('⚠️ [getItems] no se encontraron objetos en:', invData)
        return []
      }

      if (this.isHost) {
        this.rivalName = interaction.nameUserGest || 'Invitado'
        this.myPossessions = getItems(interaction.event.invDataHost)
        this.rivalPossessions = getItems(interaction.event.invDataGest)
      } else {
        this.rivalName = interaction.nameUserHost || 'Anfitrión'
        this.myPossessions = getItems(interaction.event.invDataGest)
        this.rivalPossessions = getItems(interaction.event.invDataHost)
      }
      console.log('💼 [initPlayers] mis objetos:', this.myPossessions.length, '| objetos rival:', this.rivalPossessions.length)
    },

    startPolling() {
      console.log('🔄 [startPolling] iniciando polling de intercambio')
      this.pollingInterval = setInterval(async () => {
        try {
          const result = await apiService.getGameState(this.idInteraction, this.myIdUser)
          if (!result || !result.interaction) return
          const tradeData = result.interaction.event.tradeData
          if (!tradeData) return
          console.log('📡 [polling] tradeData.status:', tradeData.status)
          this.syncTradeState(tradeData)
        } catch (e) {
          console.error('❌ [polling] error:', e)
        }
      }, 3000)
    },

    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval)
        this.pollingInterval = null
        console.log('⏹️ [stopPolling] polling detenido')
      }
    },

    syncTradeState(tradeData) {
      const prev = this.tradeStatus
      switch (tradeData.status) {
        case 'waitingOffer':
          this.tradeStatus = 'waitingOffer'
          break
        case 'offerPending':
          this.currentOffer = tradeData.offer || { fromHost: [], fromGuest: [] }
          this.tradeStatus = 'offerPending'
          break
        case 'counterofferPending':
          this.currentOffer = tradeData.offer || { fromHost: [], fromGuest: [] }
          this.currentCounteroffer = tradeData.counteroffer || { fromHost: [], fromGuest: [] }
          this.tradeStatus = 'counterofferPending'
          break
        case 'finished':
          if (!this.tradeApplied && tradeData.result === 'accepted') {
            this.applyTrade(tradeData.finalDeal)
          } else if (tradeData.result !== 'accepted') {
            this.tradeStatus = 'cancelled'
            this.stopPolling()
          }
          break
        case 'cancelled':
          this.tradeStatus = 'cancelled'
          this.stopPolling()
          break
      }
      if (prev !== this.tradeStatus) {
        console.log(`🔄 [syncTradeState] ${prev} → ${this.tradeStatus}`)
      }
    },

    applyTrade(finalDeal) {
      if (this.tradeApplied) return
      this.tradeApplied = true
      console.log('🤝 [applyTrade] aplicando trato:', finalDeal)

      const possessions = Array.isArray(this.$store.state.datosPJactual.possessions)
        ? [...this.$store.state.datosPJactual.possessions]
        : [...(this.$store.state.possessionsInPlay || [])]
      let itemsReceived = []
      let itemsLost = []

      if (this.isHost) {
        itemsLost = (finalDeal.fromHost || []).map(id => this.findItem(id, 'mine')).filter(Boolean)
        itemsReceived = (finalDeal.fromGuest || []).map(id => this.findItem(id, 'rival')).filter(Boolean)
      } else {
        itemsLost = (finalDeal.fromGuest || []).map(id => this.findItem(id, 'mine')).filter(Boolean)
        itemsReceived = (finalDeal.fromHost || []).map(id => this.findItem(id, 'rival')).filter(Boolean)
      }

      const lostIds = itemsLost.map(i => i.id)
      const newPossessions = possessions.filter(p => !lostIds.includes(p.id))
      itemsReceived.forEach(item => newPossessions.push(item))
      if (Array.isArray(this.$store.state.datosPJactual.possessions)) {
        this.$store.state.datosPJactual.possessions = newPossessions
      } else {
        this.$store.state.possessionsInPlay = newPossessions
      }

      this.myNewItems = itemsReceived
      this.myLostItems = itemsLost

      console.log('📥 [applyTrade] recibidos:', itemsReceived.map(i => this.itemName(i)))
      console.log('📤 [applyTrade] dados:', itemsLost.map(i => this.itemName(i)))

      this.saveInvestigadorToAPI()
      this.tradeStatus = 'finished'
      this.stopPolling()
    },

    findItem(id, who) {
      const list = who === 'mine' ? this.myPossessions : this.rivalPossessions
      return list.find(p => p.id == id) || null
    },

    async saveInvestigadorToAPI() {
      try {
        const idUser = this.$store.state.IDUserHost
        const payload = { ...this.$store.state.datosPJactual, idUser }
        console.log('💾 [saveInvestigadorToAPI] guardando investigador:', idUser)
        await apiService.postInvOnLine(payload)
        console.log('✅ [saveInvestigadorToAPI] guardado correctamente')
      } catch (e) {
        console.error('❌ [saveInvestigadorToAPI] Error:', e)
      }
    },

    async sendOffer() {
      const fromHost = [...this.selectedGive]
      const fromGuest = [...this.selectedWant]
      console.log('📤 [sendOffer] fromHost (yo doy):', fromHost, '| fromGuest (yo quiero):', fromGuest)
      try {
        await apiService.sendTradeOffer(this.idInteraction, this.myIdUser, fromHost, fromGuest)
        this.currentOffer = { fromHost, fromGuest }
        this.tradeStatus = 'offerPending'
        this.$buefy.toast.open({ message: 'Oferta enviada', type: 'is-success', duration: 2000 })
      } catch (e) {
        console.error('❌ [sendOffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al enviar oferta', type: 'is-danger', duration: 3000 })
      }
    },

    async acceptOffer() {
      console.log('✅ [acceptOffer] aceptando oferta')
      try {
        await apiService.guestRespondToTradeOffer(this.idInteraction, this.myIdUser, 'accepted')
        this.applyTrade(this.currentOffer)
      } catch (e) {
        console.error('❌ [acceptOffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al aceptar', type: 'is-danger', duration: 3000 })
      }
    },

    startCounteroffer() {
      this.makingCounteroffer = true
      this.counterSelectedGive = []
      console.log('🔄 [startCounteroffer] abriendo pantalla de contraoferta')
    },

    async sendCounteroffer() {
      const fromHost = [...this.currentOffer.fromHost]
      const fromGuest = [...this.counterSelectedGive]
      console.log('🔄 [sendCounteroffer] fromHost:', fromHost, '| fromGuest (mi contraoferta):', fromGuest)
      try {
        await apiService.guestRespondToTradeOffer(this.idInteraction, this.myIdUser, 'counteroffer', fromHost, fromGuest)
        this.currentCounteroffer = { fromHost, fromGuest }
        this.makingCounteroffer = false
        this.tradeStatus = 'counterofferPending'
        this.$buefy.toast.open({ message: 'Contraoferta enviada', type: 'is-warning', duration: 2000 })
      } catch (e) {
        console.error('❌ [sendCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al enviar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    async acceptCounteroffer() {
      console.log('✅ [acceptCounteroffer] aceptando contraoferta')
      try {
        await apiService.hostResolveCounteroffer(this.idInteraction, this.myIdUser, 'accepted')
        this.applyTrade(this.currentCounteroffer)
      } catch (e) {
        console.error('❌ [acceptCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al aceptar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    async rejectCounteroffer() {
      console.log('❌ [rejectCounteroffer] rechazando contraoferta')
      try {
        await apiService.hostResolveCounteroffer(this.idInteraction, this.myIdUser, 'rejected')
        this.tradeStatus = 'cancelled'
        this.stopPolling()
        this.$buefy.toast.open({ message: 'Contraoferta rechazada', type: 'is-warning', duration: 2000 })
      } catch (e) {
        console.error('❌ [rejectCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al rechazar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    closeFinished() {
      this.$store.state.showSwithcherEventsOnLine = false
      this.$store.state.showGuestInvitationModal = false
    },

    closeModal() {
      if (this.tradeStatus === 'finished' || this.tradeStatus === 'cancelled') {
        this.closeFinished()
        return
      }
      const isEs = this.$store.state.lenguaje === 'español'
      this.$buefy.dialog.confirm({
        title: isEs ? 'Cancelar intercambio' : 'Cancel trade',
        message: isEs
          ? '¿Estás seguro? <br><strong>El intercambio se cancelará para ambos jugadores.</strong>'
          : 'Are you sure? <br><strong>The trade will be cancelled for both players.</strong>',
        confirmText: isEs ? 'Sí, cancelar' : 'Yes, cancel',
        cancelText: isEs ? 'No, volver' : 'No, go back',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          console.log('🚫 [closeModal] cancelando intercambio')
          try {
            await apiService.cancelTrade(this.idInteraction, this.myIdUser)
          } catch (e) {
            console.warn('⚠️ [closeModal] error al cancelar (puede que ya esté finalizado):', e)
          }
          this.stopPolling()
          this.closeFinished()
          this.$buefy.toast.open({
            message: isEs ? 'Intercambio cancelado' : 'Trade cancelled',
            type: 'is-warning',
            duration: 2000
          })
        }
      })
    }
  },

  mounted() {
    this.idInteraction = this.$store.state.interactionData.idInteraccionOnLine
    this.myIdUser = this.$store.state.IDUserHost
    console.log('🚀 [trade mounted] idInteraction:', this.idInteraction, '| myIdUser:', this.myIdUser)

    this.initPlayers()

    const tradeData = this.$store.state.interactionData.event.tradeData
    console.log('📊 [trade mounted] tradeData inicial:', tradeData)

    if (tradeData) {
      this.syncTradeState(tradeData)
    } else {
      this.tradeStatus = 'waitingOffer'
    }

    this.startPolling()
  },

  beforeUnmount() {
    this.stopPolling()
  }
}
</script>

<style scoped>
.item-card {
  transition: all 0.15s ease;
  cursor: pointer;
  border: 2px solid transparent;
}
.item-card:hover {
  border-color: #dbdbdb;
  transform: translateY(-1px);
}
.is-selected-want {
  border-color: #ffdd57 !important;
  background-color: #fffbeb;
}
.is-selected-give {
  border-color: #3273dc !important;
  background-color: #eef3fb;
}
.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}
</style>