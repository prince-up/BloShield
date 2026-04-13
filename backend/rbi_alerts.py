from datetime import datetime
from typing import List, Dict, Optional

class RBIFraudAlerts:
    """
    Reserve Bank of India Fraud Alert Database
    This would be kept in sync with real RBI warnings in production
    """
    
    SAMPLE_ALERTS = [
        {
            "alert_id": "RBI_2024_001",
            "title": "Fake Loan App Scam",
            "description": "Scammers are distributing fake loan application apps that steal personal and financial information.",
            "fraud_type": "Loan Scam",
            "risk_level": "HIGH",
            "keywords": ["loan", "quickloan", "instantloan", "fastcash", "easy loan"],
            "issued_date": datetime(2024, 1, 15),
            "active": True
        },
        {
            "alert_id": "RBI_2024_002",
            "title": "UPI Payment Scam",
            "description": "Fraudsters are using fake UPI payment requests to trick users into transferring money.",
            "fraud_type": "UPI Fraud",
            "risk_level": "HIGH",
            "keywords": ["upi", "payment", "gpay", "phonepay", "paytm"],
            "issued_date": datetime(2024, 2, 10),
            "active": True
        },
        {
            "alert_id": "RBI_2024_003",
            "title": "Card Skimming at ATMs",
            "description": "ATM card skimmers detected at multiple locations. Be cautious when using ATMs.",
            "fraud_type": "Card Fraud",
            "risk_level": "MEDIUM",
            "keywords": ["atm", "card", "withdraw", "debit"],
            "issued_date": datetime(2024, 1, 20),
            "active": True
        },
        {
            "alert_id": "RBI_2024_004",
            "title": "Investment Scam - Cryptocurrency",
            "description": "Fake cryptocurrency investment schemes promising unrealistic returns.",
            "fraud_type": "Investment Scam",
            "risk_level": "HIGH",
            "keywords": ["crypto", "bitcoin", "investment", "nft", "blockchain"],
            "issued_date": datetime(2024, 2, 5),
            "active": True
        },
        {
            "alert_id": "RBI_2024_005",
            "title": "Prize/Lottery Scam",
            "description": "Fraudsters claiming user has won a lottery or prize and asking for payment to claim it.",
            "fraud_type": "Lottery Scam",
            "risk_level": "MEDIUM",
            "keywords": ["winner", "prize", "lottery", "congratulations", "claim"],
            "issued_date": datetime(2024, 1, 25),
            "active": True
        }
    ]
    
    def __init__(self):
        self.alerts = self.SAMPLE_ALERTS
    
    def get_active_alerts(self) -> List[Dict]:
        """Get all active RBI fraud alerts"""
        return [a for a in self.alerts if a["active"]]
    
    def check_transaction_against_alerts(self, description: str, amount: float) -> Optional[Dict]:
        """
        Check if a transaction description matches any RBI fraud alert
        Returns the matching alert if found, None otherwise
        """
        description_lower = description.lower() if description else ""
        
        for alert in self.get_active_alerts():
            for keyword in alert["keywords"]:
                if keyword.lower() in description_lower:
                    return {
                        "matched_alert_id": alert["alert_id"],
                        "alert_title": alert["title"],
                        "alert_description": alert["description"],
                        "fraud_type": alert["fraud_type"],
                        "risk_level": alert["risk_level"],
                        "warning_message": f"⚠️ This transaction matches RBI Alert: {alert['title']}. {alert['description']}"
                    }
        
        return None
    
    def get_alert_by_id(self, alert_id: str) -> Optional[Dict]:
        """Get a specific alert by ID"""
        for alert in self.alerts:
            if alert["alert_id"] == alert_id:
                return alert
        return None
    
    def add_custom_alert(self, alert_data: Dict) -> Dict:
        """Add a custom RBI alert (for testing/updates)"""
        new_alert = {
            "alert_id": f"CUSTOM_{len(self.alerts) + 1}",
            "title": alert_data.get("title"),
            "description": alert_data.get("description"),
            "fraud_type": alert_data.get("fraud_type"),
            "risk_level": alert_data.get("risk_level", "MEDIUM"),
            "keywords": alert_data.get("keywords", []),
            "issued_date": datetime.utcnow(),
            "active": True
        }
        self.alerts.append(new_alert)
        return new_alert

# Initialize RBI alerts
rbi_alerts = RBIFraudAlerts()
