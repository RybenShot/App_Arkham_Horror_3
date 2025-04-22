<template>
    <div class="modal is-active">
        <div class="modal-background" @click=" closeModal()"></div>
        <div class="mr-6">
          <div class="modal-card">
            <!-- TITULO -->
            <header class="modal-card-head BGPertenencias ">
              <p class="modal-card-title has-text-white title is-4 pt-2 m-0">{{ textoInterfaz.pertenencias }}</p>
              <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click=" closeModal()"></i>
            </header>

            <!-- ModalDetalle -->
            <div v-if="this.$store.state.verDetallePertenencia == true">
              <ModalVerDetallePertenencia/>
            </div>

            <section class="modal-card-body hero is-large pt-2 pb-6">
              <p class="has-text-centered title is-italic mb-0">{{ this.$store.state.datosPJactual.name }}</p>
              <div class="lineaSeparatoria mx-6">
                <div class="columns is-mobile" style="position: relative; top: 4px">
                  <i class=" has-text-left fas fa-dot-circle column p-0"></i>
                  <i class=" has-text-right fas fa-dot-circle column p-0"></i>
                </div>
              </div>
              <br>
              
              <div class="columns is-mobile">
                <!-- Per. 1 -->
                 <div v-for="object in responseObjects.objects" :key="object.id" class="column">
                    <img @click="seeCard(object.img)" :src="object.img" :alt="object.name" class="imageObject has-text-centered">
                 </div>
              </div>
              <br>

              <p class="has-text-centered title mb-0">{{ textoInterfaz.elije }}</p>

              <div class="lineaSeparatoria mx-6">
                <div class="columns is-mobile" style="position: relative; top: 4px">
                  <i class=" has-text-left fas fa-dot-circle column p-0"></i>
                  <i class=" has-text-right fas fa-dot-circle column p-0"></i>
                </div>
              </div>
              <br>
              <div class="columns is-mobile">
                <!-- Per opcionales -->
                <div v-for="object in responseObjects.optionalObjects" :key="object.id" class="column">
                    <img @click="seeCard(object.img)" :src="object.img" :alt="object.name" class="imageObject has-text-centered">
                 </div>
              </div>
            </section>

            <footer>
              <div class="field has-addons columns is-mobile is-gapless">
                  <button @click="closeModal()" class="button is-link is-fullwidth">
                    <p >{{ textoInterfaz.volver }}</p>
                  </button>

              </div>
            </footer>

          </div>
        </div>
      </div>
</template>

<script>
import  ModalVerDetallePertenencia  from "@/components/personajes/ModalsDetallePersonaje/ModalVerDetallePertenencia.vue";
import { apiService } from '@/services/api.js';
export default {
  name: "Lista Pertenencias",
  data(){
    return{
      textoInterfaz: {
        pertenencias:"",
        elije: "",
        volver: ""
      },
      responseObjects:{}
    }
  },
  components:{
    ModalVerDetallePertenencia
  },
  methods:{
    closeModal(){
      this.$store.state.modalPertenenciasDetalle = false;
      this.$store.state.verDetallePertenencia = false;
    },
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.pertenencias = "Pertenencias Iniciales";
        this.textoInterfaz.elije = this.responseObjects.optionalText;
        this.textoInterfaz.volver = "Volver";
      }else if(this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.pertenencias = "Belongings Initial";
        this.textoInterfaz.elije = this.responseObjects.optionalText;
        this.textoInterfaz.volver = "Go back";
      }
    },
    async serchInitialObjectsInv(){
      try {
        let idInv = this.$store.state.datosPJactual.idInv;
        const objects = await apiService.obtainPertenencesInv(idInv);
        this.responseObjects = objects;
        this.$store.state.responseObjectsInPlay = objects;
        console.log("Objetos principales del investigador", this.responseObjects);
      } catch (error) {
        console.error("Error al cargar los objetos principales del investigador", error);
      }
    },
    seeCard( url){
      this.$store.state.SeleccionarURLPertenencia = url;
      this.$store.state.verDetallePertenencia = true;
      console.log("URL de la carta seleccionada", this.$store.state.SeleccionarURLPertenencia);
    }
  },
  async mounted(){
    await this.serchInitialObjectsInv();
    this.rellenarTextoSegunIdioma();
    
  }
}
</script>

<style scope>
.BGPertenencias{
  background-image: url("@/assets/img/2-Pertenencias/IMGModalPertenencias.jpg");
  background-position: center;
  background-size: cover;
}

.CartasPertenencias{
  height: 40vh;
}
.cajaCartas{
height: 30vh;
overflow: hidden;
}

.imageObject{
  max-width: 140px;
}

.lineaSeparatoria{
  max-height: 1px;
  border: solid 1px black;
  padding: 0;
}
</style>