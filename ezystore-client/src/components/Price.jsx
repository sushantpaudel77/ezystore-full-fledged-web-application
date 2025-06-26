import React from "react";

export default function Price({ currency, price, className = "" }) {
  // Format price with 2 decimal places if it's a number
  const formattedPrice = typeof price === 'number' 
    ? price.toFixed(2)
    : price;

  return (
    <span className={`inline-flex items-baseline font-medium ${className}`}>
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {currency}
      </span>
      <span className="ml-0.5 text-lg font-bold text-gray-900 dark:text-white">
        {formattedPrice}
      </span>
    </span>
  );
}