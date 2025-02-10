import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function TaskList() {
  const { tasks } = useTaskContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); 
  const openEditModal = (task: Task) => {
    setTaskToEdit(task); 
    setModalOpen(true); 
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} openEditModal={openEditModal} />
        ))}
      </ul>
      <TaskModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}
