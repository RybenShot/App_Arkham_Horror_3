<template>
  <div>
    <section class="hero is-warning">
      <div class="hero-body">
        <router-link to="/"><i class="fas fa-home has-background-white p-1" id="iconHome"></i></router-link>
        <router-link to="/HomeArkhamHorror"><i class="fas fa-backward has-background-white p-1" id="iconback"></i></router-link>
        <p class="title titleDecoration is-2 pt-3 mb-3">Arkham Horror</p>
        <p class="subtitle is-6 titleDecoration pl-6" style="text-align: left">SELECCION DE PERSONAJE</p>
      </div>
    </section>

    <div>
      <GameArkhamHorrorPersonajes/>
    </div>
  </div>
</template>

<script>
import GameArkhamHorrorPersonajes from "@/components/AllGames/GameArkhamHorrorPersonajes.vue";
export default {
  name: 'View Game Arkham Horror Personajes',
  components: {
    GameArkhamHorrorPersonajes
  }

}
</script>


<style scoped>
  .hero-body{
    background-image: url(../assets/img/Games/ArkhamHorror/1FondoGamesArkhamHorror.jpg) !important;
    background-size: contain;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 168px ;
  }

  .titleDecoration{
    -webkit-text-stroke: 0.5px rgb(255, 255, 255);
    color: transparent; 
  }

  #iconHome{
    position: absolute;
    left: 88%;
    top: 2%;
    border-radius: 5px;
  }
  #iconback{
    position: absolute;
    left: 10px;
    top: 10px;
    border-radius: 5px;
  }
</style>>

