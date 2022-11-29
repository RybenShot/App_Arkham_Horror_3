import { createStore } from 'vuex'

export default createStore({
  state: {
    contadorMapa: 0,
    datosMapa:{
      title: "La llegada de Azathoth",
      description:
        "En el colazon del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funnestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...",
      BGMapa: "BGGameGeneralMapa1"
    },
    contadorPJBase: 0 ,

                                            // HELPERS - ESTADOS
          // Maldicion
    EstadoMaldito: false,
    modalMaldito: false,
          // Bencidion
    EstadoBendicion: false,
    modalBendicion: false,
          // Pacto Siniestro
    EstadoPacto: false,
    modalPacto: false,
    dataPactoSiniestro:{
      expansion: null,
      title: null,
      narrativa: null,
      descripcion: null
    },
          // Mancillado
    EstadoMancillado: false,
    modalMancillado: false,
    dataMancillado:{
      expansion: null,
      narrativa: null,
      descripcion: null
    },
        // Manco
    EstadoManco: false,
    modalManco: false,
        // Suicidio
    EstadoSuicidio: false,
    modalSuicidio: false,
        // Suicidio
    EstadoSeñalado: false,
    modalSeñalado: false,
        // Enfermo
    // EstadoEnfermo: false,
    // modalEnfermo: false,





          // DetalleEnemigo
    verDetalleEnemigo: false,
    SeleccionarURLEnemigo: null,

          // Aciertos Picias
    AvAcierto: 6,
    AvAcierto2: 5,
    AvAcierto3: null,
    AvFatal: 1,
    AvFatal2: null,
    AvFatal3: null,



    PJ:{
      nombre: 'Pepe',
      posicion: 'policia',
      vida: 4,
      cordura: 5
    }
  },
  getters: {

  },

  mutations: {
    
  },
  actions: {
  },

  modules: {
  }
})