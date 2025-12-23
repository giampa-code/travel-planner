import './App.css'
import { useState, useRef } from "react"
import { getRoutesFromAirport } from "./services/api"
import AirportForm from "./components/AirportForm"
import RoutesList from "./components/RoutesList"
import ErrorMessage from "./components/ErrorMessage"

/**
 * Main App component for the Travel Planner frontend.
 *
 * This component manages the state for the application, including route searching,
 * caching, and UI rendering.
 */
function App() {
  // State for a simple counter (demo feature)
  const [count, setCount] = useState(0)
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

  return (
    <div>
      <h1>Travel Planner</h1>
      <p>Frontend funcionando 🚀</p>

      {/* Demo counter section */}
      <div className="counter-section">
        <p>Contador: {count}</p>
        <button onClick={() => setCount((count + 1) * 2)}>
          Incrementar
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      {/* Route search section */}
      <div className="search-section">
        <h1>Buscar rutas desde aeropuerto</h1>

        <AirportForm onSearch={loadRoutes} />

        {loading && <p>Cargando...</p>}
        <ErrorMessage message={error} />

        <h2>Rutas:</h2>

        <RoutesList destinations={destinations} />
      </div>

    </div>
  )
}

export default App