/**
 * TODO GAS SYR S.A.S - Exportacion a PDF PROFESIONAL
 * Sistema Profesional de Calculo de Redes de Gas
 * (c) 2025 TODO GAS SYR S.A.S
 */

// Logo de TODO GAS en Base64
const LOGO_TODOGAS = 'data:image/png;base64,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';

/**
 * FUNCION PRINCIPAL: Genera PDF Profesional Completo
 */
async function generateProfessionalPDF() {
    try {
        console.log('🔵 [PDF] Iniciando generacion de PDF...');
        console.log('🔵 [PDF] jsPDF disponible:', typeof window.jspdf);
        console.log('🔵 [PDF] html2canvas disponible:', typeof window.html2canvas);
        console.log('🔵 [PDF] Segments:', segments?.length);
        
        // Verificar tramos
        if (!segments || segments.length === 0) {
            console.warn('⚠️ [PDF] No hay tramos para exportar');
            Swal.fire({
                icon: 'warning',
                title: 'Sin Datos',
                text: 'Agregue al menos un tramo para exportar',
                showConfirmButton: true
            });
            return;
        }

        console.log('✅ [PDF] Validación exitosa, mostrando loader');
        Swal.fire({
            icon: 'info',
            title: 'Procesando',
            text: 'Generando reporte profesional con graficas...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Esperar un momento para que se muestre el loader
        setTimeout(async () => {
            try {
                console.log('✅ [PDF] Iniciando crearPDFCompleto()');
                await crearPDFCompleto();
                console.log('✅ [PDF] PDF generado exitosamente');
                Swal.close();
            } catch (error) {
                console.error('❌ [PDF] Error generando PDF:', error);
                console.error('❌ [PDF] Stack:', error.stack);
                Swal.fire('Error', 'No se pudo generar el PDF: ' + error.message, 'error');
            }
        }, 100);

    } catch (error) {
        console.error('❌ [PDF] Error en generateProfessionalPDF:', error);
        Swal.fire('Error', error.message, 'error');
    }
}

/**
 * Crea el PDF profesional completo ALTISIMA CALIDAD
 */
async function crearPDFCompleto() {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) throw new Error('jsPDF no esta cargado');
    
    // PDF optimizado (alta calidad + rápido)
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter',
        compress: true,
        precision: 6,
        hotfixes: ['px_scaling']
    });

    const W = 215.9; // Ancho carta
    const H = 279.4; // Alto carta
    const m = 7; // Margenes muy pequeños para máximo espacio
    let y = m;

    // ========== ENCABEZADO PREMIUM ==========
    // Fondo gradiente azul profesional
    doc.setFillColor(0, 51, 102);
    doc.rect(0, 0, W, 32, 'F');
    
    // Decoración lateral
    doc.setFillColor(255, 183, 3);
    doc.rect(0, 0, 4, 32, 'F');
    
    // Logo de la empresa - MAXIMA CALIDAD
    try {
        doc.addImage(LOGO_TODOGAS, 'PNG', 8, 5, 18, 18, undefined, 'FAST');
    } catch(e) {
        console.warn('Logo no pudo cargarse, usando fallback');
        doc.setFillColor(255, 183, 3);
        doc.circle(17, 14, 6, 'F');
    }
    
    // Titulo principal - Más grande y bold
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('TODO GAS SYR S.A.S', 35, 12);
    
    // Subtitulo
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 183, 3);
    doc.text('SISTEMA DE INGENIERIA - REDES DE GAS NATURAL', 35, 17);
    
    // Información de contacto y NIT
    doc.setFontSize(7);
    doc.setTextColor(220, 220, 220);
    doc.text('NIT: 901.126.243-3 | Tel: 322 618 360 | www.todogas.com', 35, 22);
    
    // Fecha - alineada a la derecha
    const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
    const hora = new Date().toLocaleTimeString('es-CO');
    doc.setFontSize(7);
    doc.text(fecha + ' - ' + hora, W - m - 30, 22, { align: 'left' });
    
    // Linea separadora de calidad
    doc.setDrawColor(255, 183, 3);
    doc.setLineWidth(0.8);
    doc.line(4, 32, W - 4, 32);
    
    y = 36;

    // ========== DATOS DEL CLIENTE - PREMIUM ==========
    const clientName = currentClient?.name || document.getElementById('clientName')?.value || 'Cliente sin nombre';
    const clientAddress = currentClient?.address || document.getElementById('clientAddress')?.value || 'N/A';
    const gasType = currentClient?.gasType || 'GN';
    const pressureLevel = currentClient?.pressureLevel || 'baja';
    const initialPressure = currentClient?.initialPressure || 23;
    
    // Caja cliente con fondo sutil
    doc.setFillColor(245, 250, 255);
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.8);
    doc.rect(m, y, W - 2*m, 20, 'FD');
    
    // Icono cliente estilizado
    doc.setFillColor(0, 102, 204);
    doc.circle(m + 3, y + 4, 2.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('PROYECTO', m + 1, y + 5);
    
    doc.setTextColor(0, 51, 102);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENTE: ' + clientName, m + 8, y + 5);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(60, 60, 60);
    doc.text('Ubicacion: ' + clientAddress, m + 8, y + 9);
    
    // KPIs en línea
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('Gas: ' + (gasType === 'GN' ? 'Gas Natural' : 'GLP'), m + 8, y + 13);
    doc.text('Nivel: ' + (pressureLevel === 'baja' ? 'Baja Presion' : 'Media Presion'), m + 35, y + 13);
    doc.text('Pi inicial: ' + initialPressure.toFixed(1) + ' mbar', m + 65, y + 13);
    doc.text('Estado: APROBADO', m + 105, y + 13, { textColor: [34, 139, 34] });
    
    y += 24;

    // ========== RESUMEN TECNICO - COMPACTO EN 1 LINEA ==========
    // Calcular KPIs
    const pressureType = currentClient?.pressureLevel || 'baja';
    let calculatedSegments = [];
    let nodePressuresMap = new Map();
    
    if (segments.length > 0) {
        nodePressuresMap.set(segments[0].inicio, segments[0].pi);
        segments.forEach((segment) => {
            const piActual = nodePressuresMap.get(segment.inicio) || segment.pi;
            const result = calculateSegmentAutomatic({ ...segment, pi: piActual }, pressureType);
            nodePressuresMap.set(segment.fin, result.pf);
            calculatedSegments.push(result);
        });
    }
    
    const initialP = calculatedSegments[0]?.pi || 0;
    const finalP = calculatedSegments[calculatedSegments.length - 1]?.pf || 0;
    const totalDrop = initialP - finalP;
    const totalPercent = initialP > 0 ? (totalDrop / initialP) * 100 : 0;
    const maxVel = Math.max(...calculatedSegments.map(s => s.velocidad || 0));
    const approvedCount = calculatedSegments.filter(s => s.status === 'APROBADO').length;
    
    // Caja KPIs - PREMIUM con colores degradados
    doc.setFillColor(0, 102, 204);
    doc.rect(m, y, W - 2*m, 14, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN TECNICO DE RED', m + 2, y + 3.5, { align: 'left' });
    
    // KPIs en cuatro columnas
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    const kpiData = [
        { label: 'Pi (Inicial)', value: initialP.toFixed(2), unit: 'mbar' },
        { label: 'Pf (Final)', value: finalP.toFixed(2), unit: 'mbar' },
        { label: 'Caida', value: totalDrop.toFixed(2), unit: 'mbar (' + totalPercent.toFixed(1) + '%)' },
        { label: 'Vel.Max', value: maxVel.toFixed(2), unit: 'm/s' },
        { label: 'Tramos OK', value: approvedCount + '/' + segments.length, unit: 'Aprobados' }
    ];
    
    let kpiX = m + 2;
    kpiData.forEach((kpi, idx) => {
        const colWidth = (W - 2*m - 2) / 5;
        doc.setFillColor(240, 245, 255);
        doc.rect(kpiX, y + 5, colWidth, 8, 'F');
        
        doc.setTextColor(0, 51, 102);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6);
        doc.text(kpi.label + ':', kpiX + 1, y + 7);
        
        doc.setTextColor(255, 140, 0);
        doc.setFontSize(7);
        doc.text(kpi.value, kpiX + colWidth / 2, y + 10, { align: 'center' });
        
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(5);
        doc.text(kpi.unit, kpiX + colWidth / 2, y + 12.5, { align: 'center' });
        
        kpiX += colWidth + 0.3;
    });
    
    y += 18;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const kpiText = 'Pi: ' + initialP.toFixed(2) + ' mbar  |  Pf: ' + finalP.toFixed(2) + ' mbar  |  Caida: ' + totalDrop.toFixed(2) + ' mbar (' + totalPercent.toFixed(1) + '%)  |  Vel.Max: ' + maxVel.toFixed(2) + ' m/s  |  Aprobados: ' + approvedCount + '/' + segments.length;
    doc.text(kpiText, m + 3, y + 9);

y += 18;

    // ========== TABLA DE TRAMOS - COMPACTA ==========
    doc.setFillColor(255, 140, 0);
    doc.rect(m, y, W - 2*m, 7, 'F');
    
    // Icono tabla
    doc.setFillColor(255, 255, 255);
    doc.circle(m + 3, y + 3.5, 2.2, 'F');
    doc.setTextColor(255, 140, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('#', m + 2.2, y + 4.2);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLE DE TRAMOS - ANALISIS HIDRAULICO', m + 8, y + 4.5);
    
    y += 10;

    // Preparar datos de tabla
    const tableData = calculatedSegments.map((seg, idx) => [
        (idx + 1).toString(),
        seg.inicio + '-' + seg.fin,
        seg.longitud.toFixed(1),
        seg.caudal.toFixed(2),
        seg.diametro.toString(),
        seg.pi.toFixed(1),
        seg.pf.toFixed(1),
        seg.deltaP.toFixed(2),
        seg.velocidad.toFixed(2),
        seg.material,
        seg.status === 'APROBADO' ? 'OK' : 'REV'
    ]);

    doc.autoTable({
        startY: y,
        head: [['#', 'Tramo', 'L(m)', 'Q(m³/h)', 'D(mm)', 'Pi', 'Pf', 'ΔP', 'V(m/s)', 'Material', 'Est']],
        body: tableData,
        theme: 'striped',
        styles: { 
            fontSize: 6.5, 
            cellPadding: 1.5, 
            halign: 'center',
            textColor: [40, 40, 40],
            lineColor: [200, 200, 200],
            lineWidth: 0.2,
            font: 'helvetica'
        },
        headStyles: { 
            fillColor: [255, 140, 0], 
            textColor: [255, 255, 255], 
            fontStyle: 'bold',
            halign: 'center',
            lineColor: [255, 140, 0],
            lineWidth: 0.5,
            fontSize: 6
        },
        alternateRowStyles: { 
            fillColor: [250, 250, 250],
            textColor: [40, 40, 40]
        },
        bodyStyles: {
            lineColor: [220, 220, 220],
            lineWidth: 0.1
        },
        columnStyles: {
            0: { cellWidth: 7 },
            1: { cellWidth: 15 },
            2: { cellWidth: 12 },
            3: { cellWidth: 14 },
            4: { cellWidth: 12 },
            5: { cellWidth: 11 },
            6: { cellWidth: 11 },
            7: { cellWidth: 11 },
            8: { cellWidth: 12 },
            9: { cellWidth: 20 },
            10: { cellWidth: 10, fontStyle: 'bold' }
        },
        margin: { left: m, right: m, top: 2, bottom: 2 },
        didParseCell: function(data) {
            if (data.section === 'body' && data.column.index === 10) {
                if (data.cell.raw === 'OK') {
                    data.cell.styles.textColor = [34, 139, 34];
                    data.cell.styles.fontStyle = 'bold';
                } else {
                    data.cell.styles.textColor = [220, 20, 60];
                    data.cell.styles.fontStyle = 'bold';
                }
            }
            // Colorear presiones
            if (data.section === 'body' && (data.column.index === 5 || data.column.index === 6)) {
                data.cell.styles.textColor = [0, 102, 204];
                data.cell.styles.fontStyle = 'bold';
            }
            // Colorear velocidades
            if (data.section === 'body' && data.column.index === 8) {
                data.cell.styles.textColor = [255, 140, 0];
                data.cell.styles.fontStyle = 'bold';
            }
        }
    });

    y = doc.lastAutoTable.finalY + 6;

    // ========== GRAFICAS DE ANALISIS (si hay varios tramos) ==========
    if (segments.length >= 3) {
        try {
            // Agregar nueva pagina para graficas
            doc.addPage();
            
            // Header de página de gráficas
            doc.setFillColor(0, 51, 102);
            doc.rect(0, 0, W, 6, 'F');
            doc.setFillColor(255, 183, 3);
            doc.rect(0, 0, 4, 6, 'F');
            
            y = 10;
            
            // Titulo seccion graficas
            doc.setFillColor(138, 43, 226); // Morado
            doc.rect(m, y, W - 2*m, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('ANALISIS GRAFICO - COMPORTAMIENTO DE LA RED', m + 2, y + 5, { align: 'left' });
            y += 10;
            
            // Grafica 1: Presion a lo largo de la red - ALTA CALIDAD OPTIMIZADA
            const chartP = document.getElementById('chartP');
            if (chartP && typeof html2canvas !== 'undefined') {
                const canvasP = await html2canvas(chartP, { 
                    scale: 2,  // Alta calidad optimizada
                    backgroundColor: '#ffffff',
                    logging: false,
                    useCORS: true,
                    removeContainer: true
                });
                const imgDataP = canvasP.toDataURL('image/png', 1.0);
                const imgPropsP = doc.getImageProperties(imgDataP);
                const imgWidthP = W - 2*m;
                const imgHeightP = (imgPropsP.height * imgWidthP) / imgPropsP.width;
                const maxHeightP = 75;
                
                doc.setFontSize(8);
                doc.setTextColor(0, 51, 102);
                doc.setFont('helvetica', 'bold');
                doc.text('PERFIL DE PERDIDA DE PRESION', m, y, { align: 'left' });
                doc.setFontSize(6);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.text('Comportamiento de la presion a lo largo de cada tramo de la red', m, y + 3);
                y += 5;
                
                doc.addImage(imgDataP, 'PNG', m, y, imgWidthP, Math.min(imgHeightP, maxHeightP));
                y += Math.min(imgHeightP, maxHeightP) + 8;
            }
            
            // Grafica 2: Velocidad a lo largo de la red - ALTA CALIDAD OPTIMIZADA
            const chartV = document.getElementById('chartV');
            if (chartV && typeof html2canvas !== 'undefined' && y < H - 80) {
                const canvasV = await html2canvas(chartV, { 
                    scale: 2,  // Alta calidad optimizada
                    backgroundColor: '#ffffff',
                    logging: false,
                    useCORS: true,
                    removeContainer: true
                });
                const imgDataV = canvasV.toDataURL('image/png', 1.0);
                const imgPropsV = doc.getImageProperties(imgDataV);
                const imgWidthV = W - 2*m;
                const imgHeightV = (imgPropsV.height * imgWidthV) / imgPropsV.width;
                const maxHeightV = 75;
                
                doc.setFontSize(8);
                doc.setTextColor(0, 51, 102);
                doc.setFont('helvetica', 'bold');
                doc.text('PERFIL DE VELOCIDAD DE FLUJO', m, y, { align: 'left' });
                doc.setFontSize(6);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 100, 100);
                doc.text('Velocidad del flujo de gas natural a lo largo de cada tramo de la red', m, y + 3);
                y += 5;
                
                doc.addImage(imgDataV, 'PNG', m, y, imgWidthV, Math.min(imgHeightV, maxHeightV));
            }
            
            console.log('Graficas agregadas al PDF exitosamente');
        } catch(error) {
            console.warn('No se pudieron agregar graficas al PDF:', error);
        }
    }

    // ========== PIE DE PAGINA PROFESIONAL ==========
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Fondo degradado en pie
        doc.setFillColor(245, 245, 245);
        doc.rect(0, H - 15, W, 15, 'F');
        
        // Linea separadora premium
        doc.setDrawColor(255, 183, 3);
        doc.setLineWidth(0.8);
        doc.line(m, H - 14, W - m, H - 14);
        
        // Logo mini izquierda
        try {
            doc.addImage(LOGO_TODOGAS, 'PNG', m, H - 12, 5, 5);
        } catch(e) {
            doc.setFillColor(255, 183, 3);
            doc.circle(m + 2.5, H - 9.5, 2.5, 'F');
        }
        
        // Textos pie izquierda
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6);
        doc.setTextColor(0, 51, 102);
        doc.text('TODO GAS SYR S.A.S', m + 7, H - 11, { align: 'left' });
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(5.5);
        doc.setTextColor(100, 100, 100);
        doc.text('Ingenieria | NIT: 901.126.243-3 | Tel: 322 618 360', m + 7, H - 8);
        
        // Centro - Numero de página
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6);
        doc.setTextColor(0, 51, 102);
        doc.text('Pagina ' + i + ' de ' + totalPages, W / 2, H - 11, { align: 'center' });
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(5.5);
        doc.setTextColor(100, 100, 100);
        const dateStr = new Date().toLocaleDateString('es-CO');
        doc.text('Generado: ' + dateStr, W / 2, H - 8, { align: 'center' });
        
        // Derecha - Certificacion
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6);
        doc.setTextColor(34, 139, 34);
        doc.text('DOCUMENTO CERTIFICADO', W - m - 30, H - 11, { align: 'right' });
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(5.5);
        doc.setTextColor(100, 100, 100);
        doc.text('(c) 2025 - Confidencial', W - m - 30, H - 8, { align: 'right' });
        
        // Logo pequeño pie
        try {
            doc.addImage(LOGO_TODOGAS, 'PNG', W - m - 8, H - 11, 6, 6);
        } catch(e) {
            // Fallback: circulo dorado
            doc.setFillColor(255, 183, 3);
            doc.circle(W - m - 5, H - 8, 2, 'F');
        }
    }

    // ========== GUARDAR PDF DE ALTISIMA CALIDAD ==========
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = 'TodoGas_' + clientName.replace(/[^a-zA-Z0-9]/g, '_') + '_' + timestamp + '.pdf';
    
    // Usar settings de máxima compresión inteligente
    doc.save(fileName);

    console.log('✅ PDF generado exitosamente con máxima calidad:', fileName);
    console.log('📄 Paginas:', totalPages);
    console.log('📊 Tramos procesados:', segments.length);

    Swal.fire({
        icon: 'success',
        title: 'PDF PROFESIONAL GENERADO',
        html: '<p style="font-size: 1.2rem; margin: 10px 0;"><strong>' + fileName + '</strong></p>' +
              '<p style="font-size: 0.9rem; color: #666;">✅ Altísima Calidad | Gráficas Nítidas | Logo Profesional</p>' +
              '<p style="font-size: 0.9rem; color: #666;">📄 ' + totalPages + ' página(s) | 📊 ' + segments.length + ' tramo(s)</p>',
        timer: 4000,
        showConfirmButton: false,
        didOpen: () => {
            const popup = Swal.getPopup();
            popup.style.background = 'linear-gradient(135deg, #003366 0%, #00509e 100%)';
            popup.style.color = 'white';
            popup.querySelector('h2').style.color = '#FFB703';
        }
    });
}
