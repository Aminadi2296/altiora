import { create } from 'zustand';

interface Area {
  name: string;
  xp: number;
  color: string;
}

interface AreaStore {
  areas: Area[];
  addArea: (name: string) => void;
  updateAreaXP: (areaName: string, deltaXP: number) => void;
}

export const predefinedColors = [
  '#FF5733', // Red-Orange
  '#33B5FF', // Blue
  '#33FF57', // Green
  '#FFC300', // Yellow
  '#A569BD', // Purple
  '#FF33A6', // Pink
  '#33FFF6', // Cyan
  '#F39C12', // Orange
  '#34495E', // Dark Blue-Gray
  '#2ECC71', // Light Green
];

let colorIndex = 0;

export const useAreaStore = create<AreaStore>((set, get) => ({
  areas: [
    { name: 'Health', xp: 70, color: predefinedColors[0] },
    { name: 'Career', xp: 40, color: predefinedColors[1] },
    { name: 'Learning', xp: 20, color: predefinedColors[2] },
    { name: 'Family', xp: 90, color: predefinedColors[3] },
  ],
  addArea: (name: string) => {
    const color = predefinedColors[colorIndex % predefinedColors.length];
    colorIndex++;

    const newArea: Area = {
      name,
      xp: 10,
      color,
    };

    set((state) => ({
      areas: [...state.areas, newArea],
    }));
  },

  updateAreaXP: (areaName: string, deltaXP: number) =>
  set((state) => ({
    areas: state.areas.map((area) =>
      area.name === areaName
        ? { ...area, xp: Math.max(0, area.xp + deltaXP) } // no negative XP
        : area
    ),
  })),
}));
