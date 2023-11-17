import React, { useContext } from 'react';
import './Columns.css';
import AddItem from '../AddItem/AddItem';
import ProjectContext from '../../../store/projectContext/projectContext';

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

  const handleEdit = () => {
    // TODO: open edit modal or go to edit page
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
              <div
                key={index}
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
                <button onClick={handleEdit}>Edit</button>
              </div>
            ))}

            <AddItem columnIndex={columnIndex} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Columns;
