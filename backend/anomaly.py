import numpy as np
import tensorflow as tf
from backend.config import THRESHOLD_K

def calculate_threshold(train_loss, k=THRESHOLD_K):
    """
    Calculate base threshold: mean(loss) + k * std(loss)
    """
    mean_loss = np.mean(train_loss)
    std_loss = np.std(train_loss)
    return mean_loss + (k * std_loss)

def calculate_pot_threshold(errors, q=0.98):
    """
    Simplified Peak-Over-Threshold logic.
    Calculates the limit as the q-th percentile of errors.
    """
    return np.percentile(errors, q * 100)

def classify_severity(error, threshold):
    """
    Classify anomaly based on deviation ratio.
    """
    ratio = error / threshold
    if ratio > 5.0: return "CRITICAL"
    if ratio > 2.0: return "WARNING"
    return "INFO"

def detect_anomalies(model, data, threshold):
    """
    Predict anomalies based on reconstruction error.
    """
    reconstructions = model.predict(data)
    reconstruction_errors = np.mean(np.square(data - reconstructions), axis=(1, 2))
    
    is_anomaly = reconstruction_errors > threshold
    
    severities = [classify_severity(e, threshold) if a else "SAFE" 
                  for e, a in zip(reconstruction_errors, is_anomaly)]
    
    return reconstruction_errors, is_anomaly, severities
