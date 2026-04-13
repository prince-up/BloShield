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
