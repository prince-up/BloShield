"""Supabase Authentication and Database Module"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

load_dotenv()

# Initialize Supabase Client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Pydantic Models
class UserSignUp(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    created_at: str

class AuthResponse(BaseModel):
    user: UserResponse
    session: Optional[dict] = None
    message: str

# User Registration
async def register_user(signup_data: UserSignUp) -> dict:
    """Register a new user with Supabase Auth"""
    try:
        # Create user in Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": signup_data.email,
            "password": signup_data.password
        })
        
        user = auth_response.user
        
        # Create user profile in database
        user_profile = {
            "id": user.id,
            "email": signup_data.email,
            "full_name": signup_data.full_name,
            "created_at": datetime.utcnow().isoformat(),
            "daily_spending_limit": 100000,  # Default limit
            "is_active": True
        }
        
        # Insert user profile into users table
        supabase.table("users").insert(user_profile).execute()
        
        return {
            "status": "success",
            "message": "User registered successfully. Please check your email to confirm.",
            "user_id": user.id,
            "email": signup_data.email
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "error": "Registration failed"
        }

# User Login
async def login_user(login_data: UserLogin) -> dict:
    """Login user and return session"""
    try:
        # Authenticate with Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": login_data.email,
            "password": login_data.password
        })
        
        session = auth_response.session
        user = auth_response.user
        
        # Get user profile
        profile = supabase.table("users").select("*").eq("id", user.id).execute()
        user_data = profile.data[0] if profile.data else {}
        
        return {
            "status": "success",
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user_data.get("full_name", ""),
                "created_at": user.created_at
            },
            "session": {
                "access_token": session.access_token,
                "refresh_token": session.refresh_token,
                "expires_in": session.expires_in
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": "Invalid email or password",
            "error": str(e)
        }

# Get User Profile
async def get_user_profile(user_id: str) -> dict:
    """Fetch user profile from database"""
    try:
        profile = supabase.table("users").select("*").eq("id", user_id).execute()
        
        if profile.data:
            user_data = profile.data[0]
            return {
                "status": "success",
                "user": user_data
            }
        else:
            return {
                "status": "error",
                "message": "User not found"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# Update User Profile
async def update_user_profile(user_id: str, updates: dict) -> dict:
    """Update user profile"""
    try:
        updates["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase.table("users").update(updates).eq("id", user_id).execute()
        
        return {
            "status": "success",
            "message": "Profile updated successfully",
            "user": response.data[0] if response.data else {}
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# Logout User
async def logout_user(user_id: str) -> dict:
    """Logout user by revoking session"""
    try:
        supabase.auth.sign_out()
        return {
            "status": "success",
            "message": "Logged out successfully"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

# Verify Token
async def verify_token(token: str) -> dict:
    """Verify JWT token validity"""
    try:
        user = supabase.auth.get_user(token)
        return {
            "status": "success",
            "user": user,
            "valid": True
        }
    except Exception as e:
        return {
            "status": "error",
            "valid": False,
            "message": str(e)
        }
