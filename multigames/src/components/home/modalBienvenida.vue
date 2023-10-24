<template>
          <div class="modal is-active">
          <div class="modal-background"></div>
          <div class="mr-6">
            <div class="modal-card">
              <section class="modal-card-body hero is-large py-2 has-background-black-ter p-4">
                <h2 class="has-text-centered title mb-0 has-text-white" v-if="this.$store.state.lenguaje == 'español'">Bienvenido a casa, querido investigador</h2>
                <h2 class="has-text-centered title mb-0 has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">Welcome home, dear investigator</h2>

                <hr class="my-3">
                <h2 class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'">Espero que disfrutes de esta demo tanto como yo he disfrutado haciéndola. Esta app, es una HERRAMIENTA, es necesario el juego físico para poder jugar.</h2>
                <h2 class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">I hope you enjoy this demo as much as I have enjoyed making it. This app, is a TOOL, you need the physical game to play.</h2>
                <br>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'">Si encontrais algún error en la app, me lo podéis decir en la cuenta de <a href="https://www.instagram.com/apparkhamhorror">Instagram</a> o puedes agragarme a whatsapp : 600358809 para formar parte de esta familia infame.</p>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">If you find any errors in the app, you can tell me in the account <a href="https://www.instagram.com/apparkhamhorror">Instagram</a> or you can thank whatsapp : 600358809 to be part of this infamous family.</p>

                <br>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'español'">Recuerda: el logo de Arkham Horror, es un botón hacia atrás.</p>
                <p class="has-text-centered has-text-white" v-if="this.$store.state.lenguaje == 'ingles'">Remember: the Arkham Horror logo is a back button.</p>

              </section>
              <footer class="modal-card-foot has-background-grey-dark">
                <button @click="this.$store.state.StoreModalBienvenida = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'español'">Cerrar</button>
                <button @click="this.$store.state.StoreModalBienvenida = false" class="button column is-3 is-danger p-1" v-if="this.$store.state.lenguaje == 'ingles'">Close</button>
              </footer>
            </div>
          </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>