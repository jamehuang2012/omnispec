# Payment Specification Demo

A web application for visualizing and generating payment message specifications.

## Project Structure

```
payment-specification-demo/
├── server.js                 # Express server
├── package.json             # Node.js dependencies
├── README.md               # This file
└── public/                 # Static files
    ├── index.html          # Main HTML file
    ├── css/
    │   └── styles.css      # All CSS styles
    └── js/
        ├── data.js         # Data structures (dataTypes, codeSets, specStructure)
        └── app.js          # Application logic
```

## Installation

1. **Clone or create the project directory structure** as shown above

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Features

- **Interactive Message Structure**: Click on data types to view detailed information
- **Data Types Reference**: Comprehensive list of all data types with their specifications
- **JSON Generator**: Generate sample payment messages in JSON format
- **Code Sets**: View all valid codes for CodeSet data types
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Development

### Modifying Data Structures

Edit `public/js/data.js` to:
- Add/modify data types in the `dataTypes` object
- Add/modify code sets in the `codeSets` object
- Change the message structure in the `specStructure` object

### Modifying Styles

Edit `public/css/styles.css` to customize the appearance

### Modifying Application Logic

Edit `public/js/app.js` to change how the application behaves

## Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript (ES6 modules)
- **Styling**: Pure CSS with modern features (Grid, Flexbox, animations)

## Browser Support

Modern browsers with ES6 module support:
- Chrome/Edge 61+
- Firefox 60+
- Safari 11+

## License

ISC