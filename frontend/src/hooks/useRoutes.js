import { useState, useRef } from "react"
import { getRoutesFromAirport } from "../services/api"

/**
 * Main App component for the Travel Planner frontend.
 *
 * This component manages the state for the application, including route searching,
 * caching, and UI rendering.
 * This is used to separate route-related logic from the main App component.
*/
export function useRoutes() {
  // State for storing flight destinations
  const [destinations, setDestinations] = useState([])
  // State for error messages
  const [error, setError] = useState(null)
  // State for loading indicator
  const [loading, setLoading] = useState(false)
  // Ref for caching API responses to avoid redundant calls
  const cache = useRef({})

  /**
   * Loads flight routes from a specified airport.
   * Uses caching to optimize performance for repeated queries.
   *
   * @param {string} airport - The IATA code of the airport.
   */
  const loadRoutes = async (airport) => {
    // Check if data is already cached
    if (cache.current[airport]) {
      console.log("📦 Using cache for:", airport)
      setDestinations(cache.current[airport])
      return
    }
    console.log("🌐 Calling backend for:", airport)
    try {
      setLoading(true)
      setError(null)

      // Fetch data from API
      const data = await getRoutesFromAirport(airport)
      // Cache the response
      cache.current[airport] = data.destinations
      setDestinations(data.destinations)

    } catch (err) {
      setError(err.message)
      setDestinations([])
    } finally {
      setLoading(false)
    }
  }

  return { destinations, loading, error, loadRoutes }
}
