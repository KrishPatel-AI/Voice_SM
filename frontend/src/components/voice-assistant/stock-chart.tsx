'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function StockChart({ data, color = '#10b981' }) {
  // Ensure we have data to display
  if (!data || data.length === 0) {
    return (
      <div className='h-48 flex items-center justify-center text-muted-foreground'>
        No chart data available
      </div>
    );
  }

  // Format the tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-background p-2 border rounded-md shadow-sm'>
          <p className='font-medium'>{`${label}`}</p>
          <p className='text-sm'>{`Price: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis
          dataKey='date'
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => {
            // Format date for display, assuming ISO date string
            const date = new Date(value);
            return date.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            });
          }}
          minTickGap={30}
        />
        <YAxis
          domain={['dataMin', 'dataMax']}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value.toFixed(0)}`}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type='monotone'
          dataKey='price'
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
