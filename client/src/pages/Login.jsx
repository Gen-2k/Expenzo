import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Wallet, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-6 px-4 md:py-12 sm:px-6 lg:px-8">
      {/* Premium Side Glow Effects - Top Left */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-multiply filter animate-pulse"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-multiply"></div>

      {/* Premium Side Glow Effects - Bottom Right */}
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-multiply filter animate-pulse delay-700"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-multiply"></div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] relative z-10 shadow-2xl shadow-indigo-100 border border-white/50 transition-all hover:shadow-indigo-200/50">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-8 text-3xl font-black text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-3 text-base text-gray-500 font-medium">
            Enter your details to access your dashboard
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-xl shadow-gray-900/20 transition-all ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:-translate-y-1 active:scale-[0.98]'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                {!isSubmitting && (
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                )}
              </span>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center mt-6 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/50 backdrop-blur-sm text-gray-500 font-medium">
                  New to Expenzo?
                </span>
              </div>
            </div>
            <Link
              to="/register"
              className="block w-full py-4 px-4 rounded-2xl border-2 border-gray-100 text-sm font-bold text-gray-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/10 transition-all text-center"
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
