// Basic Data Types Definitions
export const basicDataTypes = {
    'Amount': {
        definition: 'Number of monetary units specified in a currency where the unit of currency is implied by the context and compliant with ISO 4217. The decimal separator is a dot.',
        format: 'Decimal number',
        example: '100.00, 1.50, 0.99'
    },
    'Boolean': {
        definition: 'A data element which could take the value of "true" or "false".',
        format: 'true | false',
        example: 'true, false'
    },
    'CodeSet': {
        definition: 'A set of alternative values where each discrete value has a specific meaning. These values (or meanings) are identified by a label, and the list of possible values defines the type. For instance the data element PeriodUnit, which identifies the period between consecutive payments, has the basic type Enumeration. The set of alternative values defining the data type is: "Day", "Month" and "Year". So PeriodUnit data element might take one of these three values.',
        format: 'Predefined set of codes',
        example: 'AUTQ, CRDP, FSPQ'
    },
    'DigitString': {
        definition: 'A sequence of decimal digit characters (value \'0\' through \'9\'). The digit sequence might have any length, including zero characters.',
        format: '[0-9]*',
        example: '123456, 0, 999'
    },
    'Indicator': {
        definition: 'A data element which could take the value of "1" or "0". 1 indicates true, 0 indicates false.',
        format: '0 | 1',
        example: '1 (true), 0 (false)'
    },
    'ISODate': {
        definition: 'A particular point in the progression of time in a calendar year expressed in the YYYY-MM-DD format.',
        format: 'YYYY-MM-DD',
        example: '2025-10-01, 2024-12-31'
    },
    'ISODateTime': {
        definition: 'A particular point in the progression of time defined by a mandatory date and a mandatory time component, expressed in either UTC time format (YYYY-MM-DDThh:mm:ss.sssZ), local time with UTC offset format (YYYY-MM-DDThh:mm:ss.sss+/-hh:mm), or local time format (YYYY-MM-DDThh:mm:ss.sss). These representations are defined in "XML Schema Part 2: Datatypes Second Edition - W3C Recommendation 28 October 2004" which is aligned with ISO 8601.',
        format: 'YYYY-MM-DDThh:mm:ss.sssZ',
        example: '2025-10-01T15:30:45.123Z',
        notes: 'Beginning/end of calendar day: 00:00:00 = beginning, 24:00:00 = end. Decimal fractions of seconds may be included. Involved parties shall agree on maximum number of digits allowed.'
    },
    'PercentageRate': {
        definition: 'Rate expressed as a percentage, that is, in hundredths, for example, 0.7 is 7/10 of a percent, and 7.0 is 7%.',
        format: 'totalDigits: 11, fractionDigits: 10, baseValue: 100.0',
        example: '0.7 (0.7%), 7.0 (7%), 12.5 (12.5%)'
    },
    'TextString': {
        definition: 'A sequence of printable characters (Unicode). The character sequence might have any length, including zero characters.',
        format: 'Unicode string',
        example: 'Hello World, Terminal ID, 商品名'
    },
    'UUID': {
        definition: 'A Universally Unique IDentifier (UUID) is a 128-bit label used for information in computer systems.',
        format: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        example: '550e8400-e29b-41d4-a716-446655440000',
        reference: 'https://en.wikipedia.org/wiki/Universally_unique_identifier'
    }
};

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
        desc: 'Version MM.mm',
        baseType: 'TextString'
    },
    'ST-ExchangeIdentification': { 
        type: 'UUID', 
        length: '{36}', 
        desc: 'Unique transaction UUID',
        baseType: 'UUID'
    },
    'ST-CreationDateTime': { 
        type: 'DateTime', 
        length: '{27}', 
        desc: 'ISO 8601 format with microseconds',
        baseType: 'ISODateTime'
    },
    'ST-DeviceType': { 
        type: 'CodeSet', 
        codeSet: 'CS-DeviceType', 
        length: '{3}' 
    },
    'ST-Identification': { 
        type: 'TextString', 
        length: '[8,16]', 
        desc: 'Terminal/Register/Merchant ID',
        baseType: 'TextString'
    },
    'ST-AuthenticationKey': { 
        type: 'UUID', 
        length: '{36}',
        desc: 'Authentication key in UUID format',
        baseType: 'UUID'
    },
    'ST-ShortName': { 
        type: 'TextString', 
        length: '[1,50]', 
        desc: 'Device descriptive name',
        baseType: 'TextString'
    },
    'ST-CashierIdentification': { 
        type: 'TextString', 
        length: '[0,20]',
        desc: 'Cashier ID (optional)',
        baseType: 'TextString'
    },
    'ST-InvoiceNumber': { 
        type: 'TextString', 
        length: '[0,30]',
        desc: 'Invoice/Receipt number (optional)',
        baseType: 'TextString'
    },
    'ST-IdentificationType': { 
        type: 'TextString', 
        length: '[0,20]',
        desc: 'Type of identification (optional)',
        baseType: 'TextString'
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
        desc: 'Monetary amount (e.g., "1.00")',
        baseType: 'Amount'
    },
    'ST-MOTOIndicator': { 
        type: 'Boolean', 
        length: '{5}',
        desc: 'Mail Order/Telephone Order indicator',
        baseType: 'Boolean'
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
    MessageElement: {
        header: {
            messageFunction: { type: 'ST-MessageFunction', cardinality: '[1..1]' },
            protocolVersion: { type: 'ST-ProtocolVersion', cardinality: '[1..1]' },
            exchangeIdentification: { type: 'ST-ExchangeIdentification', cardinality: '[1..1]' },
            creationDateTime: { type: 'ISODateTime', cardinality: '[1..1]' },
            initiatingParty: {
                identification: { type: 'ST-Identification', cardinality: '[1..1]' },
                type: { type: 'ST-DeviceType', cardinality: '[1..1]' },
                shortName: { type: 'ST-ShortName', cardinality: '[0..1]' },
                authenticationKey: { type: 'ST-AuthenticationKey', cardinality: '[1..1]' }
            },
            recipientParty: {
                identification: { type: 'ST-Identification', cardinality: '[1..1]' },
                type: { type: 'ST-DeviceType', cardinality: '[1..1]' },
                shortName: { type: 'ST-ShortName', cardinality: '[0..1]' }
            }
        },
        serviceRequest: {
            environment: {
                merchant: { 
                    identification: { type: 'ST-Identification', cardinality: '[1..1]', desc: 'Merchant ID' } 
                },
                POI: { 
                    identification: { type: 'ST-Identification', cardinality: '[1..1]', desc: 'Terminal ID' } 
                }
            },
            context: {
                saleContext: {
                    saleIdentification: { type: 'ST-SaleIdentification', cardinality: '[0..1]' },
                    saleReferenceNumber: { type: 'ST-SaleReferenceNumber', cardinality: '[0..1]' },
                    SaleReconciliationIdentification: { type: 'ST-SaleReconciliationIdentification', cardinality: '[0..1]' },
                    cashierIdentification: { type: 'ST-CashierIdentification', cardinality: '[0..1]' },
                    invoiceNumber: { type: 'ST-InvoiceNumber', cardinality: '[0..1]' },
                    tokenRequested: { type: 'ST-PaymentTokenRequested', cardinality: '[0..1]' },
                    identificationType: { type: 'ST-IdentificationType', cardinality: '[0..1]' },
                    purchaseOrderNumber: { type: 'TextString', cardinality: '[0..1]' }
                }
            },
            serviceContent: { type: 'ST-ServiceContent', cardinality: '[1..1]' },
            paymentRequest: {
                paymentTransaction: {
                    transactionType: { type: 'ST-TransactionType', cardinality: '[1..1]' },
                    serviceAttribute: { type: 'CS-ServiceAttribute', cardinality: '[0..1]' },
                    transactionIdentification: { type: 'TextString', cardinality: '[1..1]' },
                    transactionDetails: {
                        totalAmount: { type: 'ST-Amount', cardinality: '[1..1]' },
                        amountQualifier: { type: 'CS-AmountQualifier', cardinality: '[0..1]' },
                        cumulativeAmount: { type: 'ST-Amount', cardinality: '[0..1]' },
                        validityDuration: { type: 'TextString', cardinality: '[0..1]' },
                        detailedAmount: {
                            amountGoodsAndServices: { type: 'ST-Amount', cardinality: '[1..1]' },
                            cashBack: { type: 'ST-Amount', cardinality: '[0..1]' },
                            gratuity: { type: 'ST-Amount', cardinality: '[0..1]' }
                        },
                        MOTOIndicator: { type: 'ST-MOTOIndicator', cardinality: '[0..1]' },
                        DCCRefund: {
                            DCCRate: { type: 'ST-DCCRate', cardinality: '[1..1]' },
                            DCCCurrency: { type: 'ST-DCCCurrency', cardinality: '[1..1]' }
                        },
                        AIDPriority: { type: 'ST-AIDPriority', cardinality: '[0..*]' },
                        VehicleRentalData: {
                            RenterName: { type: 'ST-RenterName', cardinality: '[0..1]' },
                            RentalAgreementNumber: { type: 'ST-VehicleRentalAgreementNumber', cardinality: '[0..1]' },
                            RentalProgramCode: { type: 'ST-VehicleRentalProgramCode', cardinality: '[0..1]' },
                            VehicleCategoryCode: { type: 'ST-VehicleRentalCategoryCode', cardinality: '[0..1]' },
                            RentalDuration: { type: 'Number', cardinality: '[0..1]' },
                            PeriodRentalRate: { type: 'ST-Amount', cardinality: '[0..1]' },
                            RatePeriodUnit: { type: 'ST-PeriodUnit', cardinality: '[0..1]' },
                            DistanceRentalRate: { type: 'ST-Amount', cardinality: '[0..1]' },
                            RateDistanceUnit: { type: 'ST-UnitOfMeasure', cardinality: '[0..1]' },
                            RentalDistance: { type: 'Number', cardinality: '[0..1]' },
                            RentalDistanceUnit: { type: 'ST-UnitOfMeasure', cardinality: '[0..1]' },
                            PickupDate: { type: 'ISODate', cardinality: '[0..1]' },
                            PickupTime: { type: 'ISOTime', cardinality: '[0..1]' },
                            PickupLocation: {
                                Name: { type: 'ST-VehicleLocationName', cardinality: '[0..1]' },
                                TownName: { type: 'ST-TownName', cardinality: '[0..1]' },
                                CountrySubDivision: { type: 'ST-CountrySubDivision', cardinality: '[0..1]' },
                                Country: { type: 'ST-CountryCodeA2', cardinality: '[0..1]' }
                            },
                            ReturnDate: { type: 'ISODate', cardinality: '[0..1]' },
                            ReturnTime: { type: 'ISOTime', cardinality: '[0..1]' },
                            ReturnLocation: {
                                Identifier: { type: 'ST-VehicleRentalLocationIdentifier', cardinality: '[0..1]' },
                                Name: { type: 'ST-VehicleLocationName', cardinality: '[0..1]' },
                                TownName: { type: 'ST-TownName', cardinality: '[0..1]' },
                                CountrySubDivision: { type: 'ST-CountrySubDivision', cardinality: '[0..1]' },
                                LocationCountry: { type: 'ST-CountryCodeA2', cardinality: '[0..1]' }
                            },
                            AdjustmentIndicator: { type: 'ST-BillingAdjustmentIndicator', cardinality: '[0..1]' },
                            AdjustmentAmount: { type: 'ST-Amount', cardinality: '[0..1]' },
                            DetailedCharge: {
                                Type: { type: 'ST-IndustryChargeType', cardinality: '[1..1]' },
                                Amount: { type: 'ST-Amount', cardinality: '[1..1]' }
                            }
                        },
                        LodgingData: {
                            RenterName: { type: 'ST-RenterName', cardinality: '[0..1]' },
                            FolioNumber: { type: 'ST-FolioNumber', cardinality: '[0..1]' },
                            Property: {
                                Name: { type: 'ST-PropertyName', cardinality: '[0..1]' },
                                PhoneNumber: { type: 'ST-PhoneNumber', cardinality: '[0..1]' },
                                TownName: { type: 'ST-TownName', cardinality: '[0..1]' },
                                CountrySubDivision: { type: 'ST-CountrySubDivision', cardinality: '[0..2]' },
                                Country: { type: 'ST-CountryCodeA2', cardinality: '[1..1]' }
                            },
                            FireSafetyActIndicator: { type: 'ST-FireSafetyActIndicator', cardinality: '[0..1]' },
                            CheckInDate: { type: 'ISODate', cardinality: '[0..1]' },
                            CheckOutDate: { type: 'ISODate', cardinality: '[0..1]' },
                            Duration: { type: 'Number', cardinality: '[0..1]' },
                            NumberOfRooms: { type: 'Number', cardinality: '[0..1]' },
                            NumberOfGuests: { type: 'Number', cardinality: '[0..1]' },
                            RoomDetail: {
                                DailyRate: { type: 'ST-Amount', cardinality: '[1..1]' },
                                Duration: { type: 'Number', cardinality: '[1..1]' },
                                TaxAmount: { type: 'ST-Amount', cardinality: '[0..1]' }
                            },
                            TotalTaxAmount: { type: 'ST-Amount', cardinality: '[0..1]' },
                            TotalRoomTaxAmount: { type: 'ST-Amount', cardinality: '[0..1]' },
                            PrepaidAmount: { type: 'ST-Amount', cardinality: '[0..1]' },
                            CashAdvanceAmount: { type: 'ST-Amount', cardinality: '[0..1]' },
                            AdjustmentIndicator: { type: 'ST-BillingAdjustmentIndicator', cardinality: '[0..1]' },
                            AdjustmentAmount: { type: 'ST-Amount', cardinality: '[0..1]' },
                            DetailedCharge: {
                                Type: { type: 'ST-IndustryChargeType', cardinality: '[1..1]' },
                                Amount: { type: 'ST-Amount', cardinality: '[1..1]' }
                            }
                        },
                        TravelData: {
                            TicketNumber: { type: 'ST-TravelTicketNumber', cardinality: '[0..1]' },
                            IATACarrierCode: { type: 'ST-IATACarrierCode', cardinality: '[0..1]' },
                            TravelAgency: {
                                IATANumber: { type: 'ST-IATAAgencyNumber', cardinality: '[0..1]' },
                                Name: { type: 'ST-TravelAgencyName', cardinality: '[0..1]' }
                            },
                            TravelPackageIndicator: { type: 'ST-TravelPackageIndicator', cardinality: '[0..1]' },
                            PassengerName: { type: 'ST-PassengerName', cardinality: '[0..1]' },
                            TravelDate: { type: 'ISODate', cardinality: '[0..1]' },
                            TripSegment: {
                                DepartureDate: { type: 'ISODate', cardinality: '[0..1]' },
                                DepartureTime: { type: 'ISOTime', cardinality: '[0..1]' },
                                OriginCode: { type: 'ST-IATALocationIdentifier', cardinality: '[0..1]' },
                                DestinationCode: { type: 'ST-IATALocationIdentifier', cardinality: '[0..1]' },
                                FlightNumber: { type: 'ST-FlightNumber', cardinality: '[0..1]' },
                                IATACarrierCode: { type: 'ST-IATACarrierCode', cardinality: '[0..1]' },
                                TravelClass: { type: 'ST-IATATravelClass', cardinality: '[0..1]' },
                                LodgingData: {
                                    CheckInDate: { type: 'ISODate', cardinality: '[0..1]' },
                                    CheckOutDate: { type: 'ISODate', cardinality: '[0..1]' },
                                    Duration: { type: 'Number', cardinality: '[0..1]' },
                                    Property: {
                                        Name: { type: 'ST-PropertyName', cardinality: '[0..1]' },
                                        PhoneNumber: { type: 'ST-PhoneNumber', cardinality: '[0..1]' },
                                        TownName: { type: 'ST-TownName', cardinality: '[0..1]' },
                                        CountrySubDivision: { type: 'ST-CountrySubDivision', cardinality: '[0..2]' },
                                        Country: { type: 'ST-CountryCodeA2', cardinality: '[1..1]' }
                                    },
                                    RoomDetail: {
                                        DailyRate: { type: 'ST-Amount', cardinality: '[1..1]' },
                                        Duration: { type: 'Number', cardinality: '[1..1]' }
                                    }
                                }
                            },
                            CruiseData: {
                                DepartureDate: { type: 'ISODate', cardinality: '[0..1]' },
                                ReturnDate: { type: 'ISODate', cardinality: '[0..1]' },
                                Duration: { type: 'Number', cardinality: '[0..1]' },
                                ShipName: { type: 'ST-ShipName', cardinality: '[0..1]' },
                                TotalAmount: { type: 'ST-Amount', cardinality: '[0..1]' }
                            }
                        }
                    }
                }
            }
        }
    }
};