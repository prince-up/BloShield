# ⚡ Quick Command Reference

## 🚀 Start Everything

### Option 1: One-Click Start (Windows)
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield
START_ALL.bat
```
This opens 3 new terminals automatically for Backend, Frontend, and Simulator.

### Option 2: Manual Start (Open 3 Separate Terminals)

**Terminal 1 - Backend:**
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\backend
python -m uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\frontend
npm run dev
```

**Terminal 3 - Simulator:**
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\simulator
python traffic_gen.py
```

---

## ✅ Verify Everything is Running

```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield
VERIFY_STATUS.bat
```

Or manually check:
```bash
# Check Backend
curl http://localhost:8000/

# Check Frontend
curl http://localhost:3000/

# Check Stats
curl http://localhost:8000/stats

# Check API Docs
curl http://localhost:8000/docs
```

---

## 🔗 URLs to Access

| Service | URL |
|---------|-----|
| **Dashboard** | http://localhost:3000 |
| **Login Page** | http://localhost:3000/login |
| **Signup Page** | http://localhost:3000/signup |
| **API Docs** | http://localhost:8000/docs |
| **API Root** | http://localhost:8000 |
| **WebSocket** | ws://localhost:8000/ws |

---

## 🧪 Quick Test Commands

### Create Test User
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"test@blosshield.com\",
    \"password\": \"TestPassword123\",
    \"full_name\": \"Test User\"
  }"
```

### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"test@blosshield.com\",
    \"password\": \"TestPassword123\"
  }"
```

### Get Stats
```bash
curl http://localhost:8000/stats
```

### Send Transaction
```bash
curl -X POST http://localhost:8000/send_money \
  -H "Content-Type: application/json" \
  -d "{
    \"user_id\": \"user123\",
    \"amount\": 5000
  }"
```

### Get Anomalies
```bash
curl http://localhost:8000/anomalies
```

### Get AI Insights
```bash
curl http://localhost:8000/ai/insights/user123
```

---

## 🔍 Real-Time Testing

### 1. Check WebSocket in Browser Console
Open DevTools (F12 → Console) and paste:
```javascript
// Check WebSocket connection
if (window.ws && window.ws.readyState === 1) {
  console.log('✅ WebSocket Connected');
} else {
  console.log('❌ WebSocket Not Connected');
}
```

### 2. Monitor WebSocket Traffic
Open DevTools (F12 → Network tab), then:
1. Filter by "WS"
2. Look for `ws://localhost:8000/ws`
3. Status should be `101 (Switching Protocols)`

### 3. Watch Real-Time Updates
Open browser, go to http://localhost:3000, and watch:
- Live Activity Feed updates every 5-15 seconds
- Dashboard stats change automatically
- No manual refresh needed

---

## 🛠️ Installation & Setup

### First Time Setup

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install
```

---

## 🔄 Restart Everything

### If Something Goes Wrong

**Kill All Processes:**
```bash
# Windows
taskkill /F /IM python.exe
taskkill /F /IM node.exe
taskkill /F /IM chrome.exe
```

**Start Fresh:**
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield
START_ALL.bat
```

---

## 📊 Monitor Performance

### Watch Backend Console
```bash
# In backend terminal, watch for:
# - "POST /send_money" requests
# - "Broadcasting transaction"
# - "WebSocket connections"
```

### Watch Frontend Console
Open DevTools (F12 → Console) and look for:
```
[Log] WebSocket connected
[Log] Received transaction
[Log] Live Activity Feed updated
[Log] Dashboard stats updated
```

---

## 📱 Test on Different Devices

### Test on Mobile
```bash
# Find your computer's IP address
ipconfig

# On mobile, go to:
http://<your-ip>:3000

# Example:
http://192.168.1.100:3000
```

---

## 🎯 Troubleshooting Commands

### Backend Not Starting?
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Not Starting?
```bash
cd frontend
npm run build
npm run dev
```

### Clear Cache & Restart
```bash
# Frontend
cd frontend
rm -r .next
npm run dev

# Backend (if needed)
cd backend
python -m uvicorn main:app --reload --reload-dirs .
```

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# Kill process using port
taskkill /PID <process-id> /F
```

---

## 📝 Logs to Check

### Backend Logs
- Python errors/warnings
- API request logs
- WebSocket connection events
- Database operations

### Frontend Logs
- DevTools Console errors
- WebSocket messages
- React component lifecycle
- State updates

### Browser DevTools
- Network requests
- WebSocket frames
- Memory usage
- Performance metrics

---

## ✨ What Success Looks Like

✅ Backend running: Terminal shows "Uvicorn running..."
✅ Frontend running: Terminal shows "- Local: http://localhost:3000"
✅ Simulator running: Terminal shows "Generated transaction..."
✅ Authentication: Can login/signup successfully
✅ WebSocket: DevTools shows `ws://localhost:8000/ws` (Status 101)
✅ Real-Time: Live Activity Feed updates without refresh
✅ Stats: Dashboard numbers change automatically
✅ Console: No errors, shows transaction logs

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Kill process: `taskkill /F /IM node.exe` |
| Port 8000 in use | Kill process: `taskkill /F /IM python.exe` |
| WebSocket not connecting | Check backend is running: `curl http://localhost:8000` |
| Authentication failing | Verify Supabase credentials in `.env` |
| No real-time updates | Check browser DevTools Network → WS tab |
| Slow updates | Check browser performance, increase throttle |

---

## 📚 Documentation Files

- `TESTING_GUIDE.md` - Complete testing procedures
- `DEVTOOLS_GUIDE.md` - Browser DevTools monitoring
- `QUICK_COMMANDS.md` - This file

---

## 🎉 You're Ready!

Run `START_ALL.bat` and visit http://localhost:3000

Enjoy BloShield! 🚀
