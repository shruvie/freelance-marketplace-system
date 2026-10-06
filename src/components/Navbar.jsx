'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, User, Bell, MessageSquare, Star, LogOut, ChevronDown, Briefcase, FileText, Settings } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    api.auth.me().then(data => {
      setUser(data);
    }).catch(() => {
      setUser(null);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsDropdownOpen(false);
    router.push('/');
  };

  const navLinks = user?.role?.toLowerCase() === 'client' 
    ? [{ name: 'Find Freelancers', href: '/client/find-freelancers' }, { name: 'My Contracts', href: '/client/contracts' }]
    : [{ name: 'Find Projects', href: '/freelancer/find-projects' }, { name: 'My Projects', href: '/freelancer/projects' }];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-100"
    >
      <div className="max-w-[1400px] mx-auto px-6 h-[80px] flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="font-semibold text-[22px] tracking-wide text-gray-900 cursor-pointer">
              Freelance Marketplace
            </span>
          </Link>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex items-center gap-10">
          {user && navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[15px] font-medium text-gray-700 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: Icons & Profile */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-5">
              
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                <MessageSquare className="w-[18px] h-[18px]" />
              </button>
              
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                <Bell className="w-[18px] h-[18px]" />
              </button>
              
              <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">
                <Star className="w-[18px] h-[18px]" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 border border-gray-200 hover:border-gray-300 transition-all overflow-hidden focus:outline-none"
                >
                  {user.profile?.profile_image ? (
                    <img src={user.profile.profile_image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-50 mb-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      <Link href={`/${user.role?.toLowerCase() || 'freelancer'}/profile`}>
                        <div onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                          <User className="w-4 h-4 text-gray-400" />
                          My Profile
                        </div>
                      </Link>
                      
                      <Link href={`/${user.role?.toLowerCase() || 'freelancer'}/contracts`}>
                        <div onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                          <FileText className="w-4 h-4 text-gray-400" />
                          My Contracts
                        </div>
                      </Link>
                      
                      <Link href={`/${user.role?.toLowerCase() || 'freelancer'}/settings`}>
                        <div onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                          Settings
                        </div>
                      </Link>
                      
                      <div className="border-t border-gray-50 mt-2 pt-2">
                        <div 
                          onClick={handleSignOut} 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          Log Out
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          ) : (
            <>
              <Link href="/login" className="text-[15px] font-medium text-gray-700 hover:text-black">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-black text-white rounded-full text-[15px] font-medium hover:bg-gray-900 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
