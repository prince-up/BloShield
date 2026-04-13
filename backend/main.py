from fastapi import FastAPI, Request, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import time
from datetime import datetime
import random
import json
import asyncio
from models import SendMoneyRequest, PayBillRequest, TransactionLog, AnomalyResult
from database import log_transaction, get_recent_logs, save_anomaly, db
from ml_engine import ml_engine, get_risk_level
from spending_monitor import spending_monitor
from rbi_alerts import rbi_alerts
from gemini_engine import GeminiInsightEngine

app = FastAPI(title="BloShield API Gateway")

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

# Background task for simulating real-time transactions
async def simulate_transactions():
    """Simulate periodic transactions to demonstrate real-time updates"""
    while True:
        try:
            await asyncio.sleep(random.uniform(5, 15))  # Send update every 5-15 seconds
            
            # Generate random transaction
            users = ['User123', 'User456', 'UserABC', 'UserXYZ', 'User789']
            amounts = [500, 1200, 5000, 8500, 15000, 2500, 3500, 4200]
            
            user_id = random.choice(users)
            amount = random.choice(amounts)
            is_anomaly = random.random() < 0.2  # 20% chance of anomaly
            
            transaction_id = str(random.randint(100000, 999999))
            
            await manager.broadcast({
                "type": "transaction",
                "data": {
                    "transaction_id": transaction_id,
                    "user_id": user_id,
                    "amount": amount,
                    "status": "success",
                    "risk_level": "high" if is_anomaly else "low",
                    "is_anomaly": is_anomaly,
                    "timestamp": datetime.utcnow().isoformat()
                }
            })
        except Exception as e:
            print(f"Error in transaction simulator: {e}")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Start background task on app startup
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(simulate_transactions())

# WebSocket endpoint for real-time updates
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast({"type": "message", "data": data})
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.middleware("http")
async def monitor_traffic(request: Request, call_next):
    start_time = time.time()
    
    # Process request
    response = await call_next(request)
    
    process_time = (time.time() - start_time) * 1000 # ms
    
    # Logic for logging (only for API routes)
    if request.url.path in ["/send_money", "/check_balance", "/pay_bill"]:
        # We'd typically extract user_id and amount from request body here
        # For this demo, we'll try to get it if possible or use defaults
        pass

    return response

@app.get("/")
async def root():
    return {"message": "BloShield API Gateway is running"}

@app.post("/send_money")
async def send_money(req: SendMoneyRequest):
    start_time = time.time()
    # Simulate processing
    time.sleep(random.uniform(0.01, 0.1))
    
    status = "success"
    if random.random() < 0.05: # 5% failure rate
        status = "failure"
        
    process_time = (time.time() - start_time) * 1000
    
    # AI Analysis
    hour = datetime.now().hour
    is_anomaly, risk_score = ml_engine.predict(req.amount, process_time, hour)
    
    # Persistent Anomaly Rules (Rule-based)
    if req.amount > 10000: # Example rule
        is_anomaly = True
        risk_score = max(risk_score, 0.8)

    log_data = TransactionLog(
        user_id=req.user_id,
        endpoint="/send_money",
        amount=req.amount,
        status=status,
        response_time_ms=process_time,
        risk_score=risk_score,
        is_anomaly=is_anomaly
    )
    
    await log_transaction(log_data.dict())
    
    # Track spending for daily limit monitoring
    spending_monitor.add_transaction(req.user_id, req.amount)
    
    # Check for RBI fraud alert matches
    rbi_match = rbi_alerts.check_transaction_against_alerts(
        req.description if hasattr(req, 'description') else "send_money",
        req.amount
    )

    
    if is_anomaly:
        await save_anomaly({
            "user_id": req.user_id,
            "endpoint": "/send_money",
            "amount": req.amount,
            "risk_score": risk_score,
            "severity": get_risk_level(risk_score),
            "timestamp": datetime.utcnow()
        })

    # Broadcast transaction to all connected WebSocket clients
    transaction_id = str(random.randint(100000, 999999))
    await manager.broadcast({
        "type": "transaction",
        "data": {
            "transaction_id": transaction_id,
            "user_id": req.user_id,
            "amount": req.amount,
            "status": status,
            "risk_level": get_risk_level(risk_score),
            "is_anomaly": is_anomaly,
            "timestamp": datetime.utcnow().isoformat()
        }
    })

    return {
        "status": status,
        "transaction_id": transaction_id,
        "risk_assessment": {
            "score": risk_score,
            "level": get_risk_level(risk_score),
            "anomaly": is_anomaly
        }
    }

@app.get("/check_balance")
async def check_balance(user_id: str):
    start_time = time.time()
    # Logic...
    process_time = (time.time() - start_time) * 1000
    
    log_data = TransactionLog(
        user_id=user_id,
        endpoint="/check_balance",
        amount=0,
        status="success",
        response_time_ms=process_time,
        risk_score=0.05,
        is_anomaly=False
    )
    await log_transaction(log_data.dict())
    return {"user_id": user_id, "balance": random.uniform(100, 5000)}

@app.post("/pay_bill")
async def pay_bill(req: PayBillRequest):
    # Similar to send_money...
    log_data = TransactionLog(
        user_id=req.user_id,
        endpoint="/pay_bill",
        amount=req.amount,
        status="success",
        response_time_ms=random.uniform(10, 50),
        risk_score=0.1,
        is_anomaly=False
    )
    await log_transaction(log_data.dict())
    return {"status": "success", "bill_id": req.bill_id}

@app.get("/stats")
async def get_stats():
    # Dashboard data
    total_requests = await db.api_logs.count_documents({})
    success_count = await db.api_logs.count_documents({"status": "success"})
    failure_count = await db.api_logs.count_documents({"status": "failure"})
    anomaly_count = await db.api_logs.count_documents({"is_anomaly": True})
    
    recent_logs = await get_recent_logs(20)
    # Convert ObjectIds to strings if necessary
    for log in recent_logs:
        log["_id"] = str(log["_id"])
    
    stats_data = {
        "total_requests": total_requests,
        "success_rate": (success_count / total_requests * 100) if total_requests > 0 else 0,
        "anomaly_count": anomaly_count,
        "recent_logs": recent_logs
    }
    
    # Broadcast stats update to all connected WebSocket clients
    await manager.broadcast({
        "type": "stats_update",
        "data": stats_data
    })
    
    return stats_data

@app.get("/chart-data")
async def get_chart_data():
    # In a real app, this would be a MongoDB aggregation
    # For this mock, we'll return some trends based on existing logs
    logs = await db.api_logs.to_list()
    
    # Group by hour
    hours = {}
    for log in logs:
        hr = log["timestamp"].strftime("%H:00")
        if hr not in hours:
            hours[hr] = {"time": hr, "requests": 0, "anomalies": 0}
        hours[hr]["requests"] += 1
        if log.get("is_anomaly"):
            hours[hr]["anomalies"] += 1
            
    # Sort by time
    sorted_hours = sorted(hours.values(), key=lambda x: x["time"])
    return sorted_hours if sorted_hours else [{"time": "00:00", "requests": 0, "anomalies": 0}]

@app.get("/anomalies")
async def get_anomalies():
    cursor = db.anomalies.find().sort("timestamp", -1).limit(50)
    anomalies = await cursor.to_list(length=50)
    for a in anomalies:
        a["_id"] = str(a["_id"])
        if "amount" in a:
            a["amount"] = round(a["amount"], 2)
    return anomalies

@app.get("/insights")
async def get_insights():
    # Rule-based + AI-based insights
    total = await db.api_logs.count_documents({})
    anomalies = await db.anomalies.count_documents({})
    failures = await db.api_logs.count_documents({"status": "failure"})
    
    insights = []
    if anomalies > 0:
        insights.append({
            "type": "FRAUD_ALERT",
            "message": f"Detected {anomalies} high-risk patterns in recent traffic. Possible fraud attempt confirmed by AI.",
            "severity": "HIGH"
        })
    
    if failures > (total * 0.1):
        insights.append({
            "type": "PERFORMANCE",
            "message": "Failure rate has exceeded 10% threshold. Recommended to check downstream banking adapters.",
            "severity": "MEDIUM"
        })
        
    insights.append({
        "type": "ACTIVITY",
        "message": "User activity spike detected between 08:00 and 12:00. Scaling infrastructure is recommended.",
        "severity": "LOW"
    })
    
    return insights

# ============= BLOSTEM SENTINEL: ENHANCED FEATURES =============

# Daily Spending Limit Endpoints
@app.post("/user/spending-limit")
async def set_spending_limit(user_id: str, limit: float):
    """Set daily spending limit for a user"""
    result = spending_monitor.set_daily_limit(user_id, limit)
    return {
        "status": "success",
        "message": f"Daily spending limit set to ${limit} for {user_id}",
        "data": result
    }

@app.get("/user/spending-limit/{user_id}")
async def get_spending_limit(user_id: str):
    """Get user's daily spending limit"""
    limit = spending_monitor.get_daily_limit(user_id)
    return {
        "user_id": user_id,
        "daily_spending_limit": limit
    }

@app.get("/user/daily-spending/{user_id}")
async def get_daily_spending(user_id: str):
    """Get today's spending status"""
    spending = spending_monitor.check_limit_exceeded(user_id)
    daily_details = spending_monitor.get_daily_spending(user_id)
    
    return {
        "user_id": user_id,
        "daily_limit": daily_details["daily_limit"],
        "total_spent": daily_details["total_spent"],
        "remaining": daily_details["remaining_limit"],
        "percent_used": daily_details["percent_used"],
        "limit_exceeded": spending["limit_exceeded"],
        "message": spending["message"],
        "transaction_count": daily_details["transaction_count"]
    }

@app.get("/user/spending-summary/{user_id}")
async def get_spending_summary(user_id: str, days: int = 7):
    """Get spending summary for last N days"""
    summary = spending_monitor.get_spending_summary(user_id, days)
    return summary

# RBI Fraud Alerts Endpoints
@app.get("/rbi/active-alerts")
async def get_rbi_alerts():
    """Get all active RBI fraud alerts"""
    alerts = rbi_alerts.get_active_alerts()
    return {
        "total_active_alerts": len(alerts),
        "alerts": alerts
    }

@app.get("/rbi/alert/{alert_id}")
async def get_rbi_alert(alert_id: str):
    """Get specific RBI alert by ID"""
    alert = rbi_alerts.get_alert_by_id(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@app.post("/rbi/check-transaction")
async def check_transaction_against_rbi(description: str = "", amount: float = 0):
    """Check if a transaction matches any RBI fraud alert"""
    match = rbi_alerts.check_transaction_against_alerts(description, amount)
    
    return {
        "matched": match is not None,
        "alert": match if match else None
    }

# AI Insights Endpoints
gemini_engine = GeminiInsightEngine()

@app.get("/ai/insights/{user_id}")
async def get_ai_insights(user_id: str):
    """Generate AI insights for a user based on transaction history"""
    try:
        # Get recent transactions
        recent_logs = await get_recent_logs(50, user_id)
        if not recent_logs:
            recent_logs = []
        
        # Get user profile
        user_profile = {
            "user_id": user_id,
            "daily_spending_limit": spending_monitor.get_daily_limit(user_id)
        }
        
        # Generate insights
        insights = await gemini_engine.generate_insights(recent_logs, user_profile)
        
        return {
            "user_id": user_id,
            "insights_generated_at": datetime.utcnow().isoformat(),
            "insights": insights,
            "transactions_analyzed": len(recent_logs)
        }
    except Exception as e:
        return {
            "user_id": user_id,
            "error": str(e),
            "insights": []
        }

# Enhanced Dashboard Endpoint
@app.get("/dashboard/blostem/{user_id}")
async def get_blostem_dashboard(user_id: str):
    """Get comprehensive Blostem Sentinel dashboard data"""
    try:
        # Get stats
        total_requests = await db.api_logs.count_documents({"user_id": user_id})
        success_count = await db.api_logs.count_documents({"user_id": user_id, "status": "success"})
        anomaly_count = await db.api_logs.count_documents({"user_id": user_id, "is_anomaly": True})
        
        # Get spending info
        daily_spending = spending_monitor.get_daily_spending(user_id)
        spending_summary = spending_monitor.get_spending_summary(user_id, 7)
        
        # Get RBI alerts
        rbi_matches = rbi_alerts.get_active_alerts()
        
        # Get insights
        recent_logs = await get_recent_logs(50, user_id)
        user_profile = {"user_id": user_id, "daily_spending_limit": spending_monitor.get_daily_limit(user_id)}
        insights = await gemini_engine.generate_insights(recent_logs, user_profile)
        
        return {
            "user_id": user_id,
            "timestamp": datetime.utcnow().isoformat(),
            "transaction_stats": {
                "total_transactions": total_requests,
                "success_rate": (success_count / total_requests * 100) if total_requests > 0 else 0,
                "anomalies_detected": anomaly_count
            },
            "spending_status": {
                "daily_spent": daily_spending["total_spent"],
                "daily_limit": daily_spending["daily_limit"],
                "percent_used": daily_spending["percent_used"],
                "limit_exceeded": daily_spending["limit_exceeded"],
                "remaining": daily_spending["remaining_limit"]
            },
            "weekly_summary": {
                "total_spent": spending_summary["total_spent_period"],
                "average_daily": spending_summary["avg_daily_spend"],
                "days_exceeded": spending_summary["days_exceeded_limit"]
            },
            "rbi_fraud_alerts": {
                "active_alerts_count": len(rbi_matches),
                "alerts": rbi_matches[:5]  # Top 5 alerts
            },
            "ai_insights": {
                "total_insights": len(insights),
                "insights": insights[:3]  # Top 3 insights
            },
            "system_status": "LIVE"
        }
    except Exception as e:
        return {
            "error": str(e),
            "user_id": user_id,
            "system_status": "ERROR"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
