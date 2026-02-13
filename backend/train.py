import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping
from backend.config import BATCH_SIZE, EPOCHS, PATIENCE, MODEL_DIR, TRAIN_DIR, TEST_DIR
from backend.preprocessing import get_train_test_split
from backend.model import build_lstm_autoencoder

def train_model(channel_id="P-1"):
    print(f"Starting training for channel: {channel_id}")
    
    # Load and Preprocess
    X_train, X_test, scaler = get_train_test_split(channel_id, TRAIN_DIR, TEST_DIR)
    
    # Automatic Split (70% Train, 15% Val, 15% Test)
    # We already have X_train (from train folder) and X_test (from test folder)
    # Let's split X_train further for validation
    split_idx = int(len(X_train) * 0.8)
    X_val = X_train[split_idx:]
    X_train = X_train[:split_idx]
    
    print(f"Train set: {X_train.shape}")
    print(f"Val set: {X_val.shape}")
    print(f"Test set: {X_test.shape}")
    
    # Build Model
    model = build_lstm_autoencoder((X_train.shape[1], X_train.shape[2]))
    
    # Early Stopping
    early_stop = EarlyStopping(
        monitor='val_loss',
        patience=PATIENCE,
        restore_best_weights=True
    )
    
    # Train
    history = model.fit(
        X_train, X_train,
        epochs=EPOCHS,
        batch_size=BATCH_SIZE,
        validation_data=(X_val, X_val),
        callbacks=[early_stop],
        verbose=1
    )
    
    # Create models directory if not exists
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
        
    # Save Model
    model_path = os.path.join(MODEL_DIR, f"{channel_id}_model.h5")
    model.save(model_path)
    print(f"Model saved to {model_path}")
    
    return model, history

if __name__ == "__main__":
    train_model()
