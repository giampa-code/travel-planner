import './App.css'
import { useState, useRef } from "react"
import { getRoutesFromAirport } from "./services/api"
import AirportForm from "./components/AirportForm"
import RoutesList from "./components/RoutesList"
import ErrorMessage from "./components/ErrorMessage"

function App() {

  const [count, setCount] = useState(0)
  const [destinations, setDestinations] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const cache = useRef({})

  const loadRoutes = async (airport) => {
    if (cache.current[airport]) {
      console.log("📦 Usando cache para:", airport)
      setDestinations(cache.current[airport])
      return
    }
    console.log("🌐 Llamando al backend para:", airport)
    try {
      setLoading(true)
      setError(null)

      const data = await getRoutesFromAirport(airport)
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

      <div className="counter-section">
        <p>Contador: {count}</p>
        <button onClick={() => setCount((count + 1) * 2)}>
          Incrementar
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

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