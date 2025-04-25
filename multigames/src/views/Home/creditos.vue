<template>
    <div class="credits-container">
      <div class="credits-wrapper">
        <div class="credits-content">
          <div
            v-for="(credit, index) in credits"
            :key="index"
            class="credit-item"
          >
            <h3 class="role">
              {{ locale === 'español' ? credit.role.es : credit.role.en }}
            </h3>
            <p class="name">
              {{ locale === 'español' ? credit.name.es : credit.name.en }}
            </p>
          </div>
        </div>
      </div>
  
      <router-link to="/" class="back-button">
        {{ locale === 'español' ? 'Inicio' : 'Home' }}
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "CreditsPage",
    computed: {
      locale() {
        return this.$store.state.lenguaje;
      }
    },
    data() {
      return {
        credits: [
            {
            role: { en: "Project's Instagram", es: "Instagram del proyecto" },
            name: { en: "@apparkhamhorror", es: "@apparkhamhorror" }
          },
          {
            role: { en: "Project Lead", es: "Líder de Proyecto" },
            name: { en: "Sebastián Jiménez", es: "Sebastián Jiménez" }
          },

          {
            role: { en: "Distributed by ...", es: "Distribuido por ..." },
            name: { en: "Fantasy Flight Games", es: "Fantasy Flight Games" }
          },
          {
            role: { en: "Game Designer", es: "Diseñador de Juego" },
            name: { en: "Nikki Valens", es: "Nikki Valens" }
          },
          {
            role: { en: "Principal Testers", es: "Principal Testers" },
            name: { en: "@eugenia1715 & @gioff101", es: "@eugenia1715 & @gioff101" }
          },
          {
            role: { en: "Special Thanks", es: "Agradecimientos" },
            name: { en: "All Brave Investigators", es: "Todos los Investigadores Valientes" }
          },
          {
            role: { en: "Inspiration", es: "Inspiración" },
            name: { en: "H.P. Lovecraft", es: "H.P. Lovecraft" }
          },
          {
            role: { en: "You", es: "Tú" },
            name: { en: "Thanks for playing!", es: "¡Gracias por jugar!" }
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .credits-container {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(@/assets/img/ZZOtros/BGAH.jpg);
    color: #e0e0e0;
    overflow: hidden;
    font-family: sans-serif;
  }
  
  .credits-wrapper {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    overflow: hidden;
  }
  
  .credits-content {
    position: absolute;
    width: 100%;
    top: 100%;
    animation: scrollCredits 30s linear infinite;
  }
  
  .credit-item {
    text-align: center;
    margin: 20px 0;
  }
  
  .role {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .name {
    font-size: 1rem;
    opacity: 0.8;
  }
  
  @keyframes scrollCredits {
    0%   { top: 100%; }
    100% { top: -100%; }
  }
  
  .back-button {
    position: fixed;
    bottom: 16px;
    right: 16px;
    background: #222;
    color: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
    transition: background 0.3s;
  }
  .back-button:hover {
    background: #444;
  }
  </style>
  