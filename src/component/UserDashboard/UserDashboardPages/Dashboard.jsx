import { AiOutlineArrowUp, AiOutlineDollar } from "react-icons/ai";
import { CgDollar } from "react-icons/cg";
import { FaRegChartBar } from "react-icons/fa";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { LuTarget } from "react-icons/lu";
import { useEffect } from 'react'; 

const Dashboard = () => {
 useEffect(() => {
    const API_KEY = 'Ezy4P6aKPWV7kVK9sFcYq27pZ8E1z2Kb'; 
    const socket = new WebSocket('wss://delayed.massive.com/stocks');

    socket.onopen = () => {
      console.log('WebSocket Connected');
      socket.send(JSON.stringify({
        action: 'auth',
        params: API_KEY,
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received WebSocket Data:', data);

      if (data[0]?.ev === 'status' && data[0]?.status === 'auth_success') {
        console.log('Authentication Successful');
        socket.send(JSON.stringify({
          action: 'subscribe',
          params: 'AM.AAPL,AM.NVDA', 
        }));
      } else if (data[0]?.ev === 'AM') {
        console.log('Aggregate Minute Data:', data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  const statsCards = [
    {
      id: 1,
      title: "Total P/L",
      bgColor: "#E6FFFB",
      value: "***** +24%",
      subtitle: "From last month",
      icon: <FaArrowUpRightDots size={28} className="text-white" />,
      iconBg: "bg-green-500",
    },
    {
      id: 2,
      title: "Portfolio Value",
      bgColor: "#E6F0FA",
      value: "***** -24%",
      subtitle: "From last month",
      icon: <CgDollar size={28} className="text-white" />,
      iconBg: "bg-blue-500",
    },
    {
      id: 3,
      title: "Win Rate",
      bgColor: "#FFF3E6",
      value: "68.2%",
      subtitle: "From last month",
      icon: <LuTarget size={28} className="text-white" />,
      iconBg: "bg-orange-500",
    },
    {
      id: 4,
      title: "Total Trades",
      bgColor: "#F3E6FF",
      value: "12",
      subtitle: "From last month",
      icon: <FaRegChartBar size={28} className="text-white" />,
      iconBg: "bg-purple-500",
    },
  ];

  // Chart Data
  const chartData = [
    { month: "Jan", value: 60 },
    { month: "Feb", value: 90 },
    { month: "Mar", value: 130 },
    { month: "Apr", value: 50 },
    { month: "May", value: 100 },
    { month: "Jun", value: 70 },
    { month: "Jul", value: 85 },
    { month: "Aug", value: 95 },
    { month: "Sep", value: 50 },
    { month: "Oct", value: 30 },
    { month: "Nov", value: 90 },
    { month: "Dec", value: 80 },
  ];

  // Top 5 Holdings
  const topHoldings = [
    { id: 1, name: "NVDA", change: "+15.6%", isPositive: true },
    { id: 2, name: "NVDA", change: "+8.7%", isPositive: true },
    { id: 3, name: "NVDA", change: "+5.9%", isPositive: true },
  ];

  // Worst Performing
  const worstPerforming = [
    { id: 1, name: "NVDA", change: "-18.9%", isPositive: false },
    { id: 2, name: "NVDA", change: "-9.7%", isPositive: false },
    { id: 3, name: "NVDA", change: "-5.9%", isPositive: false },
  ];

  // Best Performing
  const bestPerforming = [
    { id: 1, name: "NVDA", change: "+15.6%", isPositive: true },
    { id: 2, name: "NVDA", change: "+8.7%", isPositive: true },
    { id: 3, name: "NVDA", change: "+5.5%", isPositive: true },
  ];

  // Recent Activity
  const recentActivity = [
    { id: 1, action: "Bought AAPL", time: "Today" },
    { id: 2, action: "Bought NVDA", time: "2 days ago" },
    { id: 3, action: "Sold TSLA", time: "Yesterday" },
    { id: 4, action: "Bought NVDA", time: "2 days ago" },
    { id: 5, action: "Bought NVDA", time: "2 days ago" },
  ];

  // Portfolio Breakdown
  const portfolioBreakdown = [
    {
      label: "Total +=18",
      color: "#8B5CF6",
      lightColor: "#C4B5FD",
      percentage: 15,
    },
    {
      label: "Total Portfolio Value",
      color: "#EF4444",
      lightColor: "#FCA5A5",
      percentage: 20,
    },
    {
      label: "Total Portfolio Value",
      color: "#F97316",
      lightColor: "#FDBA74",
      percentage: 12,
    },
    {
      label: "Total Portfolio Value",
      color: "#D4A574",
      lightColor: "#E5C7A1",
      percentage: 18,
    },
    {
      label: "Total Portfolio Value",
      color: "#A3E635",
      lightColor: "#D9F99D",
      percentage: 15,
    },
    {
      label: "Total Portfolio Value",
      color: "#60A5FA",
      lightColor: "#BFDBFE",
      percentage: 10,
    },
    {
      label: "Total Portfolio Value",
      color: "#A78BFA",
      lightColor: "#DDD6FE",
      percentage: 10,
    },
  ];

  // Monthly Summary
  const monthlySummary = [
    { label: "Total Profit", value: "+$2,450", isPositive: true },
    { label: "Trades Made", value: "24", isPositive: false },
    { label: "Avg Return", value: "+4.8%", isPositive: true },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen roboto">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="lg:text-[32px] text-[28px] font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="lg:text-[16px] text-[14px] text-gray-500">
            Your trading performance at a glance
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between mb-6 bg-white 4 rounded-lg">
          <span className="lg:text-[16px] text-[14px] text-gray-700">
            Show balance in Dashboard
          </span>
          <button className="w-12 h-6 bg-gray-300 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((card) => (
            <div
              key={card.id}
              style={{ backgroundColor: card.bgColor }}
              className="p-5 rounded-3xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="lg:text-[16px] text-[14px] font-medium text-black mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`${card.iconBg} lg:mt-3 w-12 h-12 rounded-lg flex items-center justify-center text-lg`}
                >
                  {card.icon}
                </div>
              </div>
              <p className="text-xs text-gray-500">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Value Over Time Chart */}
        <div className="bg-white lg:p-6 p-2 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Portfolio Value Over Time
              </h2>
              <p className="text-sm text-gray-500">
                Track your portfolio growth
              </p>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>2025</option>
            </select>
          </div>

          <div className="relative h-64 lg:flex">
            <div className="flex lg:flex-col justify-between lg:text-[16px] text-xs text-gray-400 lg:pr-4 pr-1 py-2">
              <span>$100000</span>
              <span>$10000</span>
              <span>$1000</span>
              <span>$100</span>
            </div>

            {/* Chart area */}
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
                        style={{ height: `${(data.value / maxValue) * 100}%` }}
                      ></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings and Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top 5 Holding */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Top 5 holding
            </h3>
            <div className="space-y-3">
              {topHoldings.map((holding) => (
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
                  <span className="text-sm font-medium text-green-600">
                    {holding.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Worst Performing */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Worst Performing
            </h3>
            <div className="space-y-3">
              {worstPerforming.map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-700">{stock.name}</span>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    {stock.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Performing */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Best Performing
            </h3>
            <div className="space-y-3">
              {bestPerforming.map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-700">{stock.name}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stock.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {/* Total Portfolio Value (2/3 width on large screens) */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 lg:col-span-2">
            <div className="bg-gray-100 p-3 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-2">
                Total Portfolio Value
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">40,689</p>
              <div className="flex items-center gap-1 mb-6">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3l7 7-1.41 1.41L11 6.83V17H9V6.83L4.41 11.41 3 10l7-7z" />
                </svg>
                <span className="text-xs text-green-600 font-medium">
                  8.5% Up from yesterday
                </span>
              </div>
            </div>

            <div className="lg:flex lg:items-center">
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
                        style={{
                          transform: `rotate(${adjustedStart}deg)`,
                        }}
                      >
                        <div
                          className="absolute inset-0 "
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
                  <div className="text-center w-fit bg-gray-200 rounded-full lg:px-6 lg:py-11 px-1 py-6 shadow-inner">
                    <p className="text-[17px] text-gray-500">Total Value</p>
                    <p className="lg:text-[30px] text-[28px] font-bold text-gray-900">$40,689</p>
                  </div>
                </div>
              </div>
              {/* Legend */}
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
            </div>
          </div>

          {/* Right Side (Recent + Monthly Summary) */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* Recent Activity */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-700">
                      {activity.action}
                    </span>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Monthly Summary
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