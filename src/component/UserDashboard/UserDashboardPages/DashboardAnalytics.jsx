"use client";

import { useState } from "react";
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
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: null,
    chart: null, // To identify which chart the tooltip belongs to
  });

  const data = [
    { month: "Jan", profit: 200, loss: 90 },
    { month: "Feb", profit: 120, loss: 100 },
    { month: "Mar", profit: 100, loss: 90 },
    { month: "Apr", profit: 180, loss: 130 },
    { month: "May", profit: 105, loss: 120 },
    { month: "Jun", profit: 160, loss: 140 },
    { month: "Jul", profit: 100, loss: 111 },
    { month: "Aug", profit: 125, loss: 90 },
    { month: "Sep", profit: 110, loss: 100 },
    { month: "Oct", profit: 130, loss: 90 },
    { month: "Nov", profit: 120, loss: 130 },
    { month: "Dec", profit: 140, loss: 120 },
  ];

  const maxAbsoluteValue = 150;
  const chartHeightInPixels = 250;
  const halfChartHeight = chartHeightInPixels / 2;

  const chartData = [
    { company: "AAPL", marketValue: 3000, investment: 1000 },
    { company: "JPM", marketValue: 72000, investment: 4000 },
    { company: "Coca-Cola", marketValue: 700, investment: 10 },
    { company: "Netflix", marketValue: 8000, investment: 100 },
    { company: "Merck", marketValue: 1000, investment: 100 },
    { company: "UNH", marketValue: 900, investment: 700 },
    { company: "Tesla", marketValue: 98000, investment: 55000 },
    { company: "Amazon", marketValue: 8000, investment: 6000 },
    { company: "Google", marketValue: 20, investment: 10 },
    { company: "Meta", marketValue: 7000, investment: 1000 },
    { company: "NVIDIA", marketValue: 500, investment: 200 },
  ];

  const yAxisValues = [100, 1000, 10000, 100000];
  const maxValue = 100000;

  const getBarHeight = (value) => {
    if (value <= 0) return 0;
    const logValue = Math.log10(value);
    const logMax = Math.log10(maxValue);
    return (logValue / logMax) * 100;
  };

  const investmentTrendData = [
    { date: "1 Apr", cost: 25000 },
    { date: "1 Dec", cost: 75000 },
    { date: "1 Apr", cost: 125000 },
    { date: "1 Aug", cost: 250000 },
    { date: "1 Jul", cost: 700000 },
    { date: "1 Jul", cost: 500000 },
    { date: "1 Jul", cost: 750000 },
    { date: "1 Jul", cost: 900000 },
    { date: "1 Jul", cost: 1000000 },
    { date: "1 Jul", cost: 750000 },
    { date: "1 Jul", cost: 900000 },
    { date: "1 Jul", cost: 500000 },
  ];

  const handleMouseEnter = (e, content, chart) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      content,
      chart,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: null, chart: null });
  };

  return (
    <div className="w-full h-screen bg-white roboto">
      <div className="container mx-auto">
        {/* Market value vs investment cost */}
        <div>
          <h1 className="text-[36px] font-medium text-gray-900 mb-6">
            Monthly Profit & Loss Comparison
          </h1>
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
            <div className="lg:flex gap-4">
              <div className="lg:flex flex-col  justify-between items-end w-12 h-[40vh] text-[16px] text-gray-500 pr-2">
                <span>$10000 </span>
                <span>$5000</span>
                <span>$1000</span>
                <span>$100</span>
                <span className="font-bold text-gray-800">$00</span>
                <span>$-5000</span>
                <span>$-10000</span>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                  <div className="border-t border-dashed border-gray-300 w-full"></div>
                </div>
                <div className="absolute inset-0 flex justify-around px-4">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1 flex-1 max-w-12 h-full lg:mt-[70px] -mt-20"
                    >
                      <div className="flex gap-[2px] w-full h-full relative">
                        <div className="absolute w-full top-[50%] h-[1px]"></div>
                        <div
                          className="bg-gradient-to-t from-[#8280FF] from-90% to-[#D1D0FF] to-100% rounded-t-lg transition-all hover:opacity-80 absolute bottom-[50%]"
                          style={{
                            width: window.innerWidth < 768 ? "18px" : "35px",
                            height: `${
                              (item.profit / maxAbsoluteValue) * halfChartHeight
                            }px`,
                            left: "calc(50% - 37px)",
                          }}
                          onMouseEnter={(e) =>
                            handleMouseEnter(
                              e,
                              { month: item.month, profit: item.profit },
                              "profitLoss"
                            )
                          }
                          onMouseLeave={handleMouseLeave}
                        ></div>
                        <div
                          className="bg-gradient-to-b from-[#FF8082] from-88% to-[#FFD0D1] to-100% rounded-b-lg transition-all hover:opacity-80 absolute top-[50%]"
                          style={{
                            width: window.innerWidth < 768 ? "18px" : "35px",
                            height: `${
                              (item.loss / maxAbsoluteValue) * halfChartHeight
                            }px`,
                            left: "calc(50% - 0px)",
                          }}
                          onMouseEnter={(e) =>
                            handleMouseEnter(
                              e,
                              { month: item.month, loss: item.loss },
                              "profitLoss"
                            )
                          }
                          onMouseLeave={handleMouseLeave}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 font-medium ">
                        {item.month}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Value vs Investment Cost */}

        <div className="pt-28">
          <h1 className="text-[36px] font-medium text-gray-900 mb-6">
            Market Value vs Investment Cost
          </h1>
          <div className="flex gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#00BCFF] border-2 border-[#D1D0FF] rounded-full"></div>
              <span className="text-[15px] font-semibold text-gray-700">
                Market Value
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#B8E6FE] border-2 border-gray-50 rounded-full"></div>
              <span className="text-[15px] font-semibold text-gray-700">
                Investment
              </span>
            </div>
          </div>
          <div>
            <div className="flex gap-8">
              <div className="flex flex-col justify-between items-end h-80 text-[16px] text-gray-500">
                {yAxisValues.reverse().map((value) => (
                  <div key={value}>
                    ${value >= 1000 ? (value / 1000).toFixed(0) + "k" : value}
                  </div>
                ))}
              </div>
              <div className="flex-1 relative">
                {yAxisValues.map((value, index) => (
                  <div
                    key={`grid-${value}`}
                    className="absolute w-full border-t border-gray-200 z-10"
                    style={{
                      bottom: `${(index / (yAxisValues.length - 1)) * 100}%`,
                    }}
                  ></div>
                ))}
                <div className="flex justify-around items-end h-full px-4 mt-6">
                  {chartData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="flex items-end h-64 z-30">
                        <div
                          className="w-[36px] bg-gradient-to-t from-[#00BCFF] from-93% to-[#D1D0FF] to-100% rounded-t-lg transition-all duration-300"
                          style={{
                            height: `${getBarHeight(item.marketValue)}%`,
                          }}
                          onMouseEnter={(e) =>
                            handleMouseEnter(
                              e,
                              {
                                company: item.company,
                                marketValue: item.marketValue,
                              },
                              "marketInvestment"
                            )
                          }
                          onMouseLeave={handleMouseLeave}
                        ></div>
                        <div
                          className="w-[36px] bg-gradient-to-t from-[#B8E6FE] from-95% to-[#D1D0FF] to-100% rounded-t-lg transition-all duration-300"
                          style={{
                            height: `${getBarHeight(item.investment)}%`,
                          }}
                          onMouseEnter={(e) =>
                            handleMouseEnter(
                              e,
                              {
                                company: item.company,
                                investment: item.investment,
                              },
                              "marketInvestment"
                            )
                          }
                          onMouseLeave={handleMouseLeave}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 text-center w-16 truncate">
                        {item.company}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Cost of investment over times  */}
        <div className="pt-10">
          <h1 className="text-[36px] font-medium text-gray-900 mb-6">
            Cost of investment over time
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

        {/* Tooltip Component */}
        {tooltip.visible && (
          <div
            className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-sm text-gray-700 z-50"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 10,
              pointerEvents: "none",
            }}
          >
            {tooltip.chart === "profitLoss" && (
              <>
                <div>
                  <strong>Month:</strong> {tooltip.content.month}
                </div>
                {tooltip.content.profit && (
                  <div>
                    <strong>Profit:</strong> ${tooltip.content.profit}
                  </div>
                )}
                {tooltip.content.loss && (
                  <div>
                    <strong>Loss:</strong> ${tooltip.content.loss}
                  </div>
                )}
              </>
            )}
            {tooltip.chart === "marketInvestment" && (
              <>
                <div>
                  <strong>Company:</strong> {tooltip.content.company}
                </div>
                {tooltip.content.marketValue && (
                  <div>
                    <strong>Market Value:</strong> $
                    {tooltip.content.marketValue.toLocaleString()}
                  </div>
                )}
                {tooltip.content.investment && (
                  <div>
                    <strong>Investment:</strong> $
                    {tooltip.content.investment.toLocaleString()}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
