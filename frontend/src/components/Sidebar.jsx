// import { useState } from "react";
// import { useAppStore } from "../store/useAppStore.js";
// import { FiFilter } from "react-icons/fi"; 
// import { HiX } from "react-icons/hi"; 
// const Sidebar = () => {
//   const { selectedCategory, setCategory, selectedFilter, setFilter, selectedDataFields, toggleDataField } = useAppStore();
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [isCategoryOpen, setCategoryOpen] = useState(false);
//   const [isFilterOpen, setFilterOpen] = useState(false);
//   const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false); 
//   const dataOptions = ["name", "number", "email", "socials", "createdAt"];
//   const categories = ["All", "Family", "Friends", "Close Friends", "Work"];
//   const filters = ["A-Z", "Z-A", "Recents"];

//   return (
//     <>
//       {/* Navbar (visible on mobile) */}
//       <div className="md:hidden flex justify-between items-center bg-base-200 p-4">
//         <button onClick={() => setMobileSidebarOpen(true)} className="text-xl">
//           <FiFilter /> 
//         </button>
//       </div>

//       {/* Sidebar (visible on desktop and as a pop-up on mobile) */}
      
//       <div className={`w-64 bg-base-200 h-[calc(100vh-60px)] p-4 border-r border-base-300 shadow-lg flex flex-col space-y-8 md:flex md:w-64 md:h-[calc(100vh-60px)] ${isMobileSidebarOpen ? "fixed inset-0 z-50" : "hidden md:block"}`}>
        
//         {/* Close button for mobile sidebar */}


//         <div className="md:hidden absolute top-4 right-4">
//           <button onClick={() => setMobileSidebarOpen(false)} className="text-3xl text-primary">
//             <HiX /> 
//           </button>
//         </div>

//         {/* Categories */}
      
//         <div className="flex flex-col space-y-2">
//           <h2 
//             className="font-semibold text-lg text-primary cursor-pointer flex justify-between items-center"
//             onClick={() => setCategoryOpen(!isCategoryOpen)}
//           >
//             Categories
//             <span className={`transition-transform ${isCategoryOpen ? "rotate-180" : "rotate-0"}`}>
//               ▼
//             </span>
//           </h2>
//           {isCategoryOpen && (
//             <div className="bg-base-100 border border-base-300 rounded-lg shadow-md p-2 flex flex-col space-y-2">
//               {categories.map((category) => (
//                 <label key={category} className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedCategory === category}
//                     onChange={() => setCategory(category)}
//                     className="checkbox checkbox-primary mb-3"
//                   />
//                   <span className="capitalize">{category}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col space-y-2">
//           <h2 
//             className="font-semibold text-lg text-primary cursor-pointer flex justify-between items-center"
//             onClick={() => setFilterOpen(!isFilterOpen)}
//           >
//             Filters
//             <span className={`transition-transform ${isFilterOpen ? "rotate-180" : "rotate-0"}`}>
//               ▼
//             </span>
//           </h2>
//           {isFilterOpen && (
//             <div className="bg-base-100 border border-base-300 rounded-lg shadow-md p-2 flex flex-col space-y-2">
//               {filters.map((filter) => (
//                 <label key={filter} className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilter === filter}
//                     onChange={() => setFilter(filter)}
//                     className="checkbox checkbox-primary mb-3"
//                   />
//                   <span className="capitalize">{filter}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Data to Display Dropdown */}
//         <div className="flex flex-col space-y-2">
//           <h2 
//             className="font-semibold text-lg text-primary cursor-pointer flex justify-between items-center"
//             onClick={() => setDropdownOpen(!isDropdownOpen)}
//           >
//             Data to Display
//             <span className={`transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}>
//               ▼
//             </span>
//           </h2>
          
//           {isDropdownOpen && (
//             <div className="bg-base-100 border border-base-300 rounded-lg shadow-md p-2 flex flex-col space-y-2">
//               {dataOptions.map((field) => (
//                 <label key={field} className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedDataFields.includes(field)}
//                     onChange={() => toggleDataField(field)}
//                     className="checkbox checkbox-primary mb-3"
//                   />
//                   <span className="capitalize">{field}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../store/useAppStore.js";
import { FiFilter } from "react-icons/fi"; 
import { HiX } from "react-icons/hi"; 

const Sidebar = () => {
  const { selectedCategory, setCategory, selectedFilter, setFilter, selectedDataFields, toggleDataField } = useAppStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false); 

  const categoryRef = useRef(null);
  const filterRef = useRef(null);
  const dropdownRef = useRef(null);

  const dataOptions = ["name", "number", "email", "socials", "createdAt"];
  const categories = ["All", "Family", "Friends", "Close Friends", "Work"];
  const filters = ["A-Z", "Z-A", "Recents"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar (visible on mobile) */}
      <div className="md:hidden flex justify-between items-center bg-base-200 p-4">
        <button onClick={() => setMobileSidebarOpen(true)} className="text-xl">
          <FiFilter /> 
        </button>
      </div>

      {/* Sidebar (visible on desktop and as a pop-up on mobile) */}
      <div className={`w-64 bg-base-200 h-[calc(100vh-60px)] p-4 border-r border-base-300 shadow-lg flex flex-col space-y-8 md:flex md:w-64 md:h-[calc(100vh-60px)] ${isMobileSidebarOpen ? "fixed inset-0 z-50" : "hidden md:block"}`}>
        
        {/* Close button for mobile sidebar */}
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={() => setMobileSidebarOpen(false)} className="text-3xl text-primary">
            <HiX /> 
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-col space-y-2" ref={categoryRef}>
          <h2 
            className="font-semibold text-lg text-primary cursor-pointer flex justify-between items-center"
            onClick={() => setCategoryOpen(!isCategoryOpen)}
          >
            Categories
            <span className={`transition-transform ${isCategoryOpen ? "rotate-180" : "rotate-0"}`}>
              ▼
            </span>
          </h2>
          {isCategoryOpen && (
            <div className="bg-base-100 border border-base-300 rounded-lg shadow-md p-2 flex flex-col space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategory === category}
                    onChange={() => setCategory(category)}
                    className="checkbox checkbox-primary mb-3"
                  />
                  <span className="capitalize">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col space-y-2" ref={filterRef}>
          <h2 
            className="font-semibold text-lg text-primary cursor-pointer flex justify-between items-center"
            onClick={() => setFilterOpen(!isFilterOpen)}
          >
            Filters
            <span className={`transition-transform ${isFilterOpen ? "rotate-180" : "rotate-0"}`}>
              ▼
            </span>
          </h2>
          {isFilterOpen && (
            <div className="bg-base-100 border border-base-300 rounded-lg shadow-md p-2 flex flex-col space-y-2">
              {filters.map((filter) => (
                <label key={filter} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilter === filter}
                    onChange={() => setFilter(filter)}
                    className="checkbox checkbox-primary mb-3"
                  />
                  <span className="capitalize">{filter}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Data to Display Dropdown */}
        <div className="flex flex-col space-y-2" ref={dropdownRef}>
          <h2 
            className="font-semibold text-lg text-primary cursor-pointer flex justify-between items-center"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            Data to Display
            <span className={`transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}>
              ▼
            </span>
          </h2>
          
          {isDropdownOpen && (
            <div className="bg-base-100 border border-base-300 rounded-lg shadow-md p-2 flex flex-col space-y-2">
              {dataOptions.map((field) => (
                <label key={field} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDataFields.includes(field)}
                    onChange={() => toggleDataField(field)}
                    className="checkbox checkbox-primary mb-3"
                  />
                  <span className="capitalize">{field}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
