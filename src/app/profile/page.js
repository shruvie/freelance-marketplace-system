'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Briefcase, Settings, Star, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.auth.me();
        setUser(userData);
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 z-0 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 border-4 border-white shadow-xl shrink-0">
              <User className="w-16 h-16" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-1">My Profile</h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                  Edit Profile
                </button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2 rounded-xl">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  Verified Account
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2 rounded-xl">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  Joined {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                Account Settings
              </h3>
              <ul className="space-y-3">
                {['Personal Information', 'Billing & Payments', 'Security', 'Notifications'].map((item, i) => (
                  <li key={i}>
                    <button className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-emerald-500" />
                  Recent Activity
                </h2>
              </div>
              
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No activity yet</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                  You haven't applied to any projects or posted any jobs yet. Start exploring the marketplace!
                </p>
                <Link href="/projects">
                  <button className="px-6 py-2.5 bg-emerald-50 text-emerald-700 font-semibold rounded-full hover:bg-emerald-100 transition-colors">
                    Explore Projects
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
