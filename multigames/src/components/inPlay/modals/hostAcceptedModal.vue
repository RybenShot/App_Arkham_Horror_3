<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="mr-6">
      <div class="modal-card">
        <header class="columns is-mobile modal-card-head BGBendicion m-0">
          <p class="modal-card-title has-text-weight-bold has-text-white">Pelea</p>
          <i class="fa-2x fas fa-times-circle has-text-success cruzeta" @click="closeModal"></i>
        </header>

        <section class="modal-card-body hero is-large py-2">
          <p class="subtitle has-text-gray has-text-centered is-6">
            {{ isRolling ? '' : (result ? `` : 'Tap en el dado para lanzar') }}
          </p>
          
          <!-- Contenedor del dado -->
          <div class="dice-scene" @click="rollDice()">
            <div class="dice" :class="animationClass">
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
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
            </div>
          </div>

        </section>

        <footer class="">
          <div class="field">
            <p class="control">
              <button @click="closeModal" class="button is-success is-fullwidth"> Cerrar </button>
            </p>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HostAcceptedModal",
  data() {
    return {
      result: 0,
      isRolling: false,
      animationClass: ''
    }
  },
  methods: {
    rollDice() {
      if (this.isRolling) return;
      
      this.isRolling = true;
      this.result = Math.floor(Math.random() * 6) + 1;
      this.animationClass = `roll-${this.result}`;
      
      setTimeout(() => {
        this.isRolling = false;
      }, 3000);
    },
    closeModal() {
      this.$store.state.showInteractionEventModal = false;
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

.face-6 .dot:nth-child(1) { top: 12px; left: 12px; }
.face-6 .dot:nth-child(2) { top: 12px; right: 12px; }
.face-6 .dot:nth-child(3) { top: 50%; left: 12px; transform: translateY(-50%); }
.face-6 .dot:nth-child(4) { top: 50%; right: 12px; transform: translateY(-50%); }
.face-6 .dot:nth-child(5) { bottom: 12px; left: 12px; }
.face-6 .dot:nth-child(6) { bottom: 12px; right: 12px; }

/* 6 Animaciones de caída específicas - estilo simple y efectivo */

.roll-1 { animation: diceThrow1 3s ease-out forwards; }
@keyframes diceThrow1 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(720deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(900deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(1080deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1260deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1350deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1440deg) rotateY(1440deg) rotateZ(720deg); } /* = 0deg, 0deg - CARA 1 */
}

.roll-2 { animation: diceThrow2 3s ease-out forwards; }
@keyframes diceThrow2 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(630deg) rotateY(810deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(810deg) rotateY(990deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(990deg) rotateY(1170deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1170deg) rotateY(1350deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1260deg) rotateY(1440deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1440deg) rotateY(1530deg) rotateZ(720deg); } /* = 0deg, 90deg - CARA 2 */
}

.roll-3 { animation: diceThrow3 3s ease-out forwards; }
@keyframes diceThrow3 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(540deg) rotateY(720deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(720deg) rotateY(900deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(900deg) rotateY(1080deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1080deg) rotateY(1260deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1170deg) rotateY(1350deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1530deg) rotateY(1440deg) rotateZ(720deg); } /* = 90deg, 0deg - CARA 3 */
}

.roll-4 { animation: diceThrow4 3s ease-out forwards; }
@keyframes diceThrow4 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(810deg) rotateY(630deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(990deg) rotateY(810deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1170deg) rotateY(990deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1350deg) rotateY(1170deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1440deg) rotateY(1260deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1170deg) rotateY(1440deg) rotateZ(720deg); } /* = -90deg, 0deg - CARA 4 */
}

.roll-5 { animation: diceThrow5 3s ease-out forwards; }
@keyframes diceThrow5 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(720deg) rotateY(540deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(900deg) rotateY(720deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1080deg) rotateY(900deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1260deg) rotateY(1080deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1350deg) rotateY(1170deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1440deg) rotateY(1170deg) rotateZ(720deg); } /* = 0deg, -90deg - CARA 5 */
}

.roll-6 { animation: diceThrow6 3s ease-out forwards; }
@keyframes diceThrow6 {
  0% { transform: translateY(-300px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
  35% { transform: translateY(50px) translateX(20px) rotateX(900deg) rotateY(900deg) rotateZ(360deg); }
  50% { transform: translateY(10px) translateX(10px) rotateX(1080deg) rotateY(1080deg) rotateZ(450deg); }
  65% { transform: translateY(30px) translateX(-10px) rotateX(1260deg) rotateY(1260deg) rotateZ(540deg); }
  80% { transform: translateY(5px) translateX(5px) rotateX(1440deg) rotateY(1440deg) rotateZ(630deg); }
  90% { transform: translateY(15px) translateX(-2px) rotateX(1530deg) rotateY(1530deg) rotateZ(675deg); }
  100% { transform: translateY(0px) translateX(0px) rotateX(1440deg) rotateY(1620deg) rotateZ(720deg); } /* = 0deg, 180deg - CARA 6 */
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