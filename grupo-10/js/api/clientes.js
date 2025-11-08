// ============================================
// SERVICIO DE API - CLIENTES
// ============================================

/**
 * Este archivo contiene todas las funciones para comunicarse
 * con los endpoints de CLIENTES del backend.
 *
 * Endpoints disponibles (según colecciones Postman):
 * - GET    /clientes/            - Listar todos los clientes
 * - GET    /clientes/{id}        - Obtener un cliente específico
 * - GET    /clientes/buscar/{termino} - Buscar por nombre o email
 * - GET    /clientes/ciudad/{ciudad} - Filtrar por ciudad
 * - GET    /clientes/documento/{documento} - Buscar por documento
 * - POST   /clientes/            - Crear nuevo cliente
 * - PUT    /clientes/{id}        - Actualizar cliente completo
 * - PATCH  /clientes/{id}        - Actualizar campos específicos
 * - DELETE /clientes/{id}        - Eliminar cliente (soft delete)
 */

// ============================================
// FUNCIONES DE API - CLIENTES
// ============================================

/**
 * 1. Obtener todos los clientes
 *
 * @returns {Promise<Array>} - Array de clientes
 */
async function obtenerTodosLosClientes() {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL('/clientes/'), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 2. Obtener un cliente por ID
 *
 * @param {number} id - ID del cliente
 * @returns {Promise<Object>} - Datos del cliente
 */
async function obtenerClientePorId(id) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/clientes/${id}`), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al obtener cliente ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 3. Buscar clientes por nombre o email
 *
 * @param {string} termino - Término de búsqueda (nombre o email)
 * @returns {Promise<Array>} - Array de clientes que coinciden
 *
 * Ejemplo de uso:
 * const resultados = await buscarClientes('juan');
 * // Devuelve clientes con 'juan' en nombre o email
 */
async function buscarClientes(termino) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL('/clientes/buscar/nombre') + `?query=${encodeURIComponent(termino)}`, {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al buscar clientes con término "${termino}":`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 4. Filtrar clientes por ciudad
 *
 * @param {string} ciudad - Ciudad a filtrar
 * @returns {Promise<Array>} - Array de clientes de esa ciudad
 *
 * Ejemplo de uso:
 * const clientesMedellin = await filtrarClientesPorCiudad('Medellín');
 */
async function filtrarClientesPorCiudad(ciudad) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL('/clientes/') + `?ciudad=${encodeURIComponent(ciudad)}`, {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al filtrar clientes por ciudad "${ciudad}":`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 5. Buscar cliente por email
 *
 * @param {string} email - Email del cliente
 * @returns {Promise<Object>} - Cliente encontrado
 *
 * Ejemplo de uso:
 * const cliente = await buscarClientePorEmail('1234567890');
 */
async function buscarClientePorEmail(email) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/clientes/buscar/email/${encodeURIComponent(email)}`), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al buscar cliente por email "${email}":`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 6. Crear un nuevo cliente
 *
 * @param {Object} cliente - Datos del nuevo cliente
 * @param {string} cliente.nombre - Nombre completo (requerido)
 * @param {string} cliente.email - Email único (requerido)
 * @param {string} cliente.telefono - Teléfono (requerido)
 * @param {string} cliente.documento - Documento de identidad (requerido, único)
 * @param {string} cliente.ciudad - Ciudad de residencia (requerido)
 * @param {string} cliente.direccion - Dirección (opcional)
 * @returns {Promise<Object>} - Cliente creado con su ID
 *
 * ⚠️ IMPORTANTE: El email y el documento deben ser únicos en TODA la base de datos
 * (compartida entre todos los grupos)
 *
 * Ejemplo de uso:
 * const nuevoCliente = {
 *     nombre: 'Juan Pérez',
 *     email: 'juan.perez@ejemplo.com',
 *     telefono: '3001234567',
 *     documento: '1234567890',
 *     ciudad: 'Medellín',
 *     direccion: 'Calle 10 # 20-30'
 * };
 * const creado = await crearCliente(nuevoCliente);
 */
async function crearCliente(cliente) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL('/clientes/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente),
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 7. Actualizar un cliente completo (PUT)
 *
 * @param {number} id - ID del cliente a actualizar
 * @param {Object} cliente - Datos completos del cliente
 * @returns {Promise<Object>} - Cliente actualizado
 *
 * ⚠️ IMPORTANTE: PUT requiere enviar TODOS los campos
 */
async function actualizarClienteCompleto(id, cliente) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/clientes/${id}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente),
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al actualizar cliente ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 8. Actualizar campos específicos de un cliente (PATCH)
 *
 * @param {number} id - ID del cliente a actualizar
 * @param {Object} camposActualizar - Solo los campos que se quieren cambiar
 * @returns {Promise<Object>} - Cliente actualizado
 *
 * Ejemplo de uso:
 * // Solo actualizar teléfono y ciudad
 * await actualizarClienteParcial(10, { telefono: '3009876543', ciudad: 'Bogotá' });
 */
async function actualizarClienteParcial(id, camposActualizar) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/clientes/${id}`), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(camposActualizar),
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al actualizar parcialmente cliente ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 9. Eliminar un cliente (Soft Delete)
 *
 * @param {number} id - ID del cliente a eliminar
 * @returns {Promise<Object>} - Confirmación de eliminación
 *
 * ⚠️ IMPORTANTE: Eliminación LÓGICA, el cliente se marca como inactivo
 */
async function eliminarCliente(id) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/clientes/${id}`), {
            method: 'DELETE',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al eliminar cliente ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

// ============================================
// FUNCIONES AUXILIARES ESPECÍFICAS DE CLIENTES
// ============================================

/**
 * Validar formato de email en el frontend
 *
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido, false si no
 *
 * Esta validación es PREVENTIVA antes de enviar al backend.
 * El backend también valida, pero esto mejora la experiencia del usuario.
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validar formato de teléfono colombiano
 *
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} - true si es válido
 *
 * Acepta formatos:
 * - 3001234567 (10 dígitos)
 * - 300-123-4567
 * - 300 123 4567
 */
function validarTelefono(telefono) {
    // Remover espacios y guiones
    const telefonoLimpio = telefono.replace(/[\s-]/g, '');

    // Validar 10 dígitos que comiencen con 3 (celulares) o 7 dígitos (fijos)
    return /^3\d{9}$/.test(telefonoLimpio) || /^\d{7}$/.test(telefonoLimpio);
}

/**
 * Validar documento de identidad
 *
 * @param {string} documento - Documento a validar
 * @returns {boolean} - true si es válido
 *
 * Acepta 6 a 10 dígitos
 */
function validarDocumento(documento) {
    const documentoLimpio = documento.replace(/\D/g, ''); // Remover no-dígitos
    return documentoLimpio.length >= 6 && documentoLimpio.length <= 10;
}

// ============================================
// LOGGING PARA DESARROLLO
// ============================================

console.log('✅ Servicio de API de Clientes cargado');
