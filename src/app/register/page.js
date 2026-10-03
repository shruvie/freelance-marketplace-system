'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Mail, Lock, ArrowRight, User, Briefcase } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.auth.register(email, password, fullName, role);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-10 h-10" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-4">Check your email</h2>
        <p className="text-gray-600 max-w-md">We've sent a verification link to {email}. Please click the link to verify your account and get started.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/40 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-300/40 blur-3xl mix-blend-multiply"></div>
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
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Join Company</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start hiring top AI talent or finding elite projects.
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
          <form className="space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setRole('client')}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${role === 'client' ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-200'}`}
              >
                <Briefcase className={`w-6 h-6 mb-2 ${role === 'client' ? 'text-emerald-500' : 'text-gray-400'}`} />
                <p className={`text-sm font-semibold ${role === 'client' ? 'text-emerald-900' : 'text-gray-600'}`}>I want to hire</p>
              </div>
              <div
                onClick={() => setRole('freelancer')}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${role === 'freelancer' ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-200 hover:border-emerald-200'}`}
              >
                <User className={`w-6 h-6 mb-2 ${role === 'freelancer' ? 'text-emerald-500' : 'text-gray-400'}`} />
                <p className={`text-sm font-semibold ${role === 'freelancer' ? 'text-emerald-900' : 'text-gray-600'}`}>I want to work</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 transition-all sm:text-sm outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-50 group mt-4"
            >
              {loading ? 'Creating account...' : 'Create Account'}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-500">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
