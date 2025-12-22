export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div style={{
      background: "#ffe6e6",
      color: "#900",
      padding: "10px",
      marginTop: "10px",
      borderRadius: "5px"
    }}>
      ⚠️ {message}
    </div>
  )
}