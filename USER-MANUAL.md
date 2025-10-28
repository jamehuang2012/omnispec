# OmniChannel Cloud Integration Specification Demo - User Manual

Version 2.48

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [User Interface Overview](#user-interface-overview)
4. [Request Tab](#request-tab)
5. [Response Tab](#response-tab)
6. [Validation Tab](#validation-tab)
7. [Transaction Types](#transaction-types)
8. [Industry-Specific Data](#industry-specific-data)
9. [Validation Rules](#validation-rules)
10. [Troubleshooting](#troubleshooting)

---

## Introduction

The OmniChannel Cloud Integration Specification Demo is a web-based tool designed to help developers, integrators, and QA teams understand and work with payment messaging specifications. This tool provides:

- **Interactive Message Structure Visualization**: Browse the complete message structure with field-level details
- **JSON Generation**: Automatically generate valid request and response messages
- **Real-time Validation**: Validate JSON messages against the specification
- **Data Type Reference**: Complete reference of all data types and code sets
- **Multiple Transaction Types**: Support for Sale, Refund, Void, Settlement, Reports, and Session Management

---

## Getting Started

### Installation

1. **Prerequisites**:
   - Node.js (version 14 or higher)
   - npm (Node Package Manager)

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Application**:

   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

4. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:3000`
   - For network access, use `http://<your-ip>:3000`

### Docker Deployment

See `docker-setup.md` and `docker-build.md` for containerized deployment instructions.

---

## User Interface Overview

The application consists of three main tabs:

### 1. Request Tab
Generate payment request messages (from POS/Terminal to Cloud)

### 2. Response Tab
Generate payment response messages (from Cloud to POS/Terminal)

### 3. Validation Tab
Validate any JSON message against the specification

### Interface Components

Each tab contains:
- **Control Panel**: Input fields and options for message generation
- **Message Structure Panel**: Interactive tree view of the message specification
- **Data Types Reference**: Searchable list of all data types with definitions
- **JSON Output Panel**: Generated or validated JSON with syntax highlighting
- **Basic Data Types Section**: Reference for primitive data types

---

## Request Tab

The Request tab allows you to generate payment request messages.

### Basic Configuration

1. **Amount**: Enter the transaction amount (e.g., 100.00)
2. **Transaction Type**: Select from available transaction types
3. **Clerk ID**: Optional cashier/clerk identifier
4. **Invoice Number**: Optional invoice reference
5. **ID Type**: Optional identification type
6. **Industry Data**: Select industry-specific data to include (Vehicle Rental, Lodging, Travel)

### Transaction-Specific Fields

Different fields appear based on the selected transaction type:

#### Sale/MOTO/Crypto/Refund
- **Gratuity (Tip)**: Optional tip amount
- **Industry Data**: Additional fields for specific industries

#### Void
- **Original Transaction ID**: The transaction identifier to void

#### Settle (Batch)
- No additional fields required
- Generates a settlement request for all transactions

#### Report
- **Report Type**: Select the type of report to request
  - HSTS: Host Totals Summary
  - TMDR: Terminal Details Report
  - TMSH: Terminal Sales By Hour
  - TMTS: Terminal Totals Summary
  - TRRP: Transaction Receipt Reprint
  - TMCD: Terminal Configuration Detail
  - PARD: PreAuth Details Report

#### Session Management
- **Session Component**: Choose POI (Terminal) or POS (Register)
- **Exchange Action**:
  - INIT: Initialize session
  - NOTI: Notification
  - RETR: Retrieve transaction
  - RECV: Recover session
  - CANC: Cancel transaction
- **Exchange Identification**: Required for RETR/RECV/CANC actions
- **Device State**: Optional device state indicator

### Generating Request JSON

1. Configure all desired fields
2. Click **"Generate JSON"** button
3. View the generated JSON in the right panel
4. Click **"Copy JSON"** to copy to clipboard

### Message Structure Panel

- Click on any field name to view detailed information
- **Blue text**: Clickable data types with definitions
- **Cardinality indicators**:
  - `[1..1]`: Required field (exactly one)
  - `[0..1]`: Optional field (zero or one)
  - `[1..n]`: Required list (one or more)
  - `[0..n]`: Optional list (zero or more)

---

## Response Tab

The Response tab allows you to generate payment response messages.

### Basic Configuration

1. **Transaction Type**: Select the transaction type for the response
2. **Amount**: Transaction amount
3. **Gratuity**: Optional tip amount
4. **Report Type**: Available when Report is selected
5. **Verbatim Receipt**: Check to include receipt content
6. **Token Response**: Check to include tokenization data

### Transaction-Specific Responses

#### Sale/MOTO/Crypto/Refund Response
Includes:
- Transaction identifications (Sale and POI)
- Retailer payment result with receipt details
- Transaction details and amounts
- Authorization result and code
- Receipt output

#### Void Response
Includes:
- Reversal response structure
- Original transaction references
- Reversal result details

#### Settle Response
Includes:
- Batch response with data source
- Host totals by card brand
- Optional receipt

#### Report Response
Includes:
- Report transaction response
- Transaction report array
- Payment response details

#### Session Management Response
Includes:
- POI component details
- Session response with status
- Optional transaction in process information

### Generating Response JSON

1. Configure response parameters
2. Click **"Generate Response JSON"** button
3. View and copy the generated response

---

## Validation Tab

The Validation tab allows you to validate any JSON message against the specification.

### How to Validate

1. Switch to the **Validation** tab
2. Paste or type your JSON in the input area
3. Click **"Validate JSON"** button
4. Review validation results

### Validation Results

Results are displayed in three categories:

#### ✓ Errors (Red)
Critical issues that violate the specification:
- Missing required fields
- Invalid field values
- Type mismatches
- Invalid root elements

#### ⚠ Warnings (Yellow)
Non-critical issues:
- Unexpected fields not in specification
- Optional fields with unusual values

#### ℹ Info (Blue)
Informational messages:
- Successfully validated sections
- Helpful hints

### Supported Root Elements

The validator recognizes these root elements:

**Request Messages**:
- `OCserviceRequest`: Standard payment requests
- `OCreportRequest`: Report requests
- `OCsessionManagementRequest`: Session management requests

**Response Messages**:
- `OCserviceResponse`: Standard payment responses
- `OCreportResponse`: Report responses
- `OCsessionManagementResponse`: Session management responses

---

## Transaction Types

### Sale
Standard purchase transaction. Customer pays for goods/services.

**Required Fields**:
- Amount
- Transaction identifications
- Sale context

**Optional Fields**:
- Gratuity
- Industry-specific data
- Payment instrument details

### MOTO (Mail Order/Telephone Order)
Card-not-present transaction where cardholder provides details remotely.

**Special Handling**:
- MOTOIndicator field is set
- Different authorization rules may apply

### Crypto
Cryptocurrency payment transaction.

**Special Considerations**:
- May include crypto-specific payment instrument data
- Different processing flow

### Refund
Return transaction crediting funds back to customer.

**Required Fields**:
- Refund amount
- Original transaction reference (recommended)

### Void (Reversal)
Cancels a previously authorized or completed transaction.

**Required Fields**:
- Original transaction identification
- Reversal reason

**Structure**:
- Uses `OCserviceRequestReversal` specification
- Includes `reversalRequest` section

### Tip Adjustment
Modifies the tip amount on a previous transaction.

**Required Fields**:
- Original transaction reference
- New gratuity amount

### Pre-Authorization
Reserves funds without capturing them.

**Use Cases**:
- Hotel reservations
- Car rentals
- Restaurant tabs

### Incremental Authorization
Increases the amount of an existing pre-authorization.

**Required Fields**:
- Original authorization reference
- Additional amount

### Pre-Auth Completion
Captures funds from a previous pre-authorization.

**Required Fields**:
- Original pre-auth reference
- Final amount (can be less than pre-auth)

### Settle (Batch)
Closes a batch and settles all transactions.

**Structure**:
- Uses `OCserviceRequestBatch` specification
- Includes `batchRequest` section
- Returns totals by card brand

### Report
Requests various types of transaction and terminal reports.

**Report Types**:
- **HSTS**: Host totals summary
- **TMDR**: Terminal details report
- **TMSH**: Terminal sales by hour
- **TMTS**: Terminal totals summary
- **TRRP**: Transaction receipt reprint
- **TMCD**: Terminal configuration detail
- **PARD**: PreAuth details report

### Session Management
Manages communication sessions between terminal and cloud.

**Actions**:
- **INIT**: Initialize new session
- **NOTI**: Send notification/heartbeat
- **RETR**: Retrieve transaction status
- **RECV**: Recover session after interruption
- **CANC**: Cancel pending transaction

**Components**:
- **POI Component**: Terminal-side session management
- **POS Component**: Register-side session management

---

## Industry-Specific Data

The specification supports additional data for specific industries:

### Vehicle Rental Data
For car rental transactions.

**Fields**:
- Rental agreement number
- Renter name
- Return location
- Pickup/Return dates
- Daily rate
- Vehicle details
- Extra charges

### Lodging Data
For hotel/accommodation transactions.

**Fields**:
- Folio number
- Check-in/Check-out dates
- Room rate
- Room number
- Duration of stay
- Extra charges (phone, minibar, etc.)
- Guest details

### Travel & Cruise Data
For airline, travel agency, and cruise transactions.

**Fields**:
- Ticket number
- Passenger name
- Departure/Destination
- Travel date
- Carrier code
- Cruise line
- Cabin number
- Sailing dates

### How to Include Industry Data

1. In the **Request** tab, locate the **Industry Data** dropdown
2. Select the appropriate industry type
3. Generate JSON - industry-specific fields will be included automatically
4. Customize values as needed in the generated JSON

---

## Validation Rules

### Field Cardinality

- **[1..1]**: Exactly one occurrence required
- **[0..1]**: Zero or one occurrence (optional)
- **[1..n]**: At least one occurrence required (array)
- **[0..n]**: Zero or more occurrences (optional array)

### Data Type Validation

Each field is validated against its declared data type:

#### String Types (ST-*)
- **ST-Amount**: Numeric string with decimal (e.g., "100.00")
- **ST-Identification**: Alphanumeric identifier
- **ST-TransactionReference**: Unique transaction reference
- **ST-Response**: Response code from CodeSet (e.g., "APPR", "DECL")

#### Primitive Types
- **TextString**: Any text string
- **Indicator**: Boolean (0 or 1)
- **ISODateTime**: ISO 8601 date/time format (YYYY-MM-DDTHH:MM:SSZ)

#### CodeSet Types
Values must match predefined codes:
- **ST-MessageFunction**: FSPR, FSPS, RPRT, etc.
- **ST-TransactionType**: CRDP, CRDV, CRDR, etc.
- **ST-DeviceType**: CRG, PIN, PID, etc.

### Common Validation Errors

1. **Missing required field**: Add the required field to your JSON
2. **Invalid field value**: Check the data type definition and valid codes
3. **Unexpected field**: Field not in specification (may be a typo)
4. **Wrong data type**: Value type doesn't match specification
5. **Invalid root element**: Use a supported root element name

---

## Troubleshooting

### Application Won't Start

**Problem**: Server fails to start
**Solution**:
- Check if port 3000 is already in use
- Change port in `server.js`: `const PORT = process.env.PORT || 3500;`
- Verify Node.js is installed: `node --version`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### JSON Generation Issues

**Problem**: Generated JSON contains errors
**Solution**:
- Validate the JSON in the Validation tab
- Review validation errors
- Check that all required fields are populated
- Verify transaction type is correctly selected

### Validation Errors

**Problem**: Valid JSON showing errors
**Solution**:
- Ensure JSON has correct root element
- Check field spelling and casing (case-sensitive)
- Verify cardinality requirements
- Check data types match specification

### Copy to Clipboard Not Working

**Problem**: Copy button doesn't work
**Solution**:
- Browser may require HTTPS for clipboard access
- Use manual selection (Ctrl+A, Ctrl+C)
- Check browser permissions for clipboard access

### Modal Not Displaying

**Problem**: Clicking data types doesn't show details
**Solution**:
- Check browser console for JavaScript errors
- Refresh the page
- Clear browser cache
- Try a different browser

### Industry Data Not Appearing

**Problem**: Industry-specific fields not in generated JSON
**Solution**:
- Select industry data type before generating
- Verify transaction type supports industry data
- Check specification for industry data structure

---

## Best Practices

### For Developers

1. **Start with Generated JSON**: Use the tool to generate base JSON, then customize
2. **Validate Frequently**: Always validate after manual modifications
3. **Reference Data Types**: Click on data types to understand requirements
4. **Test All Transaction Types**: Ensure your integration handles all types
5. **Check Cardinality**: Pay attention to required vs optional fields

### For QA Testing

1. **Test Boundary Cases**: Min/max amounts, empty optional fields
2. **Test Invalid Data**: Verify error handling
3. **Test All Code Sets**: Try different values from code sets
4. **Test Industry Data**: Validate industry-specific scenarios
5. **Validate Responses**: Ensure responses match request types

### For Integration

1. **Follow the Specification**: Use this tool as reference, not replacement
2. **Handle Optional Fields**: Don't assume optional fields are always present
3. **Validate Incoming Messages**: Validate both requests and responses
4. **Log Validation Errors**: Track specification violations
5. **Keep Synchronized**: Update when specification version changes

---

## Keyboard Shortcuts

- **Ctrl/Cmd + A**: Select all JSON text
- **Ctrl/Cmd + C**: Copy selected text
- **Tab**: Switch between tabs (when focused on tab buttons)

---

## API Reference

### Generated JSON Structure

#### Request Message Base Structure
```json
{
  "OCserviceRequest": {
    "header": {
      "messageFunction": "FSPR",
      "protocolVersion": "2.48",
      "exchangeIdentification": "<UUID>",
      "creationDateTime": "<ISO DateTime>",
      "initiatingParty": { ... },
      "recipientParty": { ... }
    },
    "serviceRequest": {
      "environment": { ... },
      "context": { ... },
      "serviceContent": "FSPF",
      "paymentRequest": { ... }
    }
  }
}
```

#### Response Message Base Structure
```json
{
  "OCserviceResponse": {
    "header": {
      "messageFunction": "FSPS",
      "protocolVersion": "2.48",
      "exchangeIdentification": "<UUID>",
      "creationDateTime": "<ISO DateTime>",
      "initiatingParty": { ... },
      "recipientParty": { ... }
    },
    "serviceResponse": {
      "response": {
        "responseCode": "APPR",
        "responseReason": ""
      },
      "paymentResponse": { ... }
    }
  }
}
```

---

## Specification Version

**Current Version**: 2.48
**Last Updated**: October 2024

For specification updates and change logs, consult your integration documentation or contact your payment provider.

---

## Support & Resources

### Documentation
- **README.md**: Installation and basic setup
- **docker-setup.md**: Docker deployment instructions
- **docker-build.md**: Docker build process

### Code Structure
- **server.js**: Express server configuration
- **public/index.html**: Main application interface
- **public/js/app.js**: Application logic and JSON generation
- **public/js/data.js**: Specification data structures
- **public/css/styles.css**: UI styling

### Reporting Issues

When reporting issues, please include:
1. Browser and version
2. Transaction type being used
3. Steps to reproduce
4. Generated JSON (if applicable)
5. Error messages or screenshots

---

## Appendix A: Common Code Sets

### Response Codes (ST-Response)
- **APPR**: Approved
- **DECL**: Declined
- **PART**: Partial approval
- **EXPR**: Expired card
- **INVC**: Invalid card
- **PINX**: PIN retries exceeded

### Transaction Types (ST-TransactionType)
- **CRDP**: Credit/Debit purchase
- **CRDR**: Credit/Debit refund
- **CRDV**: Credit/Debit void
- **CRDC**: Credit/Debit completion
- **CRDI**: Credit/Debit incremental

### Message Functions (ST-MessageFunction)
- **FSPR**: Financial Service Payment Request
- **FSPS**: Financial Service Payment Success
- **FSPP**: Financial Service Payment in Progress
- **RPRT**: Report Request
- **RPRR**: Report Response

### Device Types (ST-DeviceType)
- **CRG**: Cash Register
- **PIN**: PIN pad
- **PID**: Payment Integrator Device
- **ATT**: Attendant Terminal

---

## Appendix B: Validation Examples

### Valid Sale Request
```json
{
  "OCserviceRequest": {
    "header": {
      "messageFunction": "FSPR",
      "protocolVersion": "2.48",
      "exchangeIdentification": "550e8400-e29b-41d4-a716-446655440000",
      "creationDateTime": "2024-10-08T14:30:00Z",
      "initiatingParty": {
        "identification": "10000001",
        "type": "CRG",
        "shortName": "Register 01"
      },
      "recipientParty": {
        "identification": "20000004",
        "type": "PID",
        "shortName": "Payment Cloud"
      }
    },
    "serviceRequest": {
      "environment": {
        "merchant": { "identification": "123456789" },
        "POI": { "identification": "11000499" }
      },
      "context": {
        "saleContext": {
          "saleIdentification": "SALE001",
          "cashierIdentification": "CLERK01"
        }
      },
      "serviceContent": "FSPF",
      "paymentRequest": {
        "transactionDetails": {
          "totalAmount": "100.00"
        }
      }
    }
  }
}
```

---

## Version History

**v2.48** - October 2024
- Initial user manual release
- Support for all transaction types
- Enhanced validation with detailed error reporting
- Industry data support
- Session management functionality

---

*End of User Manual*
