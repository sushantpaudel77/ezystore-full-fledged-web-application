import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBox({ label, placeholder, value, handleSearch }) {
  const handleClear = () => {
    handleSearch("");
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleSearch(event.target.value)}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}