import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import './Home.css';
import Columns from './Columns/Columns';
import ProjectContext from '../../store/projectContext/projectContext';

const Home = (props) => {
  const { getTasks } = useContext(ProjectContext);

  const params = useParams();
  const projectId = params?.id || localStorage.getItem('projectId');

  useEffect(() => {
    if (!projectId) return;

    getTasks(projectId);
    localStorage.setItem('projectId', projectId);
  }, [projectId]);

  if (projectId) return <Columns />;

  return (
    <div className="link-wrapper">
      <Link to="/projects" className="projects-link">
        Select project from the project list
      </Link>
    </div>
  );
};

export default Home;
