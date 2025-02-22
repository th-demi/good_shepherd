// src/components/CancellationsAndRefunds.jsx

'use client';
import React from 'react';
import "../app/globals.css";

const CancellationsAndRefunds = () => {
  const terms = [
    "Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can't offer you a refund or exchange.",
    "To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.",
    "Perishable goods, intimate or sanitary items, hazardous materials, and gift cards are non-returnable.",
    "Refunds are processed after inspection of the returned item, and a credit will be applied to the original payment method.",
    "Sale items cannot be refunded.",
    "We only replace items if they are defective or damaged. Contact us for exchanges."
  ];

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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cancellations and Refunds</h2>
            <p className="text-gray-600">Last updated: February 2024</p>
          </div>

          {/* Introduction */}
          <div 
            className="mb-8 text-lg text-gray-700"
            style={{
              opacity: 0,
              animation: 'slideUp 0.6s ease-out forwards 0.2s'
            }}
          >
            <p className="bg-blue-50 p-6 rounded-xl">
              By enrolling in a course or purchasing goods from Good Shepherd Institute of Music, you agree to abide by our cancellations and refund policies. Please read them carefully.
            </p>
          </div>

          {/* Terms List */}
          <div className="space-y-4">
            {terms.map((term, index) => (
              <div
                key={index}
                className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform"
                style={{
                  opacity: 0,
                  animation: `slideUp 0.6s ease-out forwards ${0.3 + index * 0.1}s`
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">{index + 1}</span>
                </div>
                <p className="text-gray-700 text-lg">{term}</p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div 
            className="mt-12 bg-blue-50 rounded-xl p-8 transform transition-all duration-500 hover:shadow-lg"
            style={{
              opacity: 0,
              animation: 'slideUp 0.6s ease-out forwards 0.8s'
            }}
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Questions or Concerns?</h3>
            <p className="text-blue-800 mb-6">
              If you have any questions about these terms or need clarification, please don't hesitate to contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
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

export default CancellationsAndRefunds;
