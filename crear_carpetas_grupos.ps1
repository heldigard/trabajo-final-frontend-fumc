# ============================================
# Script para crear 12 carpetas de grupos
# ============================================
# Este script copia el proyecto base a 12 carpetas separadas
# Una para cada grupo de estudiantes (grupo-1 a grupo-12)

Write-Host "🚀 Iniciando creación de carpetas para 12 grupos..." -ForegroundColor Cyan
Write-Host ""

# Ruta base (carpeta actual)
$rutaBase = Split-Path -Parent $MyInvocation.MyCommand.Path

# Archivos/carpetas a excluir de la copia
$excluir = @(
    ".git",
    "node_modules",
    ".env.example",
    "crear_carpetas_grupos.ps1",
    "INSTRUCCIONES_GRUPOS.md",
    "COMO_DISTRIBUIR.md",
    "GUIA_PROFESOR.md",
    "MEMORIA_PROYECTO.md",
    "RESUMEN_MEJORAS.md",
    "README.md",
    "grupo-*"
)

# Crear 12 carpetas de grupos
for ($i = 1; $i -le 12; $i++) {
    $nombreGrupo = "grupo-$i"
    $rutaGrupo = Join-Path $rutaBase $nombreGrupo

    Write-Host "📁 Creando $nombreGrupo..." -ForegroundColor Yellow

    # Crear carpeta si no existe
    if (Test-Path $rutaGrupo) {
        Write-Host "   ⚠️  La carpeta ya existe, se omite" -ForegroundColor DarkYellow
        continue
    }

    New-Item -ItemType Directory -Path $rutaGrupo -Force | Out-Null

    # Copiar todos los archivos y carpetas (excepto los excluidos)
    Get-ChildItem -Path $rutaBase -Force | Where-Object {
        $item = $_
        $debeExcluir = $false

        foreach ($patron in $excluir) {
            if ($item.Name -like $patron) {
                $debeExcluir = $true
                break
            }
        }

        -not $debeExcluir
    } | ForEach-Object {
        $destino = Join-Path $rutaGrupo $_.Name

        if ($_.PSIsContainer) {
            # Es una carpeta
            Copy-Item -Path $_.FullName -Destination $destino -Recurse -Force
            Write-Host "   ✅ Copiada carpeta: $($_.Name)" -ForegroundColor Green
        } else {
            # Es un archivo
            Copy-Item -Path $_.FullName -Destination $destino -Force
            Write-Host "   ✅ Copiado archivo: $($_.Name)" -ForegroundColor Green
        }
    }

    # Modificar el archivo config.js para establecer el grupo correcto
    $archivoConfig = Join-Path $rutaGrupo "js\config.js"
    if (Test-Path $archivoConfig) {
        $contenidoConfig = Get-Content $archivoConfig -Raw
        $contenidoConfig = $contenidoConfig -replace "GRUPO_ESTUDIANTES: 'GRUPO_1'", "GRUPO_ESTUDIANTES: 'GRUPO_$i'"

        Set-Content -Path $archivoConfig -Value $contenidoConfig -Encoding UTF8

        Write-Host "   ✅ Configurado config.js con GRUPO_$i" -ForegroundColor Green
    }

    Write-Host ""
}

Write-Host "✨ ¡Proceso completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Resumen:" -ForegroundColor Cyan
Write-Host "   - Se crearon 12 carpetas: grupo-1 a grupo-12"
Write-Host "   - Cada carpeta tiene solo lo esencial (index.html, css, js, pages)"
Write-Host "   - Cada grupo tiene su config.js configurado automáticamente"
Write-Host "   - GUIA_ESTUDIANTES.md en cada carpeta para facilitar el trabajo"
Write-Host ""
Write-Host "🎓 Instrucciones para estudiantes:" -ForegroundColor Yellow
Write-Host "   1. Abrir su carpeta asignada (ejemplo: grupo-3)"
Write-Host "   2. Leer GUIA_ESTUDIANTES.md (guía completa paso a paso)"
Write-Host "   3. Abrir index.html con Live Server"
Write-Host "   4. Completar los 7 retos marcados con 🎯"
Write-Host "   5. Probar que todo funciona correctamente"
Write-Host ""
Write-Host "👨‍🏫 Instrucciones para el profesor:" -ForegroundColor Magenta
Write-Host "   - Archivos de documentación están en la RAÍZ del proyecto"
Write-Host "   - GUIA_PROFESOR.md, README.md, etc. NO están en carpetas de grupos"
Write-Host "   - Cada grupo tiene su GRUPO_X preconfigurado"
Write-Host "   - Verificar en auditoría qué grupo hizo qué cambios"
Write-Host ""
