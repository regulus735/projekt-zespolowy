import { useState } from "react";
import TicketManager from "./TicketManager";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/ticket-manager" element={<TicketManager />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
