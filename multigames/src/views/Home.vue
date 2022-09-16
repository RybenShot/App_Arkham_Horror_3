<template>
  <div class="BGAHHome">
    <div id="contenido">
      <!-- HERO -->
      <div class="hero is-small pt-2">
        <div class=" is-small columns is-mobile p-1 m-0">
          <p class="f-x2 column"></p>
          <img
            id="imgTitleAH"
            class="column p-0"
            src="../assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png"
            alt=""
          />
          <p class="column"></p>
        </div>
      </div>

      <!-- MENU LIST -->
      <div class="todo">
        <div class="container mx-4 px-2">
          <h1 class="has-text-centered titleDecoration title is-4 mb-0">
            Selecciona una caja
          </h1>

          <!-- CLASICO -->
          <router-link to="/HomeAHClasico">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card1">
              <div class="column p-1 is-one-third">
                <img
                  src="../assets/img/Games/AHBase/cajaAHClasico.png"
                  alt="Arkham Horror Caja Clasico"
                  class="cajasimg"
                />
              </div>
              <div class="column p-1">
                <h1 class="has-text-weight-bold">Arkham Horror Clasico</h1>
                <p class="has-text-weight-medium">4 mapas</p>
                <p class="has-text-weight-medium">12 investigadores</p>
                <p class="has-text-right">
                  <button class="button is-success p-2">Ver mas</button>
                </p>
              </div>
            </div>
          </router-link>

          <!-- MAREAS TENEBROSAS -->
          <router-link to="/enproceso">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card2">
              <div class="column p-1">
                <h1 class="has-text-right has-text-weight-bold">
                  Mareas Tenebrosas
                </h1>
                <p class="has-text-right has-text-weight-medium">4 mapas</p>
                <p class="has-text-right has-text-weight-medium">
                  8 investigadores
                </p>
                <button class="button is-success p-2">Ver mas</button>
              </div>
              <div class="column p-1 is-one-third">
                <img
                  src="../assets/img/Games/AHMareasTenebrosas/cajaAHMareasTenebrosas.png"
                  alt="Arkham Horror Caja Clasico"
                  class="cajasimg"
                />
              </div>
            </div>
          </router-link>

          <!-- NOCHE CERRADA -->
          <router-link to="/enproceso">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card3">
              <div class="column p-1 is-one-third">
                <img
                  src="../assets/img/Games/AHNocheCerrada/cajaAHNocheCerrada.png"
                  alt="Arkham Horror Caja Clasico"
                  class="cajasimg"
                />
              </div>
              <div class="column p-1">
                <h1 class="has-text-weight-bold">Noche cerrada</h1>
                <p class="has-text-weight-medium">2 mapas</p>
                <p class="has-text-weight-medium">4 investigadores</p>
                <p class="has-text-right">
                  <button class="button is-success p-2">Ver mas</button>
                </p>
              </div>
            </div>
          </router-link>

          <!-- SECRETOS DE LA ORDEN -->
          <router-link to="/enproceso">
            <div class="columns is-mobile box p-1 m-1 helperCards1234 card4">
              <div class="column p-1">
                <h1 class="has-text-right has-text-weight-bold">
                  Secretos de la orden
                </h1>
                <p class="has-text-right has-text-weight-medium">3 mapas</p>
                <p class="has-text-right has-text-weight-medium">
                  4 investigadores
                </p>
                <button class="button is-success p-2">Ver mas</button>
              </div>
              <div class="column p-1 is-one-third">
                <img
                  src="../assets/img/Games/AHSecretosDeLaOrden/cajaAHSecretosDeLaOrden.png"
                  alt="Arkham Horror Caja Clasico"
                  class="cajasimg"
                />
              </div>
            </div>
          </router-link>
        </div>
        <!-- end container   -->
      </div>
      <!-- end todo   -->
    </div>

    <video muted autoplay loop>
      <source src="@/assets/video/BGAHHome.mp4" type="video/mp4">
    </video>
    <div class="capa"></div>
  </div>
</template>

<script>
export default {
  name: "MenuGames",
  data() {
    return {}; // end return
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
.card1 {
  background-image: url(../assets/img/Games/AHBase/SeleccionarMapa.jpg);
}
.card2 {
  background-image: url(../assets/img/Games/AHMareasTenebrosas/SeleccionarMapa4.jpg);
}
.card3 {
  background-image: url(../assets/img/Games/AHNocheCerrada/SeleccionarMapa2.jpg);
}
.card4 {
  background-image: url(../assets/img/Games/AHSecretosDeLaOrden/SeleccionarMapa3.jpg);
}

#BGAHHome {
  /* background-image: url(../assets/img/Games/ArkhamHorror/BGAHHome.gif); */
  min-height: 120vh;
  position: relative;
  /* background-position: center;
  background-size: cover; */
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