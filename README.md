# 🌐 Frontend de Tienda Virtual - FUMC

> **Proyecto Final del Curso**: Frameworks para desarrollo web - Frontend  
> **Institución**: Fundación Universitaria María Cano (FUMC)  
> **Fecha**: Noviembre 2025

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [🎯 Objetivos de Aprendizaje](#-objetivos-de-aprendizaje)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Uso de la Aplicación](#-uso-de-la-aplicación)
- [Retos para Estudiantes](#-retos-para-estudiantes)
- [Conexión con el Backend](#-conexión-con-el-backend)
- [Solución de Problemas](#-solución-de-problemas)

---

## 📖 Descripción

Aplicación web frontend que se conecta con la **API de Tienda Virtual** para:

- ✅ Visualizar y gestionar **productos**
- ✅ Administrar **clientes**
- ✅ Ver **reportes de auditoría** de todas las operaciones
- ✅ Realizar búsquedas y filtros en tiempo real
- ✅ Crear, editar y eliminar registros con formularios interactivos

⚠️ **IMPORTANTE**: Esta aplicación está diseñada para consumir la API REST del backend ubicada en `http://localhost:8000/api/v1`. Asegúrate de tener el backend ejecutándose antes de usar el frontend.

---

## 🎯 Objetivos de Aprendizaje

Al completar este proyecto aprenderás:

1. **Consumo de APIs REST** con JavaScript (Fetch API)
2. **Arquitectura de carpetas** similar a frameworks modernos
3. **Separación de responsabilidades**: API, componentes, páginas
4. **Manipulación del DOM** dinámicamente
5. **Manejo de estados** (carga, éxito, error)
6. **Validación de formularios** en el frontend
7. **Creación de reportes** básicos con JavaScript

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **HTML5** | Estructura de las páginas |
| **CSS3** | Estilos y diseño responsivo |
| **JavaScript (ES6+)** | Lógica de la aplicación |
| **Fetch API** | Comunicación con el backend |
| **LocalStorage** | Almacenamiento de configuración |

**NO se usan librerías externas** - Todo es JavaScript vanilla para entender los fundamentos.

---

## ✨ Características

### 📦 Gestión de Productos
- Listar todos los productos en tabla dinámica
- Buscar productos por nombre
- Filtrar por categoría y estado (activo/inactivo)
- Crear nuevos productos con validación
- Editar productos existentes
- Eliminar productos (soft delete)

### 👥 Gestión de Clientes
- Listar clientes con paginación visual
- Buscar por nombre o email
- Filtrar por ciudad
- Registrar nuevos clientes
- Actualizar información
- Eliminar clientes (soft delete)

### 📊 Reportes de Auditoría
- Ver historial completo de operaciones
- Filtrar por grupo, tabla, operación
- Visualizar datos antes/después de cambios
- Exportar datos (reto para estudiantes)
- Gráficos básicos de operaciones por grupo

### 🎨 Características Técnicas
- **Arquitectura modular**: Separación clara de responsabilidades
- **Componentes reutilizables**: Navbar, modales, alertas
- **Manejo de errores**: Mensajes descriptivos al usuario
- **Estados de carga**: Indicadores visuales durante peticiones
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Etiquetas semánticas y ARIA

---

## 📦 Requisitos Previos

1. **Backend ejecutándose**
   - El proyecto `trabajo-final-backend-fumc` debe estar corriendo
   - URL por defecto: `http://localhost:8000`
   - Verificar en: `http://localhost:8000/docs`

2. **Navegador moderno**
   - Chrome, Firefox, Edge (versiones recientes)
   - JavaScript habilitado

3. **Editor de código** (recomendado)
   - VS Code con extensión Live Server
   - O cualquier servidor HTTP local

4. **Extensión Live Server para VS Code**
   - Abre VS Code → Extensions (Ctrl+Shift+X)
   - Busca "Live Server"
   - Instala la extensión de Ritwick Dey

---

## 🚀 Instalación y Configuración

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Opción 1: Clonar con Git
git clone https://github.com/tu-usuario/trabajo-final-frontend-fumc.git

# Opción 2: Descargar ZIP desde GitHub
# (Luego descomprime en una carpeta de tu elección)
```

### Paso 2: Configurar tu Grupo

Abre el archivo `js/config.js` y cambia el nombre de tu grupo:

```javascript
// 📍 LÍNEA 22 de js/config.js
GRUPO_ESTUDIANTES: 'GRUPO_12',  // ⚠️ CAMBIAR POR TU GRUPO
```

**Cambiar por:**
```javascript
GRUPO_ESTUDIANTES: 'GRUPO_12',  // Si eres del grupo 3
```

### Paso 2: Verificar que el Backend esté Corriendo

```bash
# El backend debe estar ejecutándose en:
# http://localhost:8000

# Para verificar, abre en tu navegador:
# http://localhost:8000/docs
```

### Paso 3: Abrir el Frontend

**Opción A - Con Live Server (Recomendado):**

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html` → "Open with Live Server"
3. Se abrirá automáticamente en `http://127.0.0.1:5500`

**Opción B - Con Python HTTP Server:**

```bash
# Desde la carpeta del proyecto
python -m http.server 8080

# Abre tu navegador en:
# http://localhost:8080
```

**Opción C - Simplemente abre el archivo:**

```bash
# Doble clic en index.html
# (Puede tener problemas con CORS)
```

### Paso 4: Probar la Conexión

1. Abre el frontend en tu navegador
2. Ve al Dashboard (página principal)
3. Mira la barra de navegación superior
4. Debería decir: "🟢 Conectado al Backend"
5. Si dice "🔴 Sin Conexión", verifica que el backend esté corriendo

### Paso 5: Crear Datos de Prueba

```javascript
// Abre la consola del navegador (F12)
// Pega este código para crear productos de prueba:

fetch('http://localhost:8000/api/v1/productos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: "Laptop HP",
    descripcion: "Laptop para desarrollo",
    precio: 2500000,
    stock: 10,
    categoria: "Tecnología"
  })
});
```

---

## 📁 Estructura del Proyecto (Arquitectura Modular)

```
trabajo-final-frontend-fumc/
│
├── index.html              # Dashboard principal
├── GUIA_ESTUDIANTES.md     # 📘 Guía completa para estudiantes
├── README.md             # Esta documentación
│
├── css/
│   └── styles.css        # Estilos globales (489 líneas)
│
├── js/
│   ├── config.js         # Configuración centralizada (108 líneas)
│   │
│   ├── utils/            # ✨ Utilidades reutilizables (426 líneas)
│   │   ├── formatters.js  # Formato de precios, fechas, textos (129 líneas)
│   │   ├── validators.js  # Validaciones de formularios + RETO 1 (143 líneas)
│   │   └── ui.js          # Alertas, spinners, badges (154 líneas)
│   │
│   ├── api/              # Servicios de comunicación con backend (1,085 líneas)
│   │   ├── productos.js   # 8 funciones CRUD (295 líneas)
│   │   ├── clientes.js    # 9 funciones CRUD (351 líneas)
│   │   └── auditoria.js   # 5 funciones de consulta (297 líneas)
│   │
│   ├── components/       # Componentes reutilizables (469 líneas)
│   │   ├── navbar.js      # Barra de navegación (145 líneas)
│   │   └── modal.js       # Sistema de modales (263 líneas)
│   │
│   └── pages/            # Lógica de cada página (934 líneas)
│       ├── productos.js   # CRUD productos + RETOS 3, 4, 6 (476 líneas)
│       ├── clientes.js    # CRUD clientes + RETO 5 (297 líneas)
│       └── auditoria.js   # Reportes y filtros (161 líneas)
│
└── pages/               # Páginas HTML
    ├── productos.html    # Gestión de productos
    ├── clientes.html     # Gestión de clientes
    └── auditoria.html    # Auditoría y reportes

📊 ESTADÍSTICAS DEL PROYECTO:
- Total archivos JS: 12 archivos
- Total líneas de código JS: ~2,819 líneas
- Promedio por archivo: ~235 líneas (fácil de leer)
- Total retos: 7 retos esenciales
- Páginas completas: 4 (Dashboard + 3 CRUD)
```

### Explicación de la Arquitectura

**¿Por qué esta estructura?**

Esta organización es similar a frameworks como React/Vue/Angular:

- **`api/`**: Separa la comunicación con el backend (como servicios en Angular)
- **`components/`**: Elementos reutilizables (como componentes en React)
- **`pages/`**: Lógica de cada vista (como páginas en Next.js)
- **`css/`**: Estilos centralizados
- **`pages/`** (HTML): Vistas separadas del JavaScript

**Ventajas para analítica de datos**:
- Fácil de mantener y escalar
- Código organizado por funcionalidad
- Reutilización de componentes
- Similar a herramientas de visualización (Power BI, Tableau dashboards)

---

## 🎮 Uso de la Aplicación

### Dashboard Principal (index.html)

Página de inicio con:
- Resumen de estadísticas (total productos, clientes)
- Enlaces rápidos a cada sección
- Estado de conexión con backend
- Últimas operaciones registradas

### Gestión de Productos (productos.html)

**Listar productos:**
1. Automáticamente carga al abrir la página
2. Muestra en tabla: ID, nombre, descripción, precio, stock, categoría, estado

**Buscar:**
- Escribe en el campo de búsqueda
- Filtra en tiempo real por nombre

**Filtrar:**
- Por categoría (dropdown)
- Por estado: Activos / Inactivos / Todos

**Crear producto:**
1. Clic en botón "➕ Nuevo Producto"
2. Completa el formulario
3. Validación automática
4. Clic en "Guardar"

**Editar producto:**
1. Clic en botón "✏️ Editar" en la fila
2. Modifica los campos necesarios
3. Guardar cambios

**Eliminar producto:**
1. Clic en botón "🗑️ Eliminar"
2. Confirmar acción
3. Se marca como inactivo (no se borra de BD)

### Gestión de Clientes (clientes.html)

Similar a productos, con campos específicos:
- Nombre, Email, Teléfono, Documento, Ciudad, Dirección

**Validaciones especiales:**
- Email único (el backend lo valida)
- Formato de email correcto

### Reportes de Auditoría (auditoria.html)

**Filtros disponibles:**
- Por grupo de estudiantes
- Por tabla (productos/clientes)
- Por operación (CREATE/UPDATE/DELETE)
- Por rango de fechas

**Visualización:**
- Tabla con todas las operaciones
- Columnas: Fecha, Grupo, Tabla, Operación, Registro ID
- Expandir para ver datos antes/después del cambio

**🎯 RETOS para estudiantes:**
- Implementar gráfico de barras (operaciones por grupo)
- Botón exportar a CSV
- Filtro por rango de fechas

---

## 🎯 Retos para Estudiantes (SIMPLIFICADOS)

Este proyecto incluye **7 retos** diseñados para completarse en **3 clases**. Cada reto tiene **instrucciones detalladas insertadas directamente en el código** con múltiples pistas y ejemplos.

### � Ubicación Exacta de los Retos

Todos los retos están insertados como **comentarios detallados** en el código fuente:

| # | Reto | Archivo | Línea | Tiempo | Dificultad | Puntos |
|---|------|---------|-------|--------|------------|--------|
| 1 | Validar stock negativo | `js/pages/productos.js` | ~515 | 20 min | ⭐ Fácil | 15 pts |
| 2 | Formato de precios | `js/pages/productos.js` | ~643 | 15 min | ⭐ Fácil | 10 pts |
| 3 | Confirmación al eliminar | `js/pages/productos.js` | ~590 | 20 min | ⭐ Fácil | 15 pts |
| 4 | Buscar en descripción | `js/pages/productos.js` | ~163 | 25 min | ⭐⭐ Media | 20 pts |
| 5 | Contador de caracteres | `js/pages/clientes.js` | ~258 | 30 min | ⭐⭐ Media | 20 pts |
| 6 | Exportar a CSV | `js/pages/productos.js` + `pages/productos.html` | ~890 + ~65 | 45 min | ⭐⭐⭐ Difícil | 20 pts |
| 7 | Agregar firma en POST/PUT | `js/api/productos.js` | ~208 y ~320 | 30 min | ⭐⭐ Medio | 20 pts |

**Total tiempo estimado:** 2.5-3 horas (perfectamente posible en 3 clases)  
**Total puntos:** 120

---

### 📝 Descripción de Cada Reto

#### 🎯 Reto 1: Validar Stock Negativo (⭐ Fácil - 15 pts)
**Objetivo:** Evitar que se creen productos con stock negativo.

**Ubicación:** `js/pages/productos.js` línea **~515** (función `validarDatosProducto`)

**Qué debes hacer:**
1. Buscar el comentario `🎯 RETO 1` en el código
2. Leer las instrucciones detalladas (40+ líneas de ayuda)
3. Descomentar 3 líneas de código que ya están escritas
4. Probar creando producto con stock -5 (debe mostrar alerta)

**Pistas incluidas en el código:**
- Explicación de validación con `isNaN()`
- 4 pistas progresivas con código de ejemplo
- Criterios de aceptación claros
- Código completo comentado (solo descomentarlo)

---

#### 🎯 Reto 2: Formato de Precios (⭐ Fácil - 10 pts)
**Objetivo:** Aprender cómo funciona el formato de precios colombiano: $2.500.000

**Ubicación:** `js/pages/productos.js` línea **~643** (función `formatearPrecio`)

**Qué debes hacer:**
1. Buscar el comentario `🎯 RETO 2` en el código
2. Leer la explicación educativa sobre `Intl.NumberFormat`
3. Entender cómo funciona (el código ya funciona correctamente)

**Nota especial:** Este es un **reto educativo**. El código ya está implementado y funciona. Tu tarea es **leer y comprender** cómo funciona el formateo de moneda en JavaScript.

**Pistas incluidas:**
- Explicación completa de `Intl.NumberFormat`
- Parámetros `locale` y `style: 'currency'`
- Ejemplos con diferentes valores
- 45+ líneas de documentación educativa

---

#### 🎯 Reto 3: Mejorar Confirmación al Eliminar (⭐ Fácil - 15 pts)
**Objetivo:** Personalizar el mensaje de confirmación con más detalles del producto.

**Ubicación:** `js/pages/productos.js` línea **~590** (función `confirmarEliminarProducto`)

**Qué debes hacer:**
1. Buscar el comentario `🎯 RETO 3` en el código
2. Encontrar la llamada a `mostrarConfirmacion()`
3. Modificar el mensaje para incluir: precio, stock, advertencia
4. Usar template literals (comillas invertidas `` ` ``)

**Pistas incluidas:**
- Ejemplo de mensaje actual vs mejorado
- Uso de `formatearPrecio()` para mostrar el precio
- Operador ternario para advertencia condicional
- Código completo comentado como referencia

---

#### 🎯 Reto 4: Buscar en Descripción (⭐⭐ Media - 20 pts)
**Objetivo:** Ampliar la búsqueda para incluir la descripción del producto.

**Ubicación:** `js/pages/productos.js` línea **~163** (función `buscarProducto`)

**Qué debes hacer:**
1. Buscar el comentario `🎯 RETO 4` en el código
2. Encontrar la línea que filtra productos por nombre
3. Agregar operador OR (`||`) para incluir descripción
4. Usar optional chaining (`?.`) para evitar errores

**Pistas incluidas:**
- Explicación de operador OR (`||`)
- Qué es optional chaining (`?.`) y por qué usarlo
- Código actual vs código mejorado
- 50+ líneas de instrucciones paso a paso

---

#### 🎯 Reto 5: Contador de Caracteres (⭐⭐ Media - 20 pts)
**Objetivo:** Mostrar cuántos caracteres lleva escritos en el nombre del cliente.

**Ubicación:** `js/pages/clientes.js` línea **~258** (función `crearFormularioCliente`)

**Qué debes hacer:**
1. Buscar el comentario `🎯 RETO 5` en el código
2. Agregar un `<span>` con id `contador-nombre`
3. Agregar evento `oninput` al input de nombre
4. Actualizar el contador dinámicamente con `this.value.length`

**Pistas incluidas:**
- Estructura HTML del contador
- Evento `oninput` con código completo
- Lógica para cambiar color según cantidad
- 60+ líneas de instrucciones y ejemplos

**Ejemplo esperado:**
- Usuario escribe "Juan" → Muestra "4/100 caracteres" en rojo
- Usuario escribe "Juan Pérez" → Muestra "11/100 caracteres" en verde

---

#### 🎯 Reto 6: Exportar a CSV (⭐⭐⭐ Difícil - 20 pts)
**Objetivo:** Crear funcionalidad para descargar productos en formato CSV (Excel).

**Ubicación:**
- **Botón HTML:** `pages/productos.html` línea **~65**
- **Función JavaScript:** `js/pages/productos.js` línea **~890**

**Qué debes hacer:**
1. En `productos.html`: Descomentar el botón "Exportar CSV"
2. En `productos.js`: Descomentar la función `exportarProductosCSV()`
3. Leer y entender cada paso de la función (está completamente documentada)
4. Probar exportando productos

**Pistas incluidas:**
- Explicación de qué es CSV y para qué sirve
- 8 pasos detallados del proceso
- Explicación de `Blob`, `URL.createObjectURL()`, `.join()`, `.map()`
- Código completo con comentarios línea por línea (80+ líneas)

**Criterios de aceptación:**
- Al hacer clic se descarga archivo `.csv`
- El archivo se abre en Excel correctamente
- Nombre del archivo incluye la fecha actual
- Contiene todos los productos filtrados

---

#### 🎯 Reto 7: Agregar Firma en POST/PUT (⭐⭐ Medio - 20 pts)
**Objetivo:** Aprender a **modificar datos ANTES de enviarlos al backend**.

**Ubicación:**
- **POST (Crear):** `js/api/productos.js` línea **~208**
- **PUT (Editar):** `js/api/productos.js` línea **~320**

**Qué debes hacer:**
1. Buscar los comentarios `🎯 RETO 7` en ambas funciones
2. Crear una copia del objeto producto usando spread operator (`...`)
3. Modificar la descripción agregando firma con tu grupo
4. Usar el objeto modificado en el `fetch()`

**Ejemplo esperado:**
```
Descripción original: "Laptop HP"
Después de crear: "Laptop HP [Creado por GRUPO_3]"
Después de editar: "Laptop HP [Creado por GRUPO_3] [Editado por GRUPO_3]"
```

**Pistas incluidas:**
- Explicación completa del spread operator (`...`)
- Template literals para concatenar strings
- Validación de longitud máxima (250 caracteres)
- Código completo comentado como referencia
- 40+ líneas de instrucciones detalladas

**Criterios de aceptación:**
- Las peticiones POST incluyen `[Creado por GRUPO_X]`
- Las peticiones PUT incluyen `[Editado por GRUPO_X]`
- La descripción no excede 250 caracteres
- Se puede verificar en Network tab de DevTools

---

### 🎓 Cómo Trabajar los Retos

#### En Clase 1:
1. Lee el README completo
2. Explora el proyecto funcionando
3. Completa **Retos 1 y 2** (fáciles, 50 minutos)

#### En Clase 2:
1. Completa **Reto 3** (fácil, 20 minutos)
2. Completa **Reto 4** (medio, 45 minutos)
3. Empieza **Reto 5** (medio)

#### En Clase 3:
1. Termina **Reto 5** (30 minutos)
2. Intenta **Reto 6** (difícil, 60 minutos)
3. Prepara presentación y Pull Request

---

### 💡 Pistas Generales

**Todos los retos tienen en el código:**

```javascript
// ============================================
// 🎯 RETO X: [Nombre del Reto]
// ============================================

/**
 * OBJETIVO: [Qué debes lograr]
 * 
 * INSTRUCCIONES:
 * 1. [Paso 1]
 * 2. [Paso 2]
 * 3. [Paso 3]
 * 
 * 💡 PISTA 1: [Primera pista]
 * 💡 PISTA 2: [Segunda pista]
 * 💡 PISTA 3: [Tercera pista]
 * 
 * 📝 EJEMPLO DE CÓDIGO:
 * if (datos.stock < 0) {
 *     errores.push('El stock no puede ser negativo');
 * }
 * 
 * ✅ CRITERIO DE ACEPTACIÓN:
 * - [ ] Se muestra alerta si stock < 0
 * - [ ] No permite guardar
 * - [ ] Mensaje claro al usuario
 */

// AQUÍ VA TU CÓDIGO:
// Descomenta y completa:

// function miSolucion() {
//     // TODO: Tu código aquí
// }
```

---

### ✅ Evaluación

**Mínimo para aprobar:** 4 retos (cualquier combinación que sume ≥50 pts)

**Distribución por dificultad:**
- **Retos Fáciles** (⭐): 10-15 pts cada uno
- **Retos Medios** (⭐⭐): 20 pts cada uno
- **Retos Difíciles** (⭐⭐⭐): 20 pts cada uno

**Ejemplos de combinaciones válidas:**
- Retos 1 + 2 + 3 + 4 = 15 + 10 + 15 + 20 = **60 pts** ✅ (aprobado básico)
- Retos 1 + 2 + 3 + 5 = 15 + 10 + 15 + 20 = **60 pts** ✅ (aprobado básico)
- Retos 1 + 3 + 4 + 5 = 15 + 15 + 20 + 20 = **70 pts** ✅ (aprobado sólido)
- Retos 4 + 5 + 6 + 7 = 20 + 20 + 20 + 20 = **80 pts** ✅ (aprobado avanzado)
- Todos los retos = **120 pts** ✅✅ (excelencia total)

**Nota:** Los retos 1, 2 y 3 son obligatorios para demostrar conocimientos básicos. Los retos 4-7 permiten demostrar habilidades avanzadas.

**Ver GUIA_PROFESOR.md para rúbrica completa.**

---

## 🔌 Conexión con el Backend

### Configuración en `js/config.js`

```javascript
const CONFIG = {
    API_BASE_URL: 'http://localhost:8000/api/v1',
    GRUPO_ESTUDIANTES: 'GRUPO_1', // ⚠️ CAMBIAR POR TU GRUPO
    TIMEOUT: 10000 // 10 segundos
};
```

### Ejemplo de petición GET

```javascript
// En js/api/productos.js
async function obtenerProductos() {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/productos/`);
        
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Ejemplo de petición POST

```javascript
async function crearProducto(producto) {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/productos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Error al crear producto');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Manejo de errores

La aplicación maneja 3 tipos de estados:

1. **⏳ Cargando**: Spinner mientras espera respuesta
2. **✅ Éxito**: Mensaje verde confirmando operación
3. **❌ Error**: Mensaje rojo con descripción del problema

---

## 🐛 Solución de Problemas

### ❌ Backend desconectado

**Síntomas**: Mensaje rojo "Backend desconectado" en la página

**Soluciones**:
1. Verifica que el backend esté ejecutándose:
   ```bash
   cd trabajo-final-backend-fumc
   # Presiona F5 en VS Code
   # O ejecuta: uvicorn main:app --reload
   ```
2. Verifica la URL en `js/config.js`
3. Abre `http://localhost:8000/docs` en el navegador

### ❌ Error de CORS

**Síntomas**: Error en consola "CORS policy blocked"

**Solución**: El backend ya tiene CORS habilitado. Si persiste:
1. Usa Live Server en lugar de abrir el archivo directamente
2. Verifica que el backend tenga `allow_origins=["*"]` en CORS

### ❌ No carga los productos

**Soluciones**:
1. Abre la consola del navegador (F12)
2. Revisa errores en pestaña "Console"
3. Verifica en pestaña "Network" la petición HTTP
4. Confirma que el backend tiene productos:
   ```
   http://localhost:8000/api/v1/productos/
   ```

### ❌ Formulario no guarda

**Soluciones**:
1. Revisa validaciones en la consola
2. Verifica que todos los campos requeridos estén completos
3. Confirma que el backend esté aceptando la petición POST

### 🔍 Herramientas de depuración

**Consola del navegador (F12)**:
```javascript
// Ver configuración actual
console.log(CONFIG);

// Probar endpoint manualmente
fetch('http://localhost:8000/api/v1/productos/')
    .then(r => r.json())
    .then(data => console.log(data));
```

**Network Tab**: Observa las peticiones HTTP en tiempo real

---

## 📚 Recursos Adicionales

### Documentación

- [MDN - Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [JavaScript.info](https://es.javascript.info/)
- [MDN - Manipulación del DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)

### Tutoriales recomendados

- Consumo de APIs REST con JavaScript
- Manipulación dinámica del DOM
- Validación de formularios
- LocalStorage y SessionStorage

### Próximos pasos

Si quieres continuar aprendiendo:

1. **Frameworks modernos**: React, Vue, Angular
2. **TypeScript**: JavaScript con tipos
3. **Build tools**: Webpack, Vite
4. **CSS frameworks**: Tailwind, Bootstrap
5. **Visualización de datos**: D3.js, Chart.js

---

## 👨‍🏫 Notas para el Instructor

### Filosofía del proyecto

- **Aprender haciendo**: Los estudiantes modifican código funcional
- **Comentarios abundantes**: Cada función está explicada
- **Retos progresivos**: De básico a avanzado
- **Arquitectura escalable**: Preparación para frameworks

### Sugerencias de evaluación

1. **Funcionalidad básica** (60%): CRUD completo funcional
2. **Retos completados** (30%): Mínimo 5 retos básicos
3. **Código limpio** (10%): Indentación, comentarios propios

### Tiempo estimado

- Setup inicial: 30 minutos
- Exploración del código: 2 horas
- Completar retos básicos: 3-4 horas
- Retos avanzados: 2-3 horas adicionales

---

## 📄 Licencia

Este proyecto es material educativo para la Fundación Universitaria María Cano.

---

## 👤 Autor

**Instructor**: FUMC Backend Course  
**Curso**: Frameworks para desarrollo web  
**Año**: 2025

---

## 🙏 Agradecimientos

A todos los estudiantes de FUMC que participan en este curso y se esfuerzan por aprender desarrollo web.

**¡Éxitos en tu proyecto final! 🚀**
