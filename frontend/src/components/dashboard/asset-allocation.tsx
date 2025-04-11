import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Progress } from "@/components/ui/progress";

interface AllocationData {
  name: string;
  value: number;
  percentage: number;
  color?: string;
}

export function AssetAllocation() {
  // Sample sector allocation data
  const sectorData: AllocationData[] = [
    {
      name: "Technology",
      value: 12031.86,
      percentage: 41.85,
      color: "bg-blue-500",
    },
    {
      name: "Healthcare",
      value: 6612.5,
      percentage: 23.0,
      color: "bg-green-500",
    },
    {
      name: "Financials",
      value: 5175.0,
      percentage: 18.0,
      color: "bg-yellow-500",
    },
    {
      name: "Consumer Discretionary",
      value: 3450.0,
      percentage: 12.0,
      color: "bg-purple-500",
    },
    { name: "Others", value: 1481.06, percentage: 5.15, color: "bg-gray-500" },
  ];

  // Sample asset type allocation data
  const assetTypeData: AllocationData[] = [
    { name: "Stocks", value: 24437.86, percentage: 85.0, color: "bg-blue-500" },
    { name: "Bonds", value: 2012.53, percentage: 7.0, color: "bg-green-500" },
    { name: "ETFs", value: 1437.52, percentage: 5.0, color: "bg-yellow-500" },
    { name: "Cash", value: 862.51, percentage: 3.0, color: "bg-gray-400" },
  ];

  // Sample risk profile data
  const riskProfileData: AllocationData[] = [
    { name: "Growth", value: 17250.25, percentage: 60.0, color: "bg-red-500" },
    {
      name: "Moderate",
      value: 8625.13,
      percentage: 30.0,
      color: "bg-yellow-500",
    },
    {
      name: "Conservative",
      value: 2875.04,
      percentage: 10.0,
      color: "bg-blue-500",
    },
  ];

  const renderAllocationChart = (data: AllocationData[]) => (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2">
        <div className="space-y-6">
          {data.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item.name}</span>
                <span>
                  ${item.value.toLocaleString()} ({item.percentage.toFixed(2)}%)
                </span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-64 h-64 relative rounded-full bg-muted flex items-center justify-center">
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {data.map((item, index) => {
                // Calculate the segment sizes for a pie chart
                const startAngle =
                  index === 0
                    ? 0
                    : data
                        .slice(0, index)
                        .reduce((sum, i) => sum + i.percentage, 0) * 3.6;
                const angle = item.percentage * 3.6; // Convert percentage to degrees (out of 360)

                // Convert degrees to radians
                const startRadians = ((startAngle - 90) * Math.PI) / 180;
                const endRadians = ((startAngle + angle - 90) * Math.PI) / 180;

                // Calculate coordinates
                const startX = 50 + 45 * Math.cos(startRadians);
                const startY = 50 + 45 * Math.sin(startRadians);
                const endX = 50 + 45 * Math.cos(endRadians);
                const endY = 50 + 45 * Math.sin(endRadians);

                // Determine if the arc should be drawn as a large arc
                const largeArcFlag = angle > 180 ? 1 : 0;

                return (
                  <path
                    key={item.name}
                    d={`M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                    fill={`var(--${item.color || "primary"})`}
                    stroke="white"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>
          <div className="z-10 text-center">
            <div className="text-lg font-bold">Total</div>
            <div className="text-2xl font-bold">$28,750.42</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Tabs defaultValue="sector" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4 max-w-md">
          <TabsTrigger value="sector">By Sector</TabsTrigger>
          <TabsTrigger value="type">By Asset Type</TabsTrigger>
          <TabsTrigger value="risk">By Risk Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="sector">
          {renderAllocationChart(sectorData)}
        </TabsContent>

        <TabsContent value="type">
          {renderAllocationChart(assetTypeData)}
        </TabsContent>

        <TabsContent value="risk">
          {renderAllocationChart(riskProfileData)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
