import { create } from 'zustand';

export interface Goal {
  name: string;
  area: string;
  xp: number;
}

interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  removeGoal: (name: string) => void;
  updateGoal?: (oldName: string, updatedGoal: Goal) => void; // <-- add this!
}

export const useGoalStore = create<GoalStore>((set) => ({
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
}));
