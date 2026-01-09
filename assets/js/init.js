/**
 * TODO GAS SYR S.A.S - Inicialización Principal
 * Sistema Profesional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 */

// ========================= 
// VARIABLES GLOBALES
// =========================

const { jsPDF } = window.jspdf;
let segments = [];
let pressureChart = null;
let editingIndex = -1;
let nextPiValue = null;
let currentClient = null;
let confirmModal = null;
const nodePressures = new Map();

// ========================= 
// INICIALIZACIÓN
// =========================

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar modal de confirmación si existe
    const confirmModalEl = document.getElementById('confirmModal');
    if (confirmModalEl) {
        confirmModal = new bootstrap.Modal(confirmModalEl, { keyboard: true });
    }
    
    // Cargar datos guardados
    loadClientData();
    loadSegments();
    
    // Inicializar valor de Pi con presión inicial
    const piField = document.getElementById('pi');
    const initialPressure = document.getElementById('initialPressure');
    if (piField && initialPressure) {
        piField.value = initialPressure.value;
    }
    
    updatePiField();

    // Configurar event listeners de formularios
    setupFormListeners();
    
    // Configurar event listeners de botones
    setupButtonListeners();
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Enfocar en el primer input visible
    document.getElementById('clientName')?.focus();

    // Configurar navegación de pestañas
    setupTabNavigation();

    // Mejoras de navegación con teclado
    setupKeyboardNavigation();
    
    // Sincronizar Pi con presión inicial cuando cambia
    if (initialPressure && piField) {
        initialPressure.addEventListener('input', () => {
            if (segments.length === 0) {
                piField.value = initialPressure.value;
            }
        });
    }
    
    console.log('✅ Sistema TODO GAS inicializado correctamente');
});

/**
 * Configura los event listeners de formularios
 */
function setupFormListeners() {
    document.getElementById('projectForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        saveClientData();
    });

    // === AUTO-CALCULAR cuando cambia presión o tipo de presión ===
    document.getElementById('pressureLevel')?.addEventListener('change', () => {
        calculateNetwork(); // AUTO-CALCULA
    });

    // === AUTO-CALCULAR cuando cambia gas ===
    document.getElementById('gasType')?.addEventListener('change', () => {
        calculateNetwork(); // AUTO-CALCULA
    });
}

/**
 * Configura los event listeners de botones
 */
function setupButtonListeners() {
    // Los botones se llaman directamente desde HTML con onclick
    // Este función mantiene compatibilidad si necesitamos agregar más listeners programáticamente
}

/**
 * Configura la navegación entre pestañas
 */
function setupTabNavigation() {
    const mainTabs = document.querySelectorAll('#mainTabs .nav-link');
    mainTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', () => {
            if (tab.id === 'calculation-tab' && segments.length > 0) {
                calculateNetwork();
            }
        });
    });
}

/**
 * Configura la navegación con teclado mejorada
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.form) {
            e.preventDefault();
            const form = e.target.form;
            const inputs = Array.from(form.querySelectorAll('input, select, button'));
            const index = inputs.indexOf(e.target);
            
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                if (e.target.form.id === 'clientForm') {
                    saveClientData();
                } else if (e.target.form.id === 'segmentForm') {
                    addSegment();
                }
            }
        }
    });
}
