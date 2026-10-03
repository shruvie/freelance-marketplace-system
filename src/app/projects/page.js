'use client';

import { motion } from 'framer-motion';
import { mockProjects } from '@/lib/mockData';
import { Search, Filter, Clock, DollarSign, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Discover AI Projects</h1>
            <p className="mt-2 text-lg text-gray-600">Find the perfect project to showcase your AI expertise.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-700 font-medium transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {mockProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500 font-medium">{project.postedBy}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-start md:items-end gap-3 min-w-[200px]">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                    {project.budget}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    Deadline: {project.deadline}
                  </div>
                  <button className="mt-4 w-full md:w-auto px-6 py-2.5 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
