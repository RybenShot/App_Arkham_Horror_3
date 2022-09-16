<template>
   <div >
      <div class="mx-2 container allWindow card">
        <!-- TITULO-->
        <h2 class="title titleDecoration is-4 pt-3 mb-3">Enemigos</h2>
        <hr class="my-1">

        <div v-if="this.contador == 1">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa1" :key="item.id">
              <div style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white  titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.contador == 2">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa2" :key="item.id">
              <div style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.contador == 3">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa3" :key="item.id">
              <div style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 3  -->

        <div v-if="this.contador == 4">
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosMapa4" :key="item.id">
              <div style="max-width: 100px" class="mb-4 mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 4  -->

        <h2 class="title titleDecoration is-4 pt-3 mb-3">Enemigos extras</h2>
        <hr class="my-1">

        <div v-if="this.contador == 1">
          <p class="has-text-white p-2">Sin enemigos extras</p>
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.contador == 2">
          <p class="has-text-white p-2"> Aparta a un lado los siguientes mounstruos, estos son “los adoradores de Umordhoth”</p>

          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa2" :key="item.id">
              <div style="max-width: 100px" class="mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.contador == 3">
          <p class="has-text-white p-2">Aparta a un lado los siguientes mounstruos, todos los Logia</p>
          <div id="enemisList" class="px-1">
            <div v-for="item in EnemigosExtrasMapa3" :key="item.id">
              <div style="max-width: 100px" class="mx-1">
                <img :src="item.url" :alt="item.nombreEnemigo" width="100" />
                <p class="has-text-white titleDecoration2 pt-0">{{ item.nombreEnemigo }}</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 3  -->

        <div v-if="this.contador == 4">
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
export default {
  name: "enemigosAHClasicoComponente",
  props: ['contador'],
  data(){
    return {
      EnemigosMapa1: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo6.png"),nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo8.png"),nombreEnemigo: "Siervo abisal",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo9.png"),nombreEnemigo: "Vigia sin ojos",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo11.png"),nombreEnemigo: "Byakhee veloz",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo12.png"),nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo13.png"),nombreEnemigo: "Extraños con túnicas",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo15.png"),nombreEnemigo: "Depredador hambriento",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo16.png"),nombreEnemigo: "Perro de Tíndalos",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo17.png"),nombreEnemigo: "Sumo sacerdote",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"),nombreEnemigo: "Horror aullante",}
      ],
      EnemigosExtrasMapa1: [],

      EnemigosMapa2: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo1.png"),nombreEnemigo: "GulFurtivo",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo2.png"),nombreEnemigo: "Gloton rabioso",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo3.png"),nombreEnemigo: "Ser de pesadilla",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo4.png"),nombreEnemigo: "Acolito gul",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo5.png"),nombreEnemigo: "Devorador de carne",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo6.png"),nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo7.png"),nombreEnemigo: "Enmascarados",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo8.png"),nombreEnemigo: "Siervo abisal",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo9.png"),nombreEnemigo: "Vigia sin ojos",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo10.png"),nombreEnemigo: "Robacadaveres",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo14.png"),nombreEnemigo: "Sacerdote Gul",},
      ],
      EnemigosExtrasMapa2: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra1.png"),nombreEnemigo: "Alma Hill",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra2.png"),nombreEnemigo: "Ruth Turner",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra3.png"),nombreEnemigo: 'Drew "el hombre lobo"',},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra4.png"),nombreEnemigo: "Cazador Enmascarado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra5.png"),nombreEnemigo: "Herman Collins",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra6.png"),nombreEnemigo: "Billy Cooper",},
      ],

      EnemigosMapa3: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo31.png"),nombreEnemigo: "Esclava mounstruosa",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo32.png"),nombreEnemigo: "Tocado por el vacío",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo33.png"),nombreEnemigo: "Esclavo lobuno",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo34.png"),nombreEnemigo: "Siervo alterado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo35.png"),nombreEnemigo: "Bestia alterada",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo36.png"),nombreEnemigo: "Esclavo aviar",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo37.png"),nombreEnemigo: "Chotacabras",},
      ],
      EnemigosExtrasMapa3: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo27.png"),nombreEnemigo: "Simon Carter",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo28.png"),nombreEnemigo: "Suplicante del Crepúsculo",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo29.png"),nombreEnemigo: "Sicario de la Logia",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo30.png"),nombreEnemigo: "Adepto de la Logia",},
      ],

      EnemigosMapa4: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo6.png"),nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo12.png"),nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo19.png"),nombreEnemigo: "Guardián de R`lyeh",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo20.png"),nombreEnemigo: "Titán de marea",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo21.png"),nombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo22.png"),nombreEnemigo: "Vástago del océano",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo23.png"),nombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo24.png"),nombreEnemigo: "Matón Híbrido",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo25.png"),nombreEnemigo: "Endriago de río",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo26.png"),nombreEnemigo: "Cantor marino",},
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