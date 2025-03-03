import { create } from "zustand";

export const useFormulaStore = create((set) => ({
  formula: [],
  setFormula: (formula) => set({ formula }),
}));
