import React from "react";

const Navbar = ({ searchQuery, setSearchQuery, setSidebarOpen }) => {
  return (
    <div className="w-screen h-[80px] bg-white border-b border-gray-300 flex items-center justify-between px-8 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <h1 className="font-bold text-[25px] text-gray-800">pixisphere</h1>
        <i className="ri-star-smile-fill text-3xl text-yellow-500"></i>
      </div>

      {/* Search Input */}
      <div className="w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name, location, or tag..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Right-side: Filter Button */}
      <div className="w-40 flex justify-end">
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-blue-400 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          Filters
        </button>
      </div>
    </div>
  );
};

export default Navbar;
