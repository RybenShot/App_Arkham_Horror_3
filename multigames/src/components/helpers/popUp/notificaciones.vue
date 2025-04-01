<template>
  <transition name="fade">
    <div v-if="this.$store.state.FlashPopUP_notifications.state" >
      <div class="notificacion has-text-light has-background-dark">
        <span>{{ this.$store.state.FlashPopUP_notifications.text }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name:"PopUp_Notificaciones",
  data(){
    return{}
  },
  methods:{},
  mounted(){}
}
</script>
<style>
/* Notificacion de expansion activa*/
.notificacion {
  position: fixed;
  top: 50vh;
  left: 15vh;
  width: 40%;
  background-color: #f1f1f1;
  box-shadow: 0px 0px 50px 50px rgb(255, 255, 255);
  border-style: inset;
  padding: 10px;
  z-index: 20;
  opacity: 1;
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>