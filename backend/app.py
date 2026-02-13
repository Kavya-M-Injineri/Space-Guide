import os
import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from backend.config import MODEL_DIR, WINDOW_SIZE, JWT_SECRET
from backend.anomaly import detect_anomalies
from backend.auth_manager import token_required, admin_required, create_token
from backend.utils.logger_config import logger

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
app.config['SECRET_KEY'] = JWT_SECRET
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

@app.before_request
def log_request_info():
    logger.info(f"REQ: {request.method} {request.path} | FROM: {request.remote_addr}")

from backend.xai_engine import get_feature_contributions

# Load default model (P-1 for example)
DEFAULT_CHANNEL = "P-1"
model_path = os.path.join(MODEL_DIR, f"{DEFAULT_CHANNEL}_model.h5")

model = None
threshold = 0.005 

if os.path.exists(model_path):
    try:
        model = tf.keras.models.load_model(model_path, compile=False)
        logger.info(f"Loaded mission model: {model_path}")
    except Exception as e:
        logger.error(f"Failed to load orbital model: {str(e)}")

@app.route('/login', methods=['POST'])
def login():
    auth = request.json
    if not auth or not auth.get('username') or not auth.get('password'):
        return jsonify({'message': 'Could not verify'}), 401
    
    username = auth.get('username', '').lower()
    password = auth.get('password')
    
    if username == 'admin' and password == 'alpha9':
        token = create_token('admin_1', 'ADMIN')
        logger.info("Admin login successful")
        return jsonify({'token': token, 'role': 'ADMIN'})
    
    if username == 'operator' and password == 'alpha9':
        token = create_token('op_1', 'OPERATOR')
        logger.info("Operator login successful")
        return jsonify({'token': token, 'role': 'OPERATOR'})

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/predict', methods=['POST'])
@token_required
def predict(current_user, user_role):
    if model is None:
        logger.warning(f"Predict attempt by {current_user} failed: Model not loaded")
        return jsonify({"error": "Model not loaded"}), 500
        
    data = request.json.get('data') 
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    input_data = np.array(data).reshape(1, WINDOW_SIZE, -1)
    
    from backend.anomaly import detect_anomalies
    reconstruction_error, is_anomaly, severities = detect_anomalies(model, input_data, threshold)
    
    # Get reconstructions for XAI
    reconstructions = model.predict(input_data)
    explanations = get_feature_contributions(input_data[0], reconstructions[0])
    
    response = {
        "reconstruction_error": float(reconstruction_error[0]),
        "is_anomaly": bool(is_anomaly[0]),
        "severity": severities[0],
        "anomaly_score": float(reconstruction_error[0]) * 100,
        "contributions": explanations
    }
    
    if bool(is_anomaly[0]):
        logger.warning(f"ANOMALY [{response['severity']}]: Score {response['anomaly_score']:.2f} by user {current_user}")
        
    return jsonify(response)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ready", "model_loaded": model is not None})

@app.route('/metrics', methods=['GET'])
@token_required
def metrics(current_user, user_role):
    return jsonify({
        "threshold": threshold,
        "window_size": WINDOW_SIZE,
        "channel": DEFAULT_CHANNEL,
        "authorized_user": current_user
    })

if __name__ == '__main__':
    logger.info("Starting SpaceGuard Enterprise API...")
    # Port 7860 is the default for Hugging Face Spaces
    port = int(os.environ.get("PORT", 7860))
    app.run(host='0.0.0.0', port=port, debug=False)
