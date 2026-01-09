# TODO GAS SYR S.A.S - Sistema Profesional de Cálculo de Redes de Gas

## 📋 Descripción

Sistema profesional desarrollado para TODO GAS SYR S.A.S que permite calcular y diseñar redes de gas natural y GLP de manera precisa y eficiente. La aplicación incluye cálculos avanzados de pérdida de presión, validación de tramos y generación de reportes PDF profesionales.

## 🗂️ Estructura del Proyecto

```
sitio-todogas2/
├── index-clean.html              # Archivo HTML principal (VERSIÓN SEPARADA)
├── assets/
│   ├── css/
│   │   └── styles.css            # Estilos CSS completos
│   ├── js/
│   │   ├── config.js             # Configuración del sistema
│   │   ├── utils.js              # Funciones de utilidad
│   │   ├── calculation.js        # Funciones de cálculo
│   │   ├── client.js             # Gestión de datos del cliente
│   │   ├── segments.js           # Gestión de tramos
│   │   ├── visualization.js      # Visualización y gráficos
│   │   ├── export.js             # Exportación a PDF
│   │   └── init.js               # Inicialización
│   ├── favicon/
│   │   └── site.webmanifest      # Manifiesto PWA
│   └── images/
│       └── Logo 2025.png         # Logo de la empresa
└── README.md                     # Este archivo

```

## ✨ Características

### 1. Gestión de Clientes
- Registro completo de información del cliente
- Validación de datos de entrada
- Almacenamiento local (localStorage)
- Resumen automático de datos

### 2. Cálculo de Redes de Gas
- Cálculo de pérdida de presión según material del tubo
- Cálculo de velocidad del gas
- Validación de diámetros estándar
- Soporte para Gas Natural (GN) y GLP
- Cálculo de longitud equivalente
- Validación de presiones iniciales

### 3. Análisis de Conectividad
- Validación de nodos conectados
- Detección de ciclos en la red
- Clasificación topológica
- Cálculo de presiones en cada nodo

### 4. Validación de Tramos
- Verificación de velocidades máximas
- Validación de pérdidas de presión
- Control de diámetros estándar
- Relación L/D mínima
- Sugerencias de diámetro mínimo

### 5. Generación de Reportes
- Exportación a PDF profesional
- Incluye datos del cliente
- Tabla detallada de tramos
- Gráficos de presión y velocidad
- Diagrama de red

### 6. Interfaz de Usuario
- Diseño responsivo y moderno
- Navegación por pestañas
- Tablas interactivas con edición
- Alertas dinámicas
- Modal de confirmación
- Navegación por teclado mejorada

## 🚀 Cómo Usar

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para librerías CDN)
- Acceso a localStorage

### Pasos Básicos

1. **Abrir la aplicación**
   - Abra el archivo `index-clean.html` en un navegador web

2. **Llenar Datos del Cliente** (Pestaña 1)
   - Tipo de identificación
   - Número de identificación
   - Nombre/Razón social
   - Contacto (teléfono, dirección)
   - Ubicación (municipio, departamento)
   - Tipo de proyecto
   - Tipo de gas (GN o GLP)
   - Nivel de presión (baja o media)

3. **Guardar Datos**
   - Click en "Guardar Datos"
   - Se mostrará un resumen automático

4. **Ir a Cálculos** (Pestaña 2)
   - Se abre automáticamente o click en la pestaña

5. **Agregar Tramos**
   - Ingrese los parámetros de cada tramo:
     - Nodos de inicio y fin
     - Caudal (m³/h)
     - Longitud (m)
     - Diámetro (mm) - valores estándar: 12, 16, 20, 25, 32, 40, 50
     - Presión inicial (mbar)
     - Material (PE AL PE, Cobre, Acero)
   - Click en "Agregar Tramo"

6. **Calcular Red**
   - Click en "Calcular Red"
   - Se mostrarán resultados en tabla y gráfico

7. **Editar/Eliminar Tramos**
   - Click en el botón de edición para modificar
   - Click en el botón de eliminar para remover

8. **Exportar Informe**
   - Click en "Exportar a PDF"
   - Se descargará un informe completo en PDF

## 📊 Parámetros de Validación

### Redes de Baja Presión (Gas Natural)
- Presión máxima inicial: 30 mbar
- Velocidad máxima: 6 m/s
- Pérdida máxima: 10% de presión inicial
- Longitud mínima del tramo: 0.3 m
- Relación L/D mínima: 10

### Redes de Baja Presión (GLP)
- Presión máxima inicial: 30 mbar
- Velocidad máxima: 5 m/s
- Pérdida máxima: 8% de presión inicial
- Longitud mínima del tramo: 0.5 m
- Relación L/D mínima: 10

### Redes de Media Presión (Gas Natural)
- Rango de presión: 100-5000 mbar
- Velocidad máxima: 10 m/s
- Pérdida máxima: 20% de presión inicial
- Longitud mínima del tramo: 0.5 m
- Relación L/D mínima: 10

### Redes de Media Presión (GLP)
- Rango de presión: 100-5000 mbar
- Velocidad máxima: 8 m/s
- Pérdida máxima: 15% de presión inicial
- Longitud mínima del tramo: 0.8 m
- Relación L/D mínima: 10

## 🔧 Características Técnicas

### Almacenamiento
- Datos guardados localmente en localStorage
- Persisten entre sesiones
- Pueden limpiarse con el botón "Limpiar Todo"

### Cálculos Realizados
1. **Longitud Equivalente (LE)**
   - LE = Longitud × Factor Material
   - Factores: PE AL PE (1.2), Cobre (1.15), Acero (1.25)

2. **Pérdida de Presión (ΔP)**
   - Fórmula de Coolebrook-White adaptada
   - Dependiente del gas tipo, caudal, diámetro

3. **Velocidad del Gas**
   - Cálculo termodinámico
   - Considerando presión y temperatura

4. **Validación de Tramos**
   - Verificación multicriterio
   - Sugerencias automáticas

## 🎨 Personalización

### Modificar Colores
Edite `assets/css/styles.css`:
```css
:root {
    --primary-color: #2c3e50;      /* Azul principal */
    --secondary-color: #3498db;    /* Azul secundario */
    --success-color: #27ae60;      /* Verde */
    --danger-color: #e74c3c;       /* Rojo */
    /* ... más variables ... */
}
```

### Agregar Nuevos Materiales
Edite `assets/js/config.js`:
```javascript
materiales: {
    'PE AL PE': { rugosidad: 0.007, factorLE: 1.2 },
    'Nuevo Material': { rugosidad: 0.xxx, factorLE: 1.x }
}
```

### Modificar Límites
Edite `assets/js/config.js`:
```javascript
limites: {
    baja: {
        presionMax: 30,
        velocidadMax: { GN: 6, GLP: 5 },
        // ...
    }
}
```

## 🐛 Resolución de Problemas

### El logo no se muestra
- Asegúrese que existe el archivo en `assets/images/Logo 2025.png`
- Compruebe la ruta del archivo

### Los datos no se guardan
- Verifique que localStorage esté habilitado en el navegador
- Compruebe el espacio disponible de almacenamiento

### El PDF no se genera
- Asegúrese que html2canvas se cargó correctamente
- Intente con un navegador diferente

### Errores en los cálculos
- Verifique que los valores estén dentro de los rangos válidos
- Confirme que el formato de los datos es correcto

## 📝 Notas de Versión

### Versión 2.2.0 - Separado (Actual)
- ✅ HTML, CSS y JS completamente separados
- ✅ Modularización del código
- ✅ Mejor mantenibilidad
- ✅ Rendimiento optimizado
- ✅ Documentación completa

### Versión 2.1.0 (Anterior)
- HTML con estilos y scripts incrustados

## 👨‍💻 Autor

**Diseñado y Desarrollado por:** Luis Silvestre  
**CC:** 1.012.427.712  
**Correo:** luissilvestre70@gmail.com

## 📋 Licencia

© 2025 TODO GAS SYR S.A.S. Todos los derechos reservados.

## 📞 Contacto

**TODO GAS SYR S.A.S**
- NIT: 901.126.243-3
- Calle 28 N° 18-38, Tunja, Boyacá
- Teléfono: +57-320-948-5534

## 🔒 Seguridad

- Sanitización de entrada de usuarios
- Validación de datos en cliente y servidor
- No se almacenan datos sensibles
- Compatible con CSP (Content Security Policy)

## 🚀 Mejoras Futuras

- [ ] Backend para almacenamiento persistente
- [ ] Autenticación de usuarios
- [ ] Bases de datos de proyectos
- [ ] Exportación a Excel
- [ ] Modo offline mejorado
- [ ] Soporte multiidioma
- [ ] Integración con sistemas CAD
- [ ] API REST para terceros

## 🤝 Soporte

Para soporte o reportar problemas, contacte a:
- Email: luissilvestre70@gmail.com
- WhatsApp: +57-320-948-5534

---

**Última actualización:** Enero 2026
