/**
 * TODO GAS SYR S.A.S - Configuración
 * Sistema Profesional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 */

const config = {
    unidades: {
        presion: 'mbar',
        longitud: 'm',
        caudal: 'm³/h',
        diametro: 'mm',
        velocidad: 'm/s'
    },
    // Métodos de cálculo activos
    methods: {
        baja: 'darcy',      // 'darcy' | 'renouard'
        media: 'renouard'   // mantener media con Renouard
    },
    // Propiedades globales de gas (ajustables)
    gasProps: {
        density: 0.8,        // kg/m³ (GN típico)
        viscosity: 1.1e-5    // Pa·s
    },
    limites: {
        baja: {
            presionMax: 30,
            velocidadMax: { GN: 6, GLP: 5 },
            perdidaMaxPorcentual: { GN: 0.10, GLP: 0.08 },
            presionMinPf: 18,
            longitudMin: { GN: 0.3, GLP: 0.5 }
        },
        media: {
            presionMin: 100,
            presionMax: 5000,
            velocidadMax: { GN: 10, GLP: 8 },
            perdidaMaxPorcentual: { GN: 0.20, GLP: 0.15 },
            longitudMin: { GN: 0.5, GLP: 0.8 }
        }
    },
    materiales: {
        // rugosidad en mm (se convierte a m en cálculo)
        'PE AL PE': { rugosidad: 0.007, factorLE: 1.2 },
        'Cobre': { rugosidad: 0.0015, factorLE: 1.15 },
        'Acero': { rugosidad: 0.046, factorLE: 1.25 }
    },
    constantes: {
        GN: { C: 23200, a: 1.82, b: 4.82 },
        GLP: { C: 18500, a: 1.75, b: 4.75 }
    },
    diametrosEstandar: [12, 16, 20, 25, 32, 40, 50]
};
