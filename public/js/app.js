import { dataTypes, codeSets, specStructure, basicDataTypes } from './data.js';

// Tab Switching Function
window.switchTab = function(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
};

// Modal Functions
window.closeModal = function() {
    document.getElementById('dataTypeModal').classList.remove('show');
};

window.showDataTypeModal = function(typeName) {
    const modal = document.getElementById('dataTypeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const dataType = dataTypes[typeName];
    
    if (!dataType) {
        modalBody.innerHTML = `<p style="padding:20px;">Not found: <strong>${typeName}</strong></p>`;
        modalTitle.textContent = typeName;
        modal.classList.add('show');
        return;
    }
    
    let content = `<div class="modal-section"><div class="modal-section-title">${typeName}</div>`;
    content += `<div class="modal-info-row"><div class="modal-info-label">Type:</div><div class="modal-info-value">${dataType.type}</div></div>`;
    
    if (dataType.length) {
        content += `<div class="modal-info-row"><div class="modal-info-label">Length:</div><div class="modal-info-value">${dataType.length}</div></div>`;
    }
    
    if (dataType.desc) {
        content += `<div class="modal-info-row"><div class="modal-info-label">Description:</div><div class="modal-info-value">${dataType.desc}</div></div>`;
    }
    
    // Show base type information if available
    if (dataType.baseType && basicDataTypes[dataType.baseType]) {
        const baseType = basicDataTypes[dataType.baseType];
        content += `<div class="modal-info-row"><div class="modal-info-label">Base Type:</div><div class="modal-info-value">
            <span class="base-type-link" onclick="showBasicTypeModal('${dataType.baseType}')">${dataType.baseType}</span>
        </div></div>`;
        content += `</div><div class="modal-section"><div class="modal-section-title">Base Type: ${dataType.baseType}</div>`;
        content += `<div class="modal-info-row"><div class="modal-info-label">Definition:</div><div class="modal-info-value">${baseType.definition}</div></div>`;
        content += `<div class="modal-info-row"><div class="modal-info-label">Format:</div><div class="modal-info-value"><code>${baseType.format}</code></div></div>`;
        if (baseType.example) {
            content += `<div class="modal-info-row"><div class="modal-info-label">Example:</div><div class="modal-info-value"><code>${baseType.example}</code></div></div>`;
        }
    }
    
    if (dataType.codeSet && codeSets[dataType.codeSet]) {
        content += `</div><div class="modal-section"><div class="modal-section-title">Valid Codes (${dataType.codeSet})</div>`;
        content += '<table class="code-set-table"><thead><tr><th>Code</th><th>Name</th><th>Definition</th></tr></thead><tbody>';
        
        codeSets[dataType.codeSet].forEach(code => {
            content += `<tr>
                <td class="code-name">${code.code}</td>
                <td>${code.name || '-'}</td>
                <td>${code.desc || '-'}</td>
            </tr>`;
        });
        
        content += '</tbody></table>';
    }
    
    content += '</div>';
    modalTitle.textContent = typeName;
    modalBody.innerHTML = content;
    modal.classList.add('show');
};

window.showBasicTypeModal = function(typeName) {
    const modal = document.getElementById('dataTypeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const basicType = basicDataTypes[typeName];
    
    if (!basicType) {
        modalBody.innerHTML = `<p style="padding:20px;">Not found: <strong>${typeName}</strong></p>`;
        modalTitle.textContent = typeName;
        modal.classList.add('show');
        return;
    }
    
    let content = `<div class="modal-section"><div class="modal-section-title">${typeName}</div>`;
    
    if (basicType.definition) {
        content += `<div class="modal-info-row"><div class="modal-info-label">Definition:</div><div class="modal-info-value">${basicType.definition}</div></div>`;
    }
    
    if (basicType.format) {
        content += `<div class="modal-info-row"><div class="modal-info-label">Format:</div><div class="modal-info-value"><code>${basicType.format}</code></div></div>`;
    }
    
    if (basicType.example) {
        content += `<div class="modal-info-row"><div class="modal-info-label">Example:</div><div class="modal-info-value"><code>${basicType.example}</code></div></div>`;
    }
    
    if (basicType.notes) {
        content += `<div class="modal-info-row"><div class="modal-info-label">Notes:</div><div class="modal-info-value">${basicType.notes}</div></div>`;
    }
    
    if (basicType.reference) {
        content += `<div class="modal-info-row"><div class="modal-info-label">Reference:</div><div class="modal-info-value"><a href="${basicType.reference}" target="_blank" rel="noopener noreferrer">${basicType.reference}</a></div></div>`;
    }
    
    content += '</div>';
    modalTitle.textContent = typeName;
    modalBody.innerHTML = content;
    modal.classList.add('show');
};

// Event Listeners for Modal
window.addEventListener('click', (e) => {
    if (e.target.id === 'dataTypeModal') {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Render Specification Tree
function renderSpecTree() {
    const container = document.getElementById('specTree');
    container.innerHTML = '';
    
    // Get current transaction type to determine which structure to show
    const transactionTypeElement = document.getElementById('transactionType');
    const transactionType = transactionTypeElement ? transactionTypeElement.value : 'Sale';
    
    // Determine which structure to display
    let structureToShow;
    if (transactionType === 'Report') {
        structureToShow = 'OCreportRequest';
    } else if (transactionType === 'SessionManagement') {
        structureToShow = 'OCsessionManagementRequest';
    } else if (transactionType === 'Void') {
        structureToShow = 'OCserviceRequestReversal';
    } else if (transactionType === 'Settle') {
        structureToShow = 'OCserviceRequestBatch';
    
    } else {
        structureToShow = 'OCserviceRequest';
    }
    
    function createNode(name, data, level = 0) {
        const div = document.createElement('div');
        div.className = 'tree-node';
        
        const indent = '│  '.repeat(level);
        const hasChildren = typeof data === 'object' && !data.type;
        const toggle = hasChildren ? '▼' : ' ';
        
        let content = `${indent}<span class="tree-toggle">${toggle}</span><span class="tree-field">${name}</span>`;
        
        if (data.cardinality) {
            content += ` <span class="tree-cardinality">${data.cardinality}</span>`;
        }
        
        if (data.type) {
            content += ` <span class="tree-type clickable-type">${data.type}</span>`;
            
            if (dataTypes[data.type] && dataTypes[data.type].length) {
                content += ` <span class="tree-constraint">${dataTypes[data.type].length}</span>`;
            }
        }
        
        div.innerHTML = content;
        
        if (data.type) {
            div.classList.add('clickable');
            div.addEventListener('click', (e) => {
                e.stopPropagation();
                // Check if it's a basic type first
                if (basicDataTypes[data.type]) {
                    showBasicTypeModal(data.type);
                } else {
                    showDataTypeModal(data.type);
                }
            });
        }
        
        container.appendChild(div);
        
        if (hasChildren) {
            Object.keys(data).forEach(key => {
                if (key !== 'type' && key !== 'cardinality') {
                    createNode(key, data[key], level + 1);
                }
            });
        }
    }
    
    // Only render the selected structure
  if (specStructure[structureToShow]) {
    // For reversal and batch, display as OCserviceRequest in the tree but use their specific structures
    const displayName = (structureToShow === 'OCserviceRequestReversal' || structureToShow === 'OCserviceRequestBatch') 
        ? 'OCserviceRequest' 
        : structureToShow;
    createNode(displayName, specStructure[structureToShow]);
}
}

// Render Data Types
function renderDataTypes() {
    const container = document.getElementById('dataTypes');
    
    let html = '<div style="padding:10px;background:#e3f2fd;border-radius:6px;margin-bottom:15px;">';
    html += '<strong>Click data types below</strong> to view details and code sets in a popup dialog.</div>';
    
    Object.keys(dataTypes).forEach(name => {
        const dt = dataTypes[name];
        html += `<div class="data-type-item data-type-clickable" data-type="${name}">
            <div class="data-type-name">${name}</div>
            <div class="data-type-details">Type: ${dt.type}`;
        
        if (dt.length) html += ` | Length: ${dt.length}`;
        if (dt.codeSet) html += ` | CodeSet: ${dt.codeSet}`;
        if (dt.desc) html += `<br>${dt.desc}`;
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
    
    // Add click handlers to data type items
    container.querySelectorAll('.data-type-clickable').forEach(item => {
        item.addEventListener('click', function() {
            const typeName = this.getAttribute('data-type');
            showDataTypeModal(typeName);
        });
    });
}

// Render Basic Data Types
function renderBasicTypes() {
    const container = document.getElementById('basicTypes');
    
    let html = '<div style="padding:10px;background:#e8f5e9;border-radius:6px;margin-bottom:15px;">';
    html += '<strong>Click any basic type</strong> to view its complete definition and format specifications.</div>';
    
    html += '<div class="basic-types-grid">';
    
    Object.keys(basicDataTypes).forEach(name => {
        const bt = basicDataTypes[name];
        html += `<div class="basic-type-card" data-basic-type="${name}">
            <div class="basic-type-name">${name}</div>
            <div class="basic-type-format">${bt.format}</div>
            <div class="basic-type-preview">${bt.definition.substring(0, 80)}...</div>
        </div>`;
    });
    
    html += '</div>';
    
    container.innerHTML = html;
    
    // Add click handlers to basic type cards
    container.querySelectorAll('.basic-type-card').forEach(card => {
        card.addEventListener('click', function() {
            const typeName = this.getAttribute('data-basic-type');
            showBasicTypeModal(typeName);
        });
    });
}

// Handle transaction type changes to show/hide conditional fields
window.handleTransactionTypeChange = function() {
    const transactionType = document.getElementById('transactionType').value;
    const tipGroup = document.querySelector('[data-field="tip"]');
    const reportTypeGroup = document.querySelector('[data-field="reportType"]');
    const sessionTypeGroup = document.querySelector('[data-field="sessionType"]');
    const exchangeActionGroup = document.querySelector('[data-field="exchangeAction"]');
    const exchangeTypeGroup = document.querySelector('[data-field="exchangeType"]');
    const deviceStateGroup = document.querySelector('[data-field="deviceState"]');
    const exchangeIdentificationGroup = document.querySelector('[data-field="exchangeIdentification"]');
    const originalTransactionIdGroup = document.querySelector('[data-field="originalTransactionId"]');
    
    // Hide all conditional fields first
    tipGroup.style.display = 'none';
    reportTypeGroup.style.display = 'none';
    sessionTypeGroup.style.display = 'none';
    exchangeActionGroup.style.display = 'none';
    exchangeTypeGroup.style.display = 'none';
    deviceStateGroup.style.display = 'none';
    exchangeIdentificationGroup.style.display = 'none';
    originalTransactionIdGroup.style.display = 'none';
    
    // Show TIP only for SALE transactions
    if (transactionType === 'Sale') {
        tipGroup.style.display = 'block';
        document.getElementById('tip').value = '0.00';
    } else {
        document.getElementById('tip').value = '0.00';
    }
    
    // Show Report Type only for REPORT transactions
    if (transactionType === 'Report') {
        reportTypeGroup.style.display = 'block';
    }
    
    // Show Session Management fields for SESSION-MANAGEMENT
    if (transactionType === 'SessionManagement') {
        sessionTypeGroup.style.display = 'block';
        exchangeActionGroup.style.display = 'block';
        exchangeTypeGroup.style.display = 'block';
        deviceStateGroup.style.display = 'block';
        // Check if exchange action requires identification
        handleExchangeActionChange();
    }
    
    // Show Original Transaction ID for VOID
    if (transactionType === 'Void') {
        originalTransactionIdGroup.style.display = 'block';
    }
    
    // Re-render the spec tree to show the appropriate message structure
    renderSpecTree();
};

// Handle exchange action changes to show/hide exchange identification
window.handleExchangeActionChange = function() {
    const exchangeAction = document.getElementById('exchangeAction').value;
    const exchangeIdentificationGroup = document.querySelector('[data-field="exchangeIdentification"]');
    const deviceStateSelect = document.getElementById('deviceState');
    
    // Show Exchange Identification field for RETR, RECV, or CANC
    if (['RETR', 'RECV', 'CANC'].includes(exchangeAction)) {
        exchangeIdentificationGroup.style.display = 'block';
    } else {
        exchangeIdentificationGroup.style.display = 'none';
        document.getElementById('exchangeIdentification').value = '';
    }
    
    // Update Device State options based on Exchange Action
    if (exchangeAction === 'NOTI') {
        // For NOTI, only show BUSY and IDLE
        deviceStateSelect.innerHTML = `
            <option value="">Select State (Required for NOTI)</option>
            <option value="BUSY">Busy</option>
            <option value="IDLE">Idle</option>
        `;
    } else {
        // For other actions, show all states
        deviceStateSelect.innerHTML = `
            <option value="">None</option>
            <option value="BUSY">Busy</option>
            <option value="IDLE">Idle</option>
            <option value="UNAV">Unavailable</option>
            <option value="OFFL">Offline</option>
        `;
    }
};

// Helper function to generate sample values for different types
function generateValueForType(type) {
    const samples = {
        'ST-RenterName': 'John Doe',
        'ST-VehicleRentalAgreementNumber': 'RA' + Math.floor(Math.random() * 1000000),
        'ST-VehicleLocationName': 'Downtown Rental Center',
        'ST-TownName': 'Montreal',
        'ST-CountrySubDivision': 'Quebec',
        'ST-CountryCodeA2': 'CA',
        'ST-VehicleRentalLocaltionIdentifier': 'LOC' + Math.floor(Math.random() * 1000),
        'ST-FolioNumber': 'FN' + Math.floor(Math.random() * 100000),
        'ST-PropertyName': 'Grand Hotel Downtown',
        'ST-PhoneNumber': '+1-514-555-0100',
        'ST-TravelTicketNumber': 'TKT' + Math.floor(Math.random() * 10000000),
        'ST-IATACarrierCode': 'AC',
        'ST-IATAAgencyNumber': '12345678',
        'ST-TravelAgencyName': 'Travel Solutions Inc',
        'ST-PassengerName': 'Jane Smith',
        'ST-IATALocationIdentifier': ['YUL', 'YYZ', 'JFK', 'LAX'][Math.floor(Math.random() * 4)],
        'ST-FlightNumber': 'AC' + Math.floor(100 + Math.random() * 900)
    };
    return samples[type] || 'N/A';
}

// Helper function to generate code set values
function generateCodeSetValue(codeSet) {
    const codeSets = {
        'CS-VehicleRentalCategoryCode': ['ECAR', 'CCAR', 'ICAR', 'FCAR', 'SCAR'][Math.floor(Math.random() * 5)],
        'CS-FireSafetyActIndicator': ['Y', 'N'][Math.floor(Math.random() * 2)],
        'CS-TravelPackageIndicator': ['Y', 'N'][Math.floor(Math.random() * 2)]
    };
    return codeSets[codeSet] || 'N/A';
}

// Generate Vehicle Rental Data
function generateVehicleRentalData() {
    return {
        RenterName: generateValueForType('ST-RenterName'),
        RentalAgreementNumber: generateValueForType('ST-VehicleRentalAgreementNumber'),
        RentalProgramCode: "CO",
        VehicleCategoryCode: generateCodeSetValue('CS-VehicleRentalCategoryCode'),
        RentalDuration: 3,
        PeriodRentalRate: 89.99,
        RatePeriodUnit: "Daily",
        PickupDate: "2025-10-01",
        PickupTime: "10:00:00",
        PickupLocation: {
            Name: generateValueForType('ST-VehicleLocationName'),
            TownName: generateValueForType('ST-TownName'),
            CountrySubDivision: generateValueForType('ST-CountrySubDivision'),
            Country: generateValueForType('ST-CountryCodeA2')
        },
        ReturnDate: "2025-10-04",
        ReturnTime: "10:00:00",
        ReturnLocation: {
            Identifier: generateValueForType('ST-VehicleRentalLocaltionIdentifier'),
            Name: generateValueForType('ST-VehicleLocationName'),
            TownName: generateValueForType('ST-TownName'),
            CountrySubDivision: generateValueForType('ST-CountrySubDivision'),
            LocationCountry: generateValueForType('ST-CountryCodeA2')
        }
    };
}

// Generate Lodging Data
function generateLodgingData() {
    return {
        RenterName: generateValueForType('ST-RenterName'),
        FolioNumber: generateValueForType('ST-FolioNumber'),
        Property: {
            Name: generateValueForType('ST-PropertyName'),
            PhoneNumber: generateValueForType('ST-PhoneNumber'),
            TownName: generateValueForType('ST-TownName'),
            CountrySubDivision: generateValueForType('ST-CountrySubDivision'),
            Country: generateValueForType('ST-CountryCodeA2')
        },
        FireSafetyActIndicator: generateCodeSetValue('CS-FireSafetyActIndicator'),
        CheckInDate: "2025-10-01",
        CheckOutDate: "2025-10-03",
        Duration: 2,
        NumberOfRooms: 1,
        NumberOfGuests: 2,
        RoomDetail: [{
            DailyRate: 149.99,
            Duration: 2,
            TaxAmount: 18.75
        }],
        TotalTaxAmount: 37.50,
        TotalRoomTaxAmount: 37.50
    };
}

// Generate Travel Data
function generateTravelData() {
    return {
        TicketNumber: generateValueForType('ST-TravelTicketNumber'),
        IATACarrierCode: generateValueForType('ST-IATACarrierCode'),
        TravelAgency: {
            IATANumber: generateValueForType('ST-IATAAgencyNumber'),
            Name: generateValueForType('ST-TravelAgencyName')
        },
        TravelPackageIndicator: generateCodeSetValue('CS-TravelPackageIndicator'),
        PassengerName: generateValueForType('ST-PassengerName'),
        TravelDate: "2025-10-15",
        TripSegment: [{
            DepartureDate: "2025-10-15",
            DepartureTime: "08:30:00",
            OriginCode: generateValueForType('ST-IATALocationIdentifier'),
            DestinationCode: generateValueForType('ST-IATALocationIdentifier'),
            FlightNumber: generateValueForType('ST-FlightNumber'),
            IATACarrierCode: generateValueForType('ST-IATACarrierCode'),
            TravelClass: "Y"
        }]
    };
}

// Validation Functions
function validateJSON(jsonData, rootElementName) {
    const validationResults = {
        errors: [],
        warnings: [],
        info: []
    };
    
    const structure = specStructure[rootElementName];
    const data = jsonData[rootElementName];
    
    if (!structure || !data) {
        validationResults.errors.push('Invalid root element structure');
        displayValidationResults(validationResults);
        return;
    }
    
    // Validate recursively
    validateNode(data, structure, rootElementName, validationResults);
    
    // Display results
    displayValidationResults(validationResults);
}

function validateNode(data, spec, path, results) {
    if (!spec || typeof spec !== 'object') return;
    
    // Check each field in the spec
    Object.keys(spec).forEach(key => {
        const fieldSpec = spec[key];
        const fieldPath = `${path}.${key}`;
        const fieldValue = data[key];
        
        // Check if field has a type (leaf node)
        if (fieldSpec.type) {
            validateField(fieldValue, fieldSpec, fieldPath, results);
        } else {
            // It's a nested object
            if (fieldValue !== undefined && fieldValue !== null) {
                validateNode(fieldValue, fieldSpec, fieldPath, results);
            } else {
                // Check cardinality for nested objects
                if (fieldSpec.cardinality && isRequired(fieldSpec.cardinality)) {
                    results.errors.push(`Missing required field: ${fieldPath}`);
                }
            }
        }
    });
}

function validateField(value, spec, path, results) {
    const cardinality = spec.cardinality;
    const typeName = spec.type;
    
    // Check required fields
    if (isRequired(cardinality)) {
        if (value === undefined || value === null || value === '') {
            results.errors.push(`Missing required field: ${path} (${cardinality})`);
            return;
        }
    }
    
    // If field is optional and empty, skip further validation
    if (value === undefined || value === null || value === '') {
        return;
    }
    
    // Get type definition
    const typeDefinition = dataTypes[typeName];
    
    if (typeDefinition) {
        // Validate length
        if (typeDefinition.length) {
            validateLength(value, typeDefinition.length, path, results);
        }
        
        // Validate code set
        if (typeDefinition.codeSet && codeSets[typeDefinition.codeSet]) {
            validateCodeSet(value, typeDefinition.codeSet, path, results);
        }
        
        // Validate base type format
        if (typeDefinition.baseType) {
            validateBaseType(value, typeDefinition.baseType, path, results);
        }
    } else {
        // Direct basic type validation
        validateBaseType(value, typeName, path, results);
    }
}

function isRequired(cardinality) {
    if (!cardinality) return false;
    // [1..1] or [1..n] means required
    return cardinality.startsWith('[1');
}

function validateLength(value, lengthSpec, path, results) {
    const strValue = String(value);
    const len = strValue.length;
    
    // Parse length specification
    // {n} = exact length n
    // [n,m] = between n and m
    // [n,*] = at least n
    
    if (lengthSpec.startsWith('{') && lengthSpec.endsWith('}')) {
        const exactLength = parseInt(lengthSpec.slice(1, -1));
        if (len !== exactLength) {
            results.errors.push(`${path}: Length must be exactly ${exactLength} (current: ${len})`);
        }
    } else if (lengthSpec.startsWith('[')) {
        const match = lengthSpec.match(/\[(\d+),(\d+|\*)\]/);
        if (match) {
            const min = parseInt(match[1]);
            const max = match[2] === '*' ? Infinity : parseInt(match[2]);
            
            if (len < min) {
                results.errors.push(`${path}: Length must be at least ${min} (current: ${len})`);
            } else if (len > max) {
                results.errors.push(`${path}: Length must be at most ${max} (current: ${len})`);
            }
        }
    }
}

function validateCodeSet(value, codeSetName, path, results) {
    const codeSet = codeSets[codeSetName];
    if (!codeSet) return;
    
    const validCodes = codeSet.map(c => c.code);
    if (!validCodes.includes(value)) {
        results.errors.push(`${path}: Invalid code "${value}". Valid codes: ${validCodes.join(', ')}`);
    } else {
        results.info.push(`${path}: Valid code "${value}"`);
    }
}

function validateBaseType(value, baseTypeName, path, results) {
    const strValue = String(value);
    
    switch(baseTypeName) {
        case 'UUID':
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidPattern.test(strValue)) {
                results.errors.push(`${path}: Invalid UUID format`);
            }
            break;
            
        case 'ISODateTime':
            const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
            if (!isoDateTimePattern.test(strValue)) {
                results.errors.push(`${path}: Invalid ISO DateTime format (expected: YYYY-MM-DDThh:mm:ss.sssZ)`);
            }
            break;
            
        case 'ISODate':
            const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!isoDatePattern.test(strValue)) {
                results.errors.push(`${path}: Invalid ISO Date format (expected: YYYY-MM-DD)`);
            }
            break;
            
        case 'ISOTime':
            const isoTimePattern = /^\d{2}:\d{2}:\d{2}$/;
            if (!isoTimePattern.test(strValue)) {
                results.errors.push(`${path}: Invalid ISO Time format (expected: hh:mm:ss)`);
            }
            break;
            
        case 'Boolean':
            if (value !== true && value !== false) {
                results.warnings.push(`${path}: Expected boolean value (true/false)`);
            }
            break;
            
        case 'Number':
        case 'Decimal':
            if (isNaN(value)) {
                results.errors.push(`${path}: Must be a valid number`);
            }
            break;
            
        case 'DigitString':
            if (!/^\d*$/.test(strValue)) {
                results.errors.push(`${path}: Must contain only digits (0-9)`);
            }
            break;
            
        case 'Amount':
            const amount = parseFloat(value);
            if (isNaN(amount) || amount < 0) {
                results.errors.push(`${path}: Must be a valid positive amount`);
            }
            if (!/^\d+\.\d{2}$/.test(strValue)) {
                results.warnings.push(`${path}: Amount should have exactly 2 decimal places`);
            }
            break;
    }
}

function displayValidationResults(results) {
    const container = document.getElementById('validationResults');
    
    let html = '<div style="padding: 20px;">';
    
    // Summary
    const totalIssues = results.errors.length + results.warnings.length;
    if (totalIssues === 0) {
        html += `<div class="validation-status validation-success" style="margin-bottom: 20px;">
            <strong>✓ Validation Passed</strong><br>
            No errors or warnings found. The request is valid.
        </div>`;
    } else {
        html += `<div class="validation-summary" style="margin-bottom: 20px; padding: 15px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px;">
            <strong>Validation Summary:</strong><br>
            ${results.errors.length} Error(s), ${results.warnings.length} Warning(s)
        </div>`;
    }
    
    // Errors
    if (results.errors.length > 0) {
        html += '<div class="validation-section"><h3 style="color: #dc3545; margin-bottom: 10px;">❌ Errors</h3>';
        html += '<ul style="list-style: none; padding: 0;">';
        results.errors.forEach(error => {
            html += `<li style="padding: 8px; margin-bottom: 5px; background: #f8d7da; border-left: 4px solid #dc3545; border-radius: 4px;">${error}</li>`;
        });
        html += '</ul></div>';
    }
    
    // Warnings
    if (results.warnings.length > 0) {
        html += '<div class="validation-section" style="margin-top: 20px;"><h3 style="color: #ffc107; margin-bottom: 10px;">⚠️ Warnings</h3>';
        html += '<ul style="list-style: none; padding: 0;">';
        results.warnings.forEach(warning => {
            html += `<li style="padding: 8px; margin-bottom: 5px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">${warning}</li>`;
        });
        html += '</ul></div>';
    }
    
    // Info (Valid codes, etc.)
    if (results.info.length > 0 && results.errors.length === 0) {
        html += '<div class="validation-section" style="margin-top: 20px;"><h3 style="color: #28a745; margin-bottom: 10px;">ℹ️ Validation Details</h3>';
        html += '<ul style="list-style: none; padding: 0;">';
        results.info.slice(0, 10).forEach(info => {
            html += `<li style="padding: 6px; margin-bottom: 3px; background: #d4edda; border-left: 4px solid #28a745; border-radius: 4px; font-size: 12px;">${info}</li>`;
        });
        if (results.info.length > 10) {
            html += `<li style="padding: 6px; font-style: italic; color: #666;">...and ${results.info.length - 10} more valid fields</li>`;
        }
        html += '</ul></div>';
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Generate JSON
window.generateJSON = function() {
    const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
    const tip = parseFloat(document.getElementById('tip').value).toFixed(2);
    const transactionType = document.getElementById('transactionType').value;
    const clerkId = document.getElementById('clerkId').value || '';
    const invoiceNumber = document.getElementById('invoiceNumber').value || '';
    const idType = document.getElementById('idType').value || '';
    const industryData = document.getElementById('industryData').value;
    
    // Generate UUID v4
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Generate Local Reference ID (timestamp-based)
    function generateLocalReferenceId() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
        const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${random}`;
    }
    
    // Auto-populate local reference ID if empty
    let localReferenceId = document.getElementById('localReferenceId').value;
    if (!localReferenceId) {
        localReferenceId = generateLocalReferenceId();
        document.getElementById('localReferenceId').value = localReferenceId;
    }
    
    // Get current ISO datetime
    const now = new Date().toISOString();
    
    // Calculate total amount (amount + tip)
    const totalAmount = (parseFloat(amount) + parseFloat(tip)).toFixed(2);
    
    // Map transaction type to message function and transaction type code
    const transactionConfig = {
        'Sale': {
            messageFunction: 'AUTQ',  // SaleRequest
            transactionType: 'CRDP',  // CardPayment
            serviceContent: 'FSPQ'
        },
        'MOTO': {
            messageFunction: 'AUTQ',  // SaleRequest
            transactionType: 'CRDP',  // CardPayment
            serviceContent: 'FSPQ',
            motoIndicator: true
        },
        'Crypto': {
            messageFunction: 'CRPQ',  // RequestCryptoToPOI
            transactionType: 'CRDP',  // CardPayment
            serviceContent: 'FSPQ'
        },
        'Refund': {
            messageFunction: 'RNFQ',  // RefundRequest
            transactionType: 'RFND',  // Refund
            serviceContent: 'FSPQ'
        },
        'Void': {
            messageFunction: 'FMPV',  // reversalRequest
            transactionType: 'CRDP',  // CardPayment
            serviceContent: 'FSRQ'    // FinancialreversalRequest
        },
        'TipAdjustment': {
            messageFunction: 'TADV',  // TipAdjustmentRequest
            transactionType: 'CRDP',  // CardPayment
            serviceContent: 'FSPQ'
        },
        'PreAuth': {
            messageFunction: 'FAUQ',  // PreauthRequest
            transactionType: 'RESV',  // Reservation
            serviceContent: 'FSPQ'
        },
        'IncrementalAuth': {
            messageFunction: 'FAUQ',  // PreauthRequest
            transactionType: 'RESV',  // Reservation
            serviceContent: 'FSPQ',
            serviceAttribute: 'INCR'  // Incremental
        },
        'PreAuthCompletion': {
            messageFunction: 'CMPV',  // CompletionRequest
            transactionType: 'RESV',  // Reservation
            serviceContent: 'FSPQ'
        },
        'Settle': {
            messageFunction: 'RCLQ',  // BatchSettlementRequest
            serviceContent: 'FSCQ'    // FinancialReconciliationRequest
        },
        'Report': {
            messageFunction: 'RPTQ',  // reportRequest
            serviceContent: 'FSPQ'
        },
        'SessionManagement': {
            messageFunction: 'SASQ',  // sessionManagementRequest
        }
    };
    
    const config = transactionConfig[transactionType] || transactionConfig['Sale'];
    
    // Determine root element name based on transaction type
    let rootElementName;
    if (transactionType === 'Report') {
        rootElementName = 'OCreportRequest';
    } else if (transactionType === 'SessionManagement') {
        rootElementName = 'OCsessionManagementRequest';
    } else {
        rootElementName = 'OCserviceRequest';
    }
    
    let jsonData;
    
    if (transactionType === 'Report') {
        // Report request has different structure
        jsonData = {
            [rootElementName]: {
                "header": {
                    "messageFunction": config.messageFunction,
                    "protocolVersion": "2.0",
                    "exchangeIdentification": generateUUID(),
                    "creationDateTime": now,
                    "initiatingParty": {
                        "identification": "20000004",
                        "type": "PID",
                        "shortName": "Cash Register ID",
                        "authenticationKey": generateUUID().toUpperCase()
                    },
                    "recipientParty": {
                        "identification": "11000499",
                        "type": "TID",
                        "shortName": "Terminal  ID"
                    }
                },
                "reportRequest": {
                    "environment": {
                        "merchant": {
                            "identification": "7800199838"
                        },
                        "POI": {
                            "identification": "11000499"
                        }
                    },
                    "context": {
                        "saleContext": {
                            "saleIdentification": "",
                            "saleReferenceNumber": "",
                            "SaleReconciliationIdentification": "",
                            "cashierIdentification": clerkId,
                            "invoiceNumber": invoiceNumber
                        }
                    },
                    "serviceContent": config.serviceContent,
                    "reportTransactionRequest": {
                        "reportType": document.getElementById('reportType').value
                    }
                }
            }
        };
    } else if (transactionType === 'SessionManagement') {
        // Session Management request structure
        const sessionType = document.getElementById('sessionType').value;
        const exchangeAction = document.getElementById('exchangeAction').value;
        const exchangeType = document.getElementById('exchangeType').value;
        const deviceState = document.getElementById('deviceState').value;
        const exchangeIdentificationInput = document.getElementById('exchangeIdentification').value;
        
        jsonData = {
            [rootElementName]: {
                "header": {
                    "messageFunction": config.messageFunction,
                    "protocolVersion": "2.0",
                    "exchangeIdentification": generateUUID(),
                    "creationDateTime": now,
                    "initiatingParty": {
                        "identification": sessionType === 'POI' ? "11000499" : "20000004",
                        "type": sessionType === 'POI' ? "TID" : "PID",
                        "shortName": sessionType === 'POI' ? "Terminal  ID" : "Cash Register ID",
                        "authenticationKey": generateUUID().toUpperCase()
                    }
                },
                "sessionManagementRequest": {}
            }
        };
        
        // Add appropriate component based on session type
        if (sessionType === 'POI') {
            jsonData[rootElementName].sessionManagementRequest.POIComponent = {
                "POIIdentification": {
                    "identification": "11000499",
                    "serialNumber": "SN" + Math.floor(Math.random() * 1000000)
                },
                "POIGroupIdentification": {
                    "exchangeAction": exchangeAction
                }
            };
            
            // Add exchangeType only if not NORM (default)
            if (exchangeType && exchangeType !== 'NORM') {
                jsonData[rootElementName].sessionManagementRequest.POIComponent.POIGroupIdentification.exchangeType = exchangeType;
            }
            
            // Add exchangeIdentification for RETR/RECV/CANC
            if (['RETR', 'RECV', 'CANC'].includes(exchangeAction)) {
                // Use user-provided value or generate UUID
                const exchangeId = exchangeIdentificationInput || generateUUID();
                jsonData[rootElementName].sessionManagementRequest.POIComponent.POIGroupIdentification.exchangeIdentification = exchangeId;
            }
            
            // Add state if provided
            if (deviceState) {
                jsonData[rootElementName].sessionManagementRequest.POIComponent.state = deviceState;
            }
        } else {
            // POS Component
            jsonData[rootElementName].sessionManagementRequest.POSComponent = {
                "cashierIdentification": clerkId || "CLERK001",
                "POSGroupIdentification": {
                    "exchangeAction": exchangeAction
                }
            };
            
            // Add exchangeType only if not NORM (default)
            if (exchangeType && exchangeType !== 'NORM') {
                jsonData[rootElementName].sessionManagementRequest.POSComponent.POSGroupIdentification.exchangeType = exchangeType;
            }
            
            // Add exchangeIdentification for RETR/RECV/CANC
            if (['RETR', 'RECV', 'CANC'].includes(exchangeAction)) {
                // Use user-provided value or generate UUID
                const exchangeId = exchangeIdentificationInput || generateUUID();
                jsonData[rootElementName].sessionManagementRequest.POSComponent.POSGroupIdentification.exchangeIdentification = exchangeId;
            } else if (exchangeAction !== 'INIT' && exchangeAction !== 'NOTI') {
                // For other actions, optionally add exchangeIdentification if provided
                if (exchangeIdentificationInput) {
                    jsonData[rootElementName].sessionManagementRequest.POSComponent.POSGroupIdentification.exchangeIdentification = exchangeIdentificationInput;
                }
            }
            
            // Add state - required as BUSY/IDLE for NOTI action
            if (exchangeAction === 'NOTI') {
                jsonData[rootElementName].sessionManagementRequest.POSComponent.state = deviceState || "IDLE";
            } else if (deviceState) {
                jsonData[rootElementName].sessionManagementRequest.POSComponent.state = deviceState;
            }
        }
    } else {
        // Standard service request structure
        jsonData = {
            [rootElementName]: {
                "header": {
                    "messageFunction": config.messageFunction,
                    "protocolVersion": "2.0",
                    "exchangeIdentification": generateUUID(),
                    "creationDateTime": now,
                    "initiatingParty": {
                        "identification": "20000004",
                        "type": "PID",
                        "shortName": "Cash Register ID",
                        "authenticationKey": generateUUID().toUpperCase()
                    },
                    "recipientParty": {
                        "identification": "11000499",
                        "type": "TID",
                        "shortName": "Terminal  ID"
                    }
                },
                "serviceRequest": {
                    "environment": {
                        "merchant": {
                            "identification": "7800199838"
                        },
                        "POI": {
                            "identification": "11000499"
                        }
                    },
                    "context": {
                        "saleContext": {
                            "cashierIdentification": clerkId,
                            "invoiceNumber": invoiceNumber,
                            "identificationType": idType,
                            "localReferenceId": localReferenceId
                        }
                    },
                    "serviceContent": config.serviceContent,
                    "paymentRequest": {}
                }
            }
        };
        
        // Add payment request details based on transaction type
        if (config.transactionType) {
            jsonData[rootElementName].serviceRequest.paymentRequest = {
                "transactionType": config.transactionType,
                "transactionDetails": {
                    "totalAmount": totalAmount,
                    "tipAmount": tip,
                    "MOTOIndicator": config.motoIndicator || false,
                    "detailedAmount": {
                        "amountGoodsAndServices": amount
                    }
                }
            };
            
            // Add service attribute if present (for incremental auth)
            if (config.serviceAttribute) {
                jsonData[rootElementName].serviceRequest.paymentRequest.serviceAttribute = config.serviceAttribute;
            }
        } else if (transactionType === 'Settle') {
            // Batch settlement doesn't need payment details
            jsonData[rootElementName].serviceRequest.reconciliation = {
                "reconciliationType": "Batch",
                "POIReconciliationID": generateUUID().substring(0, 10)
            };
        }
        
        // Add industry-specific data only for payment transactions
        if (config.transactionType && industryData !== 'none') {
            if (industryData === 'vehicle') {
                jsonData[rootElementName].serviceRequest.paymentRequest.transactionDetails.VehicleRentalData = generateVehicleRentalData();
            } else if (industryData === 'lodging') {
                jsonData[rootElementName].serviceRequest.paymentRequest.transactionDetails.LodgingData = generateLodgingData();
            } else if (industryData === 'travel') {
                jsonData[rootElementName].serviceRequest.paymentRequest.transactionDetails.TravelData = generateTravelData();
            }
        }
    }
    
    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);
    document.getElementById('validationStatus').innerHTML = 
        '<div class="validation-status validation-success">✓ JSON generated successfully</div>';
    
    // Also populate validation tab input
    document.getElementById('validationInput').value = JSON.stringify(jsonData, null, 2);
};

// Validate Payload from Validation Tab
window.validatePayload = function() {
    const input = document.getElementById('validationInput').value.trim();
    
    if (!input) {
        displayValidationResults({
            errors: ['No payload provided. Please paste a JSON payload to validate.'],
            warnings: [],
            info: []
        });
        return;
    }
    
    let jsonData;
    let rootElementName;
    
    try {
        jsonData = JSON.parse(input);
        
        // Determine root element
        if (jsonData.OCserviceRequest) {
            rootElementName = 'OCserviceRequest';
            // Check if it's a reversal request (Void)
            if (jsonData.OCserviceRequest.serviceRequest && jsonData.OCserviceRequest.serviceRequest.reversalRequest) {
                rootElementName = 'OCserviceRequestReversal';
            }
        } else if (jsonData.OCreportRequest) {
            rootElementName = 'OCreportRequest';
        } else if (jsonData.OCsessionManagementRequest) {
            rootElementName = 'OCsessionManagementRequest';
        } else {
            displayValidationResults({
                errors: ['Invalid root element. Expected "OCserviceRequest", "OCreportRequest", or "OCsessionManagementRequest".'],
                warnings: [],
                info: []
            });
            return;
        }
        
        // Run validation
        validateJSON(jsonData, rootElementName);
        
    } catch (e) {
        displayValidationResults({
            errors: [`JSON Parse Error: ${e.message}`],
            warnings: [],
            info: []
        });
    }
};

// Copy JSON to Clipboard
window.copyJSON = function() {
    const text = document.getElementById('jsonOutput').textContent;
    const button = event.target;
    const originalText = button.textContent;
    
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Clipboard API failed:', err);
                fallbackCopy(text, button, originalText);
            });
    } else {
        // Fallback for older browsers
        fallbackCopy(text, button, originalText);
    }
};

// Copy Response Function
window.copyResponse = function() {
    const text = document.getElementById('responseOutput').textContent;
    const button = event.target;
    const originalText = button.textContent;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Clipboard API failed:', err);
                fallbackCopy(text, button, originalText);
            });
    } else {
        fallbackCopy(text, button, originalText);
    }
};

// Fallback copy method using textarea
function fallbackCopy(text, button, originalText) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        } else {
            button.textContent = 'Failed!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        button.textContent = 'Error!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    } finally {
        document.body.removeChild(textarea);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderSpecTree();
    renderDataTypes();
    renderBasicTypes();
    generateJSON();
    handleTransactionTypeChange(); // Set initial field visibility
    
    // Initialize response tab
    renderResponseDataTypes();
    renderResponseSpecTree();
});

// Render Response Data Types
function renderResponseDataTypes() {
    const container = document.getElementById('responseDataTypes');
    
    let html = '<div style="padding:10px;background:#e3f2fd;border-radius:6px;margin-bottom:15px;">';
    html += '<strong>Click data types below</strong> to view details and code sets in a popup dialog.</div>';
    
    Object.keys(dataTypes).forEach(name => {
        const dt = dataTypes[name];
        html += `<div class="data-type-item data-type-clickable" data-type="${name}">
            <div class="data-type-name">${name}</div>
            <div class="data-type-details">Type: ${dt.type}`;
        
        if (dt.length) html += ` | Length: ${dt.length}`;
        if (dt.codeSet) html += ` | CodeSet: ${dt.codeSet}`;
        if (dt.desc) html += `<br>${dt.desc}`;
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
    
    // Add click handlers to data type items
    container.querySelectorAll('.data-type-clickable').forEach(item => {
        item.addEventListener('click', function() {
            const typeName = this.getAttribute('data-type');
            showDataTypeModal(typeName);
        });
    });
}

// Render Response Specification Tree
function renderResponseSpecTree() {
    const container = document.getElementById('responseSpecTree');
    container.innerHTML = '';
    
    const structureToShow = 'OCserviceResponse';
    
    function createNode(name, data, level = 0) {
        const div = document.createElement('div');
        div.className = 'tree-node';
        
        const indent = '│  '.repeat(level);
        const hasChildren = typeof data === 'object' && !data.type;
        const toggle = hasChildren ? '▼' : ' ';
        
        let content = `${indent}<span class="tree-toggle">${toggle}</span><span class="tree-field">${name}</span>`;
        
        if (data.cardinality) {
            content += ` <span class="tree-cardinality">${data.cardinality}</span>`;
        }
        
        if (data.type) {
            content += ` <span class="tree-type clickable-type">${data.type}</span>`;
            
            if (dataTypes[data.type] && dataTypes[data.type].length) {
                content += ` <span class="tree-constraint">${dataTypes[data.type].length}</span>`;
            }
        }
        
        div.innerHTML = content;
        
        if (data.type) {
            div.classList.add('clickable');
            div.addEventListener('click', (e) => {
                e.stopPropagation();
                // Check if it's a basic type first
                if (basicDataTypes[data.type]) {
                    showBasicTypeModal(data.type);
                } else {
                    showDataTypeModal(data.type);
                }
            });
        }
        
        container.appendChild(div);
        
        if (hasChildren) {
            Object.keys(data).forEach(key => {
                if (key !== 'type' && key !== 'cardinality') {
                    createNode(key, data[key], level + 1);
                }
            });
        }
    }
    
    // Render the response structure
    if (specStructure[structureToShow]) {
        createNode(structureToShow, specStructure[structureToShow]);
    }
}

// Generate Response JSON
window.generateResponseJSON = function() {
    const amount = parseFloat(document.getElementById('responseAmount').value).toFixed(2);
    const tip = parseFloat(document.getElementById('responseTip').value).toFixed(2);
    const reportType = document.getElementById('responseReportType').value;
    const verbatimReceipt = document.getElementById('verbatimReceipt').checked;
    const tokenResponse = document.getElementById('tokenResponse').checked;
    
    // Generate UUID v4
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Get current ISO datetime
    const now = new Date().toISOString();
    
    // Calculate total amount (amount + tip)
    const totalAmount = (parseFloat(amount) + parseFloat(tip)).toFixed(2);
    
    // Generate sample receipt content
    const receiptContent = verbatimReceipt ? `MERCHANT NAME|123 Main St|City, State|Tel: 555-1234||SALE TRANSACTION|Date: ${new Date().toLocaleDateString()}|Time: ${new Date().toLocaleTimeString()}||Amount: ${amount}|Tip: ${tip}|Total: ${totalAmount}||Card: ************1234|Auth: ${Math.floor(Math.random() * 900000 + 100000)}||APPROVED - THANK YOU|` : undefined;
    
    const jsonData = {
        "OCserviceResponse": {
            "header": {
                "messageFunction": "AUTP",
                "protocolVersion": "2.0",
                "exchangeIdentification": generateUUID(),
                "creationDateTime": now,
                "initiatingParty": {
                    "identification": "11000499",
                    "type": "TID",
                    "shortName": "Terminal  ID"
                },
                "recipientParty": {
                    "identification": "20000004",
                    "type": "PID",
                    "shortName": "Cash Register ID"
                }
            },
            "serviceResponse": {
                "environment": {
                    "merchant": {
                        "identification": "7800199838"
                    },
                    "POI": {
                        "identification": "11000499"
                    }
                },
                "context": {
                    "saleContext": {
                        "saleIdentification": "",
                        "saleReferenceNumber": "",
                        "cashierIdentification": "",
                        "invoiceNumber": ""
                    }
                },
                "serviceContent": "FSPP",
                "response": {
                    "result": "APPR",
                    "responseReason": ""
                },
                "paymentResponse": {
                    "paymentTransaction": {
                        "transactionType": "CRDP",
                        "transactionIdentification": "TXN" + Math.floor(Math.random() * 100000000),
                        "authorisationCode": String(Math.floor(Math.random() * 900000 + 100000)),
                        "transactionDetails": {
                            "totalAmount": totalAmount,
                            "tipAmount": tip,
                            "detailedAmount": {
                                "amountGoodsAndServices": amount,
                                "gratuity": tip
                            }
                        },
                        "paymentInstrumentData": {
                            "paymentInstrumentType": "CARD",
                            "cardData": {
                                "entryMode": "CHIP",
                                "maskedCardNumber": "************1234",
                                "cardBrand": "VISA"
                            }
                        }
                    }
                }
            }
        }
    };
    
    // Add payment token if checkbox is checked
    if (tokenResponse) {
        jsonData.OCserviceResponse.serviceResponse.paymentResponse.paymentTransaction.paymentInstrumentData.cardData.paymentToken = "TKN" + generateUUID().replace(/-/g, '').substring(0, 32);
    }
    
    // Add receipt content if verbatim receipt is checked
    if (verbatimReceipt && receiptContent) {
        jsonData.OCserviceResponse.serviceResponse.paymentResponse.outputContent = receiptContent;
    }
    
    document.getElementById('responseOutput').textContent = JSON.stringify(jsonData, null, 2);
};