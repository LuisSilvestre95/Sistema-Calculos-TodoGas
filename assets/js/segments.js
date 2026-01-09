/**
 * TODO GAS SYR S.A.S - Funciones de Gestión de Tramos
 * Sistema Profesional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 */

// ========================= 
// GESTIÓN DE TRAMOS
// =========================

/**
 * Renderiza la tabla de tramos registrados
 */
function renderSegmentsTable() {
    console.log('🔵 renderSegmentsTable() iniciado. Tramos:', segments.length);
    
    const tbody = document.getElementById('tramosBody');
    const emptyState = document.getElementById('emptyState');
    const table = document.getElementById('calcTable');
    
    if (!tbody) {
        console.error('❌ No se encontró elemento tramosBody');
        return;
    }
    
    if (segments.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        if (table) table.style.display = 'none';
        console.log('✅ Tabla vacía mostrada');
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (table) table.style.display = 'table';
    
    tbody.innerHTML = '';
    
    // Obtener tipo de presión
    const pressureType = currentClient?.pressureLevel || 'baja';
    
    segments.forEach((segment, index) => {
        try {
            // Calcular el tramo para obtener su estado
            const result = calculateSegmentAutomatic(segment, pressureType);
            const statusClass = result.status === 'APROBADO' ? 'success' : 'danger';
            const statusIcon = result.status === 'APROBADO' ? 'check-circle' : 'exclamation-triangle';
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td class="text-center"><strong>${segment.inicio}</strong></td>
                <td class="text-center"><strong>${segment.fin}</strong></td>
                <td class="text-end">${segment.caudal.toFixed(2)}</td>
                <td class="text-end">${segment.longitud.toFixed(1)}</td>
                <td>${segment.diametro} mm - ${segment.material}</td>
                <td class="text-center">
                    <span class="badge bg-${statusClass}">
                        <i class="fas fa-${statusIcon}"></i> ${result.status}
                    </span>
                </td>
                <td class="text-center">
                    <button class="btn btn-outline-primary btn-sm me-2 fw-bold" onclick="editSegment(${index})" title="Editar este tramo" style="border-width: 2px; padding: 6px 12px;">
                        <i class="fas fa-pen-to-square me-1"></i> EDITAR
                    </button>
                    <button class="btn btn-outline-danger btn-sm fw-bold" onclick="deleteSegment(${index})" title="Eliminar tramo" style="border-width: 2px; padding: 6px 12px;">
                        <i class="fas fa-trash-alt me-1"></i> BORRAR
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
            console.log(`✅ Fila ${index + 1} renderizada`);
        } catch (error) {
            console.error(`❌ Error al renderizar tramo ${index}:`, error);
        }
    });
    
    console.log('✅ renderSegmentsTable() completado');
}

/**
 * Agrega un nuevo tramo a la red
 * AUTO-CALCULA inmediatamente
 */
function addSegment() {
    console.log('🔵 addSegment() iniciado');
    
    // Si no hay cliente, crearlo automáticamente con los datos del formulario
    if (!currentClient) {
        const gasType = document.getElementById('gasType')?.value || 'GN';
        const pressureLevel = document.getElementById('pressureLevel')?.value || 'baja';
        const initialPressure = parseFloat(document.getElementById('initialPressure')?.value || 23);
        const atmPressure = parseFloat(document.getElementById('atmPressure')?.value || 723.6);
        
        currentClient = {
            name: document.getElementById('clientName')?.value || 'PROYECTO SIN NOMBRE',
            address: document.getElementById('clientAddress')?.value || '',
            gasType: gasType,
            pressureLevel: pressureLevel,
            initialPressure: initialPressure,
            atmPressure: atmPressure,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('currentGasClient', JSON.stringify(currentClient));
        console.log('✅ Cliente creado automáticamente:', currentClient);
    }

    // Leer desde formulario
    const inicio = document.getElementById('inicio')?.value?.trim() || 'A';
    const fin = document.getElementById('fin')?.value?.trim() || 'B';
    const caudalInput = document.getElementById('caudal')?.value;
    const longitudInput = document.getElementById('longitud')?.value;
    const diametroInput = document.getElementById('diametro')?.value;
    
    const caudal = parseFloat(caudalInput) || 1;
    const longitud = parseFloat(longitudInput) || 1;
    const diametro = parseFloat(diametroInput) || 20;
    const pi = parseFloat(document.getElementById('pi')?.value || currentClient.initialPressure || 23);
    const material = document.getElementById('material')?.value || 'PE AL PE';

    console.log('📊 Datos leídos:', { inicio, fin, caudal, longitud, diametro, pi, material });

    // Validación mínima
    if (isNaN(caudal) || caudal <= 0) {
        showAlert('El caudal debe ser un número mayor a 0', 'warning');
        return;
    }
    
    if (isNaN(longitud) || longitud <= 0) {
        showAlert('La longitud debe ser un número mayor a 0', 'warning');
        return;
    }
    
    if (isNaN(diametro) || diametro <= 0) {
        showAlert('El diámetro debe ser un número mayor a 0', 'warning');
        return;
    }

    // Validar diámetro estándar (advertencia, no bloqueante)
    const diametrosEstandar = [12, 16, 20, 25, 32, 40, 50];
    const diametroRedondeado = Math.round(diametro);
    if (!diametrosEstandar.includes(diametroRedondeado)) {
        console.warn('⚠️ Diámetro no estándar:', diametro);
    }

    const segment = {
        inicio: inicio,
        fin: fin,
        caudal: caudal,
        longitud: longitud,
        diametro: diametro,
        pi: pi,
        material: material,
        gasType: currentClient.gasType
    };

    console.log('✅ Segmento validado:', segment);

    // Si estamos editando, actualizar el tramo existente
    if (editingIndex >= 0) {
        segments[editingIndex] = segment;
        editingIndex = -1;
        
        // Restaurar botones a su estado normal
        const addButtons = document.querySelectorAll('button[onclick="addSegment()"]');
        addButtons.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-plus"></i> Agregar';
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-success');
        });
        
        showAlert('✅ Tramo actualizado correctamente', 'success');
        console.log('✅ Tramo actualizado en índice:', editingIndex);
    } else {
        // Agregar nuevo tramo
        segments.push(segment);
        showAlert('✅ Tramo agregado correctamente', 'success');
        console.log('✅ Tramo agregado. Total tramos:', segments.length);
    }
    
    saveSegments();
    renderSegmentsTable();
    
    // Actualizar nodos para el siguiente tramo ANTES de limpiar
    if (editingIndex < 0) {
        // El inicio del siguiente es el fin del actual
        const inicioInput = document.getElementById('inicio');
        const finInput = document.getElementById('fin');
        
        if (inicioInput && finInput) {
            inicioInput.value = fin;
            
            // Generar siguiente nodo automáticamente
            const lastChar = fin.charAt(fin.length - 1);
            if (lastChar >= 'A' && lastChar <= 'Z') {
                const nextChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
                finInput.value = fin.slice(0, -1) + nextChar;
            } else if (lastChar >= '0' && lastChar <= '9') {
                const nextNum = parseInt(lastChar) + 1;
                finInput.value = fin.slice(0, -1) + nextNum;
            }
        }
    }
    
    clearForm();
    calculateNetwork();
    document.getElementById('caudal')?.focus();
    
    console.log('🔵 addSegment() completado');
}

/**
 * Limpia el formulario de tramos
 */
function clearForm() {
    // No resetear todo, solo limpiar campos de caudal y longitud
    document.getElementById('caudal').value = '';
    document.getElementById('longitud').value = '';
    // Mantener diámetro, material y Pi para facilitar entrada rápida
}

/**
 * Limpia todos los datos (cliente y tramos)
 */
function clearAll() {
    showConfirm('¿Está seguro de eliminar todos los datos, incluyendo cliente y cálculos?', () => {
        segments = [];
        nextPiValue = null;
        currentClient = null;
        localStorage.removeItem('currentGasClient');
        localStorage.removeItem('gasSegments');
        document.getElementById('projectForm')?.reset();
        
        // Limpiar tabla de tramos
        renderSegmentsTable();
        
        // Limpiar ambas tablas de resultados
        const tbodyBAJA = document.getElementById('resultsBodyBAJA');
        const tbodyMedia = document.getElementById('resultsBodyMedia');
        if (tbodyBAJA) tbodyBAJA.innerHTML = '';
        if (tbodyMedia) tbodyMedia.innerHTML = '';
        
        const tableBAJA = document.getElementById('tableBAJA');
        const tableMedia = document.getElementById('tableMedia');
        if (tableBAJA) tableBAJA.style.display = 'none';
        if (tableMedia) tableMedia.style.display = 'none';
        
        const summarySection = document.getElementById('summarySection');
        if (summarySection) summarySection.style.display = 'none';
        
        if (pressureChart) {
            pressureChart.destroy();
            pressureChart = null;
        }
        
        clearForm();
        // Resetear nodos a A-B
        document.getElementById('inicio').value = 'A';
        document.getElementById('fin').value = 'B';
        showAlert('Todos los datos han sido eliminados', 'info');
    });
}

/**
 * Edita un tramo existente
 * @param {number} index - Índice del tramo
 */
function editSegment(index) {
    const segment = segments[index];
    editingIndex = index;
    
    // Llenar formulario con datos del tramo
    document.getElementById('inicio').value = segment.inicio;
    document.getElementById('fin').value = segment.fin;
    document.getElementById('caudal').value = segment.caudal;
    document.getElementById('longitud').value = segment.longitud;
    document.getElementById('diametro').value = segment.diametro;
    document.getElementById('pi').value = segment.pi;
    document.getElementById('material').value = segment.material;
    
    // Cambiar comportamiento del botón Agregar a Guardar
    const addButtons = document.querySelectorAll('button[onclick="addSegment()"]');
    addButtons.forEach(btn => {
        btn.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-warning');
    });
    
    // Scroll al formulario
    document.getElementById('inicio').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('caudal').focus();
    
    showAlert('Editando tramo ' + segment.inicio + '-' + segment.fin + '. Modifique y haga clic en "Guardar Cambios"', 'info');
}

/**
 * Elimina un tramo de la red
 * @param {number} index - Índice del tramo a eliminar
 */
function deleteSegment(index) {
    showConfirm('¿Está seguro de eliminar este tramo?', () => {
        segments.splice(index, 1);
        saveSegments();
        renderSegmentsTable(); // Actualizar tabla de tramos
        
        if (segments.length > 0) {
            const lastSegment = segments[segments.length - 1];
            const le = calculateLE(lastSegment.longitud, lastSegment.material);
            const deltaP = calculatePressureLoss(lastSegment.caudal, le, lastSegment.diametro, lastSegment.gasType);
            nextPiValue = lastSegment.pi - deltaP;
        } else {
            nextPiValue = null;
        }
        
        calculateNetwork();
        showAlert('Tramo eliminado correctamente', 'info');
    });
}

/**
 * Carga los tramos desde localStorage
 */
function loadSegments() {
    try {
        const savedSegments = localStorage.getItem('gasSegments');
        if (savedSegments) {
            segments = JSON.parse(savedSegments).map(validateSegment);
            if (segments.length > 0) {
                const lastSegment = segments[segments.length - 1];
                const le = calculateLE(lastSegment.longitud, lastSegment.material);
                const deltaP = calculatePressureLoss(lastSegment.caudal, le, lastSegment.diametro, lastSegment.gasType);
                nextPiValue = lastSegment.pi - deltaP;
            }
            renderSegmentsTable(); // Mostrar tramos cargados
            calculateNetwork();
        } else {
            renderSegmentsTable(); // Mostrar estado vacío
        }
    } catch (error) {
        console.error('Error al cargar tramos:', error);
        showAlert('Error al cargar los tramos', 'danger');
    }
}

/**
 * Guarda los tramos en localStorage
 */
function saveSegments() {
    try {
        localStorage.setItem('gasSegments', JSON.stringify(segments));
    } catch (error) {
        console.error('Error al guardar tramos:', error);
        showAlert('Error al guardar los tramos', 'danger');
    }
}

/**
 * Actualiza el estado del campo de presión inicial
 */
/**
 * Actualiza el campo de presión inicial
 */
function updatePiField() {
    const piField = document.getElementById('pi');
    if (!piField) return;
    
    if (segments.length === 0) {
        // Primer tramo: usar presión inicial del proyecto
        const initialPressure = document.getElementById('initialPressure')?.value;
        piField.value = initialPressure || currentClient?.initialPressure || 23;
    } else if (nextPiValue) {
        // Siguientes tramos: usar Pf del tramo anterior
        piField.value = nextPiValue.toFixed(2);
    }
}
