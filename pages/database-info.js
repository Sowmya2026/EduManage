import Head from 'next/head';
import Link from 'next/link';

export default function DatabaseInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Database Storage - School Management System</title>
        <meta name="description" content="Learn about our secure database storage system" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary-600">
                EduManage
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/addSchool" className="text-gray-700 hover:text-primary-600 transition-colors">
                Add School
              </Link>
              <Link href="/showSchools" className="text-gray-700 hover:text-primary-600 transition-colors">
                View Schools
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Storage System</h1>
          <p className="text-gray-600">Learn how your school data is securely stored and managed</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Secure Data Storage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Security Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• MySQL database encryption</li>
                  <li>• Secure user authentication</li>
                  <li>• Regular security updates</li>
                  <li>• Data backup system</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Database Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• MySQL relational database</li>
                  <li>• Efficient data indexing</li>
                  <li>• Fast query performance</li>
                  <li>• Scalable architecture</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Structure</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
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

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Backup & Recovery</h3>
            <p className="text-gray-600 mb-4">
              Our system includes automated daily backups and a comprehensive recovery plan to ensure your data is always safe and accessible.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
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

            <div className="flex justify-center mt-8">
              <Link href="/showSchools" className="btn-primary mr-4">
                View Schools Data
              </Link>
              <Link href="/addSchool" className="btn-secondary">
                Add New School
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}