import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Columns, Column } from "./types";
import { useNavigate } from "react-router-dom";
import "./TicketManager.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initialColumns: Columns = {
  todo: {
    id: "todo",
    title: "To Do",
    items: ["Task 1", "Task 2", "Task 3"],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    items: [],
  },
  codeReview: {
    id: "codeReview",
    title: "Code Review",
    items: [],
  },
  done: {
    id: "done",
    title: "Done",
    items: [],
  },
};

const TicketManager: React.FC = () => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const newItems = [...columns[source.droppableId].items];
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...columns[source.droppableId],
        items: newItems,
      };

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: newColumn,
      }));
    } else {
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      sourceItems.splice(source.index, 1);

      const destinationItems = [...destinationColumn.items];
      destinationItems.splice(destination.index, 0, draggableId);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destinationItems,
        },
      }));
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="ticket-manager-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container mt-5">
          <div className="row">
            {Object.values(columns).map((column) => (
              <div key={column.id} className="col">
                <h3 className="column-title">{column.title}</h3>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="column-container"
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="tile"
                            >
                              {item}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TicketManager;
