import CustomButton from "../MainButton/MainButton";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./AddItemForm.scss";

function AddItemForm({
  labelName = "Name",
  placeholderName = "Enter name",
  labelDescription = "Description",
  placeholderDescription = "Enter description",
  labelDueDate = "Due Date",
  onAddItem,
  viewMode,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskType, setTaskType] = useState("work"); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription || !taskDueDate || !taskType) {
      alert("Please fill in all fields.");
      return;
    }

    const newItem = {
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
      type: taskType, 
    };

    onAddItem(newItem);

    // clean form
    setTaskName("");
    setTaskDescription("");
    setTaskDueDate("");
    setTaskType("work");
  };

  return (
    <Form className="mainForm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>{labelName}</Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholderName}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>{labelDescription}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={placeholderDescription}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDueDate">
        <Form.Label>{labelDueDate}</Form.Label>
        <Form.Control
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
      </Form.Group>

      {/* NEW SELECT FIELD */}
      <Form.Group className="mb-3" controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        >
          <option value="work">Work</option>
          <option value="home">Home</option>
          <option value="business">Business</option>
        </Form.Select>
      </Form.Group>

      <div className="mt-3 d-flex justify-content-center">
        <CustomButton type="submit">
          {viewMode === "tasks" ? "Add Task" : "Add Goal"}
        </CustomButton>
      </div>
    </Form>
  );
}

export default AddItemForm;
