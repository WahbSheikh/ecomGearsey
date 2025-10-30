import React, { useState } from "react";
import { DollarSign, TrendingUp, Package, BarChart3 } from "lucide-react";
import TabNavigation from "../../../General/components/Tabs/TabNavigation";
import ListingsTab from "./components/ListingsTab";
import SalesTab from "./components/SalesTab";
import AnalyticsTab from "./components/AnalyticsTab";
// import OrdersTab from "./tabs/OrdersTab";

function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("listings");

  const tabs = [
    { key: "listings", label: "My Listings", icon: DollarSign },
    { key: "sales", label: "Sales", icon: TrendingUp },
    { key: "orders", label: "Orders", icon: Package },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div>
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-8">
        {activeTab === "listings" && <ListingsTab />}
        {activeTab === "sales" && <SalesTab />}
        {/* {activeTab === "orders" && <OrdersTab />} */}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
}

export default SellerDashboard;
