<template>
  <div class="BGAHHome">
    <div id="contenido">
      <!-- HERO -->
      <div class="hero is-small pt-2">
        <div class=" is-small columns is-mobile p-1 m-0">
          <p class="f-x2 column has-text-centered">
            <button @click="this.$store.state.lenguaje = 'español'"><img style="max-height: 50px;" src="../assets/img/ZZOtros/banderas/espana.png" alt="Español"></button>
          </p>
          <img id="imgTitleAH" class="column p-0" src="../assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png" alt=""/>
          <p class="column has-text-centered">
            <button @click="this.$store.state.lenguaje = 'ingles'"><img style="max-height: 50px;" src="../assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles"></button>
          </p>
        </div>
      </div>

    <!-- MODAL BIENVENIDA -->
      <div v-if="modalBienvenida">
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-body hero is-large py-2 has-background-black-ter p-4">
                <h2 class="has-text-centered title mb-0 has-text-white" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.wellcome.titulo'"></h2>
                <h2 class="has-text-centered title mb-0 has-text-white" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.wellcome.titulo'"></h2>

                <hr class="my-3">
                <h2 class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.wellcome.parrafo_1'"></h2>
                <h2 class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.wellcome.parrafo_1'"></h2>
                <br>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'">Si encontrais algún error en la app, me lo podéis decir en la cuenta de <a href="https://www.instagram.com/apparkhamhorror">Instagram</a> o puedes agragarme a whatsapp : 600358809 para formar parte de esta familia infame.</p>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">If you find any errors in the app, you can tell me in the account <a href="https://www.instagram.com/apparkhamhorror">Instagram</a> or you can thank whatsapp : 600358809 to be part of this infamous family.</p>

                <br>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.wellcome.parrafo_3'"></p>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.wellcome.parrafo_3'"></p>

              </section>
              <footer class="modal-card-foot has-background-grey-dark">
                <button @click="modalBienvenida = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'español'">Cerrar</button>
                <button @click="modalBienvenida = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'ingles'">Close</button>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DONACION -->
      <div v-if="modalDonacion">
        <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              
              <header class="modal-card-head BGBendicion">
                <p class="modal-card-title title" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.titulo'"></p>
                <p class="modal-card-title title" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.titulo'"></p>
              </header>

              <section class="modal-card-body hero is-large py-2">

                <!--Lenguajes  -->
                <div class="columns is-mobile m-0" >
                  <div class="column p-0 mb-1 has-text-white subtitle has-text-centered">
                    <button @click="this.$store.state.lenguaje = 'español'"><img style="max-height: 50px;" src="../assets/img/ZZOtros/banderas/espana.png" alt="Español"></button>
                  </div>
                  <div class="column p-0 mb-1 has-text-white subtitle has-text-centered">
                    <button @click="this.$store.state.lenguaje = 'ingles'"><img style="max-height: 50px;" src="../assets/img/ZZOtros/banderas/reino-unido.png" alt="Ingles"></button>
                  </div>
                </div>

                <hr class="m-0 has-text-black">

                <h2 v-if="this.$store.state.lenguaje == 'español'" class="has-text-centered">Esta aplicación está hecha por solo <strong><u> 1 persona</u></strong>, que invierte todo el tiempo que puede. Actualmente está en desarrollo la 4ª versión, donde puedes ver el progreso en <a href="https://www.instagram.com/apparkhamhorror">Instagram</a>.</h2>
                <h2 v-if="this.$store.state.lenguaje == 'ingles'" class="has-text-centered" v-t="'EN.Home.modals.recuerda.parrafo_1'"></h2>
                <h2 v-if="this.$store.state.lenguaje == 'ingles'" class="has-text-centered">===== <a href="https://www.instagram.com/apparkhamhorror"><strong><u>apparkhamhorror</u></strong></a> =====</h2>

                <h2 class="has-text-centered" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.parrafo_2'"></h2>
                <h2 class="has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.parrafo_2'"></h2>

                <h1 class="title has-text-centered mb-0" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.parrafo_3'"></h1>
                <h1 class="title has-text-centered mb-0" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.parrafo_3'"></h1>

                <p class="has-text-centered" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.parrafo_4'"></p>
                <p class="has-text-centered" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.parrafo_4'"></p>

                <p class="has-text-centered title is-4 py-3" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.final'"></p>
                <p class="has-text-centered title is-4 py-3" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.final'"></p>
                
              </section>
              <footer class="modal-card-foot">
                <a class="column p-1" href="https://www.buymeacoffee.com/appArkhamHorror" target="_blank">
                <button class="button is-3 is-success" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.btn_Monster'"></button>
                <button class="button is-3 is-success" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.btn_Monster'"></button>
                
                </a>
                <button @click="modalDonacion = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.modals.recuerda.btn_Mas-tarde'"></button>
                <button @click="modalDonacion = false" class="button column is-3 is-link p-1" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.modals.recuerda.btn_Mas-tarde'"></button>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <!-- MENU LIST -->
      <div class="todo">
        <div class="container mx-4 px-2">
          <h1 class="has-text-centered titleDecoration title is-4 mb-0" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.titulo'"></h1>
          <h1 class="has-text-centered titleDecoration title is-4 mb-0" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.titulo'"></h1>

          <!-- Base -->
          <router-link to="/HomeAHClasico">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card1">
              <div class="column p-1 is-one-third">
                <img src="../assets/img/Games/AHBase/cajaAHClasico.png" alt="Arkham Horror Caja Base" class="cajasimg" />
              </div>
              <div class="column p-1">
                <h1 class="has-text-weight-bold" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion1.tituloExpansion'"></h1>
                <h1 class="has-text-weight-bold" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion1.tituloExpansion'"></h1>

                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion1.mapas'"></p>
                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion1.mapas'"></p>

                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion1.investigadores'"></p>
                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion1.investigadores'"></p>

                <p class="has-text-right">
                  <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.btn-mas'"></button>
                  <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.btn-mas'"></button>
                </p>
              </div>
            </div>
          </router-link>

          <!-- MAREAS TENEBROSAS -->
          <router-link to="/HomeAHMareasTenebrosas">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card2">
              <div class="column p-1">
                <h1 class="has-text-right has-text-weight-bold" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion2.tituloExpansion'"></h1>
                <h1 class="has-text-right has-text-weight-bold" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion2.tituloExpansion'"></h1>

                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion2.mapas'"></p>
                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion2.mapas'"></p>

                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion2.investigadores'"></p>
                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion2.investigadores'"></p>

                <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.btn-mas'"></button>
                <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.btn-mas'"></button>
              </div>
              <div class="column p-1 is-one-third">
                <img src="../assets/img/Games/AHMareasTenebrosas/cajaAHMareasTenebrosas.png" alt="Arkham Horror Caja Mareas Tenebrosas" class="cajasimg"/>
              </div>
            </div>
          </router-link>

          <!-- NOCHE CERRADA -->
          <router-link to="/enproceso">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card3">
              <div class="column p-1 is-one-third">
                <img src="../assets/img/Games/AHNocheCerrada/cajaAHNocheCerrada.png" alt="Arkham Horror Caja Noche Cerrada" class="cajasimg"/>
              </div>
              <div class="column p-1">
                <h1 class="has-text-weight-bold" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion3.tituloExpansion'"></h1>
                <h1 class="has-text-weight-bold" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion3.tituloExpansion'"></h1>

                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion3.mapas'"></p>
                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion3.mapas'"></p>

                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion3.investigadores'"></p>
                <p class="has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion3.investigadores'"></p>

                <p class="has-text-right">
                  <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.btn-mas'"></button>
                  <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.btn-mas'"></button>
                </p>
              </div>
            </div>
          </router-link>

          <!-- SECRETOS DE LA ORDEN -->
          <router-link to="/enproceso">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card4">
              <div class="column p-1">
                <h1 class="has-text-right has-text-weight-bold" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion4.tituloExpansion'"></h1>
                <h1 class="has-text-right has-text-weight-bold" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion4.tituloExpansion'"></h1>

                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion4.mapas'"></p>
                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion4.mapas'"></p>

                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.opcion4.investigadores'"></p>
                <p class="has-text-right has-text-weight-medium" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.opcion4.investigadores'"></p>

                <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'español'" v-t="'ES.Home.portal.btn-mas'"></button>
                <button class="button is-success p-2" v-if="this.$store.state.lenguaje == 'ingles'" v-t="'EN.Home.portal.btn-mas'"></button>
              </div>
              <div class="column p-1 is-one-third">
                <img src="../assets/img/Games/AHSecretosDeLaOrden/cajaAHSecretosDeLaOrden.png" alt="Arkham Horror Caja Secretos de la Orden" class="cajasimg"/>
              </div>
            </div>
          </router-link>
        </div>
        <!-- end container   -->
      </div>
      <br>

    </div><!-- end todo   -->

    <!-- <video muted autoplay loop>
      <source src="@/assets/video/BGAHHome.mp4" type="video/mp4">
    </video> -->
    <!-- <div class="capa"></div> -->
  </div>
</template>

<script>
import DetalleModalAHBase from '@/components/helpers/GeneralHomeModals/DetalleAHBase.vue';

export default {
  name: "MenuGames",
   components:{
    DetalleModalAHBase

  },
  data() {
    return {
      modalDonacion: true,
      modalBienvenida: true,
    }; // end return
  }, // end data
  methods: {}, // end methods
};
</script>

<style scoped>
@font-face {
  font-family: tituloSeleccion;
  src: url("../assets/fonts/home/Stranger back in the Night.ttf");
}

/* HERO */
#imgTitleAH {
  width: 50%;
}
.hero-body {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 168px;
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}

button{
   background: none;
  border: 0;
  color: inherit;
}

.titleDecoration {
  -webkit-text-stroke: 0.8px rgb(136, 255, 136);
  color: black;
  font-family: "tituloSeleccion";
  font-weight: 500;
  font-size: 10vh!important;
  letter-spacing: 2px;
  text-align: center;
  text-shadow: 0px 0px 20px rgb(30, 255, 0);
}

/* MENU LIST */
.cajasimg {
  width: 100%;
}

/* HELPERS  */
.helperCards1234 {
  background-position: center;
  background-size: cover;
  border-radius: 0px;
}
.card1 {background-image: url(../assets/img/Games/AHBase/SeleccionarMapa.jpg);}
.card2 {background-image: url(../assets/img/Games/AHMareasTenebrosas/SeleccionarMapa4.jpg);}
.card3 {background-image: url(../assets/img/Games/AHNocheCerrada/SeleccionarMapa2.jpg);}
.card4 {background-image: url(../assets/img/Games/AHSecretosDeLaOrden/SeleccionarMapa3.jpg);}

#BGAHHome {
  background-image: url(../assets/img/ZZOtros/banckgroundVDemo.jpg);
  min-height: 120vh;
  position: relative;
  background-position: center;
  background-size: cover;
}
video{
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 120%;
  object-fit: cover;
}
.capa {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1c1c1d;
  opacity: 0.5;
  mix-blend-mode: overlay;
} 
#contenido{
  position: relative;
  z-index: 2;
}
</style>