'use client';

import { usePathname } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/register', '/onboarding'].includes(pathname);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {!isAuthPage && <Navbar />}
      <main className="flex-1 h-full">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </GoogleOAuthProvider>
  );
}
