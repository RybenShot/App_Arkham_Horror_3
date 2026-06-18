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

          <!-- Cargando -->
          <div v-if="tradeStatus === 'loading'" class="has-text-centered py-5">
            <button class="button is-loading is-white is-large is-rounded"></button>
            <p class="mt-3 subtitle is-6">Cargando intercambio...</p>
          </div>

          <!-- Host: preparar oferta -->
          <tradeOfferBuilder
            v-else-if="tradeStatus === 'waitingOffer' && isHost"
            :myPossessions="myPossessions"
            :rivalPossessions="rivalPossessions"
            :myAttrs="myAttrs"
            :rivalAttrs="rivalAttrs"
            :rivalName="rivalName"
            @submit="onSendOffer"
          />

          <!-- Guest: esperando oferta -->
          <tradeWaiting
            v-else-if="tradeStatus === 'waitingOffer' && !isHost"
            :message="`${rivalName} está preparando una oferta...`"
          />

          <!-- Host: oferta enviada, esperando respuesta -->
          <tradeWaiting
            v-else-if="tradeStatus === 'offerPending' && isHost"
            :message="`Esperando respuesta de ${rivalName}...`"
            :offerPreview="currentOffer"
            :myPossessions="myPossessions"
            :rivalPossessions="rivalPossessions"
          />

          <!-- Guest: revisar oferta del host -->
          <tradeOfferReview
            v-else-if="tradeStatus === 'offerPending' && !isHost && !buildingCounteroffer"
            :offer="currentOffer"
            :myPossessions="myPossessions"
            :rivalPossessions="rivalPossessions"
            :rivalName="rivalName"
            :isHost="false"
            reviewType="offer"
            @accept="onAcceptOffer"
            @counteroffer="buildingCounteroffer = true"
          />

          <!-- Guest: construir contraoferta -->
          <tradeOfferBuilder
            v-else-if="tradeStatus === 'offerPending' && !isHost && buildingCounteroffer"
            :myPossessions="myPossessions"
            :rivalPossessions="rivalPossessions"
            :myAttrs="myAttrs"
            :rivalName="rivalName"
            :isCounteroffer="true"
            @submit="onSendCounteroffer"
            @cancel="buildingCounteroffer = false"
          />

          <!-- Guest: contraoferta enviada, esperando -->
          <tradeWaiting
            v-else-if="tradeStatus === 'counterofferPending' && !isHost"
            :message="`Esperando respuesta de ${rivalName}...`"
            subNote="Tu contraoferta fue enviada."
          />

          <!-- Host: revisar contraoferta del guest -->
          <tradeOfferReview
            v-else-if="tradeStatus === 'counterofferPending' && isHost"
            :offer="currentCounteroffer"
            :myPossessions="myPossessions"
            :rivalPossessions="rivalPossessions"
            :rivalName="rivalName"
            :isHost="true"
            reviewType="counteroffer"
            @accept="onAcceptCounteroffer"
            @reject="onRejectCounteroffer"
          />

          <!-- Resultado final -->
          <tradeResult
            v-else-if="tradeStatus === 'finished' || tradeStatus === 'cancelled'"
            :cancelled="tradeStatus === 'cancelled'"
            :myNewItems="myNewItems"
            :myLostItems="myLostItems"
            :resourcesGained="resourcesGained"
            :resourcesLost="resourcesLost"
            @close="closeFinished"
          />

        </section>

        <footer v-if="tradeStatus !== 'finished' && tradeStatus !== 'cancelled'">
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
import tradeOfferBuilder from './trade/tradeOfferBuilder.vue'
import tradeOfferReview  from './trade/tradeOfferReview.vue'
import tradeWaiting      from './trade/tradeWaiting.vue'
import tradeResult       from './trade/tradeResult.vue'

export default {
  name: 'EventoIntercambio',
  components: { tradeOfferBuilder, tradeOfferReview, tradeWaiting, tradeResult },

  data() {
    return {
      myAttrs:    { money: 0, clue: 0, remnant: 0 },
      rivalAttrs: { money: 0, clue: 0, remnant: 0 },
      tradeStatus: 'loading',
      isHost: false,
      rivalName: '',
      myPossessions: [],
      rivalPossessions: [],

      buildingCounteroffer: false,

      currentOffer: {
        fromHost:  { items: [], money: 0, clue: 0, remnant: 0 },
        fromGuest: { items: [], money: 0, clue: 0, remnant: 0 }
      },
      currentCounteroffer: {
        fromHost:  { items: [], money: 0, clue: 0, remnant: 0 },
        fromGuest: { items: [], money: 0, clue: 0, remnant: 0 }
      },

      myNewItems:      [],
      myLostItems:     [],
      resourcesGained: { money: 0, clue: 0, remnant: 0 },
      resourcesLost:   { money: 0, clue: 0, remnant: 0 },

      tradeApplied: false,
      pollingInterval: null,
      idInteraction: null,
      myIdUser: null
    }
  },

  methods: {

    initPlayers() {
      const interaction = this.$store.state.interactionData
      const myId = this.$store.state.IDUserHost
      this.isHost = interaction.idUserHost === myId
      console.log('👤 [initPlayers] isHost:', this.isHost, '| myId:', myId)

      const getItems = (invData) => {
        if (Array.isArray(invData?.possessionsInPlay) && invData.possessionsInPlay.length > 0)
          return invData.possessionsInPlay
        if (Array.isArray(invData?.possessions)) return invData.possessions
        console.warn('⚠️ [getItems] no se encontraron objetos en:', invData)
        return []
      }

      if (this.isHost) {
        this.rivalName        = interaction.nameUserGest || 'Invitado'
        this.myPossessions    = getItems(interaction.event.invDataHost)
        this.rivalPossessions = getItems(interaction.event.invDataGest)
      } else {
        this.rivalName        = interaction.nameUserHost || 'Anfitrión'
        this.myPossessions    = getItems(interaction.event.invDataGest)
        this.rivalPossessions = getItems(interaction.event.invDataHost)
      }
      this.initAttrs()
      console.log('💼 [initPlayers] mis objetos:', this.myPossessions.length, '| objetos rival:', this.rivalPossessions.length)
    },

    initAttrs() {
      const interaction = this.$store.state.interactionData
      const hostAttrs = interaction.event.invDataHost?.atributes || {}
      const gestAttrs = interaction.event.invDataGest?.atributes || {}
      if (this.isHost) {
        this.myAttrs    = { money: hostAttrs.money || 0, clue: hostAttrs.clue || 0, remnant: hostAttrs.remnant || 0 }
        this.rivalAttrs = { money: gestAttrs.money || 0, clue: gestAttrs.clue || 0, remnant: gestAttrs.remnant || 0 }
      } else {
        this.myAttrs    = { money: gestAttrs.money || 0, clue: gestAttrs.clue || 0, remnant: gestAttrs.remnant || 0 }
        this.rivalAttrs = { money: hostAttrs.money || 0, clue: hostAttrs.clue || 0, remnant: hostAttrs.remnant || 0 }
      }
      console.log('💰 [initAttrs] myAttrs:', this.myAttrs, '| rivalAttrs:', this.rivalAttrs)
    },

    startPolling() {
      console.log('🔄 [startPolling] iniciando polling de intercambio')
      this.pollingInterval = setInterval(async () => {
        try {
          const result = await apiService.getGameState(this.idInteraction, this.myIdUser)
          if (!result?.interaction) return
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
      const emptyOffer = () => ({
        fromHost:  { items: [], money: 0, clue: 0, remnant: 0 },
        fromGuest: { items: [], money: 0, clue: 0, remnant: 0 }
      })
      const prev = this.tradeStatus
      switch (tradeData.status) {
        case 'waitingOffer':
          this.tradeStatus = 'waitingOffer'
          break
        case 'offerPending':
          this.currentOffer = tradeData.offer || emptyOffer()
          this.tradeStatus  = 'offerPending'
          break
        case 'counterofferPending':
          this.currentOffer        = tradeData.offer        || emptyOffer()
          this.currentCounteroffer = tradeData.counteroffer || emptyOffer()
          this.tradeStatus         = 'counterofferPending'
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
      if (prev !== this.tradeStatus)
        console.log(`🔄 [syncTradeState] ${prev} → ${this.tradeStatus}`)
    },

    applyTrade(finalDeal) {
      if (this.tradeApplied) return
      this.tradeApplied = true
      console.log('🤝 [applyTrade] aplicando trato:', finalDeal)

      const fromHostItems  = finalDeal.fromHost?.items  ?? finalDeal.fromHost  ?? []
      const fromGuestItems = finalDeal.fromGuest?.items ?? finalDeal.fromGuest ?? []
      const fromHostRes  = { money: finalDeal.fromHost?.money  || 0, clue: finalDeal.fromHost?.clue  || 0, remnant: finalDeal.fromHost?.remnant  || 0 }
      const fromGuestRes = { money: finalDeal.fromGuest?.money || 0, clue: finalDeal.fromGuest?.clue || 0, remnant: finalDeal.fromGuest?.remnant || 0 }

      const possessions = Array.isArray(this.$store.state.datosPJactual.possessions)
        ? [...this.$store.state.datosPJactual.possessions]
        : [...(this.$store.state.possessionsInPlay || [])]

      let itemsReceived, itemsLost

      if (this.isHost) {
        itemsLost        = fromHostItems.map(id  => this.findItem(id, 'mine')).filter(Boolean)
        itemsReceived    = fromGuestItems.map(id => this.findItem(id, 'rival')).filter(Boolean)
        this.resourcesGained = { ...fromGuestRes }
        this.resourcesLost   = { ...fromHostRes }
      } else {
        itemsLost        = fromGuestItems.map(id => this.findItem(id, 'mine')).filter(Boolean)
        itemsReceived    = fromHostItems.map(id  => this.findItem(id, 'rival')).filter(Boolean)
        this.resourcesGained = { ...fromHostRes }
        this.resourcesLost   = { ...fromGuestRes }
      }

      const lostIds = itemsLost.map(i => i.id)
      const newPossessions = possessions.filter(p => !lostIds.includes(p.id))
      itemsReceived.forEach(item => newPossessions.push(item))

      if (Array.isArray(this.$store.state.datosPJactual.possessions)) {
        this.$store.state.datosPJactual.possessions = newPossessions
      } else {
        this.$store.state.possessionsInPlay = newPossessions
      }

      const attrs = this.$store.state.datosPJactual.atributes
      if (this.isHost) {
        attrs.money   = Math.max(0, attrs.money   - fromHostRes.money   + fromGuestRes.money)
        attrs.clue    = Math.max(0, attrs.clue    - fromHostRes.clue    + fromGuestRes.clue)
        attrs.remnant = Math.max(0, attrs.remnant - fromHostRes.remnant + fromGuestRes.remnant)
      } else {
        attrs.money   = Math.max(0, attrs.money   - fromGuestRes.money   + fromHostRes.money)
        attrs.clue    = Math.max(0, attrs.clue    - fromGuestRes.clue    + fromHostRes.clue)
        attrs.remnant = Math.max(0, attrs.remnant - fromGuestRes.remnant + fromHostRes.remnant)
      }

      this.myNewItems  = itemsReceived
      this.myLostItems = itemsLost

      console.log('📥 [applyTrade] recibidos:', itemsReceived.map(i => i?.translations?.es?.name || i?.name))
      console.log('📤 [applyTrade] dados:',     itemsLost.map(i    => i?.translations?.es?.name || i?.name))
      console.log('💰 [applyTrade] recursos | money:', attrs.money, 'clue:', attrs.clue, 'remnant:', attrs.remnant)

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

    async onSendOffer({ give, want }) {
      const fromHost  = { items: give.items, money: give.money, clue: give.clue, remnant: give.remnant }
      const fromGuest = { items: want.items, money: want.money, clue: want.clue, remnant: want.remnant }
      console.log('📤 [sendOffer] fromHost:', fromHost, '| fromGuest:', fromGuest)
      try {
        await apiService.sendTradeOffer(this.idInteraction, this.myIdUser, fromHost, fromGuest)
        this.currentOffer = { fromHost, fromGuest }
        this.tradeStatus  = 'offerPending'
        this.$buefy.toast.open({ message: 'Oferta enviada', type: 'is-success', duration: 2000 })
      } catch (e) {
        console.error('❌ [sendOffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al enviar oferta', type: 'is-danger', duration: 3000 })
      }
    },

    async onAcceptOffer() {
      console.log('✅ [acceptOffer] aceptando oferta')
      try {
        await apiService.guestRespondToTradeOffer(this.idInteraction, this.myIdUser, 'accepted')
        this.applyTrade(this.currentOffer)
      } catch (e) {
        console.error('❌ [acceptOffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al aceptar', type: 'is-danger', duration: 3000 })
      }
    },

    async onSendCounteroffer({ give, want }) {
      // guest especifica: want.items = items del host que quiere; give = lo que ofrece
      const fromHost  = { items: want.items, money: 0, clue: 0, remnant: 0 }
      const fromGuest = { items: give.items, money: give.money, clue: give.clue, remnant: give.remnant }
      console.log('🔄 [sendCounteroffer] fromHost:', fromHost, '| fromGuest:', fromGuest)
      try {
        await apiService.guestRespondToTradeOffer(this.idInteraction, this.myIdUser, 'counteroffer', fromHost, fromGuest)
        this.currentCounteroffer  = { fromHost, fromGuest }
        this.buildingCounteroffer = false
        this.tradeStatus          = 'counterofferPending'
        this.$buefy.toast.open({ message: 'Contraoferta enviada', type: 'is-warning', duration: 2000 })
      } catch (e) {
        console.error('❌ [sendCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al enviar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    async onAcceptCounteroffer() {
      console.log('✅ [acceptCounteroffer] aceptando contraoferta')
      try {
        await apiService.hostResolveCounteroffer(this.idInteraction, this.myIdUser, 'accepted')
        this.applyTrade(this.currentCounteroffer)
      } catch (e) {
        console.error('❌ [acceptCounteroffer] error:', e)
        this.$buefy.toast.open({ message: 'Error al aceptar contraoferta', type: 'is-danger', duration: 3000 })
      }
    },

    async onRejectCounteroffer() {
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
      this.$store.state.showGuestInvitationModal  = false
    },

    closeModal() {
      if (this.tradeStatus === 'finished' || this.tradeStatus === 'cancelled') {
        this.closeFinished()
        return
      }
      const isEs = this.$store.state.lenguaje === 'español'
      this.$buefy.dialog.confirm({
        title:       isEs ? 'Cancelar intercambio' : 'Cancel trade',
        message:     isEs
          ? '¿Estás seguro? <br><strong>El intercambio se cancelará para ambos jugadores.</strong>'
          : 'Are you sure? <br><strong>The trade will be cancelled for both players.</strong>',
        confirmText: isEs ? 'Sí, cancelar' : 'Yes, cancel',
        cancelText:  isEs ? 'No, volver'   : 'No, go back',
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
    this.myIdUser      = this.$store.state.IDUserHost
    console.log('🚀 [trade mounted] idInteraction:', this.idInteraction, '| myIdUser:', this.myIdUser)

    this.initPlayers()

    const tradeData = this.$store.state.interactionData.event.tradeData
    console.log('📊 [trade mounted] tradeData inicial:', tradeData)

    if (tradeData) this.syncTradeState(tradeData)
    else           this.tradeStatus = 'waitingOffer'

    this.startPolling()
  },

  beforeUnmount() {
    this.stopPolling()
  }
}
</script>

<style scoped>
.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}
.cruzeta { cursor: pointer; }
</style>
