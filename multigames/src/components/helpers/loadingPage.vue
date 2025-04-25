<template>
    <div class="loading-container">
      <div class="symbol"></div>
      
      <div class="modalLoading is-active">
        <div class="mr-6">
          <div class="modal-card has-text-center">
            <header class="columns is-mobile BGArticles modal-card-head m-0">
              <p class="modal-card-title is-5 " ></p>
            </header>

            <section class="modal-card-body hero is-large p-2">
              <h1 v-if="this.$store.state.lenguaje == 'ingles'" class="title has-text-centered mb-0">{{ selected.title }}</h1>
              <h1 v-else class="title has-text-centered mb-0">{{ selected.translations.es.title }}</h1>

              <hr class="is-dark m-0 p-0">

              <h2 v-if="this.$store.state.lenguaje == 'ingles'" class="subtitle has-text-centered px-3">{{ selected.description }}</h2>
              <h2 v-else class="subtitle has-text-centered px-3">{{ selected.translations.es.description }}</h2>

              <img :src="selected.img" :alt="selected.title">
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
            id: 0,
            title: "Hidden Character",
            description: "Can you find this playable character? Send us a screenshot on our Instagram if you manage to!",
            img: "/img/1-inv/57-Nameless.jpg",
            translations: {
              es: {
                title: "Personaje oculto.",
                description: "¿Eres capaz de encontrar este personaje jugable? Mandanos a nuestro Instagram una captura si lo has logrado!",
              }
            }
          },
          {
            id: 1,
            title: "In the next update ...",
            description: "Online interaction with other players will be added.",
            img: "/img/5-otros/articulosPaginaDeCarga/grupoDeJugadores.png",
            translations: {
              es: {
                title: "En la siguiente actualizacion...",
                description: "Se añadirá interaccion online con otros jugadores.",
              }
            }
          },
          {
            id: 2,
            title: "Do you want to collaborate on the project?",
            description: "Message us on Instagram and we'll see what we can do!",
            img: "/img/5-otros/articulosPaginaDeCarga/RexMurphy-te-busca.png",
            translations: {
              es: {
                title: "Quieres colavorar en el proyecto?",
                description: "Hablanos por instagram y veremos que podemos hacer!",
              }
            }
          },
          {
            id: 3,
            title: "Investigator quote ...",
            description: "Sometimes death is not the end.",
            img: "/img/1-inv/57-Nameless.jpg",
            translations: {
              es: {
                title: "Frase investigador ...",
                description: "A veces, la muerte no es el final.",
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
            id: 5,
            title: "Share your game on Instagram!",
            description: "Upload screenshots of your most epic encounters and gain recognition in the community.",
            img: "/img/5-otros/articulosPaginaDeCarga/megafono.jpg",
            translations: {
              es: {
                title: "Comparte tu partida en Instagram!",
                description: "Sube capturas de tus encuentros más épicos y gana reconocimiento entre la comunidad.",
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
                description: "Envía tu propia aventura o encuentro y podríamos añadirlo como fan-made oficial.",
              }
            }
          },
          {
            id: 7,
            title: "Direct feedback",
            description: "Tell us what improvements you’d like to see or report any bugs: your voice matters in every update.",
            img: "/img/5-otros/articulosPaginaDeCarga/megafono.jpg",
            translations: {
              es: {
                title: "Feedback directo",
                description: "Cuéntanos qué mejoras quieres ver o reporta cualquier error: tu voz importa en cada actualización.",
              }
            }
          },
          {
            id: 8,
            title: "Special thanks …",
            description: "@eugenia1715, for collaborating many times via Buy Me a Coffee.",
            img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
            translations: {
              es: {
                title: "Agradecimiento especial ...",
                description: "@eugenia1715, por colavorar varias veces desde buy Me a Coffee. ",
                loQueEnRealidadMeGustariaDecir: "Gracias por ser mi amiga, hermana, amante y mujer. Gracias por ser todo lo que siempre soñe, por ser la luz de ilusion que ilumina mi corazon. Por ser como eres."
              }
            }
          },
          {
            id: 9,
            title: "Special thanks …",
            description: "@gioff101, for collaborating via Buy Me a Coffee.",
            img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
            translations: {
              es: {
                title: "Agradecimiento especial ...",
                description: "@gioff101, por colavorar desde buy Me a Coffee. ",
                loQueEnRealidadMeGustariaDecir: "Gracias por ser mi amigo, pocos quedan que sean tan honorables y honestos como tu. Te respeto por la persona que eres y me alegra poder decirte amigo."
              }
            }
          },
          {
            id: 10,
            title: "Special thanks …",
            description: "@arkhamhorrormemes, for collaborating via Buy Me a Coffee.",
            img: "/img/5-otros/articulosPaginaDeCarga/agradecimiento.jpg",
            translations: {
              es: {
                title: "Agradecimiento especial ...",
                description: "@arkhamhorrormemes, por colavorar desde buy Me a Coffee. ",
                loQueEnRealidadMeGustariaDecir: "Gracias por ser mi amigo, pocos quedan que sean tan honorables y honestos como tu. Te respeto por la persona que eres y me alegra poder decirte amigo."
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

  .modalLoading{
    min-width: 80%;
    max-width: 81%;
  }
</style>  