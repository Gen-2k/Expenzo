import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  Search,
  ArrowDownUp,
  Download,
  MoreHorizontal,
  ShoppingBag,
  Coffee,
  Car,
  Home,
} from 'lucide-react';

const Transactions = () => {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');

  // --- Mock Data (Replace with API call later) ---
  const transactions = [
    {
      id: 1,
      description: 'Grocery Shopping',
      category: 'Food',
      amount: 450,
      date: '2023-10-25',
      icon: ShoppingBag,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 2,
      description: 'Uber Ride to Office',
      category: 'Transport',
      amount: 230,
      date: '2023-10-24',
      icon: Car,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      description: 'Morning Coffee',
      category: 'Food',
      amount: 120,
      date: '2023-10-24',
      icon: Coffee,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 4,
      description: 'Internet Bill',
      category: 'Bills',
      amount: 1299,
      date: '2023-10-22',
      icon: Home,
      color: 'bg-red-100 text-red-600',
    },
    {
      id: 5,
      description: 'Movie Night',
      category: 'Entertainment',
      amount: 800,
      date: '2023-10-20',
      icon: ShoppingBag,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 6,
      description: 'Weekly Groceries',
      category: 'Food',
      amount: 1200,
      date: '2023-10-18',
      icon: ShoppingBag,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  // --- Filters ---
  const FILTERS = ['All', 'Food', 'Transport', 'Bills', 'Shopping'];

  return (
    <Layout>
      <div className="space-y-6">
        {/* --- SECTION 1: HEADER & ACTIONS --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Transactions
            </h1>
            <p className="text-gray-500">
              Manage and track your expenses history
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 btn-secondary py-2.5 px-5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center gap-2 btn-primary py-2.5 px-5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium transition-colors">
              <ArrowDownUp className="w-4 h-4" />
              <span>Sort</span>
            </button>
          </div>
        </div>

        {/* --- SECTION 2: SEARCH & FILTER BAR --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-primary-100 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {FILTERS.map((filter, idx) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  idx === 0
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* --- SECTION 3: TRANSACTIONS TABLE --- */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4 pl-8">Transaction Info</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-100">
                {transactions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/80 transition-all group"
                  >
                    {/* Info Column */}
                    <td className="px-6 py-4 pl-8">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}
                        >
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            ID: #TRX-{1000 + item.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-transparent">
                        {item.category}
                      </span>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.date).getFullYear()}
                        </span>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                          Completed
                        </span>
                      </div>
                    </td>

                    {/* Amount Column */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-base font-bold text-gray-900">
                        -₹{item.amount.toLocaleString()}
                      </span>
                    </td>

                    {/* Action Column */}
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- SECTION 4: PAGINATION (MOCK) --- */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <span className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-900">1-6</span>{' '}
              of 24 results
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-200 transition-all disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-gray-900 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-all">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
