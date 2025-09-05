import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E1EEBC] to-[#90C67C]">
      <Head>
        <title>School Management System</title>
        <meta name="description" content="Manage school information efficiently" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {mounted && (
          <>
            {/* Floating ABCs */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-[#328E6E] opacity-20 text-4xl font-bold animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 20}s`,
                }}
              >
                {String.fromCharCode(65 + (i % 26))}
              </div>
            ))}
            
            {/* Floating Shapes */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#67AE6E] opacity-10 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 60}px`,
                  height: `${20 + Math.random() * 60}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${20 + Math.random() * 20}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#328E6E]">EduManage</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/addSchool" className="btn-primary">
                Add School
              </Link>
              <Link href="/showSchools" className="btn-secondary">
                View Schools
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-[#328E6E] focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden animate-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link 
                  href="/addSchool" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#328E6E] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add School
                </Link>
                <Link 
                  href="/showSchools" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#328E6E] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Schools
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center relative z-10">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-fade-in-up">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 text-[#328E6E]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              NextGen <br /> <span className="text-[#328E6E]">School Management</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              A colorful, friendly system to manage school information with fun animations and easy-to-use features.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/addSchool" className="btn-primary text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
                Get Started
              </Link>
              <Link href="/showSchools" className="btn-secondary text-lg px-8 py-3 transform hover:scale-105 transition-transform duration-300">
                Browse Schools
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Awesome Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Add Schools */}
            <Link href="/addSchool" className="text-center p-6 card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#E1EEBC] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#328E6E]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Schools</h3>
              <p className="text-gray-600">Easily add new schools with fun forms and colorful designs.</p>
              <div className="mt-4 text-[#328E6E] font-medium flex items-center justify-center">
                <span>Try it now</span>
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
            
            {/* Feature 2 - View Records */}
            <Link href="/showSchools" className="text-center p-6 card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#E1EEBC] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#328E6E]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">View Records</h3>
              <p className="text-gray-600">Browse all school records with fun animations and easy searching.</p>
              <div className="mt-4 text-[#328E6E] font-medium flex items-center justify-center">
                <span>Browse schools</span>
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
            
            {/* Feature 3 - Database Storage */}
            <Link href="/database-info" className="text-center p-6 card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#E1EEBC] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#328E6E]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe Storage</h3>
              <p className="text-gray-600">All data is securely stored with colorful backups and safety features.</p>
              <div className="mt-4 text-[#328E6E] font-medium flex items-center justify-center">
                <span>Learn more</span>
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section className="py-16 bg-gradient-to-b from-[#67AE6E] to-[#328E6E] relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-white mb-12 animate-fade-in">How It Works</h2>
    
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
      {[
        {
          step: 1,
          title: "Add Your School",
          desc: "Fill out our simple form with school details",
          icon: (
            <svg
              className="w-10 h-10 text-[#328E6E]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.414.242l-4 1a1 1 0 01-1.212-1.212l1-4a1 1 0 01.242-.414l9.9-9.9a2 2 0 012.828 0z" />
              <path d="M15 6l-1-1" />
            </svg>
          ),
        },
        {
          step: 2,
          title: "See All Schools",
          desc: "Browse through all the schools in our system",
          icon: (
            <svg
              className="w-10 h-10 text-[#328E6E]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          ),
        },
        {
          step: 3,
          title: "Manage Easily",
          desc: "Update or view information anytime",
          icon: (
            <svg
              className="w-10 h-10 text-[#328E6E]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 00-7.938 7h2.07A6 6 0 1110 16v2a8 8 0 000-16zm0 4a4 4 0 00-4 4h2a2 2 0 114 0h2a4 4 0 00-4-4z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center text-white animate-fade-in-up"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {/* Step Number */}
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6 text-lg font-bold border-2 border-white/30">
            {item.step}
          </div>
          
          {/* Icon */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
          <p className="text-white/90 max-w-xs">{item.desc}</p>
          
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} EduManage School System. All rights reserved.</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/addSchool" className="text-gray-300 hover:text-white transition-colors">
              Add School
            </Link>
            <Link href="/showSchools" className="text-gray-300 hover:text-white transition-colors">
              View Schools
            </Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
        .btn-primary {
          background-color: #328E6E;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: all 0.3s;
        }
        .btn-primary:hover {
          background-color: #267155;
        }
        .btn-secondary {
          background-color: #67AE6E;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: all 0.3s;
        }
        .btn-secondary:hover {
          background-color: #529A59;
        }
        .card {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
        }
        .card:hover {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .btn-primary, .btn-secondary {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
          @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }
  `}
    </style>
    </div>
  );
}