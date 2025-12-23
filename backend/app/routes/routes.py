"""
Routes API endpoints for the Travel Planner application.

This module defines the API routes for retrieving flight routes from airports.
"""

from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.services.ryanair import get_routes_from_airport
from app.schemas.routes import RoutesResponse
# import pandas as pd  # Commented out as it's not currently used

# Create APIRouter instance with prefix and tags for organization
router = APIRouter(
    prefix="/api/routes",
    tags=["Routes"]
)


@router.get(
    "/from-airport",
    response_model=RoutesResponse
)
def list_routes_from_airport_query(
    airport: Optional[str] = Query(
        None,
        min_length=3,
        max_length=3,
        description="IATA airport code (e.g., MAD)"
    )
):
    """
    Retrieve flight routes from a specified airport.

    Args:
        airport (str): The IATA code of the departure airport.

    Returns:
        RoutesResponse: A response containing the list of destinations.

    Raises:
        HTTPException: If no airport code is provided.
    """
    if airport is None:
        raise HTTPException(
            status_code=400,
            detail="Airport code must be provided"
        )

    # Fetch destinations from the service layer
    destinations = get_routes_from_airport(airport.upper())

    return RoutesResponse(destinations=destinations)