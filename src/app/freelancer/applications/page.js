'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Briefcase, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';

// Mock data to demonstrate the UI
const initialApplications = [
  {
    id: 1,
    projectTitle: 'AI Chatbot Integration for E-commerce',
    clientName: 'Acme Corp',
    appliedDate: '2023-10-24',
    status: 'In Review',
    bidAmount: 3500,
    type: 'Fixed',
  },
  {
    id: 2,
    projectTitle: 'Machine Learning Model for Predictive Analysis',
    clientName: 'DataTech Solutions',
    appliedDate: '2023-10-20',
    status: 'Accepted',
    bidAmount: 50,
    type: 'Hourly',
  },
  {
    id: 3,
    projectTitle: 'Computer Vision API Development',
    clientName: 'VisioLens',
    appliedDate: '2023-10-15',
    status: 'Rejected',
    bidAmount: 8000,
    type: 'Fixed',
  },
  {
    id: 4,
    projectTitle: 'NLP Sentiment Analysis Tool',
    clientName: 'Startup Inc.',
    appliedDate: '2023-10-25',
    status: 'In Review',
    bidAmount: 2500,
    type: 'Fixed',
  },
];

export default function FreelancerApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredApps = initialApplications.filter(app => {
    const matchesSearch = app.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) || app.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' ? true : app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'In Review': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Accepted': return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'Rejected': return <XCircle className="w-4 h-4 mr-1" />;
      case 'In Review': return <Clock className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Track the status of your project proposals</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-5 h-5 text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm font-medium text-gray-700 w-full md:w-auto cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="In Review">In Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div className="divide-y divide-gray-100">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No applications found</h3>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            filteredApps.map((app, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={app.id} 
                className="p-6 hover:bg-gray-50/80 transition-colors group relative"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">Applied on {new Date(app.appliedDate).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors cursor-pointer mb-1">
                      {app.projectTitle}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{app.clientName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 lg:border-l lg:border-gray-200 lg:pl-8">
                    <div>
                      <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Your Bid</p>
                      <div className="flex items-center gap-1 font-bold text-gray-900 text-lg">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        {app.bidAmount} {app.type === 'Hourly' ? <span className="text-sm font-normal text-gray-500">/hr</span> : ''}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                        View details
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
