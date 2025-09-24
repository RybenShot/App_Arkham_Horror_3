<template>
    <div>
        <!-- vida de jugadores -->
        <div class="columns is-mobile is-vcentered mb-0">
            <div class="column">
                <p class="has-text-centered">Me</p>
                <img :src="this.myData.img" class=" investigator-image my-1" :class="{ 'activo': myData.turn }">
                <progress class="progress is-danger" :value="this.myData.life" :max="this.myData.maxLife" min:="0"></progress>
            </div>
            
            <div class="column">
                <p class="has-text-centered">{{ this.rivalData.name }}</p>
                <img :src="this.rivalData.img" class=" investigator-image my-1" :class="{ 'activo': rivalData.turn }">
                <progress class="progress is-danger" :value="this.rivalData.life" :max="this.rivalData.maxLife" min:="0"></progress>
            </div>
        </div>

         <!-- Cargando ... -->
         <div v-if="status == 'onLoading'" class="has-text-centered">
            <button class="button is-loading is-white is-large is-rounded mt-3 mb-3"></button>
            <p class="subtitle is-6 mt-2">Esperando al otro jugador ...</p>
         </div>

        <!-- Tirador de dados -->
        <div v-if="status == 'onPlay'" class="has-text-centered">
            <p class="title is-2 mb-3">Te toca!</p>
            <p class="subtitle is-5">Vas a tirar con Fuerza</p>

            <div class="columns is-mobile is-centered">
                <div v-for="(dice, index) in this.$store.state.datosPJactual.atributes.strength" :key="index"  class="column"> 
                    <staticDie :ref="`diceRoller${index}`" size="small" @result="handleDiceResult"/> 
                </div>
            </div>

            <div>
                <p class="subtitle is-6 mt-2">Aciertos: {{ Naciertos }}</p>
            </div>

            <button v-if="!this.isRolled" class="button is-medium mt-3 mb-3" @click="throwDies()">Roll</button>
            <button v-else-if="this.isRolled == 'readyToSend'" class="button is-medium mt-3 mb-3" @click="sendResultToBack()">Enviar</button>
        </div>

        <!-- Victoria -->
        <div v-if="status == 'win'" class="has-text-centered">
            <div class="notification is-success is-light">
                <p class="title is-3 has-text-success mb-2">Victoria</p>
                
                <div v-if="reward == 'money'" class="box mb-2">
                    <p class="title is-2">💰</p>
                    <p class="subtitle is-5">Has ganado 2$</p>
                </div>

                <div v-if="reward == 'remnant'" class="box mb-2">
                    <p class="title is-2">🧩</p>
                    <p class="subtitle is-5">Has ganado 1 resto</p>
                </div>

                <div v-if="reward == 'clue'" class="box mb-2">
                    <p class="title is-2">🔍</p>
                    <p class="subtitle is-5">Has ganado 1 pista</p>
                </div>

                <p v-if="isAvandoned" class="subtitle is-7 mb-1 has-text-centered">Tu rival ha abandonado la partida.</p>
                
                <button class="button is-success mt-2" @click="$emit('closeModal')">
                    Cerrar
                </button>
            </div>
        </div>

        <!-- Derrota -->
        <div v-if="status == 'lose'" class="has-text-centered">
            <div class="notification is-danger is-light">
                <p class="title is-3 has-text-danger mb-2">Derrota</p>
                
                <div v-if="reward == 'money'" class="box mb-2">
                    <p class="title is-2">💸</p>
                    <p class="subtitle is-5">Has perdido 2$</p>
                </div>

                <div v-if="reward == 'remnant'" class="box mb-2">
                    <p class="title is-2">📉</p>
                    <p class="subtitle is-5">Has perdido 1 resto</p>
                </div>

                <div v-if="reward == 'clue'" class="box mb-2">
                    <p class="title is-2">❌</p>
                    <p class="subtitle is-5">Has perdido 1 pista</p>
                </div>
                 
                <button class="button is-danger mt-2" @click="$emit('closeModal')">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import staticDie from "@/components/inPlay/modals/events/figth/launcherStaticDie.vue";

export default {
    name: "Encuentro de combate",
    data() {
        return {
            status: "onLoading", // "onLoading", "onPlay", "win", "lose"
            isAvandoned: false,
            isRolling: false,
            diceResults: [],
            pollingStatusInteraction: null,
            myIdUser: this.$store.state.IDUserHost,
            idInteraction: this.$store.state.interactionData.idInteraccionOnLine,
            isRolled: false,

            myData:{
                name: null,
                img: null,
                life: null,
                maxLife: null,
                turn: false
            },
            rivalData:{
                name: null,
                img: null,
                life: null,
                maxLife: null,
                turn: false
            },

            HostTurn: null,
            GestTurn:null
        }
    },
    computed: {
        Naciertos: function() {
            const aciertos = this.diceResults.filter(result => result >= 5).length;
            const pifias = this.diceResults.filter(result => result === 1).length;
            const resultado  = aciertos - pifias
            return resultado < 0 ? 0 : resultado;
        }
    }, 
    components: {
        staticDie
    },
    methods:{
        async throwDies(){

            // console.log("Lanzando dados...");

            const strengthValue = this.$store.state.datosPJactual.atributes.strength;
            for (let i = 0; i < strengthValue; i++) {
                const diceRef = this.$refs[`diceRoller${i}`];
                diceRef[0].rollDice(); // Vue 3 devuelve un array de refs
            }
            this.isRolled = true;

            setTimeout(() => {
                this.isRolled = "readyToSend";
            }, 2500);
        },

        handleDiceResult(result) {
            this.diceResults.push(result);
            // console.log(`Dado resultado: ${result}`);
        },

        // Helper para actualizar vidas en UI
        async updateLifes(){
            const responseApi = await apiService.getGameState(this.idInteraction, this.myIdUser);

            const hostId = responseApi.interaction.idUserHost;

            if(this.myIdUser == hostId){
                this.myData.life = responseApi.interaction.event.gameData.currentLifeHost
                this.rivalData.life = responseApi.interaction.event.gameData.currentLifeGest;
            } else {
                this.myData.life = responseApi.interaction.event.gameData.currentLifeGest;
                this.rivalData.life = responseApi.interaction.event.gameData.currentLifeHost;
            }
        },

        // Helper para ver que ha ganado o perdido
        getReward(){
            const randomIndex = Math.floor(Math.random() * 3);
            const rewards = ['money', 'remnant', 'clue'];
            this.reward = rewards[randomIndex];
        },

        comprobarTurno(){
            this.pollingStatusInteraction = setInterval(async () => {
                const response = await apiService.checkMyTurn(this.idInteraction, this.myIdUser);
                // console.log("Estado de la interacción:", response);

                if(response.status == "not your"){
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Esperando que el rival tire dado ...` : `Waiting for the rival to roll dice ...`,
                        type: 'is-danger',
                        duration: 2000
                    });
                    this.rivalData.turn = true
                    this.myData.turn = false
                    this.updateLifes()
                    return

                } else if(response.status == "waiting_initial_roll"){
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Esperando que el rival tire dado inicial ...` : `Waiting for the rival to roll initial dice ...`,
                        type: 'is-danger',
                        duration: 2000
                    });
                    return

                } else if(response.status == "your_rival_abandoned"){
                    this.getReward()
                    this.isAvandoned = true
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Tu rival ha abandonado el encuentro, has ganado` : `Your rival has abandoned the encounter, you have won`,
                        type: 'is-danger',
                        duration: 5000
                    });
                    this.status = "win"
                    this.stopPollingStatusInteraction(); // Detener el intervalo si es tu turno
                    return

                }  else if(response.status == "you won"){
                    this.getReward()
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `¡Has ganado el combate!` : `You have won the combat!`,
                        type: 'is-success',
                        duration: 10000
                    });
                    this.updateLifes()
                    this.status = "win"
                    this.stopPollingStatusInteraction(); // Detener el intervalo si es tu turno

                } else if(response.status == "you lost"){
                    this.getReward()
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Has perdido el combate...` : `You have lost the combat...`,
                        type: 'is-danger',
                        duration: 10000
                    });
                    this.updateLifes()
                    this.status = "lose"
                    this.stopPollingStatusInteraction(); // Detener el intervalo si es tu turno
                } else {
                    // actualizamos turno
                    this.rivalData.turn = false
                    this.myData.turn = true
                    // acutalizamos datos de la interaccion
                    this.$store.state.interactionData.event = response.interaction.event;
                    this.updateLifes()

                    this.status = "onPlay"
                    this.stopPollingStatusInteraction(); // Detener el intervalo si es tu turno
                }

            }, 3000); // Comprueba cada 3 segundos
        },

        stopPollingStatusInteraction(){
            if (this.pollingStatusInteraction) {
                clearInterval(this.pollingStatusInteraction); // ¡ESTO FALTABA!
                this.pollingStatusInteraction = null;
                // console.log("Intervalo detenido correctamente");
            }
        },

        // Función para enviar a backend el resultado del dado
        async sendResultToBack(){
            const idInteraction = this.$store.state.interactionData.idInteraccionOnLine;
            const idUser = this.$store.state.IDUserHost;
            const hits = this.Naciertos

            // console.error("Enviando resultados de dados al backend:", hits);

            try {
                const response = await apiService.sendHitResults(idInteraction, idUser, hits);

                // console.error("Respuesta del backend:", response.data);

                if (response.data.status == true) {
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Resultados enviados correctamente` : 'Results sent successfully',
                        type: 'is-success',
                        duration: 3000
                    });
                    this.status = "onLoading"; // Volver a estado de carga esperando al otro jugador
                    this.isRolled = false;
                    this.diceResults = []; // Resetear resultados de dados
                    this.comprobarTurno(); // Volver a comprobar turno
                    this.updateLifes()
                    // actualizar turnos en UI
                    this.rivalData.turn = true
                    this.myData.turn = false
                } else if (response.data.status == false) {
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Ya has mandado los aciertos` : 'You have already sent the hits',
                        type: 'is-danger',
                        duration: 3000
                    });
                    this.status = "onLoading"; // Volver a estado de carga esperando al otro jugador
                    this.isRolled = false;
                    this.diceResults = []; // Resetear resultados de dados
                    this.comprobarTurno(); // Volver a comprobar turno
                }

                // console.log('Resultado enviado al backend:', response);
            } catch (error) {
                this.$buefy.toast.open({
                    message: this.$store.state.lenguaje === 'español' ? `Error: ${error.response}` : 'Error sending dice result',
                    type: 'is-danger',
                    duration: 3000
                });
            }
        },

        // Funcion para identificas jugadores
        identifyPlayers(){
            const hostId = this.$store.state.interactionData.idUserHost;

            if(this.myIdUser == hostId){
                this.myData.img = this.$store.state.interactionData.event.invDataHost.imgInv;
                this.myData.name = this.$store.state.interactionData.event.invDataHost.name;

                this.myData.maxLife = this.$store.state.interactionData.event.gameData.maxLifeHost;
                this.rivalData.maxLife = this.$store.state.interactionData.event.gameData.maxLifeGest;

                this.rivalData.img = this.$store.state.interactionData.event.invDataGest.imgInv
                this.rivalData.name = this.$store.state.interactionData.event.invDataGest.name;
            } else {
                this.myData.img = this.$store.state.interactionData.event.invDataGest.imgInv;
                this.myData.name = this.$store.state.interactionData.event.invDataGest.name;

                this.myData.maxLife = this.$store.state.interactionData.event.gameData.maxLifeGest;
                this.rivalData.maxLife = this.$store.state.interactionData.event.gameData.maxLifeHost;

                this.rivalData.img = this.$store.state.interactionData.event.invDataHost.imgInv
                this.rivalData.name = this.$store.state.interactionData.event.invDataHost.name;
            }
        }
        
    },
    mounted() {
        this.comprobarTurno();
        this.identifyPlayers();
    },

    beforeUnmount() {
        // Limpiar el intervalo cuando el componente se desmonte
        this.stopPollingStatusInteraction();
    }
}

</script>

<style scoped>
.investigator-image{
    width: 80px;
    height: auto;
    border-radius: 8px;
    border: 2px solid #ccc;
    display: block;
    margin: 0 auto;
}

.activo {
    animation: breathingGlow 2s ease-in-out infinite !important;
}

@keyframes breathingGlow {
    0%, 100% { 
        border-color: #4CAF50;
        box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        transform: scale(1);
    }
    50% { 
        border-color: #81C784;
        box-shadow: 0 0 20px rgba(76, 175, 80, 0.8);
        transform: scale(1.10);
    }
}

</style>