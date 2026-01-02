"""
Service module for interacting with Ryanair API.

This module provides functions to fetch flight route data from Ryanair's public API.

Redis cache, with a TTL of 60 minutes, is used to minimize redundant API calls.
"""

import json
import requests
from threading import Lock
from app.core.redis import redis_client


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

    cache_key = f"routes:{airport_code}"

    # Try Redis cache
    cached_data = redis_client.get(cache_key)
    if cached_data:
            print(f"Using Redis cache for {airport_code}")
            return json.loads(cached_data)

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
    destinations = sorted([route["arrivalAirport"]["name"] for route in data])

    # Store result in Redis with TTL
    redis_client.setex(
        cache_key,
        CACHE_TTL_SECONDS,
        json.dumps(destinations)
    )

    return destinations