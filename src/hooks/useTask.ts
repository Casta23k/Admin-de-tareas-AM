import { useLocalStorage } from "./useLocalStorage";
import { Task } from "../types/Task";

export function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const addTask = (title: string, description: string, status: "pending" | "completed") => {
    setTasks([...tasks, { id: crypto.randomUUID(), title, description, completed: status === "completed" }]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}
