// ============================================
// PÁGINA - AUDITORÍA (SIMPLIFICADO)
// ============================================

/**
 * Este archivo gestiona la página de auditoría
 *
 * Responsabilidades:
 * 1. Cargar historial de operaciones
 * 2. Filtrar por grupo, tabla, operación y fechas
 * 3. Mostrar detalles de cambios
 */

const COLUMNAS_AUDITORIA = 8;
const GRUPOS_PREDEFINIDOS = Array.from({ length: 13 }, (_, index) => `GRUPO_${index + 1}`);
const COLORES_OPERACION = {
    CREATE: 'var(--color-exito, #1abc9c)',
    UPDATE: 'var(--color-advertencia, #f1c40f)',
    DELETE: 'var(--color-peligro, #e74c3c)'
};

let historialCompleto = [];
let historialFiltrado = [];

// ============================================
// 1. INICIALIZACIÓN
// ============================================

window.addEventListener('DOMContentLoaded', async () => {
    console.log('📊 Inicializando página de auditoría...');

    renderizarNavbar();
    await cargarHistorial();
});

// ============================================
// 2. CARGAR DATOS
// ============================================

async function cargarHistorial() {
    try {
        mostrarSpinner('tbody-auditoria', COLUMNAS_AUDITORIA);

        const registrosCrudos = await obtenerTodoHistorial();
        historialCompleto = registrosCrudos.map(normalizarRegistroAuditoria);
        historialFiltrado = [...historialCompleto];

        poblarFiltroGrupos(historialCompleto);
        renderizarTablaAuditoria(historialFiltrado);
        actualizarEstadisticas(historialFiltrado);

        console.log(`✅ ${historialCompleto.length} registros de auditoría cargados`);
    } catch (error) {
        console.error('❌ Error al cargar historial:', error);
        mostrarTablaVacia('tbody-auditoria', '❌ Error al cargar historial', COLUMNAS_AUDITORIA);
    }
}

function normalizarRegistroAuditoria(registroCrudo) {
    const fechaISO = registroCrudo?.fecha_operacion ?? null;
    const fechaObj = fechaISO ? new Date(fechaISO) : null;

    return {
        id: registroCrudo?.id ?? null,
        tabla_afectada: registroCrudo?.tabla_afectada ?? '',
        id_registro: registroCrudo?.id_registro ?? null,
        operacion: (registroCrudo?.operacion ?? '').toUpperCase(),
        grupo_responsable: registroCrudo?.grupo_responsable ?? 'SIN_GRUPO',
        datos_anteriores: parseJSONSeguro(registroCrudo?.datos_anteriores),
        datos_nuevos: parseJSONSeguro(registroCrudo?.datos_nuevos),
        fecha_operacion: fechaISO,
        fecha_objeto: fechaObj,
        observaciones: registroCrudo?.observaciones ?? ''
    };
}

function parseJSONSeguro(valor) {
    if (valor === null || valor === undefined) {
        return null;
    }

    if (typeof valor === 'object') {
        return valor;
    }

    if (typeof valor === 'string') {
        const texto = valor.trim();
        if (texto === '' || texto.toLowerCase() === 'null') {
            return null;
        }
        try {
            return JSON.parse(texto);
        } catch (error) {
            console.warn('⚠️ No se pudo parsear JSON de auditoría:', texto);
            return texto;
        }
    }

    return valor;
}

function poblarFiltroGrupos(registros) {
    const select = document.getElementById('filtro-grupo');
    if (!select) {
        return;
    }

    const gruposDesdeHistorial = registros
        .map(registro => registro.grupo_responsable)
        .filter(grupo => Boolean(grupo) && grupo !== 'SIN_GRUPO');

    const grupos = new Set([...GRUPOS_PREDEFINIDOS, ...gruposDesdeHistorial]);

    const opcionesOrdenadas = Array.from(grupos).sort((a, b) => {
        const numeroA = extraerNumeroGrupo(a);
        const numeroB = extraerNumeroGrupo(b);

        if (numeroA !== null && numeroB !== null) {
            return numeroA - numeroB;
        }
        if (numeroA !== null) return -1;
        if (numeroB !== null) return 1;
        return a.localeCompare(b);
    });

    const valorSeleccionado = select.value;

    select.innerHTML = [
        '<option value="">Todos los grupos</option>',
        ...opcionesOrdenadas.map(grupo => `<option value="${grupo}">${grupo}</option>`)
    ].join('');

    if (valorSeleccionado && opcionesOrdenadas.includes(valorSeleccionado)) {
        select.value = valorSeleccionado;
    }
}

function extraerNumeroGrupo(nombreGrupo) {
    const coincidencia = /GRUPO_(\d+)/i.exec(nombreGrupo);
    return coincidencia ? parseInt(coincidencia[1], 10) : null;
}

// ============================================
// 3. FILTROS
// ============================================

function filtrarHistorial() {
    const grupo = document.getElementById('filtro-grupo')?.value || '';
    const tabla = document.getElementById('filtro-tabla')?.value || '';
    const operacion = document.getElementById('filtro-operacion')?.value || '';
    const fechaDesdeStr = document.getElementById('filtro-fecha-desde')?.value || '';
    const fechaHastaStr = document.getElementById('filtro-fecha-hasta')?.value || '';

    const fechaDesde = fechaDesdeStr ? new Date(`${fechaDesdeStr}T00:00:00`) : null;
    const fechaHasta = fechaHastaStr ? new Date(`${fechaHastaStr}T23:59:59`) : null;

    historialFiltrado = historialCompleto.filter(registro => {
        const nombreTabla = (registro.tabla_afectada || '').toLowerCase();
        const tipoOperacion = registro.operacion || '';
        const grupoResponsable = registro.grupo_responsable || '';
        const fechaRegistro = registro.fecha_objeto;

        const coincideGrupo = !grupo || grupoResponsable === grupo;
        const coincideTabla = !tabla || nombreTabla === tabla.toLowerCase();
        const coincideOperacion = !operacion || tipoOperacion === operacion;
        const coincideDesde = !fechaDesde || (fechaRegistro && fechaRegistro >= fechaDesde);
        const coincideHasta = !fechaHasta || (fechaRegistro && fechaRegistro <= fechaHasta);

        return coincideGrupo && coincideTabla && coincideOperacion && coincideDesde && coincideHasta;
    });

    renderizarTablaAuditoria(historialFiltrado);
    actualizarEstadisticas(historialFiltrado);
}

function filtrarAuditoria() {
    filtrarHistorial();
}

function limpiarFiltros() {
    const filtros = [
        'filtro-grupo',
        'filtro-tabla',
        'filtro-operacion',
        'filtro-fecha-desde',
        'filtro-fecha-hasta'
    ];

    filtros.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.value = '';
        }
    });

    historialFiltrado = [...historialCompleto];
    renderizarTablaAuditoria(historialFiltrado);
    actualizarEstadisticas(historialFiltrado);
}

// ============================================
// 4. RENDERIZADO
// ============================================

function renderizarTablaAuditoria(registros) {
    const tbody = document.getElementById('tbody-auditoria');
    if (!tbody) {
        return;
    }

    actualizarContador('contador-resultados', registros.length, 'registro', 'registros');

    if (registros.length === 0) {
        mostrarTablaVacia('tbody-auditoria', 'No se encontraron registros', COLUMNAS_AUDITORIA);
        return;
    }

    tbody.innerHTML = registros.map(registro => {
        const colorOperacion = obtenerColorOperacion(registro.operacion);
        const nombreTabla = typeof capitalizar === 'function'
            ? capitalizar(registro.tabla_afectada)
            : registro.tabla_afectada;

        return `
            <tr>
                <td>${registro.id ?? '-'}</td>
                <td>${formatearFecha(registro.fecha_operacion)}</td>
                <td>${registro.grupo_responsable}</td>
                <td>${nombreTabla || '-'}</td>
                <td>
                    <span class="badge" style="background-color: ${colorOperacion}; color: #fff; font-weight: bold;">
                        ${registro.operacion || '-'}
                    </span>
                </td>
                <td>${registro.id_registro ?? '-'}</td>
                <td>${crearBotonDatos(registro.id, 'anteriores', registro.datos_anteriores)}</td>
                <td>${crearBotonDatos(registro.id, 'nuevos', registro.datos_nuevos)}</td>
            </tr>
        `;
    }).join('');
}

function crearBotonDatos(id, tipo, datosDisponibles) {
    if (!datosDisponibles) {
        return '<span style="color: var(--texto-secundario, #777);">-</span>';
    }

    return `
        <button class="btn btn-small btn-secondary" onclick="verDatosAuditoria(${id}, '${tipo}')">
            Ver
        </button>
    `;
}

// ============================================
// 5. DETALLES
// ============================================

function verDatosAuditoria(id, tipo) {
    const registro = historialCompleto.find(item => item.id === id);

    if (!registro) {
        mostrarAlerta('Error', 'No se encontró el registro de auditoría', 'error');
        return;
    }

    const esAnterior = tipo === 'anteriores';
    const datos = esAnterior ? registro.datos_anteriores : registro.datos_nuevos;

    if (!datos) {
        const mensaje = esAnterior
            ? 'Este registro no tiene datos anteriores.'
            : 'Este registro no tiene datos nuevos.';
        mostrarAlerta('Sin datos', mensaje, 'info');
        return;
    }

    const nombreTabla = typeof capitalizar === 'function'
        ? capitalizar(registro.tabla_afectada)
        : registro.tabla_afectada;

    const contenidoDatos = typeof datos === 'string'
        ? datos
        : JSON.stringify(datos, null, 2);

    const contenido = `
        <div style="display: grid; gap: 1rem;">
            <div>
                <strong>Grupo:</strong> ${registro.grupo_responsable}<br>
                <strong>Tabla:</strong> ${nombreTabla || '-'}<br>
                <strong>Operación:</strong> ${registro.operacion}<br>
                <strong>ID registro:</strong> ${registro.id_registro ?? '-'}<br>
                <strong>Fecha:</strong> ${formatearFecha(registro.fecha_operacion)}
            </div>
            <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;">${contenidoDatos}</pre>
            ${registro.observaciones ? `<div><strong>Observaciones:</strong><br>${registro.observaciones}</div>` : ''}
        </div>
    `;

    const titulo = esAnterior ? 'Datos anteriores' : 'Datos nuevos';
    const modal = crearModal(titulo, contenido);
    modal.abrir();
}

// ============================================
// 6. ESTADÍSTICAS
// ============================================

function actualizarEstadisticas(registros = historialFiltrado) {
    const totales = registros.reduce((acumulador, registro) => {
        const tipo = registro.operacion;
        if (acumulador[tipo] !== undefined) {
            acumulador[tipo] += 1;
        }
        return acumulador;
    }, { CREATE: 0, UPDATE: 0, DELETE: 0 });

    const totalOps = registros.length;

    const elemTotal = document.getElementById('stat-total-operaciones');
    const elemCreates = document.getElementById('stat-inserciones');
    const elemUpdates = document.getElementById('stat-actualizaciones');
    const elemDeletes = document.getElementById('stat-eliminaciones');

    if (elemTotal) elemTotal.textContent = totalOps;
    if (elemCreates) elemCreates.textContent = totales.CREATE;
    if (elemUpdates) elemUpdates.textContent = totales.UPDATE;
    if (elemDeletes) elemDeletes.textContent = totales.DELETE;
}

function obtenerColorOperacion(operacion) {
    return COLORES_OPERACION[operacion] || 'var(--color-primario, #4a6cf7)';
}
