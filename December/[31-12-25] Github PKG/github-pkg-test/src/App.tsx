import { Card } from "@swapnilgupta14/custom-card-ui";

function App() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "10rem" }}>
        <h1>Testing the package</h1>

        <Card
          backgroundColor="#000000"
          padding="2rem"
          shadow="0 4px 12px rgba(0,0,0,0.1)"
          style={{color: "#fff"}}
        >
          <h2>Custom Card</h2>
          <p>This is a custom styled card</p>
        </Card>

        <Card
          backgroundColor="#FF0000"
          padding="2rem"
          shadow="0 4px 12px rgba(0,0,0,0.1)"
          style={{color: "#fff"}}
        >
          <h2>Custom Card</h2>
          <p>This is a custom styled card</p>
        </Card>

        <Card
          backgroundColor="#f0f4ff"
          padding="2rem"
          shadow="0 4px 12px rgba(0,0,0,0.1)"
        >
          <h2>Custom Card</h2>
          <p>This is a custom styled card</p>
        </Card>

      </div>
    </>
  )
}

export default App
