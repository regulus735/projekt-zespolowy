import { useState } from "react";
import TicketManager from "./TicketManager";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <TicketManager />
    </div>
  );
}

export default App;
