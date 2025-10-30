import React from "react";
import { Save, Globe, Bell, Shield, Database } from "lucide-react";

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-font-main">System Settings</h2>

      {/* General Settings */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="text-primary-500" size={24} />
          <h3 className="text-lg font-semibold text-font-main">
            General Settings
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-font-main font-medium mb-2">
              Site Name
            </label>
            <input
              type="text"
              defaultValue="Gearsey"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-font-main font-medium mb-2">
              Site Description
            </label>
            <textarea
              rows={3}
              defaultValue="Buy and sell gear with confidence"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="text-warning-500" size={24} />
          <h3 className="text-lg font-semibold text-font-main">
            Notification Settings
          </h3>
        </div>
        <div className="space-y-3">
          {[
            "Email notifications for new users",
            "Email notifications for reports",
            "Push notifications enabled",
          ].map((setting, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-font-main">{setting}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-success-500" size={24} />
          <h3 className="text-lg font-semibold text-font-main">
            Security Settings
          </h3>
        </div>
        <div className="space-y-3">
          {[
            "Two-factor authentication required",
            "Session timeout (30 minutes)",
            "IP whitelist enabled",
          ].map((setting, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={i === 1}
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-font-main">{setting}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Database Settings */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="text-error-500" size={24} />
          <h3 className="text-lg font-semibold text-font-main">
            Database Management
          </h3>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary">Backup Database</button>
          <button className="btn-secondary">Clear Cache</button>
          <button className="btn-secondary text-error-500">
            Reset Statistics
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2">
          <Save size={18} />
          Save All Changes
        </button>
      </div>
    </div>
  );
}

export default SettingsTab;
