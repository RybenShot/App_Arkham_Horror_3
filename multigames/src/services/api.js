import axios from "axios";
const API_URL = process.env.VUE_APP_API_URL_LOCAL ;
//const API_URL = process.env.VUE_APP_API_URL_DEV;
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
      console.error(`Error al obtener la lista de mapas`, error);
      return null;
    }
  },

  async obtainEnemyList(idMap){
    try {
      const response = await axios.get(`${API_URL}/maps/enemies/${idMap}`);
      return response.data
    } catch (error) {
      console.error(`Error al obtener la lista de enemigos`, error);
      return null;
    }
  },

  async obtainInv(){
    try {
      const response = await axios.get(`${API_URL}/inv/previewList`)
      return response.data
    } catch (error) {
      console.error(`Error al obtener la lista de investigadores`, error);
      return [];
    }
  }
  
};
