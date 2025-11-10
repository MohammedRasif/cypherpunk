"use client";

import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { GrLineChart } from "react-icons/gr";
import { useTranslation } from "react-i18next"; // যোগ হলো

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

// --- Helper Function ---
const formatPnL = (pnl, percent, type, t) => {
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
  const { t } = useTranslation(); // যোগ হলো
  const [activeTab, setActiveTab] = useState("active");

  const filteredTrades = tradesData.filter(
    (trade) => trade.status === (activeTab === "active" ? "active" : "closed")
  );

  const baseClasses =
    "py-2 px-6 text-base font-semibold transition-colors duration-300 flex-grow text-center";

  const activeClasses = (tabName) =>
    activeTab === tabName
      ? "bg-gray-900 text-white shadow-md z-10"
      : "bg-transparent text-gray-500 hover:text-gray-800";

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-[32px] font-bold text-gray-900">
            {t("my_trades")}
          </h1>
          <p className="text-[16px] text-gray-500">
            {t("trading_performance_glance")}
          </p>
        </div>
        <div className="flex space-x-4 items-center mt-4 sm:mt-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-md">
            <span className="lg:text-xl mr-1">+</span> {t("add_trade")}
          </button>
        </div>
      </div>

      {/* Month Dropdown */}
      <div className="flex items-center justify-end mb-5 relative">
        <GoChevronDown className="absolute right-2 pointer-events-none" />
        <select className="px-3 py-2 pr-8 border border-gray-200 w-36 rounded-md text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20width%3d%2210%22%20height%3d%226%22%20viewBox%3d%220%200%2010%206%22%20fill%3d%22none%22%20xmlns%3d%22http%3a%2f%2fw3.org%2f2000%2fsvg%22%3e%3cpath%20d%3d%22M5%206L0%200h10L5%206z%22%20fill%3d%22%236B7280%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_0.75rem_center]">
          <option>{t("october")}</option>
          <option>{t("september")}</option>
          <option>{t("august")}</option>
          <option>{t("july")}</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex rounded-full mb-6 w-fit bg-gray-100 p-1.5 relative overflow-hidden shadow-inner">
        <button
          onClick={() => setActiveTab("active")}
          className={`${baseClasses} ${activeClasses("active")} rounded-full cursor-pointer`}
        >
          {t("active_trades")}
        </button>
        <button
          onClick={() => setActiveTab("closed")}
          className={`${baseClasses} ${activeClasses("closed")} rounded-full cursor-pointer`}
        >
          {t("closed_trades")}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTrades.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {t("no_trades_found", { status: activeTab === "active" ? t("active") : t("closed") })}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-[16px] font-medium text-gray-500 uppercase tracking-wider">
                <th className="py-3 pr-4 w-1/6">{t("trade")}</th>
                <th className="py-3 px-4 w-1/6">{t("buy_price")}</th>
                <th className="py-3 px-4 w-1/6">{t("share")}</th>
                <th className="py-3 px-4 w-1/6">{t("realized_pnl")}</th>
                <th className="py-3 px-4 w-1/6">{t("notes")}</th>
                <th className="py-3 px-4 w-1/6 text-right">{t("date")}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredTrades.map((trade, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-gray-900 lg:text-[14px] text-sm"
                >
                  <td className="py-3 pr-4 font-semibold">{trade.trade}</td>
                  <td className="py-3 px-4">${trade.buyPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">{trade.share}</td>
                  <td className="py-3 px-4 flex">
                    <span>
                      <GrLineChart className="mt-2.5 mr-2" />
                    </span>
                    {formatPnL(trade.realizedPnL, trade.realizedPnLPercent, trade.type, t)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{t(trade.notes)}</td>
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