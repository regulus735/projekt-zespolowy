import React, { useState } from "react";
import "./Columns.css";
import AddItem from "../AddItem/AddItem";

function Columns(props) {
  const [editItem, setEditItem] = useState(null);
  const [editedContent1, setEditedContent1] = useState("");
  const [editedContent2, setEditedContent2] = useState("");
  const [editedContent3, setEditedContent3] = useState("");
  const [editingColumnIndex, setEditingColumnIndex] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [columns, setColumns] = useState([
    { title: "To do", items: [] },
    { title: "In progress", items: [] },
    { title: "Review", items: [] },
    { title: "Done", items: [] },
  ]);

  const handleAddItem = (content, columnIndex) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      const itemIndex = updatedColumns[columnIndex].items.indexOf(content);
      //console.log(content);
      if (itemIndex === -1) {
        //console.log(itemIndex);
        updatedColumns[columnIndex].items.push(content);
      }

      return updatedColumns;
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (e, columnIndex) => {
    const value = e.dataTransfer.getData("text/plain-item");
    const id = e.dataTransfer.getData("text/plain-columnindex");
    const parsedArray = JSON.parse(value);
    //console.log(value + "  " + columnIndex + "  " + id);
    //console.log(parsedArray);
    if (+id !== +columnIndex) {
      setColumns((prevColumns) => {
        const updatedColumns = [...prevColumns];
        const prevColumnIndex = +id;

        // Znajdź indeks elementu w poprzedniej kolumnie
        const itemIndex =
          updatedColumns[prevColumnIndex].items.indexOf(parsedArray);

        console.log(itemIndex);

        if (itemIndex === -1) {
          // Usuń element z poprzedniej kolumny
          updatedColumns[prevColumnIndex].items.splice(itemIndex, 1);
          // Dodaj element do aktualnej kolumny
          handleAddItem(parsedArray, columnIndex);
        }

        return updatedColumns;
      });
    }
  };

  const editHandler = (item1, item2, item3, index, colIndex) => {
    setEditItem({ item1, item2, item3, index, colIndex });
    setEditedContent1(item1);
    setEditedContent2(item2);
    setEditedContent3(item3);
    setEditingColumnIndex(colIndex);
    setEditingItem(index);
  };

  const saveChanges = () => {
    if (editItem) {
      const { index, colIndex } = editItem;
      const updatedColumns = [...columns];
      updatedColumns[colIndex].items[index] = [
        editedContent1,
        editedContent2,
        editedContent3,
      ];
      setColumns(updatedColumns);
      // Wyczyść stany edycji
      setEditItem(null);
      setEditedContent1("");
      setEditedContent2("");
      setEditedContent3("");
    }
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
              e.dataTransfer.setData("text/plain-columnindex", columnIndex);
            }}
          >
            <h2>{column.title}</h2>
            {column.items.map((item, index) => (
              <div
                key={index}
                className="newTile"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    "text/plain-item",
                    JSON.stringify(item)
                  );
                  e.dataTransfer.setData("text/plain-index", index);
                }}
              >
                {item[0]}
                <br />
                {item[1]}
                <br />
                {item[2]}
                <br />
                {editItem &&
                  columnIndex === editingColumnIndex &&
                  index === editingItem && (
                    <form>
                      <input
                        type="text"
                        value={editedContent1}
                        onChange={(e) => setEditedContent1(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedContent2}
                        onChange={(e) => setEditedContent2(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedContent3}
                        onChange={(e) => setEditedContent3(e.target.value)}
                      />
                      <br />
                      <button onClick={saveChanges}>Save</button>
                    </form>
                  )}

                <button
                  onClick={() =>
                    editHandler(item[0], item[1], item[2], index, columnIndex)
                  }
                >
                  Edit
                </button>
              </div>
            ))}

            <AddItem
              onAddItem={(content) => handleAddItem(content, columnIndex)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Columns;
