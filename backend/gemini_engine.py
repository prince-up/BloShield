import os
import json
from datetime import datetime, timedelta
from typing import List, Dict
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "dummy-key-for-testing")
if GEMINI_API_KEY != "dummy-key-for-testing":
    genai.configure(api_key=GEMINI_API_KEY)

class GeminiInsightEngine:
    def __init__(self):
        self.model = "gemini-pro" if GEMINI_API_KEY != "dummy-key-for-testing" else None
    
    async def generate_insights(self, transactions: List[Dict], user_profile: Dict) -> List[Dict]:
        """
        Generate AI insights from transaction history and user profile
        """
        if not self.model:
            return self._generate_mock_insights(transactions, user_profile)
        
        try:
            # Prepare transaction summary
            summary = {
                "total_transactions": len(transactions),
                "total_amount": sum(t.get("amount", 0) for t in transactions),
                "anomalies": len([t for t in transactions if t.get("is_anomaly")]),
                "avg_amount": sum(t.get("amount", 0) for t in transactions) / len(transactions) if transactions else 0,
                "failed_transactions": len([t for t in transactions if t.get("status") == "failure"]),
            }
            
            prompt = f"""Analyze this financial transaction data and provide 2-3 concise, actionable insights:

Transaction Summary:
- Total Transactions: {summary['total_transactions']}
- Total Amount: ${summary['total_amount']:.2f}
- Anomalies Detected: {summary['anomalies']}
- Average Transaction: ${summary['avg_amount']:.2f}
- Failed Attempts: {summary['failed_transactions']}
- Daily Spending Limit: ${user_profile.get('daily_spending_limit', 10000)}

Recent Transactions: {json.dumps(transactions[-5:], indent=2, default=str)}

Provide insights in JSON format with these fields for each insight:
{{"insight": "text", "type": "ANOMALY|PATTERN|WARNING|RECOMMENDATION", "confidence": 0.0-1.0}}

Be specific, concise, and actionable."""

            response = genai.generate_text(prompt=prompt)
            
            # Parse response
            insights = []
            try:
                # Try to extract JSON from response
                text = response.result
                json_start = text.find("[")
                json_end = text.rfind("]") + 1
                if json_start != -1 and json_end != 0:
                    insights_json = json.loads(text[json_start:json_end])
                    return insights_json
            except Exception as e:
                print(f"Failed to parse Gemini response: {e}")
                return self._generate_mock_insights(transactions, user_profile)
        
        except Exception as e:
            print(f"Gemini API error: {e}")
            return self._generate_mock_insights(transactions, user_profile)
    
    def _generate_mock_insights(self, transactions: List[Dict], user_profile: Dict) -> List[Dict]:
        """
        Generate mock insights for testing/demo purposes
        """
        insights = []
        
        # Insight 1: Transaction frequency
        if len(transactions) > 10:
            insights.append({
                "insight": "High transaction frequency detected. You made more than 10 transactions today.",
                "type": "PATTERN",
                "confidence": 0.85
            })
        
        # Insight 2: Spending analysis
        total_spent = sum(t.get("amount", 0) for t in transactions)
        if total_spent > user_profile.get("daily_spending_limit", 10000) * 0.8:
            insights.append({
                "insight": f"Approaching daily limit. You've spent ${total_spent:.2f} of ${user_profile.get('daily_spending_limit', 10000)} limit.",
                "type": "WARNING",
                "confidence": 0.9
            })
        
        # Insight 3: Anomalies
        anomaly_count = len([t for t in transactions if t.get("is_anomaly")])
        if anomaly_count > 0:
            insights.append({
                "insight": f"{anomaly_count} suspicious transaction(s) detected. Review high-risk transactions immediately.",
                "type": "ANOMALY",
                "confidence": 0.92
            })
        
        # Insight 4: Success rate
        failed = len([t for t in transactions if t.get("status") == "failure"])
        if failed > 2:
            insights.append({
                "insight": f"Multiple failed transactions ({failed}) detected. This might indicate authentication issues or insufficient funds.",
                "type": "WARNING",
                "confidence": 0.88
            })
        
        # Insight 5: Recommendation
        if len(transactions) > 0 and anomaly_count == 0:
            insights.append({
                "insight": "All transactions appear normal. Your spending is consistent with historical patterns.",
                "type": "RECOMMENDATION",
                "confidence": 0.87
            })
        
        return insights
