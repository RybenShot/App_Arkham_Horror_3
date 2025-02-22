<template>
  <div >
      <div class="mx-2 container allWindow  has-background-dark">
        <!-- TITULO-->
        <header class="modal-card-head BGEnemigos mb-3">
          <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light" >{{ textoInterfaz.titulo }}</h2>
        </header>

        <!-- ModalDetalle -->
        <div v-if="this.$store.state.verDetalleEnemigo == true"><ModalDetalleEnemigo/></div>

        <div v-if="this.$store.state.datosMapa.idMapa == 10">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa1Secretos" :key="enemigo.id">
              <div @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" />

                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Alma en pena acechante" ||  
                        enemigo.ESnombreEnemigo === "Dhole tunelador" ||
                        enemigo.ESnombreEnemigo === "Chotacabras" ||
                        enemigo.ESnombreEnemigo === "Esclava mounstruosa" ||
                        enemigo.ESnombreEnemigo === "Tocado por el vacío" ||
                        enemigo.ESnombreEnemigo === "Siervo alterado"
                        '> X2</p>
                <p class="has-text-danger  titleDecoration2 pt-0" v-if= ' enemigo.ESnombreEnemigo === "Poltergeist enfurecido"'> X3</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 10  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 11">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa2Secretos" :key="enemigo.id">
              <div
              @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Devorador de carne" || 
                        enemigo.ESnombreEnemigo === "Canibal con garras" ||
                        enemigo.ESnombreEnemigo === "Alma en pena acechante"'> X2</p>

                <p class="has-text-danger  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Poltergeist enfurecido" ||
                        enemigo.ESnombreEnemigo === "Espectro difunto" '> X3</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 11  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 12">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa3Secretos" :key="enemigo.id">
              <div
              @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Devorador de carne" || 
                        enemigo.ESnombreEnemigo === "Gloton rabioso" ||
                        enemigo.ESnombreEnemigo === "Mole amenazante" ||
                        enemigo.ESnombreEnemigo === "Canibal con garras"'> X2</p>
                
                <p class="has-text-danger  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Espectro difunto" '> X3</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 12  -->

        <h2 class="title has-text-light has-text-centered is-4 pt-3 mb-3" >{{ textoInterfaz.enemigosExtras }}</h2>
        <hr class="my-1">

        <div v-if="this.$store.state.datosMapa.idMapa == 10">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Sin enemigos extras</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> No extra enemies</p>
        </div><!-- end IF MAPA 10  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 11">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Aparta todos los Monstruos Logia.</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> Set aside all Logia Monsters.</p>

          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosExtrasMapa2Secretos" :key="enemigo.id">
              <div
              @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" width="100" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 11  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 12">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Sin enemigos extras</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> No extra enemies</p>
        </div><!-- end IF MAPA 12  -->
        
        <!-- BOTON -->
        <div class="columns is-mobile  mt-4">
          <p class="column"></p>
          <div class="column">
            <button @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false)" class="button is-success has-text-black p-5" >{{ textoInterfaz.volver }}</button>
          </div>
          <p class="column"></p>
        </div>
        
      </div>
  </div>
</template>

<script>
import ModalDetalleEnemigo from "@/components/helpers/DetalleEnemigo.vue"

export default {
  name: "Enemigos de Secretos ",
  components: {
    ModalDetalleEnemigo
  },
  data(){
    return{
      textoInterfaz: {
        titulo: "",
        enemigos: "",
        enemigosExtras: "",
        volver: ""
      },

      EnemigosMapa1Secretos: [
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO3.jpg"),ENnombreEnemigo: "Bloody Titan", ESnombreEnemigo: "Titan Sangriento"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo10.jpg"),ENnombreEnemigo: "Carjacking", ESnombreEnemigo: "Robacadaveres"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO1.jpg"),ENnombreEnemigo: "Pursuing dog", ESnombreEnemigo: "Perro perseguidor"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO6.jpg"),ENnombreEnemigo: "Deranged being", ESnombreEnemigo: "Ser enloquecido"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO5.jpg"),ENnombreEnemigo: "Greedy giant", ESnombreEnemigo: "Gigante avido"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo18.jpg"),ENnombreEnemigo: "Howling horror", ESnombreEnemigo: "Horror aullante"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO9.jpg"),ENnombreEnemigo: "Enraged poltergeist", ESnombreEnemigo: "Poltergeist enfurecido"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO7.jpg"),ENnombreEnemigo: "Haunting spirit", ESnombreEnemigo: "Alma en pena acechante"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO2.jpg"),ENnombreEnemigo: "Tunneling dhole", ESnombreEnemigo: "Dhole tunelador"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo37.jpg"),ENnombreEnemigo: "Nightjar", ESnombreEnemigo: "Chotacabras"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo31.jpg"),ENnombreEnemigo: "Monster slave", ESnombreEnemigo: "Esclava mounstruosa"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo32.jpg"),ENnombreEnemigo: "Touched by the void", ESnombreEnemigo: "Tocado por el vacío"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo33.jpg"),ENnombreEnemigo: "Wolf slave", ESnombreEnemigo: "Esclavo lobuno"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo34.jpg"),ENnombreEnemigo: "Altered servant", ESnombreEnemigo: "Siervo alterado"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo36.jpg"),ENnombreEnemigo: "Avian slave", ESnombreEnemigo: "Esclavo aviar"},
      ],
      EnemigosMapa2Secretos: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo5.jpg"),ENnombreEnemigo: "flesh eater", ESnombreEnemigo: "Devorador de carne"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo17.jpg"),ENnombreEnemigo: "High priest", ESnombreEnemigo: "Sumo sacerdote"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo33.jpg"),ENnombreEnemigo: "Wolf slave", ESnombreEnemigo: "Esclavo lobuno"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO11.jpg"),ENnombreEnemigo: "Clawed cannibal", ESnombreEnemigo: "Canibal con garras"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo16.jpg"),ENnombreEnemigo: "Alpha Tyndals Dog", ESnombreEnemigo: "Perro de Tíndalos alfa"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO7.jpg"),ENnombreEnemigo: "Lurking specter", ESnombreEnemigo: "Alma en pena acechante"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO8.jpg"),ENnombreEnemigo: "Deceased specter", ESnombreEnemigo: "Espectro difunto"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO9.jpg"),ENnombreEnemigo: "Enraged poltergeist", ESnombreEnemigo: "Poltergeist enfurecido"},
      ],
      EnemigosExtrasMapa2Secretos: [
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO10.jpg"),ENnombreEnemigo: "Logia visionary", ESnombreEnemigo: "Vidente de la Logia"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO12.jpg"),ENnombreEnemigo: "Logia Guardian", ESnombreEnemigo: "Guardian de la Logia"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO13.jpg"),ENnombreEnemigo: "Twilight Sentinel", ESnombreEnemigo: "Centinela del crepusculo"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo27.jpg"),ENnombreEnemigo: "Simon Carter", ESnombreEnemigo: "Simon Carter"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo28.jpg"),ENnombreEnemigo: "Supplicant of the Twilight", ESnombreEnemigo: "Suplicante del Crepúsculo"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo29.jpg"),ENnombreEnemigo: "Hitman of the Lodge", ESnombreEnemigo: "Sicario de la Logia"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo30.jpg"),ENnombreEnemigo: "Adept of the Lodge", ESnombreEnemigo: "Adepto de la Logia"},
      ],
      EnemigosMapa3Secretos: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo8.jpg"),ENnombreEnemigo: "Abyssal servant", ESnombreEnemigo: "Siervo abisal"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO1.jpg"),ENnombreEnemigo: "Pursuing dog", ESnombreEnemigo: "Perro perseguidor"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo5.jpg"),ENnombreEnemigo: "flesh eater", ESnombreEnemigo: "Devorador de carne"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO8.jpg"),ENnombreEnemigo: "Deceased specter", ESnombreEnemigo: "Espectro difunto"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo3.jpg"),ENnombreEnemigo: "Be nightmarish", ESnombreEnemigo: "Ser de pesadilla"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo11.jpg"),ENnombreEnemigo: "Fast byakhee", ESnombreEnemigo: "Byakhee veloz"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO2.jpg"),ENnombreEnemigo: "Tunneling dhole", ESnombreEnemigo: "Dhole tunelador"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo2.jpg"),ENnombreEnemigo: "Rabid gloton", ESnombreEnemigo: "Gloton rabioso"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO3.jpg"),ENnombreEnemigo: "Bloody Titan", ESnombreEnemigo: "Titan Sangriento"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO4.jpg"),ENnombreEnemigo: "Menacing mole", ESnombreEnemigo: "Mole amenazante"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO5.jpg"),ENnombreEnemigo: "Greedy giant", ESnombreEnemigo: "Gigante avido"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO6.jpg"),ENnombreEnemigo: "Deranged being", ESnombreEnemigo: "Ser enloquecido"},
        {url: require("@/assets/img/4-Enemigos/4-Secretos/enemigoSO11.jpg"),ENnombreEnemigo: "Clawed cannibal", ESnombreEnemigo: "Canibal con garras"}
      ]
    }
  },
  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == "español"){
        this.textoInterfaz.titulo = "Enemigos";
        this.textoInterfaz.enemigosExtras = "Enemigos extras";
        this.textoInterfaz.volver = "Volver a Mapas";
      }else{
        this.textoInterfaz.titulo = "Enemies";
        this.textoInterfaz.enemigosExtras = "Extra enemies";
        this.textoInterfaz.volver = "Back to maps";
      }
    }
  },
  mounted(){
    this.rellenarTextoSegunIdioma();
  }
}
</script>

<style>
/* CSS en el Base */
</style>