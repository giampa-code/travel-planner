/**
 * RoutesList component for displaying flight destinations.
 *
 * Renders a list of destination cities or a message if none are available.
 *
 * @param {string[]} destinations - Array of destination city names.
 */
export default function RoutesList({ destinations }) {
  if (destinations.length === 0) {
    return <p>No hay destinos para mostrar</p>
  }

  return (
    <ul>
      {destinations.map((city, index) => (
        <li key={index}>✈️ {city}</li>
      ))}
    </ul>
  )
}