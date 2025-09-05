import { useState } from 'react';

export default function SchoolCard({ school, index }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-52 md:h-48 overflow-hidden">
        {school.image && !imageError ? (
          <img
            src={school.image}
            alt={school.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#E1EEBC] to-[#90C67C] flex items-center justify-center">
            <svg
              className="w-16 h-16 text-[#328E6E]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-[#328E6E] text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
          {school.state}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 truncate">
          {school.name}
        </h3>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{school.address}</p>

        <div className="flex items-center text-gray-600 text-sm mb-3 gap-4">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-[#328E6E]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {school.city}
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-[#328E6E]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {school.contact}
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm gap-2">
          <svg
            className="w-4 h-4 text-[#328E6E]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="truncate max-w-[140px]">{school.email_id}</span>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
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
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
