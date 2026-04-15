from datetime import datetime, timedelta
from typing import List, Dict, Optional
import random
import time

class RBIFraudAlerts:
    """
    Reserve Bank of India Fraud Alert Database with Live Intelligence
    Enhanced with trending scams, risk matching, and real-time updates
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
            "active": True,
            "trend_score": 85,
            "weekly_incidents": 1247,
            "affected_users": 8920
        },
        {
            "alert_id": "RBI_2024_002",
            "title": "UPI Payment Scam",
            "description": "Fraudsters are using fake UPI payment requests to trick users into transferring money.",
            "fraud_type": "UPI Fraud",
            "risk_level": "HIGH",
            "keywords": ["upi", "payment", "gpay", "phonepay", "paytm"],
            "issued_date": datetime(2024, 2, 10),
            "active": True,
            "trend_score": 92,
            "weekly_incidents": 2156,
            "affected_users": 15430
        },
        {
            "alert_id": "RBI_2024_003",
            "title": "Card Skimming at ATMs",
            "description": "ATM card skimmers detected at multiple locations. Be cautious when using ATMs.",
            "fraud_type": "Card Fraud",
            "risk_level": "MEDIUM",
            "keywords": ["atm", "card", "withdraw", "debit"],
            "issued_date": datetime(2024, 1, 20),
            "active": True,
            "trend_score": 67,
            "weekly_incidents": 834,
            "affected_users": 6230
        },
        {
            "alert_id": "RBI_2024_004",
            "title": "Investment Scam - Cryptocurrency",
            "description": "Fake cryptocurrency investment schemes promising unrealistic returns.",
            "fraud_type": "Investment Scam",
            "risk_level": "HIGH",
            "keywords": ["crypto", "bitcoin", "investment", "nft", "blockchain"],
            "issued_date": datetime(2024, 2, 5),
            "active": True,
            "trend_score": 78,
            "weekly_incidents": 1023,
            "affected_users": 7890
        },
        {
            "alert_id": "RBI_2024_005",
            "title": "Prize/Lottery Scam",
            "description": "Fraudsters claiming user has won a lottery or prize and asking for payment to claim it.",
            "fraud_type": "Lottery Scam",
            "risk_level": "MEDIUM",
            "keywords": ["winner", "prize", "lottery", "congratulations", "claim"],
            "issued_date": datetime(2024, 1, 25),
            "active": True,
            "trend_score": 45,
            "weekly_incidents": 567,
            "affected_users": 3450
        },
        {
            "alert_id": "RBI_2024_006",
            "title": "Job Scam - Fake Employment",
            "description": "Fake job offers requiring payment for processing fees or background checks.",
            "fraud_type": "Job Scam",
            "risk_level": "MEDIUM",
            "keywords": ["job", "employment", "hiring", "processing fee", "background check"],
            "issued_date": datetime(2024, 2, 15),
            "active": True,
            "trend_score": 73,
            "weekly_incidents": 945,
            "affected_users": 6780
        },
        {
            "alert_id": "RBI_2024_007",
            "title": "Tech Support Scam",
            "description": "Fraudsters posing as tech support demanding remote access or payment for fake issues.",
            "fraud_type": "Tech Support Scam",
            "risk_level": "HIGH",
            "keywords": ["tech support", "microsoft", "windows", "virus", "remote access"],
            "issued_date": datetime(2024, 2, 20),
            "active": True,
            "trend_score": 88,
            "weekly_incidents": 1345,
            "affected_users": 9870
        }
    ]

    def __init__(self):
        self.alerts = self.SAMPLE_ALERTS
        self.live_feed = []
        self.last_update = time.time()

    def get_active_alerts(self) -> List[Dict]:
        """Get all active RBI fraud alerts with live data"""
        current_time = time.time()
        if current_time - self.last_update > 300:  # Update every 5 minutes
            self._update_live_data()
            self.last_update = current_time

        return [self._enhance_alert(a) for a in self.alerts if a["active"]]

    def _update_live_data(self):
        """Simulate live updates to fraud data"""
        for alert in self.alerts:
            # Simulate trending changes
            alert["trend_score"] = min(100, max(0, alert["trend_score"] + random.randint(-5, 5)))
            alert["weekly_incidents"] += random.randint(-50, 100)
            alert["affected_users"] += random.randint(-20, 50)

            # Ensure minimum values
            alert["weekly_incidents"] = max(0, alert["weekly_incidents"])
            alert["affected_users"] = max(0, alert["affected_users"])

    def _enhance_alert(self, alert: Dict) -> Dict:
        """Add live intelligence data to alert"""
        enhanced = alert.copy()
        enhanced["last_updated"] = datetime.now().isoformat()
        enhanced["trend_direction"] = "up" if random.random() > 0.5 else "down"
        enhanced["severity_score"] = self._calculate_severity(alert)
        return enhanced

    def _calculate_severity(self, alert: Dict) -> float:
        """Calculate severity score based on multiple factors"""
        base_score = 50

        # Risk level multiplier
        risk_multiplier = {"LOW": 0.7, "MEDIUM": 1.0, "HIGH": 1.3}
        base_score *= risk_multiplier.get(alert["risk_level"], 1.0)

        # Trend score influence
        trend_influence = (alert["trend_score"] - 50) * 0.5
        base_score += trend_influence

        # Incident volume influence
        volume_score = min(20, alert["weekly_incidents"] / 100)
        base_score += volume_score

        return round(max(0, min(100, base_score)), 1)

    def get_trending_scams(self, limit: int = 5) -> List[Dict]:
        """Get currently trending scams based on trend scores"""
        active_alerts = self.get_active_alerts()
        trending = sorted(active_alerts, key=lambda x: x["trend_score"], reverse=True)
        return trending[:limit]

    def check_transaction_against_alerts(self, description: str, amount: float) -> Optional[Dict]:
        """
        Enhanced transaction checking with risk match percentage
        """
        description_lower = description.lower() if description else ""
        best_match = None
        highest_score = 0

        for alert in self.get_active_alerts():
            match_score = self._calculate_match_score(description_lower, amount, alert)

            if match_score > highest_score:
                highest_score = match_score
                best_match = {
                    "matched_alert_id": alert["alert_id"],
                    "alert_title": alert["title"],
                    "alert_description": alert["description"],
                    "fraud_type": alert["fraud_type"],
                    "risk_level": alert["risk_level"],
                    "match_percentage": round(highest_score, 1),
                    "warning_message": f"⚠️ {round(highest_score, 1)}% match with RBI Alert: {alert['title']}. {alert['description']}",
                    "severity_score": alert["severity_score"],
                    "recommendation": self._get_recommendation(alert, highest_score)
                }

        return best_match if highest_score > 30 else None  # Only return if match > 30%

    def _calculate_match_score(self, description: str, amount: float, alert: Dict) -> float:
        """Calculate how well a transaction matches a fraud alert"""
        score = 0

        # Keyword matching (40% weight)
        keyword_matches = 0
        for keyword in alert["keywords"]:
            if keyword.lower() in description:
                keyword_matches += 1

        if len(alert["keywords"]) > 0:
            keyword_score = (keyword_matches / len(alert["keywords"])) * 40
            score += keyword_score

        # Amount-based scoring (30% weight)
        if alert["fraud_type"] == "UPI Fraud" and amount > 5000:
            score += 30
        elif alert["fraud_type"] == "Investment Scam" and amount > 10000:
            score += 25
        elif alert["fraud_type"] == "Lottery Scam" and amount > 1000:
            score += 20

        # Time-based scoring (20% weight) - certain scams more common at certain times
        current_hour = datetime.now().hour
        if alert["fraud_type"] == "Tech Support Scam" and (9 <= current_hour <= 17):
            score += 20  # Business hours
        elif alert["fraud_type"] in ["UPI Fraud", "Loan Scam"] and (18 <= current_hour <= 22):
            score += 15  # Evening hours

        # Alert severity influence (10% weight)
        score += (alert["severity_score"] / 10)

        return min(100, score)

    def _get_recommendation(self, alert: Dict, match_score: float) -> str:
        """Get specific recommendation based on alert type and match score"""
        if match_score > 80:
            return "🚨 CRITICAL: Immediately cancel this transaction and report to authorities"
        elif match_score > 60:
            return "⚠️ HIGH RISK: Verify recipient details and consider alternative payment method"
        elif match_score > 40:
            return "🟡 MEDIUM RISK: Double-check transaction details and recipient authenticity"
        else:
            return "ℹ️ LOW RISK: Monitor transaction closely"

    def get_live_fraud_feed(self, limit: int = 10) -> List[Dict]:
        """Get live fraud intelligence feed"""
        # Simulate live feed updates
        feed_items = [
            {
                "id": f"feed_{i}",
                "type": "alert_update",
                "title": f"New {random.choice(['UPI', 'Loan', 'Investment', 'Tech Support'])} scam variant detected",
                "description": f"Increased activity in {random.choice(['Delhi', 'Mumbai', 'Bangalore', 'Chennai'])} region",
                "timestamp": (datetime.now() - timedelta(minutes=random.randint(1, 60))).isoformat(),
                "severity": random.choice(["LOW", "MEDIUM", "HIGH"]),
                "affected_count": random.randint(10, 500)
            } for i in range(limit)
        ]

        return sorted(feed_items, key=lambda x: x["timestamp"], reverse=True)

    def get_alert_by_id(self, alert_id: str) -> Optional[Dict]:
        """Get a specific alert by ID"""
        for alert in self.alerts:
            if alert["alert_id"] == alert_id:
                return self._enhance_alert(alert)
        return None

    def add_custom_alert(self, alert_data: Dict) -> Dict:
    
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
