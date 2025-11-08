// ============================================
// UTILIDADES - UI (INTERFAZ DE USUARIO)
// ============================================

/**
 * Este archivo contiene funciones para manipular la interfaz
 * (mostrar alertas, spinners, estados de carga, etc.)
 *
 * Responsabilidad: Interactuar con el usuario visualmente
 */

/**
 * Muestra una alerta temporal en la página
 *
 * @param {string} titulo - Título de la alerta
 * @param {string} mensaje - Mensaje de la alerta
 * @param {string} tipo - Tipo: 'success', 'error', 'warning', 'info'
 *
 * @example
 * mostrarAlerta('Éxito', 'Producto creado correctamente', 'success');
 */
function mostrarAlerta(titulo, mensaje, tipo = 'info') {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${tipo === 'success' ? 'var(--verde)' : tipo === 'error' ? 'var(--rojo)' : 'var(--azul)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    alerta.innerHTML = `
        <div style="display: flex; align-items: start; gap: 1rem;">
            <span style="font-size: 1.5rem;">${tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : 'ℹ️'}</span>
            <div>
                <strong style="display: block; margin-bottom: 0.5rem;">${titulo}</strong>
                <p style="margin: 0; font-size: 0.9rem;">${mensaje}</p>
            </div>
        </div>
    `;

    document.body.appendChild(alerta);

    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        alerta.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alerta.remove(), 300);
    }, 5000);
}

/**
 * Muestra un spinner de carga en la tabla
 *
 * @param {string} idTabla - ID del tbody donde mostrar el spinner
 * @param {number} colspan - Número de columnas
 */
function mostrarSpinner(idTabla, colspan = 8) {
    const tbody = document.getElementById(idTabla);
    tbody.innerHTML = `
        <tr>
            <td colspan="${colspan}" style="text-align: center; padding: 3rem;">
                <div class="spinner"></div>
                <p style="margin-top: 1rem; color: var(--texto-secundario);">
                    Cargando datos...
                </p>
            </td>
        </tr>
    `;
}

/**
 * Muestra mensaje de tabla vacía
 *
 * @param {string} idTabla - ID del tbody
 * @param {string} mensaje - Mensaje a mostrar
 * @param {number} colspan - Número de columnas
 */
function mostrarTablaVacia(idTabla, mensaje, colspan = 8) {
    const tbody = document.getElementById(idTabla);
    tbody.innerHTML = `
        <tr>
            <td colspan="${colspan}" style="text-align: center; padding: 3rem;">
                <p style="color: var(--texto-secundario); font-size: 1.1rem;">
                    ${mensaje}
                </p>
            </td>
        </tr>
    `;
}

/**
 * Deshabilita un botón y muestra estado de carga
 *
 * @param {HTMLElement} boton - Elemento del botón
 * @param {string} textoOriginal - Texto original del botón
 *
 * @example
 * deshabilitarBoton(btnGuardar, 'Guardar');
 * // Botón muestra: "⏳ Guardando..."
 */
function deshabilitarBoton(boton, textoOriginal) {
    boton.disabled = true;
    boton.dataset.textoOriginal = textoOriginal;
    boton.textContent = `⏳ ${textoOriginal}ando...`;
}

/**
 * Habilita un botón después de una operación
 *
 * @param {HTMLElement} boton - Elemento del botón
 */
function habilitarBoton(boton) {
    boton.disabled = false;
    const textoOriginal = boton.dataset.textoOriginal || 'Guardar';
    boton.textContent = textoOriginal;
}

/**
 * Actualiza el contador de resultados
 *
 * @param {string} idContador - ID del elemento contador
 * @param {number} cantidad - Cantidad de resultados
 * @param {string} singular - Texto en singular (ej: "producto")
 * @param {string} plural - Texto en plural (ej: "productos")
 */
function actualizarContador(idContador, cantidad, singular, plural) {
    const contador = document.getElementById(idContador);
    if (contador) {
        const texto = cantidad === 1 ? singular : plural;
        contador.textContent = `Mostrando ${cantidad} ${texto}`;
    }
}

/**
 * Crea badge de estado (Activo/Inactivo)
 *
 * @param {boolean} activo - Si está activo
 * @returns {string} HTML del badge
 */
function crearBadgeEstado(activo) {
    return `
        <span class="badge ${activo ? 'badge-success' : 'badge-danger'}">
            ${activo ? '✓ Activo' : '✗ Inactivo'}
        </span>
    `;
}

/**
 * Limpia un formulario
 *
 * @param {string} idFormulario - ID del formulario
 */
function limpiarFormulario(idFormulario) {
    const form = document.getElementById(idFormulario);
    if (form) {
        form.reset();
    }
}

/**
 * Muestra el spinner de carga global (centro de pantalla)
 *
 * @param {string} mensaje - Mensaje opcional a mostrar
 *
 * @example
 * mostrarSpinnerGlobal('Eliminando cliente...');
 */
function mostrarSpinnerGlobal(mensaje = 'Cargando...') {
    const spinner = document.getElementById('spinner-carga');
    if (spinner) {
        // Actualizar mensaje si hay un párrafo dentro
        const p = spinner.querySelector('p');
        if (p) {
            p.textContent = mensaje;
        }
        spinner.style.display = 'flex';
    }
}

/**
 * Oculta el spinner de carga global
 *
 * @example
 * ocultarSpinnerGlobal();
 */
function ocultarSpinnerGlobal() {
    const spinner = document.getElementById('spinner-carga');
    if (spinner) {
        spinner.style.display = 'none';
    }
}
