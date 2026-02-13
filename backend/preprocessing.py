import os
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from backend.config import WINDOW_SIZE

def load_data(file_path):
    """Load .npy files."""
    data = np.load(file_path)
    return data

def preprocess_data(data):
    """Normalize data using MinMaxScaler."""
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)
    return scaled_data, scaler

def create_sequences(data, window_size=WINDOW_SIZE):
    """Generate sliding window sequences for LSTM."""
    sequences = []
    for i in range(len(data) - window_size):
        sequences.append(data[i:i + window_size])
    return np.array(sequences)

def get_train_test_split(channel_id, train_dir, test_dir):
    """Load and preprocess data for a specific channel."""
    train_file = os.path.join(train_dir, f"{channel_id}.npy")
    test_file = os.path.join(test_dir, f"{channel_id}.npy")
    
    train_data = load_data(train_file)
    test_data = load_data(test_file)
    
    # Handle missing values if any (though .npy usually clean)
    train_data = pd.DataFrame(train_data).fillna(method='ffill').values
    test_data = pd.DataFrame(test_data).fillna(method='ffill').values
    
    # Preprocess
    train_scaled, scaler = preprocess_data(train_data)
    test_scaled = scaler.transform(test_data)
    
    # Create sequences
    X_train = create_sequences(train_scaled)
    X_test = create_sequences(test_scaled)
    
    return X_train, X_test, scaler
