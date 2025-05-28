from flask import Flask, render_template, request, jsonify
from models import LiquidDatabase

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Initialize the database
db = LiquidDatabase()


@app.route('/')
def index():
    """Main page displaying the liquid properties chart."""
    return render_template('index.html', 
                         liquid_classes=db.get_all_liquid_class_names(),
                         liquids=db.liquids_data)


@app.route('/api/liquids')
def get_liquids():
    """API endpoint to get liquids, optionally filtered by liquid class."""
    liquid_class = request.args.get('liquid_class')
    liquids = db.get_liquids_by_class(liquid_class)
    
    # Convert to dict for JSON serialization
    liquids_dict = []
    for liquid in liquids:
        liquids_dict.append({
            'name': liquid.name,
            'density': liquid.density,
            'viscosity': liquid.viscosity,
            'molar_weight': liquid.molar_weight,
            'liquid_class': liquid.liquid_class,
            'notes': liquid.notes
        })
    
    return jsonify(liquids_dict)


@app.route('/api/liquid-class/<class_name>')
def get_liquid_class(class_name):
    """API endpoint to get liquid class details."""
    liquid_class = db.get_liquid_class_by_name(class_name)
    
    if not liquid_class:
        return jsonify({'error': 'Liquid class not found'}), 404
    
    # Convert to dict for JSON serialization
    liquid_class_dict = {
        'name': liquid_class.name,
        'description': liquid_class.description,
        'p_speed': {
            'label': liquid_class.p_speed.label,
            'value': liquid_class.p_speed.value,
            'venus_settings': liquid_class.p_speed.venus_settings
        },
        'd_speed': {
            'label': liquid_class.d_speed.label,
            'value': liquid_class.d_speed.value,
            'venus_settings': liquid_class.d_speed.venus_settings
        },
        'air_gap': {
            'label': liquid_class.air_gap.label,
            'value': liquid_class.air_gap.value,
            'venus_settings': liquid_class.air_gap.venus_settings
        },
        'blowout': {
            'label': liquid_class.blowout.label,
            'value': liquid_class.blowout.value,
            'venus_settings': liquid_class.blowout.venus_settings
        },
        'z_offset': {
            'label': liquid_class.z_offset.label,
            'value': liquid_class.z_offset.value,
            'venus_settings': liquid_class.z_offset.venus_settings
        },
        'tips': {
            'label': liquid_class.tips.label,
            'value': liquid_class.tips.value,
            'venus_settings': liquid_class.tips.venus_settings
        }
    }
    
    return jsonify(liquid_class_dict)


@app.route('/api/liquid-classes')
def get_liquid_classes():
    """API endpoint to get all liquid class names."""
    return jsonify(db.get_all_liquid_class_names())


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3100) 