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

// Generate JSON
window.generateJSON = function() {
    const amount = parseFloat(document.getElementById('amount').value).toFixed(2);
    const transactionType = document.getElementById('transactionType').value;
    
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
    
    // Map transaction type to message function and transaction type code
    const transactionConfig = {
        'Sale': {
            messageFunction: 'AUTQ',  // SaleRequest
            transactionType: 'CRDP'   // CardPayment
        },
        'Refund': {
            messageFunction: 'RNFQ',  // RefundRequest
            transactionType: 'RFND'   // Refund
        },
        'PreAuth': {
            messageFunction: 'FAUQ',  // PreauthRequest
            transactionType: 'RESV'   // Reservation
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
                        "cashierIdentification": "",
                        "invoiceNumber": "",
                        "identificationType": ""
                    }
                },
                "serviceContent": "FSPQ",
                "paymentRequest": {
                    "transactionType": config.transactionType,
                    "transactionDetails": {
                        "totalAmount": amount,
                        "MOTOIndicator": false,
                        "detailedAmount": {
                            "amountGoodsAndServices": amount
                        }
                    }
                }
            }
        }
    };
    
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
});