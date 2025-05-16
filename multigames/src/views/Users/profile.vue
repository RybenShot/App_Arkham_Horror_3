<template>
  <div>
    <!-- BARRA SUPERIOR: VOLVER / CERRAR SESIÓN -->
    <div class="columns is-mobile px-3 pt-3">
        <div class="column">
            <button class="button is-warning is-light is-small" @click="$router.go(-1)">
            <span class="icon"><i class="fas fa-arrow-left"></i></span>
            <span>Volver</span>
            </button>
        </div>
        <div class="column has-text-right">
            <button class="button is-danger is-light is-small" @click="signOut()">
            <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
            <span>Cerrar sesión</span>
            </button>
        </div>
      
    </div>

    <!-- LOGO AH -->
    <div class="hero pt-3 mb-4">
        <div class=" columns is-mobile mx-6">
          <img class="column px-5" src="@/assets/img/ZZOtros/TituloArkhamHorror.png" alt="Logo de Arkham Horror"/>
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
                <p class="title has-text-white mb-2">Tus trofeos</p>
                <hr class="m-2">
                <div class="">
                    <p class="subtitle has-text-white is-6 mb-1">Sin ningun trofeo.</p>
                    <p class="subtitle has-text-white is-6">Juega para conseguir trofeos.</p>

                </div>
            </div>
            
        </div>

        <!-- ID de usuario -->
        <div class="has-text-centered has-text-white">
            <p>Tu ID de usuario</p>
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
        <div>
            
        </div>
        
    </div>
    <div v-else class="not-authenticated">
      <p>Debes iniciar sesión para ver este perfil.</p>
      <SignInButton mode="modal" />
    </div>
  </div>
</template>

<script>
import { useAuth, useUser, SignInButton } from '@clerk/vue'

export default {
    name: "profile View",
    components: {},
    setup() {
        const { isLoaded, isSignedIn, signOut } = useAuth()
        const { user } = useUser()
        // Exponemos user
        return { user, isLoaded, isSignedIn, signOut }
    },
    data(){
        return{
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '-'
            const d = new Date(dateString)
            return d.toLocaleString()
        }
    }
}

</script>

<style scoped>
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
</style>
