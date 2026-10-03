'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Briefcase, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function Onboarding() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: '',
    experience_years: '',
    location: '',
    hourly_rate: '',
    portfolio_link: ''
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // We will add api.users.updateProfile shortly
      await api.users.updateProfile(formData);
      window.location.href = '/projects'; // Proceed to dashboard
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Complete your profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get you set up so you can start {step === 1 ? 'strong' : 'working'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative">
        {/* Progress Bar */}
        <div className="mb-8 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-[#34C759] transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-upload"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      // Just preview locally for now, backend upload can happen on submit
                      const url = URL.createObjectURL(file);
                      setFormData({ ...formData, profile_picture: file, profile_picture_preview: url });
                    }
                  }}
                />
                <label 
                  htmlFor="profile-upload"
                  className="mx-auto h-32 w-32 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 relative overflow-hidden group cursor-pointer hover:border-[#34C759] transition-colors"
                >
                  {formData.profile_picture_preview ? (
                    <img src={formData.profile_picture_preview} alt="Profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-[#34C759]">
                      <Camera className="h-8 w-8 mb-2" />
                      <span className="text-xs font-semibold">Upload Photo</span>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Where are you located?</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border focus:ring-[#34C759] focus:border-[#34C759]"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#34C759] hover:bg-[#2EB350] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#34C759]"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border focus:ring-[#34C759] focus:border-[#34C759]"
                    placeholder="e.g. 5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hourly Rate (Optional)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border focus:ring-[#34C759] focus:border-[#34C759]"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleBack}
                  className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#34C759] hover:bg-[#2EB350]"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Short Bio / Portfolio</label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="block w-full sm:text-sm border-gray-300 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759]"
                    placeholder="Tell clients about your skills and link your portfolio..."
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleBack}
                  className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-2/3 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#34C759] hover:bg-[#2EB350]"
                >
                  {loading ? 'Saving...' : 'Complete Profile'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
