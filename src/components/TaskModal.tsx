import { useEffect, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/Task";

interface TaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  taskToEdit?: Task | null;
}

export default function TaskModal({ isOpen, closeModal, taskToEdit }: TaskModalProps) {
  const { addTask, updateTask } = useTaskContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "completed">("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setStatus(taskToEdit.completed ? "completed" : "pending");
      } else {
        setTitle("");
        setDescription("");
        setStatus("pending");
      }
      setError("");
    }
  }, [isOpen, taskToEdit]); 

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setError("Título y Descripción son obligatorios.!!!");
      return;
    }

    const taskData: Task = {
      id: taskToEdit ? taskToEdit.id : crypto.randomUUID(),
      title,
      description,
      completed: status === "completed",
    };

    taskToEdit ? updateTask(taskData.id, taskData) : addTask(taskData);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 bg-opacity-80 backdrop-blur-sm transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 w-96 transform transition-all scale-95 hover:scale-100">
        <h2 className="text-lg font-bold mb-3 text-gray-700">{taskToEdit ? "Editar Tarea" : "Nueva Tarea"}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <input
          className="w-full p-2 border rounded-lg mb-3 focus:ring focus:ring-orange-300 outline-none"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Título de la tarea"
        />
        <textarea
          className="w-full p-2 border rounded-lg mb-3 focus:ring focus:ring-orange-300 outline-none"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Descripción de la tarea"
        />

        <label className="block mb-2 text-gray-700 font-semibold">Estatus</label>
        <select
          className="w-full p-2 border rounded-lg mb-3 focus:ring focus:ring-orange-300 outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value as "pending" | "completed")}
          aria-label="Estatus de la tarea"
        >
          <option value="pending">Pendiente</option>
          <option value="completed">Finalizada</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button onClick={handleSubmit} className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition">
            {taskToEdit ? "Actualizar" : "Guardar"}
          </button>
          <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
