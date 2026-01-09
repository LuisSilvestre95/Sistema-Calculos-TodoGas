# 🌟 TODO GAS SYR S.A.S

## 📊 Sistema Profesional de Cálculo de Redes de Gas Natural y GLP

<div align="center">

![Estado](https://img.shields.io/badge/Estado-Producción-brightgreen?style=for-the-badge)
![Versión](https://img.shields.io/badge/Versión-2.2.0-blue?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-Propietaria-red?style=for-the-badge)

**Solución integral para el diseño, cálculo y optimización de redes de distribución de gas**

</div>

---

## 🎯 Descripción General

**TODO GAS SYR S.A.S** ofrece una plataforma web profesional y completa para calcular, diseñar y validar redes de gas natural (GN) y GLP con precisión ingenieril. La aplicación integra algoritmos avanzados de termodinámica, análisis de presión y validación de parámetros según normas técnicas internacionales.

**Ideal para:**
- ✅ Ingenieros de diseño de redes de gas
- ✅ Proyectistas de instalaciones de gas
- ✅ Distribuidoras de gas natural
- ✅ Distribuidoras de GLP
- ✅ Consultores energéticos
- ✅ Entidades de control y supervisión

---

## 🚀 Características Principales

### 🔧 **Funcionalidades Núcleo**

| Característica | Descripción |
|---|---|
| 📋 **Gestión de Clientes** | Registro completo con validación de datos y almacenamiento persistente |
| 🧮 **Cálculos Avanzados** | Pérdida de presión, velocidad del gas, análisis termodinámico |
| 🌐 **Análisis de Red** | Validación de conectividad, detección de ciclos, topología de nodos |
| ✔️ **Validación Inteligente** | Verificación de velocidades, presiones, diámetros y coeficientes |
| 📄 **Reportes PDF** | Exportación profesional con gráficos, tablas y análisis detallado |
| 💾 **Almacenamiento Local** | Datos persistentes sin necesidad de servidor |

### 📱 **Interfaz de Usuario**

- 🎨 Diseño responsivo y moderno
- ⌨️ Navegación intuitiva por pestañas
- 📊 Tablas interactivas con edición en vivo
- ⚡ Alertas dinámicas y validación en tiempo real
- 🎯 Modal de confirmación para operaciones críticas
- ♿ Accesibilidad mejorada y navegación por teclado

---

## 📂 Estructura del Proyecto

```
sitio-todogas2/
│
├── 📄 index.html                 # Aplicación web principal (1100 líneas)
├── 📄 index.html.backup          # Respaldo de versión anterior
├── 📋 README.md                  # Documentación completa
│
├── 📁 assets/
│   ├── 🎨 css/
│   │   └── styles.css            # Estilos CSS completos y optimizados
│   │
│   ├── ⚙️ js/                    # Módulos JavaScript modularizados
│   │   ├── config.js             # Configuración del sistema
│   │   ├── utils.js              # Funciones de utilidad
│   │   ├── calculation.js        # Motor de cálculos termodinámicos
│   │   ├── client.js             # Gestión de datos del cliente
│   │   ├── segments.js           # Gestión y análisis de tramos
│   │   ├── visualization.js      # Gráficos y visualización
│   │   ├── export.js             # Exportación a PDF
│   │   ├── cities.js             # Base de datos de ciudades colombianas
│   │   └── init.js               # Inicialización de la aplicación
│   │
│   ├── 🌐 favicon/
│   │   └── site.webmanifest      # Configuración PWA
│   │
│   └── 🖼️ images/
│       ├── Logo 2025.png         # Logo empresarial
│       └── firma.png             # Firma profesional
│
└── .git/                         # Control de versiones Git
```

---

## 🛠️ Requisitos del Sistema

| Requisito | Especificación |
|---|---|
| 🌐 **Navegador** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| 💾 **Almacenamiento** | localStorage habilitado (mín. 5MB) |
| 🔌 **Conexión** | Internet para librerías CDN (jsPDF, AutoTable, SweetAlert2) |
| 📊 **Resolución** | Mín. 1024×768px (responsive) |

---

## 📖 Guía de Uso

### 🎬 Inicio Rápido

#### **Paso 1️⃣: Abrir la Aplicación**
```
Abra index.html en su navegador web
```

#### **Paso 2️⃣: Registro de Cliente** (Pestaña 1)
Complete los siguientes campos:

| Campo | Descripción | Ejemplo |
|---|---|---|
| 📑 Tipo de Identificación | CC, NIT, Pasaporte, etc. | CC |
| 🔢 Número | Documento sin puntos ni guiones | 1012427712 |
| 👤 Nombre/Razón Social | Nombre completo o empresa | ABC Distribuidora |
| 📞 Teléfono de Contacto | Número de contacto | 3015949331 |
| 🏠 Dirección | Ubicación completa | Calle 28 #18-38 |
| 🌍 Municipio/Departamento | Ciudad y región | Tunja, Boyacá |
| 🏢 Tipo de Proyecto | Red nueva, ampliación, etc. | Red nueva |
| ⛽ Tipo de Gas | Gas Natural (GN) o GLP | Gas Natural |
| 📈 Nivel de Presión | Baja o Media Presión | Baja Presión |

#### **Paso 3️⃣: Guardar Datos**
```
Haga click en "💾 Guardar Datos"
→ Se mostrará resumen automático
→ Se habilita la pestaña de cálculos
```

#### **Paso 4️⃣: Ingreso de Tramos** (Pestaña 2)

Agregue cada tramo de la red con estos parámetros:

| Parámetro | Unidad | Rango | Descripción |
|---|---|---|---|
| 🔗 **Nodo Inicial** | - | - | Punto de partida (ej: A, 1, N1) |
| 🔗 **Nodo Final** | - | - | Punto de destino (ej: B, 2, N2) |
| 📊 **Caudal (Q)** | m³/h | > 0 | Flujo volumétrico de gas |
| 📏 **Longitud (L)** | m | > 0.3 | Extensión del tubo |
| 🔌 **Diámetro (D)** | mm | 12, 16, 20, 25, 32, 40, 50 | Valores estándar |
| 🔵 **Presión Inicial (P₁)** | mbar | 0-5000 | Presión al inicio |
| 🧱 **Material** | - | PE AL PE, Cobre, Acero | Composición del tubo |

**Materiales y Factores:**
```
• PE AL PE (Polietileno Aluminio): Factor LE = 1.2
• Cobre:          Factor LE = 1.15
• Acero:          Factor LE = 1.25
```

#### **Paso 5️⃣: Cálculo de la Red**
```
Haga click en "🧮 Calcular Red"
→ Sistema valida conectividad
→ Calcula presiones en cada nodo
→ Genera gráficos y resultados
```

#### **Paso 6️⃣: Revisar Resultados**
```
✅ Tabla dinámica con todos los parámetros
✅ Gráficos de presión y velocidad
✅ Indicadores de validación por tramo
✅ Sugerencias de optimización
```

#### **Paso 7️⃣: Editar/Eliminar Tramos**
```
📝 Click en el botón de edición para modificar
🗑️ Click en eliminar para remover
↻ Recalcular automáticamente
```

#### **Paso 8️⃣: Exportar Informe PDF**
```
Haga click en "📄 Exportar a PDF"
→ Se descarga informe completo con:
   • Logo y datos del cliente
   • Tabla detallada de cálculos
   • Gráficos profesionales
   • Firma de ingeniería
```

---

## ⚙️ Parámetros de Validación

### 🔴 **Redes de Baja Presión - Gas Natural**

| Parámetro | Límite | Criterio |
|---|---|---|
| 🔵 Presión Inicial Máxima | 30 mbar | Regulación normativa |
| ⚡ Velocidad Máxima | 6 m/s | Seguridad y ruido |
| 📉 Pérdida Máxima | 10% P₁ | Caída de presión permitida |
| 📏 Longitud Mínima | 0.3 m | Resolución mínima |
| 📊 Relación L/D Mínima | 10 | Ratio de longitud/diámetro |

### 🟠 **Redes de Baja Presión - GLP**

| Parámetro | Límite | Criterio |
|---|---|---|
| 🔵 Presión Inicial Máxima | 30 mbar | Mayor densidad que GN |
| ⚡ Velocidad Máxima | 5 m/s | GLP requiere velocidad menor |
| 📉 Pérdida Máxima | 8% P₁ | Más restrictivo que GN |
| 📏 Longitud Mínima | 0.5 m | Mayor que GN |
| 📊 Relación L/D Mínima | 10 | Misma que GN |

### 🟡 **Redes de Media Presión - Gas Natural**

| Parámetro | Límite | Criterio |
|---|---|---|
| 🔵 Rango de Presión | 100-5000 mbar | Presiones intermedias |
| ⚡ Velocidad Máxima | 10 m/s | Mayor que baja presión |
| 📉 Pérdida Máxima | 20% P₁ | Mayor tolerancia |
| 📏 Longitud Mínima | 0.5 m | Distancias mayores |
| 📊 Relación L/D Mínima | 10 | Estándar industrial |

### 🟢 **Redes de Media Presión - GLP**

| Parámetro | Límite | Criterio |
|---|---|---|
| 🔵 Rango de Presión | 100-5000 mbar | Rango operacional |
| ⚡ Velocidad Máxima | 8 m/s | Conservador para GLP |
| 📉 Pérdida Máxima | 15% P₁ | Balance seguridad-eficiencia |
| 📏 Longitud Mínima | 0.8 m | Mayor que GN |
| 📊 Relación L/D Mínima | 10 | Estándar industrial |

---

## 🧪 Motor de Cálculos

### 📐 **Fórmulas Implementadas**

#### 1️⃣ Longitud Equivalente (LE)
```
LE = L × Factor_Material

Donde:
  L = Longitud real del tramo (m)
  Factor_Material = 1.2 (PE AL PE), 1.15 (Cobre), 1.25 (Acero)
```

#### 2️⃣ Pérdida de Presión (ΔP)
```
Fórmula de Colebrook-White adaptada para gas

ΔP = f × (L/D) × (ρ × V²) / 2

Donde:
  f = Factor de fricción (dependiente del gas)
  L = Longitud equivalente (m)
  D = Diámetro interno (mm)
  ρ = Densidad del gas (kg/m³)
  V = Velocidad del fluido (m/s)
```

#### 3️⃣ Velocidad del Gas (V)
```
V = Q / A = (Q × 4) / (π × D²)

Donde:
  Q = Caudal (m³/h)
  D = Diámetro (mm)
  A = Área de sección transversal (mm²)
```

#### 4️⃣ Presión Final (P₂)
```
P₂ = P₁ - ΔP

Donde:
  P₁ = Presión inicial (mbar)
  ΔP = Caída de presión calculada (mbar)
  P₂ = Presión final (mbar)
```

### ✅ **Validación Multicriterio**

```
✓ Velocidad dentro de límites
✓ Pérdida de presión dentro de límites
✓ Diámetro en valores estándar
✓ Presión final > 0 mbar
✓ Caudal > 0 m³/h
✓ Longitud > mínimo especificado
✓ Relación L/D dentro de norma
✓ Conectividad de nodos validada
```

---

## 💾 Almacenamiento de Datos

### 📍 Ubicación: localStorage del Navegador

**Ventajas:**
- ✅ No requiere servidor
- ✅ Datos persistentes entre sesiones
- ✅ Privacidad: datos en el dispositivo
- ✅ Acceso instantáneo
- ✅ Capacidad: ~5-10MB

**Datos Guardados:**
```
• Información del cliente (nombre, contacto, ubicación)
• Todos los tramos de red ingresados
• Resultados de cálculos
• Configuración de preferencias
```

**Limpiar Datos:**
```
Botón "🗑️ Limpiar Todo" → Elimina toda la información
(Requiere confirmación)
```

---

## 🎨 Personalización y Configuración

### 🌈 **Modificar Colores**

Edite `assets/css/styles.css`:

```css
:root {
    --primary-color: #2c3e50;        /* Azul principal */
    --secondary-color: #3498db;      /* Azul secundario */
    --accent-color: #FFB703;         /* Naranja/Oro */
    --success-color: #27ae60;        /* Verde */
    --danger-color: #e74c3c;         /* Rojo */
    --warning-color: #f39c12;        /* Amarillo */
}
```

### ⚙️ **Agregar Nuevos Materiales**

Edite `assets/js/config.js`:

```javascript
materiales: {
    'PE AL PE': { rugosidad: 0.007, factorLE: 1.2 },
    'Cobre': { rugosidad: 0.005, factorLE: 1.15 },
    'Acero': { rugosidad: 0.010, factorLE: 1.25 },
    'Tu Material': { rugosidad: 0.xxx, factorLE: 1.x }
}
```

### 🔧 **Modificar Límites de Validación**

Edite `assets/js/config.js`:

```javascript
limites: {
    baja: {
        presionMax: 30,
        velocidadMax: { GN: 6, GLP: 5 },
        perdidaMax: { GN: 0.10, GLP: 0.08 }
    },
    media: {
        presionMin: 100,
        presionMax: 5000,
        velocidadMax: { GN: 10, GLP: 8 }
    }
}
```

---

## 🔒 Seguridad

| Aspecto | Implementación |
|---|---|
| 🛡️ **Validación de Entrada** | Sanitización de todos los campos |
| 🔐 **Almacenamiento** | Datos locales, no transmitidos |
| ⚔️ **CSP Compatible** | Content Security Policy normativo |
| 🔒 **Privacidad** | Sin tracking, sin cookies de terceros |
| ✅ **Integridad** | Validación de datos en múltiples capas |

---

## 🐛 Resolución de Problemas

### ❓ El logo no se muestra

**Causa probable:** Ruta incorrecta del archivo

**Solución:**
```
✓ Verificar que existe: assets/images/Logo 2025.png
✓ Revisar permisos de lectura
✓ Limpiar caché del navegador (Ctrl+Shift+Delete)
```

### ❓ Los datos no se guardan

**Causa probable:** localStorage deshabilitado

**Solución:**
```
✓ Verificar navegador: Privacidad → localStorage habilitado
✓ Aumentar espacio de almacenamiento en navegador
✓ Probar en navegador diferente
```

### ❓ El PDF no se genera

**Causa probable:** Librerías CDN no cargadas

**Solución:**
```
✓ Verificar conexión a internet
✓ Revisar consola de errores (F12 → Console)
✓ Probar en navegador diferente
✓ Deshabilitar extensiones de navegador
```

### ❓ Los cálculos no coinciden

**Causa probable:** Valores fuera de rango

**Solución:**
```
✓ Revisar que todos los valores estén dentro de los límites
✓ Verificar unidades (mbar, m, m³/h, mm)
✓ Confirmar tipo de gas seleccionado
✓ Validar nivel de presión
```

### ❓ La red no se calcula

**Causa probable:** Nodos no conectados

**Solución:**
```
✓ Verificar que los nodos formen red conectada
✓ No deben existir nodos aislados
✓ Revisar nombres de nodos (sin espacios, sin caracteres especiales)
✓ Usar nomenclatura consistente (A, B, C o 1, 2, 3)
```

---

## 📚 Documentación Técnica

### 📋 Módulos JavaScript

| Módulo | Función | Líneas |
|---|---|---|
| `config.js` | Configuración global, límites, materiales | ~150 |
| `utils.js` | Funciones de utilidad comunes | ~200 |
| `calculation.js` | Motor de cálculos termodinámicos | ~400 |
| `client.js` | Gestión de datos del cliente | ~250 |
| `segments.js` | Gestión y análisis de tramos | ~350 |
| `visualization.js` | Gráficos y visualización con Chart.js | ~300 |
| `export.js` | Exportación a PDF con jsPDF | ~400 |
| `cities.js` | Base de datos de ciudades colombianas | ~600 |
| `init.js` | Inicialización y event listeners | ~200 |

### 📦 Dependencias Externas

| Librería | Versión | Propósito |
|---|---|---|
| **jsPDF** | 2.5.1 | Generación de PDF |
| **AutoTable** | 3.7.1 | Tablas en PDF |
| **SweetAlert2** | 11.x | Alertas personalizadas |
| **Font Awesome** | 6.4.0 | Iconos |
| **Chart.js** | 3.x | Gráficos interactivos |

---

## 🚀 Roadmap de Mejoras

### 🔜 Próximas Versiones

| Prioridad | Característica | Estado |
|---|---|---|
| 🔴 Alta | Backend para almacenamiento en nube | ⏳ Planificado |
| 🔴 Alta | Autenticación de usuarios | ⏳ Planificado |
| 🟠 Media | Exportación a Excel | ⏳ Planificado |
| 🟠 Media | Base de datos de proyectos históricos | ⏳ Planificado |
| 🟠 Media | API REST para integraciones | ⏳ Planificado |
| 🟡 Baja | Soporte multiidioma | ⏳ Futuro |
| 🟡 Baja | Integración con CAD | ⏳ Futuro |
| 🟡 Baja | Modo offline mejorado | ⏳ Futuro |

---

## 📞 Contacto y Soporte

### 🏢 TODO GAS SYR S.A.S

| Detalle | Información |
|---|---|
| 🏢 **Empresa** | TODO GAS SYR S.A.S |
| 📛 **NIT** | 901.126.243-3 |
| 📍 **Dirección** | Calle 28 N° 18-38, Tunja, Boyacá |
| 📞 **Teléfono** | +57 301 594 9331 |
| 🌐 **Ubicación** | Tunja, Departamento de Boyacá, Colombia |

### 💬 Canales de Atención

```
📱 WhatsApp:  +57 301 594 9331
📧 Email:     contacto@todogas.com.co
🕐 Horario:   Lunes - Viernes 8:00 AM - 5:00 PM (Hora Colombia)
```

---

## 📝 Notas de Versión

### ✅ Versión 2.2.0 - Producción (Actual)

```
✅ Aplicación web completamente funcional
✅ 9 módulos JavaScript modularizados
✅ Cálculos termodinámicos implementados
✅ Exportación PDF profesional
✅ Almacenamiento local con localStorage
✅ Interfaz responsiva y moderna
✅ Validación multicriterio completa
✅ Documentación técnica completa
✅ GitHub Repository activo
✅ Listo para producción
```

### 📦 Versión 2.1.0 (Anterior)

```
• Versión monolítica con HTML/CSS/JS integrados
• Funcionalidad básica de cálculos
• Interfaz inicial
```

---

## 📋 Licencia

© 2026 **TODO GAS SYR S.A.S** - Todos los Derechos Reservados

```
Esta aplicación es software propietario.
No se permite su reproducción, distribución o modificación
sin autorización expresa de TODO GAS SYR S.A.S.
```

---

## 🙏 Agradecimientos

Desarrollado con atención al detalle y enfoque en excelencia ingenieril para TODO GAS SYR S.A.S.

---

<div align="center">

**Última actualización:** Enero 2026

🌐 [GitHub Repository](https://github.com/LuisSilvestre95/TodoGas)

**Hecho con ❤️ para profesionales del gas**

</div>
