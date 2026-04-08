// src/components/ui/Tabs.jsx
import React from "react";

export const Tabs = ({ tabs, active, onTabChange }) => {
  return (
    <div className="flex border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-300 ${
            active === tab
              ? "border-lime-500 text-lime-500"
              : "border-transparent text-gray-500 hover:text-lime-400"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};
