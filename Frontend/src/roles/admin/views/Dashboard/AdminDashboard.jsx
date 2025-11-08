import React, { useState } from "react";
import {
  Users,
  Package,
  BarChart3,
  Settings,
  Shield,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import UsersManagementTab from "./components/UsersManagementTab";
import ListingsManagementTab from "./components/ListingsManagementTab";
import SystemAnalyticsTab from "./components/SystemAnalyticsTab";

function AdminDashboard() {
  const { user, isPending } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden bg-surface-elevated p-4 rounded-lg mb-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Shield className="text-font-main" size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-font-main">Admin Panel</h2>
              <p className="text-xs text-font-secondary truncate max-w-[150px]">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? (
              <X size={24} className="text-font-main" />
            ) : (
              <Menu size={24} className="text-font-main" />
            )}
          </button>
        </div>

        {/* Active Tab Indicator - Mobile */}
        <div className="mt-3 flex items-center gap-2 p-2 bg-surface rounded-lg">
          {activeTabData && (
            <>
              <activeTabData.icon className="text-primary-500" size={18} />
              <span className="text-sm font-medium text-font-main">
                {activeTabData.label}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Sidebar Overlay - Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 lg:w-72 xl:w-80 flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="h-full lg:h-auto card p-4 lg:p-6 lg:sticky lg:top-24 overflow-y-auto">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center gap-3 pb-6 border-b border-border mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Shield className="text-font-main" size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-font-main">Admin Panel</h2>
              <p className="text-xs text-font-secondary truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between mb-4 pb-4 border-b border-border">
            <h3 className="text-lg font-bold text-font-main">Navigation</h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <X size={20} className="text-font-main" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`w-full flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-all duration-200 group ${
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
                  <div className="flex-1 text-left min-w-0">
                    <p
                      className={`font-medium text-sm ${
                        isActive ? "text-font-main" : ""
                      }`}
                    >
                      {tab.label}
                    </p>
                    <p
                      className={`text-xs truncate ${
                        isActive ? "text-font-main/80" : "text-font-secondary"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                  {isActive && (
                    <ChevronRight
                      size={18}
                      className="text-font-main flex-shrink-0"
                    />
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

      {/* Main Content */}
      <main className="flex-1 min-w-0 px-2 sm:px-0">
        {/* Page Header - Desktop Only */}
        <div className="hidden lg:block mb-6">
          <div className="flex items-center gap-3 mb-2">
            {activeTabData && (
              <>
                <activeTabData.icon className="text-primary-500" size={32} />
                <h1 className="text-2xl xl:text-3xl font-bold text-font-main">
                  {activeTabData.label}
                </h1>
              </>
            )}
          </div>
          <p className="text-font-secondary">{activeTabData?.description}</p>
        </div>

        {/* Tab Content */}
        <div className="pb-6">
          {activeTab === "users" && <UsersManagementTab />}
          {activeTab === "listings" && <ListingsManagementTab />}
          {activeTab === "analytics" && <SystemAnalyticsTab />}
          {activeTab === "settings" && (
            <div className="card p-8 lg:p-12 text-center">
              <Settings size={48} className="mx-auto text-border mb-4" />
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
