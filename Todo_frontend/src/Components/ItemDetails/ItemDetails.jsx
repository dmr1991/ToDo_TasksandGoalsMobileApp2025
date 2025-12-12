import React from "react";
import CustomButton from "../MainButton/MainButton"; // Asegúrate de que este sea el componente de botón correcto
import "./ItemDetails.scss";

const ItemDetails = ({ item, onDelete, onComplete, viewMode }) => {
  const formattedDate = item.dueDate
    ? new Date(item.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const itemTypeLabel = viewMode === "tasks" ? "Task" : "Goal";

  return (
    <div className="ItemDetails" style={{ color: "#ffffff" }}>
      <h4>{item.name}</h4>
      <hr />

      <p>
        <strong>Description:</strong> {item.description}
      </p>
      <p>
        <strong>Due Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Type:</strong> {item.type}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {item.completed ? "Completed ✅" : "Pending ⏳"}
      </p>

      <div className="button-container d-flex justify-content-between mt-4">
        <CustomButton variant="danger" onClick={onDelete}>
          Remove {itemTypeLabel}
        </CustomButton>

        {!item.completed && (
          <CustomButton variant="success" onClick={onComplete}>
            Mark as Completed
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
