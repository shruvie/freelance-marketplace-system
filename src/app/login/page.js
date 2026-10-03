'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('token', data.access_token);
      window.location.href = '/projects';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/40 blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-300/40 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200 mb-6">
            <div className="w-6 h-6 bg-white rounded-md"></div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-gray-200/50 sm:rounded-3xl sm:px-10 border border-white">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700">Email address</label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 transition-all sm:text-sm outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 transition-all sm:text-sm outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-semibold text-emerald-600 hover:text-emerald-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-50 group"
            >
              {loading ? 'Signing in...' : 'Sign in'}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>



          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-emerald-600 hover:text-emerald-500">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
