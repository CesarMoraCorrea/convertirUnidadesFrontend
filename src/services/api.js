import axios from 'axios';

// Configuración base de axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('La solicitud tardó demasiado tiempo. Inténtalo de nuevo.');
    }
    
    if (error.response) {
      // El servidor respondió con un código de error
      const message = error.response.data?.error || 'Error en el servidor';
      throw new Error(message);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Algo más causó el error
      throw new Error('Error inesperado. Inténtalo de nuevo.');
    }
  }
);

// Función para convertir unidades
export const convertUnits = async (type, data) => {
  try {
    const response = await api.post(`/conversion/${type}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener tasas de cambio de moneda
export const getCurrencyRates = async () => {
  try {
    const response = await api.get('/conversion/currency/rates');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para verificar el estado del servidor
export const checkServerStatus = async () => {
  try {
    const response = await axios.get(API_BASE_URL.replace('/api', ''));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;