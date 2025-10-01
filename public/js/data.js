// Data Types Definitions
export const dataTypes = {
    'ST-MessageFunction': { 
        type: 'CodeSet', 
        codeSet: 'CS-MessageFunction', 
        length: '{4}', 
        desc: 'Message type identifier' 
    },
    'ST-ProtocolVersion': { 
        type: 'TextString', 
        length: '[3,6]', 
        desc: 'Version MM.mm' 
    },
    'ST-ExchangeIdentification': { 
        type: 'UUID', 
        length: '{36}', 
        desc: 'Unique transaction UUID' 
    },
    'ST-CreationDateTime': { 
        type: 'DateTime', 
        length: '{27}', 
        desc: 'ISO 8601 format with microseconds' 
    },
    'ST-DeviceType': { 
        type: 'CodeSet', 
        codeSet: 'CS-DeviceType', 
        length: '{3}' 
    },
    'ST-Identification': { 
        type: 'TextString', 
        length: '[8,16]', 
        desc: 'Terminal/Register/Merchant ID' 
    },
    'ST-AuthenticationKey': { 
        type: 'UUID', 
        length: '{36}',
        desc: 'Authentication key in UUID format' 
    },
    'ST-ShortName': { 
        type: 'TextString', 
        length: '[1,50]', 
        desc: 'Device descriptive name' 
    },
    'ST-CashierIdentification': { 
        type: 'TextString', 
        length: '[0,20]',
        desc: 'Cashier ID (optional)' 
    },
    'ST-InvoiceNumber': { 
        type: 'TextString', 
        length: '[0,30]',
        desc: 'Invoice/Receipt number (optional)' 
    },
    'ST-IdentificationType': { 
        type: 'TextString', 
        length: '[0,20]',
        desc: 'Type of identification (optional)' 
    },
    'ST-ServiceContent': { 
        type: 'CodeSet', 
        codeSet: 'CS-ServiceContent', 
        length: '{4}' 
    },
    'ST-TransactionType': { 
        type: 'CodeSet', 
        codeSet: 'CS-TransactionType', 
        length: '{4}' 
    },
    'ST-Amount': { 
        type: 'Decimal', 
        length: '[1,15]',
        desc: 'Monetary amount (e.g., "1.00")' 
    },
    'ST-MOTOIndicator': { 
        type: 'Boolean', 
        length: '{5}',
        desc: 'Mail Order/Telephone Order indicator' 
    },
    'ST-Response': { 
        type: 'CodeSet', 
        codeSet: 'CS-Response', 
        length: '{4}' 
    },
    'ST-ResponseReason': { 
        type: 'CodeSet', 
        codeSet: 'CS-ResponseReason', 
        length: '{4}' 
    }
};

// Code Sets Definitions
export const codeSets = {
    'CS-MessageFunction': [
        { code: 'AUTQ', name: 'SaleRequest', desc: 'Request for Sale without financial capture' },
        { code: 'AUTP', name: 'SaleResponse', desc: 'Response for Sale without financial capture' },
        { code: 'CMPK', name: 'CompletionResponse', desc: 'Response to pre-auth completion request' },
        { code: 'CMPV', name: 'CompletionRequest', desc: 'Request to complete Pre-Auth' },
        { code: 'FAUP', name: 'PreAuthResponse', desc: 'Response for authorization with financial capture' },
        { code: 'FAUQ', name: 'PreauthRequest', desc: 'Request for authorization with financial capture' },
        { code: 'FIRQ', name: 'FinancialSaleToPOS', desc: 'Send financial data from terminal to POS' },
        { code: 'FISP', name: 'ResponseConfirmFromPOS', desc: 'Response from POS to terminal' },
        { code: 'FMPK', name: 'reversalResponse', desc: 'Advice response for reversal with financial capture' },
        { code: 'FMPV', name: 'reversalRequest', desc: 'Advice for reversal with financial capture' },
        { code: 'RCLP', name: 'BatchSettlementResponse', desc: 'Response for reconciliation' },
        { code: 'RCLQ', name: 'BatchSettlementRequest', desc: 'Request for reconciliation' },
        { code: 'RFNP', name: 'RefundResponse', desc: 'Response for Refund' },
        { code: 'RNFQ', name: 'RefundRequest', desc: 'Request for Refund' },
        { code: 'RPTP', name: 'reportResponse', desc: 'Report response' },
        { code: 'RPTQ', name: 'reportRequest', desc: 'Request for reporting' },
        { code: 'SAPP', name: 'sessionManagementResponse', desc: 'PAT response' },
        { code: 'SAPQ', name: 'sessionManagementRequest', desc: 'PAT request' },
        { code: 'SASP', name: 'sessionManagementResponse', desc: 'Response to session management request' },
        { code: 'SASQ', name: 'sessionManagementRequest', desc: 'Request for session management' },
        { code: 'TADK', name: 'TipAdjustmentResponse', desc: 'TIP adjustment response' },
        { code: 'TADV', name: 'TipAdjustmentRequest', desc: 'TIP adjustment request' },
        { code: 'TATK', name: 'TipAdjustmentSyncReponse', desc: 'Tip adjustment sync from register' },
        { code: 'TATV', name: 'TipAdjustSyncRequest', desc: 'Tip adjustment sync request' },
        { code: 'TBRQ', name: 'RequestTabletToPOI', desc: 'Request ticket list from POS' },
        { code: 'TBSP', name: 'ReponseTableFromPOS', desc: 'Response invoice list to terminal' },
        { code: 'TIRP', name: 'ReponseSaleFromPOS', desc: 'Response from Cloud Server' },
        { code: 'TIRQ', name: 'RequstSaleWithTicketToPOS', desc: 'Notify ticket and amount' },
        { code: 'TKRQ', name: 'RequestAllTicketToPOI', desc: 'Request ticket info' },
        { code: 'TKSP', name: 'ReponseTicketFromPOS', desc: 'Response ticket detail list' },
        { code: 'UKRP', name: 'ResponseUnlockTicketFromPOS', desc: 'Unlock ticket response' },
        { code: 'UKRQ', name: 'RequestUnlockTicketToPOS', desc: 'Request unlock ticket' },
        { code: 'CRPQ', name: 'RequestCryptoToPOI', desc: 'Request for Crypto Currency' },
        { code: 'CRPP', name: 'ResponseCryptoFromPOS', desc: 'Response to Crypto Currency' }
    ],
    'CS-DeviceType': [
        { code: 'PID', name: 'RegisterIdentification', desc: 'Package initiated from register' },
        { code: 'TID', name: 'TerminalIdentification', desc: 'Communication initiated from terminal' }
    ],
    'CS-ServiceContent': [
        { code: 'FSCP', name: 'FinancialReconciliationResponse', desc: 'Terminal sends reconciliation response' },
        { code: 'FSPP', name: 'FinancialpaymentResponse', desc: 'Terminal sends payment response' },
        { code: 'FSRP', name: 'FinancialreversalResponse', desc: 'Terminal sends reversal response' },
        { code: 'FSPQ', name: 'FinancialpaymentRequest', desc: 'Sale System requests payment' },
        { code: 'FSRQ', name: 'FinancialreversalRequest', desc: 'Sale System requests reversal' },
        { code: 'FSCQ', name: 'FinancialReconciliationRequest', desc: 'Sale System requests reconciliation' }
    ],
    'CS-TransactionType': [
        { code: 'BALC', name: 'Balance', desc: 'Balance enquiry' },
        { code: 'CRDP', name: 'CardPayment', desc: 'Card Payment' },
        { code: 'CAVR', name: 'CardVerification', desc: 'Card Verification' },
        { code: 'QUCH', name: 'QuasiCash', desc: 'Quasi-Cash' },
        { code: 'RFND', name: 'Refund', desc: 'Refund Transaction' },
        { code: 'RESV', name: 'Reservation', desc: 'Outstanding Reservation' },
        { code: 'CASH', name: 'CashPayment', desc: 'Cash Payment' }
    ],
    'CS-Response': [
        { code: 'APPR', name: 'Approved', desc: 'Service successfully provided' },
        { code: 'TXNC', name: 'CannotCancel', desc: 'Transaction cannot be cancelled' },
        { code: 'DECL', name: 'Declined', desc: 'Service is declined' },
        { code: 'BUSY', name: 'DeviceBusy', desc: 'Device is busy' },
        { code: 'DUTR', name: 'DuplicateTransmission', desc: 'Duplicate transmission' },
        { code: 'INTP', name: 'InitiatingParty', desc: 'Invalid sender identification' },
        { code: 'IMSG', name: 'InvalidMessage', desc: 'Invalid message envelope' },
        { code: 'MSGT', name: 'MessageType', desc: 'Message type unknown' },
        { code: 'EMTY', name: 'Noticket', desc: 'No Ticket/Empty' },
        { code: 'PARS', name: 'ParsingError', desc: 'Invalid message format' },
        { code: 'VERS', name: 'ProtocolVersion', desc: 'Protocol version not supported' },
        { code: 'RCPP', name: 'RecipientParty', desc: 'Invalid receiver identification' },
        { code: 'TKTL', name: 'TicketLocked', desc: 'Ticket is locked' },
        { code: 'TOER', name: 'TimeoutError', desc: 'Timeout error' },
        { code: 'INPR', name: 'TransactionInProcess', desc: 'Unfinished transaction exists' },
        { code: 'TXCN', name: 'TransactionCancelled', desc: 'Transaction cancelled' },
        { code: 'NOTF', name: 'TransactionNotFound', desc: 'Transaction Not Found' },
        { code: 'UNPR', name: 'UnableToProcess', desc: 'Cannot process message' },
        { code: 'UNMP', name: 'Unmapped', desc: 'No register-terminal relationship' },
        { code: 'UATP', name: 'UnAdjustedTip', desc: 'Transaction with unadjusted tip' },
        { code: 'UNKN', name: 'UnKnown', desc: 'Terminal status unknown' }
    ],
    'CS-ResponseReason': [
        { code: 'ANYA', name: 'AccountNotYetActivated', desc: 'Account not yet activated' },
        { code: 'BCFU', name: 'BlockedCardFirstUsed', desc: 'Card not activated or temporarily blocked' },
        { code: 'CPCD', name: 'CaptureCard', desc: 'Capture card - cancelled (no fraud)' },
        { code: 'CPCF', name: 'CaptureCardFraud', desc: 'Capture card - fraud/compromised' },
        { code: 'CHVF', name: 'CardholderIDVerificationFailure', desc: 'Cardholder ID verification failed' },
        { code: 'CEIL', name: 'CashRequestExceedsIssuerLimit', desc: 'Cash request exceeds limit' },
        { code: 'CSNA', name: 'CashServiceNotAvailable', desc: 'Cashback not allowed' },
        { code: 'CLAC', name: 'ClosedAccount', desc: 'Closed account' },
        { code: 'CXNM', name: 'CancellationNotMatched', desc: 'Cancellation not matched' },
        { code: 'CXRS', name: 'CancelledReservation', desc: 'Cancelled reservation' },
        { code: 'C2VF', name: 'CSC2VerificationFailure', desc: 'CSC2/CVV2 verification failed' },
        { code: 'DFIT', name: 'DifferenceInTotals', desc: 'Difference in totals' },
        { code: 'DNHO', name: 'DoNotHonor', desc: 'Do not honor' },
        { code: 'DUTR', name: 'DuplicateTransmission', desc: 'Duplicate transmission' },
        { code: 'DCAL', name: 'DCCAllowed', desc: 'Dynamic currency conversion may be offered' },
        { code: 'DCNA', name: 'DCCNotAvailable', desc: 'Dynamic currency conversion not available' },
        { code: 'DDNA', name: 'DomesticDebitTransNotAllowed', desc: 'Domestic Debit Transaction Not Allowed' },
        { code: 'EAAL', name: 'ExceedActivityAmtLimit', desc: 'Exceeds activity amount limit' },
        { code: 'EAFL', name: 'ExceedActivityFreqLimit', desc: 'Exceeds activity frequency limit' },
        { code: 'ERSA', name: 'ExceedReservationAmount', desc: 'Exceeds reservation amount' },
        { code: 'ETAL', name: 'ExceedTransactionAmtLimit', desc: 'Exceeds transaction amount limit' },
        { code: 'EXCD', name: 'ExpiredCard', desc: 'Expired card' },
        { code: 'EXRS', name: 'ExpiredReservation', desc: 'Expired reservation' },
        { code: 'FFCI', name: 'FallForwardToContactInterface', desc: 'Terminate in favor of contact interface' },
        { code: 'FINF', name: 'FinancialInstitutionNotFound', desc: 'Financial Institution not found' },
        { code: 'INIS', name: 'InoperativeIssuerSwitch', desc: 'Inoperative Issuer or Switch' },
        { code: 'IPRD', name: 'InvalidProduct', desc: 'Service cannot be offered for product' },
        { code: 'ICRD', name: 'InvalidCard', desc: 'Card not valid for service' },
        { code: 'IVAC', name: 'InvalidAccount', desc: 'Invalid account' },
        { code: 'IVCD', name: 'InvalidCardNumber', desc: 'Invalid card number' },
        { code: 'IVIS', name: 'InvalidIssuer', desc: 'Invalid issuer' },
        { code: 'IVMU', name: 'InvalidMCCUsage', desc: 'Invalid use of MCC' },
        { code: 'IVMC', name: 'InvalidMerchant', desc: 'Invalid merchant' },
        { code: 'IVPO', name: 'InvalidPOI', desc: 'Invalid POI' },
        { code: 'IVRP', name: 'InvalidReconciliationPeriod', desc: 'Invalid reconciliation period' },
        { code: 'IVTD', name: 'InvalidTransactionDate', desc: 'Invalid transaction date' },
        { code: 'IVTR', name: 'InvalidTransaction', desc: 'Invalid transaction' },
        { code: 'LOCD', name: 'LostCard', desc: 'Lost card' },
        { code: 'PNUN', name: 'PaymentNetworkUnavailable', desc: 'Payment network unavailable' },
        { code: 'NOCR', name: 'NegativeOnlineCSCResults', desc: 'Negative Online CAM/CVV results' },
        { code: 'NCHA', name: 'NoChequingAccount', desc: 'No chequing account' },
        { code: 'IRAT', name: 'NoRate', desc: 'Exchange rates not available' },
        { code: 'KENA', name: 'KeyEntryNotAllowed', desc: 'Card key entry not allowed' },
        { code: 'NORP', name: 'NoOpenReconciliationPeriod', desc: 'No open reconciliation period' },
        { code: 'NSVA', name: 'NoSavingAccount', desc: 'No saving account' },
        { code: 'NSFD', name: 'NonSufficientFunds', desc: 'Non sufficient funds' },
        { code: 'PDNA', name: 'PINDebitNotAllowed', desc: 'PIN Debit Transaction Not Allowed' },
        { code: 'PNER', name: 'PINError', desc: 'PIN error (wrong PIN)' },
        { code: 'PNTE', name: 'PINTriesExceeded', desc: 'PIN tries exceeded' },
        { code: 'RFCI', name: 'ReferToCardIssuer', desc: 'Refer to card issuer' },
        { code: 'RPNO', name: 'ReconciliationPeriodNotOpen', desc: 'Reconciliation period not open' },
        { code: 'RSNM', name: 'ReservationNotMatched', desc: 'Reservation not matched' },
        { code: 'RSNC', name: 'ReservationNotCompleted', desc: 'Reservation not completed' },
        { code: 'RSAC', name: 'ReservationAlreadyCompleted', desc: 'Reservation already completed' },
        { code: 'RTCD', name: 'RestrictedCard', desc: 'Restricted card' },
        { code: 'RVAO', name: 'RevocationAuthorisationOrder', desc: 'Revocation of authorisation order' },
        { code: 'RVAA', name: 'RevocationAllAuthorisationsOrder', desc: 'Revocation of all authorisations' },
        { code: 'SEVI', name: 'SecurityViolation', desc: 'Security violation' },
        { code: 'SCVC', name: 'SurchargeNotPermittedOnVISACards', desc: 'Surcharge not permitted on VISA' },
        { code: 'SCDI', name: 'SurchargeNotSupportedByDebitNetworkIssuer', desc: 'Surcharge not supported by debit issuer' },
        { code: 'SPPO', name: 'StopPaymentOrder', desc: 'Stop payment order' },
        { code: 'STCD', name: 'StolenCard', desc: 'Stolen card' },
        { code: 'SUFR', name: 'SuspectedFraud', desc: 'Suspected fraud' },
        { code: 'SYER', name: 'SystemError', desc: 'System error' },
        { code: 'TACX', name: 'TransactionAlreadyCancelled', desc: 'Transaction already cancelled' },
        { code: 'TARV', name: 'TransactionAlreadyReversed', desc: 'Transaction already reversed' },
        { code: 'TBBC', name: 'TransactionBlockedByCardholder', desc: 'Transaction blocked by cardholder' },
        { code: 'TBBI', name: 'TransactionBlockedByIssuer', desc: 'Transaction blocked by issuer' },
        { code: 'TCVL', name: 'TransactionCannotBeCompletedViolationOfLaw', desc: 'Transaction cannot be completed - violation of law' },
        { code: 'TFCH', name: 'TransactionForbiddenToCardholder', desc: 'Transaction forbidden to cardholder' },
        { code: 'TFPO', name: 'TransactionForbiddenToPOI', desc: 'Transaction forbidden to POI' },
        { code: 'TTCP', name: 'TransactionTemporaryCannotBeProcessed', desc: 'Transaction temporarily cannot be processed' },
        { code: 'TOER', name: 'TimeoutError', desc: 'Timeout error' },
        { code: 'UTVP', name: 'UnableToVerifyPIN', desc: 'Unable to verify PIN' }
    ]
};

// Message Specification Structure
export const specStructure = {
    OCserviceRequest: {
        header: {
            messageFunction: { type: 'ST-MessageFunction', cardinality: '[1..1]' },
            protocolVersion: { type: 'ST-ProtocolVersion', cardinality: '[1..1]' },
            exchangeIdentification: { type: 'ST-ExchangeIdentification', cardinality: '[1..1]' },
            creationDateTime: { type: 'ST-CreationDateTime', cardinality: '[1..1]' },
            initiatingParty: {
                identification: { type: 'ST-Identification', cardinality: '[1..1]' },
                type: { type: 'ST-DeviceType', cardinality: '[1..1]' },
                shortName: { type: 'ST-ShortName', cardinality: '[1..1]' },
                authenticationKey: { type: 'ST-AuthenticationKey', cardinality: '[1..1]' }
            },
            recipientParty: {
                identification: { type: 'ST-Identification', cardinality: '[1..1]' },
                type: { type: 'ST-DeviceType', cardinality: '[1..1]' },
                shortName: { type: 'ST-ShortName', cardinality: '[1..1]' }
            }
        },
        serviceRequest: {
            environment: {
                merchant: { 
                    identification: { type: 'ST-Identification', cardinality: '[1..1]' } 
                },
                POI: { 
                    identification: { type: 'ST-Identification', cardinality: '[1..1]' } 
                }
            },
            context: {
                saleContext: {
                    cashierIdentification: { type: 'ST-CashierIdentification', cardinality: '[0..1]' },
                    invoiceNumber: { type: 'ST-InvoiceNumber', cardinality: '[0..1]' },
                    identificationType: { type: 'ST-IdentificationType', cardinality: '[0..1]' }
                }
            },
            serviceContent: { type: 'ST-ServiceContent', cardinality: '[1..1]' },
            paymentRequest: {
                transactionType: { type: 'ST-TransactionType', cardinality: '[1..1]' },
                transactionDetails: {
                    totalAmount: { type: 'ST-Amount', cardinality: '[1..1]' },
                    MOTOIndicator: { type: 'ST-MOTOIndicator', cardinality: '[1..1]' },
                    detailedAmount: {
                        amountGoodsAndServices: { type: 'ST-Amount', cardinality: '[1..1]' }
                    }
                }
            }
        }
    }
};