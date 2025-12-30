"""
Service module for interacting with Ryanair API.

This module provides functions to fetch flight route data from Ryanair's public API.

In-memory cache, with a TTL of 60 minutes, is used to minimize redundant API calls.
"""

import time
import requests
from threading import Lock

CACHE = {}
LOCKS = {}
CACHE_TTL_SECONDS = 1 * 10 * 60  # 10 minutes


def get_routes_from_airport(airport_code: str) -> list[str]:
    """
    Fetch and return a list of destination airports from a given departure airport using Ryanair API.

    Args:
        airport_code (str): The IATA code of the departure airport.

    Returns:
        list[str]: A sorted list of destination airport names.

    Raises:
        RuntimeError: If the API request fails.
    """
    now = time.time()

    # Check cache
    if airport_code in CACHE:
        cached_entry = CACHE[airport_code]
        cache_age = now - cached_entry["timestamp"]

        if cache_age < CACHE_TTL_SECONDS:
            print(f"Using cached data for {airport_code}")
            return cached_entry["data"]

        # Cache expired
        print(f"Cache expired for {airport_code}")
        del CACHE[airport_code]

    # Call external API
    print(f"Calling Ryanair API for {airport_code}") 


    market = "en"  # Market code for English language
    base_url = "https://www.ryanair.com/api/views/locate/searchWidget/routes"
    url = f"{base_url}/{market}/airport/{airport_code}"

    headers = {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "python-requests/2.x"
    }

    # Make GET request to Ryanair API
    response = requests.get(url, headers=headers, timeout=10)

    if response.status_code != 200:
        raise RuntimeError(
            f"Ryanair API error {response.status_code}: {response.text}"
        )

    data = response.json()
    # Extract and sort destination airport names
    list_airports_to = sorted([route["arrivalAirport"]["name"] for route in data])

    # Update cache with timestamp
    CACHE[airport_code] = {

        "data": list_airports_to,
        "timestamp": now
    }

    return list_airports_to