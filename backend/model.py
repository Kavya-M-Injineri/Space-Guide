import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, RepeatVector, TimeDistributed, Dense
from backend.config import WINDOW_SIZE, LATENT_DIM

def build_lstm_autoencoder(input_shape):
    """
    Build LSTM Autoencoder architecture.
    input_shape: (window_size, num_features)
    """
    model = Sequential([
        # Encoder
        LSTM(64, activation='relu', input_shape=input_shape, return_sequences=True),
        LSTM(LATENT_DIM, activation='relu', return_sequences=False),
        
        # Bridge
        RepeatVector(WINDOW_SIZE),
        
        # Decoder
        LSTM(LATENT_DIM, activation='relu', return_sequences=True),
        LSTM(64, activation='relu', return_sequences=True),
        
        # Output Layer
        TimeDistributed(Dense(input_shape[1]))
    ])
    
    model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_absolute_error'])
    return model
