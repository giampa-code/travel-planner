const API_URL = import.meta.env.VITE_API_URL

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