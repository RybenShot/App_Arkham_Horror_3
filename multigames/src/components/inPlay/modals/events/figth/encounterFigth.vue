<template>
    <div>
        <!-- vida de jugadores -->
        <div class="columns is-mobile is-vcentered mb-0">
            <div class="column">
                <p class="has-text-centered">HOST</p>
                <img :src="this.$store.state.interactionData.event.invDataHost.imgInv" class=" investigator-image my-1 activo" :class="{ 'activo': HostTurn }">
                <progress class="progress is-danger" :value="3" max="5">3</progress>
            </div>
            
            <div class="column">
                <p class="has-text-centered">GEST</p>
                <img :src="this.$store.state.interactionData.event.invDataGest.imgInv" class=" investigator-image my-1" :class="{ 'activo': GestTurn }">
                <progress class="progress is-danger" :value="1" max="5">3</progress>
            </div>
        </div>

         <!-- Cargando ... -->
         <div v-if="isLoading" class="has-text-centered">
            <button class="button is-loading is-white is-large is-rounded mt-3 mb-3"></button>
            <p class="subtitle is-6 mt-2">Esperando al otro jugador ...</p>
         </div>

        <!-- Tirador de dados -->
        <div v-if="!isLoading" class="has-text-centered">
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
    </div>
</template>

<script>
import { apiService } from '@/services/api.js';
import staticDie from "@/components/inPlay/modals/events/figth/launcherStaticDie.vue";

export default {
    name: "Encuentro de combate",
    data() {
        return {
            isLoading: true,
            isRolling: false,
            diceResults: [],
            pollingStatusInteraction: null,
            myIdUser: this.$store.state.IDUserHost,
            idInteraction: this.$store.state.interactionData.idInteraccionOnLine,
            isRolled: false,

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

            console.log("Lanzando dados...");

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
            console.log(`Dado resultado: ${result}`);
        },

        comprobarTurno(){
            this.pollingStatusInteraction = setInterval(async () => {
                const response = await apiService.checkMyTurn(this.idInteraction, this.myIdUser);
                console.log("Estado de la interacción:", response);

                if(response.status == "not your"){
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Esperando que el rival tire dado ...` : `Waiting for the rival to roll dice ...`,
                        type: 'is-danger',
                        duration: 2000
                    });
                    return

                } else if(response.status == "waiting_initial_roll"){
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Esperando que el rival tire dado inicial ...` : `Waiting for the rival to roll initial dice ...`,
                        type: 'is-danger',
                        duration: 2000
                    });
                    return

                } else {
                    this.isLoading = false
                    this.stopPollingStatusInteraction(); // Detener el intervalo si es tu turno
                    console.log("Es tu turno, deteniendo el polling.");
                }

            }, 5000); // Comprueba cada 3 segundos
        },

        stopPollingStatusInteraction(){
            if (this.pollingStatusInteraction) {
                clearInterval(this.pollingStatusInteraction); // ¡ESTO FALTABA!
                this.pollingStatusInteraction = null;
                console.log("Intervalo detenido correctamente");
            }
        },

        // helper conteo de aciertos
        countHits(){
            let hits = 0;
            this.diceResults.forEach(result => {
                if(result >= 5){
                    hits++;
                }
            });
            return hits;
        },

        // Función para enviar a backend el resultado del dado
        async sendResultToBack(){
            const idInteraction = this.$store.state.interactionData.idInteraccionOnLine;
            const idUser = this.$store.state.IDUserHost;
            const hits = this.countHits(); // array con resultados de dados

            // console.error("Enviando resultados de dados al backend:", hits);

            try {
                const response = await apiService.sendHitResults(idInteraction, idUser, hits);

                console.error("Respuesta del backend:", response.data);

                if (response.data.status == true) {
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Resultados enviados correctamente` : 'Results sent successfully',
                        type: 'is-success',
                        duration: 3000
                    });
                    this.isLoading = true; // Volver a estado de carga esperando al otro jugador
                    this.isRolled = false;
                    this.diceResults = []; // Resetear resultados de dados
                    this.comprobarTurno(); // Volver a comprobar turno
                } else if (response.data.status == false) {
                    this.$buefy.toast.open({
                        message: this.$store.state.lenguaje === 'español' ? `Ya has mandado los aciertos` : 'You have already sent the hits',
                        type: 'is-danger',
                        duration: 3000
                    });
                    this.isLoading = true; // Volver a estado de carga esperando al otro jugador
                    this.isRolled = false;
                    this.diceResults = []; // Resetear resultados de dados
                    this.comprobarTurno(); // Volver a comprobar turno
                }

                console.log('Resultado enviado al backend:', response);
            } catch (error) {
                this.$buefy.toast.open({
                    message: this.$store.state.lenguaje === 'español' ? `Error: ${error.response}` : 'Error sending dice result',
                    type: 'is-danger',
                    duration: 3000
                });
            }
        }
        
    },
    mounted() {
        this.comprobarTurno();
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