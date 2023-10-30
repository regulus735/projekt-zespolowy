import React from "react";
//import { useState, useEffect } from "react";
import "./Projects.css";

function Projects() {
  const projects = [
    { id: 1, name: "Projekt A", description: "Opis projektu A" },
    { id: 2, name: "Projekt B", description: "Opis projektu B" },
    { id: 3, name: "Projekt C", description: "Opis projektu C" },
    { id: 4, name: "Projekt D", description: "Opis projektu D" },
    { id: 5, name: "Projekt E", description: "Opis projektu E" },
  ];

  return (
    <div>
      <h2>Lista projektów:</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

/*
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wysyłamy żądanie do backendu, aby pobrać projekty
    fetch("http://localhost:8080/api/projects") // Zmień URL na odpowiedni
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd sieciowy lub błąd serwera");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.projects); // Zakładamy, że odpowiedź zawiera pole "projects" z tablicą projektów
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania projektów:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Ładowanie projektów...</p>;
  }
  */
