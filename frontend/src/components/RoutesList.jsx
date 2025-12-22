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