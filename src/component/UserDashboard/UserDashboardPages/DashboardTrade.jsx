import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GrLineChart } from "react-icons/gr";

// --- Trade Data ---
const tradesData = [
  {
    trade: "TSLA",
    buyPrice: 210.0,
    share: 423,
    realizedPnL: 175.0,
    realizedPnLPercent: 16.67,
    notes: "Took profits",
    date: "2024-08-01",
    type: "positive",
    status: "closed",
  },
  {
    trade: "META",
    buyPrice: 295.0,
    share: 423,
    realizedPnL: 175.0,
    realizedPnLPercent: 16.67,
    notes: "Rebalancing",
    date: "2024-07-15",
    type: "positive",
    status: "active",
  },
  {
    trade: "META",
    buyPrice: 295.0,
    share: 423,
    realizedPnL: 175.0,
    realizedPnLPercent: 16.67,
    notes: "Rebalancing",
    date: "2024-07-15",
    type: "positive",
    status: "closed",
  },
  {
    trade: "GOOGL",
    buyPrice: 142.5,
    share: 423,
    realizedPnL: -86.0,
    realizedPnLPercent: -3.02,
    notes: "Cut losses",
    date: "2024-07-24",
    type: "negative",
    status: "closed",
  },
  {
    trade: "APPL",
    buyPrice: 150.0,
    share: 100,
    realizedPnL: 25.0,
    realizedPnLPercent: 1.05,
    notes: "Holding strong",
    date: "2024-08-05",
    type: "positive",
    status: "active",
  },
];

// --- Helper Functions ---

// Function to format P&L for display with color and sign
const formatPnL = (pnl, percent, type) => {
  const isPositive = type === "positive";
  const colorClass = isPositive ? "text-green-600" : "text-red-600";
  const sign = isPositive ? "+" : "-";
  const displayPnl = Math.abs(pnl).toFixed(2);
  const displayPercent = Math.abs(percent).toFixed(2);

  return (
    <div className={`flex flex-col items-start font-medium ${colorClass}`}>
      <span className="text-sm">
        {sign}${displayPnl}
      </span>
      <span className="text-xs">
        ({sign}
        {displayPercent}%)
      </span>
    </div>
  );
};

// --- Main Component ---
function DashboardTrade() {
  // State for the tabs: 'active' or 'closed'
  const [activeTab, setActiveTab] = useState("active");

  // Filter trades based on the active tab
  const filteredTrades = tradesData.filter(
    (trade) => trade.status === (activeTab === "active" ? "active" : "closed")
  );

  // Base button classes for the tab group
  const baseClasses =
    "py-2 px-6 text-base font-semibold transition-colors duration-300 flex-grow text-center";

  // Dynamic classes based on the active state
  const activeClasses = (tabName) =>
    activeTab === tabName
      ? "bg-gray-900 text-white shadow-md z-10" // Selected tab style
      : "bg-transparent text-gray-500 hover:text-gray-800"; // Unselected tab style

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6 lg:p-8">
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-[32px] font-bold text-gray-900">My trades</h1>
          <p className="text-[16px] text-gray-500">
            Your trading performance at a glance
          </p>
        </div>
        <div className="flex space-x-4 items-center mt-4 sm:mt-0">
          {/* Calendar/Month Dropdown - Styled to look like the image */}

          {/* Add Trade Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-md">
            <span className="lg:text-xl mr-1">+</span> Add Trade
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end mb-5 relative">
        <GoChevronDown className="absolute right-2" />
        <select className="px-3 py-2 border border-gray-200 w-36 rounded-md text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20width%3d%2210%22%20height%3d%226%22%20viewBox%3d%220%200%2010%206%22%20fill%3d%22none%22%20xmlns%3d%22http%3a%2f%2fw3.org%2f2000%2fsvg%22%3e%3cpath%20d%3d%22M5%206L0%200h10L5%206z%22%20fill%3d%22%236B7280%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_0.75rem_center]">
          <option>October</option>
          <option>September</option>
          <option>August</option>
          <option>July</option>
        </select>
      </div>

      {/* --- Tabs Section --- */}
      <div className="flex rounded-full mb-6 w-fit bg-gray-100 p-1.5 relative overflow-hidden shadow-inner">
        {/* Active Trades Button */}
        <button
          onClick={() => setActiveTab("active")}
          className={`${baseClasses} ${activeClasses("active")} rounded-full`}
        >
          Active trades
        </button>

        {/* Close Trades Button */}
        <button
          onClick={() => setActiveTab("closed")}
          className={`${baseClasses} ${activeClasses("closed")} rounded-full`}
        >
          Close trades
        </button>
      </div>

      {/* --- Trades Table --- */}
      <div className="overflow-x-auto">
        {filteredTrades.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No {activeTab} trades found.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead>
              <tr className="text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                <th className="py-3 pr-4 w-1/6">Trade</th>
                <th className="py-3 px-4 w-1/6">Buy Price</th>
                <th className="py-3 px-4 w-1/6">Share</th>
                <th className="py-3 px-4 w-1/6">Realized P/L</th>
                <th className="py-3 px-4 w-1/6">Notes</th>
                <th className="py-3 px-4 w-1/6 text-right">Date</th>
              </tr>
            </thead>

            {/* Table Body - Using map to render filtered data */}
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTrades.map((trade, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-gray-900 lg:text-[14px] text-sm"
                >
                  <td className="py-3 pr-4 font-semibold">{trade.trade}</td>
                  <td className="py-3 px-4">${trade.buyPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">{trade.share}</td>
                  <td className="py-3 px-4 flex text-green-600">
                    <span>
                      <GrLineChart className="mt-2.5 mr-2" />
                    </span>
                    {formatPnL(
                      trade.realizedPnL,
                      trade.realizedPnLPercent,
                      trade.type
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{trade.notes}</td>
                  <td className="py-3 px-4 text-gray-600 text-right">
                    {trade.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DashboardTrade;
