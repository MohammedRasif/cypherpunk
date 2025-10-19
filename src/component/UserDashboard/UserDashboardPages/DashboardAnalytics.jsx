"use client";

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

  return (
    <div className="w-full h-screen bg-white roboto">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-[36px] font-semibold text-gray-900 mb-6">
          Monthly Profit & Loss Comparison (Centered at $00)
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
                {/* Horizontal Grid Lines - 10 lines, with $00 line being the 5th/6th (Middle) */}
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
                      className="flex flex-col items-center gap-1 flex-1 max-w-12 h-full mt-[10px] "
                    >
                      <div className="flex gap-[2px] w-full h-full relative ">
                        <div className="absolute w-full top-[50%] h-[1px] "></div>
                        <div
                          className="bg-gradient-to-t from-[#8280FF] from-90% to-[#D1D0FF] to-100% rounded-t-lg transition-all hover:opacity-80 absolute bottom-[50%] "
                          style={{
                            width: "35px",
                            height: `${
                              (item.profit / maxAbsoluteValue) * halfChartHeight
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
    </div>
  );
}
