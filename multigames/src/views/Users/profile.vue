<template>
  <div>
    <!-- BARRA SUPERIOR: VOLVER / CERRAR SESIÓN -->
     <div class="columns is-mobile mb-0 pt-3 centrarHero">
        <div class="column is-3 p-0" style="text-align: center;" @click="$router.push('/')">
          <i class="fa-2x fas fa-arrow-left has-text-white"></i>
        </div>
        <div class="column" style="margin: 0 auto;"><p class="has-text-centered title has-text-white">{{ textoInterfaz.title }}</p></div>
        <div class="column is-3 p-0" style="text-align: center;" @click="signOut()">
          <i class="fa-2x fas fa-sign-out-alt has-text-white"></i>
        </div>
      </div>

    <!-- LOGO AH -->
    <div class="hero is-small">
        <div class=" columns is-mobile ">
          <img class="column logoAH" src="@/assets/img/ZZOtros/TituloArkhamHorror.png" alt="Logo de Arkham Horror"/>
        </div>
    </div>

    <div v-if="isSignedIn" class="mx-3">
        <div class="columns is-mobile">
            <!-- foto y nombre -->
            <div class="column is-half image">
                <img class="is-rounded image bordeImagen " src="/img/1-inv/57-Nameless.jpg" >
                <div class="nombrePosicion">
                    <p class="title p-1 is-4 has-text-weight-bold has-text-white">{{ user.fullName }}</p>
                    <p class="has-background-dark subtitle is-6 has-text-white posicion">@{{ user.username }}</p>
                </div>
            </div>
            
            <!-- trofeos -->
            <div class="is-half column pt-4 has-text-centered">
                <p class="title has-text-white mb-2">{{ textoInterfaz.isAuth.titleTrofeos }}</p>
                <hr class="m-2">
                <div class="">
                    <p class="subtitle has-text-white is-6 mb-1">{{ textoInterfaz.isAuth.subtitleTrofeos }}</p>
                    <p class="subtitle has-text-white is-6">{{ textoInterfaz.isAuth.descriptionTrofeos }}</p>

                </div>
            </div>
            
        </div>

        <!-- ID de usuario -->
        <div class="has-text-centered has-text-white">
            <p>{{ textoInterfaz.isAuth.titleIDUsuario }}</p>
            <b-field >
                <b-input
                    type="search"
                    icon="magnify"
                    v-model="user.id">
                </b-input>
                <p class="control">
                    <b-button type="is-primary" label="Copiar" @click="copyCode()" />
                </p>
            </b-field>
        </div>

        <!-- Mapas creados por el usuario -->
        <section class="mt-5">
            <p class="subtitle has-text-white">{{ textoInterfaz.isAuth.titleMapsOnLine }}</p>
            <div v-if="userMaps.length === 0" class="has-text-white"> {{ textoInterfaz.isAuth.subtitleMapsOnline }} </div>

            <div class="PersonajesList ">
                <MapCard v-for="map in userMaps" :key="map.idInPlay" :map="map" />
            </div>
        </section>
        
    </div>
    <div v-else class="not-authenticated has-text-centered mt-5 px-3">
      <p class="title has-text-white">{{ textoInterfaz.noAuth.title }}</p>
      <p class="subtitle has-text-white">{{ textoInterfaz.noAuth.description1 }}</p>
      <p class="subtitle has-text-white">{{ textoInterfaz.noAuth.description2 }}</p>
      <SignInButton class="button is-info"/>
    </div>
  </div>
</template>
          
<script>
import { ref, onMounted } from 'vue'
import { useAuth, useUser, SignInButton } from '@clerk/vue'
import MapCard from '@/components/mapas/MapCard.vue'
import { apiService } from '@/services/api.js'

export default {
  name: "ProfileView",
  components: { 
    MapCard, SignInButton
  },
  setup() {
    const { isSignedIn, signOut } = useAuth()
    const { user } = useUser()

    const userMaps = ref([])

    onMounted(async () => {
      if (isSignedIn.value) {
        try {
          userMaps.value = await apiService.getMapsInPlayByIDUser(user.value.id)
        } catch (e) {
          console.error('Error al cargar los mapas del usuario:', e)
        } 
      }
    })

    return { user, isSignedIn, signOut, userMaps }
  },
  data() {
    return {
      textoInterfaz: {
        title: "",
        noAuth: {
          title: "",
          description1: "",
          description2: "",
        },
        isAuth: {
          titleTrofeos: "",
          subtitleTrofeos: "",
          descriptionTrofeos: "",
          titleIDUsuario: "",
          titleMapsOnLine: "",
          subtitleMapsOnline: "",
        }
      },
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleString()
    },
    rellenarTextosegunIdioma() {
      if (this.$store.state.lenguaje == 'español') {
        this.textoInterfaz.title = "Perfil";

        this.textoInterfaz.noAuth.title = "¿Qué haces aquí?";
        this.textoInterfaz.noAuth.description1 = "No estás logueado y no existen botones para llegar hasta aquí, así que la única forma de que has acabado aquí ha sido buscando alguna falla, ¿eh? Pues que sepas que hay muchas fallas en esta app, pero esta no es una de ellas. Solo soy una persona la que está creando todo esto y hay cosas que se me escapan; te agradecería mucho que, si llegas a encontrar algún error, me lo hagas saber en el canal oficial de Instagram. ¡Muchas gracias!";
        this.textoInterfaz.noAuth.description2 = "Si quieres ver esta ventana como debería, haz login o regístrate y sigue echando un vistazo a todo lo que hay disponible para ti.";

        this.textoInterfaz.isAuth.titleTrofeos = "Tus trofeos";
        this.textoInterfaz.isAuth.subtitleTrofeos = "Sin ningún trofeo.";
        this.textoInterfaz.isAuth.descriptionTrofeos = "Juega para conseguir trofeos.";

        this.textoInterfaz.isAuth.titleIDUsuario = "Tu ID de usuario.";

        this.textoInterfaz.isAuth.titleMapsOnLine = "Tus mapas Online.";
        this.textoInterfaz.isAuth.subtitleMapsOnline = "No has creado ningún mapa todavía.";

      } else if (this.$store.state.lenguaje == 'ingles') {
        this.textoInterfaz.title = "Profile";

        this.textoInterfaz.noAuth.title = "What are you doing here?";
        this.textoInterfaz.noAuth.description1 = "You’re not logged in and there are no buttons to get here, so the only way you ended up here must have been hunting for a bug, right? Well, know that there are plenty of bugs in this app, but this isn’t one of them. I’m just one person building all of this and things slip through—I'd really appreciate it if you let me know about any bugs on the official Instagram channel. Thank you!";
        this.textoInterfaz.noAuth.description2 = "If you want to see this window as it should be, please log in or sign up and keep exploring everything available to you!";

        this.textoInterfaz.isAuth.titleTrofeos = "Your Trophies";
        this.textoInterfaz.isAuth.subtitleTrofeos = "You have no trophies.";
        this.textoInterfaz.isAuth.descriptionTrofeos = "Play to earn trophies.";

        this.textoInterfaz.isAuth.titleIDUsuario = "Your User ID";

        this.textoInterfaz.isAuth.titleMapsOnLine = "Your Online Maps";
        this.textoInterfaz.isAuth.subtitleMapsOnline = "You haven't created any maps yet.";
      }
    },
    copyCode() {
      navigator.clipboard.writeText(this.user.id)
        .then(() => {
          console.log('ID copiado al portapapeles');
        })
        .catch(err => {
          console.error('Error al copiar el ID: ', err);
        });
    }

  },
  mounted(){
    this.rellenarTextosegunIdioma();
  },
}
</script>

<style scoped>
.logoAH{
  max-width: 200px;
  margin: 0 auto;
}

.field.has-addons{
    justify-content: center;
}
.bordeImagen{
  border: thick double #F2C94C;
}
.nombrePosicion{
  position: absolute;
  top: 16vh;
  text-align: center;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(242, 201, 76, 0.8);
  border-radius: 10px;
}
.posicion{
  border: 2px solid rgba(242, 201, 76, 0.8);
  border-radius: 10px;
}
.PersonajesList {
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 10px;
  row-gap: 10px;
  justify-items: center;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
