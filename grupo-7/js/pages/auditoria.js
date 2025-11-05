// ============================================
// PÁGINA - AUDITORÍA (SIMPLIFICADO)
// ============================================

/**
 * Este archivo gestiona la página de auditoría
 *
 * Responsabilidades:
 * 1. Cargar historial de operaciones
 * 2. Filtrar por grupo, tabla, operación
 * 3. Mostrar detalles de cambios
 *
 * NOTA: Esta página es principalmente de visualización
 * No requiere retos complejos para los estudiantes
 */

// ============================================
// VARIABLES GLOBALES
// ============================================

let historialCompleto = [];
let historialFiltrado = [];

// ============================================
// 1. INICIALIZACIÓN
// ============================================

window.addEventListener('DOMContentLoaded', async () => {
    console.log('📊 Inicializando página de auditoría...');

    renderizarNavbar();
    await cargarHistorial();
    configurarEventos();
});

function configurarEventos() {
    // Filtros
    const btnFiltrar = document.getElementById('btn-filtrar');
    const btnLimpiar = document.getElementById('btn-limpiar-filtros');

    if (btnFiltrar) btnFiltrar.addEventListener('click', filtrarHistorial);
    if (btnLimpiar) btnLimpiar.addEventListener('click', limpiarFiltros);
}

// ============================================
// 2. CARGAR DATOS
// ============================================

async function cargarHistorial() {
    try {
        mostrarSpinner('tbody-auditoria', 6);

        historialCompleto = await obtenerHistorialAuditoria();
        historialFiltrado = historialCompleto;

        console.log(`✅ ${historialCompleto.length} registros de auditoría cargados`);

        renderizarTablaAuditoria(historialFiltrado);
        actualizarEstadisticas();

    } catch (error) {
        console.error('❌ Error al cargar historial:', error);
        mostrarTablaVacia('tbody-auditoria', '❌ Error al cargar historial', 6);
    }
}

// ============================================
// 3. FILTROS
// ============================================

function filtrarHistorial() {
    const grupo = document.getElementById('filtro-grupo')?.value || '';
    const tabla = document.getElementById('filtro-tabla')?.value || 'todos';
    const operacion = document.getElementById('filtro-operacion')?.value || 'todos';

    historialFiltrado = historialCompleto.filter(registro => {
        const cumpleGrupo = !grupo || registro.grupo_estudiantes?.toLowerCase().includes(grupo.toLowerCase());
        const cumpleTabla = tabla === 'todos' || registro.nombre_tabla === tabla;
        const cumpleOperacion = operacion === 'todos' || registro.operacion === operacion;

        return cumpleGrupo && cumpleTabla && cumpleOperacion;
    });

    renderizarTablaAuditoria(historialFiltrado);
}

function limpiarFiltros() {
    document.getElementById('filtro-grupo').value = '';
    document.getElementById('filtro-tabla').value = 'todos';
    document.getElementById('filtro-operacion').value = 'todos';

    historialFiltrado = historialCompleto;
    renderizarTablaAuditoria(historialFiltrado);
}

// ============================================
// 4. RENDERIZADO
// ============================================

function renderizarTablaAuditoria(registros) {
    const tbody = document.getElementById('tbody-auditoria');

    actualizarContador('contador-resultados', registros.length, 'registro', 'registros');

    if (registros.length === 0) {
        mostrarTablaVacia('tbody-auditoria', 'No se encontraron registros', 6);
        return;
    }

    tbody.innerHTML = registros.map(registro => {
        const colorOperacion =
            registro.operacion === 'CREATE' ? 'var(--verde)' :
            registro.operacion === 'UPDATE' ? 'var(--azul)' :
            'var(--rojo)';

        return `
            <tr>
                <td>${formatearFecha(registro.fecha_operacion)}</td>
                <td>${registro.grupo_estudiantes}</td>
                <td>${registro.nombre_tabla}</td>
                <td>
                    <span style="color: ${colorOperacion}; font-weight: bold;">
                        ${registro.operacion}
                    </span>
                </td>
                <td>${registro.registro_id}</td>
                <td>
                    <button class="btn btn-small btn-primary"
                            onclick="verDetalles(${registro.id})">
                        👁️ Ver
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// ============================================
// 5. DETALLES
// ============================================

async function verDetalles(id) {
    const registro = historialCompleto.find(r => r.id === id);

    if (!registro) {
        mostrarAlerta('Error', 'No se encontró el registro', 'error');
        return;
    }

    const contenido = `
        <div style="display: grid; gap: 1rem;">
            <div>
                <strong>Operación:</strong> ${registro.operacion}<br>
                <strong>Fecha:</strong> ${formatearFecha(registro.fecha_operacion)}<br>
                <strong>Grupo:</strong> ${registro.grupo_estudiantes}<br>
                <strong>Tabla:</strong> ${registro.nombre_tabla}<br>
                <strong>ID Registro:</strong> ${registro.registro_id}
            </div>

            ${registro.operacion !== 'CREATE' ? `
                <div>
                    <h4>Datos Anteriores:</h4>
                    <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;">
${JSON.stringify(registro.datos_anteriores, null, 2)}</pre>
                </div>
            ` : ''}

            <div>
                <h4>Datos ${registro.operacion === 'DELETE' ? 'Eliminados' : 'Nuevos'}:</h4>
                <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;">
${JSON.stringify(registro.datos_nuevos, null, 2)}</pre>
            </div>
        </div>
    `;

    const modal = crearModal('Detalles de Auditoría', contenido);
    modal.abrir();
}

// ============================================
// 6. ESTADÍSTICAS
// ============================================

function actualizarEstadisticas() {
    const totalOps = historialCompleto.length;
    const creates = historialCompleto.filter(r => r.operacion === 'CREATE').length;
    const updates = historialCompleto.filter(r => r.operacion === 'UPDATE').length;
    const deletes = historialCompleto.filter(r => r.operacion === 'DELETE').length;

    const elemTotal = document.getElementById('total-operaciones');
    const elemCreates = document.getElementById('total-creates');
    const elemUpdates = document.getElementById('total-updates');
    const elemDeletes = document.getElementById('total-deletes');

    if (elemTotal) elemTotal.textContent = totalOps;
    if (elemCreates) elemCreates.textContent = creates;
    if (elemUpdates) elemUpdates.textContent = updates;
    if (elemDeletes) elemDeletes.textContent = deletes;
}
