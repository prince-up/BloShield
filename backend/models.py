from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class TransactionBase(BaseModel):
    user_id: str
    amount: float
    description: Optional[str] = None

class SendMoneyRequest(TransactionBase):
    recipient_id: str

class PayBillRequest(TransactionBase):
    bill_id: str

class TransactionLog(BaseModel):
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_id: str
    endpoint: str
    amount: float
    status: str
    response_time_ms: float
    risk_score: float = 0.0
    is_anomaly: bool = False

class AnomalyResult(BaseModel):
    log_id: str
    reason: str
    severity: str # LOW, MEDIUM, HIGH
    detected_at: datetime = Field(default_factory=datetime.utcnow)

class UserProfile(BaseModel):
    user_id: str
    daily_spending_limit: float = 10000.0  # Default limit
    email: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class DailySpending(BaseModel):
    user_id: str
    date: str  # YYYY-MM-DD format
    total_spent: float = 0.0
    transaction_count: int = 0
    limit_exceeded: bool = False
    exceeded_amount: float = 0.0

class RBIFraudAlert(BaseModel):
    alert_id: str
    title: str
    description: str
    fraud_type: str  # UPI Fraud, Loan Scam, Card Fraud, etc.
    risk_level: str  # LOW, MEDIUM, HIGH
    keywords: List[str]  # Keywords to match with transactions
    issued_date: datetime
    active: bool = True
    
class AIInsight(BaseModel):
    user_id: str
    insight_text: str
    insight_type: str  # ANOMALY, PATTERN, WARNING, RECOMMENDATION
    confidence_score: float  # 0.0 to 1.0
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    related_transactions: List[str] = []  # Transaction IDs

