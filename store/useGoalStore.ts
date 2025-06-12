import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncStorage } from '../store/asyncStorageAdapter'; // adjust path

export interface Goal {
  name: string;
  area: string;
  xp: number;
}

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  removeGoal: (name: string) => void;
  updateGoal: (oldName: string, updatedGoal: Goal) => void;
}

export const useGoalStore = create<GoalStore>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) =>
        set((state) => ({ goals: [...state.goals, goal] })),
      removeGoal: (name) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.name !== name),
        })),
      updateGoal: (oldName, updatedGoal) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.name === oldName ? updatedGoal : g
          ),
        })),
    }),
    {
      name: 'goal-store',
      storage: asyncStorage,
    }
  )
);
