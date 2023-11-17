import React, { useContext, useMemo, useState } from 'react';
import './AddItem.css';
import ProjectContext from '../../../store/projectContext/projectContext';

function AddItem({ columnIndex }) {
  const [showForm, setShowForm] = useState(false);
  const [addItemButton, setAddItemButton] = useState('Add Item');

  const { projects, users, addTask } = useContext(ProjectContext);

  const handleShowForm = () => {
    setShowForm(true);
    setAddItemButton('');
  };

  const handleHideForm = () => {
    setShowForm(false);
    setAddItemButton('Add Item');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      TaskStatus: columnIndex,
    };

    for (const [key, value] of formData.entries()) {
      data[key] = value;
      if (!value) return;
    }

    data.UserIds = [data.UserId];

    addTask(data);

    setShowForm(false);
    setAddItemButton('Add Item');

    e.target.reset();
  };

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

  return (
    <div className="add-item">
      {showForm && (
        <form className="add-item-form" method="post" onSubmit={handleSubmit}>
          <input name="TaskName" type="text" placeholder="Task name" />

          <input type="text" placeholder="Description" name="TaskDescription" />

          <div>
            <label htmlFor="project">Project</label>
            <select name="ProjectId" id="project">
              {projectsList}
            </select>
          </div>

          <div>
            <label htmlFor="user">User</label>
            <select name="UserId" id="user">
              {usersList}
            </select>
          </div>

          <button type="submit">OK</button>
          <button onClick={handleHideForm}>Cancel</button>
        </form>
      )}
      <div className="add-item-button">
        {addItemButton === 'Add Item' && <button onClick={handleShowForm}>{addItemButton}</button>}
      </div>
    </div>
  );
}

export default AddItem;
