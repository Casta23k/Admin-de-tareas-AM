import { createContext, useContext, useEffect, useState } from "react";
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task: Task) {
    setTasks([...tasks, task]);
  }

  function updateTask(id: string, updatedTask: Task) {
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  }

  function toggleTaskCompletion(id: string) {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }


  function deleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, toggleTaskCompletion, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook para usar el contexto
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext debe usarse dentro de un TaskProvider");
  }
  return context;
}
