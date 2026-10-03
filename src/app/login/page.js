'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Eye, EyeOff } from 'lucide-react';

import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeRole, setActiveRole] = useState('Freelancer');

  const roles = ['Freelancer', 'Admin', 'Client'];

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.auth.googleLogin(tokenResponse.access_token, activeRole.toLowerCase());
        localStorage.setItem('token', data.access_token);
        window.location.href = '/projects';
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    onError: () => {
      setError('Google login failed');
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('token', data.access_token);
      // Route based on role if needed, or default
      window.location.href = '/projects';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-1/2 p-4">
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-emerald-900">
          {/* Using object-cover to make the background fill the rounded container perfectly */}
          <Image
            src="/login/signin_img.webp"
            alt="Authentication Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 h-full">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <h2 className="text-3xl font-medium text-gray-900 mb-2 text-center">Welcome Back!</h2>
          <p className="text-gray-500 text-[14px] mb-8 text-center">
            Sign in to your account and continue where you left off.
          </p>

          {/* Role Tabs */}
          <div className="flex space-x-6 mb-8 border-b border-gray-100">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`pb-2 text-sm font-medium transition-colors relative ${activeRole === role ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {role}
                {activeRole === role && (
                  <motion.div
                    layoutId="activeRole"
                    className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-emerald-500"
                  />
                )}
              </button>
            ))}
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full py-2 border-b border-gray-300 focus:border-emerald-500 bg-transparent transition-all sm:text-sm outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full py-2 border-b border-gray-300 focus:border-emerald-500 bg-transparent transition-all sm:text-sm outline-none pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#34C759] hover:bg-[#2EB350] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34C759] transition-all disabled:opacity-50 mt-4"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or sign in with</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => loginWithGoogle()}
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-[#34C759] hover:text-[#2EB350]">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
