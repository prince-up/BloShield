# 🔍 Browser DevTools Real-Time Monitoring Guide

## How to Check WebSocket Connection in Real-Time

### Step 1: Open DevTools
```
Windows/Linux: Press F12
Mac: Press Cmd + Option + I
```

### Step 2: Go to Network Tab
- Click the "Network" tab
- You should see all network requests

### Step 3: Filter for WebSocket
- Click the filter dropdown at the top
- Select "WS" or type "ws" in the filter
- This will only show WebSocket connections

### Step 4: Look for WebSocket Connection
You should see something like:
```
ws://localhost:8000/ws
```

**Status should be: 101 Switching Protocols ✅**

---

## What Each Tab Shows

### Network Tab
- **WS Filter:** Shows only WebSocket connections
- **Status:** Should be `101` (Connected)
- **Messages:** Real-time data being sent/received
- **Size:** Amount of data transferred

### Console Tab
Look for messages like:
```
WebSocket connected ✅
Received transaction: {id: "123456", amount: 5000} 
Stats updated: {total_requests: 12, success: 99.5}
Live Activity Feed updated
```

### Storage Tab
- **Cookies:** Check for auth token
- **Local Storage:** User session data
- **Session Storage:** Temporary session info

---

## Real-Time Data Flow in DevTools

### 1. Network → WS Tab
```
ws://localhost:8000/ws
├─ Status: 101 (Connected) ✅
├─ Time: Connected for X seconds
└─ Data: Messages flowing constantly
```

### 2. Console Tab
```
[Log] WebSocket connected to ws://localhost:8000/ws
[Log] Received message: {type: "transaction", data: {...}}
[Log] Live Activity Feed updated with new transaction
[Log] Received message: {type: "stats_update", data: {...}}
[Log] Dashboard stats updated
```

### 3. Frames Tab (WebSocket Details)
- **Name:** Network requests within the WebSocket
- **Data:** JSON objects being transmitted
- **Direction:** Incoming (↓) or Outgoing (↑)

---

## Expected WebSocket Messages

### Every Transaction:
```json
{
  "type": "transaction",
  "data": {
    "transaction_id": "123456",
    "user_id": "user123",
    "amount": 5000,
    "status": "success",
    "risk_level": "low",
    "is_anomaly": false,
    "timestamp": "2026-04-14T10:30:45.123Z"
  }
}
```

### Every Stats Update:
```json
{
  "type": "stats_update",
  "data": {
    "total_requests": 125,
    "success_rate": 99.2,
    "anomaly_count": 3,
    "recent_logs": [...]
  }
}
```

---

## Live Dashboard Indicators

### ✅ What You Should See

1. **Live Activity Feed**
   - New entries appear every 5-15 seconds
   - No page refresh needed
   - Green "live" indicator pulses
   - Timestamps update in real-time

2. **Dashboard Stats**
   - Total API Requests increments
   - Success Rate updates
   - Threats Blocked increases
   - All changes instant (no delay)

3. **Risk Meter**
   - Gauge animation smooth
   - Updates when anomalies detected
   - Color changes (green → orange → red)

4. **AI Insights Card**
   - Shows current risk analysis
   - Updates as new data arrives
   - Risk score changes dynamically

---

## Troubleshooting with DevTools

### Problem: WebSocket Not Connected

**Check:**
1. Network → WS tab is empty
   - Is backend running? `http://localhost:8000`
   - Check backend console for errors

2. Console shows WebSocket error
   - URL incorrect? Should be `ws://localhost:8000/ws`
   - CORS issue? Check backend CORS settings

**Solution:**
```bash
# Restart backend
cd backend
python -m uvicorn main:app --reload
```

### Problem: No Real-Time Updates

**Check:**
1. WebSocket connected? (Status 101)
2. Console shows messages? (Should see transaction logs)
3. Browser tab in focus? (Some browsers pause background tabs)

**Solution:**
1. Hard refresh: `Ctrl+Shift+R`
2. Clear localStorage: DevTools → Storage → Clear All
3. Restart frontend: `npm run dev`

### Problem: Messages Flowing But No UI Update

**Check:**
1. Console shows messages arriving
2. Network shows WebSocket active
3. But Live Activity Feed not updating

**Solution:**
1. Check for JavaScript errors (red messages in console)
2. Open Components tab → React DevTools
3. Check if state is updating
4. Verify `setLiveActivities()` is being called

---

## Performance Monitoring

### Memory Usage
1. DevTools → Performance tab
2. Start recording
3. Let it run for 30 seconds
4. Stop and analyze
5. Check for memory leaks (steadily increasing)

### Network Performance
1. DevTools → Network tab
2. Watch WebSocket message size
3. Each message should be < 1KB
4. No lag/delay between messages

### JavaScript Performance
1. DevTools → Performance tab
2. Record for 30 seconds
3. Look for jank/stuttering
4. Should be smooth 60fps

---

## Quick Verification Checklist

Use this checklist to verify everything is working:

- [ ] Backend running? (http://localhost:8000)
- [ ] Frontend running? (http://localhost:3000)
- [ ] Can login/signup? (Authentication working)
- [ ] WebSocket connected? (DevTools Network → WS Status 101)
- [ ] Console shows messages? (Log entries appearing)
- [ ] Live Activity Feed updating? (Every 5-15 seconds)
- [ ] Dashboard stats changing? (Numbers incrementing)
- [ ] No console errors? (No red messages)
- [ ] No memory leaks? (Stable memory usage)
- [ ] WebSocket messages relevant? (Correct data structure)

---

## Pro Tips

1. **Keep DevTools Open While Testing**
   - Monitor real-time message flow
   - Catch errors immediately
   - See exact data being transmitted

2. **Use Network Throttling**
   - Simulate slow internet
   - Test real-world conditions
   - DevTools → Network → Throttling dropdown

3. **Check Timestamps**
   - Dashboard timestamp updates
   - Should match current time
   - Verifies data freshness

4. **Test Multiple Browsers**
   - Chrome, Firefox, Edge
   - Test on mobile Safari/Android
   - Verify compatibility

---

## Summary

🔍 **To verify real-time is working:**

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by WS
4. Should see `ws://localhost:8000/ws` with status 101
5. Watch Console for incoming messages
6. See Live Activity Feed updating in real-time
7. Watch Dashboard stats change automatically

**If all ✅, you're good to go!**
