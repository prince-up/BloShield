import requests
import time
import random

BASE_URL = "http://localhost:8000"

USERS = ["user_1", "user_2", "user_3", "user_4", "user_5"]

def generate_traffic():
    print("Starting BloShield Traffic Simulator...")
    while True:
        user = random.choice(USERS)
        # Random endpoint
        endpoint = random.choice(["/send_money", "/check_balance", "/pay_bill"])
        
        try:
            if endpoint == "/send_money":
                amount = random.uniform(10, 500)
                # Intentionally create anomaly
                if random.random() < 0.1:
                    amount = random.uniform(15000, 50000)
                    print(f"Generating anomaly: High amount {amount} for {user}")
                
                resp = requests.post(f"{BASE_URL}/send_money", json={
                    "user_id": user,
                    "amount": amount,
                    "recipient_id": "recipient_x"
                })
            elif endpoint == "/check_balance":
                resp = requests.get(f"{BASE_URL}/check_balance", params={"user_id": user})
            else:
                resp = requests.post(f"{BASE_URL}/pay_bill", json={
                    "user_id": user,
                    "amount": random.uniform(50, 200),
                    "bill_id": "bill_y"
                })
            
            print(f"Request to {endpoint} - Status: {resp.status_code}")
            
        except Exception as e:
            print(f"Error connecting to backend: {e}")
            
        time.sleep(random.uniform(1, 5))

if __name__ == "__main__":
    generate_traffic()
