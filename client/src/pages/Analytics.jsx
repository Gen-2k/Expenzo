import React from 'react';
import Layout from '../components/Layout';
import { PieChart, TrendingUp, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="mb-6">
           <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
           <p className="text-gray-500 text-sm mt-1">Deep dive into your financial spending habits.</p>
        </div>

        {/* 1. Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Total Spent', value: '₹45,230', trend: '+12%', color: 'from-blue-500 to-blue-600', icon: DollarSign },
             { label: 'Avg / Day', value: '₹1,450', trend: '-5%', color: 'from-purple-500 to-purple-600', icon: Calendar },
             { label: 'Highest Cat.', value: 'Rent', trend: 'Bills', color: 'from-pink-500 to-pink-600', icon: Layers },
             { label: 'Saved', value: '₹4,770', trend: '+8%', color: 'from-emerald-500 to-emerald-600', icon: TrendingUp },
           ].map((card, idx) => (
             <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.card} opacity-90 shadow-lg text-white ${card.color}`}>
                      <card.icon className="w-5 h-5" />
                   </div>
                   <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${card.trend.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {card.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {card.trend}
                   </div>
                </div>
                <div>
                   <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                   <h3 className="text-2xl font-bold text-gray-900 mt-1">{card.value}</h3>
                </div>
             </div>
           ))}
        </div>

        {/* 2. Main Chart Section (Visual Mockup) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Bar Chart Mock */}
           <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-lg font-bold text-gray-900">Spending Overview</h3>
                 <select className="bg-gray-50 border-none text-sm font-medium text-gray-600 rounded-lg px-3 py-2 cursor-pointer focus:ring-2 focus:ring-primary-200">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                 </select>
              </div>
              
              {/* CSS Bar Chart */}
              <div className="h-64 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
                 {[40, 65, 33, 85, 55, 70, 45, 60, 90, 50, 65, 75].map((h, i) => (
                    <div key={i} className="group relative flex-1 flex flex-col items-center gap-2">
                       <div 
                         className="w-full bg-primary-100 rounded-t-xl group-hover:bg-primary-500 transition-all duration-300 relative"
                         style={{ height: `${h}%` }}
                       >
                         {/* Tooltip */}
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ₹{h * 100}
                         </div>
                       </div>
                       <span className="text-xs text-gray-400 font-medium hidden sm:block">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                       </span>
                    </div>
                 ))}
              </div>
           </div>

           {/* Donut Chart Mock (Top Categories) */}
           <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Top Categories</h3>
              
              <div className="flex-1 flex flex-col justify-center space-y-6">
                 {[
                   { label: 'Food & Dining', percent: 45, color: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50' },
                   { label: 'Shopping', percent: 25, color: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50' },
                   { label: 'Bills', percent: 20, color: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50' },
                   { label: 'Others', percent: 10, color: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-100' },
                 ].map((cat) => (
                    <div key={cat.label}>
                       <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold text-gray-700">{cat.label}</span>
                          <span className={`font-bold ${cat.text}`}>{cat.percent}%</span>
                       </div>
                       <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }} />
                       </div>
                    </div>
                 ))}
              </div>

               <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <button className="text-primary-600 font-semibold text-sm hover:text-primary-800">View Full Report</button>
               </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
