import { useState } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import SchoolForm from '../components/SchoolForm';

export default function AddSchool() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

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
        <title>Add New School - EduKids</title>
        <meta name="description" content="Add a new school to the management system" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[#328E6E]">
                <a href="/">EduManage</a>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700 hover:text-[#328E6E] transition-colors">
                Home
              </a>
              <a href="/showSchools" className="text-gray-700 hover:text-[#328E6E] transition-colors">
                View Schools
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New School</h1>
          <p className="text-gray-700">Fill out the fun form below to add a new school to our system</p>
        </div>

        {/* Success/Error Message */}
        {submitMessage.text && (
          <div className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage.text}
          </div>
        )}

        <div className="card p-6 md:p-8 bg-white rounded-xl shadow-md">
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