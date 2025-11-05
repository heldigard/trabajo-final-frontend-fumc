# 📘 GUÍA DEL ESTUDIANTE - Trabajo Final Frontend

> **Fundación Universitaria María Cano (FUMC)**  
> **Asignatura**: Frameworks para Desarrollo Web - Frontend  
> **Fecha**: Noviembre 2025

---

## 📋 Tabla de Contenidos

1. [Introducción](#-introducción)
2. [¿Qué vas a aprender?](#-qué-vas-a-aprender)
3. [Requisitos Previos](#-requisitos-previos)
4. [Instalación Paso a Paso](#-instalación-paso-a-paso)
5. [Estructura del Proyecto](#-estructura-del-proyecto-explicada)
6. [Cómo Funciona la Aplicación](#-cómo-funciona-la-aplicación)
7. [Los 7 Retos](#-los-7-retos-que-debes-completar)
8. [Cómo Ejecutar el Proyecto](#-cómo-ejecutar-el-proyecto)
9. [Solución de Problemas](#-solución-de-problemas-comunes)
10. [Entrega del Trabajo](#-entrega-del-trabajo)

---

## 🎯 Introducción

¡Bienvenido al proyecto final de Frontend! 🎉

Este proyecto es una **aplicación web de Tienda Virtual** construida con **JavaScript Vanilla** (sin frameworks como React o Vue). La aplicación se conecta a un backend (API REST) y te permite:

- ✅ Gestionar productos (crear, editar, eliminar, buscar)
- ✅ Administrar clientes (registrar, actualizar, filtrar)
- ✅ Ver reportes de auditoría (qué operaciones se hicieron)

### ¿Por qué JavaScript Vanilla y no React?

Para que **entiendas los fundamentos** antes de usar frameworks:
- Cómo funciona el DOM
- Cómo se hacen peticiones HTTP
- Cómo se validan datos
- Cómo se estructura un proyecto moderno

Una vez domines esto, aprender React/Vue/Angular será mucho más fácil.

---

## 💡 ¿Qué vas a aprender?

Al completar este proyecto aprenderás:

### 1. **Consumo de APIs REST**
- Hacer peticiones GET, POST, PUT, DELETE
- Enviar y recibir datos JSON
- Manejar errores de red

### 2. **Arquitectura Modular**
- Separar responsabilidades (API, componentes, páginas)
- Reutilizar código
- Organizar archivos como en proyectos reales

### 3. **Manipulación del DOM**
- Crear elementos dinámicamente
- Actualizar la interfaz según datos
- Eventos y formularios

### 4. **Validación de Datos**
- Validar en el frontend antes de enviar al backend
- Mostrar mensajes de error claros

### 5. **JavaScript Moderno (ES6+)**
- `async/await`
- Arrow functions
- Template literals
- Spread operator
- Array methods (.map, .filter, .reduce)

---

## 📦 Requisitos Previos

### 1. Software Necesario

| Software | ¿Para qué? | Descarga |
|----------|------------|----------|
| **VS Code** | Editor de código | https://code.visualstudio.com/ |
| **Live Server** | Servidor local para el frontend | Extensión de VS Code |
| **Navegador Moderno** | Chrome, Firefox o Edge | Ya lo tienes |
| **Backend ejecutándose** | API REST (tu profesor lo tiene) | Pregunta a tu profesor |

### 2. Conocimientos Previos

- ✅ HTML básico (etiquetas, atributos)
- ✅ CSS básico (selectores, estilos)
- ✅ JavaScript básico (variables, funciones, if/else)
- ✅ Saber abrir la consola del navegador (F12)

**No necesitas saber:**
- ❌ React, Vue, Angular
- ❌ TypeScript
- ❌ Webpack, Vite
- ❌ Node.js

---

## 🚀 Instalación Paso a Paso

### Paso 1: Obtener el Proyecto

Tu profesor te dará una carpeta con tu número de grupo. Por ejemplo:

```
GRUPO_1/
GRUPO_2/
GRUPO_3/
...
GRUPO_12/
```

**Ubica la carpeta de tu grupo** y ábrela en VS Code:

1. Abre VS Code
2. **File** → **Open Folder...**
3. Selecciona tu carpeta (ej: `GRUPO_3`)
4. Clic en **Select Folder**

### Paso 2: Configurar tu Grupo

Abre el archivo `js/config.js` y cambia el nombre de tu grupo:

```javascript
// 📍 LÍNEA 22 de js/config.js
GRUPO_ESTUDIANTES: 'GRUPO_1',  // ⚠️ CAMBIAR POR TU GRUPO
```

**Cambiar por:**
```javascript
GRUPO_ESTUDIANTES: 'GRUPO_3',  // Si eres del grupo 3
```

### Paso 3: Instalar Live Server

Si no tienes Live Server instalado:

1. En VS Code, presiona **Ctrl + Shift + X** (Extensions)
2. Busca: **"Live Server"**
3. Instala la extensión de **Ritwick Dey**
4. Reinicia VS Code

### Paso 4: Verificar que el Backend esté Corriendo

Pregunta a tu profesor la URL del backend. Debería ser algo como:

```
http://localhost:8000
```

Abre esa URL en tu navegador y agrega `/docs`:

```
http://localhost:8000/docs
```

Deberías ver la **documentación interactiva de la API**. Si no la ves, avisa a tu profesor.

---

## 📁 Estructura del Proyecto (Explicada)

```
trabajo-final-frontend-fumc/
│
├── index.html              # 🏠 Página principal (Dashboard)
├── GUIA_ESTUDIANTES.md     # 📘 Esta guía (léela completa)
├── README.md               # 📄 Documentación técnica
│
├── css/
│   └── styles.css          # 🎨 Estilos de toda la aplicación
│
├── js/                     # 💻 TODO EL CÓDIGO JAVASCRIPT
│   │
│   ├── config.js           # ⚙️ Configuración (URL del backend, tu grupo)
│   │
│   ├── utils/              # 🛠️ Funciones reutilizables
│   │   ├── formatters.js   # Formato de precios, fechas
│   │   ├── validators.js   # Validaciones de formularios (RETO 1)
│   │   └── ui.js           # Funciones de interfaz (alertas, spinners)
│   │
│   ├── api/                # 🌐 Comunicación con el backend
│   │   ├── productos.js    # Funciones para productos (RETO 7)
│   │   ├── clientes.js     # Funciones para clientes
│   │   └── auditoria.js    # Funciones para auditoría
│   │
│   ├── components/         # 🧩 Componentes reutilizables
│   │   ├── navbar.js       # Barra de navegación
│   │   └── modal.js        # Sistema de modales
│   │
│   └── pages/              # 📄 Lógica de cada página
│       ├── productos.js    # Gestión de productos (RETOS 3, 4, 6)
│       ├── clientes.js     # Gestión de clientes (RETO 5)
│       └── auditoria.js    # Reportes de auditoría
│
└── pages/                  # 📱 Páginas HTML
    ├── productos.html      # Página de productos
    ├── clientes.html       # Página de clientes
    └── auditoria.html      # Página de auditoría
```

### ¿Por qué esta organización?

Esta estructura es similar a frameworks modernos:

- **`api/`** → Como "services" en Angular o "api calls" en React
- **`components/`** → Como componentes en React/Vue
- **`pages/`** (JS) → Como "containers" o "pages" en Next.js
- **`utils/`** → Funciones auxiliares compartidas

---

## 🎮 Cómo Funciona la Aplicación

### Flujo de Datos

```
┌─────────────┐
│   Usuario   │
│   (TÚ)      │
└──────┬──────┘
       │ 1. Interactúa
       ↓
┌─────────────────────┐
│  Interfaz (HTML)    │ ← pages/*.html
│  Botones, Tablas    │
└──────┬──────────────┘
       │ 2. Evento (click, input)
       ↓
┌─────────────────────┐
│  Lógica de Página   │ ← js/pages/*.js
│  (productos.js)     │   - Maneja el evento
└──────┬──────────────┘   - Valida datos
       │ 3. Llama a la API
       ↓
┌─────────────────────┐
│  Servicio de API    │ ← js/api/*.js
│  (productos.js)     │   - Hace fetch()
└──────┬──────────────┘   - Envía/recibe JSON
       │ 4. Petición HTTP
       ↓
┌─────────────────────┐
│    BACKEND          │
│  (FastAPI/Python)   │ ← Tu profesor lo tiene
│  Base de Datos      │
└──────┬──────────────┘
       │ 5. Respuesta JSON
       ↓
     (VUELVE AL PASO 3)
```

### Ejemplo Práctico: Crear un Producto

1. **Usuario**: Hace clic en "➕ Nuevo Producto"
2. **pages/productos.js**: Abre el modal con el formulario
3. **Usuario**: Llena el formulario y hace clic en "Guardar"
4. **pages/productos.js**: Valida los datos (llama a `validarDatosProducto()`)
5. **pages/productos.js**: Si es válido, llama a `crearProducto(datos)`
6. **api/productos.js**: Hace `fetch()` POST al backend
7. **Backend**: Guarda en la base de datos y responde con el producto creado
8. **api/productos.js**: Devuelve la respuesta
9. **pages/productos.js**: Muestra alerta de éxito y recarga la tabla

---

## 🎯 Los 7 Retos que Debes Completar

Todos los retos están **insertados en el código** con comentarios detallados.  
Busca `🎯 RETO` en los archivos.

### Distribución de Retos por Archivo

| # | Reto | Archivo | Dificultad | Tiempo | Puntos |
|---|------|---------|------------|--------|--------|
| **1** | Validar stock negativo | `js/utils/validators.js` | ⭐ Fácil | 20 min | 15 pts |
| **2** | Formato de precios | `js/utils/formatters.js` | ⭐ Educativo | 15 min | 10 pts |
| **3** | Confirmación al eliminar | `js/pages/productos.js` | ⭐ Fácil | 20 min | 15 pts |
| **4** | Buscar en descripción | `js/pages/productos.js` | ⭐⭐ Medio | 25 min | 15 pts |
| **5** | Contador de caracteres | `js/pages/clientes.js` | ⭐⭐ Medio | 30 min | 15 pts |
| **6** | Exportar a CSV | `js/pages/productos.js` | ⭐⭐⭐ Difícil | 45 min | 15 pts |
| **7** | Agregar firma en POST/PUT | `js/api/productos.js` | ⭐⭐ Medio | 30 min | 15 pts |

**Total**: 100 puntos | Tiempo estimado: 3 horas

---

### 📝 Descripción Detallada de Cada Reto

#### 🎯 RETO 1: Validar Stock Negativo (⭐ Fácil)

**Archivo**: `js/utils/validators.js` (línea ~65)

**Objetivo**: Evitar que se creen productos con stock negativo.

**Qué hacer**:
1. Abre `js/utils/validators.js`
2. Busca el comentario `🎯 RETO 1`
3. Lee las instrucciones completas (40+ líneas de ayuda)
4. Descomenta las 3 líneas de código indicadas

**Cómo probar**:
- Intenta crear un producto con stock = -5
- Debe mostrar una alerta: "El stock no puede ser negativo"
- El producto NO debe guardarse

**Pistas**: El código ya está escrito, solo debes descomentarlo.

---

#### 🎯 RETO 2: Formato de Precios (⭐ Educativo)

**Archivo**: `js/utils/formatters.js` (línea ~13)

**Objetivo**: **APRENDER** cómo funciona el formato de precios colombiano.

**Qué hacer**:
1. Abre `js/utils/formatters.js`
2. Busca el comentario `🎯 RETO 2`
3. **Lee la explicación completa** (45+ líneas educativas)
4. Entiende cómo funciona `Intl.NumberFormat`

**Nota Especial**: Este reto es **solo lectura**. El código ya funciona.  
Tu tarea es **comprender** cómo formatea números a pesos colombianos: $2.500.000

**Cómo probar**:
- Abre la consola del navegador (F12)
- Escribe: `formatearPrecio(2500000)`
- Debe mostrar: "$2.500.000"

---

#### 🎯 RETO 3: Mejorar Confirmación al Eliminar (⭐ Fácil)

**Archivo**: `js/pages/productos.js` (línea ~590)

**Objetivo**: Personalizar el mensaje de confirmación con más detalles del producto.

**Qué hacer**:
1. Abre `js/pages/productos.js`
2. Busca el comentario `🎯 RETO 3`
3. Modifica el mensaje de `mostrarConfirmacion()` para incluir:
   - Nombre del producto
   - Precio formateado
   - Stock disponible
   - Advertencia si tiene stock > 0

**Ejemplo**:
```javascript
// Mensaje ACTUAL:
"¿Estás seguro de eliminar este producto?"

// Mensaje MEJORADO:
`¿Eliminar el producto?

Nombre: ${producto.nombre}
Precio: ${formatearPrecio(producto.precio)}
Stock: ${producto.stock} unidades

${producto.stock > 0 ? '⚠️ Este producto aún tiene stock disponible' : ''}`
```

**Cómo probar**:
- Ve a Productos
- Haz clic en "🗑️ Eliminar" en cualquier producto
- El mensaje debe mostrar la información completa

---

#### 🎯 RETO 4: Buscar en Descripción (⭐⭐ Medio)

**Archivo**: `js/pages/productos.js` (línea ~163)

**Objetivo**: Ampliar la búsqueda para incluir la descripción del producto.

**Qué hacer**:
1. Abre `js/pages/productos.js`
2. Busca el comentario `🎯 RETO 4`
3. Encuentra la línea: `producto.nombre?.toLowerCase().includes(termino)`
4. Agrega el operador OR (`||`) para buscar también en `descripcion`
5. Usa optional chaining (`?.`) para evitar errores

**Código actual**:
```javascript
const cumpleBusqueda = !termino || producto.nombre?.toLowerCase().includes(termino);
```

**Código mejorado**:
```javascript
const cumpleBusqueda = !termino || 
    producto.nombre?.toLowerCase().includes(termino) ||
    producto.descripcion?.toLowerCase().includes(termino);
```

**Cómo probar**:
- Ve a Productos
- Crea un producto: Nombre "Laptop", Descripción "HP para programación"
- Busca "HP" en el campo de búsqueda
- Debe encontrar el producto (busca en descripción)

---

#### 🎯 RETO 5: Contador de Caracteres (⭐⭐ Medio)

**Archivo**: `js/pages/clientes.js` (línea ~258)

**Objetivo**: Mostrar cuántos caracteres lleva escritos el nombre del cliente.

**Qué hacer**:
1. Abre `js/pages/clientes.js`
2. Busca el comentario `🎯 RETO 5`
3. Agrega un `<span>` para mostrar el contador
4. Escucha el evento `input` del campo nombre
5. Actualiza el contador en tiempo real

**Ejemplo visual**:
```
Nombre: [ Juan Pérez_________ ]  15/100 caracteres
```

**Cómo probar**:
- Ve a Clientes
- Haz clic en "➕ Nuevo Cliente"
- Escribe en el campo Nombre
- Debe mostrar: "X/100 caracteres" (actualizándose en tiempo real)

---

#### 🎯 RETO 6: Exportar a CSV (⭐⭐⭐ Difícil)

**Archivo**: `js/pages/productos.js` (línea ~890) + `pages/productos.html` (línea ~65)

**Objetivo**: Descargar los productos en formato CSV (Excel).

**Qué hacer**:
1. En `pages/productos.html`: Descomenta el botón "Exportar CSV"
2. En `js/pages/productos.js`: Descomenta la función `exportarProductosCSV()`
3. Lee cada paso y entiende cómo funciona
4. Prueba exportando productos

**Conceptos que aprenderás**:
- ¿Qué es CSV? (Comma-Separated Values)
- Cómo crear archivos en memoria con `Blob`
- Cómo descargar archivos con JavaScript

**Cómo probar**:
- Ve a Productos
- Haz clic en "📥 Exportar CSV"
- Se descarga un archivo `productos_FECHA.csv`
- Abre el archivo en Excel → Debe mostrar los productos en tabla

---

#### 🎯 RETO 7: Agregar Firma en POST/PUT (⭐⭐ Medio) ✨ NUEVO

**Archivo**: `js/api/productos.js` (líneas ~208 y ~320)

**Objetivo**: Aprender a **modificar datos ANTES de enviarlos al backend**.

**Contexto**: Cuando creas o editas un producto, agregarás una "firma" con tu grupo al final de la descripción para identificar quién lo modificó.

**Ejemplo**:
```
Descripción original: "Laptop de alto rendimiento"
Descripción con firma: "Laptop de alto rendimiento [Creado por GRUPO_3]"
```

**Qué hacer**:

**Parte 1 - POST (Crear)**:
1. Abre `js/api/productos.js`
2. Busca `🎯 RETO 7` en la función `crearProducto()`
3. Crea una copia del objeto producto usando spread operator
4. Modifica la descripción agregando la firma
5. Usa el objeto modificado en el `fetch()`

**Código de referencia**:
```javascript
// Crear copia
const productoConFirma = { ...producto };

// Agregar firma
productoConFirma.descripcion = `${producto.descripcion || ''} [Creado por ${CONFIG.GRUPO_ESTUDIANTES}]`;

// Verificar longitud (máximo 250 caracteres)
if (productoConFirma.descripcion.length > 250) {
    productoConFirma.descripcion = productoConFirma.descripcion.substring(0, 250);
}

// Usar en el fetch
body: JSON.stringify(productoConFirma),
```

**Parte 2 - PUT (Editar)**:
1. Busca `🎯 RETO 7 (CONTINUACIÓN)` en la función `actualizarProductoCompleto()`
2. Repite el proceso, pero usa `[Editado por GRUPO_X]`

**Cómo probar**:
1. Crea un producto con descripción "Laptop HP"
2. Guarda → Ve a la tabla de productos
3. La descripción debe mostrar: "Laptop HP [Creado por GRUPO_3]"
4. Edita el producto
5. La descripción debe mostrar: "Laptop HP [Creado por GRUPO_3] [Editado por GRUPO_3]"

**Qué aprendes**:
- ✅ Cómo modificar datos antes de enviarlos
- ✅ Uso del spread operator (`...`)
- ✅ Template literals (`` ` ``)
- ✅ Manipulación de strings
- ✅ Cómo funciona el body de POST/PUT

**Verificación con DevTools**:
1. Abre DevTools (F12) → Network
2. Crea un producto
3. Mira la petición POST a `/productos/`
4. En "Payload" verás la descripción con la firma

---

## ▶️ Cómo Ejecutar el Proyecto

### Opción 1: Con Live Server (Recomendado)

1. Abre el proyecto en VS Code
2. **Click derecho** en `index.html`
3. Selecciona **"Open with Live Server"**
4. Se abre automáticamente en: `http://127.0.0.1:5500`

### Opción 2: Doble Clic

1. Navega a la carpeta del proyecto
2. Doble clic en `index.html`
3. Se abre en tu navegador predeterminado

⚠️ **Nota**: Algunos navegadores pueden tener problemas con CORS si abres directamente el archivo. Usa Live Server para evitar esto.

### Verificar Conexión con Backend

1. Mira la barra de navegación superior
2. Debería decir: **"🟢 Conectado al Backend"**
3. Si dice **"🔴 Sin Conexión"**:
   - Verifica que el backend esté corriendo
   - Pregunta a tu profesor la URL correcta
   - Revisa `js/config.js` → `API_BASE_URL`

---

## 🐛 Solución de Problemas Comunes

### Problema 1: "🔴 Sin Conexión al Backend"

**Causa**: El backend no está ejecutándose o la URL es incorrecta.

**Solución**:
1. Pregunta a tu profesor si el backend está corriendo
2. Verifica la URL en `js/config.js` línea 22
3. Abre la URL del backend en el navegador (debería funcionar)

---

### Problema 2: "Error 404 Not Found"

**Causa**: La URL del endpoint es incorrecta.

**Solución**:
1. Abre DevTools (F12) → Console
2. Mira qué URL está fallando
3. Compara con la documentación del backend (`http://localhost:8000/docs`)

---

### Problema 3: "No se ven los productos/clientes"

**Causa**: No hay datos en la base de datos.

**Solución**:
1. Ve a la página de Productos
2. Crea productos manualmente desde la interfaz
3. Haz lo mismo con Clientes

---

### Problema 4: "La búsqueda no funciona"

**Causa**: No completaste el RETO 4.

**Solución**:
1. Abre `js/pages/productos.js`
2. Busca `🎯 RETO 4`
3. Completa el reto

---

### Problema 5: "Error: Cannot read property 'toLowerCase' of undefined"

**Causa**: No estás usando optional chaining (`?.`).

**Solución**:
```javascript
// ❌ INCORRECTO:
producto.nombre.toLowerCase()

// ✅ CORRECTO:
producto.nombre?.toLowerCase()
```

El `?.` evita errores si `nombre` es `null` o `undefined`.

---

### Problema 6: "Mi grupo no aparece en Auditoría"

**Causa**: No configuraste tu grupo en `config.js`.

**Solución**:
1. Abre `js/config.js`
2. Línea 22: `GRUPO_ESTUDIANTES: 'GRUPO_1'`
3. Cambia por tu grupo: `'GRUPO_3'`
4. Guarda y recarga la página

---

## 📤 Entrega del Trabajo

### ¿Qué debes entregar?

1. **Carpeta completa del proyecto** con todos los retos completados
2. **Archivo README.md actualizado** con:
   - Nombres de los integrantes del grupo
   - Número de grupo
   - Fecha de entrega
   - Breve descripción de lo que hicieron

### Formato de Entrega

**Opción A**: Carpeta comprimida (.zip)
```
GRUPO_3_TrabajoFinal.zip
```

**Opción B**: Repositorio de GitHub
```
https://github.com/tu-usuario/trabajo-final-frontend-fumc
```

### Criterios de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| **Retos Completados** | 70 pts | Todos los retos funcionando correctamente |
| **Código Limpio** | 10 pts | Código ordenado, sin errores en consola |
| **Funcionalidad** | 10 pts | La aplicación funciona sin errores |
| **Documentación** | 10 pts | README actualizado con nombres y grupo |

**Total**: 100 puntos

---

## 🎓 Recomendaciones Finales

### Para Aprobar

✅ Completa los 7 retos siguiendo las instrucciones  
✅ Prueba cada reto después de completarlo  
✅ Lee los comentarios del código, son muy educativos  
✅ No copies código sin entenderlo  
✅ Pregunta a tu profesor si tienes dudas

### Para Destacar

⭐ Agrega validaciones adicionales  
⭐ Mejora los estilos CSS  
⭐ Crea nuevas funcionalidades (con aprobación del profesor)  
⭐ Documenta tu código con comentarios claros

### Herramientas Útiles

- **DevTools del Navegador** (F12): Para ver peticiones, errores, consola
- **VS Code Extensions**: 
  - Live Server
  - ESLint (opcional, para código limpio)
  - Prettier (opcional, para formatear código)

---

## 📞 ¿Necesitas Ayuda?

1. **Primero**: Lee esta guía completa
2. **Segundo**: Lee los comentarios en el código (son muy detallados)
3. **Tercero**: Abre DevTools (F12) y mira la consola
4. **Cuarto**: Consulta con tus compañeros de grupo
5. **Último**: Pregunta a tu profesor

---

## 🎉 ¡Éxito en tu Proyecto!

Recuerda que el objetivo es **APRENDER**, no solo completar retos.  
Entiende cada línea de código que escribes.

**¡Mucha suerte! 🚀**

---

**Fundación Universitaria María Cano**  
Noviembre 2025
