import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import { Task } from "../types/Task"; 

export default function TaskTabs() {
  const { tasks } = useTaskContext();
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openEditModal = (task: Task) => {  
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      
      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 text-white px-6 py-3 rounded mb-6"
      >
        + Agregar Tarea
      </button>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"}`}
        >
          Finalizadas
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No hay tareas en esta categoría.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} openEditModal={openEditModal} />
          ))}
        </ul>
      )}

      <TaskModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} taskToEdit={taskToEdit} />
    </div>
  );
}
