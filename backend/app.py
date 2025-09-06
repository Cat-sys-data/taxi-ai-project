from flask import Flask, request, jsonify
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


def extract_locations(text):
    match = re.search(r'from (.*?) to (.*)', text, re.IGNORECASE)
    if match:
        return match.group(1).strip(), match.group(2).strip()
    return None, None

@app.route('/api/parse', methods=['POST'])
def parse():
    data = request.get_json()
    user_input = data.get('text', '')

    origin, destination = extract_locations(user_input)

    if not origin or not destination:
        return jsonify({'error': 'Could not parse locations'}), 400

    rides = [
        {'service': 'Ride', 'price': 350, 'eta': '12 min'},
        {'service': 'Feres', 'price': 300, 'eta': '15 min'},
        {'service': 'ZayRide', 'price': 280, 'eta': '20 min'}
    ]

    return jsonify({
        'origin': origin,
        'destination': destination,
        'rides': rides
    })

if __name__ == '__main__':
    app.run(debug=True)
