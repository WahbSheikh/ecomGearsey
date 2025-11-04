import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BidsChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Bids by Auction</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280" }}
            tickLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis tick={{ fill: "#6b7280" }} tickLine={{ stroke: "#e5e7eb" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Bar
            dataKey="bids"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
            name="Number of Bids"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BidsChart;
