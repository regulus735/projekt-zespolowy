import React, { useState } from "react";
import "./AddItem.css";

function AddItem({ onAddItem }) {
  const [showForm, setShowForm] = useState(false);
  const [newItemContent1, setNewItemContent1] = useState("");
  const [newItemContent2, setNewItemContent2] = useState("");
  const [newItemContent3, setNewItemContent3] = useState("");
  const [addItemButton, setAddItemButton] = useState("Add Item");

  const handleShowForm = () => {
    setShowForm(true);
    setAddItemButton("");
  };

  const handleHideForm = () => {
    setShowForm(false);
    setAddItemButton("Add Item");
  };

  const handleInputChange1 = (e) => {
    setNewItemContent1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setNewItemContent2(e.target.value);
  };

  const handleInputChange3 = (e) => {
    setNewItemContent3(e.target.value);
  };

  const handleAddItem = () => {
    if (newItemContent1 && newItemContent2 && newItemContent3) {
      // Przykład: dodawanie nowych elementów do tablicy
      const newItem = [];
      newItem.push("Task: " + newItemContent1);
      newItem.push("Project: " + newItemContent2);
      newItem.push("User: " + newItemContent3);

      onAddItem(newItem);
      setNewItemContent1("");
      setNewItemContent2("");
      setNewItemContent3("");
      setShowForm(false);
      setAddItemButton("Add Item");
    }
  };

  return (
    <div className="add-item">
      {showForm && (
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Task"
            value={newItemContent1}
            onChange={handleInputChange1}
          />
          <input
            type="text"
            placeholder="Project"
            value={newItemContent2}
            onChange={handleInputChange2}
          />
          <input
            type="text"
            placeholder="User"
            value={newItemContent3}
            onChange={handleInputChange3}
          />

          <button onClick={handleAddItem}>OK</button>
          <button onClick={handleHideForm}>Cancel</button>
        </div>
      )}
      <div className="add-item-button">
        {addItemButton === "Add Item" && (
          <button onClick={handleShowForm}>{addItemButton}</button>
        )}
      </div>
    </div>
  );
}

export default AddItem;
