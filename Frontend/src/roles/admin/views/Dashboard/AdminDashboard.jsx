import React, { useState } from "react";
import { Users, Package, BarChart3, Settings } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import TabNavigation from "../../../General/components/Tabs/TabNavigation";
import UsersManagementTab from "./components/UsersManagementTab";
import ListingsManagementTab from "./components/ListingsManagementTab";
import SystemAnalyticsTab from "./components/SystemAnalyticsTab";

function AdminDashboard() {
  const { isPending } = useAuth();
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
    { key: "users", label: "Users", icon: Users },
    { key: "listings", label: "Listings", icon: Package },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div>
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-8">
        {activeTab === "users" && <UsersManagementTab />}
        {activeTab === "listings" && <ListingsManagementTab />}
        {activeTab === "analytics" && <SystemAnalyticsTab />}
        {activeTab === "settings" && (
          <div className="card p-8 text-center">
            <Settings size={48} className="mx-auto text-border mb-4" />
            <p className="text-font-secondary">Settings coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
