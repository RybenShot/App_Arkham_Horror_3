<template>
  <div class="modal is-active ">
    <div class="modal-background" @click="closeModal"></div>
    <div>
      <div class="modal-card m-1">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">Pelea</p>
          <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">

          <section v-if="scene == 'firstRoll'">
            <p class="subtitle has-text-gray has-text-centered is-6">
              {{ isRolling ? '' : (result ? `` : 'Tap en el dado para lanzar') }}
            </p>
            <!-- Contenedor del dado -->
            <div class="dice-scene" @click="rollDice()">
              <div class="dice" :class="[animationClass, desvanecerDado]">
                <div class="face face-1">
                  <div class="dot"></div>
                </div>
                <div class="face face-2">
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
                <div class="face face-3">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
                <div class="face face-4">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
                <div class="face face-5">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
                <div class="face face-6">
                  <img src="@/assets/img/ZZOtros/LogoSimple.png" alt="cara en dado del logo">
                </div>
              </div>
            </div>
            <p v-if="isRolling == false  && result != 0" class="title has-text-centered">Resultado: {{ this.result }}</p>
          </section>
          
          <section v-if="scene == 'rules'">
            <rules_figth/>
          </section>

        </section>

        <footer class="">
          <div v-if="this.isRolling == false" class="field">
            <p class="control">
              <button @click="" class="button is-info is-fullwidth"> Siguiente </button>
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import { invitationService } from '@/services/invitationService.js';

import rules_figth from "@/components/inPlay/modals/events/rules/rulesFigth.vue";

export default {
  name: "HostAcceptedModal",
  components:{
    rules_figth
  },
  data() {
    return {
      result: 0,
      isRolling: false,
      animationClass: '',
      desvanecerDado: null,
      scene: "firstRoll"
    }
  },
  methods: {
    // funcion para envir a backend el resultado del dado
    async enviarResultadoInicio(resultado){
      const idInteraction = this.$store.state.interactionData.idInteraccionOnLine;
      const idUser = this.$store.state.IDUserHost;
      const diceResult = resultado; // resultado del dado
      try {
        const response = await apiService.rollInitialDice(idInteraction, idUser, diceResult);
        console.log('Resultado enviado al backend:', response);
        // Aquí puedes manejar la respuesta del backend si es necesario
      } catch (error) {
        console.error('Error al enviar el resultado al backend:', error);
      }
    },

    rollDice() {
      if (this.isRolling) return;
      if (this.result) {
        this.$buefy.toast.open({
          message: this.$store.state.lenguaje === 'español' ? `No puedes volver a tirar` : `You can't roll again`,
          type: 'is-danger',
          duration: 2000
        });
        return
      }
      this.isRolling = true;
      this.desvanecerDado = 'desvanecerDado';

      setTimeout(() => {
        // Fase 2: Generar número y aplicar animación de lanzamiento
        this.result = Math.floor(Math.random() * 6) + 1;
        this.desvanecerDado = null; // Quitar fade
        this.animationClass = `roll-${this.result}`;
        
        setTimeout(() => {
          // Fase 3: Resetear todo
          this.isRolling = false;
          console.log(`Resultado del dado: ${this.result}`);
          this.enviarResultadoInicio(this.result); // Llamada a función para enviar resultado

          setTimeout(() => {
            this.scene = "rules" // cambiar escena a enseñar las reglas
          }, 3000);

        }, 3000);

        
        
      }, 1000); // Esperar 1 segundo para el fade
    },
    closeModal() {
      const textoConfirmacion = this.$store.state.lenguaje === 'español' ? `Estas seguro? Se tomara como una derrota y perderás algo de tu equipo.` : `___`;
      // console.warn(this.$store.state.interactionData)

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Evento' : '___',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          this.$store.state.showSwithcherEventsOnLine = false

          // llamada a backend para cancelar el evento
          const idInteraction = this.$store.state.interactionData.idInteraccionOnLine;
          const idUser = this.$store.state.IDUserHost;
          const response = "abandoned";
          const invData = null;
          // this.respondInteractionToAPI(idInteraction, idUser, response, invData) // TODO -- falta implementar
          console.warn("TODO queda implementar la llamada a back para abandonar el evento")

          this.$store.state.showGuestInvitationModal= false
          invitationService.resumePollingGeneral();; // volvemos al polling General
        }
      });

    }
  }
}
</script>

<style scoped>
.BGBendicion {
  background-image: url(@/assets/img/Estados/Bendicion.jpg);
  background-position: center;
  background-size: cover;
}

.cajaModal{
    width: 30lvh;
    height: 70lvh;
}

.cruzeta {
  cursor: pointer;
}

.dice-scene {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  perspective: 1000px;
  perspective-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dice {
  width: 60px;
  height: 60px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-15deg) rotateY(-15deg);
}

/* animacion para cuando esté a la espera */
.dice:not([class*="roll"]):not(.desvanecerDado) {
  animation: idleFloat 3s ease-in-out infinite;
}

@keyframes idleFloat {
  0%, 100% { transform: rotateX(710deg) rotateY(890deg); }
  50% { transform: rotateX(720deg) rotateY(900deg) translateY(-10px); }
}

/* Animación simple de fade out */
.desvanecerDado{
  animation: simpleFade 1s ease-in !important;
}
@keyframes simpleFade {
  0% { opacity: 1; transform: rotateX(710deg) rotateY(890deg); }
  50% { opacity: 0,5; transform: rotateX(720deg) rotateY(900deg) translateY(-10px); }
  100% { opacity: 0; transform: rotateX(710deg) rotateY(890deg) }
}

.face {
  position: absolute;
  width: 60px;
  height: 60px;
  background: #fff;
  border: 2px solid #333;
  border-radius: 6px;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.1);
}

.face-1 { transform: translateZ(30px); }
.face-2 { transform: rotateY(90deg) translateZ(30px); }
.face-3 { transform: rotateX(90deg) translateZ(30px); }
.face-4 { transform: rotateX(-90deg) translateZ(30px); }
.face-5 { transform: rotateY(-90deg) translateZ(30px); }
.face-6 { transform: rotateY(180deg) translateZ(30px); }

.dot {
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
  position: absolute;
}

/* Puntos para cada cara */
.face-1 .dot:nth-child(1) { top: 50%; left: 50%; transform: translate(-50%, -50%); }

.face-2 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-2 .dot:nth-child(2) { bottom: 12px; right: 12px; }

.face-3 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-3 .dot:nth-child(2) { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.face-3 .dot:nth-child(3) { bottom: 12px; right: 12px; }

.face-4 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-4 .dot:nth-child(2) { top: 12px; right: 12px; }
.face-4 .dot:nth-child(3) { bottom: 12px; left: 12px; }
.face-4 .dot:nth-child(4) { bottom: 12px; right: 12px; }

.face-5 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-5 .dot:nth-child(2) { top: 12px; right: 12px; }
.face-5 .dot:nth-child(3) { top: 50%; left: 50%; transform: translate(-50%, -50%); }
.face-5 .dot:nth-child(4) { bottom: 12px; left: 12px; }
.face-5 .dot:nth-child(5) { bottom: 12px; right: 12px; }


/* Animaciones para cada lado */

.roll-1 { animation: diceThrow1 3s ease-out forwards; }
@keyframes diceThrow1 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(720deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(900deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(1080deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1260deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1350deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1440deg) rotateY(1440deg) rotateZ(720deg); }
}

.roll-2 { animation: diceThrow2 3s ease-out forwards; }
@keyframes diceThrow2 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(630deg) rotateY(810deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(810deg) rotateY(990deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(990deg) rotateY(1170deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1170deg) rotateY(1350deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1260deg) rotateY(1440deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(810deg) rotateY(990deg) rotateZ(450deg); }
}

.roll-3 { animation: diceThrow3 3s ease-out forwards; }
@keyframes diceThrow3 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(720deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(720deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(900deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1080deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1170deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1170deg) rotateY(990deg) rotateZ(540deg); }
}

.roll-4 { animation: diceThrow4 3s ease-out forwards; }
@keyframes diceThrow4 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(810deg) rotateY(630deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(990deg) rotateY(810deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1170deg) rotateY(990deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1350deg) rotateY(1170deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1440deg) rotateY(1260deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1170deg) rotateY(1440deg) rotateZ(720deg); }
}

.roll-5 { animation: diceThrow5 3s ease-out forwards; }
@keyframes diceThrow5 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(540deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(720deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(900deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1080deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1170deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1440deg) rotateY(1170deg) rotateZ(720deg); }
}

.roll-6 { animation: diceThrow6 3s ease-out forwards; }
@keyframes diceThrow6 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(900deg) rotateY(900deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(1080deg) rotateY(1080deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1260deg) rotateY(1260deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1440deg) rotateY(1440deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1530deg) rotateY(1530deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1440deg) rotateY(1620deg) rotateZ(720deg); }
}

.roll-button {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;
}

.roll-button:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-1px);
}

.roll-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style>