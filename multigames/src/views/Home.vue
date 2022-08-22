<template>
  <div id=BGAHHome>

    <!-- HERO -->
    <div class="hero-body columns is-mobile p-1 m-0">
      <p class="f-x2 column is-one-fifth p-0"><i class="fas fa-undo"></i></p>
      <img id="imgTitleAH" class="column p-0" src="../assets/img/TituloArkhamHorrorEDITADO.png" alt="">
      <p class="column is-one-fifth p-0"></p>
    </div>

    <!-- MENU LIST -->
    <div class="todo">
      <div class="container mx-4 px-2 ">

        <h1 class="has-text-centered title is-4">SELECCIONA UNA CAJA</h1>

        <!-- CLASICO -->
        <router-link to="/HomeAHClasico">
          <div class="columns is-mobile box p-1 m-1 card1">
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHClasico.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
            <div class="column p-1">
              <h1 class="has-text-weight-bold">Arkham Horror Clasico</h1>
              <p class="has-text-weight-medium">4 mapas</p>
              <p class="has-text-weight-medium">12 investigadores</p>
              <p class="has-text-right"><button class="button is-success p-2 ">Ver mas</button></p>
            </div>
          </div>
        </router-link>

        <!-- MAREAS TENEBROSAS -->
        <router-link to="/HomeArkhamHorror">
          <div class="columns is-mobile box p-1 m-1 card2">
            <div class="column p-1">
              <h1 class="has-text-right has-text-weight-bold">Mareas Tenebrosas</h1>
              <p class="has-text-right has-text-weight-medium">4 mapas</p>
              <p class="has-text-right has-text-weight-medium">8 investigadores</p>
              <button class="button is-success p-2">Ver mas</button>
            </div>
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHMareasTenebrosas.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
          </div>
        </router-link>

        <!-- NOCHE CERRADA -->
        <router-link to="/enproceso">
          <div class="columns is-mobile box p-1 m-1 card3">
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHNocheCerrada.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
            <div class="column p-1">
              <h1 class="has-text-weight-bold">Noche cerrada</h1>
              <p class="has-text-weight-medium">2 mapas</p>
              <p class="has-text-weight-medium">4 investigadores</p>
              <p class="has-text-right"><button class="button is-success p-2 ">Ver mas</button></p>
            </div>
          </div>
        </router-link>

        <!-- SECRETOS DE LA ORDEN -->
        <router-link to="/enproceso">
          <div class="columns is-mobile box p-1 m-1 card4">
            <div class="column p-1">
              <h1 class="has-text-right has-text-weight-bold">Secretos de la orden</h1>
              <p class="has-text-right has-text-weight-medium">3 mapas</p>
              <p class="has-text-right has-text-weight-medium">4 investigadores</p>
              <button class="button is-success p-2 ">Ver mas</button>
            </div>
            <div class="column p-1 is-one-third">
              <img src="../assets/img/Games/ArkhamHorror/cajaAHSecretosDeLaOrden.png" alt="Arkham Horror Caja Clasico" class="cajasimg" >
            </div>
          </div>
        </router-link>

      </div> <!-- end container   -->
    </div> <!-- end todo   -->
  </div>
</template>

<script>
export default {
  name: 'MenuGames',
  data(){
    return{
    } // end return
  }, // end data
  methods: {
  } // end methods
};
</script>

<style scoped>

/* HERO */
#imgTitleAH{
  width: 50%;
}
.hero-body{
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 168px ;
  padding-top: 2rem!important;
  padding-bottom: 2rem!important;
}

.title{
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black;
}

/* MENU LIST */
.cajasimg{
  width: 100%;
}
.card1{
  background-image: url(../assets/img/SeleccionarMapa.jpg);
  background-position: center;
  background-size: cover;
  border-radius: 0px;
}
.card2{
  background-image: url(../assets/img/SeleccionarMapa4.jpg);
  background-position: center;
  background-size: cover;
  border-radius: 0px;
}
.card3{
  background-image: url(../assets/img/SeleccionarMapa2.jpg);
  background-position: center;
  background-size: cover;
  border-radius: 0px;
}
.card4{
  background-image: url(../assets/img/SeleccionarMapa3.jpg);
  background-position: center;
  background-size: cover;
  border-radius: 0px;
}


#BGAHHome {
  background-image: url(../assets/img/Games/ArkhamHorror/BG2MapaArkham.jpg);
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}
</style>