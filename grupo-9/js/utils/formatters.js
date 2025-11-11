// ============================================
// UTILIDADES - FORMATEADORES
// ============================================

/**
 * Este archivo contiene funciones para formatear datos
 * (precios, fechas, textos, etc.)
 *
 * Responsabilidad: Presentar datos en formatos legibles
 */

// ============================================
// 🎯 RETO 2: FORMATO DE PRECIOS COLOMBIANO (⭐ Fácil - 15 min)
// ============================================

/**
 * Formatea un número como precio en pesos colombianos
 *
 * OBJETIVO EDUCATIVO:
 * Este reto es para APRENDER cómo funciona el formato de moneda en JavaScript.
 * El código ya está implementado y funciona correctamente.
 * Tu tarea es LEER y COMPRENDER cómo funciona.
 *
 * ¿QUÉ HACE ESTA FUNCIÓN?
 * Convierte números a formato de dinero colombiano:
 * - 2500000 → "$2.500.000"
 * - 1000 → "$1.000"
 * - 500.50 → "$501" (redondea automáticamente)
 *
 * ¿CÓMO FUNCIONA?
 * Usa la clase Intl.NumberFormat que es nativa de JavaScript.
 * No necesitas librerías externas para formatear números.
 *
 * PARÁMETROS DE Intl.NumberFormat:
 * 1. 'es-CO' → Locale de Colombia (define separadores y formato)
 * 2. style: 'currency' → Indica que es dinero
 * 3. currency: 'COP' → Peso colombiano
 *
 * EJEMPLOS DE USO:
 * ```javascript
 * formatearPrecio(2500000);  // "$2.500.000"
 * formatearPrecio(1000);     // "$1.000"
 * formatearPrecio(0);        // "$0"
 * ```
 *
 * EJERCICIO PARA PRACTICAR:
 * 1. Abre la consola del navegador (F12)
 * 2. Copia esta función completa
 * 3. Prueba con diferentes valores:
 *    formatearPrecio(1000000)
 *    formatearPrecio(500)
 *    formatearPrecio(12345678)
 *
 * PARA INVESTIGAR:
 * - ¿Qué pasa si cambias 'es-CO' por 'en-US'? (Formato americano)
 * - ¿Qué pasa si cambias 'COP' por 'USD'? (Dólares)
 * - Busca en MDN: "Intl.NumberFormat" para más opciones
 *
 * @param {number} precio - Número a formatear
 * @returns {string} Precio formateado como "$2.500.000"
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0 // Sin centavos
    }).format(precio);
}

/**
 * Formatea una fecha ISO a formato legible colombiano
 *
 * @param {string} fechaISO - Fecha en formato ISO "2024-03-15T10:30:00"
 * @returns {string} Fecha formateada como "15/03/2024 10:30"
 *
 * @example
 * formatearFecha("2024-03-15T10:30:00"); // "15/03/2024 10:30"
 */
function formatearFecha(fechaISO) {
    if (!fechaISO) return '-';

    const fecha = new Date(fechaISO);

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const año = fecha.getFullYear();
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
}

/**
 * Trunca un texto largo y agrega "..."
 *
 * @param {string} texto - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 *
 * @example
 * truncarTexto("Descripción muy larga...", 20); // "Descripción muy l..."
 */
function truncarTexto(texto, maxLength = 50) {
    if (!texto) return '-';
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
}

/**
 * Capitaliza la primera letra de un texto
 *
 * @param {string} texto - Texto a capitalizar
 * @returns {string} Texto capitalizado
 *
 * @example
 * capitalizar("tecnología"); // "Tecnología"
 */
function capitalizar(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Formatea un número de teléfono colombiano
 *
 * @param {string} telefono - Número de teléfono
 * @returns {string} Teléfono formateado
 *
 * @example
 * formatearTelefono("3001234567"); // "300 123 4567"
 */
function formatearTelefono(telefono) {
    if (!telefono) return '-';

    // Si tiene 10 dígitos: "300 123 4567"
    if (telefono.length === 10) {
        return `${telefono.slice(0, 3)} ${telefono.slice(3, 6)} ${telefono.slice(6)}`;
    }

    return telefono;
}
