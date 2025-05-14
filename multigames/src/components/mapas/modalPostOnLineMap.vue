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
            <h2>{{ textoInterfaz.textoError }}</h2>
            <button @click="postNewMapInPlay()" class="button my-3 is-success">Crear Mapa</button>
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

  export default {
    name:"EstadoBendicion",
    data(){
      return{
        textoInterfaz:{
          titulo: "",
          textoError: "",
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
          this.textoInterfaz.textLogged = "Copia este codigo y pasaselo a tus compañeros de mesa para jugar a la misma partida.";
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
          const IDUserHost = this.$store.state.IDUserHost

          const postNewMap = await apiService.postNewMapInPlay(idMap, IDUserHost);
          // añadir el mapa que venga al store para jugarlo
          this.$store.state.datosMapa = postNewMap
          // volcamos el código para que aparezca en el input
          this.barCode = postNewMap.id
          // meter en el input la id del mapa para copiarlo y pasarlo a otras personas
          console.log(postNewMap)
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