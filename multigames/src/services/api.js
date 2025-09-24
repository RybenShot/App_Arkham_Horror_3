import axios from "axios";
//const API_URL = process.env.VUE_APP_API_URL_LOCAL ;
const API_URL = process.env.VUE_APP_API_URL_DEV;
//const API_URL = process.env.VUE_APP_API_URL_PROD ;


export const apiService = {
  // metodo basico para la bienvenida
  async wellcome() {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data.message);
      return response.data;

    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      return null;
    }
  },

  // metodo basico para obtener las visitas totales
  async obtainVisits() {
    try {
      // Concatenamos el endpoint /visits a la URL base
      const response = await axios.get(`${API_URL}/visits`);
      await axios.post(`${API_URL}/visits`);
      return response.data.contadorVisitasTotales;
    } catch (error) {
      console.error("Error al obtener visitas:", error);
      return null;
    }
  },

  // listar todos los mapas
  async obtainMapList(){
    try {
      const response = await axios.get(`${API_URL}/maps`);
      return response

    } catch (error) {
      console.log("Error al cargar la lista de mapa")
      return null
    }
  },

  // listar mapa por expansion
  async obtainMaps() {
    try {
      const response = await axios.get(`${API_URL}/maps/previewMap`);
      return response.data; 
    } catch (error) {
      console.error(`Error al obtener la lista de mapas`, error);
      return [];
    }
  },

  // Buscar un mapa por su ID
  async obtainMapByID(idMap){
    try {
      const response = await axios.get(`${API_URL}/maps/${idMap}`);
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la lista de mapas`, error);
      return null;
    }
  },

  async obtainEnemyList(idMap){
    try {
      const response = await axios.get(`${API_URL}/maps/enemies/${idMap}`);
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la lista de enemigos`, error);
      return null;
    }
  },

  // obtiene el preview de la lista de investigadores
  async obtainPreviewInv(){
    try {
      const response = await axios.get(`${API_URL}/inv/previewList`)
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la lista de investigadores`, error);
      return [];
    }
  },

  async obtainPreviewInvForRol(rol){
    try {
      const response = await axios.get(`${API_URL}/inv/previewList?rol=${rol}`)
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la lista de investigadores por rol`, error);
      return [];
    }
  },

  async obtainInvByID(idInv){
    try {
      const response = await axios.get(`${API_URL}/inv/${idInv}`);
      // console.log(response.data)
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la lista de investigadores`, error);
      return null;
    }
  },

  async obtainPertenencesInv(idInv){
    try {
      const response = await axios.get(`${API_URL}/inv/${idInv}/objects`);
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la lista de pertenencias`, error);
      return null;
    }
  },

  // pedir una carta de objeto por la ID
  async obtainOneCardByID(idCard){
    try {
      const response = await axios.get(`${API_URL}/objects/${idCard}`);
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la carta indicada`, error);
      return null;
    }
  },

  // buscar un objeto segun filtros
  async obtainCardsFiltered(name, expansion, types){
    try {
      const payload = { name, expansion, types }
      const response = await axios.post(`${API_URL}/objects`, payload)
      return response.data
    } catch (error) {
      console.error('❌ obtainCardsFiltered(.js) error al pedir una carta de objeto por filtro :', error);
      throw error
    }
  },

  // MAPAS IN PLAY
  async postNewMapInPlay(idMap, IDUserHost){
    try {
      // capturamos los datos que vamos a pasar por post
      const payload = {
        idMap,
        IDUserHost
      }
      // hacemos la llamada junto con los datos que tenemos que enviarle
      const response = await axios.post(`${API_URL}/mapInPlay`, payload)
      return response.data
    } catch (error) {
      console.error('❌ postNewMapInPlay(.js) error al crear el mapa in play :', error);
      throw error
    }
  },

  // BORRAR un mapa in play
  async deleteMapInPlay(id, IDUserHost){
    try {
      const payload = {id, IDUserHost}
      const response = await axios.post(`${API_URL}/mapInPlay/deleteMapInPlay`, payload)

      // console.log('🔍 --- deleteMapInPlay --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ deleteMapInPlay(.js) - Error al intentazr borrar un mapa in play`, error);
      throw error;
    }
  },

  async getMapInPlayByID(idMapInPlay){
    try {
      const response = await axios.get(`${API_URL}/mapInPlay/${idMapInPlay}`);
      // console.log('🔍 --- getMapInPlayByID --- recibid:', response.data)
      return response.data
    } catch (error) {
      if (error.response?.status === 404) {
        return null // Devolver array vacío en lugar de error
      }
      
      console.error(`❌ Error al obtener el mapa in play solicitado`, error);
      throw error;
    }
  },

  async editMapInPlatVariables(idMap, key, delta){
    try {
      // capturamos los parametros
      const payload = {key, delta}
      // hacemos llamada, capturando el resultado de la API
      const response = await axios.post(`${API_URL}/mapInPlay/${idMap}/variable`, payload)
      // console.log(response)
      return response.data
    } catch(error){
      console.error('❌ error al editar las variables en el mapa in play :', error);
      throw error
    }

  },

  async getMapsInPlayByIDUser(idUser){
    try {
      const response = await axios.get(`${API_URL}/mapInPlay/users/${idUser}`)
      // console.log(response.data)
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener los mapas in play del usuario solicitado`, error);
      throw error;
    }
  },

  // Reserva de mitos
  // reinicia la Reserva de mitos con las fichas que hay
  async ressetMithReserve(idMapInPlay){
    try {
      const response = await axios.get(`${API_URL}/mapInPlay/${idMapInPlay}/ressetMithReserve`)
      return response.data
    } catch (error) {
      console.error(`❌ Error al resetear la reserva de mitos`, error);
      throw error;
    }
  },

  // Pido una ficha de mitos
  async getMithToken(idMapInPlay){
    try {
      const response = await axios.get(`${API_URL}/mapInPlay/${idMapInPlay}/getMithToken`)
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener una ficha de la reserva de mitos`, error);
      throw error;
    }
  },

  // Esta funcion nos sirve para Añadir, borrar o devolver fichas de mitos a la reserva de mitos
  // segun lo que venga desde "action" -add-, -remove- o -reset-
  async modifieMithReserve (idMapInPlay, action, type){
    try {
      const payload = {action, type}
      const response = await axios.post(`${API_URL}/mapInPlay/${idMapInPlay}/token`, payload)
      return response.data
    } catch (error) {
      console.error(`❌ Error al añadir una ficha de la reserva de mitos`, error);
      throw error;
    }
  },

  // VOTACIONES
  // votaciones de like y dislike
  async getLikeDislike (idMap){
    try {
      // console.log('🔍 --- getLikeDislike --- idMap:', idMap)
      const response = await axios.get(`${API_URL}/maps/likeDislike/${idMap}`)

      const { likes, dislikes, NVotesLikeDislike } = response.data;

      // console.log('🔍 --- getLikeDislike --- recibid:', response.data)

      // Actualizamos el store de un solo golpe:
      this.$store.state.datosMapa.extraData.likes = likes;
      this.$store.state.datosMapa.extraData.dislikes = dislikes;
      this.$store.state.datosMapa.extraData.NVotesLikeDislike = NVotesLikeDislike;

      // console.log('🔍 --- getLikeDislike --- datos actualizados en el store:', this.$store.state.datosMapa.extraData);
      
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener las votaciones`, error);
      if (error.response) {
        console.error('   Status:', error.response.status);
        console.error('   Data:', error.response.data);
      }
      throw error;
    }
  },

  // post like o dislike
  async postLikeDislike (idMap, idUser, value){
    try {
      const payload = {idMap, idUser, value}
      const response = await axios.post(`${API_URL}/maps/likeDislike`, payload)

      // console.log('🔍 --- postLikeDislike --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ Error al añadir una votacion`, error);
      throw error;
    }
  },
  
  // get tiempo estimado
  async getTimeEstimated (idMap){
    try {
      const response = await axios.get(`${API_URL}/maps/timeEstimated/${idMap}`)
      // console.log('🔍 --- getTimeEstimated --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener el tiempo estimado`, error);
      throw error;
    }
  },

  // post tiempo estimado
  async postTimeEstimated (idMap, idUser, value){
    try {
      const payload = {idMap, idUser, value}
      const response = await axios.post(`${API_URL}/maps/timeEstimated`, payload)

      // console.log('🔍 --- postTimeEstimated --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ postTimeEstimated(api.js) - Error al añadir el tiempo estimado`, error);
      throw error;
    }
  },

  // get dificultad
  async getDifficultyMap (idMap){
    try {
      const response = await axios.get(`${API_URL}/maps/difficultyMap/${idMap}`)
      // console.log('🔍 --- getDifficultyMap --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ getDifficultyMap(api.js) - Error al obtener la dificultad`, error);
      throw error;
    }
  },

  // post dificultad
  async postDifficultyMap (idMap, idUser, value){
    try {
      const payload = {idMap, idUser, value}
      const response = await axios.post(`${API_URL}/maps/difficultyMap`, payload)

      // console.log('🔍 --- postDifficultyMap --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ postDifficultyMap(api.js) - Error al añadir la dificultad`, error);
      throw error;
    }
  },

  // get investigadores recomendados
  async getRecInv (idMap){
    try {
      const response = await axios.get(`${API_URL}/maps/invRecommended/${idMap}`)
      // console.log('🔍 --- getRecInv --- recibid:', response.data)
      if (!response.data || response.data.length === 0) {
        // console.warn(`⚠️ No hay investigadores recomendados para el mapa con ID ${idMap}`);
        return [];
      }
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener los investigadores recomendados`, error);
      throw error;
    }
  },

  // post investigadores recomendados
  async postRecInv (idMap, idUser, nameUser,  invData, comment){
    try {
      // console.log('🔍 --- postRecInv --- invData:', idMap, idUser, nameUser,  invData, comment)
      const idInv = invData.idInv
      const nameInv = invData.name
      const expansionInv = invData.expansion
      const imgInv = invData.imgInv

      const payload = {idMap, idUser, nameUser,  idInv, nameInv,expansionInv, imgInv, comment}
      // console.log('🔍 --- postRecInv --- payload:', payload)
      const response = await axios.post(`${API_URL}/maps/invRecommended`, payload)

      // console.log('🔍 --- postRecInv --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ Error al añadir los investigadores recomendados`, error);
      throw error;
    }
  },
  
  // get comentarios
  async getComments (idMap){
    try {
      const response = await axios.get(`${API_URL}/maps/comments/${idMap}`)
      // console.log('🔍 --- getComments --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ getComments(.js) - Error al obtener los comentarios`, error);
      throw error;
    }
  },

  // post comentarios
  async postComment (idMap, idUser, nameUser, comment){
    try {
      const payload = {idMap, idUser, nameUser, comment}
      const response = await axios.post(`${API_URL}/maps/comments`, payload)

      // console.log('🔍 --- postComment --- recibid:', response.data)
      return response.data
    } catch (error) {
      console.error(`❌ Error al añadir un comentario`, error);
      throw error;
    }
  },


  // get lista de invOnLine
  async getListInvOnLine(idUser){
    try {
      const response = await axios.get(`${API_URL}/invInPlay/users/${idUser}`)
      // console.log('🔍 --- getListInvOnLine --- recibid:', response.data)
      return response.data
      
    } catch (error) {
      if (error.response?.status === 404) {
        return [] // Devolver array vacío en lugar de error
      }

      console.error(`❌ al obtener la lista de investigadores onLine`, error);
      throw error;
    }
  },

  // POST de investigador OnLine
  async postInvOnLine(payload){
    try {
      const response = await axios.post(`${API_URL}/invInPlay`, payload)
      return response.data
    } catch (error) {
      console.error(`❌ Error al añadir un investigador onLine`, error);
      throw error;
    }
  },

  // Endpoint para borrar un investigador onLine
  async deleteInvOnLine(id, idUser){
    try {
      const payload = {id, idUser}
      const response = await axios.post(`${API_URL}/invInPlay/deleteInvOnLine`, payload)
      return response.data
    } catch (error) {
      console.error(`❌ Error al borrar un investigador onLine`, error);
      throw error;
    }
  },

  // Get tienda de Mapa On Line
  async getShopItems(idMapInPlay){
    try {
      const response = await axios.get(`${API_URL}/mapInPlay/${idMapInPlay}/shop`)
      return response.data
    } catch (error) {
      console.error(`❌ Error al obtener la tienda del mapa On Line`, error);
      throw error;
    }
  },

  // gestionar Tienda de Mapa on Line tanto para eliminar de la tienda como para añadir
  async manageShopItems(idMapInPlay, action, expansion = null, types = null, idObject = null){
    try {
      const payload = { action, idMapInPlay, expansion, types, idObject }
      
      // Limpiamos valores null del payload para no enviar datos innecesarios
      Object.keys(payload).forEach(key => {
        if (payload[key] === null || payload[key] === undefined) {
          delete payload[key];
        }
      });

      const response = await axios.post(`${API_URL}/mapInPlay/shop`, payload)
      return response.data
    } catch (error) {
      console.error(`❌ Error al gestionar la tienda del mapa On Line`, error);
      throw error;
    }
  },

  // INTERACCIONES ONLINE
  // Obtener el numero de usuarios activos en la plataforma
  async getActiveUsers(){
    try {
      const response = await axios.get(`${API_URL}/losetasOnLine/allUsersOnLine`)
      return response.data;
    } catch (error) {
      console.error(`❌ Error al obtener el numero de usuarios activos`, error);
      throw error;
    }
  },

  async postLocationInMap(idZone, idUser, invData, available){
    try {
      const payload = {idZone, idUser, invData, available}
      // console.log(`Vamos a mandar la lozacalizacion de un investigador con estos valores: ${payload.idZone}, ${payload.idUser}, ${payload.invData}, ${payload.available}`)

      const response = await axios.post(`${API_URL}/losetasOnLine/newInvZone`, payload)
      return response.data;
    } catch (error) {
      console.error(`❌ Error mandar la localizacion de un investigador`, error);
      throw error;
    }
  },

  // Get random inv de una zona concreta
  async getRandomInvOnLine(idZone, idUser){
    try {
      const response = await axios.get(`${API_URL}/losetasOnLine/randomInvInZone/${idZone}/${idUser}`)
      return response.data;
    } catch (error) {
      console.error(`❌ Error al buscar un investigador en una zona random para encuentro onLine`, error);
      throw error;
    }
  },

  // Inicio de Fase 2 Creacion de primera interaccion por parte de Host
  async createInteraction(idUserHost, nameUserHost, idUserGuest, invData, type, idLocationMap){
    try {
      const payload = { idUserHost, nameUserHost, idUserGuest, invData, type, idLocationMap }
      // console.log(`Vamos a crear la invitacion OnLine con estos valores: ${payload}`)

      const response = await axios.post(`${API_URL}/interactions`, payload)
      // console.log(`🔍 --- createInteraction --- recibid:`, response.data)
      return response.data

    } catch (error) {
      console.error(`❌ Error al crear la invitacion para encuentro onLine`, error);
      throw error;
    }
  },

  // Responder a invitación (GUEST)
  async respondToInteraction(idInteraction, idUser, nameUser, response, invData){
    try {
      const payload = { idUser, nameUser, response, invData }
      // console.log(`Respondiendo a invitación ${idInteraction}:`, payload)

      const responseApi = await axios.put(`${API_URL}/interactions/respond/${idInteraction}`, payload)
      // console.log(`🔍 --- respondToInteraction --- recibido:`, responseApi.data)
      return responseApi.data

    } catch (error) {
      console.error(`❌ Error al responder a la invitación`, error);
      throw error;
    }
  },

  // Obtener invitaciones pendientes (GUEST)
  async getPendingInvitations(idUser){
    try {
      const response = await axios.get(`${API_URL}/interactions/pending/${idUser}`)
      // console.log(`🔍 --- getPendingInvitations --- recibido:`, response.data)
      return response.data

    } catch (error) {
      console.error(`❌ Error al obtener invitaciones pendientes`, error);
      throw error;
    }
  },

  // Polling para estado de interacción (HOST y GUEST)
  async pollInteractionStatus(idInteraction, idUser){
    try {
      const response = await axios.get(`${API_URL}/interactions/poll/${idInteraction}?idUser=${idUser}`)
      //  console.log(`🔍 --- pollInteractionStatus --- recibido:`, response.data)
      return response.data

    } catch (error) {
      console.error(`❌ Error al verificar estado de interacción`, error.response.data.message);
      throw error;
    }
  },
  
  // Tirada inicial de dado
  async rollInitialDice(idInteraction, idUser, diceResult){
    const payload =  { idUser, diceResult }
    try {
      //console.log(`Enviando tirada inicial de ${idUser} con el resultado: ${diceResult}`)
      const responseApi = await axios.put(`${API_URL}/interactions/initialRoll/${idInteraction}`, payload)

      //console.log(`🔍 --- rollInitialDice --- recibido:`, responseApi.data)
      return responseApi.data
    } catch (error) {
      console.error(`❌ Error al enviar la tirada inicial:`, error.response.data.message);
      throw error;
    }
  },  

  // Consulta mi turno en al interaccio
  async checkMyTurn(idInteraction, idUser){
    try {
      // console.log(`Consultando si es el turno de ${idUser} en la interaccion ${idInteraction}`)
      const responseApi = await axios.get(`${API_URL}/interactions/checkMyTurn/${idInteraction}?idUser=${idUser}`)
      // console.log(`🔍 --- checkMyTurn --- recibido:`, responseApi.data)
      return responseApi.data
    } catch (error) {
      console.error(`❌ Error al consultar si es mi turno:`, error.response.data.message);
      throw error;
    }
  },

  // Consulta estado de interaccio
  async getGameState(idInteraction, idUser){
    try {
      // console.log(`Consultando el estado de la interaccion ${idInteraction}`)
      const responseApi = await axios.get(`${API_URL}/interactions/gameState/${idInteraction}?idUser=${idUser}`)
      // console.log(`🔍 --- checkInteractionState --- recibido:`, responseApi.data)
      return responseApi.data
    } catch (error) {
      console.error(`❌ Error al consultar el estado de la interaccion:`, error.response.data);
      throw error;
    }
  },

  // llamada par abandonar encuentro
  async abandonInteraction(idInteraction, idUser){
    try {
      // console.log(`Enviando abandono de encuentro de ${idUser} en la interaccion ${idInteraction}`)
      const responseApi = await axios.get(`${API_URL}/interactions/abandon/${idInteraction}?idUser=${idUser}`)
      // console.log(`🔍 --- abandonInteraction --- recibido:`, responseApi.data)
      return responseApi.data
    } catch (error) {
      console.error(`❌ Error al abandonar la interaccion:`, error.response.data.message);
      throw error;
    }
  },

  // Envio de resultado de aciertos
  async sendHitResults(idInteraction, idUser, hits){
    const payload = {idUser, hits}
    try {
      const responseApi = await axios.put(`${API_URL}/interactions/sendHits/${idInteraction}`, payload)
      // console.log(`🔍 --- sendHitResults --- recibido:`, responseApi)
      return responseApi

    } catch (error) {
      console.error(`❌ - sendHitResults - Error al enviar los aciertos:`, error.response.data.message);
      throw error;
    }
  }
};