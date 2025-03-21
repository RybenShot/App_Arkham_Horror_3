import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL_PROD ;

export const apiService = {
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
};
