/**
 * TODO GAS SYR S.A.S - Configuración de Ciudades
 * Sistema Nacional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 */

/**
 * Actualiza la presión atmosférica según la ciudad seleccionada
 */
function updateAtmPressure() {
    const citySelect = document.getElementById('cityAltitude');
    const atmInput = document.getElementById('atmPressure');
    
    if (!citySelect || !atmInput) return;
    
    const value = citySelect.value;
    
    if (value === 'custom') {
        atmInput.readOnly = false;
        atmInput.focus();
        atmInput.select();
    } else {
        atmInput.readOnly = false; // Permitir edición manual
        atmInput.value = value;
        
        // Recalcular red si existe
        if (typeof calculateNetwork === 'function') {
            calculateNetwork();
        }
    }
}

/**
 * Base de datos de ciudades colombianas con presión atmosférica
 */
const colombianCities = {
    // Costa Caribe y Pacífica (0-100m)
    'Barranquilla': { altitude: 18, pressure: 1013 },
    'Cartagena': { altitude: 2, pressure: 1013 },
    'Santa Marta': { altitude: 6, pressure: 1013 },
    'Montería': { altitude: 18, pressure: 1013 },
    'Sincelejo': { altitude: 213, pressure: 990 },
    'Riohacha': { altitude: 6, pressure: 1013 },
    'Valledupar': { altitude: 169, pressure: 995 },
    'Buenaventura': { altitude: 7, pressure: 1013 },
    
    // Valle del Cauca
    'Cali': { altitude: 1018, pressure: 900 },
    'Palmira': { altitude: 1001, pressure: 902 },
    'Buenaventura': { altitude: 7, pressure: 1013 },
    
    // Eje Cafetero
    'Medellín': { altitude: 1495, pressure: 860 },
    'Pereira': { altitude: 1411, pressure: 865 },
    'Manizales': { altitude: 2153, pressure: 785 },
    'Armenia': { altitude: 1551, pressure: 853 },
    
    // Región Andina
    'Bogotá': { altitude: 2640, pressure: 748 },
    'Tunja': { altitude: 2820, pressure: 723.6 },
    'Duitama': { altitude: 2590, pressure: 752 },
    'Sogamoso': { altitude: 2569, pressure: 755 },
    'Cúcuta': { altitude: 320, pressure: 975 },
    'Bucaramanga': { altitude: 959, pressure: 906 },
    'Ibagué': { altitude: 1285, pressure: 878 },
    'Neiva': { altitude: 442, pressure: 962 },
    'Popayán': { altitude: 1738, pressure: 830 },
    'Pasto': { altitude: 2527, pressure: 758 },
    
    // Región Amazónica y Orinoquía
    'Villavicencio': { altitude: 467, pressure: 959 },
    'Yopal': { altitude: 350, pressure: 970 },
    'Florencia': { altitude: 242, pressure: 987 },
    'Leticia': { altitude: 96, pressure: 1002 },
    'Puerto Carreño': { altitude: 51, pressure: 1008 }
};

/**
 * Calcula presión atmosférica según altitud (fórmula barométrica)
 * @param {number} altitude - Altitud en metros
 * @returns {number} Presión atmosférica en mbar
 */
function calculatePressureFromAltitude(altitude) {
    // Fórmula barométrica: P = P0 × (1 - 0.0065h/T0)^5.255
    const P0 = 1013.25; // mbar al nivel del mar
    const T0 = 288.15; // K (temperatura estándar)
    const pressure = P0 * Math.pow(1 - (0.0065 * altitude) / T0, 5.255);
    return Math.round(pressure * 10) / 10; // Redondear a 1 decimal
}
