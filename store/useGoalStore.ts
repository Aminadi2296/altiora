import { create } from 'zustand';

export type Goal = {
  name: string;
  area: string;
  xp: number;
};

type GoalStore = {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  removeGoal: (goalName: string) => void;
};

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  removeGoal: (goalName) => set((state) => ({
    goals: state.goals.filter(goal => goal.name !== goalName),
  })),
}));
