import { createStore } from 'vuex'

export default createStore({
  state: {
    //Home
    contadorVisitasTotales: null,
    StoreModalBienvenida: true,
    StoreModalDonacion: true,

    //modalCreditos: false, ahora mismo en desuso, pero proximamente se usara

    //Detalle Personaje
    modalPertenenciasDetalle: false,
    verDetallePertenencia: false,
    SeleccionarURLPertenencia: null,
    modalHistoriaDetalle: false,
    modalArquetipoDetalle: false,

    //PERSONAJES
    contadorPJ: 0,

    ActivarBase: true,
    ActivarMareasTenebrosas: false,
    ActivarNocheCerrada: false,
    ActivarNSecretosDeLaOrden: false,
    ActivarOriginal: false,

    datosPJactual: {
      imgPersonaje: "imgTommy",
      nombrePJ: "Tommy MulDoon",
      idPersonaje: 1,
      posicion: "Poli Novato",
      ENposicion: "Rookie cop",
      vida: 7,
      cordura: 5,
      saber: 2,
      influencia: 2,
      observacion: 3,
      fuerza: 3,
      voluntad: 3,
      dinero: 2,
      restos: 0,
      pistas: 0,
      limConcentracion: 2,
      ENlimConcentracion: 2,
      efecto1: "Protector: Si un Monstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tú a ese Monstruo en su lugar.",
      ENefecto1: "Protector: If a Monster is going to face another researcher in your space, you can face that Monster instead.",
      efecto2: null,
      frase: '“Vamos allá, Tommy. Es hora de hacerse el héroe.”',
      locucionURL: null,
      ENfrase: '“Come on, Tommy. It’s time to become a hero.”',
      historia: "Los Muldoon habían servido en el cuerpo de policía durante generaciones, y Tommy no iba a ser menos. Fue el orgullo de su familia cuando se graduó en la academia de Boston. Por eso no hizo mucha gracia que lo trasladasen a la comisaría de Arkham; después de todo ¿qué podía ocurrir en aquel pueblucho comparado con los crímenes que habría sido capaz de resolver en Boston? Al final resultó que el trabajo policial en Arkham no estaba exento de interés, después de todo. Había muchos sucesos inexplicables, y la policía local parecía más interesada en aparentar normalidad que en buscar una solución. Así que Tommy echó mano a Becky, el rifle de su abuelo, y se dispuso a buscar soluciones por su cuenta ...",
      ENhistoria: "The Muldoons had served in the police force for generations, and Tommy was no less. He was the pride of his family when he graduated from the Boston Academy. That’s why it wasn’t very funny to be transferred to the Arkham police station; after all, what could happen in that small town compared to the crimes I would have been able to solve in Boston? It turned out that police work in Arkham was not without interest after all. There were many unexplained events, and the local police seemed more interested in appearing normal than in finding a solution. So Tommy reached for Becky, his grandfather’s rifle, and set out to find solutions on his own ...",
      arquetipos: {
        tituloArquetipo1: "Defensor",
        ENtituloArquetipo1: "Defender",
        descripcionArquetipo1: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
        ENdescripcionArquetipo1: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
        tituloArquetipo2: "Superviviente",
        ENtituloArquetipo2: "Survivor",
        descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
        ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory."
      },
      Pertenencia1: {
        urlFoto: "",
        nombre: "Becky",
        ENnombre: "Becky",
        descripcion: "Objeto - Arma. Recibes +4 de FUERZA cuando estés realizando una acción de ataque.",
        ENdescripcion: "Object - Weapon. You receive +4 FORCE when performing an attack action.",
        fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy2.jpg")
      },
      Pertenencia2: null,
      Pertenencia3: {
        urlFoto: "",
        nombre: "Esposas",
        ENnombre: "handcuffs",
        descripcion: "Objeto - Común. Una vez por ronda, después de que infrinjas Daño, te separes o sufras Daño de un monstruo HUMANO que no sea épico, puedes derrotar a ese monstruo.",
        ENdescripcion: "Object - Common. Once per round, after you break Damage, separate or take Damage from a non-epic HUMAN monster, you can defeat that monster.",
        fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy3.jpg")
      },
      Pertenencia4: {
        urlFoto: "",
        nombre: "Motocicleta",
        ENnombre: "motorcycle",
        descripcion: "Objeto - Vehículo. En vez de realizar una acción de movimiento normal, te mueves un máximo de 3 espacios y puedes gastar 1$ para moverte un espacio adicional.",
        ENdescripcion: "Object - Vehicle. Instead of a normal motion action, you move a maximum of 3 spaces and can spend $1 to move an extra space.",
        fotoCartaPertenenciaURL: require("@/assets/img/2-Pertenencias/PerTommy1.jpg")
      },
      fotoUrl: require("@/assets/img/1-Personajes/1-Tommy.jpg"),
      expansion: "Base"
    },

    //PLAY
    StoreTiradorDados: true,
    StoreReservaDeMitos:false,
    StoreEstadosPlay: false,
    StoreHabilidades: false,
    StoreAjustesPlay: false,

    //PopUp - Notificaciones
    ModalPopUp_Notificaciones: false,
    NotificacionTexto: {
      title: null,
      texto1: null,
      texto2: null,
      texto3: null,
      texto4: null,
      expansion: "AH Base"
    },

    //Audio
    PistasAudio: {
      EfectoInmersion: false,
      AudioDaño: [
        { src: require('@/assets/sound/efectos_Sonido/Vida_Cordura/Daño/Daño_Fisico.mp3') },
        { src: require('@/assets/sound/efectos_Sonido/Vida_Cordura/Daño/Daño_Fisico2.mp3') },
        { src: require('@/assets/sound/efectos_Sonido/Vida_Cordura/Daño/Daño_Fisico3.mp3') },
        { src: require('@/assets/sound/efectos_Sonido/Vida_Cordura/Daño/Daño_Fisico4.mp3') },
      ],
      AudioSana: [
        { src: require('@/assets/sound/efectos_Sonido/Vida_Cordura/Sana/Sana_Fisico.mp3') }
      ],
      AudioRespiración: [
        { src: require('@/assets/sound/efectos_Sonido/Vida_Cordura/Respiracion_Agitada_Mujer.mp3') }
      ],
      MusicaHambiental: false,
    },
    // Ajustes
    ModalConfirmacion: false,
    Terminarpartida: null, //false = cambio de personaje  true = terminar partida

    // MAPAS
    contadorMapa: 0,
    viewDetalleMapa: true, //cambia de vista de seleccion de mapas a enemigos

    mapaSeleccionado: false,
    datosMapa: {
      idMapa: null,
      title: null,
      ENtitle: null,
      description: null,
      ENdescription: null,
      dificultadMapa: null,
      expansionMapa: null,
      ducacionMapa: null,
      votosUsuariosMapa: null,
      espacioDeInicio: null,
      ENespacioDeInicio: null,
      reservaDeMitos: {
        perdicion: null,
        enemigos: null,
        pistas: null,
        periodico: null,
        explosion: null,
        retribucion: null,
        vacias: null
      },
      retribucion: null,
      ENretribucion: null,
      imgMapa: null,
      BGMapa: null
    },
    // RESERVA DE MITOS
    reservaVisible: [],
    // notificacion retribucion
    modalNotificacionRetribucion: false,
    modalNotificacionEfectoMancillado:false,

    modalVerLosetaMapa: false,
    modalVerEnemigos: false,

    seleccionDePersonaje: true,
    detallePersonaje: false,

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
    dataPactoSiniestro: {
      expansion: null,
      title: null,
      narrativa: null,
      descripcion: null,
      ENexpansion: null,
      ENtitle: null,
      ENnarrativa: null,
      ENdescripcion: null
    },
    // Mancillado
    EstadoMancillado: false,
    modalMancillado: false,
    dataMancillado: {
      expansion: null,
      narrativa: null,
      descripcion: null,
      ENexpansion: null,
      ENnarrativa: null,
      ENdescripcion: null
    },
    // Determinado
    EstadoDeterminado: false,
    modalDeterminado: false,
    // Fatigado
    EstadoFatigado: false,
    modalFatigado: false,
    // Perseguido
    EstadoPerseguido: false,
    modalPerseguido: false,
    dataPerseguido: {
      id: null,
      expansion: "Secretos",
      title: "",
      narrativa: "",
      descripcion: ""
    },
    estadoPerseguido_Agitado: false,
    modalPerseguido_Agitado: false,
    ElegirAtributo: false,
    AtributoElegido: null,
    enemigoExtra: false,
    modalEnemigoExtra: false,

    // ESTADOS ORIGINALES
    // Manco
    EstadoManco: false,
    modalManco: false,
    // Suicidio
    EstadoSuicidio: false,
    modalSuicidio: false,
    // Señalado
    EstadoSeñalado: false,
    modalSeñalado: false,
    // Enfermo
    // EstadoEnfermo: false,
    // modalEnfermo: false,

    // Idioma de aplicacion
    lenguaje: "español",

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

    fichaConcentracionSeleccionada : null,
    fichasConcentracion: [],
  },
  getters: {
    getConcentrationInPlay(state){
      return state.fichasConcentracion
    }
  },

  mutations: {
    addConcentrationToken(state, token){
      state.fichasConcentracion.push(token)
    },
    removeConcentrationToken(state){
      state.fichasConcentracion.shift()
    }
  },
  actions: {
    addConcentrationToken_Action({commit}, token){
      commit('addConcentrationToken', token)
    },
    removeConcentrationToken_Action({commit}){
      commit('removeConcentrationToken')
    }
  },
  modules: {}
})