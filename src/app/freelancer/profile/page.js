'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, CheckCircle2, HelpCircle, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';

const MOCK_PORTFOLIO = [
  { id: 1, title: 'Vande - Tech Website', img: 'https://images.unsplash.com/photo-1507238692062-710e53a2995f?q=80&w=400&auto=format&fit=crop' },
  { id: 2, title: 'Pet Care Website', img: 'https://images.unsplash.com/photo-1544626053-8985dc34ae63?q=80&w=400&auto=format&fit=crop' },
  { id: 3, title: 'E-Commerce Platform', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&auto=format&fit=crop' },
  { id: 4, title: 'Blockchain Website', img: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=400&auto=format&fit=crop' },
];

const MOCK_EXPERIENCE = [
  { id: 1, title: 'UI/UX Design - E Commerce platform', date: '23 Aug 2025 - 30 Sept 2025', amount: '$400', rating: 5, review: '"The website\'s navigation is incredibly intuitive. I could easily find everything I needed without getting lost. Great UX!"' },
  { id: 2, title: 'UI/UX Design - E Commerce platform', date: '23 Aug 2025 - 30 Sept 2025', amount: '$400', rating: 5, review: '"The website\'s navigation is incredibly intuitive. I could easily find everything I needed without getting lost. Great UX!"' },
  { id: 3, title: 'UI/UX Design - E Commerce platform', date: '23 Aug 2025 - 30 Sept 2025', amount: '$400', rating: 5, review: '"The website\'s navigation is incredibly intuitive. I could easily find everything I needed without getting lost. Great UX!"' },
];

export default function FreelancerProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.auth.me().then(data => setUser(data)).catch(console.error);
  }, []);

  if (!user) {
    return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div></div>;
  }

  const profile = user.profile || {};

  return (
    <div className="max-w-[1200px] mx-auto w-full space-y-6">
      
      {/* Top Banner Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Status */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full p-1 bg-blue-500">
              <img 
                src={profile.profile_image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full border-4 border-white"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-sm whitespace-nowrap">
              Available
            </div>
          </div>

          <div className="text-center sm:text-left pt-2">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-3xl font-extrabold text-gray-900">{user.full_name}</h1>
              <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
            </div>
            <p className="text-gray-500 font-medium mb-3">{profile.title || 'Freelancer'}</p>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-400 font-medium">
              <MapPin className="w-4 h-4" /> {profile.location || 'Remote'}
            </div>
          </div>
        </div>

        {/* Right Stats & Buttons */}
        <div className="flex flex-col items-center md:items-end w-full md:w-auto">
          <div className="flex gap-8 md:gap-12 mb-6">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-gray-900">${profile.hourly_rate || '0'}/hr</div>
              <div className="text-xs font-semibold text-gray-400">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-gray-900">0</div>
              <div className="text-xs font-semibold text-gray-400">Total Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-gray-900">0</div>
              <div className="text-xs font-semibold text-gray-400">Total Hours</div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-200">
              Call
            </button>
            <button className="flex-1 md:flex-none px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-200">
              Message
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                Hours Per Week <HelpCircle className="w-4 h-4 text-gray-400" />
              </h3>
              <p className="text-xl font-bold text-gray-900">{profile.expected_hours || 'As needed'}</p>
            </div>

            <hr className="border-gray-100 my-6" />

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-3">About</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {profile.bio || "No bio provided yet."}
              </p>
            </div>

            <hr className="border-gray-100 my-6" />

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Languages</h3>
              <div className="space-y-2 text-sm">
                <div className="text-gray-700"><span className="text-gray-900 font-semibold">English :</span> Fluent</div>
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Education</h3>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Self Taught</h4>
                <p className="text-xs text-blue-400 font-medium">Independent Learner</p>
                <p className="text-xs text-gray-400 mt-1">2020-Present</p>
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map(skill => (
                    <span key={skill} className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">No skills listed</span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            
            {/* Portfolio Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  Portfolio <HelpCircle className="w-4 h-4 text-gray-400" />
                </h3>
                <button className="text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {MOCK_PORTFOLIO.map(item => (
                  <div key={item.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="h-28 overflow-hidden bg-gray-100 relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3 bg-white">
                      <h4 className="text-xs font-bold text-gray-900 mb-1 truncate">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 leading-tight line-clamp-2 mb-2">
                        Professional design showcasing modern web standards.
                      </p>
                      <button className="text-[10px] font-bold text-gray-900 hover:text-emerald-600 border-b border-gray-900 hover:border-emerald-600 pb-0.5">
                        View Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100 my-8" />

            {/* Past Experience Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-8">
                Past Experience <HelpCircle className="w-4 h-4 text-gray-400" />
              </h3>

              <div className="space-y-8">
                {MOCK_EXPERIENCE.map((exp, index) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{exp.title}</h4>
                        <p className="text-xs text-gray-400 mb-2">{exp.date}</p>
                        <div className="flex items-center text-yellow-400">
                          {[...Array(exp.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-900 font-bold text-sm">
                        <span className="text-gray-400">🏷️</span> {exp.amount}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 italic mt-3">
                      {exp.review}
                    </p>
                    
                    {index < MOCK_EXPERIENCE.length - 1 && (
                      <div className="w-full h-px bg-gray-50 mt-8"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
