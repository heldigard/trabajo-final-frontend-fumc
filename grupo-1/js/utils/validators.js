// ============================================
// UTILIDADES - VALIDADORES
// ============================================

/**
 * Este archivo contiene funciones de validación
 * para formularios y datos
 *
 * Responsabilidad: Validar datos antes de enviar al backend
 */

// ============================================
// 🎯 RETO 1: VALIDAR STOCK NEGATIVO (⭐ Fácil - 20 min)
// ============================================

/**
 * Valida los datos de un producto antes de crear/editar
 *
 * OBJETIVO:
 * Evitar que se guarden productos con datos incorrectos.
 * En particular, el stock no puede ser negativo.
 *
 * INSTRUCCIONES:
 * 1. Busca el comentario "// TODO: RETO 1" más abajo
 * 2. Descomenta las 3 líneas de código
 * 3. Prueba creando un producto con stock -5
 * 4. Debe mostrar una alerta de error
 *
 * ¿QUÉ ES isNaN()?
 * - isNaN = "is Not a Number" (¿No es un número?)
 * - Devuelve true si el valor NO es un número
 * - Ejemplo: isNaN("abc") → true
 * - Ejemplo: isNaN(123) → false
 *
 * PISTAS:
 * 💡 PISTA 1: El stock viene como string del formulario, parseFloat() lo convierte a número
 * 💡 PISTA 2: El operador < compara si un número es menor que otro
 * 💡 PISTA 3: El método .push() agrega un elemento al array de errores
 * 💡 PISTA 4: El mensaje debe ser claro para el usuario
 * CRITERIOS DE ACEPTACIÓN:
 * ✅ Si escribo stock = -5, debe mostrar alerta
 * ✅ Si escribo stock = 0, NO debe mostrar alerta (0 es válido)
 * ✅ Si escribo stock = 10, NO debe mostrar alerta
 * ✅ El producto NO se guarda si el stock es negativo
 *
 * @param {Object} datos - Datos del producto a validar
 * @returns {Array} Array de errores (vacío si todo está bien)
 */
function validarDatosProducto(datos) {
    const errores = [];

    // Validar nombre
    if (!datos.nombre || datos.nombre.trim() === '') {
        errores.push('El nombre es obligatorio');
    }

    // Validar precio
    if (isNaN(datos.precio) || datos.precio <= 0) {
        errores.push('El precio debe ser mayor a 0');
    }

    // TODO: RETO 1 - Descomenta las siguientes 3 líneas:
    if (isNaN(datos.stock) || datos.stock < 0) {
    errores.push('El stock no puede ser negativo');
    }

    // Validar categoría
    if (!datos.categoria || datos.categoria === '') {
        errores.push('Debes seleccionar una categoría');
    }

    return errores;
}

/**
 * Valida el email de un cliente
 *
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido, false si no
 *
 * @example
 * validarEmail("juan@gmail.com"); // true
 * validarEmail("correo-invalido"); // false
 */
function validarEmail(email) {
    if (!email) return false;

    // Expresión regular para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida el teléfono colombiano (10 dígitos)
 *
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} true si es válido
 */
function validarTelefono(telefono) {
    if (!telefono) return false;

    // Solo números y exactamente 10 dígitos
    const regex = /^\d{10}$/;
    return regex.test(telefono);
}

/**
 * Valida documento de identidad (6 a 10 dígitos)
 *
 * @param {string} documento - Documento a validar
 * @returns {boolean} true si es válido
 */
function validarDocumento(documento) {
    if (!documento) return false;

    // Solo números, entre 6 y 10 dígitos
    const regex = /^\d{6,10}$/;
    return regex.test(documento);
}

/**
 * Valida los datos de un cliente antes de crear/editar
 *
 * @param {Object} datos - Datos del cliente
 * @returns {Array} Array de errores
 */
function validarDatosCliente(datos) {
    const errores = [];

    // Validar nombre
    if (!datos.nombre || datos.nombre.trim() === '') {
        errores.push('El nombre es obligatorio');
    }

    // Validar email
    if (!validarEmail(datos.email)) {
        errores.push('Email inválido (ejemplo: juan@gmail.com)');
    }

    // Validar teléfono
    if (!validarTelefono(datos.telefono)) {
        errores.push('Teléfono inválido (debe tener 10 dígitos)');
    }

    // Validar documento
    if (!validarDocumento(datos.documento)) {
        errores.push('Documento inválido (6 a 10 dígitos)');
    }

    // Validar ciudad
    if (!datos.ciudad || datos.ciudad === '') {
        errores.push('Debes seleccionar una ciudad');
    }

    return errores;
}
