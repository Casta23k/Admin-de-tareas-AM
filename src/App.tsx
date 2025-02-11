import { useState } from "react";
import TaskModal from "./components/TaskModal";
import TaskTabs from "./components/TaskTabs";
import { TaskProvider } from "./context/TaskContext";
import "./index.css";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <TaskProvider>
      <div className="flex flex-col items-center min-h-screen bg-amber-100 p-5">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Administrador de Tareas AM
        </h1>

        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-600 transition mb-4"
          onClick={() => setModalOpen(true)}
        >
          + Agregar Tarea
        </button>

        <TaskTabs />

        <TaskModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
      </div>
    </TaskProvider>
  );
}
