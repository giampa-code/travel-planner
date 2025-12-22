import requests

def get_routes_from_airport(airport_code: str) -> list[str]:
    market = "en"
    base_url = "https://www.ryanair.com/api/views/locate/searchWidget/routes"
    url = f"{base_url}/{market}/airport/{airport_code}"

    headers = {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "python-requests/2.x"
    }

    response = requests.get(url, headers=headers, timeout=10)

    if response.status_code != 200:
        raise RuntimeError(
            f"Ryanair API error {response.status_code}: {response.text}"
        )

    data = response.json()
    list_airports_to = sorted([route["arrivalAirport"]["name"] for route in data])
    return list_airports_to