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
  '#faa307', // Red-Orange
  '#08427a', // Blue
  '#4895ef', // Blue-Gray
  '#ffd670', // Yellow
  '#219ebc', // Turquoise
  '#7678ed', // Purple
  '#ef233c', // Red
  '#F39C12', // Orange
  '#ff8fab', // Pink
  '#2ECC71', // Light Green
];

export const useAreaStore = create<AreaStore>((set, get) => ({
  areas: [
    { name: 'Health', xp: 70, color: predefinedColors[0] },
    { name: 'Career', xp: 40, color: predefinedColors[1] },
    { name: 'Learning', xp: 20, color: predefinedColors[2] },
    { name: 'Family', xp: 90, color: predefinedColors[3] },
  ],

  addArea: (name: string) => {
    set((state) => {
      const usedColors = new Set(state.areas.map((a) => a.color));
      const availableColor =
        predefinedColors.find((c) => !usedColors.has(c)) || '#ccc';

      const newArea: Area = {
        name: name.trim(),
        xp: 10,
        color: availableColor,
      };

      return {
        areas: [...state.areas, newArea],
      };
    });
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
