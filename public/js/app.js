import { dataTypes, codeSets, specStructure, basicDataTypes } from './data.js';

// Tab Switching Function
window.switchTab = function(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
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

// Helper functions for enhanced report response generation
function generateTodayTimestamp() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function generateYesterdayTimestamp() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const seconds = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function generateReceiptContent(amount, gratuity, verbatim = false) {
    const total = (amount + gratuity).toFixed(2);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const authCode = Math.floor(100000 + Math.random() * 900000);
    const cardMask = "************" + Math.floor(1000 + Math.random() * 9000);
    
    if (verbatim) {
        return `         Nuvei         |       5TH FLOOR       |   ONE SMART'S PLACE   |                        |                        | |TERM #          10001887|RECORD #         ${Math.floor(1000000 + Math.random() * 9000000)}|HOST INVOICE #    ${String(Math.floor(1 + Math.random() * 999999)).padStart(6, '0')}|HOST SEQ #    ${Math.floor(1000000000 + Math.random() * 9000000000)}|------------------------|CARD    ${cardMask}|VISA         Contactless|${currentDate.split('/').reverse().join('/')}      ${currentTime}|------------------------||          SALE          |AMOUNT             £${amount.toFixed(2)}|TIP                £${gratuity.toFixed(2)}|TOTAL          GBP £${total}|------------------------|AUTH#:${authCode}       B:${Math.floor(100 + Math.random() * 900)}||      APPROVED 00      |       THANK YOU       | |     NO CARDHOLDER     |      VERIFICATION      || | VISA CL CREDIT          |AID: A0000000031010     |TC: ${generateRandomHex(16)}    |TVR: 0000000000         |TSI: 0000               ||  Retain this copy for  |  statement validation  ||                        |                        |                        |                        |                        |     CUSTOMER COPY     |`;
    } else {
        return `*** TRANSACTION RECEIPT ***|${currentDate} ${currentTime}||Amount: £${amount.toFixed(2)}|Tip: £${gratuity.toFixed(2)}|Total: £${total}||Card: ${cardMask}|Auth: ${authCode}||APPROVED - THANK YOU`;
    }
}

function generateRandomHex(length) {
    const chars = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function renderSpecTree() {
    const container = document.getElementById('specTree');
    container.innerHTML = '';
    
    const transactionTypeElement = document.getElementById('transactionType');
    const transactionType = transactionTypeElement ? transactionTypeElement.value : 'Sale';
    
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
    
    if (specStructure[structureToShow]) {
        const displayName = (structureToShow === 'OCserviceRequestReversal' || structureToShow === 'OCserviceRequestBatch') 
            ? 'OCserviceRequest' 
            : structureToShow;
        createNode(displayName, specStructure[structureToShow]);
    }
}

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
    
    container.querySelectorAll('.data-type-clickable').forEach(item => {
        item.addEventListener('click', function() {
            const typeName = this.getAttribute('data-type');
            showDataTypeModal(typeName);
        });
    });
}

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
    
    container.querySelectorAll('.basic-type-card').forEach(card => {
        card.addEventListener('click', function() {
            const typeName = this.getAttribute('data-basic-type');
            showBasicTypeModal(typeName);
        });
    });
}

window.handleTransactionTypeChange = function() {
    const transactionType = document.getElementById('transactionType').value;
    const gratuityGroup = document.querySelector('[data-field="gratuity"]');
    const reportTypeGroup = document.querySelector('[data-field="reportType"]');
    const sessionTypeGroup = document.querySelector('[data-field="sessionType"]');
    const exchangeActionGroup = document.querySelector('[data-field="exchangeAction"]');
    const deviceStateGroup = document.querySelector('[data-field="deviceState"]');
    const exchangeIdentificationGroup = document.querySelector('[data-field="exchangeIdentification"]');
    const originalTransactionIdGroup = document.querySelector('[data-field="originalTransactionId"]');
    
    gratuityGroup.style.display = 'none';
    reportTypeGroup.style.display = 'none';
    sessionTypeGroup.style.display = 'none';
    exchangeActionGroup.style.display = 'none';
    deviceStateGroup.style.display = 'none';
    exchangeIdentificationGroup.style.display = 'none';
    originalTransactionIdGroup.style.display = 'none';
    
    if (transactionType === 'Sale') {
        gratuityGroup.style.display = 'block';
        document.getElementById('gratuity').value = '0.00';
    } else {
        document.getElementById('gratuity').value = '0.00';
    }
    
    if (transactionType === 'Report') {
        reportTypeGroup.style.display = 'block';
    }
    
    if (transactionType === 'SessionManagement') {
        sessionTypeGroup.style.display = 'block';
        exchangeActionGroup.style.display = 'block';
        deviceStateGroup.style.display = 'block';
        handleExchangeActionChange();
    }
    
    if (transactionType === 'Void') {
        originalTransactionIdGroup.style.display = 'block';
    }
    
    renderSpecTree();
};

window.handleExchangeActionChange = function() {
    const exchangeAction = document.getElementById('exchangeAction').value;
    const exchangeIdentificationGroup = document.querySelector('[data-field="exchangeIdentification"]');
    const deviceStateSelect = document.getElementById('deviceState');
    
    if (['RETR', 'RECV', 'CANC'].includes(exchangeAction)) {
        exchangeIdentificationGroup.style.display = 'block';
    } else {
        exchangeIdentificationGroup.style.display = 'none';
        document.getElementById('exchangeIdentification').value = '';
    }
    
    if (exchangeAction === 'NOTI') {
        deviceStateSelect.innerHTML = `
            <option value="">Select State (Required for NOTI)</option>
            <option value="BUSY">Busy</option>
            <option value="IDLE">Idle</option>
        `;
    } else {
        deviceStateSelect.innerHTML = `
            <option value="">None</option>
            <option value="BUSY">Busy</option>
            <option value="IDLE">Idle</option>
            <option value="UNAV">Unavailable</option>
            <option value="OFFL">Offline</option>
        `;
    }
};

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

function generateCodeSetValue(codeSet) {
   if (!codeSets[codeSet]) return 'N/A';
    
    const codes = codeSets[codeSet];
    const randomIndex = Math.floor(Math.random() * codes.length);
    return codes[randomIndex].code;
   
}

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

function validateJSON(jsonData, rootElementName) {
    const validationResults = {
        errors: [],
        warnings: [],
        info: []
    };
    
    const structure = specStructure[rootElementName];
    const data = jsonData[rootElementName];
    
    if (!structure) {
        validationResults.errors.push(`Unknown root element structure: ${rootElementName}`);
        displayValidationResults(validationResults);
        return;
    }
    
    if (!data) {
        validationResults.errors.push(`Missing root element: ${rootElementName}`);
        displayValidationResults(validationResults);
        return;
    }
    
    // Add info about what we're validating
    validationResults.info.push(`Validating against specification: ${rootElementName}`);


    // **SPECIAL VALIDATION: Session Management - POIComponent and POSComponent are mutually exclusive**
    if (rootElementName === 'OCsessionManagementRequest' && data.sessionManagementRequest) {
        const hasPOIComponent = data.sessionManagementRequest.POIComponent !== undefined && 
                                data.sessionManagementRequest.POIComponent !== null;
        const hasPOSComponent = data.sessionManagementRequest.POSComponent !== undefined && 
                                data.sessionManagementRequest.POSComponent !== null;
        
        if (!hasPOIComponent && !hasPOSComponent) {
            validationResults.errors.push(
                `OCsessionManagementRequest.sessionManagementRequest: Must contain either POIComponent or POSComponent (exactly one required)`
            );
        } else if (hasPOIComponent && hasPOSComponent) {
            validationResults.errors.push(
                `OCsessionManagementRequest.sessionManagementRequest: Cannot contain both POIComponent and POSComponent (mutually exclusive - choose one)`
            );
        } else if (hasPOIComponent) {
            validationResults.info.push(`Using POIComponent (Terminal Side) for session management`);
        } else if (hasPOSComponent) {
            validationResults.info.push(`Using POSComponent (Register Side) for session management`);
        }
    }

    
    // Validate the entire structure recursively
    validateNode(data, structure, rootElementName, validationResults);
    
    // Add completion message
    const totalFields = validationResults.errors.length + validationResults.warnings.length + validationResults.info.length;
    if (validationResults.errors.length === 0 && validationResults.warnings.length === 0) {
        validationResults.info.push(`Validation complete: All required fields present and valid`);
    }
    
    // Display all results
    displayValidationResults(validationResults);
    
    // Scroll to results
    document.getElementById('validationResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function validateNode(data, spec, path, results) {
    if (!spec || typeof spec !== 'object') return;
    
    // List of optional sections that should not trigger "missing required section" errors
   
      // Complete list of optional sections that should not trigger "missing required section" errors
    const optionalSections = [
        // Industry-Specific Data
        'VehicleRentalData', 'LodgingData', 'TravelData', 'CruiseData', 'DCCRefund',
        
        // Optional nested containers
        'DetailedCharge', 'RoomDetail', 'TripSegment', 
        'PickupLocation', 'ReturnLocation', 'Property', 'TravelAgency',
        
        // Session Management Components (mutually exclusive)
        'POIComponent', 'POSComponent', 'transactionInProcess',

        // Request Optional Sections
        'context', 'saleContext', 'paymentRequest', 'reversalRequest', 
        'batchRequest', 'reportTransactionRequest', 'reconciliation',
        
        // Response Optional Sections
        'paymentResponse', 'reversalResponse', 'batchResponse', 
        'reportTransactionResponse', 'receipt', 'Receipt', 'outputContent',
        
        // Nested optional structures
        'saleTransactionIdentification', 'POITransactionIdentification',
        'retailerPaymentResult', 'transactionResponse', 'receiptDetails',
        'transactionDetails', 'detailedAmount', 'signatureData',
        'paymentAccountReference', 'authorisationResult', 
        'transactionVerificationResult', 'responseToAuthorisation',
        
        // Payment Instrument Data
        'paymentInstrumentData', 'cardData',
        
        // Report Response Structures
        'transactionReport', 'transactionDetailReport', 'transactionTotal',
        'dataSource', 'host', 'terminal',
        
        // Optional identification fields
        'POIIdentification', 'POIGroupIdentification', 'POSGroupIdentification',
        'saleReferenceIdentification', 'reversalTransactionResult', 
        'POIReconciliationIdentification'
    ];
    
    // Validate all fields in the spec, don't stop at first error
    Object.keys(spec).forEach(key => {
        const fieldSpec = spec[key];
        const fieldPath = `${path}.${key}`;
        const fieldValue = data[key];
        
        if (fieldSpec.type) {
            // This is a leaf node with a type - validate it
            validateField(fieldValue, fieldSpec, fieldPath, results);
        } else {
            // This is a nested object - check if it exists and recurse
            if (fieldValue !== undefined && fieldValue !== null) {
                // Value exists, validate its nested structure
                if (Array.isArray(fieldValue)) {
                    // Handle arrays
                    fieldValue.forEach((item, index) => {
                        validateNode(item, fieldSpec, `${fieldPath}[${index}]`, results);
                    });
                } else if (typeof fieldValue === 'object') {
                    // Validate nested object
                    validateNode(fieldValue, fieldSpec, fieldPath, results);
                } else {
                    results.errors.push(`${fieldPath}: Expected object but got ${typeof fieldValue}`);
                }
            } else {
                // Value is missing - check if it's required
                // Skip optional industry data sections and other optional containers
                if (optionalSections.includes(key)) {
                    return; // Skip validation for optional sections
                }
                
                // We need to check if ANY child in this spec has a required cardinality
                const hasRequiredChildren = checkForRequiredChildren(fieldSpec);
                if (hasRequiredChildren) {
                    results.errors.push(`Missing required section: ${fieldPath}`);
                }
            }
        }
    });
    
    // Also check for unexpected fields in data that aren't in spec
    if (data && typeof data === 'object' && !Array.isArray(data)) {
        Object.keys(data).forEach(key => {
            if (!spec.hasOwnProperty(key)) {
                results.warnings.push(`${path}.${key}: Unexpected field not in specification`);
            }
        });
    }
}

// Helper function to check if a spec section has any required children
function checkForRequiredChildren(spec) {
    if (!spec || typeof spec !== 'object') return false;
    
    for (const key in spec) {
        const field = spec[key];
        if (field.cardinality && isRequired(field.cardinality)) {
            return true;
        }
        if (typeof field === 'object' && !field.type) {
            if (checkForRequiredChildren(field)) {
                return true;
            }
        }
    }
    return false;
}

function validateField(value, spec, path, results) {
    const cardinality = spec.cardinality;
    const typeName = spec.type;
    
    // Check if required - but don't return, continue collecting errors
    if (isRequired(cardinality)) {
        if (value === undefined || value === null || value === '') {
            results.errors.push(`Missing required field: ${path} (${cardinality})`);
            // Don't return - we still want to report this field was expected
        }
    }
    
    // If value is empty and optional, skip further validation
    if (!isRequired(cardinality) && (value === undefined || value === null || value === '')) {
        return;
    }
    
    // If required but missing, we already reported it above, skip type validation
    if (value === undefined || value === null || value === '') {
        return;
    }
    
    const typeDefinition = dataTypes[typeName];
    
    if (typeDefinition) {
        // Validate all rules, don't stop at first error
        if (typeDefinition.length) {
            validateLength(value, typeDefinition.length, path, results);
        }
        
        if (typeDefinition.codeSet && codeSets[typeDefinition.codeSet]) {
            validateCodeSet(value, typeDefinition.codeSet, path, results);
        }
        
        if (typeDefinition.baseType) {
            validateBaseType(value, typeDefinition.baseType, path, results);
        }
    } else {
        validateBaseType(value, typeName, path, results);
    }
}

function isRequired(cardinality) {
    if (!cardinality) return false;
    return cardinality.startsWith('[1');
}

function validateLength(value, lengthSpec, path, results) {
    const strValue = String(value);
    const len = strValue.length;
    
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
    
    // Validate all applicable type rules, don't stop at first error
    switch(baseTypeName) {
        case 'UUID':
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidPattern.test(strValue)) {
                results.errors.push(`${path}: Invalid UUID format. Expected: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (got: "${value}")`);
            }
            break;
            
        case 'ISODateTime':
            const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
            if (!isoDateTimePattern.test(strValue)) {
                results.errors.push(`${path}: Invalid ISO DateTime format. Expected: YYYY-MM-DDThh:mm:ss.sssZ (got: "${value}")`);
            } else {
                // Additional validation: check if it's a valid date
                const dateObj = new Date(strValue);
                if (isNaN(dateObj.getTime())) {
                    results.errors.push(`${path}: Invalid date/time value (got: "${value}")`);
                }
            }
            break;
            
        case 'ISODate':
            const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!isoDatePattern.test(strValue)) {
                results.errors.push(`${path}: Invalid ISO Date format. Expected: YYYY-MM-DD (got: "${value}")`);
            } else {
                // Validate the date is real
                const [year, month, day] = strValue.split('-').map(Number);
                const dateObj = new Date(year, month - 1, day);
                if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month - 1 || dateObj.getDate() !== day) {
                    results.errors.push(`${path}: Invalid date value (got: "${value}")`);
                }
            }
            break;
            
        case 'ISOTime':
            const isoTimePattern = /^\d{2}:\d{2}:\d{2}$/;
            if (!isoTimePattern.test(strValue)) {
                results.errors.push(`${path}: Invalid ISO Time format. Expected: hh:mm:ss (got: "${value}")`);
            } else {
                // Validate time values are in range
                const [hours, minutes, seconds] = strValue.split(':').map(Number);
                if (hours > 23 || minutes > 59 || seconds > 59) {
                    results.errors.push(`${path}: Invalid time value (hours: 0-23, minutes: 0-59, seconds: 0-59) (got: "${value}")`);
                }
            }
            break;
            
        case 'Boolean':
            if (value !== true && value !== false) {
                results.errors.push(`${path}: Must be a boolean value (true/false) (got: ${typeof value} "${value}")`);
            }
            break;
            
        case 'Number':
        case 'Decimal':
            if (isNaN(value)) {
                results.errors.push(`${path}: Must be a valid number (got: "${value}")`);
            }
            break;
            
        case 'DigitString':
            if (!/^\d+$/.test(strValue)) {
                results.errors.push(`${path}: Must contain only digits 0-9 (got: "${value}")`);
            }
            break;
            
        case 'Amount':
            const amount = parseFloat(value);
            if (isNaN(amount)) {
                results.errors.push(`${path}: Must be a valid numeric amount (got: "${value}")`);
            } else if (amount < 0) {
                results.errors.push(`${path}: Amount must be positive or zero (got: ${value})`);
            }
            // Check decimal places as a warning
            if (!/^\d+\.\d{2}$/.test(strValue)) {
                results.warnings.push(`${path}: Amount should have exactly 2 decimal places (got: "${value}")`);
            }
            break;
            
        case 'TextString':
            if (typeof value !== 'string') {
                results.errors.push(`${path}: Must be a string (got: ${typeof value} "${value}")`);
            }
            break;
    }
}

function displayValidationResults(results) {
    const container = document.getElementById('validationResults');
    
    let html = '<div style="padding: 20px;">';
    
    const totalIssues = results.errors.length + results.warnings.length;
    
    // Summary at the top
    if (totalIssues === 0) {
        html += `<div class="validation-status validation-success" style="margin-bottom: 20px;">
            <strong>✓ Validation Passed</strong><br>
            No errors or warnings found. The payload is valid.
        </div>`;
    } else {
        const errorLabel = results.errors.length === 1 ? 'Error' : 'Errors';
        const warningLabel = results.warnings.length === 1 ? 'Warning' : 'Warnings';
        
        html += `<div class="validation-summary" style="margin-bottom: 20px; padding: 15px; background: ${results.errors.length > 0 ? '#f8d7da' : '#fff3cd'}; border: 1px solid ${results.errors.length > 0 ? '#dc3545' : '#ffc107'}; border-radius: 6px;">
            <strong>Validation Summary:</strong><br>
            <div style="font-size: 1.2em; margin-top: 8px;">
                ${results.errors.length > 0 ? `<span style="color: #dc3545;">❌ ${results.errors.length} ${errorLabel}</span>` : ''}
                ${results.errors.length > 0 && results.warnings.length > 0 ? ' | ' : ''}
                ${results.warnings.length > 0 ? `<span style="color: #ffc107;">⚠️ ${results.warnings.length} ${warningLabel}</span>` : ''}
            </div>
            ${results.errors.length > 0 ? '<div style="margin-top: 8px; color: #721c24;">Please fix all errors before using this payload.</div>' : ''}
        </div>`;
    }
    
    // Errors section
    if (results.errors.length > 0) {
        html += '<div class="validation-section"><h3 style="color: #dc3545; margin-bottom: 10px;">❌ Errors</h3>';
        html += '<ul style="list-style: none; padding: 0;">';
        
        // Sort errors by path for better organization
        const sortedErrors = [...results.errors].sort();
        sortedErrors.forEach((error, index) => {
            html += `<li style="padding: 8px; margin-bottom: 5px; background: #f8d7da; border-left: 4px solid #dc3545; border-radius: 4px;">
                <strong>#${index + 1}:</strong> ${error}
            </li>`;
        });
        html += '</ul></div>';
    }
    
    // Warnings section
    if (results.warnings.length > 0) {
        html += '<div class="validation-section" style="margin-top: 20px;"><h3 style="color: #ffc107; margin-bottom: 10px;">⚠️ Warnings</h3>';
        html += '<ul style="list-style: none; padding: 0;">';
        
        const sortedWarnings = [...results.warnings].sort();
        sortedWarnings.forEach((warning, index) => {
            html += `<li style="padding: 8px; margin-bottom: 5px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <strong>#${index + 1}:</strong> ${warning}
            </li>`;
        });
        html += '</ul></div>';
    }
    
    // Info (Valid codes, etc.) - only show if no errors
    if (results.info.length > 0 && results.errors.length === 0 && results.warnings.length === 0) {
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
    
    // Statistics footer
    if (totalIssues > 0) {
        html += `<div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #6c757d;">
            <strong>Total issues found:</strong> ${totalIssues}
            <div style="margin-top: 8px; font-size: 0.9em; color: #666;">
                All validation rules have been checked. ${results.errors.length > 0 ? 'Fix the errors above to ensure payload compliance.' : 'Address warnings to improve payload quality.'}
            </div>
        </div>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

window.generateJSON = function() {
    const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
    const gratuity = parseFloat(document.getElementById('gratuity').value).toFixed(2);
    const transactionType = document.getElementById('transactionType').value;
    const clerkId = document.getElementById('clerkId').value || '';
    const invoiceNumber = document.getElementById('invoiceNumber').value || '';
    const idType = document.getElementById('idType').value || '';
    const industryData = document.getElementById('industryData').value;
    
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    const now = new Date().toISOString();
    const totalAmount = (parseFloat(amount) + parseFloat(gratuity)).toFixed(2);
    
    const transactionConfig = {
        'Sale': {
            messageFunction: 'AUTQ',
            transactionType: 'CRDP',
            serviceContent: 'FSPQ'
        },
        'MOTO': {
            messageFunction: 'AUTQ',
            transactionType: 'CRDP',
            serviceContent: 'FSPQ',
            motoIndicator: true
        },
        'Crypto': {
            messageFunction: 'CRPQ',
            transactionType: 'CRDP',
            serviceContent: 'FSPQ'
        },
        'Refund': {
            messageFunction: 'RNFQ',
            transactionType: 'RFND',
            serviceContent: 'FSPQ'
        },
        'Void': {
            messageFunction: 'FMPV',
            transactionType: 'CRDP',
            serviceContent: 'FSRQ'
        },
        'TipAdjustment': {
            messageFunction: 'TADV',
            transactionType: 'CRDP',
            serviceContent: 'FSPQ'
        },
        'PreAuth': {
            messageFunction: 'FAUQ',
            transactionType: 'RESV',
            serviceContent: 'FSPQ'
        },
        'IncrementalAuth': {
            messageFunction: 'FAUQ',
            transactionType: 'RESV',
            serviceContent: 'FSPQ',
            serviceAttribute: 'INCR'
        },
        'PreAuthCompletion': {
            messageFunction: 'CMPV',
            transactionType: 'RESV',
            serviceContent: 'FSPQ'
        },
        'Settle': {
            messageFunction: 'RCLQ',
            serviceContent: 'FSCQ'
        },
        'Report': {
            messageFunction: 'RPTQ',
            serviceContent: 'FSPQ'
        },
        'SessionManagement': {
            messageFunction: 'SASQ',
        }
    };
    
    const config = transactionConfig[transactionType] || transactionConfig['Sale'];
    
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
                            "SaleReconciliationIdentification": ""
                        }
                    },
                    "serviceContent": config.serviceContent,
                    "reportTransactionRequest": {
                        "reportType": document.getElementById('reportType').value
                    }
                }
            }
        };
        
        // Add optional fields only if they have values
        if (clerkId) {
            jsonData[rootElementName].reportRequest.context.saleContext.cashierIdentification = clerkId;
        }
        if (invoiceNumber) {
            jsonData[rootElementName].reportRequest.context.saleContext.invoiceNumber = invoiceNumber;
        }
        
    } else if (transactionType === 'SessionManagement') {
        const sessionType = document.getElementById('sessionType').value;
        const exchangeAction = document.getElementById('exchangeAction').value;
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
            
            if (['RETR', 'RECV', 'CANC'].includes(exchangeAction)) {
                const exchangeId = exchangeIdentificationInput || generateUUID();
                jsonData[rootElementName].sessionManagementRequest.POIComponent.POIGroupIdentification.exchangeIdentification = exchangeId;
            }
            
            if (deviceState) {
                jsonData[rootElementName].sessionManagementRequest.POIComponent.state = deviceState;
            }
        } else {
            jsonData[rootElementName].sessionManagementRequest.POSComponent = {
                "POSGroupIdentification": {
                    "exchangeAction": exchangeAction
                }
            };
            
            // Add cashierIdentification only if provided
            if (clerkId) {
                jsonData[rootElementName].sessionManagementRequest.POSComponent.cashierIdentification = clerkId;
            }
            
            if (['RETR', 'RECV', 'CANC'].includes(exchangeAction)) {
                const exchangeId = exchangeIdentificationInput || generateUUID();
                jsonData[rootElementName].sessionManagementRequest.POSComponent.POSGroupIdentification.exchangeIdentification = exchangeId;
            } else if (exchangeAction !== 'INIT' && exchangeAction !== 'NOTI') {
                if (exchangeIdentificationInput) {
                    jsonData[rootElementName].sessionManagementRequest.POSComponent.POSGroupIdentification.exchangeIdentification = exchangeIdentificationInput;
                }
            }
            
            if (exchangeAction === 'NOTI') {
                jsonData[rootElementName].sessionManagementRequest.POSComponent.state = deviceState || "IDLE";
            } else if (deviceState) {
                jsonData[rootElementName].sessionManagementRequest.POSComponent.state = deviceState;
            }
        }
    } else {
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
                            "saleIdentification": "",
                            "saleReferenceNumber": "",
                            "SaleReconciliationIdentification": ""
                        }
                    },
                    "serviceContent": config.serviceContent,
                    "paymentRequest": {}
                }
            }
        };
        
        // Add optional saleContext fields only if they have values
        if (clerkId) {
            jsonData[rootElementName].serviceRequest.context.saleContext.cashierIdentification = clerkId;
        }
        if (invoiceNumber) {
            jsonData[rootElementName].serviceRequest.context.saleContext.invoiceNumber = invoiceNumber;
        }
        if (idType) {
            jsonData[rootElementName].serviceRequest.context.saleContext.identificationType = idType;
        }
        
        if (config.transactionType) {
            jsonData[rootElementName].serviceRequest.paymentRequest = {
                "transactionType": config.transactionType,
                "transactionDetails": {
                    "totalAmount": totalAmount,
                    "MOTOIndicator": config.motoIndicator || false,
                    "detailedAmount": {
                        "amountGoodsAndServices": amount
                    }
                }
            };
            
            // Only add gratuity if gratuity > 0 (based on structure)
            if (parseFloat(gratuity) > 0) {
                jsonData[rootElementName].serviceRequest.paymentRequest.transactionDetails.detailedAmount.gratuity = gratuity;
            }
            
            if (config.serviceAttribute) {
                jsonData[rootElementName].serviceRequest.paymentRequest.serviceAttribute = config.serviceAttribute;
            }
        } else if (transactionType === 'Settle') {
            jsonData[rootElementName].serviceRequest.reconciliation = {
                "reconciliationType": "Batch",
                "POIReconciliationID": generateUUID().substring(0, 10)
            };
        }
        
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
    
    document.getElementById('validationInput').value = JSON.stringify(jsonData, null, 2);
};

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
        
        // Determine root element and validate structure
        if (jsonData.OCserviceRequest) {
            rootElementName = 'OCserviceRequest';
            // Check if it's a reversal request (Void)
            if (jsonData.OCserviceRequest.serviceRequest && jsonData.OCserviceRequest.serviceRequest.reversalRequest) {
                rootElementName = 'OCserviceRequestReversal';
            }
            // Check if it's a batch request (Settle)
            if (jsonData.OCserviceRequest.serviceRequest && jsonData.OCserviceRequest.serviceRequest.batchRequest) {
                rootElementName = 'OCserviceRequestBatch';
            }
        } else if (jsonData.OCreportRequest) {
            rootElementName = 'OCreportRequest';
        } else if (jsonData.OCsessionManagementRequest) {
            rootElementName = 'OCsessionManagementRequest';
        } else if (jsonData.OCserviceResponse) {
            rootElementName = 'OCserviceResponse';
        } else if (jsonData.OCsessionManagementResponse) {
            rootElementName = 'OCsessionManagementResponse';
        } else if (jsonData.OCreportResponse) {
            rootElementName = 'OCreportResponse';
        } else {
            // Try to identify what was provided
            const providedRoots = Object.keys(jsonData).join(', ');
            displayValidationResults({
                errors: [
                    `Invalid root element. Expected one of: "OCserviceRequest", "OCreportRequest", "OCsessionManagementRequest", "OCserviceResponse", "OCsessionManagementResponse", or "OCreportResponse".`,
                    providedRoots ? `Found root element(s): ${providedRoots}` : 'No recognized root element found.'
                ],
                warnings: [],
                info: ['Valid root elements are: OCserviceRequest, OCreportRequest, OCsessionManagementRequest, OCserviceResponse, OCsessionManagementResponse, OCreportResponse']
            });
            return;
        }
        
        // Run comprehensive validation
        validateJSON(jsonData, rootElementName);
        
    } catch (e) {
        // Provide detailed JSON parse error information
        const errorLines = input.split('\n');
        let errorContext = '';
        
        // Try to extract line number from error message
        const lineMatch = e.message.match(/position (\d+)/i);
        if (lineMatch) {
            const position = parseInt(lineMatch[1]);
            let currentPos = 0;
            for (let i = 0; i < errorLines.length; i++) {
                currentPos += errorLines[i].length + 1; // +1 for newline
                if (currentPos >= position) {
                    errorContext = `Near line ${i + 1}: "${errorLines[i].substring(0, 50)}${errorLines[i].length > 50 ? '...' : ''}"`;
                    break;
                }
            }
        }
        
        displayValidationResults({
            errors: [
                `JSON Parse Error: ${e.message}`,
                errorContext || 'Check your JSON syntax (missing commas, brackets, quotes, etc.)'
            ],
            warnings: [],
            info: [
                'Common JSON errors:',
                '• Missing or extra commas',
                '• Unmatched brackets or braces',
                '• Missing quotes around strings',
                '• Trailing commas (not allowed in JSON)',
                '• Single quotes instead of double quotes'
            ]
        });
    }
};

window.copyJSON = function() {
    const text = document.getElementById('jsonOutput').textContent;
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

document.addEventListener('DOMContentLoaded', () => {
    renderSpecTree();
    renderDataTypes();
    renderBasicTypes();
    generateJSON();
    handleTransactionTypeChange();

    renderResponseDataTypes();
    renderResponseSpecTree();
    handleResponseTransactionTypeChange();
});

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
    
    container.querySelectorAll('.data-type-clickable').forEach(item => {
        item.addEventListener('click', function() {
            const typeName = this.getAttribute('data-type');
            showDataTypeModal(typeName);
        });
    });
}

function renderResponseSpecTree() {
    const container = document.getElementById('responseSpecTree');
    container.innerHTML = '';
    
    // Check transaction type to determine which structure to show
    const responseTransactionTypeElement = document.getElementById('responseTransactionType');
    const responseTransactionType = responseTransactionTypeElement ? responseTransactionTypeElement.value : 'Sale';
    
    // Determine structure based on transaction type
    let structureToShow = 'OCserviceResponse';
    let displayName = 'OCserviceResponse';
    
    if (responseTransactionType === 'Void') {
        structureToShow = 'OCserviceResponseReversal';
        displayName = 'OCserviceResponse';
    } else if (responseTransactionType === 'Settle') {
        structureToShow = 'OCserviceResponseBatch';
        displayName = 'OCserviceResponse';
    } else if (responseTransactionType === 'Report') {
        structureToShow = 'OCreportResponse';
        displayName = 'OCreportResponse';
    } else if (responseTransactionType === 'SessionManagement') {
        structureToShow = 'OCsessionManagementResponse';
        displayName = 'OCsessionManagementResponse';
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
    
    if (specStructure[structureToShow]) {
        // Always display as "OCserviceResponse" even when using different structures
        createNode(displayName, specStructure[structureToShow]);
    }
}

// Handle response transaction type changes to show/hide conditional fields
window.handleResponseTransactionTypeChange = function() {
    const responseTransactionType = document.getElementById('responseTransactionType').value;
    const responseReportTypeGroup = document.querySelector('[data-field="responseReportType"]');
    
    // Hide all conditional fields first
    responseReportTypeGroup.style.display = 'none';
    
    // Show Report Type only for REPORT transactions
    if (responseTransactionType === 'Report') {
        responseReportTypeGroup.style.display = 'block';
    }
    
    // Re-render the spec tree when transaction type changes
    renderResponseSpecTree();
};

// Enhanced Response JSON generation with comprehensive report handling
window.generateResponseJSON = function() {
    const responseTransactionType = document.getElementById('responseTransactionType').value;
    const amountInput = document.getElementById('responseAmount').value || "0";
    const gratuityInput = document.getElementById('responseGratuity').value || "0";
    const amount = parseFloat(amountInput) || 0;
    const gratuity = parseFloat(gratuityInput) || 0;
    const reportType = document.getElementById('responseReportType')?.value || "";
    const verbatimReceipt = document.getElementById('verbatimReceipt')?.checked || false;
    const tokenResponse = document.getElementById('tokenResponse')?.checked || false;

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const now = new Date().toISOString();
    const totalAmount = (amount + gratuity).toFixed(2);

    const receiptContent = verbatimReceipt ? 
        generateReceiptContent(amount, gratuity, true) :
        generateReceiptContent(amount, gratuity, false);

    // Map transaction config
    const responseTransactionConfig = {
        'Sale': { transactionType: 'CRDP', messageFunction: 'AUTP' },
        'MOTO': { transactionType: 'CRDP', messageFunction: 'AUTP' },
        'Crypto': { transactionType: 'CRDP', messageFunction: 'CRPP' },
        'Refund': { transactionType: 'RFND', messageFunction: 'RFNP' },
        'PreAuth': { transactionType: 'RESV', messageFunction: 'FAUP' },
        'PreAuthCompletion': { transactionType: 'RESV', messageFunction: 'CMPK' },
        'TipAdjustment': { transactionType: 'CRDP', messageFunction: 'TADK' },
        'Void': { transactionType: 'CRDP', messageFunction: 'FMPK' },
        'Settle': { messageFunction: 'RCLP' },
        'Report': { messageFunction: 'RPTP' },
        'SessionManagement': { messageFunction: 'SASP' }
    };

    const config = responseTransactionConfig[responseTransactionType] || responseTransactionConfig['Sale'];

    // Base header structure
    const baseHeader = {
        messageFunction: config.messageFunction,
        protocolVersion: "2.0",
        exchangeIdentification: generateUUID(),
        creationDateTime: now,
        initiatingParty: {
            identification: "11000499",
            type: "TID",
            shortName: "Terminal ID",
            authenticationKey: generateUUID().toUpperCase()
        }
    };

    const recipientParty = {
        identification: "20000004",
        type: "PID",
        shortName: "Cash Register ID"
    };

    let jsonData = {};

    // Header setup based on type
    if (responseTransactionType === 'SessionManagement') {
        jsonData = { OCsessionManagementResponse: { header: baseHeader } };
    } else if (responseTransactionType === 'Report') {
        jsonData = { OCreportResponse: { header: { ...baseHeader, recipientParty } } };
    } else {
        jsonData = { OCserviceResponse: { header: { ...baseHeader, recipientParty } } };
    }

    // === Enhanced Report Response Generation ===
    if (responseTransactionType === 'Report') {
        const reportType = document.getElementById('responseReportType')?.value || "PARD";
        
        jsonData.OCreportResponse.reportResponse = {
            response: { responseCode: "APPR", responseReason: "" }
        };

        // Generate different report structures based on report type
        switch (reportType) {
            case 'TMDR': // Terminal Details Report
                jsonData.OCreportResponse.reportResponse.reportGetTotalsResponse = {
                    transactionTotalsSet: [
                        {
                            brand: "VISA",
                            saleIdentification: generateTodayTimestamp() + Math.floor(Math.random() * 1000000),
                            paymentInstrumentType: "CARD",
                            transactionDetailReport: {
                                type: "CRDP",
                                entryMode: "ECTL",
                                cardMasked: "************" + Math.floor(1000 + Math.random() * 9000),
                                detailedAmount: {
                                    fees: "0.0",
                                    cashback: "0.0",
                                    gratuity: gratuity > 0 ? gratuity.toFixed(1) : "0.0"
                                },
                                cumulativeAmount: amount.toFixed(1)
                            },
                            saleReconciliationIdentification: String(Math.floor(100 + Math.random() * 900))
                        },
                        {
                            brand: "MASTERCARD",
                            saleIdentification: generateTodayTimestamp() + Math.floor(Math.random() * 1000000),
                            paymentInstrumentType: "CARD",
                            transactionDetailReport: {
                                type: "CRDP",
                                entryMode: "CHIP",
                                cardMasked: "************" + Math.floor(1000 + Math.random() * 9000),
                                detailedAmount: {
                                    fees: "0.0",
                                    cashback: "0.0",
                                    gratuity: "0.0"
                                },
                                cumulativeAmount: (amount * 1.5).toFixed(1)
                            },
                            saleReconciliationIdentification: String(Math.floor(100 + Math.random() * 900))
                        }
                    ]
                };
                break;

            case 'TMTS': // Terminal Totals Summary
                jsonData.OCreportResponse.reportResponse = {
                    context: {
                        saleContext: {
                            invoiceNumber: "123456",
                            cashierIdentification: ""
                        }
                    },
                    response: "APPR",
                    environment: {
                        POI: {
                            identification: "12000336"
                        },
                        merchant: {
                            identification: "7800199838"
                        }
                    },
                    reportGetTotalsResponse: {
                        transactionTotalsSet: [
                            {
                                brand: "MASTERCARD",
                                transactionTotal: {
                                    type: "CRDP",
                                    totalNumber: "2",
                                    detailedAmount: {
                                        fees: "0.00",
                                        cashback: "0.00",
                                        gratuity: "2.00"
                                    },
                                    cumulativeAmount: "2600.00"
                                }
                            },
                            {
                                brand: "VISA",
                                transactionTotal: {
                                    type: "CRDP",
                                    totalNumber: "1",
                                    detailedAmount: {
                                        fees: "0.00",
                                        cashback: "0.00",
                                        gratuity: "2.00"
                                    },
                                    cumulativeAmount: "1200.00"
                                }
                            },
                            {
                                brand: "AMEX",
                                transactionTotal: {
                                    type: "CRDP",
                                    totalNumber: "3",
                                    detailedAmount: {
                                        fees: "0.00",
                                        cashback: "0.00",
                                        gratuity: "0.00"
                                    },
                                    cumulativeAmount: "4100.00"
                                }
                            },
                            {
                                brand: "JCB",
                                transactionTotal: {
                                    type: "CRDP",
                                    totalNumber: "1",
                                    detailedAmount: {
                                        fees: "0.00",
                                        cashback: "0.00",
                                        gratuity: "400.00"
                                    },
                                    cumulativeAmount: "1400.00"
                                }
                            }
                        ],
                        POIReconciliationIdentification: "1"
                    }
                };
                break;

            case 'TMSH': // Terminal Sales By Hour
                jsonData.OCreportResponse.reportResponse = {
                    context: {
                        saleContext: {
                            invoiceNumber: "123456",
                            cashierIdentification: ""
                        }
                    },
                    response: "APPR",
                    environment: {
                        POI: {
                            identification: "12000336"
                        },
                        merchant: {
                            identification: "7800199838"
                        }
                    },
                    reportGetTotalsResponse: {
                        transactionTotalsSet: [
                            {
                                hour: "11",
                                transactionTotal: {
                                    totalNumber: "2",
                                    detailedAmount: {
                                        fees: "0",
                                        cashback: "0",
                                        gratuity: "4",
                                        surCharge: "0"
                                    },
                                    cumulativeAmount: "2400"
                                }
                            }
                        ],
                        POIReconciliationIdentification: "1"
                    }
                };
                break;

            case 'PARD': // PreAuth Details Report
                jsonData.OCreportResponse.reportResponse.reportPreauthResponse = {
                    preauthTransactionSet: [
                        {
                            mskPan: "************6014",
                            totalAmount: "1.00",
                            cardDataNtryMd: "ECTL",
                            saleIdentification: generateTodayTimestamp() + Math.floor(Math.random() * 1000000)
                        },
                        {
                            mskPan: "************6014",
                            totalAmount: "3.00",
                            cardDataNtryMd: "ECTL",
                            saleIdentification: generateYesterdayTimestamp() + Math.floor(Math.random() * 1000000)
                        },
                        {
                            mskPan: "************6014",
                            totalAmount: "11.00",
                            cardDataNtryMd: "ECTL",
                            saleIdentification: generateYesterdayTimestamp() + Math.floor(Math.random() * 1000000)
                        },
                        {
                            mskPan: "************6014",
                            totalAmount: "1.00",
                            cardDataNtryMd: "ECTL",
                            saleIdentification: generateYesterdayTimestamp() + Math.floor(Math.random() * 1000000)
                        },
                        {
                            mskPan: "************6014",
                            totalAmount: "1.00",
                            cardDataNtryMd: "ECTL",
                            saleIdentification: generateYesterdayTimestamp() + Math.floor(Math.random() * 1000000)
                        }
                    ]
                };
                break;

            case 'TRRP': // Transaction Receipt Reprint
                jsonData.OCreportResponse.reportResponse.reportTransactionResponse = {
                    transactionReport: {
                        response: "APPR",
                        paymentResponse: {
                            receipt: [
                                {
                                    outputContent: receiptContent,
                                    documentQualifier: "CRCP"
                                },
                                {
                                    outputContent: receiptContent.replace("CUSTOMER COPY", "MERCHANT COPY"),
                                    documentQualifier: "HRCP"
                                }
                            ]
                        }
                    }
                };
                break;

            case 'TMCD': // Terminal Configuration Detail
                jsonData.OCreportResponse.reportResponse = {
                    response: {
                        responseCode: "APPR"
                    },
                    reportSetupResponse: {
                        detailOutput: "Application|Version :     V1.00.09|Build :                4|Receipt Line 1:    Nuvei|Receipt Line 2:5TH FLOOR|Receipt Line|3: ONE SMART'S PLACE|Receipt Line 4:        -|Receipt Line 5:        -||========================================|Host IP Settings|========================================|Host URL: sbxpaynm.nuvei|          .com|Host IP Port:        443|Push Host|Name: terminal-poi-sandb|      ox.nuvei.com|Push Host IP Addr: 18080|Pull Host|Name: terminal-poi-sandb|      ox.nuvei.com|Pull Host IP Addr: 18080||========================================|Option Settings|========================================|Application Mode: RETAIL|Tip :                Yes|Cashback:            Yes|Purch Txn Fee:     £0.00|Network Access Fee:£0.00|Min Amt For|Sale Fee:        £0.00|Max Amt For|Sale Fee:        £0.00|Clerk:                No|Invoice:              No|LocalLogs|Days of|Expiry:             14|Merc Language:        en|Auto Settlement:      No||========================================|IP Comms Settings|========================================|DNS Setup:           Yes|Terminal Type:   Dynamic||========================================|Password Settings|========================================|Void TXN PWD:        Yes|Refund TXN PWD:      Yes|Server Total|Report PWD:          No|PreAuth Report PWD:   No|Open Batch Report PWDYes|Term Config|Report PWD:           No|Server ID Setup PWD:  No|Print Setup PWD:     Yes|Close Batch PWD:     Yes|Manual Entry PWD:    Yes||========================================|Printer Settings|========================================|Receipt Type:     single|Print Merchant:      Yes|Pause between Copies:Yes|Print|Declined|Receipts:            Yes|Print Void Receipts: Yes|Print|Completion|Receipts:           Yes|Footer 1:              -|Footer 2:              -|Footer 3:              -|Footer 4:              -|Footer 5:              -||========================================|Timeout Settings|========================================|Host|Connection|Timeout:            60||IdleActivity|Connection|Timeout:          60"
                    }
                };
                break;

            case 'HSTS': // Host Totals Summary
            default:
                jsonData.OCreportResponse.reportResponse.reportGetTotalsResponse = {
                    transactionTotalsSet: [
                        {
                            brand: "VISA",
                            transactionTotal: {
                                type: "CRDP",
                                totalNumber: String(Math.floor(20 + Math.random() * 100)),
                                detailedAmount: {
                                    fees: "0.00",
                                    cashback: "0.00", 
                                    gratuity: (gratuity * 50).toFixed(2)
                                },
                                cumulativeAmount: (amount * 150).toFixed(2)
                            }
                        }
                    ]
                };
                break;
        }
    } 
    else if (responseTransactionType === 'Settle') {
        jsonData.OCserviceResponse.serviceResponse = {
            response: { responseCode: "APPR", responseReason: "" },
            batchResponse: {
                dataSource: {
                    host: [
                        { cardBrand: "VISA", transType: "CRDP", count: "42", amount: "4200.00" },
                        { cardBrand: "MASTERCARD", transType: "CRDP", count: "35", amount: "3900.00" }
                    ]
                }
            }
        };
        if (verbatimReceipt && receiptContent) {
            jsonData.OCserviceResponse.serviceResponse.batchResponse.Receipt = {
                documentQualifier: "CRCP",
                integratedPrintFlag: 0,
                requiredSignatureFlag: 0,
                outputContent: receiptContent
            };
        }
    }
    else if (responseTransactionType === 'Void') {
        const transactionDateTime = new Date(Date.now() - 86400000).toISOString();
        const authCode = String(Math.floor(Math.random() * 900000 + 100000));
        jsonData.OCserviceResponse.serviceResponse = {
            response: { responseCode: "APPR", responseReason: "" },
            reversalResponse: {
                saleTransactionIdentification: {
                    transactionDateTime,
                    transactionReference: "TXN" + Math.floor(Math.random() * 100000000)
                },
                saleReferenceIdentification: "REF" + Math.floor(Math.random() * 100000),
                reversalTransactionResult: {
                    transactionResponse: {
                        receiptDetails: {
                            cardAID: "A0000000031010",
                            refId: "R" + Math.floor(Math.random() * 1000000),
                            emvTagCryptogram: "1234567890ABCDEF",
                            emvTagTsi: "E800",
                            emvTagTvr: "0000008000",
                            mskPan: "************1234",
                            invoiceNumber: "INV" + Math.floor(Math.random() * 100000),
                            hostSequence: "1",
                            apprdeclISO: "000"
                        },
                        authorisationResult: {
                            authorisationCode: authCode,
                            responseToAuthorisation: { response: "APPR" }
                        }
                    }
                }
            }
        };
    }
    else if (responseTransactionType === 'SessionManagement') {
        jsonData.OCsessionManagementResponse.sessionManagementResponse = {
            POIComponent: {
                POIIdentification: {
                    identification: "11000499",
                    serialNumber: "SN" + Math.floor(Math.random() * 1000000)
                },
                POIGroupIdentification: { exchangeAction: "NOTI" }
            },
            sessionResponse: {
                response: "APPR",
                responseReason: ""
            }
        };
    }
    else {
        // Standard transaction (Sale, Refund, etc.)
        const transactionDateTime = new Date().toISOString();
        const authCode = String(Math.floor(Math.random() * 900000 + 100000));

        jsonData.OCserviceResponse.serviceResponse = {
            response: { responseCode: "APPR", responseReason: "" },
            paymentResponse: {
                saleTransactionIdentification: {
                    transactionDateTime: transactionDateTime,
                    transactionReference: "TXN" + Math.floor(Math.random() * 100000000)
                },
                saleReferenceIdentification: "REF" + Math.floor(Math.random() * 100000),
                POITransactionIdentification: {
                    transactionDateTime: transactionDateTime,
                    transactionReference: "POITXN" + Math.floor(Math.random() * 100000000)
                },
                retailerPaymentResult: {
                    transactionType: config.transactionType,
                    transactionResponse: {
                        receiptDetails: {
                            cardAID: "A0000000031010",
                            refId: "REF" + Math.floor(Math.random() * 100000),
                            cardDataNtryMd: "CHIP",
                            accountType: "CREDIT",
                            mskPan: "************1234",
                            hostSequence: String(Math.floor(Math.random() * 1000)),
                            hostInvoice: String(Math.floor(Math.random() * 100000)),
                            recordNumber: String(Math.floor(Math.random() * 100000)),
                            apprdeclISO: "000"
                        },
                        transactionDetails: {
                            totalAmount: totalAmount,
                            detailedAmount: { amountGoodsAndServices: amount.toFixed(2) }
                        },
                        authorisationResult: {
                            responseToAuthorisation: {
                                responseCode: "APPR"
                            },
                            authorisationCode: authCode
                        }
                    }
                },
                receipt: {
                    documentQualifier: "CRCP",
                    integratedPrintFlag: 0,
                    requiredSignatureFlag: 0,
                    outputContent: receiptContent
                }
            }
        };

        if (gratuity > 0)
            jsonData.OCserviceResponse.serviceResponse.paymentResponse.retailerPaymentResult.transactionResponse.transactionDetails.detailedAmount.gratuity = gratuity.toFixed(2);

        if (tokenResponse)
            jsonData.OCserviceResponse.serviceResponse.paymentResponse.retailerPaymentResult.transactionResponse.receiptDetails.tokenCUID =
                "TKN" + generateUUID().replace(/-/g, '').substring(0, 32);
    }

    document.getElementById('responseOutput').textContent = JSON.stringify(jsonData, null, 2);
};