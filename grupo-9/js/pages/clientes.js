// ============================================
// PÁGINA - CLIENTES (SIMPLIFICADO)
// ============================================

/**
 * Este archivo gestiona la página de clientes
 *
 * Responsabilidades:
 * 1. Cargar clientes desde la API
 * 2. Mostrar clientes en tabla
 * 3. Búsqueda y filtros
 * 4. Crear/Editar/Eliminar clientes
 */

// ============================================
// VARIABLES GLOBALES
// ============================================

let clientesGlobales = [];
let clientesFiltrados = [];
let clienteEnEdicion = null;

// ============================================
// 1. INICIALIZACIÓN
// ============================================

window.addEventListener('DOMContentLoaded', async () => {
    console.log('👥 Inicializando página de clientes...');

    renderizarNavbar();
    await cargarClientes();
    configurarEventos();
});

// Alias solicitado desde el HTML (botón "Nuevo Cliente")
function abrirModalNuevoCliente() {
    abrirModalCrear();
}

function configurarEventos() {
    // Búsqueda
    const inputBusqueda = document.getElementById('buscar-cliente');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', filtrarClientes);
    }

    // Filtros
    const selectCiudad = document.getElementById('filtro-ciudad');
    const selectEstado = document.getElementById('filtro-estado');

    if (selectCiudad) selectCiudad.addEventListener('change', filtrarClientes);
    if (selectEstado) selectEstado.addEventListener('change', filtrarClientes);

    // Botón crear
    const btnCrear = document.getElementById('btn-crear-cliente');
    if (btnCrear) {
        btnCrear.addEventListener('click', abrirModalCrear);
    }
}

// ============================================
// 2. CARGAR DATOS
// ============================================

async function cargarClientes() {
    try {
        // Mostrar spinner global (overlay) y spinner en la tabla
        mostrarSpinnerGlobal(true);
        mostrarSpinner('tbody-clientes', 8);

        clientesGlobales = await obtenerTodosLosClientes();

        console.log(`✅ ${clientesGlobales.length} clientes cargados`);

        actualizarEstadisticas();
        filtrarClientes();

    } catch (error) {
        console.error('❌ Error al cargar clientes:', error);
        mostrarTablaVacia('tbody-clientes', '❌ Error al cargar clientes. Verifica el backend.', 8);
    }
    finally {
        // Asegurar ocultar el spinner global en cualquier caso
        try { ocultarSpinnerGlobal(); } catch (e) { /* noop */ }
    }
}

// ============================================
// 3. BÚSQUEDA Y FILTROS
// ============================================

function filtrarClientes() {
    const termino = document.getElementById('buscar-cliente')?.value.toLowerCase() || '';
    const ciudadFiltro = document.getElementById('filtro-ciudad')?.value || 'todos';
    const estadoFiltro = document.getElementById('filtro-estado')?.value || 'todos';

    clientesFiltrados = clientesGlobales.filter(cliente => {
        // Búsqueda por nombre o email
        const cumpleBusqueda = !termino ||
            cliente.nombre?.toLowerCase().includes(termino) ||
            cliente.email?.toLowerCase().includes(termino);

        // Filtro ciudad
        const cumpleCiudad = ciudadFiltro === 'todos' || cliente.ciudad === ciudadFiltro;

        // Filtro estado
        const cumpleEstado = estadoFiltro === 'todos' ||
            (estadoFiltro === 'activos' && cliente.activo) ||
            (estadoFiltro === 'inactivos' && !cliente.activo);

        return cumpleBusqueda && cumpleCiudad && cumpleEstado;
    });

    renderizarTablaClientes(clientesFiltrados);
}

// ============================================
// 4. RENDERIZADO
// ============================================

function renderizarTablaClientes(clientes) {
    const tbody = document.getElementById('tbody-clientes');

    actualizarContador('contador-resultados', clientes.length, 'cliente', 'clientes');

    if (clientes.length === 0) {
        mostrarTablaVacia('tbody-clientes', 'No se encontraron clientes', 8);
        return;
    }

    tbody.innerHTML = clientes.map(cliente => `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.email}</td>
            <td>${formatearTelefono(cliente.telefono)}</td>
            <td>${cliente.documento}</td>
            <td>${cliente.ciudad}</td>
            <td>${crearBadgeEstado(cliente.activo)}</td>
            <td>
                <button class="btn btn-small btn-primary" onclick="abrirModalEditar(${cliente.id})">
                    ✏️ Editar
                </button>
                <button class="btn btn-small btn-danger" onclick="confirmarEliminarCliente(${cliente.id})">
                    🗑️ Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

// ============================================
// 5. ESTADÍSTICAS
// ============================================

function actualizarEstadisticas() {
    const total = clientesGlobales.length;
    const activos = clientesGlobales.filter(c => c.activo).length;

    const elemTotal = document.getElementById('total-clientes');
    const elemActivos = document.getElementById('clientes-activos');

    if (elemTotal) elemTotal.textContent = total;
    if (elemActivos) elemActivos.textContent = activos;
}

// ============================================
// 6. MODAL CREAR
// ============================================

function abrirModalCrear() {
    clienteEnEdicion = null;

    const modal = crearModalFormulario(
        'Crear Cliente',
        crearFormularioCliente(),
        guardarCliente
    );

    modal.abrir();
}

// ============================================
// 🎯 RETO 5: CONTADOR DE CARACTERES EN NOMBRE (⭐⭐ Medio - 30 min)
// ============================================

/**
 * Crea el formulario de cliente
 *
 * OBJETIVO DEL RETO 5:
 * Agregar un contador que muestre cuántos caracteres lleva escritos
 * el usuario en el campo "Nombre" (máximo 100 caracteres).
 *
 * INSTRUCCIONES:
 * 1. Busca el campo de nombre en el formulario (más abajo)
 * 2. Agrega un <span> con id="contador-nombre" después del input
 * 3. Agrega el evento oninput al input de nombre
 * 4. En el evento, actualiza el contador con la cantidad de caracteres
 *
 * CÓDIGO A AGREGAR:
 *
 * En el HTML del input nombre:
 * <input type="text" id="nombre" class="form-control"
 *        maxlength="100"
 *        oninput="actualizarContadorNombre(this)">
 * <span id="contador-nombre" style="font-size: 0.9rem; color: var(--texto-secundario);">
 *     0/100 caracteres
 * </span>
 *
 * Función para actualizar (agregar FUERA del return):
 * function actualizarContadorNombre(input) {
 *     const contador = document.getElementById('contador-nombre');
 *     const longitud = input.value.length;
 *     contador.textContent = `${longitud}/100 caracteres`;
 *     contador.style.color = longitud > 80 ? 'var(--rojo)' : 'var(--texto-secundario)';
 * }
 *
 * PISTAS:
 * 💡 PISTA 1: El atributo maxlength="100" limita los caracteres
 * 💡 PISTA 2: El evento oninput se ejecuta cada vez que escribes
 * 💡 PISTA 3: input.value.length da la cantidad de caracteres
 * 💡 PISTA 4: Usa operador ternario para cambiar el color si pasa de 80
 *
 * CRITERIOS DE ACEPTACIÓN:
 * ✅ Muestra "0/100 caracteres" al abrir el modal
 * ✅ Se actualiza en tiempo real mientras escribes
 * ✅ Cambia a color rojo si pasa de 80 caracteres
 * ✅ No permite escribir más de 100 caracteres
 */



function crearFormularioCliente(cliente = null) {
    return `
        <div class="form-group">
            <label for="nombre">Nombre Completo *</label>
            <input type="text" id="nombre" class="form-control"
                   value="${cliente?.nombre || ''}" required>
            <!-- TODO: RETO 5 - Agregar contador de caracteres aquí -->
            En el HTML del input nombre:
 <input type="text" id="nombre" class="form-control"
         maxlength="100"
        oninput="actualizarContadorNombre(this)">
  <span id="contador-nombre" style="font-size: 0.9rem; color: var(--texto-secundario);">
     0/100 caracteres
  </span>
        </div>

        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" class="form-control"
                   value="${cliente?.email || ''}" required>
            <small>Debe ser único en el sistema</small>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="telefono">Teléfono *</label>
                <input type="tel" id="telefono" class="form-control"
                       value="${cliente?.telefono || ''}" required
                       placeholder="3001234567">
            </div>

            <div class="form-group">
                <label for="documento">Documento *</label>
                <input type="text" id="documento" class="form-control"
                       value="${cliente?.documento || ''}" required
                       placeholder="1234567890">
            </div>
        </div>

        <div class="form-group">
            <label for="ciudad">Ciudad *</label>
            <select id="ciudad" class="form-control" required>
                <option value="">Selecciona...</option>
                ${CONFIG.CIUDADES.map(ciudad => `
                    <option value="${ciudad}" ${cliente?.ciudad === ciudad ? 'selected' : ''}>
                        ${ciudad}
                    </option>
                `).join('')}
            </select>
        </div>

        <div class="form-group">
            <label for="direccion">Dirección</label>
            <input type="text" id="direccion" class="form-control"
                   value="${cliente?.direccion || ''}">
        </div>
    `;
}

// TODO: RETO 5 - Agregar función actualizarContadorNombre() aquí
function actualizarContadorNombre(input) {
     const contador = document.getElementById('contador-nombre');
     const longitud = input.value.length;
     contador.textContent = `${longitud}/100 caracteres`;
     contador.style.color = longitud > 80 ? 'var(--rojo)' : 'var(--texto-secundario)';
  }
 
// ============================================
// 7. MODAL EDITAR
// ============================================

async function abrirModalEditar(id) {
    try {
        const cliente = await obtenerClientePorId(id);
        clienteEnEdicion = cliente;

        const modal = crearModalFormulario(
            'Editar Cliente',
            crearFormularioCliente(cliente),
            guardarCliente
        );

        modal.abrir();

    } catch (error) {
        mostrarAlerta('Error', 'No se pudo cargar el cliente', 'error');
    }
}

// ============================================
// 8. GUARDAR
// ============================================

async function guardarCliente() {
    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        documento: document.getElementById('documento').value,
        ciudad: document.getElementById('ciudad').value,
        direccion: document.getElementById('direccion').value,
        activo: true
    };

    // Validar
    const errores = validarDatosCliente(datos);
    if (errores.length > 0) {
        mostrarAlerta('Error de validación', errores.join('\n'), 'error');
        return false;
    }

    try {
        if (clienteEnEdicion) {
            await actualizarCliente(clienteEnEdicion.id, datos);
            mostrarAlerta('Éxito', 'Cliente actualizado correctamente', 'success');
        } else {
            await crearNuevoCliente(datos);
            mostrarAlerta('Éxito', 'Cliente creado correctamente', 'success');
        }

        await cargarClientes();
        return true;

    } catch (error) {
        mostrarAlerta('Error', error.message, 'error');
        return false;
    }
}

// Wrappers que conectan la página con el servicio de API
async function crearNuevoCliente(datos) {
    return crearCliente(datos);
}

async function actualizarCliente(id, datos) {
    return actualizarClienteCompleto(id, datos);
}

// ============================================
// 9. ELIMINAR
// ============================================

async function confirmarEliminarCliente(id) {
    try {
        const cliente = await obtenerClientePorId(id);

        const confirmado = await mostrarConfirmacion(
            '¿Eliminar cliente?',
            `¿Estás seguro de eliminar al cliente "${cliente.nombre}"?`
        );

        if (confirmado) {
            // Mostrar spinner mientras se elimina
            mostrarSpinnerGlobal('Eliminando cliente...');

            await eliminarCliente(id);

            // Ocultar spinner
            ocultarSpinnerGlobal();

            mostrarAlerta('Éxito', 'Cliente eliminado correctamente', 'success');
            await cargarClientes();
        }

    } catch (error) {
        // Asegurarse de ocultar el spinner en caso de error
        ocultarSpinnerGlobal();

        mostrarAlerta('Error', 'No se pudo eliminar el cliente', 'error');
    }
}
