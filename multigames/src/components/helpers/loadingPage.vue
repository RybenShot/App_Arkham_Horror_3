<template>
    <div class="loading-container">
      <div class="symbol"></div>
      
      <div class="modalLoading is-active">
        <div class="">
          <div class="modal-card has-text-center">
            <header class="columns is-mobile BGArticles modal-card-head m-0">
              <p class="modal-card-title is-5 " ></p>
            </header>

            <section class="modal-card-body hero is-large p-2 is-vcentered">
              <h1 v-if="this.$store.state.lenguaje == 'ingles'" class="title has-text-centered mb-0">{{ selected.title }}</h1>
              <h1 v-else class="title has-text-centered mb-0">{{ selected.translations.es.title }}</h1>

              <hr class="is-dark m-0 p-0">

              <h2 v-if="this.$store.state.lenguaje == 'ingles'" class="subtitle has-text-centered px-3">{{ selected.description }}</h2>
              <h2 v-else class="subtitle has-text-centered px-3">{{ selected.translations.es.description }}</h2>

              <img class="imgLoading" :src="selected.img" :alt="selected.title">
            </section>

          </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'LoadingPage',
    data() {
      return {
        articles: [
          {
            id: 2,
            title: "Do you want to collaborate on the project?",
            description: "Message us on Instagram and we'll see what we can do!",
            img: "/img/5-otros/articulosPaginaDeCarga/RexMurphy-te-busca.png",
            translations: {
              es: {
                title: "¿Quieres colaborar en el proyecto?",
                description: "Hablanos por instagram y veremos que podemos hacer!",
              }
            }
          },
          {
            id: 4,
            title: "By Lovecraft ...",
            description: "That is not dead which can eternal lie",
            img: "https://imgs.search.brave.com/6xX1htpRvLhx_ze_hQZ99RWg1Wykl4RyI5cwsr8Nehw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8x/LzEwL0guX1AuX0xv/dmVjcmFmdCxfSnVu/ZV8xOTM0LmpwZw",
            translations: {
              es: {
                title: "By Lovecraft ...",
                description: "No está muerto lo que puede yacer eternamente.",
              }
            }
          },
          {
            id: 6,
            title: "Design a scenario",
            description: "Submit your own adventure or encounter and we might add it as an official fan-made scenario.",
            img: "/img/5-otros/articulosPaginaDeCarga/creadores.jpg",
            translations: {
              es: {
                title: "Diseña un escenario",
                description: "Envía tu propia aventura o encuentro y podríamos añadirlo como fan-made de comunidad.",
              }
            }
          },
          {
            id: 11,
            title: "Special thanks …",
            description: "@miduDev, for all your videos, none of this would be possible without your knowledge.",
            img: "/img/5-otros/articulosPaginaDeCarga/MiduPhoto.png",
            translations: {
              es: {
                title: "Agradecimiento especial ...",
                description: "@miduDev, por todos tus videos, nada de esto sería posible sin tus conocimientos. ",
              }
            }
          },
        ],
        selected: { title: '', description: '' }
      };
    },
    methods: {
      pickRandomArticle() {
        const numRandom = Math.floor(Math.random() * this.articles.length);
        this.selected = this.articles[numRandom];
      }
    },
    created() {
      this.pickRandomArticle();
    }
  };
</script>

<style scoped>
  .BGArticles{
    background-image: url(@/assets/img/Estados/Bendicion.jpg);
    background-position: center;
    background-size: cover;
  } 
  .loading-container {
    position: fixed;
    inset: 0;
    background: radial-gradient(circle at center, #1a1a1a, #000);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    max-width: 450px;
    margin: 0 auto;
  }
    
  .symbol {
    width: 220px;
    height: 220px;
    background: url('@/assets/img/ArkhamHorrorLogo.png') no-repeat center;
    background-size: contain;
    animation: pump 1s ease-in-out infinite;
  }
    
  @keyframes pump {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.05); }
  }

  .loading-text {
    margin-top: 20px;
    color: #ccc;
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    text-shadow: 0 0 5px #880000;
    animation: blink 1s steps(2) infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .imgLoading{
    max-width: 300px;
    margin: 0 auto;
  }
</style>  