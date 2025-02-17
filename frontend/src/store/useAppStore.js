import { create } from "zustand"; 

export const useAppStore = create((set) => ({
  selectedCategory: "All", // default category
  selectedFilter: "A-Z",   // default filter
  setCategory: (category) => set({ selectedCategory: category }),
  setFilter: (filter) => set({ selectedFilter: filter }),
}));
