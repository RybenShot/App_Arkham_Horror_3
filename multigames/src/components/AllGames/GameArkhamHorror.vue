<template>
  <div id="BGGameGeneral">
    <div id="BGGameGeneral" class="card mx-3 pt-3 container">
      
      <div class="control has-icons-left mx-4 my-4 px-4">
        <input class="input" type="search" placeholder="Buscar Carta">
        <span class="icon is-small is-left mx-4">
          <i class="fas fa-search "></i>
        </span>
      </div> 

      <router-link to="/MapasArkhamHorror">
        <div class="my-5 mx-4 " id="botonSeleccionarMapa">
          <h2 class="title py-4">Seleccionar Mapa</h2>
        </div>
      </router-link>

      <router-link to="">
        <div class="my-5 mx-4 " id="botonSeleccionarJugador">
          <h2 class="title py-4">Seleccionar Investigador</h2>
        </div>
      </router-link>

      <router-link to="/enproceso">
        <div class="my-5 mx-4 " id="botonCrearInvestigador">
          <h2 class="title py-4">Crear investigador</h2>
        </div>
      </router-link>

     </div> <!-- end container  -->
  </div> <!-- end BGGame  -->
</template>

<script>
export default {
  name: "Game Arkham Horror",
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap');

.title{
  -webkit-text-stroke: 0.5px rgb(255, 255, 255);
  color: black; 
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 700;
  font-size: 25px;
  line-height: 24px;
  text-align: center;
}

#botonSeleccionarMapa{
  background-image: url(../../assets/img/SeleccionarMapa.jpg);
  background-position: center;
  background-size: cover;
  width: 326px;
  height: 65px;
  border-radius: 10px;
  border: 3px solid rgb(255, 255, 255);
}
#botonSeleccionarJugador{
  background-image: url(../../assets/img/Seleccionar_investigador.jpg);
  background-position: center;
  background-size: cover;
  width: 326px;
  height: 65px;
  border-radius: 10px;
  border: 3px solid rgb(255, 255, 255);
}
#botonCrearInvestigador{
  background-image: url(../../assets/img/CrearInvestigador.jpg);
  background-position: center;
  background-size: cover;
  width: 326px;
  height: 65px;
  border-radius: 10px;
  border: 3px solid rgb(255, 255, 255);
}

#BGGameGeneral {
  background-image: url(../../assets/img/Games/ArkhamHorror/BG2MapaArkham.jpg);
  min-height: 82vh;
  background-position: center;
  background-size: cover;
}
</style>