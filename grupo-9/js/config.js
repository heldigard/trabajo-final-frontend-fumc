// ============================================
// CONFIGURACIÃ“N GLOBAL DE LA APLICACIÃ“N
// ============================================

/**
 * Este archivo centraliza toda la configuraciÃ³n de la aplicaciÃ³n.
 *
 * Â¿Por quÃ© es importante?
 * - Evita repetir URLs en cada archivo
 * - Facilita cambios de configuraciÃ³n (solo se cambia aquÃ­)
 * - Similar a archivos .env en frameworks modernos
 *
 * En un proyecto real con framework, esto vendrÃ­a de variables de entorno.
 * AquÃ­ lo hacemos de forma simple para aprender los fundamentos.
 */

const CONFIG = {
    // URL base de la API del backend
    // âš ï¸ IMPORTANTE: Cambiar si tu backend estÃ¡ en otro puerto u otra URL
    API_BASE_URL: 'http://localhost:8000',

    // Nombre del grupo de estudiantes
    // âš ï¸ CAMBIAR POR TU GRUPO: GRUPO_1, GRUPO_2, GRUPO_3, etc.
    // Este valor se envÃ­a en peticiones POST/PUT para identificar quiÃ©n hace la operaciÃ³n
    GRUPO_ESTUDIANTES: 'GRUPO_9',

    // Tiempo mÃ¡ximo de espera para peticiones (en milisegundos)
    TIMEOUT: 10000, // 10 segundos

    // Mensajes de usuario
    MENSAJES: {
        ERROR_CONEXION: 'No se pudo conectar con el servidor. Verifica que el backend estÃ© ejecutÃ¡ndose.',
        ERROR_GENERAL: 'OcurriÃ³ un error inesperado. Por favor, intenta nuevamente.',
        EXITO_CREAR: 'Registro creado exitosamente',
        EXITO_ACTUALIZAR: 'Registro actualizado exitosamente',
        EXITO_ELIMINAR: 'Registro eliminado exitosamente',
        CONFIRMACION_ELIMINAR: 'Â¿EstÃ¡s seguro de que deseas eliminar este registro?'
    },

    // ConfiguraciÃ³n de paginaciÃ³n
    ITEMS_POR_PAGINA: 10,

    // CategorÃ­as de productos (debe coincidir con el backend)
    CATEGORIAS_PRODUCTOS: [
        'ElectrÃ³nica',
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
        'MedellÃ­n',
        'BogotÃ¡',
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
 * FunciÃ³n auxiliar para construir URLs completas de endpoints
 *
 * @param {string} endpoint - El endpoint relativo (ej: '/productos/')
 * @returns {string} - URL completa (ej: 'http://localhost:8000/productos/')
 *
 * Ejemplo de uso:
 * const url = buildURL('/productos/'); // 'http://localhost:8000/productos/'
 */
function buildURL(endpoint) {
    // Asegurarse de que el endpoint comience con '/'
    if (!endpoint.startsWith('/')) {
        endpoint = '/' + endpoint;
    }

    return `${CONFIG.API_BASE_URL}${endpoint}`;
}

/**
 * FunciÃ³n para verificar si el backend estÃ¡ disponible
 *
 * @returns {Promise<boolean>} - true si el backend responde, false si no
 *
 * Esta funciÃ³n es Ãºtil para mostrar mensajes al usuario si el backend
 * no estÃ¡ ejecutÃ¡ndose.
 */
async function verificarConexionBackend() {
    try {
        const response = await fetch(buildURL('/productos/'), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return response.ok;
    } catch (error) {
        console.error('Error al verificar conexiÃ³n con backend:', error);
        return false;
    }
}

// ============================================
// EXPORTAR CONFIGURACIÃ“N
// ============================================

// En JavaScript vanilla, las variables globales estÃ¡n disponibles
// automÃ¡ticamente en todos los scripts que se carguen despuÃ©s.
// En un proyecto con mÃ³dulos ES6, usarÃ­amos: export default CONFIG;

console.log('âœ… ConfiguraciÃ³n cargada:', CONFIG);

