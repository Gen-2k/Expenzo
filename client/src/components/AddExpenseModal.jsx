import React, { useState } from 'react';
import { X, Calendar, Tag, DollarSign, AlignLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const AddExpenseModal = ({ onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food', // Default
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  // Predefined Categories with Colors (could be dynamic later)
  const categories = [
    {
      id: 'Food',
      label: 'Food & Dining',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      id: 'Transportation',
      label: 'Transport',
      color: 'bg-blue-100 text-blue-600',
    },
    { id: 'Shopping', label: 'Shopping', color: 'bg-pink-100 text-pink-600' },
    {
      id: 'Entertainment',
      label: 'Entertainment',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'Bills',
      label: 'Bills & Utilities',
      color: 'bg-red-100 text-red-600',
    },
    { id: 'Others', label: 'Others', color: 'bg-gray-100 text-gray-600' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/expenses', formData);
      toast.success('Expense added successfully!');
      onClose();
      // Optional: Trigger a refresh of the dashboard data -> can use Context or just reload for prototype
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white text-lg font-semibold">New Expense</h2>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Amount Input */}
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Amount
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-2xl font-bold text-gray-400">
                ₹
              </span>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full pl-10 pr-4 py-4 bg-gray-50 rounded-2xl text-3xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-100 border-none transition-all placeholder:text-gray-300"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all text-left flex items-center gap-2 ${
                    formData.category === cat.id
                      ? 'bg-primary-50 ring-2 ring-primary-500 text-primary-700'
                      : 'bg-white border border-gray-100 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${cat.color.split(' ')[0].replace('100', '400')}`}
                  />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Note */}
          <div className="space-y-4">
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Note (Optional)"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-600/30 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? 'Adding...' : 'Save Expense'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
