// services/invitationService.js
import { apiService } from '@/services/api.js';

class InvitationService {
  constructor() {
    this.pollingInterval = null;
    this.isActive = false;
    this.store = null;
  }

  // Inicializar con el store de Vuex
  init(store) {
    this.store = store;
    console.log('🔄 InvitationService inicializado');
  }

  // Iniciar polling
  start() {
    if (this.isActive) return;
    
    console.log('🚀 Iniciando polling de invitaciones cada 60 segundos');
    this.isActive = true;
    
    // Primera verificación inmediata
    this.checkInvitations();
    
    // Configurar interval
    this.pollingInterval = setInterval(() => {
      this.checkInvitations();
    }, 60000); // 60 segundos
  }

  // Parar polling
  stop() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.isActive = false;
    console.log('⏹️ Polling detenido');
  }

  // Verificar invitaciones
  async checkInvitations() {
    if (!this.store) return;
    
    try {
      const idUser = this.store.state.IDUserHost;
      if (!idUser) return;

      console.log('🔍 Verificando invitaciones para:', idUser);
      const result = await apiService.getPendingInvitations(idUser);
      
      if (result) {
        console.log('📩 Invitación recibida:', result);
        
        // Parar polling temporalmente
        this.pause();
        
        // Guardar en el store
        this.store.state.pendingInvitation = result;
        this.store.state.showGuestInvitationModal = true;
      }
    } catch (error) {
      console.error('❌ Error verificando invitaciones:', error);
    }
  }

  // Pausar temporalmente
  pause() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.isActive = false;
    console.log('⏸️ Polling pausado');
  }

  // Reanudar después de manejar invitación
  resume() {
    if (this.store) {
      // Limpiar store
      this.store.state.pendingInvitation = null;
      this.store.state.showGuestInvitationModal = false;
    }
    
    // Reanudar después de 2 segundos
    setTimeout(() => {
      this.start();
    }, 2000);
  }
}

// Exportar instancia única
export const invitationService = new InvitationService();