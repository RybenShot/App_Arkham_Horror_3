<template>
  <div class="mirror-overlay">

    <transition name="fade">
      <mirrorIntro v-if="stage === 0" />
    </transition>

    <transition name="fade">
      <mirrorReveal
        v-if="stage >= 1"
        :stage="stage"
        :invImg="invImg"
        :invName="invName"
        :sanityCost="sanityCost"
        @close="closeMirror"
      />
    </transition>

  </div>
</template>

<script>
import { apiService } from '@/services/api.js'
import { invitationService } from '@/services/invitationService.js'
import mirrorIntro  from './dimensionalMirror/mirrorIntro.vue'
import mirrorReveal from './dimensionalMirror/mirrorReveal.vue'

const SANITY_COST = 2

export default {
  name: 'EventoEspejosDimensional',
  components: { mirrorIntro, mirrorReveal },

  data() {
    return {
      stage: 0,
      sanityCost: SANITY_COST,
      invImg: '',
      invName: ''
    }
  },

  methods: {

    advanceStage() {
      const delays = [1600, 2200, 2600]
      delays.forEach((delay, i) => {
        setTimeout(() => { this.stage = i + 1 }, delay)
      })
    },

    applyEffects() {
      const pj = this.$store.state.datosPJactual
      if (pj?.atributes) {
        pj.atributes.sanity = Math.max(1, (pj.atributes.sanity || 0) - SANITY_COST)
      }
      this.$store.state.EstadoSeñalado = true
      this.saveInv()
    },

    async saveInv() {
      try {
        const idUser = this.$store.state.IDUserHost
        const payload = { ...this.$store.state.datosPJactual, idUser }
        await apiService.postInvOnLine(payload)
      } catch (e) {
        console.error('❌ [dimensionalMirror] saveInv:', e)
      }
    },

    closeMirror() {
      this.applyEffects()
      this.$store.state.showSwithcherEventsOnLine = false
      this.$store.state.showGuestInvitationModal = false
      invitationService.resumePollingGeneral()
    }
  },

  mounted() {
    const invData = this.$store.state.interactionData?.event?.invDataHost
    this.invImg  = invData?.imgInv || ''
    this.invName = invData?.name || invData?.nameInv || '???'
    this.advanceStage()
  }
}
</script>

<style scoped>
.mirror-overlay {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Shared stage wrapper used by both children */
.stage {
  width: 100%;
  max-width: 480px;
  padding: 2rem 1.5rem;
  text-align: center;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.8s ease; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }
</style>
