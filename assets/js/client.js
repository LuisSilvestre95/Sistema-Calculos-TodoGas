/**
 * TODO GAS SYR S.A.S - Funciones de Cliente
 * Sistema Profesional de Cálculo de Redes de Gas
 * © 2025 TODO GAS SYR S.A.S
 */

// ========================= 
// GESTIÓN DE DATOS DE CLIENTE
// =========================

/**
 * Guarda los datos del cliente en localStorage
 * @returns {boolean} - True si se guardó exitosamente
 */
function saveClientData() {
    const clientData = {
        name: sanitizeInput(document.getElementById('clientName')?.value || ''),
        address: sanitizeInput(document.getElementById('clientAddress')?.value || ''),
        projectDate: document.getElementById('projectDate')?.value || '',
        gasType: sanitizeInput(document.getElementById('gasType')?.value || 'GN'),
        pressureLevel: sanitizeInput(document.getElementById('pressureLevel')?.value || 'baja'),
        initialPressure: parseFloat(document.getElementById('initialPressure')?.value || 23),
        atmPressure: parseFloat(document.getElementById('atmPressure')?.value || 723.6),
        timestamp: new Date().toISOString()
    };

    // Validar campos obligatorios
    const requiredFields = ['name', 'address', 'gasType'];
    for (const field of requiredFields) {
        if (!clientData[field]) {
            const fieldNames = {
                'name': 'Cliente / Proyecto',
                'address': 'Dirección',
                'gasType': 'Tipo de Gas'
            };
            showAlert(`El campo ${fieldNames[field]} es obligatorio`, 'danger');
            return false;
        }
    }

    try {
        currentClient = clientData;
        localStorage.setItem('currentGasClient', JSON.stringify(currentClient));
        showAlert('Datos guardados correctamente', 'success');
        document.getElementById('inicio')?.focus();
        return true;
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        showAlert('Error al guardar los datos', 'danger');
        return false;
    }
}

/**
 * Carga datos del cliente desde localStorage
 */
function loadClientData() {
    try {
        const savedClient = localStorage.getItem('currentGasClient');
        if (savedClient) {
            currentClient = JSON.parse(savedClient);
            document.getElementById('clientName').value = currentClient.name || '';
            document.getElementById('clientAddress').value = currentClient.address || '';
            document.getElementById('projectDate').value = currentClient.projectDate || '';
            document.getElementById('gasType').value = currentClient.gasType || 'GN';
            document.getElementById('pressureLevel').value = currentClient.pressureLevel || 'baja';
            document.getElementById('initialPressure').value = currentClient.initialPressure || 23;
            document.getElementById('atmPressure').value = currentClient.atmPressure || 723.6;
        }
    } catch (error) {
        console.error('Error al cargar datos del cliente:', error);
    }
}

/**
 * Actualiza el resumen de datos del cliente en la UI
 */
function updateClientSummary() {
    if (!currentClient) {
        document.getElementById('clientSummary').style.display = 'none';
        return;
    }

    document.getElementById('sumClientId').textContent = `${currentClient.type}: ${currentClient.id}`;
    document.getElementById('sumClientName').textContent = currentClient.name;
    document.getElementById('sumClientPhone').textContent = currentClient.phone;
    document.getElementById('sumClientAddress').textContent = currentClient.address;
    document.getElementById('sumClientCity').textContent = currentClient.city;
    document.getElementById('sumClientDepartment').textContent = currentClient.department;
    document.getElementById('sumProjectType').textContent = currentClient.projectType;
    document.getElementById('sumGasType').textContent = currentClient.gasType;
    document.getElementById('sumClientEmail').textContent = currentClient.email || 'No especificado';
    document.getElementById('sumPressureLevel').textContent = currentClient.pressureLevel === 'media' ? 'Media Presión' : 'Baja Presión';
    document.getElementById('clientSummary').style.display = 'block';
}

/**
 * Limpia el formulario de cliente
 */
function clearClientForm() {
    showConfirm('¿Está seguro de limpiar los datos?', () => {
        document.getElementById('projectForm')?.reset();
        currentClient = null;
        localStorage.removeItem('currentGasClient');
        showAlert('Formulario limpiado', 'info');
    });
}
