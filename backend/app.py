from flask import Flask, jsonify
from flask_cors import CORS
import requests
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://glovosign.vercel.app/"}})

model_filename = 'decision_tree_model.joblib'
try:
    clf = joblib.load(model_filename)
except FileNotFoundError:
    print(f"Model file {model_filename} not found.")
    clf = None

nodemcu_url = "http://192.168.100.12:100/"  # Replace with the actual URL

def get_sensor_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

@app.route('/conversations/<conversation_id>', methods=['GET'])
def get_prediction(conversation_id):
    if clf is None:
        return jsonify({'error': 'Model not loaded.'}), 500
    
    sensor_data = get_sensor_data(nodemcu_url)
    if sensor_data:
        try:
            features = np.array([[
                sensor_data.get('ADS1115_0x48_A0', 0),
                sensor_data.get('ADS1115_0x48_A1', 0),
                sensor_data.get('ADS1115_0x48_A3', 0),
                sensor_data.get('ADS1115_0x49_A0', 0),
                sensor_data.get('ADS1115_0x49_A1', 0)
            ]])
            prediction = clf.predict(features)
            predicted_label = prediction[0]
            return jsonify({'prediction': predicted_label})
        except KeyError as e:
            print(f"Key error: {e}")
            return jsonify({'error': 'Invalid sensor data format.'}), 500
    else:
        return jsonify({'error': 'Failed to retrieve sensor data.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)







