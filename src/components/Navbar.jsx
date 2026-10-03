'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Menu, User, Bell, LogOut } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    api.auth.me().then(data => {
      setUser(data);
    }).catch(() => {
      setUser(null);
    });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <motion.div
              whileHover={{ rotate: 90 }}
              className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 cursor-pointer"
            >
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </motion.div>
          </Link>
          <Link href="/">
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 cursor-pointer">Company</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Projects', 'Freelancers'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden lg:block group">
            <input
              type="text"
              placeholder="Search talent, jobs..."
              className="pl-10 pr-4 py-2.5 bg-white text-black border border-transparent focus:bg-white focus:border-emerald-500 rounded-full text-sm w-64 transition-all focus:w-72 outline-none shadow-inner"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3 group-focus-within:text-emerald-500 transition-colors" />
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-emerald-600 transition-colors hidden sm:block">
                <Bell className="w-5 h-5" />
              </button>
              
              <Link href="/profile">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-2 border-transparent hover:border-emerald-300 transition-all cursor-pointer overflow-hidden">
                  {user.profile?.profile_image ? (
                    <img src={user.profile.profile_image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </motion.div>
              </Link>
              
              <button onClick={handleSignOut} className="text-gray-500 hover:text-red-500 transition-colors" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black">
                  Sign In
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="hidden sm:flex px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold shadow-lg shadow-gray-300 hover:shadow-xl transition-all">
                  Join Now
                </Link>
              </motion.div>
            </>
          )}

          <button className="md:hidden p-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
