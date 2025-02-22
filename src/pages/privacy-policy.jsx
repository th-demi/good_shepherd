'use client';
import React from 'react';
import '../app/globals.css';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{
          opacity: 0,
          animation: 'fadeIn 0.6s ease-out forwards'
        }}
      >
        <div className="px-6 py-8 sm:px-8">
          {/* Header */}
          <div className="text-center mb-12 pb-6 border-b border-gray-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
            <p className="text-gray-600">Last updated: February 2024</p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="transform transition-all duration-500"
                style={{
                  opacity: 0,
                  animation: `slideUp 0.6s ease-out forwards ${index * 0.1}s`
                }}
              >
                <div className="group cursor-pointer">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {section.title}
                  </h3>
                  <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <div 
                        key={pIndex}
                        className="hover:bg-gray-50 p-4 rounded-lg transition-all duration-300"
                      >
                        {paragraph}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div 
              className="mt-12 bg-blue-50 rounded-xl p-8 transform transition-all duration-500 hover:shadow-lg"
              style={{
                opacity: 0,
                animation: 'slideUp 0.6s ease-out forwards 0.8s'
              }}
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Questions and Contact Information</h3>
              <p className="text-blue-800">
                If you would like to access, correct, amend, or delete any personal information we have about you, 
                please contact our Privacy Compliance Officer at:
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                <a 
                  href="tel:+919884556997"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98845 56997
                </a>
                <a 
                  href="mailto:goodshepherdim@gmail.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const sections = [
  {
    title: "SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?",
    content: [
      <p key="1">When you register for a course or participate in an event at Good Shepherd Institute of Music, we collect personal information such as your name, email address, phone number, date of birth, and any other details necessary for enrollment and communication.</p>,
      <p key="2">When you browse our website, we may automatically receive your computer's internet protocol (IP) address in order to help us understand your browser and operating system for improved user experience.</p>,
      <p key="3">Email marketing (if applicable): With your permission, we may send you emails about upcoming events, courses, and other updates related to the institute.</p>
    ]
  },
  {
    title: "SECTION 2 - CONSENT",
    content: [
      <div key="1">
        <h4 className="font-semibold mb-2">How do you get my consent?</h4>
        <p>When you provide us with personal information to register for courses, communicate with us, or participate in any event, we imply that you consent to our collecting it and using it for those specific purposes.</p>
      </div>,
      <div key="2">
        <h4 className="font-semibold mb-2">How do I withdraw my consent?</h4>
        <p>If you change your mind after opting-in, you can withdraw your consent by contacting us.</p>
      </div>
    ]
  },
  // Add other sections similarly...
];

export default PrivacyPolicy;