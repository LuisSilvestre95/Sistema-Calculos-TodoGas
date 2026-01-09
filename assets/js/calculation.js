/**
 * TODO GAS SYR S.A.S - Funciones de Cálculo
 * Sistema Profesional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 * 
 * FÓRMULAS EXACTAS DEL EXCEL:
 * BAJA: Renouard lineal = 23200*0.67*LE*(Q^1.82)*(D^-4.82)
 * MEDIA: Renouard cuadrático = SQRT(P1²-(C*0.67^0.425*K^0.576/(4.61E-05*E^2.725))^1.74)
 */

// CONSTANTES GLOBALES
const PATM_MBAR = 723.6;  // Presión atmosférica en mbar
const FACTOR_RENOUARD = 23200 * 0.67;  // Constante Renouard
const FACTOR_VEL_BAJA = 345;  // Factor velocidad BAJA
const FACTOR_VEL_MEDIA = 354;  // Factor velocidad MEDIA
const FACTOR_LE_BAJA = 1.2;  // 20% adicional LE en BAJA
const FACTOR_LE_MEDIA = 0.2;  // 20% de LE en MEDIA

/**
 * Obtiene la presión atmosférica según la ciudad/altitud
 * @returns {number} Presión atmosférica en mbar
 */
function getPATM() {
    const atmPressureInput = document.getElementById('atmPressure');
    return atmPressureInput ? parseFloat(atmPressureInput.value) || PATM_MBAR : PATM_MBAR;
}

// ========================= 
// CÁLCULO BAJA PRESIÓN (EXCEL FILA 8+)
// =========================

/**
 * Calcula BAJA PRESIÓN exactamente como Excel:
 * F = E * 1.2
 * I = 23200 * 0.67 * F * (D^1.82) * (G^-4.82)
 * J = H - I
 * K = 345 * D * (((J/1000) + 0.7236)^-1) * (G^-2)
 */
function calculateSegmentBAJA(segment) {
    const { inicio, fin, caudal, longitud, diametro, pi, material } = segment;

    // Validar datos mínimos
    if (!caudal || !longitud || !diametro || pi === undefined || pi === null) {
        return { error: 'Datos incompletos en BAJA' };
    }

    // 1. LONGITUD EQUIVALENTE (LE)
    // F = E * 1.2
    const le = longitud * FACTOR_LE_BAJA;  // en metros
    const longTotal = longitud + le;

    // 2. PÉRDIDA DE PRESIÓN (RENOUARD BAJA)
    // I = 23200 * 0.67 * F * (D^1.82) * (G^-4.82)
    const perdida = FACTOR_RENOUARD * longTotal * Math.pow(caudal, 1.82) * Math.pow(diametro, -4.82);

    // 3. PRESIÓN FINAL
    // J = H - I
    const pf = Math.max(0, pi - perdida);

    // 4. VELOCIDAD
    // K = 345 * D * (((J/1000) + 0.7236)^-1) * (G^-2)
    const presionMediaAbsBar = (pf / 1000) + 0.7236;  // bar
    const velocidad = (presionMediaAbsBar > 0) 
        ? FACTOR_VEL_BAJA * caudal * Math.pow(presionMediaAbsBar, -1) * Math.pow(diametro, -2)
        : 0;

    // 5. PRESIONES ABSOLUTAS (referencia)
    const PATM = getPATM();
    const piAbs = (pi + PATM) / 1000;  // bar
    const pfAbs = (pf + PATM) / 1000;  // bar
    const deltaAbsoluto = piAbs - pfAbs;

    // 6. ESTADO
    // Validar: V ≤ 6 m/s, ΔP% ≤ 10%, Pf ≥ 18 mbar
    const perdidaPorc = pi > 0 ? (perdida / pi) * 100 : 0;
    const estado = (velocidad <= 6 && perdidaPorc <= 10 && pf >= 18) 
        ? 'APROBADO' 
        : 'REQUIERE AJUSTES';

    return {
        inicio,
        fin,
        caudal,           // m³/h
        longitud,         // m
        diametro,         // mm
        le,               // m
        longTotal,        // m
        pi,               // mbar
        perdida,          // mbar
        pf: Math.max(0, pf),           // mbar
        velocidad,        // m/s
        status: estado,
        piAbs,
        pfAbs,
        deltaAbsoluto,
        material,
        pressureType: 'baja'
    };
}

// ========================= 
// CÁLCULO MEDIA PRESIÓN (EXCEL FILA 7+)
// =========================

/**
 * Calcula MEDIA PRESIÓN exactamente como Excel:
 * J = F * 0.2
 * K = J + F
 * M = L + 723.6
 * N = M^2
 * O = SQRT(N - (C*0.67^0.425*K^0.576/(4.61E-05*E^2.725))^1.74)
 * P = O - 723.6
 * Q = (P*20)/1380
 * R = (M-O)/M
 * S = (L-P)/L
 * W = 354*C*(0.7236+P/1000)^-1*E^-2
 */
function calculateSegmentMEDIA(segment) {
    const { tramo, caudal, diametroNominal, diametroInterior, longitud, tee, codos, valvulas, pi } = segment;

    // Validar datos
    if (!caudal || !longitud || !diametroInterior || pi === undefined || pi === null) {
        return { error: 'Datos incompletos en MEDIA' };
    }

    // 1. LONGITUD EQUIVALENTE
    // J = F * 0.2
    const le = longitud * FACTOR_LE_MEDIA;
    const longTotal = longitud + le;  // K

    // 2. PRESIÓN ABSOLUTA
    // M = L + 723.6
    const p1Abs = pi + PATM_MBAR;  // mbar

    // 3. CUADRADO PRESIÓN ABSOLUTA
    // N = M^2
    const p1AbsQuad = Math.pow(p1Abs, 2);

    // 4. PRESIÓN 2 ABSOLUTA (FÓRMULA RENOUARD CUADRÁTICA MEDIA)
    // O = SQRT(N - (C*0.67^0.425*K^0.576/(4.61E-05*E^2.725))^1.74)
    const term1 = caudal * Math.pow(0.67, 0.425) * Math.pow(longTotal, 0.576);
    const term2 = 4.61e-5 * Math.pow(diametroInterior, 2.725);
    const term3 = Math.pow(term1 / term2, 1.74);
    const p2AbsQuad = Math.max(0, p1AbsQuad - term3);
    const p2Abs = Math.sqrt(p2AbsQuad);

    // 5. PRESIÓN FINAL MANOMÉTRICA
    // P = O - 723.6
    const pf = p2Abs - PATM_MBAR;

    // 6. CONVERSIÓN A PSI
    // Q = (P*20)/1380
    const psiValue = (pf * 20) / 1380;

    // 7. PÉRDIDAS
    // R = (M-O)/M (absoluta)
    const perdidaAbsoluta = (p1Abs > 0) ? ((p1Abs - p2Abs) / p1Abs) : 0;
    // S = (L-P)/L (manométrica)
    const perdidaManometrica = (pi > 0) ? ((pi - pf) / pi) : 0;

    // 8. VALIDACIÓN PÉRDIDAS < 10%
    const estPerdida = (perdidaManometrica < 0.10) ? 'APROBADO' : 'NO APROBADO';

    // 9. VELOCIDAD
    // W = 354*C*(0.7236+P/1000)^-1*E^-2
    const presAbsBar = (pf / 1000) + 0.7236;  // bar
    const velocidad = (presAbsBar > 0)
        ? FACTOR_VEL_MEDIA * caudal * Math.pow(presAbsBar, -1) * Math.pow(diametroInterior, -2)
        : 0;

    // 10. VALIDACIÓN VELOCIDAD < 20 m/s
    const estVelocidad = (velocidad < 20) ? 'APROBADO' : 'NO APROBADO';

    return {
        tramo,
        caudal,           // m³/h
        diametroNominal,  // pulg
        diametroInterior, // mm
        longitud,         // m
        tee,              // cantidad
        codos,            // cantidad
        valvulas,         // cantidad
        le,               // m
        longTotal,        // m
        pi,               // mbar (P1)
        p1Abs,            // mbar (M)
        p1AbsQuad,        // mbar² (N)
        p2Abs,            // mbar (O)
        pf: Math.max(0, pf),           // mbar (P2)
        psi: Math.max(0, psiValue),    // psi (Q)
        perdidaAbsoluta,  // % (R)
        perdidaManometrica, // % (S)
        estPerdida,       // Validación pérdida
        perdidaAcumAbs: perdidaAbsoluta,   // U
        perdidaAcumMan: perdidaManometrica, // V
        velocidad,        // m/s (W)
        estVelocidad,     // Validación velocidad
        status: (estPerdida === 'APROBADO' && estVelocidad === 'APROBADO') ? 'APROBADO' : 'REQUIERE AJUSTES',
        pressureType: 'media'
    };
}

/**
 * Calcula la longitud equivalente (LE) de un tramo
 * @param {number} longitud - Longitud del tramo en metros
 * @param {string} material - Tipo de material
 * @returns {number} - Longitud equivalente
 */
function calculateLE(longitud, material) {
    const factores = { 'PE AL PE': 1.2, 'Cobre': 1.15, 'Acero': 1.25 };
    return longitud * (factores[material] || 1.0);
}

/**
 * Calcula la pérdida de presión en un tramo
 * @param {number} caudal - Caudal en m³/h
 * @param {number} le - Longitud equivalente en metros
 * @param {number} diametro - Diámetro en mm
 * @param {string} gasType - Tipo de gas (GN, GLP)
 * @returns {number} - Pérdida de presión en mbar
 */
function calculatePressureLoss(caudal, le, diametro, gasType) {
    if (diametro <= 0 || le <= 0 || caudal <= 0) return 0;
    const { C, a, b } = config.constantes[gasType] || config.constantes['GN'];
    const deltaP = C * 0.67 * caudal * Math.pow(le, a) / Math.pow(diametro, b);
    return clamp(deltaP, 0, 10000, 0).toFixed(4);
}

/**
 * Calcula la velocidad del gas en un tramo
 * @param {number} caudal - Caudal en m³/h
 * @param {number} diametro - Diámetro en mm
 * @param {number} presion - Presión en mbar
 * @param {number} temperatura - Temperatura en °C (default 15)
 * @returns {number} - Velocidad en m/s
 */
function calculateVelocity(caudal, diametro, presion, temperatura = 15) {
    if (diametro <= 0 || caudal <= 0 || presion <= 0) return 0;
    const d_m = diametro / 1000;
    const area = Math.PI * Math.pow(d_m, 2) / 4;
    const presionAbsoluta = presion + 1013.25; // mbar a absoluta
    const temperaturaKelvin = temperatura + 273.15;
    const caudalReal = caudal * (1013.25 / presionAbsoluta) * (temperaturaKelvin / 288.15);
    const velocidad = (caudalReal / 3600) / area;
    return clamp(velocidad, 0, 100, 0).toFixed(2);
}

/**
 * Calcula el diámetro mínimo recomendado
 * @param {number} caudal - Caudal en m³/h
 * @param {number} longitud - Longitud en metros
 * @param {number} pi - Presión inicial en mbar
 * @param {number} perdidaMaxima - Pérdida máxima permitida en mbar
 * @param {string} material - Tipo de material
 * @param {string} gasType - Tipo de gas
 * @returns {number} - Diámetro mínimo recomendado
 */
function calcularDiametroMinimo(caudal, longitud, pi, perdidaMaxima, material, gasType) {
    const le = calculateLE(longitud, material);
    const { C, a, b } = config.constantes[gasType] || config.constantes['GN'];
    const diametro = Math.pow((C * 0.67 * caudal * Math.pow(le, a)) / perdidaMaxima, 1 / b);
    return config.diametrosEstandar.find(d => d >= diametro) || Math.ceil(diametro);
}

/**
 * Valida la presión inicial según el nivel de presión
 * @param {number} pi - Presión inicial en mbar
 * @param {string} tipo - Tipo de red (baja, media)
 * @returns {boolean} - True si la presión es válida
 */
function validarPresionInicial(pi, tipo) {
    const limites = config.limites[tipo] || config.limites['baja'];
    if (pi <= 0) {
        showAlert('La presión inicial debe ser un valor positivo', 'danger');
        return false;
    }
    if (tipo === 'baja' && pi > limites.presionMax) {
        showAlert(`En redes de baja presión, la presión inicial no debe superar los ${limites.presionMax} mbar`, 'danger');
        return false;
    }
    if (tipo === 'media' && (pi < limites.presionMin || pi > limites.presionMax)) {
        showAlert(`En redes de media presión, la presión inicial debe estar entre ${limites.presionMin} y ${limites.presionMax} mbar`, 'danger');
        return false;
    }
    return true;
}

/**
 * Valida que el diámetro sea estándar
 * @param {number} diametro - Diámetro en mm
 * @returns {boolean} - True si el diámetro es estándar
 */
function validateDiameter(diametro) {
    const diametroRedondeado = Math.round(diametro);
    return config.diametrosEstandar.includes(diametroRedondeado);
}

/**
 * Valida un tramo completo
 * @param {object} segment - Objeto del tramo
 * @returns {object} - Tramo validado
 */
function validateSegment(segment) {
    const nodeRegex = /^[A-Za-z0-9'_-]+$/;
    segment.inicio = nodeRegex.test(segment.inicio) ? sanitizeInput(segment.inicio) : `Nodo${segments.length + 1}`;
    segment.fin = nodeRegex.test(segment.fin) ? sanitizeInput(segment.fin) : `Nodo${segments.length + 2}`;
    segment.caudal = clamp(segment.caudal, 0.01, 1000, 1.0);
    segment.longitud = clamp(segment.longitud, 0.01, 10000, 1.0);
    segment.diametro = clamp(segment.diametro, 0.05, 1000, 10.0);
    segment.pi = clamp(segment.pi, 0.01, 10000, 25.0);
    segment.material = config.materiales[segment.material] ? segment.material : 'PE AL PE';
    segment.gasType = currentClient?.gasType || 'GN';
    return segment;
}

/**
 * Valida la conectividad de la red
 * @param {array} segments - Array de tramos
 * @returns {object} - Objeto de validación con valid y message
 */
function validateNetwork(segments) {
    if (segments.length === 0) return { valid: true };
    const nodes = new Set();
    const edges = new Set();
    segments.forEach(s => {
        nodes.add(s.inicio);
        nodes.add(s.fin);
        edges.add(`${s.inicio}-${s.fin}`);
    });
    const reachable = new Set([segments[0].inicio]);
    let changed = true;
    while (changed) {
        changed = false;
        segments.forEach(s => {
            if (reachable.has(s.inicio) && !reachable.has(s.fin)) {
                reachable.add(s.fin);
                changed = true;
            }
        });
    }
    if (reachable.size !== nodes.size) {
        return { valid: false, message: 'La red contiene nodos desconectados' };
    }
    return { valid: true };
}

/**
 * Verifica si un tramo cumple con los requisitos
 * @param {object} segment - Datos del tramo con velocidad, deltaP, etc
 * @returns {object} - Objeto con status, class y detalles
 */
function checkSegmentStatus({ velocidad, deltaP, pi, caudal, longitud, diametro, material, gasType }) {
    const tipo = currentClient?.pressureLevel || 'baja';
    const limites = config.limites[tipo] || config.limites['baja'];
    const { velocidadMax, perdidaMaxPorcentual, longitudMin } = limites[gasType] || limites['GN'];
    const esTramoMuyCorto = longitud < longitudMin;
    const relacionLD = longitud / (diametro / 1000);
    const relacionLDAceptable = relacionLD >= 10;
    const esDiametroValido = validateDiameter(diametro);
    const aprobado = esDiametroValido && velocidad <= velocidadMax && deltaP <= (perdidaMaxPorcentual * pi) && relacionLDAceptable && !esTramoMuyCorto;
    
    let detalles = {
        velocidadAceptable: velocidad <= velocidadMax,
        perdidaAceptable: deltaP <= (perdidaMaxPorcentual * pi),
        diametroValido: esDiametroValido,
        relacionLDAceptable,
        tramoNoMuyCorto: !esTramoMuyCorto
    };
    
    if (!aprobado) {
        const sugerenciaDiametro = calcularDiametroMinimo(caudal, longitud, pi, perdidaMaxPorcentual * pi, material, gasType);
        detalles.sugerencia = `Considere usar un diámetro de ${sugerenciaDiametro} mm`;
    }
    
    return {
        status: aprobado ?
            '<span class="status-badge status-approved"><i class="fas fa-check-circle"></i> Aprobado</span>' :
            `<span class="status-badge status-rejected"><i class="fas fa-times-circle"></i> Rechazado (${detalles.sugerencia || 'Verifique parámetros'})</span>`,
        class: aprobado ? "approved-row" : "rejected-row",
        detalles
    };
}

/**
 * Realiza una clasificación topológica de los tramos
 * @param {array} segments - Array de tramos
 * @returns {array} - Tramos ordenados topológicamente
 * @throws {Error} - Si la red contiene ciclos
 */
function topologicalSort(segments) {
    const graph = new Map();
    const inDegree = new Map();
    const nodes = new Set();
    
    segments.forEach(s => {
        nodes.add(s.inicio);
        nodes.add(s.fin);
    });
    
    nodes.forEach(node => inDegree.set(node, 0));
    
    segments.forEach(s => {
        if (!graph.has(s.inicio)) graph.set(s.inicio, []);
        graph.get(s.inicio).push(s.fin);
        inDegree.set(s.fin, inDegree.get(s.fin) + 1);
    });
    
    const queue = [];
    inDegree.forEach((degree, node) => {
        if (degree === 0) queue.push(node);
    });
    
    const sortedNodes = [];
    while (queue.length) {
        const node = queue.shift();
        sortedNodes.push(node);
        if (graph.has(node)) {
            graph.get(node).forEach(neighbor => {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if (inDegree.get(neighbor) === 0) queue.push(neighbor);
            });
        }
    }
    
    if (sortedNodes.length !== nodes.size) {
        const ciclicos = Array.from(nodes).filter(n => !sortedNodes.includes(n));
        throw new Error(`La red contiene ciclos involucrando los nodos: ${ciclicos.join(', ')}`);
    }
    
    return segments.sort((a, b) => sortedNodes.indexOf(a.inicio) - sortedNodes.indexOf(b.inicio));
}

/**
 * Calcula las presiones en cada nodo de la red
 * @param {array} segments - Array de tramos ordenados
 */
function calculateNodePressures(segments) {
    nodePressures.clear();
    if (segments.length === 0) return;
    
    nodePressures.set(segments[0].inicio, segments[0].pi);
    
    segments.forEach(segment => {
        const pi = nodePressures.get(segment.inicio) || segment.pi;
        const le = calculateLE(segment.longitud, segment.material);
        const deltaP = calculatePressureLoss(segment.caudal, le, segment.diametro, segment.gasType);
        const pf = pi - deltaP;
        
        if (nodePressures.has(segment.fin)) {
            nodePressures.set(segment.fin, Math.min(nodePressures.get(segment.fin), pf));
        } else {
            nodePressures.set(segment.fin, pf);
        }
    });
}
