import { useState } from "react"
import { AIRPORTS } from "../data/airports"

export default function AirportForm({ onSearch }) {
  const [airport, setAirport] = useState("")
  const [error, setError] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const validate = () => {
    if (!airport) return "El código es obligatorio"
    if (!/^[A-Za-z]{3}$/.test(airport)) {
      return "Debe tener 3 letras (ej: MAD)"
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setShowSuggestions(false)
    onSearch(airport.toUpperCase())
  }

  const handleChange = (value) => {
    setAirport(value)
    setShowSuggestions(value.length > 0)
  }

  const handleSelect = (code) => {
    setAirport(code)
    setShowSuggestions(false)
  }

  const suggestions =
    showSuggestions
      ? AIRPORTS
          .filter(a => a.startsWith(airport.toUpperCase()))
          .slice(0, 5)
      : []

  return (
    <div style={{ position: "relative", width: "250px" }}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Código aeropuerto (MAD)"
          value={airport}
          onChange={(e) => handleChange(e.target.value)}
          maxLength={3}
          style={{ width: "100%" }}
        />
        <button type="submit">Buscar rutas</button>
      </form>

      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "38px",
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            listStyle: "none",
            padding: 0,
            margin: 0,
            zIndex: 10
          }}
        >
          {suggestions.map(code => (
            <li
              key={code}
              onClick={() => handleSelect(code)}
              style={{
                padding: "8px",
                cursor: "pointer"
              }}
            >
              {code}
            </li>
          ))}
        </ul>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}