<template>
    <div>
        <!-- vida de jugadores -->
         <div class="columns is-mobile is-vcentered mb-0">
            <div class="column">
                <p class="has-text-centered">HOST</p>
                <progress class="progress is-danger" :value="3" max="5">3</progress>
            </div>
            
            <div class="column">
                <p class="has-text-centered">GEST</p>
                <progress class="progress is-danger" :value="1" max="5">3</progress>
            </div>

         </div>

         <!-- Cargando ... -->
         <div v-if="isLoading" class="has-text-centered">
            <button class="button is-loading is-white is-large is-rounded mt-3 mb-3"></button>
            <p class="subtitle is-6 mt-2">Esperando al otro jugador ...</p>

         </div>

         <!-- Tirador de dados -->
          <div v-if="!isLoading">
            <div v-if="!isRolling" class="has-text-centered">
                <p class="title is-2 mb-3">Te toca!</p>
                <p class="subtitle is-5">Vas a tirar con Fuerza</p>
                <div class="columns is-mobile is-centered">

                    <div v-for="dice in this.$store.state.datosPJactual.atributes.strength" class="column"> 
                        <staticDie/> 
                    </div>
                </div>
                <button class="button is-medium mt-3 mb-3" @click="throwDies()">Roll</button>
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
            isLoading: true,
            isRolling: false,
            result: null,
            pollingStatusInteraction: null,
            myIdUser: this.$store.state.IDUserHost,
            idInteraction: this.$store.state.interactionData.idInteraccionOnLine
        }
    },
    components: {
        staticDie
    },
    methods:{
        async throwDies(){
            this.isRolling = true;
            this.isLoading = true;

            // Simular la tirada de dados con un retardo
            setTimeout(async () => {
                try {
                    // Aquí llamas a la función que hace la petición a la API
                    const response = await this.$api.rollInitialDice(this.$store.state.gameId);
                    console.log("Respuesta de la API:", response);
                    this.result = response.result; // Ajusta esto según la estructura de tu respuesta
                } catch (error) {
                    console.error("Error al lanzar los dados:", error);
                } finally {
                    this.isRolling = false;
                    this.isLoading = false;
                }
            }, 2000); // Simula un retardo de 2 segundos
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


</style>