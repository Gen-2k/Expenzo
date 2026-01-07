import Layout from '../components/Layout';
import {
  Plus,
  AlertCircle,
  CheckCircle,
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Zap,
} from 'lucide-react';

const Budgets = () => {
  // --- Constant Data (Mock) ---
  const BUDGETS = [
    {
      id: 1,
      category: 'Food & Dining',
      spent: 12450,
      limit: 15000,
      icon: Coffee,
      color: 'bg-orange-100 text-orange-600',
      hue: 'orange',
    },
    {
      id: 2,
      category: 'Transportation',
      spent: 4200,
      limit: 5000,
      icon: Car,
      color: 'bg-blue-100 text-blue-600',
      hue: 'blue',
    },
    {
      id: 3,
      category: 'Shopping',
      spent: 8500,
      limit: 8000,
      icon: ShoppingBag,
      color: 'bg-purple-100 text-purple-600',
      hue: 'purple',
    },
    {
      id: 4,
      category: 'Bills & Utilities',
      spent: 3200,
      limit: 6000,
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600',
      hue: 'yellow',
    },
    {
      id: 5,
      category: 'Rent',
      spent: 15000,
      limit: 15000,
      icon: Home,
      color: 'bg-indigo-100 text-indigo-600',
      hue: 'indigo',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* --- SECTION 1: HEADER & ACTIONS --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Monthly Budgets
            </h1>
            <p className="text-gray-500">
              Set limits to stay in control of your spending.
            </p>
          </div>
          <button className="flex items-center gap-2 btn-secondary bg-gray-900 text-white hover:bg-gray-800 py-2.5 px-5 rounded-xl font-medium transition-all shadow-lg shadow-gray-900/10">
            <Plus className="w-5 h-5" />
            <span>Create Budget</span>
          </button>
        </div>

        {/* --- SECTION 2: SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Budgeted (Premium) */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
            <p className="text-indigo-100 font-medium text-sm">
              Total Budgeted
            </p>
            <h3 className="text-3xl font-bold mt-1 text-white">₹49,000</h3>
            <div className="mt-4 flex items-center gap-2 text-indigo-200 text-xs bg-white/10 w-fit px-2 py-1 rounded-lg">
              <CheckCircle className="w-3 h-3" />
              <span>5 Categories Active</span>
            </div>
          </div>

          {/* Card 2: Total Spent */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium text-sm">Total Spent</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">₹43,350</h3>
            <div className="mt-4 text-xs font-semibold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg">
              88% Used
            </div>
          </div>

          {/* Card 3: Remaining */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium text-sm">Remaining</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">₹5,650</h3>
            <div className="mt-4 text-xs font-semibold text-gray-500 bg-gray-50 w-fit px-2 py-1 rounded-lg">
              Sticking to plan
            </div>
          </div>
        </div>

        {/* --- SECTION 3: BUDGET LIST GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BUDGETS.map((budget) => {
            // Calculations
            const percent = Math.min((budget.spent / budget.limit) * 100, 100);
            const isOver = budget.spent > budget.limit;
            const isWarning = percent > 85 && !isOver;

            return (
              <div
                key={budget.id}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all group hover:border-gray-200"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${budget.color} transition-colors`}
                    >
                      <budget.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {budget.category}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        ₹{budget.spent.toLocaleString()} of ₹
                        {budget.limit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {isOver ? (
                    <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Exceeded</span>
                    </div>
                  ) : isWarning ? (
                    <div className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold">
                      Near Limit
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
                      On Track
                    </div>
                  )}
                </div>

                {/* Progress Bar Section */}
                <div className="relative pt-2">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className={isOver ? 'text-red-500' : 'text-gray-500'}>
                      {Math.round(percent)}%
                    </span>
                    <span className="text-gray-400">
                      Target: ₹{budget.limit.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isOver
                          ? 'bg-red-500'
                          : isWarning
                            ? 'bg-yellow-500'
                            : 'bg-primary-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Budgets;
