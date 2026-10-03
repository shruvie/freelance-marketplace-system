'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  DollarSign, 
  MessageSquare, 
  Bell, 
  Folder, 
  User, 
  Settings,
  Target
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/freelancer/dashboard', icon: LayoutDashboard },
  { name: 'My Projects', href: '/freelancer/projects', icon: Briefcase },
  { name: 'Applications', href: '/freelancer/applications', icon: FileText },
  { name: 'Contracts', href: '/freelancer/contracts', icon: FileText },
  { name: 'Milestones', href: '/freelancer/milestones', icon: Target },
  { name: 'Earnings', href: '/freelancer/earnings', icon: DollarSign },
  { name: 'Messages', href: '/freelancer/messages', icon: MessageSquare },
  { name: 'Portfolio', href: '/freelancer/portfolio', icon: Folder },
  { name: 'Notifications', href: '/freelancer/notifications', icon: Bell },
  { name: 'Profile', href: '/freelancer/profile', icon: User },
  { name: 'Settings', href: '/freelancer/settings', icon: Settings },
];

export default function FreelancerLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50/50 pt-20"> {/* pt-20 to account for global navbar */}
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 fixed h-[calc(100vh-5rem)] border-r border-gray-200 bg-white shadow-sm overflow-y-auto z-10 hidden md:block"
      >
        <div className="p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Freelancer Panel</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive ? 'bg-emerald-50 text-emerald-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav"
                        className="absolute left-0 top-0 h-full w-1 bg-emerald-500 rounded-r-full"
                      />
                    )}
                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500 transition-colors'}`} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-[calc(100vh-5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
