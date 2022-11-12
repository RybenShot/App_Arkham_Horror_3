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
    // Pacto Siniestro
    modalPacto: false,
    EstadoPacto: false,
    dataPactoSiniestro:{
      title: null,
      narrativa: null,
      descripcion: null
    },


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