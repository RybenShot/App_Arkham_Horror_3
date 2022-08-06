<template>
  <div>
    <div class="todo">
      <div class="container mx-2 " id="gamesList">

        <router-link to="/GameGeneral" style="width: 111px;">
          <button class="card Game" id="GamesGeneral">
            <h1 class="titletextGames title is-5"><strong>General</strong></h1>
          </button>
        </router-link>

        <router-link to="/" style="width: 111px;">
          <button class="card Game" id="GamesArkhamHorror">
            <h1 class="titletextGames" style="font-size: 14px;">Arkham Horror</h1>
            <p class="subtitletextGames">3 Eddition</p>
          </button>
        </router-link>

        <router-link to="/#" style="width: 111px;">
          <button class="card Game" id="GamesZombicide">
            <h1 class="titletextGames">Zombicide</h1>
            <p class="subtitletextGames">Black Plage</p>
          </button>
        </router-link>

        <router-link to="/#" style="width: 111px;">
          <button class="card Game" id="GamesBloodborne">
            <h1 class="titletextGames">Bloodborne</h1>
            <p class="subtitletextGames">el juego de tablero</p>
          </button>
        </router-link>

        <router-link to="/#" style="width: 111px;">
          <button class="card Game" id="GamesMansionesDeLaLocura">
            <h1 class="titletextGames" style="font-size: 14px;" >Mansiones de</h1>
            <p class="subtitletextGames">la locura</p>
          </button>
        </router-link>

        <router-link to="/#" style="width: 111px;">
          <button class="card Game" id="GamesDyD">
            <h1 class="titletextGames">D & D</h1>
          </button>
        </router-link>

        <router-link to="/#" style="width: 111px;">
          <button class="card Game" id="GamesWarhammer">
            <h1 class="titletextGames" style="font-size: 16px" >Warhammer</h1>
            <p class="subtitletextGames">40.000</p>
          </button>
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
#gamesList{
    display: grid;
    grid-template-columns: auto auto auto ;
    grid-column-gap: 3vmin;
}

.Game{
  width: 111px;
  height: 111px;
}

.card{
  margin-top: 10px;
}

.titletextGames{
  -webkit-text-stroke: 0.8px rgb(255, 255, 255);
  color: black; 
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 1000;
  font-size: 18px;
}

.subtitletextGames{
  -webkit-text-stroke: 0.8px rgb(255, 255, 255);
  color: black; 
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 1000;
  font-size: 13px;
}





#GamesGeneral{
  background-image: url(../assets/img/Games/General/FondoGamesGeneral.jpg); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
#GamesArkhamHorror{
  background-image: url(../assets/img/Games/FondoGamesArkham.jpg); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
#GamesZombicide{
  background-image: url(../assets/img/Games/FondoGamesZombicide.jpg); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
#GamesBloodborne{
  background-image: url(../assets/img/Games/FondoGamesBloodborne.jpg); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
#GamesMansionesDeLaLocura{
  background-image: url(../assets/img/Games/FondoGamesMansionesDeLaLocura.jpg); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
#GamesDyD{
  background-image: url(../assets/img/Games/FondoGamesD&D.jpg); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
#GamesWarhammer{
  background-image: url(../assets/img/Games/FondoGamesWarhammer.jpg); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

</style>