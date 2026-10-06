'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, MapPin, ArrowRight, Check, X } from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

const PROFESSIONAL_TITLES = [
  "Full Stack Developer", "Frontend Developer", "Backend Developer", "Web Developer", "Software Developer", "Software Engineer", "Mobile App Developer", "Android Developer", "iOS Developer", "Flutter Developer", "React Native Developer", "React Developer", "Next.js Developer", "Node.js Developer", "Python Developer", "Java Developer", "C++ Developer", "C Developer", "C# Developer", ".NET Developer", "PHP Developer", "Laravel Developer", "Django Developer", "Spring Boot Developer", "Ruby on Rails Developer", "Go Developer", "Rust Developer", "WordPress Developer", "Shopify Developer", "Webflow Developer", "Game Developer", "Unity Developer", "Unreal Engine Developer", "AR/VR Developer", "AI Engineer", "Machine Learning Engineer", "Deep Learning Engineer", "Generative AI Engineer", "AI Software Engineer", "NLP Engineer", "Computer Vision Engineer", "Data Scientist", "Data Analyst", "Data Engineer", "Business Intelligence Analyst", "BI Developer", "MLOps Engineer", "AI Researcher", "Prompt Engineer", "RAG Engineer", "LLM Engineer", "Blockchain Developer", "Web3 Developer", "Smart Contract Developer", "Solidity Developer", "Cybersecurity Analyst", "Cybersecurity Engineer", "Ethical Hacker", "Penetration Tester", "Security Engineer", "Cloud Engineer", "Cloud Architect", "DevOps Engineer", "Site Reliability Engineer", "AWS Cloud Engineer", "Azure Cloud Engineer", "Google Cloud Engineer", "Database Administrator", "Database Developer", "Systems Administrator", "Network Engineer", "QA Engineer", "Quality Assurance Tester", "Manual Tester", "Automation Tester", "SDET", "Performance Tester", "Test Engineer", "Technical Support Specialist", "IT Support Specialist", "UI/UX Designer", "UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Interaction Designer", "Visual Designer", "Web Designer", "Graphic Designer", "Brand Designer", "Logo Designer", "Illustrator", "Motion Graphics Designer", "Motion Designer", "3D Designer", "3D Artist", "3D Modeler", "Character Designer", "Game UI Designer", "Design Systems Designer", "Presentation Designer", "Packaging Designer", "Content Writer", "Technical Writer", "Copywriter", "SEO Writer", "Blog Writer", "Creative Writer", "Script Writer", "Ghostwriter", "UX Writer", "Editor", "Proofreader", "Translator", "Transcriptionist", "Social Media Manager", "Social Media Specialist", "Social Media Strategist", "Community Manager", "Digital Marketing Specialist", "Digital Marketing Manager", "SEO Specialist", "SEO Consultant", "SEM Specialist", "PPC Specialist", "Google Ads Specialist", "Meta Ads Specialist", "Email Marketing Specialist", "Content Marketing Specialist", "Growth Marketer", "Marketing Analyst", "Affiliate Marketing Specialist", "Influencer Marketing Specialist", "Public Relations Specialist", "Brand Strategist", "Business Consultant", "Management Consultant", "Strategy Consultant", "Financial Analyst", "Financial Consultant", "Accounting Specialist", "Bookkeeper", "Virtual Assistant", "Project Manager", "Product Manager", "Product Owner", "Scrum Master", "Agile Coach", "Business Analyst", "Technical Project Manager", "Operations Manager", "Operations Specialist", "Recruiter", "Talent Acquisition Specialist", "HR Consultant", "Customer Success Specialist", "Customer Support Specialist", "Sales Representative", "Sales Consultant", "Business Development Representative", "Business Development Manager", "Lead Generation Specialist", "E-commerce Specialist", "E-commerce Manager", "Shopify Expert", "Amazon Seller Specialist", "Market Research Analyst", "Research Assistant", "Career Consultant", "Online Tutor", "Subject Matter Expert", "Language Tutor", "Music Teacher", "Video Editor", "Video Producer", "Videographer", "Photographer", "Voice Over Artist", "Voice Actor", "Audio Engineer", "Podcast Producer", "Animator", "2D Animator", "3D Animator", "VFX Artist", "Film Editor", "Architect", "Interior Designer", "CAD Designer", "Mechanical Designer", "Electrical Designer", "Civil Engineer", "Technical Consultant", "Legal Consultant", "Legal Researcher", "Paralegal", "Resume Writer", "Resume Designer", "Instructional Designer", "E-learning Developer", "Course Creator", "Notion Consultant", "Automation Specialist", "n8n Automation Specialist", "Zapier Specialist", "Make.com Specialist", "API Developer", "Integration Specialist", "AI Automation Specialist"
];

const SKILLS_LIST = [
  "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "Python", "Django", "Flask", "Java", "Spring Boot",
  "C++", "C#", ".NET", "Ruby", "Ruby on Rails", "PHP", "Laravel", "Go", "Rust", "Swift", "Kotlin", "React Native", "Flutter",
  "HTML5", "CSS3", "Tailwind CSS", "SASS", "UI/UX Design", "Figma", "Adobe XD", "Sketch", "Adobe Photoshop", "Adobe Illustrator",
  "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "GraphQL", "REST API", "Docker", "Kubernetes",
  "AWS", "Google Cloud", "Azure", "CI/CD", "Git", "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "TensorFlow", "PyTorch", "Data Analysis", "Data Science", "Pandas", "NumPy", "Blockchain", "Solidity", "Web3.js",
  "Smart Contracts", "Cybersecurity", "Penetration Testing", "SEO", "Digital Marketing", "Content Writing",
  "Copywriting", "Project Management", "Agile", "Scrum", "Business Analysis", "Quality Assurance", "Testing"
];

export default function Onboarding() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState('freelancer'); // Default, will fetch
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    profile_picture: null,
    profile_picture_preview: null,
    location: '',

    // Freelancer
    title: '',
    bio: '',
    experience_years: '',
    employment_status: '',
    portfolio_url: '',
    linkedin_url: '',
    github_url: '',
    skills: [],
    services_offered: '',
    preferred_project_type: '',
    min_budget: '',
    hourly_rate: '',
    availability: '',
    expected_hours: '',

    // Client
    phone: '',
    timezone: '',
    client_type: '',
    company_name: '',
    industry: '',
    company_size: '',
    website: '',
    company_description: '',
    hiring_services: '',
    project_duration: '',
    freelancers_needed: '',
    preferred_experience_level: '',
    freelancer_location_pref: '',
    communication_pref: '',
    country: '',
    currency: '',
    payment_method: ''
  });

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationTimeout, setLocationTimeout] = useState(null);

  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  useEffect(() => {
    api.auth.me().then(data => {
      if (data && data.role) {
        setUserRole(data.role.toLowerCase());
        if (data.profile) {
          // If the profile already exists, they have completed onboarding. Redirect them.
          if (data.role.toLowerCase() === 'client') {
            window.location.href = '/client/find-freelancers';
          } else {
            window.location.href = '/freelancer/find-projects';
          }
        }
      }
    }).catch(err => {
      // If not logged in, redirect to login
      window.location.href = '/login';
    });
  }, []);

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const fetchLocations = async (query) => {
    if (!query) {
      setLocationSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      setLocationSuggestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLocationChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, location: val });
    setShowLocationSuggestions(true);

    if (locationTimeout) clearTimeout(locationTimeout);

    const newTimeout = setTimeout(() => {
      fetchLocations(val);
    }, 500);
    setLocationTimeout(newTimeout);
  };

  const selectLocation = (locationName) => {
    setFormData({ ...formData, location: locationName });
    setShowLocationSuggestions(false);
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, profile_picture: file, profile_picture_preview: url });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.users.updateProfile(formData);
      toast.success('Onboarding complete!');
      setTimeout(() => {
        if (userRole === 'client') {
          window.location.href = '/client/find-freelancers';
        } else {
          window.location.href = '/freelancer/find-projects';
        }
      }, 1000);
    } catch (err) {
      toast.error(err.message || 'Failed to save profile');
    }
    setLoading(false);
  };

  // ---------------------------------------------------------
  // TITLES & SUBTITLES
  // ---------------------------------------------------------
  const freelancerTitles = [
    { title: "Basic Details", sub: "What are your basic details?" },
    { title: "Professional Details", sub: "Tell us about what you do." },
    { title: "Online Presence", sub: "Showcase your previous work." },
    { title: "Skills", sub: "What tools and technologies do you use?" },
    { title: "Work Preferences", sub: "What kind of work are you looking for?" },
    { title: "Rates & Availability", sub: "Set your pricing and availability." },
    { title: "Experience", sub: "Almost done! Add your past experience." }
  ];

  const clientTitles = [
    { title: "Basic Details", sub: "What are your basic details?" },
    { title: "Client Type", sub: "Who are you representing?" },
    { title: "Company Details", sub: "Tell us about your organization." },
    { title: "Hiring Requirements", sub: "What services are you looking for?" },
    { title: "Project Scope", sub: "Tell us about the work." },
    { title: "Hiring Preferences", sub: "Who is your ideal candidate?" },
    { title: "Payment & Billing", sub: "Setup your billing details to start hiring." }
  ];

  const currentContent = userRole === 'client' ? clientTitles[step - 1] : freelancerTitles[step - 1];

  // ---------------------------------------------------------
  // RENDER HELPERS
  // ---------------------------------------------------------

  const renderFreelancerSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="flex justify-center mb-8">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-upload"
                onChange={handlePhotoUpload}
              />
              <label
                htmlFor="profile-upload"
                className="h-32 w-32 rounded-full flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
              >
                {formData.profile_picture_preview ? (
                  <img src={formData.profile_picture_preview} alt="Profile preview" className="h-full w-full object-cover rounded-full shadow-sm" />
                ) : (
                  <div className="h-full w-full rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-[#34C759] hover:text-[#34C759] transition-colors">
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-semibold">Upload Photo</span>
                  </div>
                )}
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Where are you located?</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.location}
                  onChange={handleLocationChange}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  className="block w-full pl-10 sm:text-sm border-gray-200 rounded-md py-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400 transition-colors"
                  placeholder="e.g. San Francisco, CA"
                  autoComplete="off"
                />
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-200">
                    {locationSuggestions.map((place) => (
                      <li
                        key={place.place_id}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#34C759] hover:text-white text-gray-900"
                        onClick={() => selectLocation(place.display_name)}
                      >
                        <span className="block truncate">{place.display_name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setShowTitleSuggestions(true);
                  }}
                  onFocus={() => setShowTitleSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 200)}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                  placeholder="e.g. Full Stack Developer, UI/UX Designer"
                  autoComplete="off"
                />
                {showTitleSuggestions && formData.title && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-200">
                    {PROFESSIONAL_TITLES.filter(t => t.toLowerCase().includes(formData.title.toLowerCase())).slice(0, 10).map((title) => (
                      <li
                        key={title}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#34C759] hover:text-white text-gray-900"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setFormData({ ...formData, title: title });
                          setShowTitleSuggestions(false);
                        }}
                      >
                        <span className="block truncate">{title}</span>
                      </li>
                    ))}
                    {PROFESSIONAL_TITLES.filter(t => t.toLowerCase().includes(formData.title.toLowerCase())).length === 0 && (
                      <li
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#34C759] hover:text-white text-gray-900 italic"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setShowTitleSuggestions(false);
                        }}
                      >
                        <span className="block truncate">Use "{formData.title}"</span>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Short Bio / Introduction</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                placeholder="I am a professional..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                <input
                  type="number"
                  value={formData.experience_years}
                  onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                  placeholder="e.g. 5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Status</label>
                <select
                  value={formData.employment_status}
                  onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white"
                >
                  <option value="">Select...</option>
                  <option value="freelancer">Full-time Freelancer</option>
                  <option value="employed">Employed (Moonlighting)</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio URL</label>
              <input
                type="url"
                value={formData.portfolio_url}
                onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                placeholder="https://linkedin.com/in/you"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub / Behance URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                placeholder="https://github.com/you"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Skills</label>

              <div className="relative">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => {
                    setSkillInput(e.target.value);
                    setShowSkillSuggestions(true);
                  }}
                  onFocus={() => setShowSkillSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && skillInput.trim()) {
                      e.preventDefault();
                      if (!formData.skills.includes(skillInput.trim())) {
                        setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
                      }
                      setSkillInput('');
                      setShowSkillSuggestions(false);
                    }
                  }}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                  placeholder="Type a skill and select or press Enter..."
                  autoComplete="off"
                />
                {showSkillSuggestions && skillInput && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-200">
                    {SKILLS_LIST.filter(s => s.toLowerCase().includes(skillInput.toLowerCase()) && !formData.skills.includes(s)).slice(0, 10).map((skill) => (
                      <li
                        key={skill}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#34C759] hover:text-white text-gray-900"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          if (!formData.skills.includes(skill)) {
                            setFormData({ ...formData, skills: [...formData.skills, skill] });
                          }
                          setSkillInput('');
                          setShowSkillSuggestions(false);
                        }}
                      >
                        <span className="block truncate">{skill}</span>
                      </li>
                    ))}
                    {SKILLS_LIST.filter(s => s.toLowerCase().includes(skillInput.toLowerCase()) && !formData.skills.includes(s)).length === 0 && (
                      <li
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#34C759] hover:text-white text-gray-900 italic"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          if (!formData.skills.includes(skillInput.trim())) {
                            setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
                          }
                          setSkillInput('');
                          setShowSkillSuggestions(false);
                        }}
                      >
                        <span className="block truncate">Add "{skillInput}"</span>
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {formData.skills.map(skill => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F3F5] text-gray-700 text-xs font-bold rounded-full">
                    {skill}
                    <button
                      onClick={() => setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) })}
                      className="hover:text-[#34C759] transition-colors focus:outline-none flex items-center justify-center bg-gray-200 hover:bg-green-100 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Services Offered</label>
              <input
                type="text"
                value={formData.services_offered}
                onChange={(e) => setFormData({ ...formData, services_offered: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                placeholder="e.g. Frontend Development, App Design"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Project Type</label>
              <select
                value={formData.preferred_project_type}
                onChange={(e) => setFormData({ ...formData, preferred_project_type: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white"
              >
                <option value="">Select...</option>
                <option value="fixed">Fixed Price</option>
                <option value="hourly">Hourly</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                  placeholder="e.g. 50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Min. Budget ($)</label>
                <input
                  type="number"
                  value={formData.min_budget}
                  onChange={(e) => setFormData({ ...formData, min_budget: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                  placeholder="e.g. 1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white"
              >
                <option value="">Select...</option>
                <option value="now">Available Now</option>
                <option value="part">Part-time</option>
                <option value="full">Full-time</option>
              </select>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
              <p className="text-sm text-gray-500 mb-4">You can add your past projects and experience from your dashboard later.</p>
              <Check className="mx-auto h-12 w-12 text-[#34C759] mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Ready to complete setup?</h3>
            </div>
          </div>
        );
    }
  };

  const renderClientSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-upload"
                onChange={handlePhotoUpload}
              />
              <label
                htmlFor="profile-upload"
                className="h-32 w-32 rounded-full flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
              >
                {formData.profile_picture_preview ? (
                  <img src={formData.profile_picture_preview} alt="Profile preview" className="h-full w-full object-cover rounded-full shadow-sm" />
                ) : (
                  <div className="h-full w-full rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-[#34C759] hover:text-[#34C759] transition-colors">
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-semibold">Upload Logo</span>
                  </div>
                )}
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time Zone</label>
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                  placeholder="e.g. PST, EST"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Where are you located?</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.location}
                  onChange={handleLocationChange}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  className="block w-full pl-10 sm:text-sm border-gray-200 rounded-md py-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400 transition-colors"
                  placeholder="e.g. San Francisco, CA"
                  autoComplete="off"
                />
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-200">
                    {locationSuggestions.map((place) => (
                      <li
                        key={place.place_id}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#34C759] hover:text-white text-gray-900"
                        onClick={() => selectLocation(place.display_name)}
                      >
                        <span className="block truncate">{place.display_name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              {['Individual', 'Startup', 'Small Business', 'Company/Organization', 'Agency'].map(type => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, client_type: type })}
                  className={`w-full text-left px-4 py-4 rounded-lg border transition-colors ${formData.client_type === type ? 'border-[#34C759] bg-green-50' : 'border-gray-200 hover:border-[#34C759] bg-white'
                    }`}
                >
                  <span className="text-sm font-semibold text-gray-900">{type}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                <select
                  value={formData.company_size}
                  onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white"
                >
                  <option value="">Select...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                placeholder="https://"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Services looking for</label>
              <div className="grid grid-cols-2 gap-3">
                {['Web Development', 'Mobile Development', 'UI/UX Design', 'AI/ML', 'Content Writing', 'Marketing'].map(service => (
                  <label key={service} className="flex items-center space-x-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded text-[#34C759] focus:ring-[#34C759]" />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Skills required</label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, Figma"
                className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
                <select className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white">
                  <option>Fixed Price</option>
                  <option>Hourly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Approx Budget ($)</label>
                <input
                  type="number"
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Duration</label>
                <select className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white">
                  <option>Less than 1 month</option>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                  <option>6+ months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Freelancers Needed</label>
                <input
                  type="number"
                  defaultValue="1"
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Experience Level</label>
              <select className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white">
                <option>Entry Level</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Communication Preference</label>
              <select className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white">
                <option>Email</option>
                <option>Slack / Chat</option>
                <option>Video Calls</option>
                <option>Any</option>
              </select>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                <select className="block w-full sm:text-sm border-gray-200 rounded-md py-3 px-3 border focus:ring-[#34C759] focus:border-[#34C759] text-gray-900 bg-white">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                </select>
              </div>
            </div>
          </div>
        );
    }
  };

  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <div className="h-screen w-screen overflow-hidden bg-white flex">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-[45%] p-4 pl-6 py-6">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-emerald-900">
          <Image
            src="/login/signup_Screen.jfif"
            alt="Onboarding Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-[55%] relative h-full overflow-hidden bg-white">
        
        {/* Fixed Header Area */}
        <div className="absolute top-0 left-0 w-full px-8 sm:px-16 xl:px-32 pt-12 pb-4 bg-white z-10">
          <div className="w-full max-w-lg mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-medium text-gray-900 mb-2 flex items-center h-10 overflow-hidden">
                <span className="mr-2">Your</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentContent.title}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {currentContent.title}
                  </motion.span>
                </AnimatePresence>
              </h1>
              <p className="text-sm text-gray-500">{currentContent.sub}</p>
            </div>

            {/* Bouncy Progress Bar with Percentage */}
            <div className="flex items-center gap-4">
              <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden flex-1 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#34C759] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 12 }}
                />
              </div>
              <div className="text-sm font-bold text-[#000000] w-10 text-left shrink-0">
                {percentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full h-full pt-[200px] pb-[100px] px-8 sm:px-16 xl:px-32">
          <div className="w-full max-w-lg mx-auto">
            {userRole === 'client' ? renderClientSteps() : renderFreelancerSteps()}
          </div>
        </div>

        {/* Fixed Navigation Buttons */}
        <div className="absolute bottom-0 left-0 w-full px-8 sm:px-16 xl:px-32 pb-12 pt-4 bg-white z-10">
          <div className="w-full max-w-lg mx-auto flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Back
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#34C759] hover:bg-[#2EB350] text-white rounded-md text-sm font-semibold transition-colors"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#34C759] hover:bg-[#2EB350] text-white rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Complete Profile'} <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
