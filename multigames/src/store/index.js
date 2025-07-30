import { createStore } from 'vuex'

export default createStore({
  state: {
    //Home
    loadingPageState: null,
    contadorVisitasTotales: null,
    StoreModalBienvenida: true,
    StoreModalDonacion: true,

    //modalCreditos: false, ahora mismo en desuso, pero proximamente se usara

    //Detalle Personaje
    modalPertenenciasDetalle: false,
    verDetallePertenencia: false,
    detalleCartaObjeto: null,
    modalHistoriaDetalle: false,
    modalArquetipoDetalle: false,

    modalSeleccionObjetosIniciales: false,
    possessionsInPlay: [], // Array de objetos completos seleccionados por el jugador

    //EXPANSIONES - Estasdos usados para activar o descativar expansiones, usado en lista de mapas o lista de investigadores
    stateExpansionBase: false,
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
      idInv: 56,
      isActive: false,
      expansion: "AHComunity",
      name: "Nameless Soul",
      position: "The revenant",
      effect1: "First Possession -- At the start of the game, draw 2 Allies from the Ally deck. Keep one (this character will be the one you possess) and place the other at the bottom of the Ally deck.",
      effect2: "Memento Vivere -- If you wold be defeated, you may instead become delayed and draw the top two allies from the deck. Select one to possess, placing the other at the bottom of the deck.",
      effect3: null,
      phrase: "'Sometimes, death is not the end.'",
      focusLimit: 2,
      theStory: "Many in Arkham would yet fall victim to dark plots, but this lost soul was one of the first. The life they once lived was stipped both physically and mentally from them when reality started to fracture. Those who might have saved them came too late, at least to save their first life. Inexplicably caught between the land of the living and the cold void of the afterlife, they started searching for answers. Who were they? Why had they been killed? Was there a path back to life? Just what was happening in Arkham? The limitations of their incorporeal from became apparent quickly, but a solution would present itself during one of many attempts to communicate with a living being. Flowing into the body of an unsuspecting bystander, sensation and purpose returned with vengance. Some or something had killed them, and they were determined to get to the borrom of it no matter how many lives they had to live.",
      locutionURL: "___",
      imgInv: "/img/1-inv/57-Nameless.jpg",
      estadosActivos: [
        
      ],
      atributes:{
        life: 0,
        sanity: 0,
        lore: 3,
        influence: 3,
        observation: 2,
        strength: 1,
        will: 4,
        money: 2,
        remnant: 0,
        clue: 0
      },
      rol: [
        {
          rol: "survivor",
          description: "As a survivor, you advantages like with surviving the relentless assault of the mythos and helping your fellows do the same. Supporting one another will lead to victory."
        },
        {
          rol: "mystic",
          description: "As a mystic, you are adept at warding against evil. Your focus should be on removing doom from the board. You are the best defense against the Ancient Ones."
        }
      ],
      possessions: {
        required: [126],
        optionalText: "You can choose one of the following objects",
        optional: [127, 128]
      },
      translations: {
        es: {
          name: "Alma sin nombre",
          position: "El resucitado",
          effect1: "Primera posesion -- Al comenzar la partida, debes robar 2 aliados del mazo de aliados, quedate con uno (este personaje sera el que poseas) y el otro colocalo al fondo de la baraja de Aliados.",
          effect2: "Recuerda Vivir -- Si fueras a ser derrotado, puedes en su lugar quedar RETRASADO y robar las dos primeras cartas de aliado de la baraja. Elige una para quedártela y coloca la otra al fondo de la baraja.",
          effect3: null,
          phrase: "'A veces, la muerte no es el final.'",
          focusLimit: 2,
          theStory: "Muchos en Arkham caerían aún víctimas de oscuros complots, pero esta alma perdida fue una de las primeras. La vida que una vez llevaron les fue arrebatada, tanto física como mentalmente, cuando la realidad empezó a fracturarse. Aquellos que podrían haberlos salvado llegaron demasiado tarde, al menos para rescatar su primera vida. Inexplicablemente atrapados entre el mundo de los vivos y el frío vacío del más allá, comenzaron a buscar respuestas. ¿Quiénes eran? ¿Por qué habían sido asesinados? ¿Existía un camino de regreso a la vida? ¿Qué estaba sucediendo en Arkham? Las limitaciones de su forma incorpórea se hicieron evidentes rápidamente, pero la solución se presentó durante uno de los muchos intentos de comunicarse con un ser vivo. Al fluir hacia el cuerpo de un transeúnte desprevenido, la sensación y el propósito regresaron con venganza. Algo o alguien los había matado, y estaban decididos a llegar al fondo del asunto, sin importar cuántas vidas tuvieran que vivir.",
          locutionURL: "___",
          rol: [
            {
              rol: "Superviviente",
              description: "Como superviviente, disfrutas de ventajas para soportar el implacable asalto del Mito y ayudar a tus compañeros a hacer lo mismo. Apoyarse mutuamente conducirá a la victoria."
            },
            {
              rol: "Místico",
              description: " Como místico, eres experto en repeler el mal. Tu enfoque debe estar en eliminar las fichas de perdición del tablero. Eres la mejor defensa contra los Primigenios. "
            }
          ]
        }
      }
    },

    // variable para el momento que quieras ver un objeto in play
    pertenenciaInPlay: false,
    // aqui se almacenarán todos los objetos que tengan in play
    modalJoinMapInPlay: false,
    modalInvOnLine: false,
    modalCrearMapaOnLine: false,
    IDUserHost: null,
    nameUserHost: null,
    responseObjectsInPlay:[],
    // variable para mostrar el modal de busqueda de objetos
    modalBuscarObjeto: false,

    //PLAY
    viewPlayer: true,
    viewMap : false,

    //map
    StoreEncountresPage: true,
    StoreReservaDeMitos:false,
    StoreShopPage: false,

    //player
    StoreTiradorDados: true,
    StoreUbicationPlayer: false,
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
    habilitarMapaOL: false,

    datosMapa: 
    {idMap: 0,
      title: null,
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
      extraData: {
        likes: 0,
        dislikes: 0,
        NVotesLikeDislike: 48,
        timeEstimated: 0,
        NVotestime: 0,
        difficulty: 1,
        NVotesDifficulty: 12
      },
      variables:{
        doom: 6,
        clue: 6
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
    modalComunityMap: false,
    modalInvRec: false,
    modalDifficultyTime: false,

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
    // funcion para obtener el dinero actual del investigador
    getMoneyInv(state){
      return state.datosPJactual.atributes.money 
    },

    getConcentrationInPlay(state){
      return state.fichasConcentracion
    },
    getEnemysList(state) {
      return state.enemyList
    },

    // funcion para ver en que estado estan algunos modales
    getModalState: (state) => (modalKey) => {
      return state[modalKey];
    },

    getMapInPlay(state){
      return state.datosMapa.id
    },
    
    // funciones para la gestion del investario del investigador
    getPossessionsInPlay(state) {
      return state.possessionsInPlay;
    },

    getPossessionById: (state) => (id) => {
      return state.possessionsInPlay.find(possession => possession.id === id);
    },

    // Nuevos getters para possessions del investigador
    getInvestigatorPossessions(state) {
    // Si possessions es un array (objetos completos), devolverlo
    if (Array.isArray(state.datosPJactual.possessions)) {
      return state.datosPJactual.possessions;
    }
    // Si no, devolver array vacío
    return [];
  },

  getPossessionById: (state) => (id) => {
    const possessions = Array.isArray(state.datosPJactual.possessions) 
      ? state.datosPJactual.possessions 
      : [];
    return possessions.find(possession => possession.id === id);
  }
  },

  mutations: {
    // Mutation para modificar el dinero (sumar o restar)
    updateMoney(state, cantidad) {
      state.datosPJactual.atributes.money += cantidad;
    },

    // Mutation específica para restar dinero (más clara para compras)
    restarDinero(state, cantidad) {
      state.datosPJactual.atributes.money -= cantidad;
    },

    // Mutation específica para sumar dinero
    sumarDinero(state, cantidad) {
      state.datosPJactual.atributes.money += cantidad;
    },

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

    // funciones para obtener los objetos iniciales de los investigadores al empezar la partida
    clearResponseObjectsInPlay(state) {
      state.responseObjectsInPlay = [];
    },

    addResponseObjectInPlay(state, obj) {
      state.responseObjectsInPlay.push(obj);
    },

    setOptionalText(state, text) {
      state.optionalTextForObjects = text;
    },

    // funciones para cambiar el estado de los likes y dislikes de los mapas
    updateLikes(state, value) {
      state.datosMapa.extraData.likes = value;
    },

    updateDislikes(state, value) {
      state.datosMapa.extraData.dislikes = value;
    },

    setUserHost(state, id) {
      state.IDUserHost = id;
    },

    setUserName(state, name) {
      state.nameUserHost = name;
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

    //funciones para la gestion del investario del investigador
  },
  modules: {}
})