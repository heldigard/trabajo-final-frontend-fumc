// ============================================
// SERVICIO DE API - PRODUCTOS
// ============================================

/**
 * Este archivo contiene todas las funciones para comunicarse
 * con los endpoints de PRODUCTOS del backend.
 *
 * ¿Qué es un servicio de API?
 * - Agrupa todas las peticiones HTTP relacionadas con una entidad (productos)
 * - Separa la lógica de red de la lógica de interfaz
 * - Facilita el mantenimiento (si cambia la API, solo se modifica aquí)
 *
 * Endpoints disponibles (según colecciones Postman):
 * - GET    /productos/          - Listar todos los productos
 * - GET    /productos/{id}      - Obtener un producto específico
 * - GET    /productos/buscar/{nombre} - Buscar por nombre
 * - GET    /productos/categoria/{categoria} - Filtrar por categoría
 * - POST   /productos/          - Crear nuevo producto
 * - PUT    /productos/{id}      - Actualizar producto completo
 * - PATCH  /productos/{id}      - Actualizar campos específicos
 * - DELETE /productos/{id}      - Eliminar producto (soft delete)
 */

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Maneja errores de peticiones HTTP de forma consistente
 *
 * @param {Response} response - Objeto Response de fetch
 * @returns {Promise<Object>} - Datos parseados o lanza error
 */
async function manejarRespuesta(response) {
    if (!response.ok) {
        // Intentar obtener mensaje de error del backend
        let mensajeError = CONFIG.MENSAJES.ERROR_GENERAL;

        try {
            const errorData = await response.json();
            mensajeError = errorData.detail || errorData.message || mensajeError;
        } catch {
            // Si no se puede parsear, usar mensaje genérico
            mensajeError = `Error ${response.status}: ${response.statusText}`;
        }

        throw new Error(mensajeError);
    }

    return await response.json();
}

/**
 * Muestra un spinner de carga mientras se procesa una petición
 *
 * @param {boolean} mostrar - true para mostrar, false para ocultar
 */
function mostrarCargando(mostrar) {
    const spinner = document.getElementById('spinner-carga');
    if (spinner) {
        spinner.style.display = mostrar ? 'block' : 'none';
    }
}

// ============================================
// FUNCIONES DE API - PRODUCTOS
// ============================================

/**
 * 1. Obtener todos los productos
 *
 * @returns {Promise<Array>} - Array de productos
 *
 * Ejemplo de uso:
 * const productos = await obtenerTodosLosProductos();
 * console.log(productos); // [{ id: 1, nombre: 'Laptop', ... }, ...]
 */
async function obtenerTodosLosProductos() {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL('/productos/'), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        const data = await manejarRespuesta(response);
        return data;

    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 2. Obtener un producto por ID
 *
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} - Datos del producto
 *
 * Ejemplo de uso:
 * const producto = await obtenerProductoPorId(5);
 * console.log(producto.nombre); // 'Laptop'
 */
async function obtenerProductoPorId(id) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/productos/${id}`), {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al obtener producto ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 3. Buscar productos por nombre
 *
 * @param {string} nombre - Nombre o parte del nombre a buscar
 * @returns {Promise<Array>} - Array de productos que coinciden
 *
 * Ejemplo de uso:
 * const resultados = await buscarProductosPorNombre('laptop');
 */
async function buscarProductosPorNombre(nombre) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL('/productos/buscar/nombre') + `?query=${encodeURIComponent(nombre)}`, {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al buscar productos por nombre "${nombre}":`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 4. Filtrar productos por categoría
 *
 * @param {string} categoria - Categoría a filtrar
 * @returns {Promise<Array>} - Array de productos de esa categoría
 *
 * Ejemplo de uso:
 * const electronicos = await filtrarProductosPorCategoria('Electrónica');
 */
async function filtrarProductosPorCategoria(categoria) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL('/productos/') + `?categoria=${encodeURIComponent(categoria)}`, {
            method: 'GET',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al filtrar productos por categoría "${categoria}":`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 5. Crear un nuevo producto
 *
 * @param {Object} producto - Datos del nuevo producto
 * @param {string} producto.nombre - Nombre del producto (requerido)
 * @param {string} producto.descripcion - Descripción (opcional)
 * @param {number} producto.precio - Precio (requerido)
 * @param {number} producto.stock - Stock disponible (requerido)
 * @param {string} producto.categoria - Categoría (requerido)
 * @returns {Promise<Object>} - Producto creado con su ID
 *
 * Ejemplo de uso:
 * const nuevoProducto = {
 *     nombre: 'Laptop Dell',
 *     descripcion: 'Laptop de alto rendimiento',
 *     precio: 2500000,
 *     stock: 10,
 *     categoria: 'Electrónica'
 * };
 * const creado = await crearProducto(nuevoProducto);
 * console.log(creado.id); // 15
 */

// ============================================
// 🎯 RETO 7: AGREGAR FIRMA DEL GRUPO EN POST (⭐⭐ Medio - 30 min)
// ============================================

/**
 * OBJETIVO DEL RETO 7:
 * Aprender a modificar los datos ANTES de enviarlos al backend.
 * Agregarás una "firma" con el nombre de tu grupo al final de la descripción.
 *
 * ¿POR QUÉ ESTE RETO?
 * - Te enseña cómo manipular datos antes de una petición POST
 * - Entiendes que puedes modificar el objeto antes de enviarlo
 * - Practicas template literals y manipulación de strings
 * - Ves cómo funciona el spread operator (...)
 *
 * CONTEXTO:
 * Cuando creas un producto, quieres que quede registrado qué grupo lo creó.
 * Una forma de hacerlo es agregar una "firma" al final de la descripción.
 *
 * EJEMPLO:
 * Descripción original: "Laptop de alto rendimiento"
 * Descripción modificada: "Laptop de alto rendimiento [Creado por GRUPO_1]"
 *
 * INSTRUCCIONES PASO A PASO:
 *
 * 1. CREA UNA COPIA DEL OBJETO PRODUCTO:
 *    Antes de la línea "const response = await fetch...", crea:
 *    const productoConFirma = { ...producto };
 *
 *    El spread operator (...) copia todas las propiedades.
 *
 * 2. MODIFICA LA DESCRIPCIÓN:
 *    Agrega la firma del grupo al final:
 *    productoConFirma.descripcion = `${producto.descripcion || ''} [Creado por ${CONFIG.GRUPO_ESTUDIANTES}]`;
 *
 *    - ${producto.descripcion || ''} → Usa la descripción original o '' si está vacía
 *    - [Creado por ${CONFIG.GRUPO_ESTUDIANTES}] → Agrega la firma
 *
 * 3. VERIFICA LA LONGITUD (OPCIONAL):
 *    Para evitar descripciones muy largas (máximo recomendado: 250 caracteres):
 *    if (productoConFirma.descripcion.length > 250) {
 *        productoConFirma.descripcion = productoConFirma.descripcion.substring(0, 250);
 *    }
 *
 * 4. USA EL OBJETO MODIFICADO:
 *    Cambia: body: JSON.stringify(producto)
 *    Por:    body: JSON.stringify(productoConFirma)
 *
 * ¿QUÉ ES EL SPREAD OPERATOR (...)?
 * - Copia todas las propiedades de un objeto en otro
 * - Ejemplo:
 *   const original = { nombre: 'Laptop', precio: 1000 };
 *   const copia = { ...original }; // copia = { nombre: 'Laptop', precio: 1000 }
 *   copia.precio = 2000; // No afecta a original
 *
 * CÓDIGO COMPLETO DE REFERENCIA:
 * ```javascript
 * // Crear copia del producto
 * const productoConFirma = { ...producto };
 *
 * // Agregar firma a la descripción
 * productoConFirma.descripcion = `${producto.descripcion || ''} [Creado por ${CONFIG.GRUPO_ESTUDIANTES}]`;
 *
 * // Verificar longitud (opcional)
 * if (productoConFirma.descripcion.length > 250) {
 *     productoConFirma.descripcion = productoConFirma.descripcion.substring(0, 250);
 * }
 *
 * // Usar en el fetch
 * body: JSON.stringify(productoConFirma),
 * ```
 *
 * PISTAS:
 * 💡 PISTA 1: Crea productoConFirma DENTRO del try, antes del fetch
 * 💡 PISTA 2: Usa template literals (comillas invertidas ``) para concatenar
 * 💡 PISTA 3: CONFIG.GRUPO_ESTUDIANTES ya está definido en config.js
 * 💡 PISTA 4: No modifiques el objeto 'producto' original, crea una copia
 *
 * CÓMO PROBAR:
 * 1. Completa el reto
 * 2. Crea un nuevo producto desde la interfaz
 * 3. Escribe descripción: "Producto de prueba"
 * 4. Guarda el producto
 * 5. Recarga la página y busca el producto
 * 6. La descripción debe mostrar: "Producto de prueba [Creado por TU_GRUPO]"
 * 7. Abre DevTools (F12) → Network → Mira el Payload del POST
 *
 * CRITERIOS DE ACEPTACIÓN:
 * ✅ La descripción incluye [Creado por GRUPO_X]
 * ✅ Si la descripción original está vacía, solo muestra [Creado por GRUPO_X]
 * ✅ La descripción no excede 250 caracteres
 * ✅ En DevTools Network, el Payload muestra la descripción modificada
 * ✅ El producto se guarda correctamente en el backend
 */
async function crearProducto(producto) {
    try {
        mostrarCargando(true);

        // TODO: RETO 7 - Parte 1: Crear copia del producto con spread operator
        // const productoConFirma = { ...producto };

        // TODO: RETO 7 - Parte 2: Agregar firma a la descripción
        // productoConFirma.descripcion = `${producto.descripcion || ''} [Creado por ${CONFIG.GRUPO_ESTUDIANTES}]`;

        // TODO: RETO 7 - Parte 3 (OPCIONAL): Verificar longitud máxima
        // if (productoConFirma.descripcion.length > 250) {
        //     productoConFirma.descripcion = productoConFirma.descripcion.substring(0, 250);
        // }

        const response = await fetch(buildURL('/productos/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // TODO: RETO 7 - Parte 4: Cambiar 'producto' por 'productoConFirma'
            body: JSON.stringify(producto),
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 6. Actualizar un producto completo (PUT)
 *
 * @param {number} id - ID del producto a actualizar
 * @param {Object} producto - Datos completos del producto
 * @returns {Promise<Object>} - Producto actualizado
 *
 * ⚠️ IMPORTANTE: PUT requiere enviar TODOS los campos, incluso los que no cambian
 *
 * Ejemplo de uso:
 * const productoActualizado = {
 *     nombre: 'Laptop Dell XPS',
 *     descripcion: 'Laptop de alto rendimiento - Actualizada',
 *     precio: 2300000,
 *     stock: 8,
 *     categoria: 'Electrónica'
 * };
 * await actualizarProductoCompleto(15, productoActualizado);
 */

// ============================================
// 🎯 RETO 7 (CONTINUACIÓN): AGREGAR FIRMA EN PUT
// ============================================

/**
 * OBJETIVO:
 * Igual que en POST, cuando actualizas un producto con PUT,
 * también debes agregar la firma del grupo.
 *
 * PERO HAY UNA DIFERENCIA IMPORTANTE:
 * - En POST (crear): Agrega [Creado por GRUPO_X]
 * - En PUT (editar): Agrega [Editado por GRUPO_X]
 *
 * INSTRUCCIONES:
 * Repite el mismo proceso que en crearProducto():
 *
 * 1. Crea una copia: const productoConFirma = { ...producto };
 *
 * 2. Modifica la descripción con firma de EDICIÓN:
 *    productoConFirma.descripcion = `${producto.descripcion || ''} [Editado por ${CONFIG.GRUPO_ESTUDIANTES}]`;
 *
 * 3. Verifica longitud (opcional):
 *    if (productoConFirma.descripcion.length > 250) {
 *        productoConFirma.descripcion = productoConFirma.descripcion.substring(0, 250);
 *    }
 *
 * 4. Usa productoConFirma en el fetch
 *
 * NOTA IMPORTANTE:
 * Si el producto ya tiene una firma anterior, se agregará otra.
 * Ejemplo: "Laptop [Creado por GRUPO_1] [Editado por GRUPO_2]"
 * Esto permite rastrear el historial de modificaciones.
 *
 * CÓDIGO DE REFERENCIA:
 * ```javascript
 * const productoConFirma = { ...producto };
 * productoConFirma.descripcion = `${producto.descripcion || ''} [Editado por ${CONFIG.GRUPO_ESTUDIANTES}]`;
 * if (productoConFirma.descripcion.length > 250) {
 *     productoConFirma.descripcion = productoConFirma.descripcion.substring(0, 250);
 * }
 * body: JSON.stringify(productoConFirma),
 * ```
 *
 * CRITERIOS DE ACEPTACIÓN:
 * ✅ Al editar producto, se agrega [Editado por GRUPO_X]
 * ✅ Se distingue entre "Creado" y "Editado"
 * ✅ La descripción no excede 250 caracteres
 * ✅ Los cambios se guardan correctamente
 */
async function actualizarProductoCompleto(id, producto) {
    try {
        mostrarCargando(true);

        // TODO: RETO 7 - Igual que en POST, pero con "Editado" en lugar de "Creado"

        const response = await fetch(buildURL(`/productos/${id}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            // TODO: RETO 7 - Cambiar 'producto' por 'productoConFirma'
            body: JSON.stringify(producto),
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al actualizar producto ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 7. Actualizar campos específicos de un producto (PATCH)
 *
 * @param {number} id - ID del producto a actualizar
 * @param {Object} camposActualizar - Solo los campos que se quieren cambiar
 * @returns {Promise<Object>} - Producto actualizado
 *
 * PATCH es más flexible: solo envías los campos que quieres modificar
 *
 * Ejemplo de uso:
 * // Solo actualizar el precio y el stock
 * await actualizarProductoParcial(15, { precio: 2200000, stock: 5 });
 */
async function actualizarProductoParcial(id, camposActualizar) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/productos/${id}`), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(camposActualizar),
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al actualizar parcialmente producto ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

/**
 * 8. Eliminar un producto (Soft Delete)
 *
 * @param {number} id - ID del producto a eliminar
 * @returns {Promise<Object>} - Confirmación de eliminación
 *
 * ⚠️ IMPORTANTE: Esta eliminación es LÓGICA (soft delete)
 * El producto NO se borra de la base de datos, solo se marca como inactivo.
 * Esto permite mantener historial y auditoría.
 *
 * Ejemplo de uso:
 * await eliminarProducto(15);
 * // El producto ahora tiene activo=false
 */
async function eliminarProducto(id) {
    try {
        mostrarCargando(true);

        const response = await fetch(buildURL(`/productos/${id}`), {
            method: 'DELETE',
            signal: AbortSignal.timeout(CONFIG.TIMEOUT)
        });

        return await manejarRespuesta(response);

    } catch (error) {
        console.error(`Error al eliminar producto ${id}:`, error);
        throw error;
    } finally {
        mostrarCargando(false);
    }
}

// ============================================
// LOGGING PARA DESARROLLO
// ============================================

console.log('✅ Servicio de API de Productos cargado');
