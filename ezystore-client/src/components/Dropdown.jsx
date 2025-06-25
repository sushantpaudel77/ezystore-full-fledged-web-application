import React from "react";

const Dropdown = ({ label, options, selectedValue, handleSort }) => {
  return (
    <div className="flex items-center gap-2 justify-end pr-12 flex-1 font-primary">
      <label className="text-lg font-semibold text-primary">{label}</label>
      <select
      value={selectedValue}
      onChange={(e) => handleSort(e.target.value)}
        className="px-3 py-2 text-base border rounded-md transition
        border-primary focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
      >
        {options.map((optionVal, index) => (
          <option key={index} value={optionVal}>
            {optionVal}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
