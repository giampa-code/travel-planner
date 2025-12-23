"""
Main application module for the Travel Planner backend.

This module initializes the FastAPI application, configures CORS middleware,
and includes the API routers for routes and users.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import routes, users

# Initialize FastAPI application instance
app = FastAPI(
    title="Travel Planner API",
    description="API for finding flight routes and managing user data",
    version="1.0.0"
)

# Configure CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://super-potato-rw76jxp775w3pv-5173.app.github.dev"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers for different endpoints
app.include_router(routes.router)
app.include_router(users.router)


@app.get("/")
def root():
    """
    Root endpoint to verify the backend is running.

    Returns:
        dict: A message indicating the backend status.
    """
    return {"message": "Backend is running 🚀"}


@app.get("/health")
def health():
    """
    Health check endpoint for monitoring.

    Returns:
        dict: Status of the application.
    """
    return {"status": "ok"}



