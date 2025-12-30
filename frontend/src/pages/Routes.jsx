import AirportForm from "../components/AirportForm"
import RoutesList from "../components/RoutesList"
import ErrorMessage from "../components/ErrorMessage"
import Spinner from "../components/Spinner"
import { useRoutes } from "../hooks/useRoutes"

export default function RoutesPage() {
  const { destinations, loading, error, loadRoutes } = useRoutes()

  return (
    <div className="search-section">
        <h1>Buscar rutas desde aeropuerto</h1>

        <AirportForm onSearch={loadRoutes} disabled={loading}/>

        {loading && <Spinner />}

        <ErrorMessage message={error} />

        <h2>Rutas:</h2>

        <RoutesList destinations={destinations} />
    </div>
  )
}