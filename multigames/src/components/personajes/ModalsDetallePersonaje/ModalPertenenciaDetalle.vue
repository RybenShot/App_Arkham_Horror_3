<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="mr-6">
          <div class="modal-card">
            <!-- TITULO -->
            <header class="modal-card-head BGPertenencias ">
              <p class="modal-card-title has-text-white title is-4 pt-2 m-0">{{ textoInterfaz.pertenencias }}</p>
              <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.modalPertenenciasDetalle = false"></i>
            </header>

            <!-- ModalDetalle -->
            <div v-if="this.$store.state.verDetallePertenencia == true">
              <ModalVerDetallePertenencia/>
            </div>

            <section class="modal-card-body hero is-large pt-2 pb-6">
              <p class="has-text-centered title is-italic mb-0">{{ this.$store.state.datosPJactual.nombrePJ }}</p>
              <div class="lineaSeparatoria mx-6">
                <div class="columns is-mobile" style="position: relative; top: 4px">
                  <i class=" has-text-left fas fa-dot-circle column p-0"></i>
                  <i class=" has-text-right fas fa-dot-circle column p-0"></i>
                </div>
              </div>
              <br>
              
              <div class="columns is-mobile">

                <!-- Per. 1 -->
                <img @click="(this.$store.state.verDetallePertenencia = true), (this.$store.state.SeleccionarURLPertenencia = this.$store.state.datosPJactual.Pertenencia1.fotoCartaPertenenciaURL)" 
                :class="{'column': this.$store.state.datosPJactual.Pertenencia2 }" class="CartasPertenencias cajaCartas" :src="this.$store.state.datosPJactual.Pertenencia1.fotoCartaPertenenciaURL" alt="">

                <!-- Per 2 -->
                <img @click="(this.$store.state.verDetallePertenencia = true), (this.$store.state.SeleccionarURLPertenencia = this.$store.state.datosPJactual.Pertenencia2.fotoCartaPertenenciaURL)" 
                v-if="this.$store.state.datosPJactual.Pertenencia2 != null" class="CartasPertenencias cajaCartas column" :src="this.$store.state.datosPJactual.Pertenencia2.fotoCartaPertenenciaURL" alt="">
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
                <!-- Per 3 -->
                <img @click="(this.$store.state.verDetallePertenencia = true), (this.$store.state.SeleccionarURLPertenencia = this.$store.state.datosPJactual.Pertenencia3.fotoCartaPertenenciaURL)" 
                :class="{'column': this.$store.state.datosPJactual.Pertenencia4 != null }" class="CartasPertenencias cajaCartas" :src="this.$store.state.datosPJactual.Pertenencia3.fotoCartaPertenenciaURL" alt="">

                <!-- Per 4 -->
                <img @click="(this.$store.state.verDetallePertenencia = true), (this.$store.state.SeleccionarURLPertenencia = this.$store.state.datosPJactual.Pertenencia4.fotoCartaPertenenciaURL)" 
                v-if="this.$store.state.datosPJactual.Pertenencia4 != null" class="CartasPertenencias cajaCartas column" :src="this.$store.state.datosPJactual.Pertenencia4.fotoCartaPertenenciaURL" alt="">

                <!-- Condiciones especiales de personajes -->
                <div v-if="this.$store.state.datosPJactual.Pertenencia4 == null" class="column">
                   <!-- Esta partye hayq ue corregirla, para que aparezca tambien en ingles -->
                  <p v-if="this.$store.state.datosPJactual.nombrePJ == 'Calvin Wrigth'">Si coges este objeto, debes añadirte un "Pacto Siniestro"</p>
                </div>
              </div>
            </section>

            <footer>
              <div class="field has-addons columns is-mobile is-gapless">
                  <button @click="this.$store.state.modalPertenenciasDetalle = false" class="button is-link is-fullwidth">
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
export default {
  name: "Lista Pertenencias",
  data(){
    return{
      textoInterfaz: {
        pertenencias:"",
        elije: "",
        volver: ""
      }
    }
  },
  components:{
    ModalVerDetallePertenencia
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.pertenencias = "Pertenencias Iniciales";
        this.textoInterfaz.elije = "Elige 1";
        this.textoInterfaz.volver = "Volver";
      }else if(this.$store.state.lenguaje == "ingles"){
        this.textoInterfaz.pertenencias = "Belongings Initial";
        this.textoInterfaz.elije = "Choose 1";
        this.textoInterfaz.volver = "Go back";
      }
    }
  },
  mounted(){
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

.lineaSeparatoria{
  max-height: 1px;
  border: solid 1px black;
  padding: 0;
}
</style>