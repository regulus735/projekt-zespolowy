import React, { useContext, useMemo, useState } from 'react';
import './Columns.css';
import AddItem from '../AddItem/AddItem';
import ProjectContext from '../../../store/projectContext/projectContext';

const Item = ({ item, index }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { projects, users, editTask } = useContext(ProjectContext);

  const projectsList = useMemo(() => {
    const projectId = localStorage.getItem('projectId');

    return projects.map(({ id, projectName }) => (
      <option key={`project-item-${id}`} value={id} selected={+projectId === id}>
        {projectName}
      </option>
    ));
  }, [projects]);

  const usersList = useMemo(
    () =>
      users.map(({ id, userName }) => (
        <option key={`user-item-${id}`} value={id}>
          {userName}
        </option>
      )),
    [users],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
      if (!value) return;
    }

    data.UserIds = [data.UserId];

    editTask({ updatedTask: data, taskId: item.id });

    setIsEditMode(false);

    e.target.reset();
  };

  return (
    <div
      className="newTile"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain-item', JSON.stringify(item));
        e.dataTransfer.setData('text/plain-index', index);
      }}>
      Task: {item.taskName}
      <br />
      Project: {item.projectId}
      <br />
      User: {item.users?.[0].userName}
      <br />
      {isEditMode && (
        <div className="form-modal">
          <form method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              name="TaskName"
              placeholder="Task name"
              defaultValue={item.taskName}
            />
            <input
              type="text"
              name="TaskDescription"
              placeholder="Description"
              defaultValue={item.taskDescription}
            />
            <div>
              <label htmlFor="project">Project: </label>
              <select name="ProjectId" id="project">
                {projectsList}
              </select>
            </div>

            <div>
              <label htmlFor="user">User: </label>
              <select name="UserId" id="user">
                {usersList}
              </select>
            </div>
            <br />
            <div style={{ display: 'flex', columnGap: 10 }}>
              <button type="submit">Save</button>
              <button onClick={() => setIsEditMode(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <button onClick={() => setIsEditMode(true)}>Edit</button>
    </div>
  );
};

function Columns(props) {
  const { columns, changeTaskStatus } = useContext(ProjectContext);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (e, columnIndex) => {
    const value = e.dataTransfer.getData('text/plain-item');
    const task = JSON.parse(value);
    const prevColumnIndex = e.dataTransfer.getData('text/plain-columnindex');

    if (+prevColumnIndex === +columnIndex) return;

    changeTaskStatus({ task, status: columnIndex });
  };

  return (
    <>
      <div className="columns-container">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="column"
            onDrop={(e) => handleOnDrop(e, columnIndex)}
            onDragOver={handleDragOver}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain-columnindex', columnIndex);
            }}>
            <h2>{column.title}</h2>
            {column.items.map((item, index) => (
              <Item index={index} key={item.id} item={item} />
            ))}
            <AddItem columnIndex={columnIndex} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Columns;
