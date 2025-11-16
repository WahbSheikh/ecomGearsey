import React from "react";
import { ROLES } from "../utils/constants";
import { AlertCircle, Lock } from "lucide-react";

function RoleSelector({
  selectedRole,
  onRoleChange,
  adminExists,
  isCheckingAdmin,
}) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Join as
      </h3>

      {/* Loading indicator while checking admin */}
      {isCheckingAdmin && (
        <div className="mb-4 text-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-400 text-xs mt-2">Checking availability...</p>
        </div>
      )}

      {/* Admin exists warning */}
      {adminExists && !isCheckingAdmin && (
        <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-orange-400 text-xs">
            <AlertCircle size={14} className="flex-shrink-0" />
            <p>
              Admin role is not available - an admin already exists on the
              platform
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {ROLES.map((role) => {
          const IconComponent = role.icon;
          const isDisabled = role.id === "admin" && adminExists;

          return (
            <div key={role.id} className="relative">
              <button
                type="button"
                onClick={() => !isDisabled && onRoleChange(role.id)}
                disabled={isDisabled || isCheckingAdmin}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                  isDisabled
                    ? "border-gray-700 bg-gray-800/50 text-gray-600 cursor-not-allowed opacity-50"
                    : isCheckingAdmin
                    ? "border-gray-600 bg-gray-700 text-gray-400 cursor-wait"
                    : selectedRole === role.id
                    ? "border-orange-500 bg-orange-500/10 text-orange-400"
                    : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
                }`}
                title={
                  isDisabled
                    ? "Admin account already exists"
                    : isCheckingAdmin
                    ? "Checking availability..."
                    : role.description
                }
              >
                <IconComponent className="h-6 w-6 mx-auto mb-2" />
                <div className="text-xs font-medium">{role.name}</div>

                {/* Lock icon for disabled admin */}
                {isDisabled && (
                  <Lock className="h-3 w-3 mx-auto mt-1 text-gray-600" />
                )}
              </button>

              {/* Alert badge for disabled admin */}
              {isDisabled && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg">
                  <Lock size={10} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Error message when admin is selected but exists */}
      {adminExists && selectedRole === "admin" && !isCheckingAdmin && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg animate-shake">
          <p className="text-red-400 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle size={14} />
            Admin already exists. Please choose Customer or Seller.
          </p>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-3">
        {ROLES.find((role) => role.id === selectedRole)?.description}
      </p>
    </div>
  );
}

export default RoleSelector;
