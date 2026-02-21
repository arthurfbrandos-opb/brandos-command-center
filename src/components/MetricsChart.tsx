'use client';

import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MetricsChartProps {
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  type?: 'line' | 'area' | 'bar';
  title?: string;
  lines?: Array<{
    key: string;
    color: string;
  }>;
}

export default function MetricsChart({ 
  data, 
  type = 'line',
  title,
  lines = [
    { key: 'value', color: '#00FF00' }
  ]
}: MetricsChartProps) {
  const chartProps = {
    width: '100%',
    height: 300,
    data,
    margin: { top: 5, right: 30, left: 0, bottom: 5 },
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart {...chartProps}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF00" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F4A" />
            <XAxis stroke="#CCCCCC" />
            <YAxis stroke="#CCCCCC" />
            <Tooltip contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #00FF00' }} />
            {lines.map((line) => (
              <Area
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            ))}
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F4A" />
            <XAxis stroke="#CCCCCC" />
            <YAxis stroke="#CCCCCC" />
            <Tooltip contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #00FF00' }} />
            <Legend />
            {lines.map((line) => (
              <Bar key={line.key} dataKey={line.key} fill={line.color} />
            ))}
          </BarChart>
        );

      default: // line
        return (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F4A" />
            <XAxis stroke="#CCCCCC" />
            <YAxis stroke="#CCCCCC" />
            <Tooltip contentStyle={{ backgroundColor: '#1A1F3A', border: '1px solid #00FF00' }} />
            <Legend />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                dot={{ fill: line.color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="card">
      {title && (
        <h3 className="text-lg font-bold text-brandos-primary mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
