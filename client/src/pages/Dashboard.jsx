import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, TrendingDown, Wallet, Calendar, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import api from '../services/api';
import Layout from '../components/Layout';

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data on Load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/expenses');
        setExpenses(res.data.expenses || []); 
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Compute Totals
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  // Dummy Budget for visual prototype
  const budgetLimit = 50000;
  const remainingBudget = budgetLimit - totalExpenses;
  const progressPercent = Math.min((totalExpenses / budgetLimit) * 100, 100);

  return (
    <Layout>
      {/* 1. Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Hello, {user?.name?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your money today.</p>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Expenses Card (Premium Gradient) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white ">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-primary-50 tracking-wide opacity-90">Total Spent</span>
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">₹{totalExpenses.toLocaleString()}</div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary-50 bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
              <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              <span>+12% vs last month</span>
            </div>
          </div>
        </div>

        {/* Budget Status (Glass Card) */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-500 font-medium text-sm">Budget Left</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1 tracking-tight">₹{remainingBudget.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-secondary-50 text-secondary-600 rounded-2xl shadow-sm group-hover:bg-secondary-100 transition-colors">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-gray-400">Monthly Limit</span>
              <span className="text-gray-900">₹{budgetLimit.toLocaleString()}</span>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
               <div 
                 className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                   progressPercent > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-secondary-400 to-secondary-500'
                 }`} 
                 style={{ width: `${progressPercent}%` }} 
               />
            </div>
            <p className="text-xs text-gray-400 mt-3 text-right font-medium">{100 - Math.round(progressPercent)}% safe to spend</p>
          </div>
        </div>

        {/* Mini Stats / Placeholder (Glass Card) */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between group">
           <div>
             <div className="flex justify-between items-start">
               <div>
                  <p className="text-gray-500 font-medium text-sm">Daily Average</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1 flex items-baseline gap-1">
                    ₹{(totalExpenses / 30).toFixed(0)}
                    <span className="text-xs font-normal text-gray-400">/day</span>
                  </h3>
               </div>
               <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shadow-sm group-hover:bg-purple-100 transition-colors">
                  <Calendar className="w-6 h-6" />
               </div>
             </div>
           </div>
           
           <div className="mt-4 pt-4 border-t border-gray-100/50">
             <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Highest Spend</span>
                <span className="font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">₹2,400</span>
             </div>
           </div>
        </div>
      </div>

      {/* 3. Transaction List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg shadow-gray-100/50 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Transactions</h2>
          <button className="p-2 -mr-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
           <div className="p-12 text-center text-gray-400 animate-pulse">Loading transaction history...</div>
        ) : expenses.length === 0 ? (
           <div className="p-16 text-center">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-gray-300" />
             </div>
             <p className="text-gray-900 font-medium">No expenses yet</p>
             <p className="text-gray-500 text-sm mt-1">Add your first expense to get started</p>
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4 pl-8">Transaction</th>
                  <th className="px-6 py-4 hidden md:table-cell">Category</th>
                  <th className="px-6 py-4 hidden md:table-cell">Date</th>
                  <th className="px-6 py-4 text-right pr-8">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {expenses.map((expense) => (
                  <tr key={expense._id || expense.id} className="hover:bg-primary-50/30 transition-colors group cursor-default">
                    <td className="px-6 py-4 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-primary-600 shrink-0 group-hover:scale-105 group-hover:border-primary-100 transition-all duration-300">
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{expense.description || 'Unknown'}</p>
                          <p className="text-xs text-gray-500 md:hidden">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-gray-200 transition-all">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500 font-medium">
                      {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right pr-8">
                      <span className="font-bold text-gray-900 text-base">-₹{Number(expense.amount).toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;