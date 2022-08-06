<template>
<div>
  <section class="hero is-warning">
    <div class="hero-body">
       <router-link to="/#"><i class="fas fa-home has-background-white p-1" id="iconHome"
      ></i></router-link>
      <p class="title is-1">Multigames!</p>
    </div>
  </section>
  
  <div class="container">
    <GameGeneral/>
  </div>
  
</div>
  
</template>

<script>
import GameGeneral from '@/components/AllGames/GameGeneral.vue'


export default {
  name: 'Dados',
  components: {
    GameGeneral,
  }

}
</script>

<style scoped>
.hero-body{
    background-image: url(../assets/img/Games/General/FondoGamesGeneral.jpg) !important;
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

.container{
  height: 80vh;
}

#iconHome{
  position: absolute;
  left: 88%;
  top: 2%;
  border-radius: 5px;
}
</style>>

