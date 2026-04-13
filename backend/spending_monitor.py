from datetime import datetime, date
from typing import Dict, List, Optional

class SpendingMonitor:
    """
    Monitor daily spending limits for users
    """
    
    def __init__(self):
        # In production, this would be in MongoDB
        # For now, using in-memory storage
        self.daily_spending: Dict[str, Dict] = {}
        self.user_limits: Dict[str, float] = {}
    
    def set_daily_limit(self, user_id: str, limit: float) -> Dict:
        """Set or update user's daily spending limit"""
        self.user_limits[user_id] = limit
        return {
            "user_id": user_id,
            "daily_limit": limit,
            "updated_at": datetime.utcnow().isoformat()
        }
    
    def get_daily_limit(self, user_id: str) -> float:
        """Get user's daily spending limit (default: 10000)"""
        return self.user_limits.get(user_id, 10000.0)
    
    def add_transaction(self, user_id: str, amount: float) -> Dict:
        """Record a transaction for daily spending tracking"""
        today = date.today().isoformat()
        key = f"{user_id}_{today}"
        
        if key not in self.daily_spending:
            self.daily_spending[key] = {
                "user_id": user_id,
                "date": today,
                "total_spent": 0.0,
                "transaction_count": 0,
                "transactions": []
            }
        
        self.daily_spending[key]["total_spent"] += amount
        self.daily_spending[key]["transaction_count"] += 1
        self.daily_spending[key]["transactions"].append({
            "amount": amount,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        return self.daily_spending[key]
    
    def get_daily_spending(self, user_id: str, check_date: Optional[str] = None) -> Dict:
        """Get user's spending for a specific day"""
        if check_date is None:
            check_date = date.today().isoformat()
        
        key = f"{user_id}_{check_date}"
        
        if key not in self.daily_spending:
            return {
                "user_id": user_id,
                "date": check_date,
                "total_spent": 0.0,
                "transaction_count": 0,
                "daily_limit": self.get_daily_limit(user_id),
                "limit_exceeded": False,
                "exceeded_amount": 0.0,
                "remaining_limit": self.get_daily_limit(user_id)
            }
        
        spending = self.daily_spending[key]
        daily_limit = self.get_daily_limit(user_id)
        total_spent = spending["total_spent"]
        
        return {
            "user_id": user_id,
            "date": check_date,
            "total_spent": total_spent,
            "transaction_count": spending["transaction_count"],
            "daily_limit": daily_limit,
            "limit_exceeded": total_spent > daily_limit,
            "exceeded_amount": max(0, total_spent - daily_limit),
            "remaining_limit": max(0, daily_limit - total_spent),
            "percent_used": (total_spent / daily_limit * 100) if daily_limit > 0 else 0
        }
    
    def check_limit_exceeded(self, user_id: str) -> Dict:
        """Check if user has exceeded daily spending limit"""
        today_spending = self.get_daily_spending(user_id)
        
        return {
            "user_id": user_id,
            "limit_exceeded": today_spending["limit_exceeded"],
            "current_spent": today_spending["total_spent"],
            "daily_limit": today_spending["daily_limit"],
            "exceeded_amount": today_spending["exceeded_amount"],
            "message": f"Daily spending limit {'EXCEEDED' if today_spending['limit_exceeded'] else 'not exceeded'}" if today_spending["limit_exceeded"] else f"You have ${today_spending['remaining_limit']:.2f} remaining today"
        }
    
    def get_spending_summary(self, user_id: str, days: int = 7) -> Dict:
        """Get spending summary for last N days"""
        today = date.today()
        summary = {
            "user_id": user_id,
            "daily_limit": self.get_daily_limit(user_id),
            "days_analyzed": days,
            "total_spent_period": 0.0,
            "avg_daily_spend": 0.0,
            "days_exceeded_limit": 0,
            "daily_breakdown": []
        }
        
        total_spent = 0.0
        exceeded_days = 0
        
        for i in range(days):
            check_date = (today - __import__('datetime').timedelta(days=i)).isoformat()
            daily = self.get_daily_spending(user_id, check_date)
            
            summary["daily_breakdown"].append({
                "date": check_date,
                "spent": daily["total_spent"],
                "limit_exceeded": daily["limit_exceeded"]
            })
            
            total_spent += daily["total_spent"]
            if daily["limit_exceeded"]:
                exceeded_days += 1
        
        summary["total_spent_period"] = total_spent
        summary["avg_daily_spend"] = total_spent / days if days > 0 else 0.0
        summary["days_exceeded_limit"] = exceeded_days
        
        return summary

# Initialize spending monitor
spending_monitor = SpendingMonitor()
