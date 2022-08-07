<template>
  <div>

    <section class="hero is-warning">
    <div class="hero-body">
       <router-link to="/"><i class="fas fa-home has-background-white p-1" id="iconHome"
      ></i></router-link>
      <p class="title is-2 py-3">Arkham Horror</p>
    </div>
  </section>

  <div>
    <GameArkhamHorror/>
  </div>




  </div>
</template>

<script>
import GameArkhamHorror from "@/components/AllGames/GameArkhamHorror.vue";
export default {
  name: 'View Game Arkham Horror',
  components: {
    GameArkhamHorror
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

  .title{
    -webkit-text-stroke: 0.5px rgb(255, 255, 255);
    color: transparent; 
  }

  #iconHome{
  position: absolute;
  left: 88%;
  top: 2%;
  border-radius: 5px;
  }
</style>>

