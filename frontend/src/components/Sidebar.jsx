import { useAppStore } from "../store/useAppStore.js";

const Sidebar = () => {
  const { selectedCategory, setCategory, selectedFilter, setFilter } = useAppStore();

  return (
    <div className="w-64 bg-base-200 h-[calc(100vh-60px)] p-4 border-r border-base-300 shadow-lg flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-lg text-primary">Categories</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="All">All</option>
          <option value="Family">Family</option>
          <option value="Friends">Friends</option>
          <option value="Close Friends">Close Friends</option>
          <option value="Work">Work</option>
        </select>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-lg text-primary">Filters</h2>
        <select
          value={selectedFilter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Recents">Recents</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
