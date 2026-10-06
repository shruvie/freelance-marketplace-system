'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { MapPin, CheckCircle, Edit, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await api.auth.me();
      setUser(data);
      setFormData({
        name: data.name || '',
        bio: data.profile?.bio || '',
        location: data.profile?.location || '',
        hourly_rate: data.profile?.hourly_rate || '',
      });
    } catch (err) {
      console.error(err);
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // 1. Update Profile (bio, location, hourly_rate)
      await api.users.updateProfile({
        bio: formData.bio,
        location: formData.location,
        hourly_rate: formData.hourly_rate,
      });
      // Currently our API does not support updating the core User 'name', 
      // but we update the profile fields here.
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Card */}
        <div className="bg-white rounded-xl border border-gray-100 p-8 mb-6 relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-gray-50">
                  <Image 
                    src={user.profile?.profile_image || '/login/signup_Screen.jfif'} 
                    alt="Profile" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#A2E4B8] text-[#1D743F] text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  Available
                </div>
              </div>
              
              <div className="mt-4 sm:mt-2 text-center sm:text-left">
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:outline-none focus:border-[#00B47D] mb-2"
                    readOnly
                    title="Name cannot be changed currently"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                    {user.name} <CheckCircle className="h-6 w-6 text-[#00B47D] fill-current text-white" />
                  </h1>
                )}
                <p className="text-[#A0A4AB] font-semibold mt-1">UI/UX Designer</p>
                <div className="flex items-center justify-center sm:justify-start text-[#A0A4AB] mt-2 gap-1 text-sm font-medium">
                  <MapPin className="h-4 w-4" />
                  {isEditing ? (
                    <input 
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="border-b border-gray-300 focus:outline-none focus:border-[#00B47D] text-gray-700 ml-1"
                    />
                  ) : (
                    <span>{user.profile?.location || 'Location not set'}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end w-full lg:w-auto mt-8 lg:mt-0 gap-6">
              <div className="flex gap-10 text-center sm:text-left">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {isEditing ? (
                      <input 
                        type="number" 
                        value={formData.hourly_rate} 
                        onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
                        className="w-16 border-b border-gray-300 focus:outline-none focus:border-[#00B47D]"
                      />
                    ) : (
                      `$${user.profile?.hourly_rate || '0'}`
                    )}/hr
                  </div>
                  <div className="text-xs font-semibold text-[#A0A4AB] mt-1">Total Earnings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">190</div>
                  <div className="text-xs font-semibold text-[#A0A4AB] mt-1">Total Jobs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">2117</div>
                  <div className="text-xs font-semibold text-[#A0A4AB] mt-1">Total Hours</div>
                </div>
              </div>

              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-md text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <X className="h-4 w-4" /> Cancel
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 rounded-md text-sm font-bold bg-[#00B47D] text-white hover:bg-[#009A6B] transition-colors flex items-center gap-2">
                      <Save className="h-4 w-4" /> Save
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(true)} className="px-8 py-2.5 rounded-md text-sm font-bold bg-[#00B47D] text-white hover:bg-[#009A6B] transition-colors flex items-center gap-2">
                      <Edit className="h-4 w-4" /> Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Sidebar) */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 space-y-8 h-max">
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">Hours Per Week <span className="text-gray-400 cursor-help">?</span></h3>
              <p className="text-xl font-bold text-gray-900">$400</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">About</h3>
              {isEditing ? (
                <textarea 
                  rows={6}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full text-sm text-gray-900 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-[#00B47D]"
                />
              ) : (
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  {user.profile?.bio || "As a UI/UX designer, I'm a creative and analytical professional deeply involved in shaping the user experience (UX) and user interface (UI) of digital products, like websites, mobile apps, and software. My primary goal is to craft products that feel intuitive, efficient, accessible, and genuinely enjoyable for you, the user, all while keeping business objectives in mind."}
                </p>
              )}
            </div>

            <div className="border-t border-gray-50 pt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Languages</h3>
              {user.languages && user.languages.length > 0 ? (
                <ul className="space-y-3 text-[13px] text-gray-500">
                  {user.languages.map(lang => (
                    <li key={lang.name}><span className="text-gray-800 font-semibold">{lang.name} :</span> {lang.proficiency}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-gray-400 italic">No languages added yet.</p>
              )}
            </div>

            <div className="border-t border-gray-50 pt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Education</h3>
              {user.education && user.education.length > 0 ? (
                <div className="space-y-1">
                  <h4 className="text-[13px] font-bold text-gray-900">{user.education[0].school}</h4>
                  <p className="text-[11px] text-[#A0A4AB] font-medium">{user.education[0].degree}</p>
                  <p className="text-[11px] text-[#A0A4AB] font-medium">{user.education[0].years}</p>
                </div>
              ) : (
                <p className="text-[13px] text-gray-400 italic">No education added yet.</p>
              )}
            </div>

            <div className="border-t border-gray-50 pt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map(skill => (
                    <span key={skill.id} className="px-4 py-1.5 bg-[#F1F3F5] text-gray-700 text-[11px] font-bold rounded-full">
                      {skill.name}
                    </span>
                  ))
                ) : (
                  <p className="text-[13px] text-gray-400 italic">No skills added yet.</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Portfolio Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">Portfolio <span className="text-gray-400 cursor-help">?</span></h3>
                <button className="text-sm font-bold text-gray-900 hover:text-[#00B47D] flex items-center gap-1 transition-colors">
                  View All &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {user.portfolio && user.portfolio.length > 0 ? (
                  user.portfolio.map((item, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl overflow-hidden group cursor-pointer p-2 pb-3">
                      <div className="h-24 w-full relative bg-gray-100 rounded-lg overflow-hidden mb-3">
                        <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-gray-900 mb-1.5 leading-tight">{item.title}</h4>
                        <p className="text-[9px] text-[#A0A4AB] font-medium line-clamp-3 mb-2 leading-relaxed">
                          {item.description}
                        </p>
                        <span className="text-[9px] font-bold text-gray-900 border-b border-gray-900 pb-[1px] group-hover:text-[#00B47D] group-hover:border-[#00B47D] transition-colors">
                          View Project
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-gray-400 italic col-span-full">No portfolio items added yet.</p>
                )}
              </div>
            </div>

            {/* Past Experience Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-8">
              <h3 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">Past Experience <span className="text-gray-400 cursor-help">?</span></h3>

              <div className="space-y-6">
                {user.past_experience && user.past_experience.length > 0 ? (
                  user.past_experience.map((item, i) => (
                    <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-[13px] font-bold text-gray-900">{item.title}</h4>
                          <p className="text-[11px] text-[#A0A4AB] font-medium mt-1">{item.date}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <span className="text-gray-400 text-lg">🏷️</span> ${item.price}
                        </div>
                      </div>
                      
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(item.rating)].map((_, i) => <span key={i} className="text-[#FFC107] text-sm">★</span>)}
                      </div>

                      <p className="text-[13px] text-gray-500 italic">
                        "{item.review}"
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-gray-400 italic">No past experience listed yet.</p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
