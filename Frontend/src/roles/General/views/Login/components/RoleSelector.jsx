import React from "react";
import { ROLES } from "../utils/constants";

function RoleSelector({ selectedRole, onRoleChange }) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Join as
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {ROLES.map((role) => {
          const IconComponent = role.icon;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onRoleChange(role.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedRole === role.id
                  ? "border-orange-500 bg-orange-500/10 text-orange-400"
                  : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
              }`}
              title={role.description}
            >
              <IconComponent className="h-8 w-8 mx-auto mb-2" />
              <div className="text-sm font-medium">{role.name}</div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        {ROLES.find((role) => role.id === selectedRole)?.description}
      </p>
    </div>
  );
}

export default RoleSelector;
