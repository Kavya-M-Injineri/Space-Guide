import os

# Project Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data", "data")
TRAIN_DIR = os.path.join(DATA_DIR, "train")
TEST_DIR = os.path.join(DATA_DIR, "test")
MODEL_DIR = os.path.join(BASE_DIR, "backend", "models")

# Model Hyperparameters
WINDOW_SIZE = 50
BATCH_SIZE = 64
EPOCHS = 50
LATENT_DIM = 16
LEARNING_RATE = 0.001
PATIENCE = 10

# Anomaly Detection Settings
THRESHOLD_K = 3  # multiplier for std dev

# Enterprise Core Settings
API_DEBUG = os.getenv("API_DEBUG", "True") == "True"
JWT_SECRET = os.getenv("JWT_SECRET", "SPACEGUARD_SECRET_ALPHA_9")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
RBAC_ENABLED = True
