// ============================================
// COMPONENTE - BARRA DE NAVEGACIÓN
// ============================================

/**
 * Este componente crea la barra de navegación que se muestra en todas las páginas.
 *
 * ¿Qué es un componente?
 * - Pieza reutilizable de código que se puede usar en múltiples páginas
 * - En frameworks como React, esto sería un componente .jsx
 * - Aquí lo hacemos con JavaScript vanilla
 *
 * Ventajas de componentes:
 * - No repetir código (DRY: Don't Repeat Yourself)
 * - Cambios en un solo lugar se reflejan en todas las páginas
 * - Más fácil de mantener
 */

/**
 * Crea la estructura HTML de la barra de navegación
 *
 * @returns {string} - HTML de la navbar
 */
function crearNavbar() {
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';

  // Detectar si estamos en la carpeta pages o en la raíz
  const enCarpetaPages = window.location.pathname.includes('/pages/');
  const rutaPaginas = enCarpetaPages ? '' : 'pages/';
  const rutaRaiz = enCarpetaPages ? '../' : '';

  return `
        <nav class="navbar">
            <div class="navbar-container">
                <!-- Logo y título -->
                <div class="navbar-brand">
                    <a href="${rutaRaiz}index.html">
                        🛒 <span>Tienda Virtual</span>
                    </a>
                </div>

                <!-- Enlaces de navegación -->
                <ul class="navbar-menu">
                    <li>
                        <a href="${rutaRaiz}index.html" class="${paginaActual === 'index.html' ? 'active' : ''}">
                            🏠 Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="${rutaPaginas}productos.html" class="${
    paginaActual === 'productos.html' ? 'active' : ''
  }">
                            📦 Productos
                        </a>
                    </li>
                    <li>
                        <a href="${rutaPaginas}clientes.html" class="${
    paginaActual === 'clientes.html' ? 'active' : ''
  }">
                            👥 Clientes
                        </a>
                    </li>
                    <li>
                        <a href="${rutaPaginas}auditoria.html" class="${
    paginaActual === 'auditoria.html' ? 'active' : ''
  }">
                            📊 Auditoría
                        </a>
                    </li>
                </ul>

                <!-- Información del grupo -->
                <div class="navbar-info">
                    <span class="grupo-badge" id="grupo-badge">
                        👥 ${CONFIG.GRUPO_ESTUDIANTES}
                    </span>
                    <div class="conexion-status" id="conexion-status">
                        <span class="status-dot" id="status-dot"></span>
                        <span id="status-text">Verificando...</span>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

/**
 * Inyecta la navbar en el elemento con id "navbar-container"
 *
 * Esta función debe llamarse cuando el DOM esté listo.
 * Se ejecuta automáticamente al cargar el archivo.
 */
function renderizarNavbar() {
  const contenedor = document.getElementById('navbar-container');

  if (contenedor) {
    contenedor.innerHTML = crearNavbar();
    verificarEstadoConexion();
  } else {
    console.warn('⚠️ No se encontró el elemento #navbar-container');
  }
}

/**
 * Verifica el estado de conexión con el backend
 * y actualiza el indicador visual
 */
async function verificarEstadoConexion() {
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');

  if (!statusDot || !statusText) return;

  try {
    const conectado = await verificarConexionBackend();

    if (conectado) {
      statusDot.className = 'status-dot conectado';
      statusText.textContent = 'Conectado';
      statusText.title = 'Backend disponible en ' + CONFIG.API_BASE_URL;
    } else {
      statusDot.className = 'status-dot desconectado';
      statusText.textContent = 'Desconectado';
      statusText.title = 'No se puede conectar al backend. Verifica que esté ejecutándose.';
    }
  } catch (error) {
    statusDot.className = 'status-dot desconectado';
    statusText.textContent = 'Error';
    statusText.title = error.message;
  }
}

/**
 * Actualiza el badge del grupo si el usuario cambia la configuración
 *
 * @param {string} nuevoGrupo - Nombre del nuevo grupo
 */
function actualizarGrupoBadge(nuevoGrupo) {
  const badge = document.getElementById('grupo-badge');
  if (badge) {
    badge.textContent = `👥 ${nuevoGrupo}`;
  }
}

// ============================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================

// Renderizar navbar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderizarNavbar);
} else {
  renderizarNavbar();
}

// Verificar conexión cada 30 segundos
setInterval(verificarEstadoConexion, 30000);

console.log('✅ Componente Navbar cargado');
