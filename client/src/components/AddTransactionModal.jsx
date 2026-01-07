import React, { useState } from 'react';
import { X, Calendar, AlignLeft, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const AddTransactionModal = ({ onClose }) => {
  const { user } = useAuth();
  
  // State
  const [transactionType, setTransactionType] = useState('expense'); // 'expense' | 'income'
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  // --- Constants ---
  const EXPENSE_CATEGORIES = [
    { id: 'Food', label: 'Food & Dining', color: 'bg-orange-100 text-orange-600' },
    { id: 'Transportation', label: 'Transport', color: 'bg-blue-100 text-blue-600' },
    { id: 'Shopping', label: 'Shopping', color: 'bg-pink-100 text-pink-600' },
    { id: 'Entertainment', label: 'Entertainment', color: 'bg-purple-100 text-purple-600' },
    { id: 'Bills', label: 'Bills & Utilities', color: 'bg-red-100 text-red-600' },
    { id: 'Others', label: 'Others', color: 'bg-gray-100 text-gray-600' },
  ];

  const INCOME_CATEGORIES = [
    { id: 'Salary', label: 'Salary', color: 'bg-green-100 text-green-600' },
    { id: 'Freelance', label: 'Freelance', color: 'bg-teal-100 text-teal-600' },
    { id: 'Investments', label: 'Investments', color: 'bg-indigo-100 text-indigo-600' },
    { id: 'Gift', label: 'Gifts', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'Others', label: 'Other Income', color: 'bg-gray-100 text-gray-600' },
  ];

  // Helper to get active config based on type
  const isExpense = transactionType === 'expense';
  const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const themeColor = isExpense ? 'primary' : 'emerald'; // expense=primary(indigo), income=emerald
  
  // Set default category when type changes
  React.useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      category: isExpense ? 'Food' : 'Salary' 
    }));
  }, [transactionType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call with type field
      await api.post('/transactions', {
        ...formData,
        type: transactionType
      });
      
      toast.success(`${isExpense ? 'Expense' : 'Income'} added successfully!`);
      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      toast.error('Failed to save transaction');
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
        <div className={`px-6 py-4 flex items-center justify-between transition-colors duration-500 ${
          isExpense 
            ? 'bg-gradient-to-r from-primary-600 to-primary-800' 
            : 'bg-gradient-to-r from-emerald-600 to-emerald-800'
        }`}>
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            {isExpense ? 'New Expense' : 'New Income'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transaction Type Toggle */}
        <div className="px-6 pt-6">
          <div className="flex p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setTransactionType('expense')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                isExpense ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ArrowDownCircle className={`w-4 h-4 ${isExpense ? 'text-red-500' : ''}`} />
              Expense
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('income')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                !isExpense ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ArrowUpCircle className={`w-4 h-4 ${!isExpense ? 'text-green-500' : ''}`} />
              Income
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Amount Input */}
          <div className="relative">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Amount
            </label>
            <div className="relative flex items-center">
              <span className={`absolute left-4 text-2xl font-bold ${isExpense ? 'text-primary-200' : 'text-emerald-200'}`}>
                ₹
              </span>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={`w-full pl-10 pr-4 py-4 bg-gray-50 rounded-2xl text-3xl font-bold text-gray-900 focus:outline-none focus:ring-2 border-none transition-all placeholder:text-gray-300 ${
                  isExpense ? 'focus:ring-primary-100' : 'focus:ring-emerald-100'
                }`}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Category
            </label>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`p-3 rounded-xl text-sm font-medium transition-all text-left flex items-center gap-2 ${
                    formData.category === cat.id
                      ? isExpense 
                        ? 'bg-primary-50 ring-2 ring-primary-500 text-primary-700'
                        : 'bg-emerald-50 ring-2 ring-emerald-500 text-emerald-700'
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
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 transition-all ${
                  isExpense ? 'focus:ring-primary-100' : 'focus:ring-emerald-100'
                }`}
              />
            </div>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 transition-all ${
                  isExpense ? 'focus:ring-primary-100' : 'focus:ring-emerald-100'
                }`}
                placeholder="Note (Optional)"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 ${
              isExpense 
                ? 'bg-primary-600 hover:bg-primary-700 shadow-primary-600/30' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
            }`}
          >
            {loading ? 'Saving...' : `Save ${isExpense ? 'Expense' : 'Income'}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
