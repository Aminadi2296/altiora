import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncStorage } from '../store/asyncStorageAdapter';
interface Area {
  name: string;
  xp: number;
  color: string;
}

interface AreaStore {
  areas: Area[];
  addArea: (name: string) => void;
  updateAreaXP: (areaName: string, deltaXP: number) => void;
  removeArea: (name: string) => void;
  updateAreaName: (oldName: string, newName: string) => void;
}

export const predefinedColors = [
  '#faa307', // Red-Orange
  '#08427a', // Blue
  '#ef233c', // Red
  '#4895ef', // Blue-Gray
  '#ffd670', // Yellow
  '#219ebc', // Turquoise
  '#7678ed', // Purple
  '#F39C12', // Orange
  '#ff8fab', // Pink
  '#2ECC71', // Light Green
];

export const useAreaStore = create<AreaStore>()(
  persist(
    (set, get) => ({
      areas: [
        { name: 'Health', xp: 10, color: predefinedColors[0] },
        { name: 'Career', xp: 10, color: predefinedColors[1] },
      ],

      addArea: (name: string) => {
        const usedColors = new Set(get().areas.map((a) => a.color));
        const availableColor =
          predefinedColors.find((c) => !usedColors.has(c)) || '#ccc';

        const newArea: Area = {
          name: name.trim(),
          xp: 10,
          color: availableColor,
        };

        set((state) => ({
          areas: [...state.areas, newArea],
        }));
      },

      updateAreaXP: (areaName: string, deltaXP: number) =>
        set((state) => ({
          areas: state.areas.map((area) =>
            area.name.trim().toLowerCase() === areaName.trim().toLowerCase()
              ? { ...area, xp: Math.max(0, area.xp + deltaXP) }
              : area
          ),
        })),

      removeArea: (name: string) =>
        set((state) => ({
          areas: state.areas.filter(
            (area) =>
              area.name.trim().toLowerCase() !== name.trim().toLowerCase()
          ),
        })),

      updateAreaName: (oldName: string, newName: string) =>
        set((state) => ({
          areas: state.areas.map((area) =>
            area.name.trim().toLowerCase() === oldName.trim().toLowerCase()
              ? { ...area, name: newName.trim() }
              : area
          ),
        })),
    }),
    {
      name: 'area-store', // Storage key
      storage: asyncStorage,
    }
  )
);
