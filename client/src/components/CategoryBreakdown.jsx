import React from 'react';

const CategoryBreakdown = ({ transactions = [] }) => {
  // 1. Group by category
  const categoriesMap = transactions.reduce((acc, current) => {
    if (current.type === 'income') return acc;
    const cat = current.category || 'Other';
    acc[cat] = (acc[cat] || 0) + Number(current.amount);
    return acc;
  }, {});

  const totalExpense = Object.values(categoriesMap).reduce((a, b) => a + b, 0);

  const sortedCategories = Object.entries(categoriesMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const colors = [
    'bg-primary-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-blue-500'
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-tight mb-2">Category Breakdown</h4>
      
      {totalExpense === 0 ? (
        <p className="text-sm text-gray-400 italic">No expense data yet</p>
      ) : (
        <div className="space-y-4">
          {sortedCategories.map(([category, amount], index) => {
            const percentage = Math.round((amount / totalExpense) * 100);
            
            return (
              <div key={category} className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-gray-700">{category}</span>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
                    ₹{amount.toLocaleString()} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${colors[index % colors.length]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdown;
