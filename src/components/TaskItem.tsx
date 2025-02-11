import { useTaskContext } from "../context/TaskContext";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  openEditModal: (task: Task) => void;
}

export default function TaskItem({ task, openEditModal }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();

  return (
    <li
      className={`p-4 rounded shadow mb-2 border flex flex-col space-y-4
      ${task.completed ? "bg-amber-200 border-amber-300" : "bg-yellow-100 border-yellow-300"}`}
    >
      <div className="space-y-2">
        <h3
          className={`text-lg font-bold ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-gray-700">{task.description}</p>
      </div>

      <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded text-sm"
          onClick={() => openEditModal(task)}
        >
          Editar
        </button>
        <button
          className={`px-4 py-2 rounded text-white text-sm ${
            task.completed ? "bg-blue-500" : "bg-green-500"
          }`}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded text-sm"
          onClick={() => deleteTask(task.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
