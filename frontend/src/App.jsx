
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from "react"

function App() {

  //defino estado aeropuerto
  const [airport_from, setAirportFrom] = useState("")
  //solo para el contador
  const [count, setCount] = useState(0);

  const [airports_to, setAirportsTo] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

  const url = new URL(
      "https://super-potato-rw76jxp775w3pv-8000.app.github.dev/api/ryanair/list_rutes_from_airport_query"
    )

    if (airport_from) {
      url.searchParams.append("airport_from", airport_from)
    }

    const response = await fetch(url)
    const data = await response.json()
    setAirportsTo(data)
  }
  

  /*
  useEffect(() => {
    fetch("https://super-potato-rw76jxp775w3pv-8000.app.github.dev/api/ryanair/list_rutes_from_airport_query/")
      .then(res => res.json())
      .then(data => setAirportsTo(data));
  }, []);
  */
   

  return (
    <div>
      <h1>Travel Planner</h1>
      <p>Frontend funcionando 🚀</p>

      <div>
        <p>Contador: {count}</p>
        <button onClick={() => setCount((count + 1) * 2)}>
          Incrementar
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      <div>
        <h1>Buscar rutas desde aeropuerto</h1>

        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={airport_from}
          onChange={(e) => setAirportFrom(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>
        <h2>Rutas:</h2>
        <ul>
          {airports_to.map((airport, index) => (    
            <li key={index}>{airport}</li>
          ))}
        </ul>
      </div>



    </div>
  )
}

export default App