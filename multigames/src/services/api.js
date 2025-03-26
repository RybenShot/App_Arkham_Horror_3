import axios from "axios";
//const API_URL = process.env.VUE_APP_API_URL_LOCAL ;
//const API_URL = process.env.VUE_APP_API_URL_DEV;
const API_URL = process.env.VUE_APP_API_URL_PROD ;


export const apiService = {
  // metodo basico para la bienvenida
  async fetchData() {
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
  async fetchVisits() {
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
};
