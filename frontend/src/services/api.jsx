// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL

/**
 * Fetches flight routes from a specified airport via the backend API.
 *
 * @param {string} airport - The IATA code of the airport.
 * @returns {Promise<Object>} Promise resolving to the API response data.
 * @throws {Error} If the API request fails.
 */
export async function getRoutesFromAirport(airport) {
  const url = new URL(`${API_URL}/api/routes/from-airport`)
  url.searchParams.append("airport", airport)

  const response = await fetch(url)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Error fetching routes")
  }

  return response.json()
}