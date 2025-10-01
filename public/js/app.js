import { dataTypes, codeSets, specStructure, basicDataTypes } from './data.js';

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
                showDataTypeModal(data.type);
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
    
    Object.keys(specStructure).forEach(key => {
        createNode(key, specStructure[key]);
    });
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
    
    // Show TIP only for SALE transactions
    if (transactionType === 'Sale') {
        tipGroup.style.display = 'block';
    } else {
        tipGroup.style.display = 'none';
        document.getElementById('tip').value = '0.00'; // Reset tip
    }
    
    // Show Report Type only for REPORT transactions
    if (transactionType === 'Report') {
        reportTypeGroup.style.display = 'block';
    } else {
        reportTypeGroup.style.display = 'none';
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
        }
    };
    
    const config = transactionConfig[transactionType] || transactionConfig['Sale'];
    
    const jsonData = {
        "OCserviceRequest": {
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
        jsonData.OCserviceRequest.serviceRequest.paymentRequest = {
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
            jsonData.OCserviceRequest.serviceRequest.paymentRequest.serviceAttribute = config.serviceAttribute;
        }
    } else if (transactionType === 'Settle') {
        // Batch settlement doesn't need payment details
        jsonData.OCserviceRequest.serviceRequest.reconciliation = {
            "reconciliationType": "Batch",
            "POIReconciliationID": generateUUID().substring(0, 10)
        };
    } else if (transactionType === 'Report') {
        // Report request structure
        jsonData.OCserviceRequest.serviceRequest.reportRequest = {
            "reportType": document.getElementById('reportType').value
        };
    }
    
    // Add industry-specific data only for payment transactions
    if (config.transactionType && industryData !== 'none') {
        if (industryData === 'vehicle') {
            jsonData.OCserviceRequest.serviceRequest.paymentRequest.transactionDetails.VehicleRentalData = generateVehicleRentalData();
        } else if (industryData === 'lodging') {
            jsonData.OCserviceRequest.serviceRequest.paymentRequest.transactionDetails.LodgingData = generateLodgingData();
        } else if (industryData === 'travel') {
            jsonData.OCserviceRequest.serviceRequest.paymentRequest.transactionDetails.TravelData = generateTravelData();
        }
    }
    
    document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);
    document.getElementById('validationStatus').innerHTML = 
        '<div class="validation-status validation-success">✓ JSON generated successfully</div>';
};

// Copy JSON to Clipboard
window.copyJSON = function() {
    const text = document.getElementById('jsonOutput').textContent;
    const button = document.querySelector('.copy-btn');
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
});