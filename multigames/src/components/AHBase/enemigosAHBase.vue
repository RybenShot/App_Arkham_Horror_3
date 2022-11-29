<template>
   <div >
      <div class="mx-2 container allWindow card">
        <!-- TITULO-->
        <h2 class="title titleDecoration is-4 pt-3 mb-3">Enemigos</h2>
        <hr class="my-1">

        <!-- ModalDetalle -->
        <div v-if="this.$store.state.verDetalleEnemigo == true">
          <ModalDetalleEnemigo/>
        </div> <!-- end ModalDetalleEnemigo -->

        <div v-if="this.$store.state.contadorMapa == 0">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa1" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white  titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Merodeador encapuchado" ||  
                        item.nombreEnemigo === "Mago ceremonial"
                        '> X2</p>
                <p class="has-text-danger  titleDecoration2 pt-0" v-if= ' item.nombreEnemigo === "Extraños con túnicas"'> X3</p>

              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.$store.state.contadorMapa == 1">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa2" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Merodeador encapuchado" ||  
                        item.nombreEnemigo === "Gloton rabioso" ||
                        item.nombreEnemigo === "Acolito gul" || 
                        item.nombreEnemigo === "Devorador de carne"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.$store.state.contadorMapa == 2">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa3" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Bestia alterada" ||  
                        item.nombreEnemigo === "Chotacabras" ||
                        item.nombreEnemigo === "Esclava mounstruosa" || 
                        item.nombreEnemigo === "Tocado por el vacío" ||
                        item.nombreEnemigo === "Siervo alterado"
                  '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 3  -->

        <div v-if="this.$store.state.contadorMapa == 3">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa4" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Mago ceremonial" ||  
                        item.nombreEnemigo === "Merodeador encapuchado" ||
                        item.nombreEnemigo === "Vástago del océano" || 
                        item.nombreEnemigo === "Depredador de bajamar" ||
                        item.nombreEnemigo === "Matón Híbrido" ||
                        item.nombreEnemigo === "Endriago de río"
                  '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 4  -->

        <h2 class="title titleDecoration is-4 pt-3 mb-3">Enemigos extras</h2>
        <hr class="my-1">

        <div v-if="this.$store.state.contadorMapa == 0">
          <p class="has-text-white">Sin enemigos extras</p>
          <!-- <p class="has-text-white">Merodeador Encapuchado x2</p>
          <p class="has-text-white">Mago Ceremonial x2</p>
          <p class="has-text-white">Extraños con túnicas x2</p> -->
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.$store.state.contadorMapa == 1">
          <p class="has-text-white p-2"> Aparta a un lado los siguientes mounstruos, estos son “los adoradores de Umordhoth”</p>

          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa2" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.$store.state.contadorMapa == 2">
          <p class="has-text-white p-2">Aparta a un lado los siguientes mounstruos, todos los Logia</p>
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa3" :key="item.id">
              <div
              @click="
              (this.$store.state.verDetalleEnemigo = true),
              (this.$store.state.SeleccionarURLEnemigo = item.url)" style="max-width: 100px" class="mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' item.nombreEnemigo === "Suplicante del Crepúsculo" ||  
                        item.nombreEnemigo === "Sicario de la Logia" ||
                        item.nombreEnemigo === "Adepto de la Logia"
                  '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 3  -->

        <div v-if="this.$store.state.contadorMapa == 3">
          <p class="has-text-white p-2">Sin enemigos extras</p>
        </div><!-- end IF MAPA 4  -->

        <div class="columns is-mobile  mt-4">
          <p class="column"></p>
          <div class="column"><button 
          @click="cambiarVista(true)" 
          class="button is-success has-text-black p-5">Volver a Mapas</button></div>
          <p class="column"></p>
        </div>
        
      </div>
    </div>
</template>

<script>
import ModalDetalleEnemigo from "@/components/helpers/DetalleEnemigo.vue"

export default {
  name: "enemigosAHClasicoComponente",
  components:{
    ModalDetalleEnemigo
  },
  data(){
    return {
      EnemigosMapa1: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo6.jpg"),nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo8.jpg"),nombreEnemigo: "Siervo abisal",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo9.jpg"),nombreEnemigo: "Vigia sin ojos",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo11.jpg"),nombreEnemigo: "Byakhee veloz",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo12.jpg"),nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo13.jpg"),nombreEnemigo: "Extraños con túnicas",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo15.jpg"),nombreEnemigo: "Depredador hambriento",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo16.jpg"),nombreEnemigo: "Perro de Tíndalos",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo17.jpg"),nombreEnemigo: "Sumo sacerdote",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo18.jpg"),nombreEnemigo: "Horror aullante",}
      ],
      EnemigosExtrasMapa1: [],

      EnemigosMapa2: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo7.jpg"),nombreEnemigo: "Enmascarados",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo6.jpg"),nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo10.jpg"),nombreEnemigo: "Robacadaveres",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo8.jpg"),nombreEnemigo: "Siervo abisal",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo9.jpg"),nombreEnemigo: "Vigia sin ojos",},

        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo1.jpg"),nombreEnemigo: "GulFurtivo",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo2.jpg"),nombreEnemigo: "Gloton rabioso",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo3.jpg"),nombreEnemigo: "Ser de pesadilla",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo4.jpg"),nombreEnemigo: "Acolito gul",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo5.jpg"),nombreEnemigo: "Devorador de carne",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo14.jpg"),nombreEnemigo: "Sacerdote Gul",},
      ],
      EnemigosExtrasMapa2: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo38.jpg"),nombreEnemigo: "Alma Hill",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo39.jpg"),nombreEnemigo: "Ruth Turner",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo41.jpg"),nombreEnemigo: 'Drew "el hombre lobo"',},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo42.jpg"),nombreEnemigo: "Cazador Enmascarado",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo43.jpg"),nombreEnemigo: "Herman Collins",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo40.jpg"),nombreEnemigo: "Billy Cooper",},
      ],

      EnemigosMapa3: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo35.jpg"),nombreEnemigo: "Bestia alterada",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo37.jpg"),nombreEnemigo: "Chotacabras",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo31.jpg"),nombreEnemigo: "Esclava mounstruosa",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo32.jpg"),nombreEnemigo: "Tocado por el vacío",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo33.jpg"),nombreEnemigo: "Esclavo lobuno",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo34.jpg"),nombreEnemigo: "Siervo alterado",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo36.jpg"),nombreEnemigo: "Esclavo aviar",},
      ],
      EnemigosExtrasMapa3: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo27.jpg"),nombreEnemigo: "Simon Carter",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo28.jpg"),nombreEnemigo: "Suplicante del Crepúsculo",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo29.jpg"),nombreEnemigo: "Sicario de la Logia",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo30.jpg"),nombreEnemigo: "Adepto de la Logia",},
      ],

      EnemigosMapa4: [
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo19.jpg"),nombreEnemigo: "Guardián de R`lyeh",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo12.jpg"),nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo6.jpg"),nombreEnemigo: "Merodeador encapuchado",},
        
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo20.jpg"),nombreEnemigo: "Titán de marea",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo21.jpg"),nombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo22.jpg"),nombreEnemigo: "Vástago del océano",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo23.jpg"),nombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo24.jpg"),nombreEnemigo: "Matón Híbrido",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo25.jpg"),nombreEnemigo: "Endriago de río",},
        {url: require("@/assets/img/Games/AHBase/4imgEnemigos/enemigo26.jpg"),nombreEnemigo: "Cantor marino",},
      ],
    }
  }, // end data
  methods:{
    cambiarVista(ValueCambiarVista){
      this.$emit('cambiarVistaHijo', ValueCambiarVista)
    } // end cambiaVista
  }
}
</script>

<style scoped>
@font-face {
  font-family: tituloEnemigos;
  src: url("@/assets/fonts/enemigos/tipografiaEnemigos.ttf");
}

.titleDecoration2 {
  -webkit-text-stroke: 0,1px rgb(255, 255, 255)!important;
  color: black;
  font-family: "tituloEnemigos", sans-serif;
  letter-spacing: 1px;
  line-height: 1rem;
  font-size: 0.8rem!important;
  text-align: center;
}

/* ENEMIGOS */
#enemisList {
  display: grid;
  grid-template-columns: auto auto auto;
}
</style>