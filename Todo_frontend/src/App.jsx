import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import MainButton from "./Components/MainButton/MainButton.jsx";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./Components/ItemCard/ItemCard.jsx";
import AddItemForm from "./Components/AddItemForm/AddItemForm.jsx";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import WelcomeBanner from "./Components/WelcomeBanner/WelcomeBanner.jsx";
import ItemDetails from "./Components/ItemDetails/ItemDetails.jsx";

import {
  fetchTasks,
  postTask,
  deleteTask,
  completeTask,
} from "./reducers/tasksSlice";
import {
  fetchGoals,
  postGoal,
  deleteGoal,
  completeGoal,
} from "./reducers/goalsSlice";

function App() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);
  const goals = useSelector((state) => state.goals);

  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState("tasks");

  // NUEVO ESTADO: 'pending' (por defecto) o 'completed'
  const [filterMode, setFilterMode] = useState("pending");

  // Estado para la tarea/meta seleccionada para ver detalles
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Cargar los datos basados en el viewMode
    if (viewMode === "tasks") {
      dispatch(fetchTasks());
    } else {
      dispatch(fetchGoals());
    }
  }, [dispatch, viewMode]);

  // Manejadores de CRUD

  const handleRemoveItem = (id) => {
    if (viewMode === "tasks") dispatch(deleteTask(id));
    else dispatch(deleteGoal(id));
    // Cierra el modal después de eliminar
    setSelectedItem(null);
  };

  const handleAddItem = (item) => {
    if (viewMode === "tasks") dispatch(postTask(item));
    else dispatch(postGoal(item));
    setShowForm(false);
  };

  const handleCompleteItem = (id) => {
    if (viewMode === "tasks") dispatch(completeTask(id));
    else dispatch(completeGoal(id));

    // Cierra el modal si se completa desde la vista de pendientes, ya que desaparecerá
    if (filterMode === "pending" && selectedItem && selectedItem._id === id) {
      setSelectedItem(null);
    }
  };

  // Manejador de UI

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  // Lógica para cambiar el modo de filtro (Pendientes <-> Completadas)
  const toggleFilterMode = () => {
    setFilterMode(filterMode === "pending" ? "completed" : "pending");
  };

  // Lógica de Datos

  const allItems = viewMode === "tasks" ? tasks : goals;

  // LÓGICA DE FILTRADO: Muestra la lista basada en el filterMode actual
  const filteredItems = allItems.filter((item) => {
    if (filterMode === "pending") {
      return !item.completed; // Mostrar solo si NO está completado
    } else if (filterMode === "completed") {
      return item.completed; // Mostrar solo si SÍ está completado
    }
    return true;
  });

  // Conteo para el Dashboard (siempre usa el array completo)
  const totalPending = allItems.filter((item) => !item.completed).length;
  const totalCompleted = allItems.filter((item) => item.completed).length;
  const total = allItems.length;

  return (
    <div className="MainContainer">
      {/* NAVBAR */}
      <Navigation viewMode={viewMode} setViewMode={setViewMode} />

      {/* BANNER */}
      <WelcomeBanner viewMode={viewMode} />

      {/* DASHBOARD */}
      <Dashboard
        viewMode={viewMode}
        totalPending={totalPending}
        totalCompleted={totalCompleted}
        total={total}
      />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="ToDoContainer">
        {/* BOTÓN PARA MÓVIL (Añadir) */}
        <div className="d-md-none w-100 mb-3">
          <MainButton onClick={() => setShowForm(true)}>
            {viewMode === "tasks" ? "Add Task" : "Add Goal"}
          </MainButton>
        </div>

        {/* FORMULARIO DESKTOP */}
        <div className="FormContainer">
          <AddItemForm
            labelName="Title"
            placeholderName="Write title here"
            labelDescription="Description"
            placeholderDescription="Add a description"
            labelDueDate="Due date"
            onAddItem={handleAddItem}
            viewMode={viewMode}
          />
        </div>

        {/* MODAL PARA AÑADIR (Móvil) */}
        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#000" }}>
              {viewMode === "tasks" ? "Add Task" : "Add Goal"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddItemForm
              labelName="Title"
              placeholderName="Write title here"
              labelDescription="Description"
              placeholderDescription="Add a description"
              labelDueDate="Due date"
              onAddItem={handleAddItem}
              viewMode={viewMode}
            />
          </Modal.Body>
        </Modal>

        {/* LISTA DE ITEMS */}
        <div className="ItemCardContainer">
          {/* BOTÓN DE FILTRO Y TÍTULO DE LA LISTA */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 style={{ color: "white" }}>
              {filterMode === "pending" ? "Pending List" : "Completed List"}
            </h3>
            <MainButton onClick={toggleFilterMode} variant="primary">
              View {filterMode === "pending" ? "Completed" : "Pending"}
            </MainButton>
          </div>

          {filteredItems.length === 0 ? (
            <p style={{ color: "white", marginTop: "1rem" }}>
              No {viewMode === "tasks" ? "tasks" : "goals"} {filterMode}. Add a
              new one!
            </p>
          ) : (
            filteredItems.map((item) => (
              <ItemCard
                key={item._id || item.id}
                id={item._id || item.id}
                titleName={item.name}
                description={item.description}
                titleDate="Due Date"
                date={item.dueDate}
                completed={item.completed} // Pasamos el estado de completado
                cardClassName={`card-blue ${item.completed ? "completed" : ""}`}
                // Manejador de clic para abrir detalles
                onClick={() => handleCardClick(item)}
              />
            ))
          )}
        </div>
      </div>

      {/* MODAL DE DETALLES DE TAREA/META */}
      <Modal show={!!selectedItem} onHide={handleCloseDetails}>
        <Modal.Header closeButton className="bg-dark border-secondary">
          <Modal.Title style={{ color: "white" }}>
            {viewMode === "tasks" ? "Task Details" : "Goal Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          {selectedItem && (
            <ItemDetails
              item={selectedItem}
              // Manejadores que cierran el modal si es necesario
              onDelete={() => {
                handleRemoveItem(selectedItem._id);
                handleCloseDetails();
              }}
              onComplete={() => {
                handleCompleteItem(selectedItem._id);
              }}
              viewMode={viewMode}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
