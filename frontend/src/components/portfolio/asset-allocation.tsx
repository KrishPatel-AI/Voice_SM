"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface AllocationData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export function AssetAllocation() {
  const allocations = {
    sector: [
      { name: "Technology", value: 12031.86, percentage: 41.85, color: "#3b82f6" },
      { name: "Healthcare", value: 6612.5, percentage: 23.0, color: "#22c55e" },
      { name: "Financials", value: 5175.0, percentage: 18.0, color: "#eab308" },
      { name: "Consumer Discretionary", value: 3450.0, percentage: 12.0, color: "#8b5cf6" },
      { name: "Others", value: 1481.06, percentage: 5.15, color: "#6b7280" }
    ],
    type: [
      { name: "Stocks", value: 24437.86, percentage: 85.0, color: "#3b82f6" },
      { name: "Bonds", value: 2012.53, percentage: 7.0, color: "#22c55e" },
      { name: "ETFs", value: 1437.52, percentage: 5.0, color: "#eab308" },
      { name: "Cash", value: 862.51, percentage: 3.0, color: "#9ca3af" }
    ],
    risk: [
      { name: "Growth", value: 17250.25, percentage: 60.0, color: "#ef4444" },
      { name: "Moderate", value: 8625.13, percentage: 30.0, color: "#eab308" },
      { name: "Conservative", value: 2875.04, percentage: 10.0, color: "#3b82f6" }
    ]
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded shadow-md border border-gray-200">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">${data.value.toLocaleString()}</p>
          <p className="text-sm text-gray-600">{data.percentage.toFixed(2)}%</p>
        </div>
      );
    }
    return null;
  };

  const AllocationChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="space-y-6">
            {data.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{item.name}</span>
                  <span>${item.value.toLocaleString()} ({item.percentage.toFixed(2)}%)</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-2 text-center">
            <div className="text-xs text-muted-foreground font-semibold">Total</div>
            <div className="text-xl font-bold">${total.toLocaleString()}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Tabs defaultValue="sector" className="w-full">
      <TabsList className="w-full grid grid-cols-3 mb-4 max-w-md">
        <TabsTrigger value="sector">By Sector</TabsTrigger>
        <TabsTrigger value="type">By Asset Type</TabsTrigger>
        <TabsTrigger value="risk">By Risk Profile</TabsTrigger>
      </TabsList>
      
      {Object.entries(allocations).map(([key, data]) => (
        <TabsContent key={key} value={key}>
          <AllocationChart data={data} />
        </TabsContent>
      ))}
    </Tabs>
  );
}