import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { FiFilter, FiSearch, FiGrid, FiList } from "react-icons/fi";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

export default function ProductListings({ products }) {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("Popularity");
  const [viewMode, setViewMode] = useState("grid");

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    );

    return filtered.slice().sort((a, b) => {
      switch (selectedSort) {
        case "Price Low to High":
          return parseFloat(a.price) - parseFloat(b.price);
        case "Price High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Popularity":
          return parseInt(b.popularity) - parseInt(a.popularity);
        default:
          return 0;
      }
    });
  }, [products, searchText, selectedSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Control Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="flex-1 w-full">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl px-3 py-2">
              <FiFilter className="text-gray-500 dark:text-gray-400" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 font-medium focus:ring-0 focus:outline-none cursor-pointer px-2 py-1 rounded"
              >
                {sortList.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredAndSortedProducts.length > 0 ? (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 inline-block mb-6">
            <FiSearch className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No products found
          </h3>
          <button
            onClick={() => {
              setSearchText("");
              setSelectedSort("Popularity");
            }}
            className="mt-4 px-6 py-3 text-white text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light transition-all"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
