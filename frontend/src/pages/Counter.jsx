

import { useState } from 'react'

export default function CounterPage() {
    const [count, setCount] = useState(0)
    return (
        <div className="counter-section">
            <p>Contador: {count}</p>
            <button onClick={() => setCount((count + 1) * 2)}>
            Incrementar
            </button>
            <button onClick={() => setCount(0)}>
            Reset
            </button>
        </div>
    )
}