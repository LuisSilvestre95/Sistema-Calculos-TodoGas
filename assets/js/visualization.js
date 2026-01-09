/**
 * TODO GAS SYR S.A.S - Funciones de Visualización
 * Sistema Profesional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 */

// ========================= 
// VISUALIZACIÓN Y TABLAS
// =========================

/**
 * Renderiza tabla ÚNICA con todas las columnas (BAJA y MEDIA)
 */
function renderTableByPressureType(calculatedSegments, pressureType) {
    const tableBAJA = document.getElementById('tableBAJA');
    const tableMedia = document.getElementById('tableMedia');
    const tbodyBAJA = document.getElementById('resultsBodyBAJA');
    const tbodyMedia = document.getElementById('resultsBodyMedia');

    // Limpiar ambas tablas
    if (tbodyBAJA) tbodyBAJA.innerHTML = '';
    if (tbodyMedia) tbodyMedia.innerHTML = '';

    // Obtener PATM
    const PATM = getPATM();
    
    // MISMAS COLUMNAS PARA AMBAS
    if (pressureType === 'baja') {
        // Mostrar tabla BAJA con TODAS las columnas
        if (tableBAJA) tableBAJA.style.display = 'table';
        if (tableMedia) tableMedia.style.display = 'none';

        // Renderizar BAJA PRESIÓN con columnas completas
        if (tbodyBAJA) {
            calculatedSegments.forEach((result, idx) => {
                const tr = document.createElement('tr');
                tr.className = result.status === 'APROBADO' ? 'approved-row' : 'rejected-row';
                
                // Usar valores ya calculados del objeto result
                const piAbs = result.piAbs || ((result.pi + PATM) / 1000);
                const pfAbs = result.pfAbs || ((result.pf + PATM) / 1000);
                const deltaAbsoluto = result.deltaAbsoluto || (piAbs - pfAbs);
                const p2psi = result.p2psi || (result.pf / 68.946);
                const longTotal = result.longTotal || (result.longitud + result.le);
                
                tr.innerHTML = `
                    <td><strong>${result.inicio}-${result.fin}</strong></td>
                    <td class="text-end">${result.caudal.toFixed(2)}</td>
                    <td class="text-center">${result.diametro}</td>
                    <td class="text-center">-</td>
                    <td class="text-end">${result.longitud.toFixed(2)}</td>
                    <td class="text-end">${result.le.toFixed(2)}</td>
                    <td class="text-end">${longTotal.toFixed(2)}</td>
                    <td class="text-end"><strong>${result.pi.toFixed(2)}</strong></td>
                    <td class="text-end"><strong>${piAbs.toFixed(3)}</strong></td>
                    <td class="text-end"><strong>${deltaAbsoluto.toFixed(4)}</strong></td>
                    <td class="text-end"><strong>${result.pf.toFixed(2)}</strong></td>
                    <td class="text-end">${p2psi.toFixed(3)}</td>
                    <td class="text-end"><strong>${result.velocidad.toFixed(2)}</strong></td>
                    <td class="text-center">${result.material}</td>
                    <td class="text-center">
                        <span class="badge ${result.status === 'APROBADO' ? 'bg-success' : result.status === 'REQUIERE AJUSTES' ? 'bg-warning' : 'bg-danger'}">
                            <i class="fas ${result.status === 'APROBADO' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                            ${result.status}
                        </span>
                    </td>
                `;
                tbodyBAJA.appendChild(tr);
            });
        }
    } else {
        // Mostrar tabla MEDIA con TODAS las columnas
        if (tableBAJA) tableBAJA.style.display = 'none';
        if (tableMedia) tableMedia.style.display = 'table';

        // Renderizar MEDIA PRESIÓN con columnas completas
        if (tbodyMedia) {
            calculatedSegments.forEach((result, idx) => {
                const tr = document.createElement('tr');
                tr.className = result.status === 'APROBADO' ? 'approved-row' : 'rejected-row';
                
                // Usar valores ya calculados del objeto result
                const piAbs = result.piAbs || ((result.pi + PATM) / 1000);
                const pfAbs = result.pfAbs || ((result.pf + PATM) / 1000);
                const deltaAbsoluto = result.deltaAbsoluto || (piAbs - pfAbs);
                const p2psi = result.p2psi || (result.pf / 68.946);
                const longTotal = result.longTotal || (result.longitud + result.le);
                
                tr.innerHTML = `
                    <td><strong>${result.inicio}-${result.fin}</strong></td>
                    <td class="text-end">${result.caudal.toFixed(2)}</td>
                    <td class="text-center">${result.diametro}</td>
                    <td class="text-center">-</td>
                    <td class="text-end">${result.longitud.toFixed(2)}</td>
                    <td class="text-end">${result.le.toFixed(2)}</td>
                    <td class="text-end">${longTotal.toFixed(2)}</td>
                    <td class="text-end"><strong>${result.pi.toFixed(2)}</strong></td>
                    <td class="text-end"><strong>${piAbs.toFixed(3)}</strong></td>
                    <td class="text-end"><strong>${deltaAbsoluto.toFixed(4)}</strong></td>
                    <td class="text-end"><strong>${result.pf.toFixed(2)}</strong></td>
                    <td class="text-end">${p2psi.toFixed(3)}</td>
                    <td class="text-end"><strong>${result.velocidad.toFixed(2)}</strong></td>
                    <td class="text-center">${result.material}</td>
                    <td class="text-center">
                        <span class="badge ${result.status === 'APROBADO' ? 'bg-success' : result.status === 'REQUIERE AJUSTES' ? 'bg-warning' : 'bg-danger'}">
                            <i class="fas ${result.status === 'APROBADO' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                            ${result.status}
                        </span>
                    </td>
                `;
                tbodyMedia.appendChild(tr);
            });
        }
    }
}


/**
 * Calcula toda la red y actualiza AUTOMÁTICAMENTE
 * Garantiza coherencia: Tabla = Gráficos = KPIs
 */
function calculateNetwork() {
    console.log('🟢 calculateNetwork() iniciado. Tramos:', segments.length);
    
    // Verificar que hay cliente y datos
    if (!currentClient || segments.length === 0) {
        console.log('⚠️ No hay cliente o tramos para calcular');
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
        return;
    }

    console.log('✅ Cliente:', currentClient);
    console.log('✅ Tramos a calcular:', segments);

    // Validar red
    const validation = validateNetwork(segments);
    if (!validation.valid) {
        showAlert(validation.message, 'danger');
        console.error('❌ Red inválida:', validation.message);
        return;
    }

    // Obtener tipo de presión (BAJA o MEDIA)
    const pressureType = currentClient?.pressureLevel || 'baja';
    console.log('📊 Tipo de presión:', pressureType);

    // === CALCULAR TODOS LOS TRAMOS CON MOTOR UNIFICADO ===
    let calculatedSegments = [];
    let nodePressuresMap = new Map();
    
    nodePressuresMap.set(segments[0].inicio, segments[0].pi);

    segments.forEach((segment, index) => {
        // Obtener Pi del nodo anterior (garantiza continuidad)
        const piActual = nodePressuresMap.get(segment.inicio) || segment.pi;
        
        console.log(`🔧 Calculando tramo ${index + 1}: ${segment.inicio}-${segment.fin}`);
        
        // Calcular con motor automático
        const result = calculateSegmentAutomatic(
            { ...segment, pi: piActual },
            pressureType
        );

        console.log(`✅ Resultado tramo ${index + 1}:`, result);

        // Almacenar presión final para siguiente tramo
        nodePressuresMap.set(segment.fin, result.pf);
        
        calculatedSegments.push(result);
    });

    console.log('✅ Todos los tramos calculados:', calculatedSegments);

    // === CONSTRUIR DATOS PARA GRÁFICAS Y TABLA ===
    const chartData = {
        labels: calculatedSegments.map(s => `${s.inicio}-${s.fin}`),
        pressures: calculatedSegments.map(s => s.pf),
        velocities: calculatedSegments.map(s => s.velocidad)
    };

    // === CALCULAR RESUMEN ===
    const initialPressure = calculatedSegments[0]?.pi || 0;
    const finalPressure = calculatedSegments[calculatedSegments.length - 1]?.pf || 0;
    const totalDeltaP = initialPressure - finalPressure;
    const totalPercent = initialPressure > 0 ? (totalDeltaP / initialPressure) * 100 : 0;
    const maxVelocity = Math.max(...calculatedSegments.map(s => s.velocidad || 0));
    const approvedCount = calculatedSegments.filter(s => s.status === 'APROBADO').length;

    console.log('📊 Resumen:', { initialPressure, finalPressure, totalPercent, approvedCount });

    // === RENDERIZAR TABLA SEGÚN TIPO DE PRESIÓN ===
    renderTableByPressureType(calculatedSegments, pressureType);

    // === ACTUALIZAR KPIs (datos exactos de cálculos) ===
    document.getElementById('res-pf') && (document.getElementById('res-pf').textContent = finalPressure.toFixed(2));
    document.getElementById('res-drop') && (document.getElementById('res-drop').textContent = totalPercent.toFixed(2));
    document.getElementById('res-status') && (document.getElementById('res-status').textContent = approvedCount === segments.length ? 'APROBADO' : 'REVISAR');
    
    // Soporte para IDs antiguos también
    document.getElementById('summaryPf') && (document.getElementById('summaryPf').textContent = finalPressure.toFixed(2));
    document.getElementById('summaryDeltaP') && (document.getElementById('summaryDeltaP').textContent = totalDeltaP.toFixed(2));
    document.getElementById('summaryPercent') && (document.getElementById('summaryPercent').textContent = totalPercent.toFixed(2));
    document.getElementById('summaryMaxVel') && (document.getElementById('summaryMaxVel').textContent = maxVelocity.toFixed(2));
    document.getElementById('summaryApproved') && (document.getElementById('summaryApproved').textContent = approvedCount);
    document.getElementById('summaryTotal') && (document.getElementById('summaryTotal').textContent = segments.length);
    
    const statusElement = document.getElementById('summaryStatus');
    if (statusElement) {
        if (approvedCount === segments.length && totalPercent <= 10 && maxVelocity <= 10) {
            statusElement.innerHTML = '<span class="status-badge status-approved"><i class="fas fa-check-circle"></i> APROBADO SISTEMA COMPLETO</span>';
        } else {
            statusElement.innerHTML = '<span class="status-badge status-rejected"><i class="fas fa-times-circle"></i> REQUIERE AJUSTES</span>';
        }
    }

    // === ACTUALIZAR GRÁFICAS (datos exactos de tabla) ===
    updateChart(chartData);

    // Guardar datos
    saveSegments();
    
    // Actualizar Pi del siguiente tramo
    if (segments.length) {
        nextPiValue = finalPressure;
        updatePiField();
    }
    
    // Mostrar sección de resultados
    document.getElementById('resultsSection') && (document.getElementById('resultsSection').style.display = 'block');
}

/**
 * Actualiza el gráfico de presión y velocidad
 * @param {object} data - Datos del gráfico
 */
function updateChart(data) {
    const ctx = document.getElementById('pressureChart').getContext('2d');
    if (pressureChart) {
        pressureChart.destroy();
    }

    pressureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Presión (mbar)',
                    data: data.pressures,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 3,
                    yAxisID: 'y',
                    tension: 0.3,
                    pointBackgroundColor: '#e74c3c',
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    borderJoinStyle: 'round'
                },
                {
                    label: 'Velocidad (m/s)',
                    data: data.velocities,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    yAxisID: 'y1',
                    tension: 0.3,
                    pointBackgroundColor: '#3498db',
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    borderJoinStyle: 'round'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Perfil de Presión y Velocidad',
                    font: { size: 18, weight: 'bold' },
                    padding: { top: 10, bottom: 20 },
                    color: '#2c3e50'
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.95)',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    usePointStyle: true,
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Presión (mbar)',
                        font: { size: 14, weight: 'bold' },
                        color: '#2c3e50'
                    },
                    min: data.pressures.length ? Math.max(0, Math.min(...data.pressures) - 5) : 0,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Velocidad (m/s)',
                        font: { size: 14, weight: 'bold' },
                        color: '#2c3e50'
                    },
                    min: 0,
                    max: data.velocities.length ? Math.max(10, Math.max(...data.velocities) + 2) : 12,
                    grid: { drawOnChartArea: false }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tramos',
                        font: { size: 14, weight: 'bold' },
                        color: '#2c3e50'
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        }
    });
}
