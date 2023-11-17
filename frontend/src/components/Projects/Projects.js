import React, { useContext, useMemo } from 'react';
//import { useState, useEffect } from "react";
import './Projects.css';
import ProjectContext from '../../store/projectContext/projectContext';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project: { projectName, id } }) => (
  <Link to={`/home/${id}`} style={{ textDecoration: 'none' }}>
    <div className="project-card">
      <h3>{projectName}</h3>
      <p>description</p>
    </div>
  </Link>
);

function Projects() {
  const { projects } = useContext(ProjectContext);

  const projectComponents = useMemo(
    () =>
      projects.map((project) => <ProjectCard key={`project-${project.id}`} project={project} />),
    [projects],
  );

  return (
    <div>
      <h2>Lista projektów:</h2>
      <div className="project-grid">{projectComponents}</div>
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
