import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    setIsSubmitting(true);
    try {
      // Register the user
      await api.post('/auth/register', { name, email, password });
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      const message = error.response?.data?.message || 'Registration failed.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
       {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl relative z-10 transition-all">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary-500/30">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Start your journey to better financial health
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-secondary-500 transition-colors" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 transition-all font-medium"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-secondary-500 transition-colors" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 transition-all font-medium"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-secondary-500 transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 transition-all font-medium"
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
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 shadow-xl shadow-secondary-600/30 transition-all ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                 {!isSubmitting && <ArrowRight className="h-5 w-5 text-secondary-400 group-hover:text-secondary-300 transition-colors" />}
              </span>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          <div className="text-center mt-4 space-y-4">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
            <Link
              to="/login"
              className="block w-full py-3 px-4 rounded-2xl border-2 border-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-center"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
