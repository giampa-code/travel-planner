"""
Pydantic schemas for routes-related data models.

This module defines the data models used for API responses in the routes endpoints.
"""

from pydantic import BaseModel, Field


class RoutesResponse(BaseModel):
    """
    Response model for routes from an airport.

    Attributes:
        destinations (list[str]): List of destination airport codes.
    """
    destinations: list[str] = Field(..., description="List of destination airport IATA codes")