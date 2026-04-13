import os
import asyncio
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Mock MongoDB for environment without local installation
class MockCollection:
    def __init__(self):
        self.data = []
    
    async def insert_one(self, document):
        document["_id"] = str(len(self.data) + 1)
        self.data.append(document)
        return document

    def find(self, query=None):
        return self

    def sort(self, field, direction=-1):
        # Simplistic sort
        return self

    def limit(self, n):
        self._limit = n
        return self

    async def to_list(self, length=0):
        res = self.data[::-1] # Newest first
        if self._limit:
            res = res[:self._limit]
        return res

    async def count_documents(self, query):
        if not query:
            return len(self.data)
        # Simple filtering
        count = 0
        for doc in self.data:
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
                    break
            if match:
                count += 1
        return count

class MockDB:
    def __init__(self):
        self.api_logs = MockCollection()
        self.anomalies = MockCollection()

db = MockDB()

async def get_db():
    return db

async def log_transaction(data):
    await db.api_logs.insert_one(data)

async def get_recent_logs(limit=50):
    return await db.api_logs.limit(limit).to_list()

async def save_anomaly(anomaly_data):
    await db.anomalies.insert_one(anomaly_data)

