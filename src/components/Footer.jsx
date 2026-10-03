import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-extrabold text-xl tracking-tight">Company</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Connecting the world's most innovative businesses with elite AI talent and intelligent agents.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4">Marketplace</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/freelancers" className="hover:text-emerald-400 transition-colors">Find Freelancers</Link></li>
            <li><Link href="/projects" className="hover:text-emerald-400 transition-colors">Find Jobs</Link></li>
            <li><Link href="/agencies" className="hover:text-emerald-400 transition-colors">Agencies</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/help" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
            <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
            <li><Link href="/guides" className="hover:text-emerald-400 transition-colors">AI Guides</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            <li><Link href="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Company Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
