<template>
    <div class="modal is-active">
      <div class="modal-background" @click="this.$store.state.modalCrearMapaOnLine = false"></div>
      <div class="mr-6">
        <div class="modal-card">
          <header class="columns is-mobile modal-card-head BGBendicion m-0">
            <p class="modal-card-title has-text-weight-bold" >{{ textoInterfaz.titulo }}</p>
            <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalCrearMapaOnLine = false"></i>
          </header>

          <section class="modal-card-body hero is-large py-4">

            <SignedOut>
              <p class="subtitle has-text-centered">{{ textoInterfaz.textoError }}</p>
              <SignInButton class="button" />
            </SignedOut>

            <SignedIn>
              <div class="has-text-centered" v-if="this.beforeCreateMap">
                <h2 class="subtitle mb-0">{{ textoInterfaz.confirm }}</h2>
                <button @click="postNewMapInPlay()" class="button my-3 is-success">Crear Mapa</button>
              </div>

              <div class="has-text-centered" v-else>
                <h2 class="subtitle">{{ textoInterfaz.textLogged }}</h2>
                <b-field >
                    <b-input placeholder="ej: 1234-1234-1234"
                        type="search"
                        icon="magnify"
                        v-model="barCode">
                    </b-input>
                    <p class="control">
                        <b-button type="is-primary" label="Copiar" @click="copyCode()" />
                    </p>
                </b-field>
              </div>
            </SignedIn>
          </section>

          <footer>
            <div class="field has-addons columns is-mobile is-gapless">

              <p class="control column ">
                <button @click="(this.$store.state.modalCrearMapaOnLine = false)" class="button is-link is-fullwidth">
                  <p>{{ textoInterfaz.botones.añadir }}</p>
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
  // importamos clear para la gestion de usuarios
  import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/vue'

  export default {
    name:"EstadoBendicion",
    components: {
      SignedIn,
      SignedOut,
      SignInButton
    },
    // Aquí añadimos setup() para usar useUser()
    setup() {
      const { user } = useUser()
      // Exponemos user
      return { user }
    },
    data(){
      return{
        beforeCreateMap: true,
        textoInterfaz:{
          titulo: "",
          textoError: "",
          confirm:"",
          textLogged: "",
          botones: {
            añadir: ""
          },
        },
        mapFound: null,
        // variable para capturar la id nuevo mapa creado
        barCode: ""
        }
        
    },
    methods:{
      rellenarTextoSegunIdioma(){
        if(this.$store.state.lenguaje == 'español'){
          this.textoInterfaz.titulo = "Crear Partida";
          this.textoInterfaz.textoError = "Para crear una partida debes estar Logueado a la app";
          this.textoInterfaz.confirm = "Recuerda que al crear la partida esta quedará registrada en nuestra base de datos junto con tu usuario, si vemos anomalias como creacion de multiples mapas se estudiará el caso y se tomaran medidas sancionadoras. Gracias y disfruta!";
          this.textoInterfaz.textLogged = "Copia este codigo y pasaselo a tus compañeros de mesa para unirse a la misma partida.";
          this.textoInterfaz.botones.añadir = "Cerrar";
        }else if(this.$store.state.lenguaje == 'ingles'){
          this.textoInterfaz.titulo = "___";
          this.textoInterfaz.textoError = "___";
          this.textoInterfaz.textLogged = "___";
          this.textoInterfaz.botones.añadir = "__";
        }
      },
      async postNewMapInPlay(){
        try {
          const idMap = this.$store.state.datosMapa.idMap
          const IDUserHost = this.user.id


          console.log(idMap, IDUserHost)

          const postNewMap = await apiService.postNewMapInPlay(idMap, IDUserHost);
          // añadir el mapa que venga al store para jugarlo
          this.$store.state.datosMapa = postNewMap
          // volcamos el código para que aparezca en el input
          this.barCode = postNewMap.id
          // meter en el input la id del mapa para copiarlo y pasarlo a otras personas
          console.log(postNewMap)
          this.beforeCreateMap = false
        } catch (error) {
          console.error("❌ Error al crear el nuevo mapa:", error);
        }
      },
      async copyCode(){
        if (!this.barCode) return alert('Nada que copiar');
        // estructura para copiar a porta papeles
        const textarea = document.createElement('textarea');
        textarea.value = this.barCode;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);

        alert(copied ? 'Código copiado 😊' : 'No se pudo copiar');
      }
    },
    mounted(){
      this.rellenarTextoSegunIdioma();
    }
  }
</script>
<style>
  .BGBendicion{
    background-image: url(@/assets/img/Estados/Bendicion.jpg);
    background-position: center;
    background-size: cover;
  }
</style>