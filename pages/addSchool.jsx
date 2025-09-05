import { useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AddSchool() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      // Append all form fields to FormData
      Object.keys(data).forEach(key => {
        if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });
      
      // Append the image file
      if (data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'School added successfully!' });
        reset();
        // Redirect to showSchools after 2 seconds
        setTimeout(() => {
          router.push('/showSchools');
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: result.message || 'Error adding school' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E1EEBC] to-[#90C67C]">
      <Head>
        <title>Add New School - EduManage</title>
        <meta name="description" content="Add a new school to the management system" />
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
              <Link href="/showSchools" className="btn-secondary">
                Show Schools
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
                  href="/showSchools" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-[#328E6E] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Show Schools
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New School</h1>
          <p className="text-gray-700">Fill out the fun form below to add a new school to our system</p>
        </div>

        {/* Success/Error Message */}
        {submitMessage.text && (
          <div className={`mb-6 p-4 rounded-lg animate-fade-in ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage.text}
          </div>
        )}

        <div className="card p-6 md:p-8 bg-white rounded-xl shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <SchoolForm 
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
    </div>
  );
}

// SchoolForm component
function SchoolForm({ onSubmit, register, errors, isSubmitting }) {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.)');
        e.target.value = '';
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        e.target.value = '';
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
          <input
            type="text"
            id="name"
            className="input-field"
            placeholder="Enter school name"
            {...register("name", { 
              required: "School name is required",
              minLength: {
                value: 3,
                message: "School name must be at least 3 characters"
              }
            })}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 animate-shake">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            id="email_id"
            className="input-field"
            placeholder="Enter email address"
            {...register("email_id", { 
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email_id && <p className="mt-1 text-sm text-red-600 animate-shake">{errors.email_id.message}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
          <input
            type="text"
            id="address"
            className="input-field"
            placeholder="Enter school address"
            {...register("address", { 
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters"
              }
            })}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600 animate-shake">{errors.address.message}</p>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input
            type="text"
            id="city"
            className="input-field"
            placeholder="Enter city"
            {...register("city", { 
              required: "City is required",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "City can only contain letters and spaces"
              }
            })}
          />
          {errors.city && <p className="mt-1 text-sm text-red-600 animate-shake">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State *</label>
          <input
            type="text"
            id="state"
            className="input-field"
            placeholder="Enter state"
            {...register("state", { 
              required: "State is required",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "State can only contain letters and spaces"
              }
            })}
          />
          {errors.state && <p className="mt-1 text-sm text-red-600 animate-shake">{errors.state.message}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
          <input
            type="tel"
            id="contact"
            className="input-field"
            placeholder="Enter contact number"
            {...register("contact", { 
              required: "Contact number is required",
              pattern: {
                value: /^[\+]?[1-9][\d]{0,15}$/,
                message: "Please enter a valid phone number"
              },
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits"
              },
              maxLength: {
                value: 15,
                message: "Phone number cannot exceed 15 digits"
              }
            })}
          />
          {errors.contact && <p className="mt-1 text-sm text-red-600 animate-shake">{errors.contact.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">School Image</label>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-[#328E6E] transition-colors bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                  </div>
                  <input 
                    id="image" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    {...register("image", {
                      onChange: handleImageChange
                    })}
                  />
                </label>
              </div>
            </div>
            
            {imagePreview && (
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      const fileInput = document.getElementById('image');
                      if (fileInput) fileInput.value = '';
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Upload a photo of the school building or logo (optional)
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform duration-300"
          style={{backgroundColor: '#328E6E'}}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add School
            </>
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
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
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .input-field {
            padding: 0.75rem;
          }
          .btn-primary {
            padding: 0.75rem 1.5rem;
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}