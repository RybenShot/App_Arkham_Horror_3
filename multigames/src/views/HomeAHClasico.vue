<template>
  <div id="BGGameGeneral">
    <!-- HERO -->
    <router-link to="/">
      <div class="hero-body columns is-mobile p-1 m-0">
        <p class="column"></p>
        <img id="imgTitleAH" class="column p-0" src="../assets/img/ZZOtros/TituloArkhamHorrorEDITADO.png" alt="">
        <p class="column  "></p>
      </div>
    </router-link>

    <!-- CONTENT -->
    <div >
      <div  class="BGGrisBig mx-3 pt-3 container">

        <div class="mb-5 mx-3 p-5 pt-6" id="heroAHClasico">
          <h2 class="BGGrisSmall title py-4">Arkham Horror Clasico</h2>
        </div>
        
        <div class="control has-icons-left mx-4 my-4 px-4">
          <input class="input" type="search" placeholder="Buscar Carta">
          <span class="icon is-small is-left mx-4">
            <i class="fas fa-search "></i>
          </span>
        </div> 
      
        <router-link to="/MapasAHClasico">
          <div class="helperBotonesSelectores my-5 mx-4 " id="botonSeleccionarMapa">
            <h2 class="title py-4">Seleccionar Mapa</h2>
          </div>
        </router-link>

        <router-link to="/PersonajesAHClasico">
          <div class="helperBotonesSelectores my-5 mx-4 " id="botonSeleccionarJugador">
            <h2 class="title py-4">Seleccionar Investigador</h2>
          </div>
        </router-link>

        <router-link to="/enproceso">
          <div class="helperBotonesSelectores my-5 mx-4 " id="botonCrearInvestigador">
            <h2 class="title py-4">Crear investigador</h2>
          </div>
        </router-link>

      </div> <!-- end container  -->
    </div> <!-- end CONTENT -->
  </div><!-- end BGGame  --> 
</template>

<script>
export default {
  name: 'View Game Arkham Horror',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');

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
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 700;
  font-size: 25px;
  line-height: 24px;
  text-align: center;
}

.BGGrisBig{
  background-image: url(../assets/img/ZZOtros/simpleBGTransparente.png);
  background-position: center;
  background-size: cover;
  height: 623px;
  border-radius: 10px;
}
.BGGrisSmall{
  background-image: url(../assets/img/ZZOtros/simpleBGTransparente.png);
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
#heroAHClasico{
  background-image: url(../assets/img/Games/AHBase/SeleccionarMapaclear.jpg);
  background-position: center;
  background-size: cover;
  width: 345px;
  height: 152px;
}

/* HELPER */
.helperBotonesSelectores{
  background-position: center;
  background-size: cover;
  width: 326px;
  height: 65px;
  border-radius: 10px;
  border: 3px solid rgb(255, 255, 255);
}
#botonSeleccionarMapa{background-image: url(../assets/img/Games/AHBase/SeleccionarMapaclear.jpg);}
#botonSeleccionarJugador{background-image: url(../assets/img/Games/AHBase/Seleccionar_investigador.jpg);}
#botonCrearInvestigador{background-image: url(../assets/img/ZZOtros/CrearInvestigador.jpg);}

#BGGameGeneral {
  background-image: url(../assets/img/Games/AHBase/1imgMapas/BG2MapaArkham.jpg);
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}
</style>>

