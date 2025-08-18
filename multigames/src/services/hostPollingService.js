// services/hostPollingService.js
import { apiService } from '@/services/api.js';

class HostPollingService {
  constructor() {
    // IMPORTANTE: pollingInterval guarda el "ID" del temporizador que crea setInterval()
    // Es como un "ticket" que nos permite cancelar el temporizador después
    this.pollingInterval = null;
    
    // Indica si el servicio está haciendo polling actualmente
    this.pollingIsRunning = false;
    
    // Referencia al store de Vuex (se asigna en init())
    this.store = null;
    
    // Datos de la interacción actual que estamos monitoreando
    this.currentInteraction = null;
    
    // Funciones que se ejecutarán cuando cambie el estado de la interacción
    this.callbacks = {
      onAccepted: null,   // Se ejecuta si el guest acepta
      onRejected: null,   // Se ejecuta si el guest rechaza  
      onPending: null,    // Se ejecuta mientras sigue esperando
      onTimeout: null     // Callback para cuando se agota el tiempo
    };

    // NUEVO: Sistema de conteo
    this.attemptCount = 0;      // Contador de intentos actuales
    this.maxAttempts = 20;      // Máximo de intentos por defecto
    this.totalAttempts = 0;     // Total de intentos realizados (incluyendo extensiones)
  }

  // Inicializar el servicio con el store de Vuex
  init(store) {
    this.store = store;  // Guardamos referencia al store
    console.log('🔄 HostPollingService inicializado');
  }

  // Configurar qué funciones ejecutar según el resultado
  setCallbacks(onAccepted, onRejected, onPending = null, onTimeout = null) {
    this.callbacks.onAccepted = onAccepted;   // Función desde Play.vue
    this.callbacks.onRejected = onRejected;   // Función desde Play.vue
    this.callbacks.onPending = onPending;     // Función desde Play.vue
    this.callbacks.onTimeout = onTimeout || null;     // Función para manejar timeout
  }

  // Iniciar polling para una interacción específica
  startPolling(interactionId, userId) {
    // Si ya está haciendo polling, parar el anterior
    if (this.pollingIsRunning) {
      this.stopPolling(); // Limpiar el anterior
    }

    console.log(`🚀 Iniciando polling HOST para interacción ${interactionId} cada 5 segundos`);
    this.pollingIsRunning = true;
    // Guardar los datos de la interacción que vamos a monitorear
    this.currentInteraction = { id: interactionId, userId: userId };

    // Resetear contadores antes de empezar el nuevo polling
    this.attemptCount = 0;
    this.totalAttempts = 0;

    // Hacer la primera verificación inmediatamente (sin esperar 5 segundos)
    //!  this.checkInteractionStatus();

    // AQUÍ ES DONDE SE CREA EL TEMPORIZADOR:
    // setInterval() ejecuta la función cada 5000ms (5 segundos)
    // y DEVUELVE un ID único que guardamos en pollingInterval
    this.pollingInterval = setInterval(() => {
      this.checkInteractionStatus();  // Esta función se ejecuta cada 5 segundos
    }, 5000);
  }

  // Esta función se ejecuta cada 5 segundos para verificar el estado
  async checkInteractionStatus() {
    // Incrementar contador
    this.attemptCount++;
    this.totalAttempts++;
    
    console.log(`📊 Intento ${this.attemptCount}/${this.maxAttempts} (Total: ${this.totalAttempts})`);

    if (!this.currentInteraction) {
      console.warn('⚠️ No hay interacción actual, detengo el polling Focus');
      this.stopPolling();
      return;
    }

    try {
      // llamamos a la API para verificar el estado actual de la interaccion
      const result = await apiService.pollInteractionStatus(this.currentInteraction.id, this.currentInteraction.userId );

      console.log(`📊 Estado de interacción (intento ${this.attemptCount}):`, result.status);

      // Según el estado ...
      switch (result.status) {
        case 'pending':
            // Verificamos si se agotaron los intentos
            if (this.attemptCount >= this.maxAttempts) {
              console.log('⏰ Se agotaron los intentos, ofreciendo extensión...');
              this.stopPolling();
              if (this.callbacks.onTimeout) {
                this.callbacks.onTimeout(this.totalAttempts);
              }
            } else {
              // Continuar esperando
              if (this.callbacks.onPending) {
                this.callbacks.onPending(result, this.attemptCount, this.maxAttempts);
              }
            }
            break;

        case 'accepted':
          // ¡El guest aceptó! - parar polling y mostrar modal de éxito
          console.log('✅ Interacción aceptada!');
          this.stopPolling();  // Parar el temporizador
          if (this.callbacks.onAccepted) {
            this.callbacks.onAccepted(result);  // Ejecuta función desde Play.vue (modal éxito)
          }
          break;

        case 'rejected':
          // El guest rechazó - parar polling y mostrar modal de rechazo
          console.log('❌ Interacción rechazada');
          this.stopPolling();
          if (this.callbacks.onRejected) {
            this.callbacks.onRejected(result);  // Ejecuta función desde Play.vue (modal rechazo)
          }
          break;

        default:
          // Estado que no esperábamos - solo log
          console.log('⚠️ Estado desconocido:', result.status);
          break;
      }

    } catch (error) {
      console.error('❌ Error verificando estado de interacción:', error);
      // Si hay error, mejor parar el polling para no saturar el servidor
      this.stopPolling();
    }
  }

  // Extender el polling con más intentos
  extendPolling(additionalAttempts = 10) {
    if (!this.pollingIsRunning) {
      console.log('⚠️ No se puede extender: polling no está activo');
      return false;
    }

    this.maxAttempts += additionalAttempts;
    this.attemptCount = 0; // reseteamos contador para la extensión
    
    console.log(`⏰ Polling extendido por ${additionalAttempts} intentos más (nuevo máximo: ${this.maxAttempts})`);
    
    // Reiniciar el polling
    this.checkInteractionStatus();
    
    this.pollingInterval = setInterval(() => {
      this.checkInteractionStatus();
    }, 5000);

    return true;
  }

  // Cancelar completamente sin más extensiones
  cancelPolling() {
    console.log('🚫 Polling cancelado por el usuario');
    this.stopPolling();
  }

  // Parar completamente el polling
  stopPolling() {
    // SI tenemos un temporizador activo (pollingInterval no es null)
    if (this.pollingInterval) {
      
      // CLEARINTERVAL ES UNA FUNCIÓN NATIVA DE JAVASCRIPT:
      // Le pasas el ID del temporizador y lo cancela
      clearInterval(this.pollingInterval);
      
      // Resetear la variable a null para indicar que no hay temporizador
      this.pollingInterval = null;
    }
    
    // Marcar como inactivo
    this.pollingIsRunning = false;
    
    // Limpiar datos de la interacción actual
    this.currentInteraction = null;
    
    // Mantener contadores para historial
    console.log(`⏹️ Polling HOST detenido (Total intentos realizados: ${this.totalAttempts})`);
  }

  // Getter para obtener estadísticas
  get stats() {
    return {
      isPolling: this.pollingIsRunning,
      attemptCount: this.attemptCount,
      maxAttempts: this.maxAttempts,
      totalAttempts: this.totalAttempts,
      timeElapsed: this.totalAttempts * 5 // segundos transcurridos
    };
  }

  // Getter para verificar si está activo desde fuera
  get isPolling() {
    return this.pollingIsRunning;
  }
}

// Crear UNA instancia del servicio que se compartirá en toda la app
export const hostPollingService = new HostPollingService();