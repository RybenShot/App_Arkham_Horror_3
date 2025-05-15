<template>
  <div v-if="isLoaded">
    <div v-if="isSignedIn">
      <div class="profile-card">
        <img
          :src="avatarUrl"
          alt="Avatar de usuario"
          class="avatar"
        />
        <h1 class="name">{{ user.fullName }}</h1>
        <p class="username">@{{ user.username }}</p>

        <section class="info-section">
          <h2>Contacto</h2>
          <p><strong>Email principal:</strong> {{ user.primaryEmailAddress.emailAddress }} <em>({{ user.primaryEmailAddress.verified ? 'verificado' : 'no verificado' }})</em></p>
          <p v-if="user.primaryPhoneNumber"><strong>Teléfono:</strong> {{ user.primaryPhoneNumber.phoneNumber }} <em>({{ user.primaryPhoneNumber.verified ? 'verificado' : 'no verificado' }})</em></p>
          <ul v-if="user.emailAddresses.length > 1">
            <li v-for="(e, i) in user.emailAddresses" :key="i">
              <strong>Email {{ i + 1 }}:</strong> {{ e.emailAddress }} <em>({{ e.verified ? 'verificado' : 'no verificado' }})</em>
            </li>
          </ul>
          <ul v-if="user.phoneNumbers.length">
            <li v-for="(p, i) in user.phoneNumbers" :key="i">
              <strong>Teléfono {{ i + 1 }}:</strong> {{ p.phoneNumber }} <em>({{ p.verified ? 'verificado' : 'no verificado' }})</em>
            </li>
          </ul>
        </section>

        <section class="meta-section">
          <h2>Detalles de la cuenta</h2>
          <p><strong>ID de usuario:</strong> {{ user.id }}</p>
          <p><strong>Creado:</strong> {{ this.formatDate(user.createdAt) }}</p>
          <p><strong>Última actualización:</strong> {{ this.formatDate(user.updatedAt) }}</p>
        </section>

        <button class="edit-btn" @click="signOut">
          Cerrar sesión
        </button>
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
            avatarPlaceholder : 'https://via.placeholder.com/150'
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
.profile-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 360px;
  padding: 24px;
  margin: 2rem auto;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #28a745;
  margin-bottom: 16px;
}
.name {
  font-size: 1.6rem;
  margin: 0;
  color: #333;
}
.username {
  color: #555;
  margin-bottom: 16px;
}
.info-section, .meta-section, .metadata-section {
  text-align: left;
  margin: 16px 0;
}
.info-section h2,
.meta-section h2,
.metadata-section h2 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #28a745;
}
.metadata-section pre {
  background: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  text-align: left;
  overflow-x: auto;
}
.edit-btn {
  display: inline-block;
  margin-top: 16px;
  padding: 10px 20px;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.edit-btn:hover {
  background: #218838;
}
.not-authenticated {
  text-align: center;
  margin: 2rem;
}
</style>
