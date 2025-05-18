import axios from "axios";
//const API_URL = process.env.VUE_APP_API_URL_LOCAL ;
//const API_URL = process.env.VUE_APP_API_URL_DEV;
const API_URL = process.env.VUE_APP_API_URL_PROD ;


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
      console.log(response.data)
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
      console.error('❌ error al crear el mapa in play :', error);
      throw error
    }
  },

  async getMapInPlayByID(idMapInPlay){
    try {
      const response = await axios.get(`${API_URL}/mapInPlay/${idMapInPlay}`);
      return response.data
    } catch (error) {
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
      console.log(response.data)
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
  
  
};
