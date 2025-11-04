import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Package,
  BarChart3,
  Hammer,
} from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import TabNavigation from "../../../General/components/Tabs/TabNavigation";
import ListingsTab from "./components/ListingsTab";
import SalesTab from "./components/SalesTab";
import AnalyticsTab from "./components/AnalyticsTab";
import AuctionsTab from "./components/AuctionsTab"; // NEW

function SellerDashboard() {
  const { isPending } = useAuth();
  const [activeTab, setActiveTab] = useState("listings");

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const tabs = [
    { key: "listings", label: "My Listings", icon: DollarSign },
    { key: "auctions", label: "Auctions", icon: Hammer }, // NEW TAB
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
        {activeTab === "auctions" && <AuctionsTab />} {/* NEW */}
        {activeTab === "sales" && <SalesTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
}

export default SellerDashboard;
