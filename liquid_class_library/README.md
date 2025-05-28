# Laboratory Liquid Properties for Hamilton STAR

A comprehensive Python Flask web application for managing liquid handling parameters for Hamilton STAR laboratory automation equipment. This application provides detailed liquid properties and recommended Venus settings for various liquid classes.

## Features

- **Comprehensive Liquid Database**: 20+ common laboratory liquids with detailed properties
- **Liquid Class Management**: 12 predefined liquid classes with optimized Hamilton STAR settings
- **Interactive Interface**: Filter liquids by class and view detailed Venus parameter settings
- **Responsive Design**: Modern, mobile-friendly interface
- **RESTful API**: JSON API endpoints for integration with other systems

## Technology Stack

- **Backend**: Python 3.7+ with Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Management**: Python dataclasses and in-memory storage
- **Styling**: Custom CSS with modern design principles

## Installation

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd liquid_class_library
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser and navigate to:
```
http://localhost:3100
```

## Usage

### Web Interface

1. **Filter by Liquid Class**: Use the dropdown to filter liquids by their classification
2. **View Liquid Class Settings**: Select a liquid class to see detailed Hamilton STAR parameters
3. **Explore Parameter Details**: Click on parameter cards to view Venus-specific settings
4. **Browse Liquid Properties**: View comprehensive table of liquid properties

### API Endpoints

#### Get All Liquids
```
GET /api/liquids
```

#### Get Liquids by Class
```
GET /api/liquids?liquid_class=Aqueous
```

#### Get Liquid Class Details
```
GET /api/liquid-class/Aqueous
```

#### Get All Liquid Class Names
```
GET /api/liquid-classes
```

## Liquid Classes

The application includes the following predefined liquid classes:

- **Aqueous**: Water and water-like solutions
- **Organic-Low**: Low viscosity organic solvents
- **Organic-Medium**: Medium viscosity organic solvents
- **Organic-High-Density**: Dense organic solvents like chloroform
- **Organic-Low-Volatile**: Highly volatile organics
- **Organic-Corrosive**: Corrosive organic solvents
- **Viscous**: Highly viscous liquids like glycerol
- **Aqueous-Viscous**: Moderately viscous aqueous solutions
- **Serum**: Serum and protein-rich solutions
- **Aqueous-Buffer**: Common laboratory buffers
- **Aqueous-Organic**: Water-organic mixtures

## Project Structure

```
liquid_class_library/
├── app.py                 # Main Flask application
├── models.py              # Data models and database
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── styles.css    # Application styles
    └── js/
        └── app.js        # Frontend JavaScript
```

## Development

### Adding New Liquids

To add new liquids, modify the `_initialize_liquids()` method in `models.py`:

```python
Liquid(
    name="Your Liquid",
    density=1.00,
    viscosity=1.00,
    molar_weight="100.00",
    liquid_class="Aqueous",
    notes="Your notes here"
)
```

### Adding New Liquid Classes

To add new liquid classes, modify the `_initialize_liquid_classes()` method in `models.py` and follow the existing pattern.

### Customizing the Interface

- Modify `templates/index.html` for HTML structure changes
- Update `static/css/styles.css` for styling modifications
- Edit `static/js/app.js` for JavaScript functionality changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or support, please open an issue in the repository.

## Acknowledgments

- Hamilton Company for the STAR liquid handling platform
- Venus software documentation for parameter specifications
- Laboratory automation community for best practices
