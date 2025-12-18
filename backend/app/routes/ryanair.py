from fastapi import APIRouter
import requests
import json
from typing import Optional
#import pandas as pd

router = APIRouter(prefix="/api/ryanair", tags=["Ryanair"]) # Todos los endpoints de este router comienzan con /ryanair

@router.get("/list_rutes_from_airport_path/{rutes_from_airport}")
def list_rutes_from_airport_path(rutes_from_airport: str):
    """
    Obtiene rutas desde un aeropuerto de Ryanair usando el endpoint
    /api/views/locate/searchWidget/routes/{market}/airport/{airport_code}
    """

    market= "en"
    base_url = "https://www.ryanair.com/api/views/locate/searchWidget/routes"
    # Construimos la URL
    url = f"{base_url}/{market}/airport/{rutes_from_airport}"
    # Hacemos la petición GET
    headers = {
    "Accept": "application/json, text/plain, */*",
    # Puedes incluir User-Agent u otros headers si necesario
    "User-Agent": "python-requests/2.x"
    }
    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Error al llamar Ryanair API: status {response.status_code}, {response.text}")
    data = response.json()
    list_airports_to = [route['arrivalAirport']['name'] for route in data]
    
    return list_airports_to

@router.get("/list_rutes_from_airport_query")
def list_rutes_from_airport_query(rutes_from_airport: Optional[str] = None):
    """
    Obtiene rutas desde un aeropuerto de Ryanair usando el endpoint
    /api/views/locate/searchWidget/routes/{market}/airport/{airport_code}
    """
    if rutes_from_airport is None:
        return ["Debe proporcionar un código de aeropuerto como parámetro de consulta."]
    
    market= "en"
    base_url = "https://www.ryanair.com/api/views/locate/searchWidget/routes"
    # Construimos la URL
    url = f"{base_url}/{market}/airport/{rutes_from_airport}"
    # Hacemos la petición GET
    headers = {
    "Accept": "application/json, text/plain, */*",
    # Puedes incluir User-Agent u otros headers si necesario
    "User-Agent": "python-requests/2.x"
    }
    response = requests.get(url, headers=headers, timeout=10)
    if response.status_code != 200:
        raise Exception(f"Error al llamar Ryanair API: status {response.status_code}, {response.text}")
    data = response.json()
    list_airports_to = sorted([route['arrivalAirport']['name'] for route in data])
    
    return list_airports_to