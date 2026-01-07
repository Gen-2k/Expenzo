import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  ArrowUpRight,
  MoreVertical,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';
import Layout from '../components/Layout';
import DashboardChart from '../components/DashboardChart';
import CategoryBreakdown from '../components/CategoryBreakdown';

const Dashboard = () => {
  // --- State & Hooks ---
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Constants (Visual Prototype) ---
  const BUDGET_LIMIT = 50000;

  // --- Effects ---
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get('/transactions');
        // Ensure we always have an array. API returns data.transactions
        setTransactions(res.data.transactions || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // --- Calculations ---
  // 1. Separate Income and Expenses
  // Assume if type is missing, it is an expense (backward compatibility)
  const incomeItems = transactions.filter(item => item.type === 'income');
  const expenseItems = transactions.filter(item => item.type !== 'income');

  // 2. Calculate Totals
  const totalIncome = incomeItems.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenseItems.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalBalance = totalIncome - totalExpenses;

  // 3. Calculate Budget Progress (based on Expenses only)
  const remainingBudget = BUDGET_LIMIT - totalExpenses;
  const progressPercent = Math.min((totalExpenses / BUDGET_LIMIT) * 100, 100);
  const isBudgetSafe = progressPercent < 80;

  return (
    <Layout>
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 
          </h1>
          <p className="text-gray-500 font-medium">Here's your financial intelligence overview.</p>
        </div>
        <div className="hidden md:flex p-1 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <button className="px-5 py-2.5 text-sm font-bold bg-primary-600 text-white rounded-xl shadow-lg shadow-primary-600/20">Overview</button>
          <button className="px-5 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600">Reports</button>
        </div>
      </div>

      {/* 2. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main Stats & Activity (65-70%) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Primary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Balance Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-primary-600/20 group">
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xl border border-white/10">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-primary-50 tracking-wide">Total Balance</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                    ₹{totalBalance.toLocaleString()}
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${
                    totalBalance >= 0 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20' : 'bg-rose-500/20 text-rose-300 border-rose-500/20'
                  }`}>
                    {totalBalance >= 0 ? '● Positive Growth' : '● Overdrawn'}
                  </span>
                </div>
              </div>
            </div>

            {/* Income & Expense Mini-Cards */}
            <div className="grid grid-rows-2 gap-6">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Monthly Income</p>
                    <h3 className="text-2xl font-bold text-gray-900">₹{totalIncome.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="text-emerald-500 font-bold text-sm bg-emerald-50 px-2.5 py-1 rounded-lg">+4.2%</div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-rose-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Monthly Spent</p>
                    <h3 className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</h3>
                  </div>
                </div>
                <div className="text-rose-500 font-bold text-sm bg-rose-50 px-2.5 py-1 rounded-lg">High</div>
              </div>
            </div>
          </div>

          {/* Visual Trends Section */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 overflow-hidden">
             <DashboardChart transactions={transactions} />
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
              <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-12 text-center text-gray-400">Loading...</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {transactions.slice(0, 5).map((t) => {
                    const isIncome = t.type === 'income';
                    return (
                      <div key={t._id || t.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                            isIncome ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                            {isIncome ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 line-clamp-1">{t.description}</p>
                            <p className="text-xs text-gray-400 font-medium">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <span className={`text-base font-bold ${isIncome ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {isIncome ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Insights & Details (30-35%) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Budget Widget */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Budget Health</h4>
            <div className="relative flex flex-col items-center justify-center py-4">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={440} 
                    strokeDashoffset={440 - (440 * progressPercent) / 100}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ${isBudgetSafe ? 'text-primary-600' : 'text-rose-500'}`} 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-gray-900">{Math.round(progressPercent)}%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Limit Reached</span>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4 pt-6 border-t border-gray-50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Monthly Limit</span>
                <span className="font-bold text-gray-900">₹{BUDGET_LIMIT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Remaining</span>
                <span className={`font-bold ${remainingBudget > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  ₹{Math.max(0, remainingBudget).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Category Breakdown Widget */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <CategoryBreakdown transactions={transactions} />
          </div>

          {/* Smart Insight Teaser */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[2.5rem] text-white shadow-xl shadow-gray-200">
            <div className="flex items-center gap-2 mb-4 text-primary-400">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">AI Financial Coach</span>
            </div>
            <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
              "You spent 15% more on Dining this week than usual. Consider packing lunch tomorrow to save approximately ₹400."
            </p>
            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10">
              Get Detailed Analysis
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
