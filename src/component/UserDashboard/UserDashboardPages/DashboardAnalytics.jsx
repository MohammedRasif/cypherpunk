import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const DashboardAnalytics = () => {
  const profitLossData = [
    { month: "Jan", profit: 100, loss: 40 },
    { month: "Feb", profit: 150, loss: 35 },
    { month: "Mar", profit: 100, loss: 45 },
    { month: "Apr", profit: 110, loss: 38 },
    { month: "May", profit: 105, loss: 42 },
    { month: "Jun", profit: 120, loss: 40 },
    { month: "Jul", profit: 95, loss: 48 },
    { month: "Aug", profit: 115, loss: 36 },
    { month: "Sep", profit: 90, loss: 50 },
    { month: "Oct", profit: 105, loss: 44 },
    { month: "Nov", profit: 130, loss: 39 },
    { month: "Dec", profit: 140, loss: 42 },
  ]

  const marketValueData = [
    { company: "AAPL", marketValue: 10000, investment: 1000 },
    { company: "JPM", marketValue: 9500, investment: 950 },
    { company: "Coca-Cola", marketValue: 10200, investment: 1020 },
    { company: "Netflix", marketValue: 9800, investment: 980 },
    { company: "Merck", marketValue: 10100, investment: 1010 },
    { company: "UNH", marketValue: 9900, investment: 990 },
    { company: "UNH", marketValue: 10300, investment: 1030 },
    { company: "UNH", marketValue: 9700, investment: 970 },
  ]

  const investmentTrendData = [
    { date: "1 Apr", cost: 25000 },
    { date: "1 Dec", cost: 75000 },
    { date: "1 Apr", cost: 125000 },
    { date: "1 AUG", cost: 250000 },
    { date: "1 July", cost: 400000 },
    { date: "1 July", cost: 550000 },
    { date: "1 July", cost: 750000 },
    { date: "1 July", cost: 900000 },
    { date: "1 July", cost: 1000000 },
  ]

  return (
    <div className="w-full roboto">
      {/* Monthly Profit & Loss Comparison */}
      <div className="rounded-lg  mb-8 ">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Monthly Profit & Loss Comparison</h2>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Profit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Loss</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={profitLossData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px" }}
              formatter={(value) => `$${value}`}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
            <Bar dataKey="profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="loss" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Market value vs investment cost */}
      <div className="rounded-lg p-6 mb-8 ">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Market value vs investment cost</h2>
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-gray-700">Market value</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-200 rounded-full"></div>
            <span className="text-gray-700">Total investment</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={marketValueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="company" stroke="#6b7280" />
            <YAxis stroke="#6b7280" scale="log" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              formatter={(value) => `$${value}`}
            />
            <Bar dataKey="marketValue" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            <Bar dataKey="investment" fill="#a5f3fc" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost of investment over time */}
      <div className="rounded-lg p-6 ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Cost of investment over time</h2>
          <button className="px-4 py-2  rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            2025
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={investmentTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
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
  )
}

export default DashboardAnalytics
