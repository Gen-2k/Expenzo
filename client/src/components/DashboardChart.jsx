import React from 'react';

const DashboardChart = ({ data = [] }) => {
  // Simple SVG Line Chart implementation
  // data: array of objects { date, amount }
  
  const height = 160;
  const width = 500;
  const padding = 20;

  // Mock points for a nice wave if data is insufficient
  const points = data.length > 0 ? data : [
    { x: 0, y: 80 }, { x: 100, y: 40 }, { x: 200, y: 90 }, 
    { x: 300, y: 50 }, { x: 400, y: 70 }, { x: 500, y: 30 }
  ];

  // Map values to coordinates
  const maxVal = Math.max(...points.map(p => p.amount || p.y)) || 100;
  const svgPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const val = p.amount || p.y;
    const y = height - (val / maxVal) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-48 bg-white/50 rounded-2xl p-4 overflow-hidden">
      <div className="flex justify-between items-end mb-4">
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-tight">Spending Trend</h4>
        <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">Last 7 Days</span>
      </div>
      
      <div className="relative h-28 w-full group">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(79, 70, 229)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under line */}
          <path
            d={`M 0,${height} ${svgPoints} L ${width},${height} Z`}
            fill="url(#chartGradient)"
            className="transition-all duration-1000"
          />

          {/* Line */}
          <polyline
            fill="none"
            stroke="rgb(79, 70, 229)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={svgPoints}
            className="drop-shadow-lg transition-all duration-1000"
          />

          {/* Points */}
          {points.map((p, i) => {
            const x = (i / (points.length - 1)) * width;
            const val = p.amount || p.y;
            const y = height - (val / maxVal) * (height - padding * 2) - padding;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                className="fill-white stroke-primary-600 stroke-2 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DashboardChart;
