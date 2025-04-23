<template>
    <div class="loading-container">
      <div class="symbol"></div>
      <p class="loading-text">Cargando</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingPage'
  };
  </script>
  
  <style scoped>
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
  </style>
  