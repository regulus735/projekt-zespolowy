import React, { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash';
import {
  ADD_TASK_URL,
  EDIT_TASK_URL,
  GET_PROJECTS_URL,
  GET_TASKS_URL,
  GET_USERS_URL,
  INIT_COLUMNS,
  UPDATE_TASK_STATUS_URL,
} from './projectContext.constants';

const ProjectContext = React.createContext({
  projects: [],
  users: [],
  columns: INIT_COLUMNS,
  getTasks: (id) => {},
  addTask: (task) => {},
  changeTaskStatus: ({ task, status }) => {},
  editTask: ({ updatedTask, taskId }) => {},
});

export const ProjectContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState(INIT_COLUMNS);

  const handleGetProjects = async () => {
    const response = await fetch(GET_PROJECTS_URL);
    setProjects(await response.json());
  };

  const handleGetUsers = async () => {
    const response = await fetch(GET_USERS_URL);
    setUsers(await response.json());
  };

  const getTasks = async (id) => {
    const response = await fetch(`${GET_TASKS_URL}/${id}`);

    if (response.status === 404) return setColumns(INIT_COLUMNS);

    const data = await response.json();

    const grouped = _.groupBy(data, (item) => item.taskStatus);
    const newColumns = INIT_COLUMNS.map((column, index) => ({
      ...column,
      items: grouped[index] ?? [],
    }));

    setColumns(newColumns);
  };

  const addTask = async (data) => {
    const response = await fetch(ADD_TASK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const task = await response.json();

    setColumns((prev) => {
      const updatedColumns = [...prev];
      updatedColumns[task.taskStatus].items.push(task);

      return updatedColumns;
    });
  };

  const changeTaskStatus = async ({ task, status }) => {
    const response = await fetch(`${UPDATE_TASK_STATUS_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ TaskStatus: status }),
    });

    const updatedTask = await response.json();

    setColumns((prev) => {
      const updatedColumns = [...prev];
      updatedColumns[task.taskStatus].items = updatedColumns[task.taskStatus].items.filter(
        ({ id }) => id !== task.id,
      );

      updatedColumns[updatedTask.taskStatus].items.push({ ...updatedTask, users: task.users });

      return updatedColumns;
    });
  };

  const editTask = async ({ updatedTask, taskId }) => {
    const response = await fetch(`${EDIT_TASK_URL}/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    setColumns((prev) => {
      const updatedColumns = [...prev];
      const foundIndex = updatedColumns[data.taskStatus].items.findIndex(({ id }) => id === taskId);

      if (foundIndex === -1) return updatedColumns;

      updatedColumns[data.taskStatus].items[foundIndex] = data;

      return updatedColumns;
    });
  };

  useEffect(() => {
    handleGetProjects();
    handleGetUsers();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, users, getTasks, columns, addTask, changeTaskStatus, editTask }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
