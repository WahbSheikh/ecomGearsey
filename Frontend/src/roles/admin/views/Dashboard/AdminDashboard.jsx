import React, { useState } from "react";
import { Users, Package, BarChart3, Settings } from "lucide-react";
import TabNavigation from "../../../General/components/Tabs/TabNavigation";
import UsersManagementTab from "./components/UsersManagementTab";
import ListingsManagementTab from "./components/ListingsManagementTab";
import SystemAnalyticsTab from "./components/SystemAnalyticsTab";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

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
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}

export default AdminDashboard;
