<template>
    <div class="modal is-active">
          <div class="modal-background" @click="this.$store.state.ModalPopUp_Notificaciones = false"></div>
          <div class="mr-6">
            <div class="modal-card">
              <header class="columns is-mobile modal-card-head BGBendicion m-0">
                <p class="modal-card-title has-text-weight-bold" >{{ textoInterfaz.titulo }}</p>
                <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="this.$store.state.ModalPopUp_Notificaciones = false"></i>
              </header>
  
              <section class="modal-card-body hero is-large py-2">
                <h1 class="has-text-centered title m-0">{{ this.$store.state.NotificacionTexto.title }}</h1>
                <hr class="my-2">
                <h2 v-if="this.$store.state.NotificacionTexto.texto1" class="has-text-centered subtitle">{{ this.$store.state.NotificacionTexto.texto1 }}</h2>
                <h2 v-if="this.$store.state.NotificacionTexto.texto2" class="has-text-centered subtitle">{{ this.$store.state.NotificacionTexto.texto2 }}</h2>
                <h2 v-if="this.$store.state.NotificacionTexto.texto3" class="has-text-centered subtitle">{{ this.$store.state.NotificacionTexto.texto3 }}</h2>
                <h2 v-if="this.$store.state.NotificacionTexto.texto4" class="has-text-centered subtitle">{{ this.$store.state.NotificacionTexto.texto4 }}</h2>

                <p class="subtitle is-7 has-text-right mt-2">{{ this.$store.state.NotificacionTexto.expansion }}</p>
              </section>
  
            </div>
          </div>
        </div>
  </template>
  
  <script>
  export default {
    name:"PopUp_Notificaciones",
    data(){
      return{
        textoInterfaz:{
          titulo: ""
        },
      }
    },
  
    methods:{
      rellenarTextoSegunIdioma(){
        if(this.$store.state.lenguaje == 'español'){
          this.textoInterfaz.titulo = "RECUERDA!";
        }else if(this.$store.state.lenguaje == 'ingles'){
          this.textoInterfaz.titulo = "REMEMBER";
        }
      }
    },
    mounted(){
      this.rellenarTextoSegunIdioma();
    }
  }
  </script>
  <style>
  .BGBendicion{
    background-image: url(@/assets/img/Estados/Bendicion.jpg);
    background-position: center;
    background-size: cover;
  }
  </style>