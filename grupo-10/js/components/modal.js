// ============================================
// COMPONENTE - SISTEMA DE MODALES
// ============================================

/**
 * Este componente maneja la creación y control de ventanas modales
 * (popups) para formularios y confirmaciones.
 *
 * ¿Qué es un modal?
 * - Ventana flotante que se muestra sobre el contenido principal
 * - Bloquea la interacción con el fondo hasta que se cierre
 * - Útil para formularios, confirmaciones, alertas
 *
 * En frameworks modernos, librerías como Bootstrap o Material-UI
 * proveen modales. Aquí lo hacemos desde cero para aprender.
 */

/**
 * Clase Modal para crear y manejar ventanas modales
 */
class Modal {
    constructor(id, titulo, contenido, botones = []) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.botones = botones;
        this.elemento = null;
    }

    /**
     * Crea el HTML del modal
     *
     * @returns {string} - HTML del modal
     */
    crearHTML() {
        const botonesHTML = this.botones.map(boton => `
            <button
                class="btn btn-${boton.tipo || 'primary'}"
                data-accion="${boton.accion || 'cerrar'}"
            >
                ${boton.texto}
            </button>
        `).join('');

        return `
            <div class="modal-overlay" id="modal-${this.id}">
                <div class="modal-contenido">
                    <!-- Encabezado -->
                    <div class="modal-header">
                        <h2>${this.titulo}</h2>
                        <button class="modal-cerrar" data-accion="cerrar">&times;</button>
                    </div>

                    <!-- Cuerpo -->
                    <div class="modal-body">
                        ${this.contenido}
                    </div>

                    <!-- Footer con botones -->
                    <div class="modal-footer">
                        ${botonesHTML}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza el modal en el DOM
     */
    renderizar() {
        // Crear elemento temporal
        const temp = document.createElement('div');
        temp.innerHTML = this.crearHTML();
        this.elemento = temp.firstElementChild;

        // Agregar al body
        document.body.appendChild(this.elemento);

        // Configurar eventos
        this.configurarEventos();
    }

    /**
     * Configura los eventos de clic en botones
     */
    configurarEventos() {
        // Cerrar al hacer clic en el overlay (fondo oscuro)
        this.elemento.addEventListener('click', (e) => {
            if (e.target === this.elemento) {
                this.cerrar();
            }
        });

        // Manejar clics en botones
        this.elemento.querySelectorAll('[data-accion]').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const accion = e.target.dataset.accion;

                if (accion === 'cerrar') {
                    this.cerrar();
                } else if (this.onAccion) {
                    this.onAccion(accion, e);
                }
            });
        });

        // Cerrar con tecla Escape
        this.escapeListener = (e) => {
            if (e.key === 'Escape') {
                this.cerrar();
            }
        };
        document.addEventListener('keydown', this.escapeListener);
    }

    /**
     * Muestra el modal
     */
    abrir() {
        if (!this.elemento) {
            this.renderizar();
        }

        // Añadir clase para animación
        setTimeout(() => {
            this.elemento.classList.add('modal-abierto');
        }, 10);

        // Bloquear scroll del body
        document.body.style.overflow = 'hidden';
    }

    /**
     * Cierra y destruye el modal
     */
    cerrar() {
        this.elemento.classList.remove('modal-abierto');

        // Esperar animación antes de eliminar
        setTimeout(() => {
            if (this.elemento && this.elemento.parentNode) {
                this.elemento.parentNode.removeChild(this.elemento);
            }
            this.elemento = null;

            // Restaurar scroll
            document.body.style.overflow = '';

            // Remover listener de Escape
            if (this.escapeListener) {
                document.removeEventListener('keydown', this.escapeListener);
            }
        }, 300);
    }

    /**
     * Define el manejador de acciones
     *
     * @param {Function} callback - Función a ejecutar al hacer clic en botones
     */
    onAction(callback) {
        this.onAccion = callback;
    }
}

// ============================================
// FUNCIONES AUXILIARES PARA MODALES COMUNES
// ============================================

/**
 * Muestra un modal de confirmación simple
 *
 * @param {string} titulo - Título del modal
 * @param {string} mensaje - Mensaje a mostrar
 * @returns {Promise<boolean>} - Promesa que resuelve true si confirma, false si cancela
 *
 * Ejemplo de uso con async/await:
 * const confirmado = await mostrarConfirmacion(
 *     'Eliminar producto',
 *     '¿Estás seguro?'
 * );
 * if (confirmado) {
 *     // Usuario confirmó
 * }
 */
function mostrarConfirmacion(titulo, mensaje) {
    return new Promise((resolve) => {
        const modal = new Modal(
            'confirmacion',
            titulo,
            `<p>${mensaje}</p>`,
            [
                { texto: 'Cancelar', tipo: 'secondary', accion: 'cerrar' },
                { texto: 'Confirmar', tipo: 'danger', accion: 'confirmar' }
            ]
        );

        let resuelto = false; // Flag para evitar múltiples resoluciones

        modal.onAction((accion) => {
            if (!resuelto) {
                resuelto = true;
                const confirmado = accion === 'confirmar';
                resolve(confirmado);
                modal.cerrar();
            }
        });

        // Interceptar el cierre del modal (X o ESC)
        const originalCerrar = modal.cerrar.bind(modal);
        modal.cerrar = function() {
            if (!resuelto) {
                resuelto = true;
                resolve(false);
            }
            originalCerrar();
        };

        modal.abrir();
    });
}

/**
 * Muestra un modal de alerta informativa
 *
 * @param {string} titulo - Título del modal
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - 'success', 'error', 'warning', 'info'
 *
 * Ejemplo de uso:
 * mostrarAlerta('Éxito', 'Producto creado correctamente', 'success');
 */
function mostrarAlerta(titulo, mensaje, tipo = 'info') {
    const iconos = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    const modal = new Modal(
        'alerta',
        `${iconos[tipo]} ${titulo}`,
        `<p class="alerta-${tipo}">${mensaje}</p>`,
        [
            { texto: 'Aceptar', tipo: 'primary', accion: 'cerrar' }
        ]
    );

    modal.abrir();
}

/**
 * Muestra un modal con spinner de carga
 *
 * @param {string} mensaje - Mensaje de carga
 * @returns {Modal} - Instancia del modal para poder cerrarlo después
 *
 * Ejemplo de uso:
 * const modalCarga = mostrarCargando('Guardando producto...');
 * // ... realizar operación ...
 * modalCarga.cerrar();
 */
function mostrarCargando(mensaje = 'Cargando...') {
    const modal = new Modal(
        'cargando',
        '',
        `
            <div class="spinner-container">
                <div class="spinner"></div>
                <p>${mensaje}</p>
            </div>
        `,
        [] // Sin botones
    );

    modal.abrir();
    return modal;
}

// ============================================
// LOGGING PARA DESARROLLO
// ============================================

console.log('✅ Componente Modal cargado');
