import React from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ orders, emptyMessage = "No orders found" }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
