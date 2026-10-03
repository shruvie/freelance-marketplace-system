import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-black font-sans">

      {/* Hero Section */}
      <main className="px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">Your Source for Elite Talent.</p>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Unlock the Future of Work: Hire Top Talent
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Welcome to Company, your premier platform connecting businesses with AI solutions, from human experts to autonomous agents.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/freelancers" className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                Find Freelancers <span>→</span>
              </Link>
              <Link href="/projects" className="text-sm font-medium border-b border-black pb-0.5 hover:text-gray-600 hover:border-gray-600">
                Explore Projects
              </Link>
            </div>


          </div>

          <div className="relative">
            <div className="absolute -top-12 left-10 w-16 h-16 bg-black rounded-full flex items-center justify-center z-20">
              <div className="w-6 h-6 bg-emerald-500 rounded-sm"></div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-8 mb-4 ml-24 h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 opacity-50"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-2">500+</h2>
                <p className="text-sm text-gray-600 font-medium">Verified AI Experts Ready to Elevate Your Projects</p>
              </div>
              <div className="absolute bottom-6 left-8 right-8 h-2 bg-gray-300 rounded-full overflow-hidden"></div>
            </div>

            <div className="bg-black text-white rounded-2xl p-8 relative overflow-hidden h-48">
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Get the AI Expertise You Need, On Demand</p>
              <h3 className="text-xl font-bold w-1/2">Find Top AI Freelancers and Smart Agents.</h3>

              <div className="absolute right-8 bottom-0 flex items-end gap-2">
                <div className="w-8 h-12 bg-emerald-600"></div>
                <div className="w-8 h-20 bg-emerald-500"></div>
                <div className="w-8 h-28 bg-emerald-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="mt-24 bg-black text-white rounded-3xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6">Unlock the Power of AI: Find Talent & Agents</h2>
              <p className="text-gray-400 mb-8 max-w-sm text-sm">
                Ready to Unlock the Full Potential of Artificial Intelligence? Find Top AI Experts and Deploy Intelligent Autonomous Agents.
              </p>
              <button className="bg-emerald-400 text-black px-6 py-3 rounded-full text-sm font-semibold w-max flex items-center gap-2 hover:bg-emerald-300">
                Learn more <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">→</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-zinc-900 rounded-2xl p-6">
                <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm mb-2">Connect with top AI influencers</h4>
                <p className="text-xs text-gray-400">Our platform connects you with a diverse pool of highly skilled AI freelancers from around the globe.</p>
              </div>
              {/* Card 2 */}
              <div className="bg-zinc-900 rounded-2xl p-6">
                <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm mb-2">AI Automation Marketplace</h4>
                <p className="text-xs text-gray-400">Offering software solutions that use AI to automate repetitive tasks across various business functions.</p>
              </div>
              {/* Card 3 */}
              <div className="bg-zinc-900 rounded-2xl p-6">
                <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm mb-2">Trusted by top</h4>
              </div>
              {/* Card 4 */}
              <div className="bg-zinc-900 rounded-2xl p-6">
                <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-bold text-sm mb-2">Collaborate with top</h4>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
