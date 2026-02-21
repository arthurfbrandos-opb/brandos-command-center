'use client';

import {
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type DataPoint = Record<string, string | number>;

interface ChartLine {
  key: string;
  color: string;
}

interface MetricsChartProps {
  data: DataPoint[];
  type?: 'line' | 'area' | 'bar';
  title?: string;
  xKey?: string;
  lines?: ChartLine[];
}

const tooltipStyle = {
  contentStyle: { backgroundColor: '#1A1F3A', border: '1px solid #00FF00', borderRadius: '8px' },
  labelStyle: { color: '#FFFFFF' },
  itemStyle: { color: '#00FF00' },
};

export default function MetricsChart({
  data,
  type = 'line',
  title,
  xKey = 'name',
  lines = [{ key: 'value', color: '#00FF00' }],
}: MetricsChartProps) {
  const commonProps = {
    data,
    margin: { top: 5, right: 30, left: 0, bottom: 5 },
  };

  const commonAxis = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#2A2F4A" />
      <XAxis dataKey={xKey} stroke="#CCCCCC" tick={{ fill: '#CCCCCC', fontSize: 12 }} />
      <YAxis stroke="#CCCCCC" tick={{ fill: '#CCCCCC', fontSize: 12 }} />
      <Tooltip {...tooltipStyle} />
      <Legend wrapperStyle={{ color: '#CCCCCC' }} />
    </>
  );

  const renderChart = () => {
    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            {lines.map((line) => (
              <linearGradient key={line.key} id={`grad-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={line.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={line.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          {commonAxis}
          {lines.map((line) => (
            <Area
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              fill={`url(#grad-${line.key})`}
            />
          ))}
        </AreaChart>
      );
    }

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          {commonAxis}
          {lines.map((line) => (
            <Bar key={line.key} dataKey={line.key} fill={line.color} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      );
    }

    return (
      <LineChart {...commonProps}>
        {commonAxis}
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            dot={{ fill: line.color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    );
  };

  return (
    <div>
      {title && <h3 className="text-lg font-bold text-brandos-primary mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={250}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
