<template>
  <div :class="[BGGeneral]">
    <br />

    <!-- VIEW DE ENEMIGOS -->
    <div v-if="viewMapa == false">
      <div class="mx-3 container allWindow card">
        <!-- TITULO-->
        <div>
          <h1 class="title titleDecoration is-1 pt-3 mb-3">{{ this.title }}</h1>
        </div>

          <h2 class="title titleDecoration is-1 pt-3 mb-3">Enemigos</h2>

            <div v-if="this.contador == 1">
              <div id="enemisList" class="px-1">
                <div  v-for="item in EnemigosMapa1" :key="item.id" >
                  <div style="max-width:100px" class="mx-1"  >
                    <img :src="item.url" :alt="item.nombreEnemigo"/>
                    <p class="has-text-white pt-0">{{ item.nombreEnemigo }}</p>
                  </div>
                  
                </div>
              </div>
            </div><!-- end IF MAPA 1  -->

            <div v-if="this.contador == 2">
              <div id="enemisList" class="px-1">
                <div  v-for="item in EnemigosMapa2" :key="item.id" >
                  <div style="max-width:100px" class="mx-1"  >
                    <img :src="item.url" :alt="item.nombreEnemigo"/>
                    <p class="has-text-white pt-0">{{ item.nombreEnemigo }}</p>
                  </div>
                  
                </div>
              </div>
            </div><!-- end IF MAPA 2  -->

            <div v-if="this.contador == 3">
              <div id="enemisList" class="px-1">
                <div  v-for="item in EnemigosMapa3" :key="item.id" >
                  <div style="max-width:100px" class="mx-1"  >
                    <img :src="item.url" :alt="item.nombreEnemigo"/>
                    <p class="has-text-white pt-0">{{ item.nombreEnemigo }}</p>
                  </div>
                  
                </div>
              </div>
            </div><!-- end IF MAPA 3  -->

            <div v-if="this.contador == 4">
              <div id="enemisList" class="px-1">
                <div  v-for="item in EnemigosMapa4" :key="item.id" >
                  <div style="max-width:100px" class="mx-1"  >
                    <img :src="item.url" :alt="item.nombreEnemigo"/>
                    <p class="has-text-white pt-0">{{ item.nombreEnemigo }}</p>
                  </div>
                  
                </div>
              </div>
            </div><!-- end IF MAPA 4  -->

          <h2 class="title titleDecoration is-1 pt-3 mb-3" >Enemigos extras</h2>

            <div v-if="this.contador == 1"> 
              <p class="has-text-white">Sin enemigos extras</p>
            </div><!-- end IF MAPA 1  -->

            <div v-if="this.contador == 2"> 
              <p class="has-text-white">Aparta a un lado los siguientes mounstruos, estos son “los adoradores de Umordhoth”</p>
              <div id="enemisList" class="px-1">
                <div  v-for="item in EnemigosExtrasMapa2" :key="item.id">
                  <div  style="max-width:100px" class="mx-1">
                    <img :src="item.url" :alt="item.nombreEnemigo" width="100"/>
                    <p class="has-text-white pt-0">{{ item.nombreEnemigo }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end IF MAPA 2  -->

            <div v-if="this.contador == 3"> 
              <p class="has-text-white">Aparta a un lado los siguientes mounstruos, todos los Logia</p>
              <div id="enemisList" class="px-1">
                <div  v-for="item in EnemigosExtrasMapa3" :key="item.id">
                  <div  style="max-width:100px" class="mx-1">
                    <img :src="item.url" :alt="item.nombreEnemigo" width="100"/>
                    <p class="has-text-white pt-0">{{ item.nombreEnemigo }}</p>
                  </div>
                </div>
              </div>
            </div><!-- end IF MAPA 3  -->

            <div v-if="this.contador == 4"> 
              <p class="has-text-white">Sin enemigos extras</p>
            </div><!-- end IF MAPA 4  -->

        <button @click="this.viewMapa = true" class="button is-success has-text-black mt-5 p-5">Ver Mapas</button>

      </div>
    </div>

    <!-- SELECCION DE MAPA -->
    <div v-if="viewMapa == true">
      <div class="mx-3 container allWindow card">
        <!-- TITULO Y DESCRIPCION -->
        <div id="tituloDescripcion">
          <h1 class="title titleDecoration is-1 pt-3 mb-3">{{ this.title }}</h1>
          <p class="has-text-white has-text-weight-light is-italic">
            {{ this.description }}
          </p>
        </div>

        <!-- MAPA , FLECHAS Y BOTON -->
        <div class="columns is-mobile mt-5">
          <!-- ARROW izquierda -->
          <div class="column column is-one-fifth is-vcentered p-0">
            <!-- boton dehabilitado  -->
            <div v-if="this.contador <= 1">
              <button title="Disabled button" disabled class="p-2">
                <i class="fa-2x fas fa-angle-double-left"></i>
              </button>
            </div>

            <!-- boton funcionando!  -->
            <div v-if="this.contador > 1">
              <button @click="cambiaMapa(contador--)" class="p-2">
                <i class="fa-2x fas fa-angle-double-left"></i>
              </button>
            </div>
          </div>

          <!-- Mapa y Boton -->
          <div class="column p-0">
            <div class="mx-4" :class="[imgMapa]"></div>
            <button @click="this.viewMapa = false" class="button is-success has-text-black mt-5 p-5">Ver Enemigos</button>
          </div>

          <!-- ARROW derecha -->
            <div class="column column is-one-fifth is-vcentered p-0">
              <!-- boton deshabilitado -->
              <div v-if="this.contador >= 4">
                <button title="Disabled button" disabled class="p-2">
                  <i class="fa-2x fas fa-angle-double-right"></i>
                </button>
              </div>

              <!-- boton funcionando!  -->
              <div v-if="this.contador < 4">
                <button @click="cambiaMapa(contador++)" class="p-2">
                  <i class="fa-2x fas fa-angle-double-right"></i>
                </button>
              </div>
            </div>

        </div>
      </div><!-- end container  -->

      <!-- SELECCION DE PERSONAJE -->
      <router-link to="/PersonajesArkhamHorror">
        <div>
          <p class="subtitle titleDecoration has-text-right is-5 py-3">
            Ir a seleccion de personaje <i class="fa-2x fas fa-forward"></i>
          </p>
        </div> <!-- end seleccion de personaje  -->
      </router-link>
    </div>
  </div><!-- end BGGame  -->
  
</template>

<script>
export default {
  name: "Game Arkham Horror",

  data() {
    return {
      title: "La llegada de Azathoth",
      description:
        "En el colazon del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funnestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...",
      contador: "1",
      viewMapa: true,

      EnemigosMapa1: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo6.png"), nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo8.png"), nombreEnemigo: "Siervo abisal",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo9.png"), nombreEnemigo: "Vigia sin ojos",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo11.png"), nombreEnemigo: "Byakhee veloz",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo12.png"), nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo13.png"), nombreEnemigo: "Extraños con túnicas",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo15.png"), nombreEnemigo: "Depredador hambriento",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo16.png"), nombreEnemigo: "Perro de Tíndalos",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo17.png"), nombreEnemigo: "Sumo sacerdote",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo18.png"), nombreEnemigo: "Horror aullante",},
      ],
      EnemigosExtrasMapa1:[],


      EnemigosMapa2: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo1.png"), nombreEnemigo: "GulFurtivo",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo2.png"), nombreEnemigo: "Gloton rabioso",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo3.png"), nombreEnemigo: "Ser de pesadilla",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo4.png"), nombreEnemigo: "Acolito gul",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo5.png"), nombreEnemigo: "Devorador de carne",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo6.png"), nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo7.png"), nombreEnemigo: "Enmascarados",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo8.png"), nombreEnemigo: "Siervo abisal",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo9.png"), nombreEnemigo: "Vigia sin ojos",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo10.png"), nombreEnemigo: "Robacadaveres",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo14.png"), nombreEnemigo: "Sacerdote Gul",},
      ],
      EnemigosExtrasMapa2:[
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra1.png"), nombreEnemigo: "Alma Hill",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra2.png"), nombreEnemigo: "Ruth Turner",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra3.png"), nombreEnemigo: 'Drew "el hombre lobo"',},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra4.png"), nombreEnemigo: "Cazador Enmascarado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra5.png"), nombreEnemigo: "Herman Collins",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigoExtra6.png"), nombreEnemigo: "Billy Cooper",},
      ],


      EnemigosMapa3: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo31.png"), nombreEnemigo: "Esclava mounstruosa",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo32.png"), nombreEnemigo: "Tocado por el vacío",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo33.png"), nombreEnemigo: "Esclavo lobuno",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo34.png"), nombreEnemigo: "Siervo alterado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo35.png"), nombreEnemigo: "Bestia alterada",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo36.png"), nombreEnemigo: "Esclavo aviar",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo37.png"), nombreEnemigo: "Chotacabras",},
      ],
      EnemigosExtrasMapa3:[
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo27.png"), nombreEnemigo: "Simon Carter",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo28.png"), nombreEnemigo: "Suplicante del Crepúsculo",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo29.png"), nombreEnemigo: 'Sicario de la Logia',},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo30.png"), nombreEnemigo: "Adepto de la Logia",},
      ],

      
      EnemigosMapa4: [
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo6.png"), nombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo12.png"), nombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo19.png"), nombreEnemigo: "Guardián de R`lyeh",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo20.png"), nombreEnemigo: "Titán de marea",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo21.png"), nombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo22.png"), nombreEnemigo: "Vástago del océano",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo23.png"), nombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo24.png"), nombreEnemigo: "Matón Híbrido",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo25.png"), nombreEnemigo: "Endriago de río",},
        {url: require("@/assets/img/Games/ArkhamHorror/enemigos/enemigo26.png"), nombreEnemigo: "Cantor marino",},
      ],

      BGGeneral: "BGGameGeneralMapa1",
      imgMapa: "imgMapa1",
    }; // end return
  }, // end data

  mounted() {},

  methods: {
    cambiaMapa() {
      if (this.contador == 1) {
        this.title = "La llegada de Azathoth";
        this.description =
          "En el colazon del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funnestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...";
        this.BGGeneral = "BGGameGeneralMapa1";
        this.imgMapa = "imgMapa1";
      } else if (this.contador == 2) {
        this.title = "Festin para Umordhoth";
        this.description =
          "Los gules que habitan en el mundo subterraneo se alimentan de la carne de los muertos: con todo, incluso ellos viven temerosos del Devorador de las Profundidades alq ue reverencian. Pero los gules no son los unicos en Arkham que veneran a mordhoth...";
        this.BGGeneral = "BGGameGeneralMapa2";
        this.imgMapa = "imgMapa2";
      } else if (this.contador == 3) {
        this.title = "El velo del Crepusculo";
        this.description =
          "Algo acecha en el gelido vacio que separa nuestros mundos. Susurra desde el otro lado del velo, llamandoa  todos los que tengan el poder necesario para liberarlo de su confinamiento. Quienes sucumben a su influjo obtienen un gran poder, pero el precio que pagan es terrible. Y con cada dia que pasa su liberacion esta mas proxima...";
        this.BGGeneral = "BGGameGeneralMapa3";
        this.imgMapa = "imgMapa3";
      } else if (this.contador == 4) {
        this.title = "Ecos de las profundidades";
        this.description =
          "En su morada de R’lyeh, el difunto Cthulhu aguada soñando. Se agita en su letargo y espera a que las estrellas sean propicias para que R’lyeh emerja de su hogar bajo las olas y los primigenios regresen. Pues no esta muerto lo que puede yacer eternamente, y con los evos extraños aun la muerte puede morir...";
        this.BGGeneral = "BGGameGeneralMapa4";
        this.imgMapa = "imgMapa4";
      }
    }, // end cambiaMapa
  }, // end methods

  watch: {}, // end watch
}; // end export defaul
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap");

.title {
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
  font-weight: 700;
  font-size: 25px;
  line-height: 24px;
  text-align: center;
}

.allWindow {
  min-height: 70vh;
}

.titleDecoration {
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
  font-family: "Roboto Flex", sans-serif;
  font-weight: 800;
  text-align: center;
}

.card {
  background: rgba(79, 79, 79, 0.75);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

#tituloDescripcion {
  min-height: 20vh;
}

/* ENEMIGOS */
#enemisList {
  display: grid;
  grid-template-columns: auto auto auto;

}

/* MAPAS */
.imgMapa1 {
  background-image: url(../../assets/img/Games/ArkhamHorror/mapa1.png);
  width: 181px;
  height: 263px;
}
.imgMapa2 {
  background-image: url(../../assets/img/Games/ArkhamHorror/mapa2.png);
  width: 181px;
  height: 263px;
}
.imgMapa3 {
  background-image: url(../../assets/img/Games/ArkhamHorror/mapa3.png);
  width: 181px;
  height: 263px;
}
.imgMapa4 {
  background-image: url(../../assets/img/Games/ArkhamHorror/mapa4.png);
  width: 181px;
  height: 263px;
}

/* BACKGROUND */
.BGGameGeneralMapa1 {
  background-image: url(../../assets/img/Games/ArkhamHorror/BG1MapaArkham.jpg);
  min-height: 82vh;
  background-position: center;
  background-size: cover;
}
.BGGameGeneralMapa2 {
  background-image: url(../../assets/img/Games/ArkhamHorror/BG2MapaArkham.jpg);
  min-height: 82vh;
  background-position: center;
  background-size: cover;
}
.BGGameGeneralMapa3 {
  background-image: url(../../assets/img/Games/ArkhamHorror/BG3MapaArkham.jpg);
  min-height: 82vh;
  background-position: center;
  background-size: cover;
}
.BGGameGeneralMapa4 {
  background-image: url(../../assets/img/Games/ArkhamHorror/BG4MapaArkham.jpg);
  min-height: 82vh;
  background-position: center;
  background-size: cover;
}
</style>