# BloShield Real-Time Testing Guide

## 🚀 Quick Start - Running Everything

### Terminal 1: Start Backend
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\backend
python -m uvicorn main:app --reload
```
✅ Wait for: `Uvicorn running on http://127.0.0.1:8000`

### Terminal 2: Start Frontend
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\frontend
npm run dev
```
✅ Wait for: `- Local: http://localhost:3000`

### Terminal 3: Start Simulator (for traffic generation)
```bash
cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\simulator
python traffic_gen.py
```
✅ This will generate simulated API calls

---

## ✅ Testing Checklist

### 1️⃣ Authentication Testing
**URL:** http://localhost:3000/signup

Steps:
1. Click "Sign Up"
2. Fill in:
   - Full Name: `Test User`
   - Email: `test@blosshield.com`
   - Password: `TestPassword123`
   - Confirm: `TestPassword123`
3. Click "Create Account"

Expected Result:
- ✅ "Account created! Check your email to confirm." message
- ✅ Redirects to /login after 2 seconds

**Then Login:**
- Email: `test@blosshield.com`
- Password: `TestPassword123`
- Click "Sign In"

Expected Result:
- ✅ Redirects to dashboard
- ✅ User info appears in navbar

---

### 2️⃣ WebSocket Real-Time Testing
**How to Verify WebSocket is Connected:**

1. Open Browser DevTools (F12)
2. Go to Network Tab
3. Filter by "WS" (WebSocket)
4. You should see: `ws://localhost:8000/ws`
5. Status: Connected ✅

**Or Check Console:**
- Open Console Tab (F12 → Console)
- Look for WebSocket connection logs

---

### 3️⃣ Live Activity Feed Testing
**URL:** http://localhost:3000

Expected Behavior:
1. Dashboard loads
2. "Live Activity Feed" section shows real-time updates
3. New transactions appear at top automatically
4. NO page refresh needed
5. Green "live" indicator pulses

**Check in DevTools Console:**
```javascript
// It should show WebSocket messages like:
// "transaction", "stats_update", etc.
```

---

### 4️⃣ Dashboard Stats Update Testing
**Check Overview Section:**
- Total API Requests should increase
- Success Rate should update
- Threats Blocked should increase

**Real-Time Indicator:**
- Stats update live without refresh
- Changes appear instantly when transactions occur

---

### 5️⃣ API Endpoint Testing
Use these endpoints to verify backend is working:

**Register User (POST)**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "Password123",
    "full_name": "Test User"
  }'
```

**Login (POST)**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "Password123"
  }'
```

**Get Stats (GET)**
```bash
curl http://localhost:8000/stats
```
Expected: JSON with transactions, success_rate, anomaly_count

**Send Test Transaction (POST)**
```bash
curl -X POST http://localhost:8000/send_money \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "amount": 5000,
    "receiver": "friend@bank.com"
  }'
```

---

## 🔍 Monitoring in Real-Time

### Browser DevTools Method

**1. Open Console (F12 → Console)**
```javascript
// You'll see logs like:
// "WebSocket connected"
// "Received transaction: ..."
// "Stats updated"
```

**2. Network Tab (F12 → Network)**
- Filter dropdown → WS
- Look for connections to `ws://localhost:8000/ws`
- Status should be "101 Switching Protocols"
- Should show real-time data flowing

**3. Storage Tab (F12 → Storage)**
- Look at Cookies/Local Storage
- Check if session token is stored

### Terminal Method

**Backend Console:**
- Shows all requests
- Shows WebSocket connections
- Shows data being broadcast

**Watch for messages like:**
```
WebSocket connection established
Broadcasting transaction: {...}
Broadcasting stats update: {...}
```

---

## 🧪 Step-by-Step Complete Test

### Test 1: Register New User
1. Go to http://localhost:3000/signup
2. Fill form with unique email
3. Submit
4. Verify: "Account created!" message appears

### Test 2: Login
1. Go to http://localhost:3000/login
2. Enter credentials from Test 1
3. Click "Sign In"
4. Verify: Redirects to dashboard
5. Verify: User info shows in navbar

### Test 3: WebSocket Connection
1. Open DevTools (F12)
2. Network → Filter "WS"
3. Refresh page or go to dashboard
4. Should see `ws://localhost:8000/ws` connected
5. Status: `101` (Connected)

### Test 4: Real-Time Updates
1. Keep dashboard open
2. Watch "Live Activity Feed" 
3. New activities should appear every 5-15 seconds
4. No page refresh needed
5. Stats numbers should update automatically

### Test 5: Multiple Connections
1. Open dashboard in 2 browser windows
2. Both should show same real-time updates
3. Activity in window 1 appears instantly in window 2
4. Proves WebSocket is broadcasting to all clients

---

## 📊 Expected Real-Time Data Flow

```
Backend (Auto-simulator runs every 5-15 seconds)
    ↓
  Generates transaction
    ↓
  Processes with AI/ML  
    ↓
  Broadcasts via WebSocket
    ↓
Frontend receives instantly
    ↓
Live Activity Feed updates (NO refresh)
    ↓
Dashboard stats update (NO refresh)
```

---

## ⚠️ Troubleshooting

### WebSocket Not Connected?
**Solution:**
1. Check backend is running: `http://localhost:8000/docs`
2. Check console for errors (F12)
3. Verify CORS is enabled (should be ✅)
4. Try hard refresh: `Ctrl+Shift+R`

### Real-Time Updates Not Showing?
**Check:**
1. Backend console: Should show broadcast messages
2. Browser console: Should show received messages
3. Network tab: WebSocket should be active
4. Activity Feed: Should update every 5-15 seconds

### Login Not Working?
**Check:**
1. Supabase URL and Key in `.env` are correct
2. User was registered first
3. Backend console: No auth errors
4. Check browser console: Auth error details

### Simulator Not Generating Data?
**Run:**
```bash
cd backend
python traffic_gen.py
```
Should show: `Generated transaction...`

---

## 🎯 What You Should See

✅ **When You Login:**
- User name in navbar
- Dashboard loads

✅ **On Dashboard (Overview Page):**
- Hero section with stats
- Live Activity Feed shows transactions
- Risk meter shows risk level
- AI Insight card displays
- Daily limit progress bar

✅ **Real-Time Indicators:**
- Green pulse dot next to "Live Activity Feed" 
- Activity timestamps updating
- Stats numbers changing
- No manual refresh needed

✅ **Every 5-15 Seconds:**
- New transaction appears in feed
- Stats increment
- Risk gauge updates
- Success rate changes

---

## 📱 Mobile Testing

Test responsive design:
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test on iPhone/Android sizes
4. Real-time should work on mobile too

---

## 🔗 Quick Links

- **Dashboard:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Signup:** http://localhost:3000/signup
- **API Docs:** http://localhost:8000/docs
- **Supabase:** https://app.supabase.com

---

## 💾 Save This For Reference

All commands above are available in this file.
Bookmark this for quick testing reference!
