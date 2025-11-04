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
    <div className="card p-6 animate-scale-in animate-delay-200">
      <h3 className="text-xl font-bold text-font-main mb-4">Bids by Auction</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#495061" />
          <XAxis
            dataKey="name"
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
          <Bar
            dataKey="bids"
            fill="#D92B2B"
            radius={[8, 8, 0, 0]}
            name="Number of Bids"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BidsChart;
