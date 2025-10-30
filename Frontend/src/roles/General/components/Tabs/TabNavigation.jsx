import React from "react";

function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="border-b border-border">
      <nav className="flex space-x-8">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${
              activeTab === key
                ? "border-primary-600 text-primary-500"
                : "border-transparent text-font-secondary hover:text-font-main"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default TabNavigation;
