"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardAnalytics() {
  const data = [
    { month: "Jan", profit: 100, loss: 90 },
    { month: "Feb", profit: 120, loss: 100 },
    { month: "Mar", profit: 95, loss: 90 },
    { month: "Apr", profit: 110, loss: 130 },
    { month: "May", profit: 105, loss: 120 },
    { month: "Jun", profit: 115, loss: 150 },
    { month: "Jul", profit: 100, loss: 111 },
    { month: "Aug", profit: 125, loss: 90 },
    { month: "Sep", profit: 110, loss: 100 },
    { month: "Oct", profit: 130, loss: 90 },
    { month: "Nov", profit: 120, loss: 130 },
    { month: "Dec", profit: 140, loss: 160 },
  ];

  const maxAbsoluteValue = 150;
  const chartHeightInPixels = 250;
  const halfChartHeight = chartHeightInPixels / 2;

  const investmentTrendData = [
    { date: "1 Apr", cost: 25000 },
    { date: "1 Dec", cost: 75000 },
    { date: "1 Apr", cost: 125000 },
    { date: "1 AUG", cost: 250000 },
    { date: "1 July", cost: 700000 },
    { date: "1 July", cost: 500000 },
    { date: "1 July", cost: 750000 },
    { date: "1 July", cost: 900000 },
    { date: "1 July", cost: 1000000 },
    { date: "1 July", cost: 750000 },
    { date: "1 July", cost: 900000 },
    { date: "1 July", cost: 500000 },
  ];

  return (
    <div className="w-full h-screen bg-white roboto">
      <div className="container mx-auto">
        <div>
          {/* Title */}
          <h1 className="text-[36px] font-medium text-gray-900 mb-6">
            Monthly Profit & Loss Comparison
          </h1>
          {/* Legend */}
          <div className="flex gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#8280FF] border-2 border-[#D1D0FF] rounded-full"></div>
              <span className="text-[15px] font-semibold text-gray-700">
                Profit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FF8082] border-2 border-[#D1D0FF] rounded-full"></div>
              <span className="text-[15px] font-semibold text-gray-700">
                Loss
              </span>
            </div>
          </div>
          <div className="">
            <div className="flex gap-4">
              {/* Updated Y-Axis Labels (Centered at $00) */}
              <div className="flex flex-col justify-between items-end w-12 h-[40vh] text-[16px] text-gray-500 pr-2">
                <span>$10000</span> <span>$5000</span>
                <span>$1000</span> <span>$100</span>
                <span className="font-bold text-gray-800">$00</span>
                <span>$-100</span> <span>$-1000</span>
                <span>$-5000</span> <span>$-10000</span>
              </div>
              {/* Chart Area */}
              <div className="flex-1">
                {/* Grid Lines */}
                <div className="relative h-[40vh] border-gray-300">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                    <div className="border-t border-dashed border-gray-300 w-full"></div>
                  </div>
                  <div className="absolute inset-0 flex justify-around px-4 ">
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-1 flex-1 max-w-12 h-full mt-[10px]"
                      >
                        <div className="flex gap-[2px] w-full h-full relative ">
                          <div className="absolute w-full top-[50%] h-[1px] "></div>
                          <div
                            className="bg-gradient-to-t from-[#8280FF] from-90% to-[#D1D0FF] to-100% rounded-t-lg transition-all hover:opacity-80 absolute bottom-[50%] "
                            style={{
                              width: "35px",
                              height: `${
                                (item.profit / maxAbsoluteValue) *
                                halfChartHeight
                              }px`,
                              left: "calc(50% - 37px)",
                            }}
                          ></div>
                          <div
                            className="bg-gradient-to-b from-[#FF8082] from-88% to-[#D1D0FF] to-100% rounded-b-lg transition-all hover:opacity-80 absolute top-[50%]"
                            style={{
                              width: "35px",
                              height: `${
                                (item.loss / maxAbsoluteValue) * halfChartHeight
                              }px`,
                              left: "calc(50% - 0px)",
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600  font-medium">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10">
          <h1 className="text-[36px] font-medium text-gray-900 mb-6">
            Market value vs investment cost
          </h1>
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
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ fill: "#a855f7", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
