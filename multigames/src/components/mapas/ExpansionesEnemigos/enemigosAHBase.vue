<template>
   <div >
      <div class="mx-2 container allWindow  has-background-dark">
        <!-- TITULO-->
        <header class="modal-card-head BGEnemigos mb-3">
          <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light" v-if="this.$store.state.lenguaje == 'español'">Enemigos</h2>
          <h2 class="title titleDecoration is-4 pt-3 mb-3 has-text-light" v-if="this.$store.state.lenguaje == 'ingles'">Enemies</h2>
        </header>

        <!-- ModalDetalle -->
        <div v-if="this.$store.state.verDetalleEnemigo == true"><ModalDetalleEnemigo/></div>

        <div v-if="this.$store.state.datosMapa.idMapa == 0">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa1Base" :key="enemigo.id">
              <div
              @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" />

                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white  titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Merodeador encapuchado" ||  
                        enemigo.ESnombreEnemigo === "Mago ceremonial"
                        '> X2</p>
                <p class="has-text-danger  titleDecoration2 pt-0" v-if= ' enemigo.ESnombreEnemigo === "Extraños con túnicas"'> X3</p>

              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 0  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 1">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa2Base" :key="enemigo.id">
              <div
              @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Merodeador encapuchado" ||  
                        enemigo.ESnombreEnemigo === "Gloton rabioso" ||
                        enemigo.ESnombreEnemigo === "Acolito gul" || 
                        enemigo.ESnombreEnemigo === "Devorador de carne"
                        '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 2">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa3Base" :key="enemigo.id">
              <div
              @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Bestia alterada" ||  
                        enemigo.ESnombreEnemigo === "Chotacabras" ||
                        enemigo.ESnombreEnemigo === "Esclava mounstruosa" || 
                        enemigo.ESnombreEnemigo === "Tocado por el vacío" ||
                        enemigo.ESnombreEnemigo === "Siervo alterado"
                  '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 3">
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosMapa4Base" :key="enemigo.id">
              <div
              @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mb-4 mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" />
                
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Mago ceremonial" ||  
                        enemigo.ESnombreEnemigo === "Merodeador encapuchado" ||
                        enemigo.ESnombreEnemigo === "Vástago del océano" || 
                        enemigo.ESnombreEnemigo === "Depredador de bajamar" ||
                        enemigo.ESnombreEnemigo === "Matón Híbrido" ||
                        enemigo.ESnombreEnemigo === "Endriago de río"
                  '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 3  -->

        <h2 class="title titleDecoration has-text-white has-text-centered is-4 pt-3 mb-3" v-if="this.$store.state.lenguaje == 'español'">Enemigos extras</h2>
        <h2 class="title titleDecoration has-text-white has-text-centered is-4 pt-3 mb-3" v-if="this.$store.state.lenguaje == 'ingles'">Extra enemies</h2>
        <hr class="my-1">

        <div v-if="this.$store.state.datosMapa.idMapa == 0">
          <p class="has-text-white" v-if="this.$store.state.lenguaje == 'español'">Sin enemigos extras</p>
          <p class="has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">No extra enemies</p>
        </div><!-- end IF MAPA 0  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 1">
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'"> Aparta a un lado los siguientes mounstruos, estos son “los adoradores de Umordhoth”</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'"> Set aside the following monsters, these are "the worshippers of Umordhoth"</p>

          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosExtrasMapa2Base" :key="enemigo.id">
              <div
              @click=" (this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" width="100" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 1  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 2">
          <p class="has-text-white p-2">Aparta a un lado los siguientes mounstruos, todos los Logia</p>
          <div id="enemisList" class="px-1">
            <div v-for="enemigo in EnemigosExtrasMapa3Base" :key="enemigo.id">
              <div
              @click="(this.$store.state.verDetalleEnemigo = true), (this.$store.state.SeleccionarURLEnemigo = enemigo.url)" class="helperCartasEnemigos mx-1">
                <img :src="enemigo.url" :alt="enemigo.ESnombreEnemigo" width="100" />

                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'español'">{{ enemigo.ESnombreEnemigo }}</p>
                <p class="has-text-white titleDecoration2 pt-0" v-if="this.$store.state.lenguaje == 'ingles'">{{ enemigo.ENnombreEnemigo }}</p>

                <p class="has-text-success  titleDecoration2 pt-0" 
                v-if= ' enemigo.ESnombreEnemigo === "Suplicante del Crepúsculo" ||  
                        enemigo.ESnombreEnemigo === "Sicario de la Logia" ||
                        enemigo.ESnombreEnemigo === "Adepto de la Logia"
                  '> X2</p>
              </div>
            </div>
          </div>
        </div><!-- end IF MAPA 2  -->

        <div v-if="this.$store.state.datosMapa.idMapa == 3">

          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'español'">Sin enemigos extras</p>
          <p class="has-text-white p-2" v-if="this.$store.state.lenguaje == 'ingles'">No extra enemies</p>

        </div><!-- end IF MAPA 3  -->
        
        <!-- Boton volver -->
        <div class="columns is-mobile  mt-4">
          <p class="column"></p>
          <div class="column">
            <button @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false)" class="button is-success has-text-black p-5" v-if="this.$store.state.lenguaje == 'español'">Volver a Mapas</button>
            <button @click="(this.$store.state.viewDetalleMapa = true), (this.$store.state.modalVerEnemigos = false)" class="button is-success has-text-black p-5" v-if="this.$store.state.lenguaje == 'ingles'">Back to maps</button>
          </div>
          <p class="column"></p>
        </div>
        
      </div>
    </div>
</template>

<script>
import ModalDetalleEnemigo from "@/components/helpers/DetalleEnemigo.vue"

export default {
  name: "Enemigos de AH Base",
  components:{
    ModalDetalleEnemigo
  },
  data(){
    return {
      EnemigosMapa1Base: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo6.jpg"),ENnombreEnemigo: "Hooded marauder", ESnombreEnemigo: "Merodeador encapuchado"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo8.jpg"),ENnombreEnemigo: "Abyssal servant", ESnombreEnemigo: "Siervo abisal"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo9.jpg"),ENnombreEnemigo: "Lookout", ESnombreEnemigo: "Vigia sin ojos"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo11.jpg"),ENnombreEnemigo: "Fast byakhee", ESnombreEnemigo: "Byakhee veloz"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo12.jpg"),ENnombreEnemigo: "Ceremonial magician", ESnombreEnemigo: "Mago ceremonial"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo13.jpg"),ENnombreEnemigo: "Strangers in robes", ESnombreEnemigo: "Extraños con túnicas"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo15.jpg"),ENnombreEnemigo: "Hungry predator", ESnombreEnemigo: "Depredador hambriento"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo16.jpg"),ENnombreEnemigo: "Alpha Tyndals Dog", ESnombreEnemigo: "Perro de Tíndalos alfa"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo17.jpg"),ENnombreEnemigo: "High priest", ESnombreEnemigo: "Sumo sacerdote"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo18.jpg"),ENnombreEnemigo: "Howling horror", ESnombreEnemigo: "Horror aullante"}
      ],
      EnemigosExtrasMapa1Base: [],

      EnemigosMapa2Base: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo7.jpg"),ENnombreEnemigo: "Masked", ESnombreEnemigo: "Enmascarados"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo6.jpg"),ENnombreEnemigo: "Hooded marauder", ESnombreEnemigo: "Merodeador encapuchado"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo10.jpg"),ENnombreEnemigo: "Carjacking", ESnombreEnemigo: "Robacadaveres"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo8.jpg"),ENnombreEnemigo: "Abyssal servant", ESnombreEnemigo: "Siervo abisal"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo9.jpg"),ENnombreEnemigo: "Lookout", ESnombreEnemigo: "Vigia sin ojos"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo1.jpg"),ENnombreEnemigo: "Gul Furtive", ESnombreEnemigo: "Gul Furtivo"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo2.jpg"),ENnombreEnemigo: "Rabid gloton", ESnombreEnemigo: "Gloton rabioso"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo3.jpg"),ENnombreEnemigo: "Be nightmarish", ESnombreEnemigo: "Ser de pesadilla"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo4.jpg"),ENnombreEnemigo: "Acolyte gul", ESnombreEnemigo: "Acolito gul"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo5.jpg"),ENnombreEnemigo: "flesh eater", ESnombreEnemigo: "Devorador de carne"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo14.jpg"),ENnombreEnemigo: "Priest Gul", ESnombreEnemigo: "Sacerdote Gul"},
      ],
      EnemigosExtrasMapa2Base: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo38.jpg"),ENnombreEnemigo: "Alma Hill", ESnombreEnemigo: "Alma Hill",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo39.jpg"),ENnombreEnemigo: "Ruth Turner", ESnombreEnemigo: "Ruth Turner",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo41.jpg"),ENnombreEnemigo: 'Drew "the werewolf"', ESnombreEnemigo: 'Drew "el hombre lobo"',},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo42.jpg"),ENnombreEnemigo: "Masked hunter", ESnombreEnemigo: "Cazador Enmascarado",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo43.jpg"),ENnombreEnemigo: "Herman Collins", ESnombreEnemigo: "Herman Collins",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo40.jpg"),ENnombreEnemigo: "Billy Cooper", ESnombreEnemigo: "Billy Cooper",},
      ],

      EnemigosMapa3Base: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo35.jpg"),ENnombreEnemigo: "Altered beast", ESnombreEnemigo: "Bestia alterada"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo37.jpg"),ENnombreEnemigo: "Nightjar", ESnombreEnemigo: "Chotacabras"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo31.jpg"),ENnombreEnemigo: "Monster slave", ESnombreEnemigo: "Esclava mounstruosa"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo32.jpg"),ENnombreEnemigo: "Touched by the void", ESnombreEnemigo: "Tocado por el vacío"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo33.jpg"),ENnombreEnemigo: "Wolf slave", ESnombreEnemigo: "Esclavo lobuno"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo34.jpg"),ENnombreEnemigo: "Altered servant", ESnombreEnemigo: "Siervo alterado"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo36.jpg"),ENnombreEnemigo: "Avian slave", ESnombreEnemigo: "Esclavo aviar"},
      ],
      EnemigosExtrasMapa3Base: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo27.jpg"),ENnombreEnemigo: "Simon Carter", ESnombreEnemigo: "Simon Carter"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo28.jpg"),ENnombreEnemigo: "Supplicant of the Twilight", ESnombreEnemigo: "Suplicante del Crepúsculo"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo29.jpg"),ENnombreEnemigo: "Hitman of the Lodge", ESnombreEnemigo: "Sicario de la Logia"},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo30.jpg"),ENnombreEnemigo: "Adept of the Lodge", ESnombreEnemigo: "Adepto de la Logia"},
      ],

      EnemigosMapa4Base: [
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo19.jpg"),ENnombreEnemigo: "Guardian of R`lyeh", ESnombreEnemigo: "Guardián de R`lyeh",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo12.jpg"),ENnombreEnemigo: "Ceremonial magician", ESnombreEnemigo: "Mago ceremonial",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo6.jpg"),ENnombreEnemigo: "Hooded marauder", ESnombreEnemigo: "Merodeador encapuchado",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo20.jpg"),ENnombreEnemigo: "Tidal titan", ESnombreEnemigo: "Titán de marea",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo21.jpg"),ENnombreEnemigo: "Riverside beast", ESnombreEnemigo: "Bestia de la ribera",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo22.jpg"),ENnombreEnemigo: "Ocean stem", ESnombreEnemigo: "Vástago del océano",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo23.jpg"),ENnombreEnemigo: "Low-water predator", ESnombreEnemigo: "Depredador de bajamar",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo24.jpg"),ENnombreEnemigo: "Thug Hybrid", ESnombreEnemigo: "Matón Híbrido",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo25.jpg"),ENnombreEnemigo: "River bed", ESnombreEnemigo: "Endriago de río",},
        {url: require("@/assets/img/4-Enemigos/1-Base/enemigo26.jpg"),ENnombreEnemigo: "Sea singer", ESnombreEnemigo: "Cantor marino",},
      ],
    }
  }, // end data
  methods:{}
}
</script>

<style>
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

.BGEnemigos{
  background-image: url(@/assets/img/4-Enemigos/Enemigos.jpg);
  background-position: center;
  background-size: cover;
}
.helperCartasEnemigos{
  max-width: 100px
}
</style>