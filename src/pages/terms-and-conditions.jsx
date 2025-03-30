'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import BackButton from "@/components/ui/back-button";
import "../app/globals.css";

const TermsAndConditions = () => {
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const terms = [
    "Classes are subject to availability.",
    "Payment must be made in advance for course enrollment.",
    "Any changes or cancellations to the course schedule must be communicated in advance.",
    "Students must adhere to the institute's code of conduct.",
    "Course materials provided are for personal use only.",
    "Regular attendance is expected for optimal learning outcomes.",
    "The institute reserves the right to modify class schedules when necessary.",
    "Students are responsible for their own musical instruments unless otherwise specified.",
    "Recording of classes is not permitted without prior permission.",
    "Fees once paid are non-refundable."
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeaderVisible(true), 100),
      setTimeout(() => setIsIntroVisible(true), 200),
      setTimeout(() => setIsTermsVisible(true), 300),
      setTimeout(() => setIsContactVisible(true), 400),
      setTimeout(() => setIsBackButtonVisible(true), 500)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <>
      <Head>
        <title>Terms and Conditions - GSIM</title>
        <meta name="description" content="Terms and conditions for Good Shepherd Institute of Music" />
      </Head>

      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className={`absolute left-0 top-10 sm:left-6 transition-opacity duration-500 ${isBackButtonVisible ? "opacity-100" : "opacity-0"}`}>
            <BackButton />
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className={`text-center mb-12 transition-opacity duration-500 ${isHeaderVisible ? "opacity-100" : "opacity-0"}`}>
              <h2 className="text-4xl md:text-5xl font-thin mb-4">Terms and Conditions</h2>
              <p className="text-gray-400">Last updated: March 2025</p>
            </div>

            {/* Introduction */}
            <div className={`mb-12 bg-white/5 p-6 rounded-xl backdrop-blur-sm transition-opacity duration-500 ${isIntroVisible ? "opacity-100" : "opacity-0"}`}>
              <p className="text-gray-300 leading-relaxed">
                By enrolling in courses or using services provided by Good Shepherd Institute of Music, 
                you agree to comply with and be bound by the following terms and conditions. 
                Please read these carefully before proceeding with registration.
              </p>
            </div>

            {/* Terms List */}
            <div className="space-y-4 mb-12">
              {terms.map((term, index) => (
                <div
                  key={index}
                  className={`flex items-start p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${
                    isTermsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{term}</p>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className={`bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-xl backdrop-blur-sm transition-opacity duration-500 ${
              isContactVisible ? "opacity-100" : "opacity-0"
            }`}>
              <h3 className="text-2xl font-thin text-white mb-4">Questions or Concerns?</h3>
              <p className="text-gray-400 mb-6">
                If you have any questions about these terms or need clarification, please don't hesitate to contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+919884556997"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98845 56997
                </a>
                <a 
                  href="mailto:goodshepherdim@gmail.com"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
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
    </>
  );
};

export default TermsAndConditions;