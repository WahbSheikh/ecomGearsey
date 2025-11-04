import React from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ orders, emptyMessage = "No orders found" }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-surface rounded-xl border border-border">
        <p className="text-font-secondary text-lg italic">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <div
          key={order._id}
          className={`animate-slide-up animate-delay-${Math.min(
            index * 100,
            900
          )}`}
        >
          <OrderCard order={order} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
