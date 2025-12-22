import { useState } from "react"

export default function AirportForm({ onSearch }) {
  const [airport, setAirport] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(airport)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Código aeropuerto (MAD)"
        value={airport}
        onChange={(e) => setAirport(e.target.value)}
        maxLength={3}
      />
      <button type="submit">Buscar rutas</button>
    </form>
  )
}