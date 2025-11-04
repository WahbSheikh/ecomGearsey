import React from "react";
import { DollarSign, TrendingUp, Package } from "lucide-react";
import { useAppContext } from "../../../../../config/context/AppContext";

function SalesTab() {
  const { state } = useAppContext();

  // Mock sales data - replace with actual data from context
  const totalSales = state.userListings?.filter((l) => l.sold)?.length || 0;
  const totalRevenue =
    state.userListings
      ?.filter((l) => l.sold)
      ?.reduce((sum, l) => sum + (l.price || l.currentBid || 0), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Total Sales</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">
                {totalSales}
              </h3>
            </div>
            <Package className="text-primary-500" size={32} />
          </div>
        </div>

        <div className="card p-6 animate-slide-up animate-delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">
                ${totalRevenue.toFixed(2)}
              </h3>
            </div>
            <DollarSign className="text-success-500" size={32} />
          </div>
        </div>

        <div className="card p-6 animate-slide-up animate-delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-font-secondary text-sm">Avg. Sale Price</p>
              <h3 className="text-2xl font-bold text-font-main mt-1">
                $
                {totalSales > 0
                  ? (totalRevenue / totalSales).toFixed(2)
                  : "0.00"}
              </h3>
            </div>
            <TrendingUp className="text-warning-500" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div>
        <h2 className="text-xl font-semibold text-font-main mb-4">
          Recent Sales
        </h2>
        <div className="card p-6">
          {totalSales > 0 ? (
            <div className="space-y-4">
              {state.userListings
                ?.filter((l) => l.sold)
                ?.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between bg-surface-elevated rounded-lg p-4 border border-border"
                  >
                    <div>
                      <h3 className="font-semibold text-font-main">
                        {sale.title}
                      </h3>
                      <p className="text-font-secondary text-sm">
                        Sold for ${sale.price || sale.currentBid}
                      </p>
                    </div>
                    <span className="text-success-500 font-semibold">
                      Completed
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-font-secondary italic text-center py-8">
              No sales yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesTab;
