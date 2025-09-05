import { useState } from 'react';

export default function SchoolForm({ onSubmit, register, errors, isSubmitting }) {
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
          <label htmlFor="name" className="form-label">School Name *</label>
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
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email_id" className="form-label">Email Address *</label>
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
          {errors.email_id && <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="form-label">Address *</label>
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
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="form-label">City *</label>
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
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="form-label">State *</label>
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
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contact" className="form-label">Contact Number *</label>
          <input
            type="tel"
            id="contact"
            className="input-field"
            placeholder="Enter contact number (e.g., 123-456-7890)"
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
          {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label htmlFor="image" className="form-label">School Image</label>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-primary-500 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
          className="btn-primary flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
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
    </form>
  );
}