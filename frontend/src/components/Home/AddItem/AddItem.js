import React, { useState } from "react";
import "./AddItem.css";

function AddItem({ onAddItem }) {
  const [showForm, setShowForm] = useState(false);
  const [newItemContent, setNewItemContent] = useState("");

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHideForm = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setNewItemContent(e.target.value);
  };

  const handleAddItem = () => {
    if (newItemContent) {
      onAddItem(newItemContent);
      setNewItemContent("");
      setShowForm(false);
    }
  };

  return (
    <div className="add-item">
      {showForm && (
        <div className="add-item-form">
          <input
            type="text"
            placeholder="New Item"
            value={newItemContent}
            onChange={handleInputChange}
          />
          <button onClick={handleAddItem}>OK</button>
          <button onClick={handleHideForm}>Cancel</button>
        </div>
      )}
      <div className="add-item-button">
        <button onClick={handleShowForm}>Add Item</button>
      </div>
    </div>
  );
}

export default AddItem;
