'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, CheckCircle, Bookmark, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { api } from '@/lib/api';
import Link from 'next/link';

const INITIAL_MOCK_PROJECTS = [
  {
    id: 1,
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    posted: "Posted 2 hrs ago",
    title: "AI Powered ethics & civic app development",
    hours: "10-20 hrs/week",
    level: "Intermediate Level",
    paymentVerified: true,
    rating: 4,
    spent: "$400 Spent",
    price: 420,
    location: "San Francisco, CA"
  },
  {
    id: 2,
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    posted: "Posted 5 hrs ago",
    title: "Next.js Dashboard for AI Analytics",
    hours: "30+ hrs/week",
    level: "Expert Level",
    paymentVerified: true,
    rating: 5,
    spent: "$10k+ Spent",
    price: 1500,
    location: "Remote"
  },
  {
    id: 3,
    company: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    posted: "Posted 1 day ago",
    title: "React Native Mobile App UI Refactor",
    hours: "20-30 hrs/week",
    level: "Intermediate Level",
    paymentVerified: false,
    rating: 3,
    spent: "$0 Spent",
    price: 300,
    location: "Remote"
  }
];

export default function FindProjects() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(INITIAL_MOCK_PROJECTS);
  
  // Filter States
  const [hoursFilter, setHoursFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    api.auth.me().then(data => {
      setUser(data);
    }).catch(console.error);
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = [...INITIAL_MOCK_PROJECTS];
    
    if (hoursFilter) {
      filtered = filtered.filter(p => p.hours === hoursFilter);
    }
    
    if (ratingFilter) {
      filtered = filtered.filter(p => p.rating >= ratingFilter);
    }
    
    if (minPrice && !isNaN(minPrice)) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }
    
    if (maxPrice && !isNaN(maxPrice)) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }
    
    setProjects(filtered);
  }, [hoursFilter, ratingFilter, minPrice, maxPrice]);

  const resetFilters = () => {
    setHoursFilter('');
    setRatingFilter(null);
    setMinPrice('');
    setMaxPrice('');
  };

  // Dynamic Profile Completion Calculation
  const calculateCompletion = () => {
    if (!user || !user.profile) return 0;
    const fields = ['title', 'bio', 'location', 'hourly_rate', 'experience_years', 'skills'];
    let filled = 0;
    fields.forEach(field => {
      if (user.profile[field] && user.profile[field].toString().length > 0) filled++;
    });
    // Add base 20% for just creating the account
    return Math.min(100, Math.round((filled / fields.length) * 80) + 20);
  };

  const completionPercent = calculateCompletion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column: Filters */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-[100px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-gray-900">Property Filter</h2>
            <button onClick={resetFilters} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Reset all</button>
          </div>

          {/* Hours filter */}
          <div className="mb-6">
            <label className="block text-[13px] font-medium text-gray-500 mb-2">Hours per week</label>
            <div className="relative">
              <select 
                value={hoursFilter}
                onChange={(e) => setHoursFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
              >
                <option value="">Select work hours per week</option>
                <option value="10-20 hrs/week">10-20 hrs/week</option>
                <option value="20-30 hrs/week">20-30 hrs/week</option>
                <option value="30+ hrs/week">30+ hrs/week</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-6">
            <label className="block text-[13px] font-medium text-gray-500 mb-2">Minimum Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button 
                  key={num} 
                  onClick={() => setRatingFilter(num === ratingFilter ? null : num)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium transition-all ${
                    ratingFilter === num 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md' 
                      : 'border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[13px] font-medium text-gray-500 mb-2">Price range ($)</label>
            <div className="flex items-center gap-4 mb-4">
              <input 
                type="number" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min" 
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500" 
              />
              <input 
                type="number" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max" 
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Column: Projects Feed */}
      <div className="lg:col-span-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Find Projects</h1>
          <p className="text-gray-500 text-sm">Find Projects as per your relevance</p>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">
            No projects match your current filters.
          </div>
        ) : (
          projects.map((project, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={project.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative hover:border-emerald-200 transition-colors"
            >
              <button className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Save <Bookmark className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <img src={project.logo} alt={project.company} className="w-full h-auto max-h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{project.company}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> {project.posted}
                  </p>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-3">{project.title}</h2>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">{project.hours}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">{project.level}</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 mb-6">
                <div className={`flex items-center gap-1 ${project.paymentVerified ? 'text-emerald-600' : 'text-gray-400'}`}>
                  <ShieldCheck className="w-4 h-4" /> {project.paymentVerified ? 'Payment Verified' : 'Unverified'}
                </div>
                <div className="flex items-center text-yellow-400">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-3.5 h-3.5 ${star <= project.rating ? 'fill-current' : 'text-gray-200 fill-current'}`} />
                  ))}
                </div>
                <span>{project.spent}</span>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 flex items-end justify-between">
                <div>
                  <div className="text-xl font-bold text-gray-900">${project.price}</div>
                  <div className="text-xs text-gray-400 font-medium">{project.location}</div>
                </div>
                
                <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-200">
                  Send Proposal
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Right Column: Profile Summary */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-[100px]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              {user?.profile?.profile_image ? (
                <img src={user.profile.profile_image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 font-bold text-xl">{user?.full_name?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight">
                {user?.full_name || 'User'}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {user?.profile?.title || 'Freelancer'}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-emerald-500 rounded-full" 
              />
            </div>
            <p className="text-xs font-bold text-gray-900 mt-3">Your profile is {completionPercent}% Completed!</p>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Add Projects, Add Experience and more to get your proposals accepted!
          </p>
          
          <Link href="/freelancer/profile" className="block w-full text-center px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg transition-colors border border-gray-200">
            View Public Profile
          </Link>
        </div>
      </div>

    </div>
  );
}
