import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SchoolCard from '../components/SchoolCard';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/getSchools');
      const data = await response.json();
      
      if (response.ok) {
        setSchools(data);
      } else {
        setError(data.message || 'Error fetching schools');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter schools based on search term and state filter
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState ? school.state === filterState : true;
    
    return matchesSearch && matchesState;
  });

  // Get unique states for filter dropdown
  const states = [...new Set(schools.map(school => school.state))].sort();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E1EEBC] to-[#90C67C]">
        <div className="text-center">
          <div className="animate-bounce w-16 h-16 bg-[#328E6E] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 12h4m-4 0V9m4 0h2m-2 0V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2z"></path>
            </svg>
          </div>
          <p className="text-gray-700">Loading schools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E1EEBC] to-[#90C67C]">
      <Head>
        <title>View Schools - EduManage</title>
        <meta name="description" content="Browse all schools in the management system" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#328E6E]">
                EduManage
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="btn-primary">
                Home
              </Link>
              <Link href="/addSchool" className="btn-secondary">
                Add School
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
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Schools</h1>
          <p className="text-gray-700">Discover all the amazing schools in our system</p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search by name or city</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search schools..."
                  className="pl-10 input-field w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by state</label>
              <div className="relative">
                <select
                  id="stateFilter"
                  className="input-field w-full appearance-none"
                  value={filterState}
                  onChange={(e) => setFilterState(e.target.value)}
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg animate-shake">
            {error}
          </div>
        )}

        {/* Schools Grid */}
        {filteredSchools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school, index) => (
              <SchoolCard key={school.id} school={school} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md animate-fade-in-up">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No schools found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Results count */}
        <div className="mt-8 text-center text-gray-700 animate-fade-in-up">
          Showing {filteredSchools.length} of {schools.length} schools
        </div>
      </main>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .input-field {
          border: 1px solid #D1D5DB;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          width: 100%;
          transition: all 0.3s;
        }
        .input-field:focus {
          outline: none;
          ring: 2px;
          ring-color: #328E6E;
          border-color: #328E6E;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .input-field {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}