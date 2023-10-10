import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      navigate("/ticket-manager");
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Stylizacja komunikatu modalnego
  const customModalStyles = {
    content: {
      width: "300px", // Dostosuj szerokość komunikatu
      height: "150px",
      fontSize: "20px",
      margin: "auto", // Wyśrodkuj komunikat na ekranie
      padding: "20px", // Dodaj wewnętrzny padding
      border: "none", // Usuń obramowanie
      borderRadius: "10px", // Dodaj zaokrąglenie rogów
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Dodaj cień
    },
  };

  return (
    <div className="bg">
      <div className="container-login">
        <img src="./src/Photos/logo.png" alt="Logo" className="logo" />
        <div className="login-form">
          <form>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleLogin}>
              Log in
            </button>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Nieprawidłowe dane logowania"
        ariaHideApp={false}
        style={customModalStyles} // Użyj dostosowanych stylów
      >
        <p style={{ marginBottom: "10px", textAlign: "center" }}>
          Nieprawidłowa nazwa użytkownika lub hasło
        </p>
        <button onClick={closeModal} style={{ fontSize: "20px" }}>
          Zamknij
        </button>
      </Modal>
    </div>
  );
};

export default LoginPage;
