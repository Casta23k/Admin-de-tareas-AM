import { useState, useCallback } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import { Task } from "../types/Task";

export default function TaskList() {
  const { tasks } = useTaskContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openEditModal = useCallback((task: Task) => {
    setTaskToEdit(task);
    setModalOpen(true);
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto p-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No hay tareas disponibles.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} openEditModal={openEditModal} />
          ))}
        </ul>
      )}

      <TaskModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </section>
  );
}
