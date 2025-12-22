from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.services.ryanair import get_routes_from_airport
from app.schemas.routes import RoutesResponse
#import pandas as pd

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
        description="Código IATA del aeropuerto (ej: MAD)"
    )
):
    if airport is None:
        raise HTTPException(
            status_code=400,
            detail="Debe proporcionar un código de aeropuerto"
        )

    destinations = get_routes_from_airport(airport.upper())

    return RoutesResponse(destinations=destinations)