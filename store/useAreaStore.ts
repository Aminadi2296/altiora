import { create } from 'zustand';

interface Area {
  name: string;
  xp: number;
}

interface AreaStore {
  areas: Area[];
  addArea: (name: string) => void;
}

export const useAreaStore = create<AreaStore>((set) => ({
  areas: [
    { name: 'Health', xp: 70 },
    { name: 'Career', xp: 40 },
    { name: 'Learning', xp: 20 },
    { name: 'Family', xp: 90 },
  ],
  addArea: (name) =>
    set((state) => ({
      areas: [...state.areas, { name, xp: 0 }],
    })),
}));
