/**
 * TODO GAS SYR S.A.S - Utilidades y Funciones Comunes
 * Sistema Profesional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 */

// ========================= 
// FUNCIONES DE UTILIDAD
// =========================

/**
 * Sanitiza entrada de usuario para prevenir XSS
 * @param {string} str - Cadena a sanitizar
 * @returns {string} - Cadena sanitizada
 */
function sanitizeInput(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    }[m])).trim();
}

/**
 * Limita un valor entre mínimo y máximo
 * @param {number} value - Valor a limitar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @param {number} def - Valor por defecto si es NaN
 * @returns {number} - Valor limitado
 */
function clamp(value, min, max, def) {
    const num = parseFloat(value);
    return isNaN(num) ? def : Math.max(min, Math.min(max, num));
}

/**
 * Convierte unidades de presión y longitud
 * @param {number} valor - Valor a convertir
 * @param {string} tipo - Tipo de unidad (presion, longitud)
 * @param {string} de - Unidad origen
 * @param {string} a - Unidad destino
 * @returns {number} - Valor convertido
 */
function convertirUnidad(valor, tipo, de, a) {
    const conversiones = {
        presion: {
            mbar: { kPa: 0.1, psi: 0.0145038 },
            kPa: { mbar: 10, psi: 0.145038 },
            psi: { mbar: 68.9476, kPa: 6.89476 }
        },
        longitud: {
            m: { ft: 3.28084 },
            ft: { m: 0.3048 }
        }
    };
    if (de === a) return valor;
    return valor * (conversiones[tipo]?.[de]?.[a] || 1);
}

/**
 * Muestra una alerta en la pantalla
 * @param {string} message - Mensaje de la alerta
 * @param {string} type - Tipo de alerta (success, danger, warning, info)
 */
function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    alertBox.className = `alert alert-${type} show`;
    alertMessage.textContent = message;
    alertIcon.className = `fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'times-circle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}`;
    alertBox.style.display = 'flex';

    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => { alertBox.style.display = 'none'; }, 300);
    }, 5000);
}

/**
 * Muestra un modal de confirmación
 * @param {string} message - Mensaje de confirmación
 * @param {function} callback - Función a ejecutar si se confirma
 */
function showConfirm(message, callback) {
    const modalBody = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmBtn');
    if (!modalBody || !confirmBtn || !confirmModal) {
        if (confirm(message)) {
            callback();
        }
        return;
    }
    modalBody.textContent = message;
    confirmBtn.onclick = () => {
        callback();
        confirmModal.hide();
    };
    confirmModal.show();
}
