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
  ShoppingCart, // Added
} from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import UsersManagementTab from "./components/UsersManagementTab";
import ListingsManagementTab from "./components/ListingsManagementTab";
import SystemAnalyticsTab from "./components/SystemAnalyticsTab";
import OrdersManagementTab from "./components/OrdersManagementTab"; // Added

function AdminDashboard() {
  const { user, isPending } = useAuth();
  const [activeTab, setActiveTab] = useState("orders"); // Changed default
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
      key: "orders",
      label: "Orders & Sales",
      icon: ShoppingCart,
      description: "Manage all orders",
    },
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
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile Header */}
      <div className="lg:hidden bg-surface-elevated p-4 sticky top-0 z-40 shadow-lg border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
              <Shield className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-font-main">Admin Panel</h2>
              <p className="text-xs text-font-secondary truncate max-w-[180px]">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-surface rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? (
              <X size={24} className="text-font-main" />
            ) : (
              <Menu size={24} className="text-font-main" />
            )}
          </button>
        </div>

        {activeTabData && (
          <div className="mt-3 flex items-center gap-2 p-2 bg-surface rounded-lg">
            <activeTabData.icon
              className="text-primary-500 flex-shrink-0"
              size={18}
            />
            <span className="text-sm font-medium text-font-main truncate">
              {activeTabData.label}
            </span>
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col lg:flex-row max-w-[1920px] mx-auto">
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-50 lg:z-10
            w-80 lg:w-72 xl:w-80 flex-shrink-0
            h-screen lg:h-[calc(100vh-2rem)]
            lg:my-4 lg:ml-4
            transform transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="h-full bg-surface-elevated rounded-none lg:rounded-xl border-r lg:border border-border shadow-2xl lg:shadow-md overflow-hidden flex flex-col">
            <div className="hidden lg:flex items-center gap-3 p-6 border-b border-border flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                <Shield className="text-white" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-font-main">
                  Admin Panel
                </h2>
                <p className="text-xs text-font-secondary truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-20 lg:pt-6">
              <div className="lg:hidden flex items-center justify-between mb-4 pb-4 border-b border-border">
                <h3 className="text-lg font-bold text-font-main">Navigation</h3>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                  aria-label="Close Menu"
                >
                  <X size={20} className="text-font-main" />
                </button>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      onClick={() => handleTabChange(tab.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                          : "bg-surface hover:bg-surface-elevated text-font-secondary hover:text-font-main"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={`flex-shrink-0 ${
                          isActive
                            ? "text-white"
                            : "text-font-secondary group-hover:text-primary-500"
                        }`}
                      />
                      <div className="flex-1 text-left min-w-0">
                        <p
                          className={`font-medium text-sm ${
                            isActive ? "text-white" : ""
                          }`}
                        >
                          {tab.label}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            isActive ? "text-white/80" : "text-font-secondary"
                          }`}
                        >
                          {tab.description}
                        </p>
                      </div>
                      {isActive && (
                        <ChevronRight
                          size={18}
                          className="text-white flex-shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-4 lg:p-6">
          <div className="w-full">
            {activeTab === "orders" && <OrdersManagementTab />}
            {activeTab === "users" && <UsersManagementTab />}
            {activeTab === "listings" && <ListingsManagementTab />}
            {activeTab === "analytics" && <SystemAnalyticsTab />}
            {activeTab === "settings" && (
              <div className="bg-surface-elevated rounded-xl border border-border p-8 lg:p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                    <Settings size={32} className="text-font-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-font-main mb-2">
                    Settings
                  </h3>
                  <p className="text-font-secondary">
                    Platform settings and configuration options coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
