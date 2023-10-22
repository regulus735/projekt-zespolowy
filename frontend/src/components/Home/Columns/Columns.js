import React, { useState } from "react";
import "./Columns.css";
import AddItem from "../AddItem/AddItem";

function Columns() {
  const [columns, setColumns] = useState([
    { title: "To do", items: [] },
    { title: "In progress", items: [] },
    { title: "Review", items: [] },
    { title: "Done", items: [] },
  ]);

  const handleAddItem = (content, columnIndex) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[columnIndex].items.push(content);
      return updatedColumns;
    });
  };

  return (
    <div className="columns-container">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="column">
          <h2>{column.title}</h2>
          <AddItem
            onAddItem={(content) => handleAddItem(content, columnIndex)}
          />
          <ul>
            {column.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Columns;
