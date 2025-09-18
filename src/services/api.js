/**
 * Servicio API para la aplicación de conversión de unidades
 * 
 * Este archivo configura y exporta las funciones necesarias para comunicarse
 * con el backend de la aplicación, incluyendo conversiones de unidades,
 * obtención de tasas de cambio y verificación del estado del servidor.
 */

import axios from 'axios';

// ============================================================================
// CONFIGURACIÓN DE LA API
// ============================================================================

// URL base de la API - utiliza variable de entorno o URL de producción por defecto
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://convertir-unidades-backend.vercel.app/api';

// Instancia personalizada de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,        // URL base para todas las peticiones
  timeout: 10000,               // Timeout de 10 segundos para evitar peticiones colgadas
  headers: {
    'Content-Type': 'application/json',  // Tipo de contenido por defecto
  },
});

// ============================================================================
// INTERCEPTORES DE RESPUESTA
// ============================================================================

/**
 * Interceptor para manejo centralizado de errores
 * 
 * Captura todos los errores de las peticiones HTTP y los transforma
 * en mensajes de error comprensibles para el usuario final.
 */
api.interceptors.response.use(
  // Función de éxito - devuelve la respuesta tal como está
  (response) => response,
  
  // Función de error - maneja diferentes tipos de errores
  (error) => {
    console.error('API Error:', error);
    
    // Error de timeout - la petición tardó demasiado
    if (error.code === 'ECONNABORTED') {
      throw new Error('La solicitud tardó demasiado tiempo. Inténtalo de nuevo.');
    }
    
    if (error.response) {
      // El servidor respondió con un código de error (4xx, 5xx)
      const message = error.response.data?.error || 'Error en el servidor';
      throw new Error(message);
    } else if (error.request) {
      // La solicitud se hizo pero no se recibió respuesta (problemas de red)
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Error en la configuración de la petición u otro error inesperado
      throw new Error('Error inesperado. Inténtalo de nuevo.');
    }
  }
);

// ============================================================================
// FUNCIONES DE LA API
// ============================================================================

/**
 * Función para convertir unidades
 * 
 * Realiza una petición POST al endpoint de conversión específico según el tipo
 * de conversión solicitado (time, weight, temperature, currency).
 * 
 * @param {string} type - Tipo de conversión ('time', 'weight', 'temperature', 'currency')
 * @param {Object} data - Datos de la conversión que incluyen:
 *   - fromUnit: Unidad de origen
 *   - toUnit: Unidad de destino
 *   - value: Valor a convertir
 * @returns {Promise<Object>} Objeto con el resultado de la conversión
 * @throws {Error} Error si la conversión falla
 */
export const convertUnits = async (type, data) => {
  try {
    const response = await api.post(`/conversion/${type}`, data);
    return response.data;
  } catch (error) {
    // Re-lanza el error para que sea manejado por el componente que llama
    throw error;
  }
};

/**
 * Función para obtener tasas de cambio de moneda
 * 
 * Realiza una petición GET para obtener las tasas de cambio actuales
 * de las monedas soportadas por la aplicación.
 * 
 * @returns {Promise<Object>} Objeto con las tasas de cambio actuales
 * @throws {Error} Error si no se pueden obtener las tasas
 */
export const getCurrencyRates = async () => {
  try {
    const response = await api.get('/conversion/currency/rates');
    return response.data;
  } catch (error) {
    // Re-lanza el error para que sea manejado por el componente que llama
    throw error;
  }
};

/**
 * Función para verificar el estado del servidor
 * 
 * Realiza una petición GET al endpoint raíz del servidor para verificar
 * que esté funcionando correctamente. Útil para health checks.
 * 
 * @returns {Promise<Object>} Respuesta del servidor indicando su estado
 * @throws {Error} Error si el servidor no está disponible
 */
export const checkServerStatus = async () => {
  try {
    // Usa axios directamente (no la instancia configurada) para evitar interceptores
    const response = await axios.get(API_BASE_URL.replace('/api', ''));
    return response.data;
  } catch (error) {
    // Re-lanza el error para que sea manejado por el componente que llama
    throw error;
  }
};

// ============================================================================
// EXPORTACIÓN POR DEFECTO
// ============================================================================

/**
 * Exporta la instancia configurada de axios para uso directo si es necesario
 * en otros módulos que requieran funcionalidad HTTP personalizada.
 */
export default api;