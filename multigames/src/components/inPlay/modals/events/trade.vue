este es el template de el intercambio

<template>
  <div class="modal is-active">
        <div class="modal-background" @click="closeModal()"></div>
        <div class="mr-6">
          <div class="modal-card">
            <header class="columns is-mobile modal-card-head BGBendicion m-0">
              <p class="modal-card-title has-text-weight-bold" >trade</p>
              <i class="fa-2x fas fa-times-circle has-text-danger cruzeta" @click="closeModal()"></i>
            </header>

            <section class="modal-card-body hero is-large py-2">
              <h2>bla bla bla</h2>
              <p class="subtitle is-7 has-text-right mt-2">original</p>
            </section>

            <footer class="">
              <div class="field has-addons columns is-mobile is-gapless">
                <p class="control column is-half">
                  <button @click="closeModal()" class="button is-danger is-fullwidth">
                    <p>cerrar</p>
                  </button>
                </p>

              </div>
            </footer>

          </div>
        </div>
      </div>
</template>

<script>
export default {
  name:"EstadoBendicion",
  data(){
    return{}
  },

  methods:{
    rellenarTextoSegunIdioma(){
      if(this.$store.state.lenguaje == 'español'){
      }else if(this.$store.state.lenguaje == 'ingles'){
      }
    },

    closeModal() {
      const textoConfirmacion = this.$store.state.lenguaje === 'español' ? `Estas seguro de cancelar evento?` : `___`;

      this.$buefy.dialog.confirm({
        title: this.$store.state.lenguaje === 'español' ? 'Evento' : '___',
        message: textoConfirmacion,
        confirmText: this.$store.state.lenguaje === 'español' ? 'Confirmar' : 'Confirm',
        cancelText: this.$store.state.lenguaje === 'español' ? 'Cancelar' : 'Cancel',
        type: 'is-info',
        hasIcon: true,
        onConfirm: async () => {
          this.$store.state.showSwithcherEventsOnLine = false

          // llamada a backend para cancelar el evento
          const idInteraction = this.interactionData.idInteraccionOnLine;
          const idUser = this.$store.state.IDUserHost;
          const response = "abandoned";
          const invData = null;
          this.respondInteractionToAPI(idInteraction, idUser, response, invData)

          this.$store.state.showGuestInvitationModal= false
          this.$buefy.toast.open({
            message: this.$store.state.lenguaje === 'español' ? `encuentro rechazado` : `encounter rejected`,
            type: 'is-danger',
            duration: 2000
          });

          invitationService.resumePollingGeneral();; // volvemos al polling General
        }
      });

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