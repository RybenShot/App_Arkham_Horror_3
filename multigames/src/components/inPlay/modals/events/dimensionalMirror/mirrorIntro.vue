<template>
  <div class="stage stage-zero">
    <p class="error-code">0x̷͔͝4̷̖̚4̵̺̄</p>
    <p class="error-tag glitch" data-text="ERROR EN EL TEJIDO">ERROR EN EL TEJIDO</p>
    <p class="error-sub">DE LA REALIDAD</p>
  </div>
</template>

<script>
export default {
  name: 'MirrorIntro'
}
</script>

<style scoped>
.stage-zero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  animation: flicker 0.15s infinite alternate;
}
.error-code {
  font-size: 0.7rem;
  color: #ff0033;
  letter-spacing: 0.4em;
  opacity: 0.6;
}
.error-tag {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ff0033;
  letter-spacing: 0.1em;
}
.error-sub {
  font-size: 0.9rem;
  color: #ff6680;
  letter-spacing: 0.3em;
}

/* ── Glitch ── */
.glitch { position: relative; }
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
.glitch::before {
  color: #ff0033;
  animation: glitch-1 2.4s infinite;
  clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
}
.glitch::after {
  color: #00ffff;
  animation: glitch-2 2.4s infinite;
  clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
}

@keyframes glitch-1 {
  0%, 90%, 100% { transform: none; opacity: 0; }
  91%           { transform: translateX(-3px); opacity: 0.8; }
  93%           { transform: translateX(3px);  opacity: 0.8; }
  95%           { transform: translateX(-2px); opacity: 0.8; }
  97%           { transform: none; opacity: 0; }
}
@keyframes glitch-2 {
  0%, 92%, 100% { transform: none; opacity: 0; }
  93%           { transform: translateX(3px);  opacity: 0.8; }
  95%           { transform: translateX(-3px); opacity: 0.8; }
  97%           { transform: translateX(2px);  opacity: 0.8; }
  99%           { transform: none; opacity: 0; }
}
@keyframes flicker {
  from { opacity: 1; }
  to   { opacity: 0.85; }
}
</style>