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

    //EXPANSIONES - Estasdos usados para activar o descativar expansiones, usado en lista de mapas o lista de investigadores
    stateExpansionBase: true,
    stateExpansionWaves: false,
    stateExpansionNigth: false,
    stateExpansionSecrets: false,
    stateExpansionOriginal: false,
    stateExpansionComunity: false,

    //PERSONAJES
    contadorPJ: 0,

    ActivarBase: true,
    ActivarMareasTenebrosas: false,
    ActivarNocheCerrada: false,
    ActivarNSecretosDeLaOrden: false,
    ActivarOriginal: false,

    datosPJactual: {
      idInv: 23,
      isActive: true,
      expansion: "AHNigth",
      name: "“Malasombra” O'Toole",
      position: "Ex-Convict",
      effect1: "I Won't Go Back – Once per round, after a test in which you rolled a 1, you may focus on a skill of your choice, even if doing so exceeds your Concentration limit.",
      effect2: null,
      effect3: null,
      phrase: "\"In my situation, you see all kinds of things, detective. How much is that worth to you?\"",
      theStory: "Malasombra always tried to make decisions that would make his mother proud, but his luck never lasted long. Something always went wrong, and each new decision he made seemed to limit his options even further. Then his mother fell ill, and his 'few options' quickly turned into 'no options.' After being caught for robbing a bank to pay the mounting hospital bills, Malasombra soon discovered that things could get even worse: his cellmate, endlessly rambling about the 'Great Old Ones,' scribbled dozens of cryptic messages on the cell walls just before bursting into flames. When he finally got out, Malasombra found a new way to make his mother proud. After kneeling to place a bouquet of flowers on her grave, he swore to do whatever it took to protect the world from those ancient horrors.",
      focusLimit: 0,
      locutionURL: "___",
      imgInv: "/img/1-Personajes/28-Malasombra.jpg",
      atributes: {
        life: 6,
        sanity: 6,
        lore: 2,
        influence: 1,
        observation: 3,
        strength: 3,
        will: 4,
        money: 2,
        remnant: 0
      },
      rol: [
        {
          rol: "Expert",
          description: "You possess a unique set of skills that allows you to specialize in a specific task. \"Malasombra\" is accustomed to making the most of risky situations; use this ability to perform complicated tests that, under other circumstances, would waste an action."
        },
        {
          rol: "Survivor",
          description: "Your strength lies in surviving the relentless assault of the Mythos and helping your fellow investigators do the same. Teamwork will lead you to victory."
        }
      ],
      possessions: [
        {
          id: 12,
          require: true,
          title: "Prófugo"
        },
        {
          id: 12,
          require: false,
          title: "Manos largas"
        },
        {
          id: 12,
          require: false,
          title: "Navaja automática"
        }
      ],
      translations: {
        es: {
          name: "“Malasombra” O'Toole",
          position: "Ex presidiario",
          effect1: "No pienso volver - Una vez por ronda, después de una prueba en la que hayas sacado un 1, puedes concentrarte en una habilidad de tu elección, incluso aunque al hacerlo sobrepases tu límite de Concentración.",
          effect2: null,
          effect3: null,
          phrase: "“En mi situación uno ve toda clase de cosas, detective. ¿Cuánto vale eso para usted?”",
          theStory: "Malasombra siempre procuró tomar decisiones que hicieran que su madre se sintiese orgullosa de él, pero la suerte le duraba bastante poco. Siempre salía algo mal, y cada nueva decisión que tomaba parecía limitar aún más sus opciones. Y entonces su madre enfermó, y sus “pocas opciones” se convirtieron rápidamente en “ninguna opción”. Tras dar con sus huesos en la cárcel por atracar un banco para pagar las facturas hospitalarias acumuladas, Malasombra no tardó en comprobar que las cosas podían torcerse aún más: su compañero de celda, que no paraba de desvariar por unos “Primigenios”, garabateó docenas de mensajes enigmáticos en las paredes justo antes de estallar en llamas. Cuando por fin salió de la trena, Malasombra halló otra forma de hacer que su madre se sintiera orgullosa. Tras arrodillarse para depositar un ramo de flores en su tumba, juró hacer cuanto estuviese en su mano para proteger al mundo de aquellos horrores ancestrales.",
          focusLimit: 0,
          locutionURL: "___",
          rol: [
            {
              rol: "Experto",
              description: "Posees un conjunto exclusivo de habilidades que te permite especializarte en una tarea concreta. “Malasombra” tiene por costumbre sacar partido de situaciones arriesgadas; aprovecha esta capacidad para realizar pruebas complicadas que en otras circunstancias supongan malgastar una acción."
            },
            {
              rol: "Superviviente",
              description: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria."
            }
          ]
        }
      }
    },

    //PLAY
    StoreTiradorDados: true,
    StoreReservaDeMitos:false,
    StoreEstadosPlay: false,
    StoreHabilidades: false,
    StoreAjustesPlay: false,

    //PopUp - Notificaciones
    FlashPopUP_notifications: {
      state: false,
      text: ""
    },

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
    datosMapa: 
    { idMap: 0,
      title: "The Arrival of Azathoth",
      description: "In the heart of infinity dwells the lethargic Azathoth, lulled by the incessant notes of ominous flutes. But there are mortals who wish to invoke the immeasurable power and calamity of the Blind and Idiot God, even if it means condemning humanity ...",
      difficulty: 1,
      expansion: "AHBase",
      duration: 130,
      userVotes: 4,
      initialSpace: "Train Station",
      retribution: "For each Cultist Monster, place a Doom token in its space. (If it is in a street space, the Doom token is placed in an adjacent Neighborhood space.)",
      mythosReserve: {
        doom: 3,
        enemies: 2,
        clues: 2,
        newspaper: 2,
        explosion: 1,
        retribution: 1,
        empty: 3
      },
      enemies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      specialEnemies: [],
      imgMap: "LosetasMapa1.png",
      BGMap: "/img/3-mapas/imgPortada/BG1MapaArkham.jpg",
      translations: {
        es: {
          title: "La llegada de Azathoth",
          description: "En el corazón del infinito mora el aletargado Azathoth, arrullado por las incesantes notas de funestas flautas. Pero hay mortales que desean invocar el poder y la calamidad inconmensurables del Dios Ciego e Idiota, aunque ello suponga condenar a la humanidad ...",
          initialSpace: "Estación de trenes",
          retribution: "Por cada Monstruo Sectario, coloca una ficha de Perdición en su espacio. (Si está en un espacio de calle, la ficha de perdición se coloca en un espacio de Barrio adyacente.)"
        }
      }
    },
    enemyList: [],
    // RESERVA DE MITOS
    reservaVisible: [],
    // notificacion retribucion
    modalNotificacionRetribution: false,
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
    },
    getEnemysList(state) {
      return state.enemyList
    },

    // funcion para ver en que estado estan algunos modales
    getModalState: (state) => (modalKey) => {
      return state[modalKey];
    }
    
  },

  mutations: {
    addConcentrationToken(state, token){
      state.fichasConcentracion.push(token)
    },
    removeConcentrationToken(state){
      state.fichasConcentracion.shift()
    },

    toggleExpansion(state, { key, value }) {
      state[key] = value;
    },
    ejecutarFlashPopUp(state, message) {
      state.FlashPopUP_notifications.text = message;
      state.FlashPopUP_notifications.state = true;
  
      setTimeout(() => {
        state.FlashPopUP_notifications.state = false;
      }, 2000);
    },

    // funcion para meter los datos que llegan desde back del mapa a store
    setDatosMapa(state, payload) {
      state.datosMapa = payload;
    },

    // funcion para meter los datos que llegan desde back del investigador a store
    setDatosInvestigator(state, payload) {
      state.datosPJactual = payload;
    },

    // funcion para añadir los enemigos a la lista despues de llamada a la API
    setEnemysList(state, payload) {
      state.enemyList = payload;
    },

    // funcion para cambiar la vista de notificacion de retribucion al sacar una ficha de la reserva de mitos
    setModalNotificacionRetribution(state, value) {
      state.modalNotificacionRetribution = value;
    },

    // funcion global para cambiar estados de true a false y viceversa
    toggleModal(state, { modal, modalState }) {
      state[modal] = modalState;
    },
    
  },
  actions: {
    addConcentrationToken_Action({commit}, token){
      commit('addConcentrationToken', token)
    },
    removeConcentrationToken_Action({commit}){
      commit('removeConcentrationToken')
    },

    ejecutarFlashPopUp_Action({commit}, message){
      commit('ejecutarFlashPopUp', message)
    },
  },
  modules: {}
})