'use client';

import { motion } from 'framer-motion';

export default function FreelancerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      {/* Main Content - No sidebar anymore based on new design */}
      <main className="flex-1 w-full mx-auto max-w-[1400px] px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
