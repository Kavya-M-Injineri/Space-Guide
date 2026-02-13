import numpy as np

def get_feature_contributions(original, reconstructed, feature_names=None):
    """
    Calculate the contribution of each feature to the reconstruction error.
    original: (window_size, num_features)
    reconstructed: (window_size, num_features)
    """
    # Mean squared error per feature over the window
    mse_per_feature = np.mean(np.square(original - reconstructed), axis=0)
    
    # Normalize to get percentages
    total_error = np.sum(mse_per_feature)
    if total_error == 0:
        contributions = np.zeros_like(mse_per_feature)
    else:
        contributions = (mse_per_feature / total_error) * 100
        
    if feature_names:
        return {name: float(cont) for name, cont in zip(feature_names, contributions)}
    
    return contributions.tolist()

def generate_error_heatmap(original, reconstructed):
    """
    Generate a simple heatmap matrix of errors.
    """
    return np.square(original - reconstructed).tolist()
