from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import time
from datetime import datetime
import random
from models import SendMoneyRequest, PayBillRequest, TransactionLog, AnomalyResult
from database import log_transaction, get_recent_logs, save_anomaly, db
from ml_engine import ml_engine, get_risk_level

app = FastAPI(title="BloShield API Gateway")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    
    if is_anomaly:
        await save_anomaly({
            "user_id": req.user_id,
            "endpoint": "/send_money",
            "amount": req.amount,
            "risk_score": risk_score,
            "severity": get_risk_level(risk_score),
            "timestamp": datetime.utcnow()
        })

    return {
        "status": status,
        "transaction_id": str(random.randint(100000, 999999)),
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
        
    return {
        "total_requests": total_requests,
        "success_rate": (success_count / total_requests * 100) if total_requests > 0 else 0,
        "anomaly_count": anomaly_count,
        "recent_logs": recent_logs
    }

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
