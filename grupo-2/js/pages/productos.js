// ============================================
// PÁGINA - PRODUCTOS (SIMPLIFICADO)
// ============================================

/**
 * Este archivo gestiona la página de productos
 *
 * Responsabilidades principales:
 * 1. Cargar productos desde la API
 * 2. Mostrar productos en tabla
 * 3. Búsqueda y filtros
 * 4. Crear/Editar/Eliminar productos
 *
 * NOTA: Las funciones auxiliares (validación, formato)
 * están en archivos separados en la carpeta utils/
 */

// ============================================
// VARIABLES GLOBALES
// ============================================

let productosGlobales = [];      // Todos los productos
let productosFiltrados = [];     // Productos después de filtrar
let productoEnEdicion = null;    // Producto siendo editado

// ============================================
// 1. INICIALIZACIÓN
// ============================================

/**
 * Se ejecuta cuando la página termina de cargar
 */
window.addEventListener('DOMContentLoaded', async () => {
    console.log('📦 Inicializando página de productos...');

    // Renderizar navbar
    renderizarNavbar();

    // Cargar productos
    await cargarProductos();

    // Configurar eventos
    configurarEventos();
});

/**
 * Configura los event listeners de la página
 */
function configurarEventos() {
    // Búsqueda
    const inputBusqueda = document.getElementById('busqueda-producto');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', buscarProducto);
    }

    // Filtros
    const selectCategoria = document.getElementById('filtro-categoria');
    const selectEstado = document.getElementById('filtro-estado');

    if (selectCategoria) selectCategoria.addEventListener('change', filtrarProductos);
    if (selectEstado) selectEstado.addEventListener('change', filtrarProductos);

    // Botón crear
    const btnCrear = document.getElementById('btn-crear-producto');
    if (btnCrear) {
        btnCrear.addEventListener('click', abrirModalCrear);
    }
}

// ============================================
// 2. CARGAR DATOS
// ============================================

/**
 * Carga todos los productos desde el backend
 */
async function cargarProductos() {
    try {
        mostrarSpinner('tbody-productos', 8);

        productosGlobales = await obtenerTodosLosProductos();

        console.log(`✅ ${productosGlobales.length} productos cargados`);

        actualizarEstadisticas();
        filtrarProductos();

    } catch (error) {
        console.error('❌ Error al cargar productos:', error);
        mostrarTablaVacia('tbody-productos', '❌ Error al cargar productos. Verifica el backend.', 8);
    }
}

// ============================================
// 3. BÚSQUEDA Y FILTROS
// ============================================

/**
 * Busca productos por nombre
 */
function buscarProducto() {
    filtrarProductos();
}

// ============================================
// 🎯 RETO 4: BÚSQUEDA EN LA DESCRIPCIÓN (⭐⭐ Medio - 25 min)
// ============================================

/**
 * Aplica filtros de búsqueda, categoría y estado
 *
 * OBJETIVO DEL RETO 4:
 * Actualmente, la búsqueda solo funciona con el NOMBRE del producto.
 * Tu tarea es ampliar la búsqueda para que TAMBIÉN busque en la DESCRIPCIÓN.
 *
 * INSTRUCCIONES:
 * 1. Encuentra la línea que dice: producto.nombre?.toLowerCase().includes(termino)
 * 2. Agrega el operador OR (||) para buscar TAMBIÉN en la descripción
 * 3. Usa optional chaining (?.) para evitar errores si descripcion es null
 *
 * CÓDIGO ACTUAL:
 * producto.nombre?.toLowerCase().includes(termino)
 *
 * CÓDIGO MEJORADO:
 * producto.nombre?.toLowerCase().includes(termino) ||
 * producto.descripcion?.toLowerCase().includes(termino)
 *
 * ¿QUÉ ES OPTIONAL CHAINING (?.)?
 * - Es una forma segura de acceder a propiedades que pueden no existir
 * - Si la propiedad es null o undefined, devuelve undefined en lugar de error
 * - Ejemplo: producto.descripcion?.toLowerCase()
 *   → Si descripcion es null, no da error, solo devuelve undefined
 *
 * ¿QUÉ ES EL OPERADOR OR (||)?
 * - Devuelve true si CUALQUIERA de las condiciones es verdadera
 * - Ejemplo: condicion1 || condicion2
 *   → true si condicion1 ES VERDADERA O condicion2 ES VERDADERA
 *
 * EJEMPLO PRÁCTICO:
 * Producto: { nombre: "Laptop", descripcion: "Laptop HP para programación" }
 *
 * Búsqueda "HP":
 * - CON CÓDIGO ACTUAL: No encuentra nada (solo busca en nombre)
 * - CON CÓDIGO MEJORADO: ✅ Encuentra el producto (busca en descripción también)
 *
 * PISTAS:
 * 💡 PISTA 1: El operador || se escribe con dos barras verticales (tecla AltGr + 1)
 * 💡 PISTA 2: Copia exactamente la estructura: producto.nombre?.toLowerCase().includes(termino)
 * 💡 PISTA 3: Luego agrega || y repite con descripcion en lugar de nombre
 * 💡 PISTA 4: No olvides el optional chaining (?.) en descripcion también
 *
 * CRITERIOS DE ACEPTACIÓN:
 * ✅ Si busco "Laptop", encuentra productos con "Laptop" en nombre
 * ✅ Si busco "HP", encuentra productos con "HP" en descripción
 * ✅ Si busco "programación", encuentra productos con esa palabra en descripción
 * ✅ No da error si un producto tiene descripcion = null
 */
function filtrarProductos() {
    const termino = document.getElementById('busqueda-producto')?.value.toLowerCase() || '';
    const categoriaFiltro = document.getElementById('filtro-categoria')?.value || 'todos';
    const estadoFiltro = document.getElementById('filtro-estado')?.value || 'todos';

    productosFiltrados = productosGlobales.filter(producto => {
        // Filtro de búsqueda (nombre)
        // TODO: RETO 4 - Modifica esta línea para buscar también en descripción
        const cumpleBusqueda = !termino || producto.nombre?.toLowerCase().includes(termino) || producto.descripcion?.toLowerCase().includes(termino);

        // Filtro de categoría
        const cumpleCategoria = categoriaFiltro === 'todos' || producto.categoria === categoriaFiltro;

        // Filtro de estado
        const cumpleEstado = estadoFiltro === 'todos' ||
            (estadoFiltro === 'activos' && producto.activo) ||
            (estadoFiltro === 'inactivos' && !producto.activo);

        return cumpleBusqueda && cumpleCategoria && cumpleEstado;
    });

    renderizarTablaProductos(productosFiltrados);
}

// ============================================
// 4. RENDERIZADO
// ============================================

/**
 * Renderiza los productos en la tabla HTML
 */
function renderizarTablaProductos(productos) {
    const tbody = document.getElementById('tbody-productos');

    // Actualizar contador
    actualizarContador('contador-resultados', productos.length, 'producto', 'productos');

    // Si no hay productos
    if (productos.length === 0) {
        mostrarTablaVacia('tbody-productos', 'No se encontraron productos', 8);
        return;
    }

    // Renderizar cada producto
    tbody.innerHTML = productos.map(producto => `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${truncarTexto(producto.descripcion, 40)}</td>
            <td>${formatearPrecio(producto.precio)}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>
            <td>${crearBadgeEstado(producto.activo)}</td>
            <td>
                <button class="btn btn-small btn-primary" onclick="abrirModalEditar(${producto.id})">
                    ✏️ Editar
                </button>
                <button class="btn btn-small btn-danger" onclick="confirmarEliminarProducto(${producto.id})">
                    🗑️ Eliminar
                </button>
            </td>
        </tr>
    `).join('');
}

// ============================================
// 5. ESTADÍSTICAS
// ============================================

/**
 * Actualiza las tarjetas de estadísticas
 */
function actualizarEstadisticas() {
    const total = productosGlobales.length;
    const activos = productosGlobales.filter(p => p.activo).length;
    const valorTotal = productosGlobales.reduce((sum, p) => sum + (p.precio * p.stock), 0);

    // Actualizar elementos
    const elemTotal = document.getElementById('total-productos');
    const elemActivos = document.getElementById('productos-activos');
    const elemValor = document.getElementById('valor-inventario');

    if (elemTotal) elemTotal.textContent = total;
    if (elemActivos) elemActivos.textContent = activos;
    if (elemValor) elemValor.textContent = formatearPrecio(valorTotal);
}

// ============================================
// 6. MODAL CREAR
// ============================================

/**
 * Abre el modal para crear un nuevo producto
 */
function abrirModalCrear() {
    productoEnEdicion = null;

    const modal = crearModalFormulario(
        'Crear Producto',
        crearFormularioProducto(),
        guardarProducto
    );

    modal.abrir();
}

/**
 * Crea el HTML del formulario de producto
 */
function crearFormularioProducto(producto = null) {
    return `
        <div class="form-group">
            <label for="nombre">Nombre *</label>
            <input type="text" id="nombre" class="form-control"
                   value="${producto?.nombre || ''}" required>
        </div>

        <div class="form-group">
            <label for="descripcion">Descripción</label>
            <textarea id="descripcion" class="form-control" rows="3">${producto?.descripcion || ''}</textarea>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="precio">Precio *</label>
                <input type="number" id="precio" class="form-control"
                       value="${producto?.precio || ''}" required min="0">
            </div>

            <div class="form-group">
                <label for="stock">Stock *</label>
                <input type="number" id="stock" class="form-control"
                       value="${producto?.stock || 0}" required min="0">
            </div>
        </div>

        <div class="form-group">
            <label for="categoria">Categoría *</label>
            <select id="categoria" class="form-control" required>
                <option value="">Selecciona...</option>
                ${CONFIG.CATEGORIAS_PRODUCTOS.map(cat => `
                    <option value="${cat}" ${producto?.categoria === cat ? 'selected' : ''}>
                        ${cat}
                    </option>
                `).join('')}
            </select>
        </div>
    `;
}

// ============================================
// 7. MODAL EDITAR
// ============================================

/**
 * Abre el modal para editar un producto existente
 */
async function abrirModalEditar(id) {
    try {
        const producto = await obtenerProductoPorId(id);
        productoEnEdicion = producto;

        const modal = crearModalFormulario(
            'Editar Producto',
            crearFormularioProducto(producto),
            guardarProducto
        );

        modal.abrir();

    } catch (error) {
        mostrarAlerta('Error', 'No se pudo cargar el producto', 'error');
    }
}

// ============================================
// 8. GUARDAR
// ============================================

/**
 * Guarda un producto (crear o editar)
 */
async function guardarProducto() {
    // Obtener datos del formulario
    const datos = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        categoria: document.getElementById('categoria').value,
        activo: true
    };

    // Validar
    const errores = validarDatosProducto(datos);
    if (errores.length > 0) {
        mostrarAlerta('Error de validación', errores.join('\n'), 'error');
        return false; // No cerrar modal
    }

    try {
        if (productoEnEdicion) {
            // Editar
            await actualizarProducto(productoEnEdicion.id, datos);
            mostrarAlerta('Éxito', 'Producto actualizado correctamente', 'success');
        } else {
            // Crear
            await crearProducto(datos);
            mostrarAlerta('Éxito', 'Producto creado correctamente', 'success');
        }

        // Recargar productos
        await cargarProductos();

        return true; // Cerrar modal

    } catch (error) {
        mostrarAlerta('Error', error.message, 'error');
        return false;
    }
}

// ============================================
// 🎯 RETO 3: MEJORAR CONFIRMACIÓN AL ELIMINAR (⭐ Fácil - 20 min)
// ============================================

/**
 * Confirma antes de eliminar un producto
 *
 * OBJETIVO:
 * Mejorar el mensaje de confirmación para que muestre más información
 * del producto que se va a eliminar (nombre, precio, stock).
 *
 * INSTRUCCIONES:
 * 1. Encuentra la llamada a mostrarConfirmacion() más abajo
 * 2. Modifica el mensaje para incluir:
 *    - Nombre del producto
 *    - Precio formateado
 *    - Stock disponible
 *    - Advertencia si tiene stock > 0
 *
 * MENSAJE ACTUAL:
 * "¿Estás seguro de eliminar este producto?"
 *
 * MENSAJE MEJORADO (ejemplo):
 * "¿Eliminar el producto?
 *
 * Nombre: Laptop HP
 * Precio: $2.500.000
 * Stock: 10 unidades
 *
 * ⚠️ Este producto aún tiene stock disponible"
 *
 * PISTAS:
 * 💡 PISTA 1: Usa template literals (comillas invertidas) para texto multilínea
 * 💡 PISTA 2: Usa ${producto.nombre} para insertar el nombre
 * 💡 PISTA 3: Usa ${formatearPrecio(producto.precio)} para el precio
 * 💡 PISTA 4: Usa operador ternario para mostrar advertencia condicional:
 *             ${producto.stock > 0 ? '⚠️ Este producto aún tiene stock' : ''}
 *
 * CÓDIGO DE REFERENCIA:
 * ```javascript
 * const mensaje = `¿Eliminar el producto?
 *
 * Nombre: ${producto.nombre}
 * Precio: ${formatearPrecio(producto.precio)}
 * Stock: ${producto.stock} unidades
 *
 * ${producto.stock > 0 ? '⚠️ Este producto aún tiene stock disponible' : ''}`;
 * ```
 *
 * CRITERIOS DE ACEPTACIÓN:
 * ✅ El mensaje muestra el nombre del producto
 * ✅ El mensaje muestra el precio formateado
 * ✅ El mensaje muestra el stock
 * ✅ Si stock > 0, muestra advertencia
 * ✅ Si stock = 0, NO muestra advertencia
 */
async function confirmarEliminarProducto(id) {
    try {
        const producto = await obtenerProductoPorId(id);

        // TODO: RETO 3 - Mejora este mensaje
        const confirmado = await mostrarConfirmacion(
            'const mensaje = `¿Eliminar el producto?

        Nombre: ${ producto.nombre }
        Precio: ${ formatearPrecio(producto.precio)
    }
        Stock: ${ producto.stock } unidades
        ${ producto.stock > 0 ? '⚠️ Este producto aún tiene stock disponible' : '' } `;

        const confirmado = await mostrarConfirmacion(mensaje);

        if (!confirmado) {
            return;
        }

// ============================================
// 🎯 RETO 6: EXPORTAR PRODUCTOS A CSV (⭐⭐⭐ Difícil - 45 min)
// ============================================

/**
 * Exporta los productos filtrados a un archivo CSV
 *
 * OBJETIVO:
 * Crear funcionalidad para descargar los productos en formato CSV
 * que se puede abrir en Excel.
 *
 * INSTRUCCIONES:
 * 1. En productos.html: Descomenta el botón "Exportar CSV" (línea ~65)
 * 2. Aquí: Descomenta esta función completa
 * 3. Lee cada paso y entiende cómo funciona
 * 4. Prueba exportando productos
 *
 * ¿QUÉ ES CSV?
 * CSV = Comma-Separated Values (Valores Separados por Comas)
 * Es un formato de archivo simple que Excel puede abrir.
 * Cada línea es una fila, y las comas separan las columnas.
 *
 * EJEMPLO DE CSV:
 * ID,Nombre,Precio,Stock,Categoría
 * 1,Laptop HP,2500000,10,Tecnología
 * 2,Mouse,50000,100,Tecnología
 *
 * ¿CÓMO FUNCIONA ESTA FUNCIÓN?
 * 1. Crea la primera línea (encabezados)
 * 2. Convierte cada producto a una línea CSV
 * 3. Une todas las líneas con saltos de línea (\n)
 * 4. Crea un "Blob" (archivo en memoria)
 * 5. Crea un enlace de descarga temporal
 * 6. Simula un clic para descargar
 * 7. Limpia el enlace
 *
 * TECNOLOGÍAS USADAS:
 * - .map() → Transforma cada producto en una línea CSV
 * - .join() → Une las líneas con salto de línea
 * - Blob → Representa un archivo en memoria
 * - URL.createObjectURL() → Crea una URL temporal para descargar
 * - document.createElement('a') → Crea enlace de descarga
 *
 * CRITERIOS DE ACEPTACIÓN:
 * ✅ Al hacer clic, se descarga un archivo .csv
 * ✅ El archivo se abre correctamente en Excel
 * ✅ Contiene todos los productos filtrados
 * ✅ Nombre del archivo incluye la fecha actual
 *
 * Descomenta todo el código a continuación:
 */

// function exportarProductosCSV() {
//     // Paso 1: Crear encabezados del CSV
//     const encabezados = 'ID,Nombre,Descripción,Precio,Stock,Categoría,Estado\n';
//
//     // Paso 2: Convertir cada producto a una línea CSV
//     const lineas = productosFiltrados.map(p => {
//         return `${ p.id }, "${p.nombre}", "${p.descripcion || ''}", ${ p.precio },${ p.stock }, "${p.categoria}", ${ p.activo ? 'Activo' : 'Inactivo' } `;
//     }).join('\n');
//
//     // Paso 3: Combinar encabezados + líneas
//     const csv = encabezados + lineas;
//
//     // Paso 4: Crear un Blob (archivo en memoria)
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//
//     // Paso 5: Crear URL de descarga
//     const url = URL.createObjectURL(blob);
//
//     // Paso 6: Crear enlace temporal
//     const enlace = document.createElement('a');
//     enlace.href = url;
//     enlace.download = `productos_${ new Date().toISOString().split('T')[0] }.csv`;
//
//     // Paso 7: Simular clic para descargar
//     document.body.appendChild(enlace);
//     enlace.click();
//
//     // Paso 8: Limpiar
//     document.body.removeChild(enlace);
//     URL.revokeObjectURL(url);
//
//     mostrarAlerta('Éxito', 'Productos exportados correctamente', 'success');
// }
