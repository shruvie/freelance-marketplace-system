'use client';

import { motion } from 'framer-motion';
import { mockFreelancers } from '@/lib/mockData';
import { Star, MapPin, Award, Search, Filter } from 'lucide-react';
import Image from 'next/image';

export default function FreelancersPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Top AI Talent</h1>
            <p className="mt-2 text-lg text-gray-600">Hire elite AI engineers, researchers, and agents for your projects.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search talent..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64 bg-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700 font-medium transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFreelancers.map((freelancer, index) => (
            <motion.div 
              key={freelancer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={freelancer.imageUrl} 
                      alt={freelancer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-gray-900">{freelancer.hourlyRate}</span>
                    <div className="flex items-center gap-1 mt-1 text-amber-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold text-gray-700">{freelancer.rating}</span>
                      <span className="text-xs text-gray-400">({freelancer.reviews})</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {freelancer.name}
                </h3>
                <p className="text-sm font-medium text-emerald-600 mb-4">{freelancer.title}</p>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {freelancer.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {freelancer.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-100">
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills.length > 3 && (
                     <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-100">
                      +{freelancer.skills.length - 3}
                    </span>
                  )}
                </div>

                <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors duration-300">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
