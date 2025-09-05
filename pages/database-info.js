import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DatabaseInfo() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E1EEBC] to-[#90C67C]">
      <Head>
        <title>Database Storage - EduManage</title>
        <meta name="description" content="Learn about our secure database storage system" />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {mounted && (
          <>
            {/* Floating Database Icons */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-[#328E6E] opacity-15 text-3xl font-bold animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 20}s`,
                }}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
              </div>
            ))}
            
            {/* Floating Shapes */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#67AE6E] opacity-10 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
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
              <Link href="/" className="text-2xl font-bold text-[#328E6E]">
                EduManage
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="btn-primary">
                Home
              </Link>
              <Link href="/addSchool" className="btn-secondary">
                Add School
              </Link>
              <Link href="/showSchools" className="btn-primary">
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
                  href="/" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#328E6E] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
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

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
            <svg className="w-10 h-10 text-[#328E6E]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
              <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
              <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safe Data Storage</h1>
          <p className="text-gray-700">Learn how your school data is securely stored and managed</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Secure Data Storage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center md:text-left">Security Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    MySQL database encryption
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Secure user authentication
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Regular security updates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Data backup system
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 mx-auto md:mx-0">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center md:text-left">Database Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    MySQL relational database
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Efficient data indexing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Fast query performance
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Scalable architecture
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>Data Structure</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image VARCHAR(255),
  email_id VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
              </pre>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>Backup & Recovery</h3>
            <p className="text-gray-600 mb-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              Our system includes automated daily backups and a comprehensive recovery plan to ensure your data is always safe and accessible.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Data Privacy:</strong> We never share your school data with third parties. All information is stored securely and accessed only through authorized interfaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <Link href="/showSchools" className="btn-primary text-center transform hover:scale-105 transition-transform duration-300">
                View Schools Data
              </Link>
              <Link href="/addSchool" className="btn-secondary text-center transform hover:scale-105 transition-transform duration-300">
                Add New School
              </Link>
            </div>
          </div>
        </div>
      </main>

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
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: all 0.3s;
          display: inline-block;
        }
        .btn-primary:hover {
          background-color: #267155;
        }
        .btn-secondary {
          background-color: #67AE6E;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 600;
          transition: all 0.3s;
          display: inline-block;
        }
        .btn-secondary:hover {
          background-color: #529A59;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .btn-primary, .btn-secondary {
            width: 100%;
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}