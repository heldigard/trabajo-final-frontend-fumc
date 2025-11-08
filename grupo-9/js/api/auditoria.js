// ============================================
// SERVICIO DE API - AUDITORÍA
// ============================================

/**
 * Este archivo contiene todas las funciones para comunicarse
 * con los endpoints de AUDITORÍA del backend.
 *
 * La auditoría registra TODAS las operaciones (crear, actualizar, eliminar)
 * que se hacen en productos y clientes. Es fundamental para:
 * - Trazabilidad: saber quién hizo qué y cuándo
 * - Reportes: analizar actividad de cada grupo
 * - Recuperación: ver cómo estaba un registro antes de modificarlo
 *
 * Endpoints disponibles (según colecciones Postman):
 * - GET /auditoria/              - Todas las operaciones de auditoría
 * - GET /auditoria/grupo/{grupo} - Operaciones de un grupo específico
 * - GET /auditoria/tabla/{tabla} - Operaciones de una tabla (productos/clientes)
 * - GET /auditoria/operacion/{operacion} - Operaciones de un tipo (CREATE/UPDATE/DELETE)
 * - GET /auditoria/registro/{tabla}/{id} - Historial de un registro específico
 */

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Maneja errores de peticiones HTTP de forma consistente
 *
 * @param {Response} response - Objeto Response de fetch
 * @returns {Promise<Object>} - Datos parseados o lanza error
 */
async function manejarRespuesta(response) {
    if (!response.ok) {
        // Intentar obtener mensaje de error del backend
        let mensajeError = CONFIG.MENSAJES.ERROR_GENERAL;

        try {
            const errorData = await response.json();
            mensajeError = errorData.detail || errorData.message || mensajeError;
        } catch {
            // Si no se puede parsear, usar mensaje genérico
            mensajeError = `Error ${response.status}: ${response.statusText}`;
        }

        throw new Error(mensajeError);
    }

    return await response.json();
}

// ============================================
// FUNCIONES DE API - AUDITORÍA
// ============================================

/**
 * 1. Obtener todo el historial de auditoría
 *
 * @returns {Promise<Array>} - Array de registros de auditoría
 *
 * Cada registro contiene:
 * - id: ID de la auditoría
 * - tabla_afectada: 'productos' o 'clientes'
 * - operacion: 'CREATE', 'UPDATE', o 'DELETE'
 * - registro_id: ID del producto/cliente afectado
 * - datos_anteriores: JSON con los datos antes del cambio (null en CREATE)
 * - datos_nuevos: JSON con los datos después del cambio (null en DELETE)
 * - grupo_estudiantes: Nombre del grupo que hizo la operación
 * - fecha_operacion: Timestamp de cuándo ocurrió
 */
async function obtenerTodoHistorial() {
    try {
        const response = await fetch(buildURL('/auditoria/'), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error('Error al obtener historial de auditoría:', error);
        throw error;
    }
}

/**
 * 2. Obtener operaciones de un grupo específico
 *
 * @param {string} grupo - Nombre del grupo (ej: 'GRUPO_1')
 * @returns {Promise<Array>} - Operaciones de ese grupo
 *
 * Útil para ver qué ha hecho tu grupo o comparar con otros grupos
 *
 * Ejemplo de uso:
 * const operacionesGrupo1 = await obtenerHistorialPorGrupo('GRUPO_1');
 */
async function obtenerHistorialPorGrupo(grupo) {
    try {
        const response = await fetch(buildURL(`/auditoria/grupo/${encodeURIComponent(grupo)}`), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al obtener historial del grupo "${grupo}":`, error);
        throw error;
    }
}

/**
 * 3. Obtener operaciones de una tabla específica
 *
 * @param {string} tabla - 'productos' o 'clientes'
 * @returns {Promise<Array>} - Operaciones de esa tabla
 *
 * Ejemplo de uso:
 * const operacionesProductos = await obtenerHistorialPorTabla('productos');
 */
async function obtenerHistorialPorTabla(tabla) {
    try {
        const response = await fetch(buildURL(`/auditoria/tabla/${encodeURIComponent(tabla)}`), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al obtener historial de tabla "${tabla}":`, error);
        throw error;
    }
}

/**
 * 4. Obtener operaciones de un tipo específico
 *
 * @param {string} operacion - 'CREATE', 'UPDATE', o 'DELETE'
 * @returns {Promise<Array>} - Operaciones de ese tipo
 *
 * Ejemplo de uso:
 * const creaciones = await obtenerHistorialPorOperacion('CREATE');
 * const actualizaciones = await obtenerHistorialPorOperacion('UPDATE');
 * const eliminaciones = await obtenerHistorialPorOperacion('DELETE');
 */
async function obtenerHistorialPorOperacion(operacion) {
    try {
        const response = await fetch(buildURL(`/auditoria/operacion/${encodeURIComponent(operacion)}`), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al obtener historial de operación "${operacion}":`, error);
        throw error;
    }
}

/**
 * 5. Obtener historial completo de un registro específico
 *
 * @param {string} tabla - 'productos' o 'clientes'
 * @param {number} id - ID del producto o cliente
 * @returns {Promise<Array>} - Todas las operaciones sobre ese registro
 *
 * Muy útil para ver:
 * - Cuándo se creó el registro
 * - Todas las modificaciones que ha tenido
 * - Si fue eliminado y cuándo
 * - Qué grupos lo han modificado
 *
 * Ejemplo de uso:
 * const historialProducto5 = await obtenerHistorialRegistro('productos', 5);
 * // Muestra: creación, 3 actualizaciones, eliminación
 */
async function obtenerHistorialRegistro(tabla, id) {
    try {
        const response = await fetch(buildURL(`/auditoria/registro/${encodeURIComponent(tabla)}/${id}`), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al obtener historial de ${tabla} ID ${id}:`, error);
        throw error;
    }
}

// ============================================
// FUNCIONES AUXILIARES PARA REPORTES
// ============================================

/**
 * Obtener estadísticas generales de auditoría
 *
 * @returns {Promise<Object>} - Objeto con estadísticas
 *
 * Calcula:
 * - Total de operaciones
 * - Operaciones por tipo (CREATE, UPDATE, DELETE)
 * - Operaciones por tabla (productos, clientes)
 * - Operaciones por grupo
 */
async function obtenerEstadisticasAuditoria() {
    try {
        const historial = await obtenerTodoHistorial();

        const estadisticas = {
            total: historial.length,
            porOperacion: {
                CREATE: 0,
                UPDATE: 0,
                DELETE: 0
            },
            porTabla: {
                productos: 0,
                clientes: 0
            },
            porGrupo: {}
        };

        // Contar operaciones
        historial.forEach(registro => {
            // Por operación
            estadisticas.porOperacion[registro.operacion]++;

            // Por tabla
            estadisticas.porTabla[registro.tabla_afectada]++;

            // Por grupo
            const grupo = registro.grupo_estudiantes;
            if (!estadisticas.porGrupo[grupo]) {
                estadisticas.porGrupo[grupo] = 0;
            }
            estadisticas.porGrupo[grupo]++;
        });

        return estadisticas;

    } catch (error) {
        console.error('Error al obtener estadísticas de auditoría:', error);
        throw error;
    }
}

/**
 * Formatear fecha de auditoría para mostrar al usuario
 *
 * @param {string} fechaISO - Fecha en formato ISO del backend
 * @returns {string} - Fecha formateada legible
 *
 * Convierte: "2025-01-15T14:30:00" -> "15/01/2025 14:30"
 */
function formatearFechaAuditoria(fechaISO) {
    const fecha = new Date(fechaISO);

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}

/**
 * Comparar datos anteriores y nuevos para resaltar cambios
 *
 * @param {Object} datosAnteriores - Datos antes del cambio
 * @param {Object} datosNuevos - Datos después del cambio
 * @returns {Array} - Array de campos modificados
 *
 * Retorna:
 * [
 *   { campo: 'precio', antes: 1000, despues: 1200 },
 *   { campo: 'stock', antes: 10, despues: 8 }
 * ]
 */
function compararCambios(datosAnteriores, datosNuevos) {
    const cambios = [];

    if (!datosAnteriores || !datosNuevos) {
        return cambios;
    }

    // Comparar cada campo
    for (const campo in datosNuevos) {
        if (datosAnteriores[campo] !== datosNuevos[campo]) {
            cambios.push({
                campo: campo,
                antes: datosAnteriores[campo],
                despues: datosNuevos[campo]
            });
        }
    }

    return cambios;
}

// ============================================
// LOGGING PARA DESARROLLO
// ============================================

console.log('✅ Servicio de API de Auditoría cargado');
