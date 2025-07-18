<template>
    <div class="modal is-active">
      <div class="modal-background" @click="this.$store.state.modalInvOnLine = false"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="columns is-mobile modal-card-head BGBendicion m-0">
            <p class="modal-card-title has-text-weight-bold" >{{ textoInterfaz.titulo }}</p>
            <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalInvOnLine = false"></i>
          </header>

          <SignedOut>
            <section class="modal-card-body hero is-large py-2">
              <p class="subtitle has-text-centered">{{ textoInterfaz.textoError }}</p>
              <SignInButton class="button" />
            </section>                
          </SignedOut>

          <SignedIn>
            <section class="modal-card-body hero is-large py-2">
                <div class="PersonajesList " v-if="listInvFound.length > 0">
                    <InvestigatorCard v-for="investigator in listInvFound" :key="investigator.id" :investigator="investigator" />
                </div>
                <div v-if="listInvFound.length === 0" class="has-text-centered py-5">
                    <p class="subtitle">{{ textoInterfaz.textoErrorNoInv }}</p>

                </div>
            </section>
          </SignedIn>

          <footer class="">
            <div class="field has-addons columns is-mobile is-gapless">

              <p class="control column ">
                <button @click="(this.$store.state.modalInvOnLine = false)" class="button is-link is-fullwidth">
                  <p>{{ textoInterfaz.botones.cerrar }}</p>
                </button>
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  </template>
  
<script>
    import { apiService } from '@/services/api.js';
    import InvestigatorCard from '@/components/personajes/invCard.vue'

    // importamos clear para la gestion de usuarios
    import { SignedIn, SignedOut, SignInButton } from '@clerk/vue'

  export default {
    name:"EstadoBendicion",
    data(){
        return{
            textoInterfaz:{
              titulo:"",
              textoErrorNoInv: "",
              textoError: "",
                botones: {
                    cerrar: ""
                },
            },
            listInvFound: [],
        }
    },
    components: {
      SignedIn,
      SignedOut,
      SignInButton,
      InvestigatorCard
    },
    methods:{
        async serchInvOnLine(){
            try {
                const idUser = this.$store.state.IDUserHost;
                const response = await apiService.getListInvOnLine(idUser);
                this.listInvFound = response[0].investigadoresOnLine
                console.log("✅ serchInvOnLine(.vue) - Investigadores OnLine encontrados:", this.listInvFound);
            } catch (error) {
                console.error("❌ serchInvOnLine(.vue) - Error al buscar los investigadores OnLine del usuario:", error);
            }
        },
        
        rellenarTextoSegunIdioma() {
            if (this.$store.state.lenguaje == 'español') {
            this.textoInterfaz.titulo = "Investigadores OnLine";
            this.textoInterfaz.textoErrorNoInv = "No tienens ningun investigador OnLine guardado, selecciona un investigador, juega y luego guarda el investigador.";
            this.textoInterfaz.textoError = "Para ver los investigadores onLine primero debes iniciar sesion";
            this.textoInterfaz.botones.cerrar = "Cerrar";
            } else if (this.$store.state.lenguaje == 'ingles') {
            this.textoInterfaz.titulo = "Online Investigators";
            this.textoInterfaz.textoErrorNoInv = "You don't have any online investigators saved, select an investigator, game and then save the investigator.";
            this.textoInterfaz.textoError = "To see the online investigators, you must first sign in";
            this.textoInterfaz.botones.cerrar = "Close";
            }
        },
    },
    mounted(){
      this.rellenarTextoSegunIdioma();
      this.serchInvOnLine();
    }
  }
  </script>
<style>
  .BGBendicion{
    background-image: url(@/assets/img/Estados/Bendicion.jpg);
    background-position: center;
    background-size: cover;
  }
  
  .PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 10px;
  row-gap: 10px;
  justify-items: center;
  margin-left: 10px;
  margin-right: 10px;
}
</style>