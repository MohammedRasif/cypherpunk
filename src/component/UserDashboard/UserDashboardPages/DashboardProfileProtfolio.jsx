"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";

export default function DashboardProfileProtfolio() {
  const [timeRange, setTimeRange] = useState("1m");

  const investmentTrendData = [
    { date: "10/03/2025", cost: 30 },
    { date: "", cost: 10 },
    { date: "", cost: 20 },
    { date: "", cost: 25 },
    { date: "", cost: 20 },
    { date: "", cost: 40 },
    { date: "", cost: 60 },
    { date: "", cost: 32 },
    { date: "", cost: 40 },
    { date: "", cost: 66 },
    { date: "", cost: 72 },
    { date: "", cost: 34 },
    { date: "", cost: 20 },
    { date: "", cost: 39 },
    { date: "17/03/2025", cost: 75 },
  ];

  // Allocation Data
  const portfolioBreakdown = [
    { name: "Tesla", percentage: 24.4, color: "#3B82F6" },
    { name: "Tesla", percentage: 24.4, color: "#8B5CF6" },
    { name: "Tesla", percentage: 24.4, color: "#EC4899" },
    { name: "Tesla", percentage: 24.4, color: "#EF4444" },
    { name: "Tesla", percentage: 24.4, color: "#F97316" },
  ];

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto">
        {/* Asset Report Section */}
        <div className="bg-white rounded-lg mb-8 ">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Asset report
          </h2>

          {/* Percentage Display */}
          <div className="mb-6">
            <div className="text-5xl font-bold text-green-500 mb-2">39.38%</div>
            <div className="text-sm text-gray-600">
              Today's PNL %{" "}
              <span className="text-green-500 font-semibold">15.6%</span>
            </div>
          </div>

          {/* Time Range Buttons */}
          <div className="flex gap-3 mb-6">
            {["7D", "1m", "3m", "1Y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  timeRange === range
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={investmentTrendData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", r: 0 }}
                activeDot={{ r: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Allocation Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">
            Allocation
          </h2>

          <div className="flex gap-12">
            <div className="flex-shrink-0 relative w-40 h-40">
              <div className="absolute inset-0">
                {portfolioBreakdown.map((item, index) => {
                  const total = portfolioBreakdown.reduce(
                    (sum, i) => sum + i.percentage,
                    0
                  );
                  const startAngle = portfolioBreakdown
                    .slice(0, index)
                    .reduce((sum, i) => sum + (i.percentage / total) * 360, 0);
                  const segmentAngle = (item.percentage / total) * 360;
                  // Add gap by reducing segment angle
                  const gapSize = 5;
                  const adjustedAngle = segmentAngle - gapSize;
                  const adjustedStart = startAngle + gapSize / 2;

                  const lighterColor = item.color + "4D";

                  return (
                    <div
                      key={index}
                      className="absolute inset-0"
                      style={{
                        transform: `rotate(${adjustedStart}deg)`,
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `conic-gradient(
                          ${lighterColor} 0deg,
                          ${item.color} ${adjustedAngle * 0.05}deg,
                          ${item.color} ${adjustedAngle * 0.1}deg,
                          ${item.color} ${adjustedAngle * 0.95}deg,
                          ${lighterColor} ${adjustedAngle}deg,
                          transparent ${adjustedAngle}deg
                        )`,
                          clipPath: "circle(35% at 50% 50%)",
                          WebkitMaskImage:
                            "radial-gradient(circle, transparent 0%, transparent 33%, black 33%, black 100%)",
                          maskImage:
                            "radial-gradient(circle, transparent 0%, transparent 33%, black 33%, black 100%)",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                {portfolioBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
