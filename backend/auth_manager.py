import jwt
import datetime
from functools import wraps
from flask import request, jsonify

SECRET_KEY = "SPACEGUARD_SECRET_ALPHA_9" # In prod, use environment variable

def create_token(user_id, role):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id,
        'role': role
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = data['sub']
            user_role = data['role']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_user, user_role, *args, **kwargs)
    
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(current_user, user_role, *args, **kwargs):
        if user_role != 'ADMIN':
            return jsonify({'message': 'Administrator access required!'}), 403
        return f(current_user, user_role, *args, **kwargs)
    return decorated
