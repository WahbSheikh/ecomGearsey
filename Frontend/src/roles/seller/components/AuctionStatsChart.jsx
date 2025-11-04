import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#31C769", "#37CDB2", "#F8BA00", "#E1423E"];

const AuctionStatsChart = ({ data }) => {
  return (
    <div className="card p-6 animate-scale-in">
      <h3 className="text-xl font-bold text-font-main mb-4">
        Auction Status Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ status, count, percent }) =>
              `${status}: ${count} (${(percent * 100).toFixed(0)}%)`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AuctionStatsChart;
