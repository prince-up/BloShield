import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import pickle
import os

class MLEngine:
    def __init__(self):
        self.model_path = "backend/anomaly_model.pkl"
        self.model = self._load_model()

    def _load_model(self):
        if os.path.exists(self.model_path):
            with open(self.model_path, "rb") as f:
                return pickle.load(f)
        return IsolationForest(contamination=0.1, random_state=42)

    def train(self, data: pd.DataFrame):
        # Data should have columns: [amount, response_time_ms, hour_of_day]
        self.model.fit(data)
        with open(self.model_path, "wb") as f:
            pickle.dump(self.model, f)

    def predict(self, amount, response_time, hour_of_day):
        # Simple prediction
        features = np.array([[amount, response_time, hour_of_day]])
        try:
            # -1 for anomaly, 1 for normal
            prediction = self.model.predict(features)
            score = self.model.decision_function(features)
            # Normalize score to 0-1 (higher = more anomalous)
            # decision_function returns negative values for anomalies
            risk_score = float(1 - (score[0] + 0.5)) # Rough normalization
            risk_score = max(0, min(1, risk_score))
            
            return prediction[0] == -1, risk_score
        except:
            return False, 0.0

ml_engine = MLEngine()

def get_risk_level(score):
    if score < 0.3: return "LOW"
    if score < 0.7: return "MEDIUM"
    return "HIGH"
