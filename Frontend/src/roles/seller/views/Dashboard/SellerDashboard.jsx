import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Package,
  BarChart3,
  Hammer,
  ShoppingCart, // Added
} from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import TabNavigation from "../../../General/components/Tabs/TabNavigation";
import ListingsTab from "./components/ListingsTab";
import SalesTab from "./components/SalesTab";
import AnalyticsTab from "./components/AnalyticsTab";
import AuctionsTab from "./components/AuctionsTab";
import OrdersTab from "./components/OrdersTab"; // Added

function SellerDashboard() {
  const { isPending } = useAuth();
  const [activeTab, setActiveTab] = useState("orders"); // Changed default

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const tabs = [
    { key: "orders", label: "Orders", icon: ShoppingCart },
    { key: "listings", label: "My Listings", icon: Package },
    { key: "auctions", label: "Auctions", icon: Hammer },
    { key: "sales", label: "Sales", icon: TrendingUp },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-8">
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "listings" && <ListingsTab />}
        {activeTab === "auctions" && <AuctionsTab />}
        {activeTab === "sales" && <SalesTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
}

export default SellerDashboard;
