"use client";

import { CgDollar } from "react-icons/cg";
import { FaRegChartBar } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { LuTarget } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useShowbalanceQuery,
  useShowMonthlySummaryQuery,
  useShowPortfolioValueQuery,
  useShowRecentActivitiesQuery,
} from "../../../redux/features/withAuth";

const Dashboard = () => {
  const { t } = useTranslation();
  const { data: balanceData } = useShowbalanceQuery();
  const { data: portfolioValueData } = useShowPortfolioValueQuery();
  const { data: monthlySummaryData } = useShowMonthlySummaryQuery();
  const { data: recentActivitiesData } = useShowRecentActivitiesQuery();
  console.log(recentActivitiesData);

  // State for holdings data from socket
  const [holdingsData, setHoldingsData] = useState(null);

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectWebSocket = () => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("No access token found");
      return;
    }

    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = new WebSocket(
      `ws://10.10.13.60:8004/ws/trade/?token=${token}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Live WebSocket Connected");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Live Update:", data);

        // Check if data has holdings information
        if (
          data.top_five ||
          data.best_performing ||
          data.worst_performing ||
          data.total_portfolio_value
        ) {
          setHoldingsData(data);
          console.log("Holdings Data Updated:", data);
        }

        if (data.type === "price_update") {
          console.log(`${data.symbol}: $${data.price}`);
        }
        if (data.type === "new_trade") {
          console.log(`New Trade: ${data.action} ${data.symbol}`);
        }
      } catch (err) {
        console.log("Text message:", event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket Closed:", event.code, event.reason);
      socketRef.current = null;

      if (!reconnectTimeoutRef.current) {
        console.log("Reconnecting in 3s...");
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectTimeoutRef.current = null;
          connectWebSocket();
        }, 3000);
      }
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  if (!balanceData) {
    return <div className="text-center py-10">Loading stats...</div>;
  }

  const formatChange = (value, direction, percentage = false) => {
    if (value === 0 || value === null) return "0%";
    const sign = direction === "increase" ? "+" : "-";
    const formatted = percentage
      ? `${value.toFixed(1)}%`
      : `${value.toFixed(2)}`;
    return `${sign}${formatted}`;
  };

  const statsCards = [
    {
      title: t("total_pl"),
      bgColor: "#E6FFFB",
      value: `$${balanceData.total_pl.toFixed(2)}`,
      change: formatChange(
        balanceData.pl_change_percentage,
        balanceData.pl_change_direction,
        true
      ),
      changeDirection: balanceData.pl_change_direction,
      icon: <FaArrowUpRightDots size={28} className="text-white" />,
      iconBg: "bg-green-500",
    },
    {
      title: t("portfolio_value"),
      bgColor: "#E6F0FA",
      value: `$${balanceData.portfolio_value.toFixed(2)}`,
      change: formatChange(
        balanceData.portfolio_value_change_percentage,
        balanceData.portfolio_value_change_direction,
        true
      ),
      changeDirection: balanceData.portfolio_value_change_direction,
      icon: <CgDollar size={28} className="text-white" />,
      iconBg: "bg-blue-500",
    },
    {
      title: t("win_rate"),
      bgColor: "#FFF3E6",
      value: `${balanceData.win_rate_percentage.toFixed(1)}%`,
      change: "",
      icon: <LuTarget size={28} className="text-white" />,
      iconBg: "bg-orange-500",
    },
    {
      title: t("total_trades"),
      bgColor: "#F3E6FF",
      value: balanceData.total_trades,
      change: "",
      icon: <FaRegChartBar size={28} className="text-white" />,
      iconBg: "bg-purple-500",
    },
  ];

  // Real Chart Data from API
  const monthNames = [
    t("jan"),
    t("feb"),
    t("mar"),
    t("apr"),
    t("may"),
    t("jun"),
    t("jul"),
    t("aug"),
    t("sep"),
    t("oct"),
    t("nov"),
    t("dec"),
  ];

  const rawChartData = portfolioValueData?.portfolio_over_time || [];
  const chartData = rawChartData.map((item) => ({
    month: monthNames[parseInt(item.month.split("-")[1]) - 1],
    value: item.portfolio_value || 0,
  }));

  const maxValue = Math.max(...chartData.map((d) => d.value), 1000);

  // Top 5 Holdings - Using Socket data
  const topHoldings = holdingsData?.top_five
    ? Object.entries(holdingsData.top_five).map(([name, change], index) => ({
        id: index + 1,
        name: name,
        change: change,
        isPositive: change.startsWith("+"),
      }))
    : [];

  // Worst Performing - Using Socket data
  const worstPerforming = holdingsData?.worst_performing
    ? Object.entries(holdingsData.worst_performing).map(
        ([name, change], index) => ({
          id: index + 1,
          name: name,
          change: change,
          isPositive: false,
        })
      )
    : [];

  // Best Performing - Using Socket data
  const bestPerforming = holdingsData?.best_performing
    ? Object.entries(holdingsData.best_performing).map(
        ([name, change], index) => ({
          id: index + 1,
          name: name,
          change: change,
          isPositive: true,
        })
      )
    : [];

  const recentActivity = (recentActivitiesData?.recent_activity || [])
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      actionText: `${item.action === "buy" ? "bought" : "sold"} ${
        item.stock_name
      }`,
      time: item.time,
      isBuy: item.action === "buy",
    }));

  // Portfolio Breakdown - Using Socket data for total_portfolio_value
  const portfolioColors = [
    { color: "#8B5CF6", lightColor: "#C4B5FD" },
    { color: "#EF4444", lightColor: "#FCA5A5" },
    { color: "#F97316", lightColor: "#FDBA74" },
    { color: "#D4A574", lightColor: "#E5C7A1" },
    { color: "#A3E635", lightColor: "#D9F99D" },
    { color: "#60A5FA", lightColor: "#BFDBFE" },
    { color: "#A78BFA", lightColor: "#DDD6FE" },
    { color: "#EC4899", lightColor: "#F9A8D4" },
    { color: "#10B981", lightColor: "#6EE7B7" },
    { color: "#F59E0B", lightColor: "#FCD34D" },
    { color: "#06B6D4", lightColor: "#67E8F9" },
    { color: "#8B5CF6", lightColor: "#C4B5FD" },
    { color: "#EF4444", lightColor: "#FCA5A5" },
    { color: "#14B8A6", lightColor: "#5EEAD4" },
  ];

  // Portfolio Breakdown - Fixed Version
  const totalPortfolioValueNumber = holdingsData?.total_portfolio_value || 0;
  const portfolioDivData = holdingsData?.total_portfolio_div || {};

  const portfolioBreakdown = Object.entries(portfolioDivData).map(
    ([name, value], index) => {
      const percentage =
        totalPortfolioValueNumber > 0
          ? ((value / totalPortfolioValueNumber) * 100).toFixed(2)
          : 0;

      return {
        label: name,
        value: value,
        percentage: parseFloat(percentage),
        color: portfolioColors[index % portfolioColors.length].color,
        lightColor: portfolioColors[index % portfolioColors.length].lightColor,
      };
    }
  );

  const currentMonthData = monthlySummaryData?.monthly_summary?.[0] || {
    trades: 0,
    value: 0,
  };

  const monthlySummary = [
    {
      label: t("total_profit"),
      value: `$${currentMonthData.value.toLocaleString()}`,
      isPositive: currentMonthData.value > 0,
    },
    {
      label: t("trades_made"),
      value: currentMonthData.trades.toString(),
      isPositive: false,
    },
    {
      label: t("avg_return"),
      value: "+4.8%",
      isPositive: true,
    },
  ];

  return (
    <div className="min-h-screen roboto">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="lg:text-[32px] text-[28px] font-bold text-gray-900">
            {t("dashboard_overview")}
          </h1>
          <p className="lg:text-[16px] text-[14px] text-gray-500">
            {t("trading_performance")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              style={{ backgroundColor: card.bgColor }}
              className="p-5 py-6 rounded-3xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="lg:text-[17px] text-[14px] font-medium text-black mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  {card.change && (
                    <p
                      className={`text-sm font-medium ${
                        card.changeDirection === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {card.change}
                    </p>
                  )}
                </div>
                <div
                  className={`${card.iconBg} lg:mt-3 w-12 h-12 rounded-lg flex items-center justify-center text-lg`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Value Over Time Chart - NOW USING REAL DATA */}
        <div className="bg-white lg:p-6 p-2 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {t("portfolio_over_time")}
              </h2>
              <p className="text-sm text-gray-500">{t("track_growth")}</p>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>{portfolioValueData?.year || "2025"}</option>
            </select>
          </div>

          <div className="relative h-64 lg:flex">
            <div className="flex lg:flex-col justify-between lg:text-[16px] text-xs text-gray-400 lg:pr-4 pr-1 py-2">
              <span>${(maxValue * 1.2).toLocaleString()}</span>
              <span>${(maxValue * 0.9).toLocaleString()}</span>
              <span>${(maxValue * 0.6).toLocaleString()}</span>
              <span>${(maxValue * 0.3).toLocaleString()}</span>
              <span>$0</span>
            </div>

            <div className="flex-1 flex items-end justify-between lg:gap-3 border-l border-gray-100 lg:pl-4">
              {chartData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full flex items-end justify-center bg-gray-300 rounded-xl max-w-[20px] md:max-w-[40px]"
                    style={{ height: "200px" }}
                  >
                    {data.value > 0 && (
                      <div
                        className="w-full bg-gradient-to-t from-[#8280FF] from-90% to-[#D1D0FF] to-100% rounded-xl transition-all hover:opacity-80 max-w-[20px] md:max-w-[40px] shadow-dm"
                        style={{
                          height: `${(data.value / maxValue) * 100}%`,
                        }}
                        title={`$${data.value.toLocaleString()}`}
                      ></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              {t("top_5_holding")}
            </h3>
            <div className="space-y-3">
              {topHoldings.length > 0 ? (
                topHoldings.map((holding) => (
                  <div
                    key={holding.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        {holding.name}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        holding.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {holding.change}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Loading...</p>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              {t("worst_performing")}
            </h3>
            <div className="space-y-3">
              {worstPerforming.length > 0 ? (
                worstPerforming.map((stock) => (
                  <div
                    key={stock.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        {stock.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-red-600">
                      {stock.change}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Loading...</p>
              )}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              {t("best_performing")}
            </h3>
            <div className="space-y-3">
              {bestPerforming.length > 0 ? (
                bestPerforming.map((stock) => (
                  <div
                    key={stock.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        {stock.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {stock.change}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Loading...</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="bg-white p-4 rounded-lg border border-gray-200 lg:col-span-2">
            <div className="bg-gray-100 p-3 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-2">
                {t("total_portfolio_value")}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {" "}
                $
                {totalPortfolioValueNumber.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <div className="flex items-center gap-1 mb-6">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3l7 7-1.41 1.41L11 6.83V17H9V6.83L4.41 11.41 3 10l7-7z" />
                </svg>
                <span className="text-xs text-green-600 font-medium">
                  {t("up_from_yesterday")}
                </span>
              </div>
            </div>

            <div className="lg:flex lg:items-center">
              {portfolioBreakdown.length > 0 ? (
                <>
                  <div className="relative lg:w-96 lg:h-96 w-72 h-72 mx-auto mb-6 mt-5">
                    <div className="absolute inset-0">
                      {portfolioBreakdown.map((item, index) => {
                        const total = portfolioBreakdown.reduce(
                          (sum, i) => sum + i.percentage,
                          0
                        );
                        const startAngle = portfolioBreakdown
                          .slice(0, index)
                          .reduce(
                            (sum, i) => sum + (i.percentage / total) * 360,
                            0
                          );
                        const segmentAngle = (item.percentage / total) * 360;
                        const gapSize = 5;
                        const adjustedAngle = segmentAngle - gapSize;
                        const adjustedStart = startAngle + gapSize / 2;
                        const lighterColor = item.color + "4D";

                        return (
                          <div
                            key={index}
                            className="absolute inset-0"
                            style={{ transform: `rotate(${adjustedStart}deg)` }}
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
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center w-fit bg-gray-200 rounded-full  lg:py-11 px-1 py-6 shadow-inner">
                        <p className="text-[17px] text-gray-500">
                          {t("total_value")}
                        </p>
                        <p className="lg:text-[30px] text-[28px] font-bold text-gray-900">
                          $
                          {totalPortfolioValueNumber.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {portfolioBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="lg:text-[15px] text-xs text-gray-600">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-400 py-10 w-full">
                  Loading chart...
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                {t("recent_activity")}
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span
                      className={`text-sm font-medium ${
                        activity.isBuy ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {activity.actionText}
                    </span>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                {t("monthly_summary")}
              </h3>
              <div className="space-y-4">
                {monthlySummary.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span
                      className={`text-sm font-semibold ${
                        item.isPositive ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
