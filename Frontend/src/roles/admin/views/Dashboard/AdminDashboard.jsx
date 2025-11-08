import React, { useState } from "react";
import {
  Users,
  Package,
  BarChart3,
  Settings,
  Shield,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import UsersManagementTab from "./components/UsersManagementTab";
import ListingsManagementTab from "./components/ListingsManagementTab";
import SystemAnalyticsTab from "./components/SystemAnalyticsTab";

function AdminDashboard() {
  const { user, isPending } = useAuth();
  const [activeTab, setActiveTab] = useState("users");

  // ✅ Show loading state
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const tabs = [
    {
      key: "users",
      label: "Users Management",
      icon: Users,
      description: "Manage all users",
    },
    {
      key: "listings",
      label: "Listings Management",
      icon: Package,
      description: "Manage all listings",
    },
    {
      key: "analytics",
      label: "System Analytics",
      icon: BarChart3,
      description: "View platform metrics",
    },
    {
      key: "settings",
      label: "Settings",
      icon: Settings,
      description: "Platform settings",
    },
  ];

  const activeTabData = tabs.find((tab) => tab.key === activeTab);

  return (
    <div className="flex gap-6 min-h-screen">
      {/* Sidebar - Left Column */}
      <aside className="w-80 flex-shrink-0">
        <div className="card p-6 sticky top-24">
          {/* Admin Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-border mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Shield className="text-font-main" size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-font-main">Admin Panel</h2>
              <p className="text-xs text-font-secondary">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-font-main shadow-lg"
                      : "bg-surface hover:bg-surface-elevated text-font-secondary hover:text-font-main"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      isActive
                        ? "text-font-main"
                        : "text-font-secondary group-hover:text-primary-500"
                    }
                  />
                  <div className="flex-1 text-left">
                    <p
                      className={`font-medium text-sm ${
                        isActive ? "text-font-main" : ""
                      }`}
                    >
                      {tab.label}
                    </p>
                    <p
                      className={`text-xs ${
                        isActive ? "text-font-main/80" : "text-font-secondary"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                  {isActive && (
                    <ChevronRight size={18} className="text-font-main" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs font-semibold text-font-secondary uppercase tracking-wider mb-3">
              Quick Stats
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-surface rounded-lg">
                <span className="text-xs text-font-secondary">
                  Active Users
                </span>
                <span className="text-sm font-bold text-font-main">-</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface rounded-lg">
                <span className="text-xs text-font-secondary">
                  Total Listings
                </span>
                <span className="text-sm font-bold text-font-main">-</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface rounded-lg">
                <span className="text-xs text-font-secondary">
                  Active Auctions
                </span>
                <span className="text-sm font-bold text-font-main">-</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content - Right Column */}
      <main className="flex-1 min-w-0">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {activeTabData && (
              <>
                <activeTabData.icon className="text-primary-500" size={32} />
                <h1 className="text-3xl font-bold text-font-main">
                  {activeTabData.label}
                </h1>
              </>
            )}
          </div>
          <p className="text-font-secondary">{activeTabData?.description}</p>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "users" && <UsersManagementTab />}
          {activeTab === "listings" && <ListingsManagementTab />}
          {activeTab === "analytics" && <SystemAnalyticsTab />}
          {activeTab === "settings" && (
            <div className="card p-12 text-center">
              <Settings size={64} className="mx-auto text-border mb-4" />
              <h3 className="text-xl font-bold text-font-main mb-2">
                Settings
              </h3>
              <p className="text-font-secondary">
                Platform settings coming soon
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
