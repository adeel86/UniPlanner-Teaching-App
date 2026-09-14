import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialTasks, Task } from '@/data/plannerData';

const TASKS_STORAGE_KEY = 'uniplanner.tasks.v1';

type PlannerContextValue = {
  tasks: Task[];
  toggleTask: (taskId: string) => void;
  resetTasks: () => void;
};

const PlannerContext = createContext<PlannerContextValue | undefined>(undefined);

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    AsyncStorage.getItem(TASKS_STORAGE_KEY)
      .then((savedTasks) => {
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks) as Task[]);
        }
      })
      .catch(() => {
        // The app remains usable with sample tasks if local storage is unavailable.
      });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks)).catch(() => {
      // Persistence is best effort in this introductory local-data milestone.
    });
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      toggleTask: (taskId: string) => {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        );
      },
      resetTasks: () => setTasks(initialTasks),
    }),
    [tasks],
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used inside PlannerProvider');
  }
  return context;
}