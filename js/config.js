// ============================================
// CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
// ============================================

/**
 * Este archivo centraliza toda la configuración de la aplicación.
 *
 * ¿Por qué es importante?
 * - Evita repetir URLs en cada archivo
 * - Facilita cambios de configuración (solo se cambia aquí)
 * - Similar a archivos .env en frameworks modernos
 *
 * En un proyecto real con framework, esto vendría de variables de entorno.
 * Aquí lo hacemos de forma simple para aprender los fundamentos.
 */

const CONFIG = {
    // URL base de la API del backend
    // ⚠️ IMPORTANTE: Cambiar si tu backend está en otro puerto u otra URL
    API_BASE_URL: 'http://localhost:8000/api/v1',

    // Nombre del grupo de estudiantes
    // ⚠️ CAMBIAR POR TU GRUPO: GRUPO_1, GRUPO_2, GRUPO_3, etc.
    // Este valor se envía en peticiones POST/PUT para identificar quién hace la operación
    GRUPO_ESTUDIANTES: 'GRUPO_1',

    // Tiempo máximo de espera para peticiones (en milisegundos)
    TIMEOUT: 10000, // 10 segundos

    // Mensajes de usuario
    MENSAJES: {
        ERROR_CONEXION: 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.',
        ERROR_GENERAL: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
        EXITO_CREAR: 'Registro creado exitosamente',
        EXITO_ACTUALIZAR: 'Registro actualizado exitosamente',
        EXITO_ELIMINAR: 'Registro eliminado exitosamente',
        CONFIRMACION_ELIMINAR: '¿Estás seguro de que deseas eliminar este registro?'
    },

    // Configuración de paginación
    ITEMS_POR_PAGINA: 10,

    // Categorías de productos (debe coincidir con el backend)
    CATEGORIAS_PRODUCTOS: [
        'Electrónica',
        'Ropa',
        'Alimentos',
        'Hogar',
        'Deportes',
        'Libros',
        'Juguetes',
        'Salud',
        'Otros'
    ],

    // Ciudades disponibles para clientes
    CIUDADES: [
        'Medellín',
        'Bogotá',
        'Cali',
        'Barranquilla',
        'Cartagena',
        'Bucaramanga',
        'Pereira',
        'Manizales',
        'Otra'
    ]
};

/**
 * Función auxiliar para construir URLs completas de endpoints
 *
 * @param {string} endpoint - El endpoint relativo (ej: '/productos/')
 * @returns {string} - URL completa (ej: 'http://localhost:8000/api/v1/productos/')
 *
 * Ejemplo de uso:
 * const url = buildURL('/productos/'); // 'http://localhost:8000/api/v1/productos/'
 */
function buildURL(endpoint) {
    // Asegurarse de que el endpoint comience con '/'
    if (!endpoint.startsWith('/')) {
        endpoint = '/' + endpoint;
    }

    return `${CONFIG.API_BASE_URL}${endpoint}`;
}

/**
 * Función para verificar si el backend está disponible
 *
 * @returns {Promise<boolean>} - true si el backend responde, false si no
 *
 * Esta función es útil para mostrar mensajes al usuario si el backend
 * no está ejecutándose.
 */
async function verificarConexionBackend() {
    try {
        const response = await fetch(buildURL('/productos/'), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return response.ok;
    } catch (error) {
        console.error('Error al verificar conexión con backend:', error);
        return false;
    }
}

// ============================================
// EXPORTAR CONFIGURACIÓN
// ============================================

// En JavaScript vanilla, las variables globales están disponibles
// automáticamente en todos los scripts que se carguen después.
// En un proyecto con módulos ES6, usaríamos: export default CONFIG;

console.log('✅ Configuración cargada:', CONFIG);
