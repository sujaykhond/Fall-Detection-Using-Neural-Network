
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample data - in a real app, this would come from your backend
const fallDetectionData = [
  { day: 'Mon', falls: 2, alerts: 3 },
  { day: 'Tue', falls: 1, alerts: 2 },
  { day: 'Wed', falls: 3, alerts: 4 },
  { day: 'Thu', falls: 0, alerts: 1 },
  { day: 'Fri', falls: 2, alerts: 3 },
  { day: 'Sat', falls: 1, alerts: 2 },
  { day: 'Sun', falls: 0, alerts: 1 },
];

const chartConfig = {
  falls: {
    label: "Falls Detected",
    color: "#ef4444"
  },
  alerts: {
    label: "Alerts Triggered",
    color: "#f97316"
  }
};

const FallDetectionGraph = () => {
  return (
    <Card className="glass-card border-border/20 shadow-lg">
      <CardHeader>
        <CardTitle>Fall Detection Analytics</CardTitle>
        <CardDescription>Weekly fall detection and alert metrics</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-[4/3] sm:aspect-[16/9] w-full h-[300px] sm:h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={fallDetectionData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="day" 
                stroke="rgba(255,255,255,0.5)" 
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                allowDecimals={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="falls"
                stroke="#ef4444"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="alerts"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="glass p-3 rounded-lg shadow-md border border-white/10">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={`item-${index}`} style={{ color: entry.stroke }} className="flex items-center gap-2 text-sm">
          <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.stroke }}></span>
          <span>{entry.name === 'falls' ? 'Falls Detected: ' : 'Alerts: '}{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export default FallDetectionGraph;
