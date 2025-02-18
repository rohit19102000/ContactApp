import { create } from "zustand";

export const useAppStore = create((set) => ({
  selectedCategory: "All",
  setCategory: (category) => set({ selectedCategory: category }),

  selectedFilter: "A-Z",
  setFilter: (filter) => set({ selectedFilter: filter }),

  selectedDataFields: ["name", "number", "email", "socials", "createdAt"], 
  toggleDataField: (field) =>
    set((state) => ({
      selectedDataFields: state.selectedDataFields.includes(field)
        ? state.selectedDataFields.filter((f) => f !== field)
        : [...state.selectedDataFields, field],
    })),
}));
