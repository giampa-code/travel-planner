import './App.css'
import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import RoutesPage from "./pages/Routes"
import About from "./pages/About"
import CounterPage from "./pages/Counter"


/**
 * Main App component for the Travel Planner frontend.
 */
function App() {
  // State for a simple counter (demo feature)
  const [count, setCount] = useState(0)



  return (
    <div>
      
      <div className="app-container">
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Home</Link> |{" "}
          <Link to="/routes">Routes</Link> |{" "}
          <Link to="/counter">Counter</Link> |{" "}
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>


    </div>
  )
}

export default App