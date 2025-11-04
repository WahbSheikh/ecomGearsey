import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ data }) => {
  return (
    <div className="card p-6 animate-scale-in animate-delay-100">
      <h3 className="text-xl font-bold text-font-main mb-4">
        Sales & Revenue Trends
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#495061" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#B8BFCB" }}
            tickLine={{ stroke: "#495061" }}
          />
          <YAxis tick={{ fill: "#B8BFCB" }} tickLine={{ stroke: "#495061" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2F3340",
              border: "1px solid #495061",
              borderRadius: "0.5rem",
              color: "#F4F6FA",
            }}
          />
          <Legend
            wrapperStyle={{
              color: "#F4F6FA",
            }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#37CDB2"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            name="Total Sales"
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#31C769"
            strokeWidth={3}
            name="Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
