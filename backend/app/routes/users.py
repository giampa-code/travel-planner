"""
Users API endpoints for the Travel Planner application.

This module defines the API routes for user-related operations.
"""

from fastapi import APIRouter

# Create APIRouter instance with prefix and tags for organization
router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/")
def list_users():
    """
    Retrieve a list of users.

    Returns:
        list: A list of user names.
    """
    return ["juan", "maria", "pedro"]