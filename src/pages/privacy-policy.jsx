'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import BackButton from "@/components/ui/back-button";
import "../app/globals.css";

const PrivacyPolicy = () => {
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeaderVisible(true), 100),
      setTimeout(() => setIsContentVisible(true), 200),
      setTimeout(() => setIsContactVisible(true), 300),
      setTimeout(() => setIsBackButtonVisible(true), 400)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <>
      <Head>
        <title>Privacy Policy - GSIM</title>
        <meta name="description" content="Privacy policy for Good Shepherd Institute of Music" />
      </Head>

      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className={`absolute left-4 top-10 sm:left-6 transition-opacity duration-500 ${isBackButtonVisible ? "opacity-100" : "opacity-0"}`}>
            <BackButton />
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className={`text-center mb-12 transition-opacity duration-500 ${isHeaderVisible ? "opacity-100" : "opacity-0"}`}>
              <h2 className="text-4xl md:text-5xl font-thin mb-4">Privacy Policy</h2>
              <p className="text-gray-400">Last updated: March 2025</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 mb-12">
              {sections.map((section, index) => (
                <div
                  key={section.title}
                  className={`bg-white/5 p-6 rounded-xl backdrop-blur-sm transition-opacity duration-500 ${
                    isContentVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <h3 className="text-2xl font-thin text-white mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    {section.content.map((paragraph, pIndex) => (
                      <div 
                        key={pIndex}
                        className="hover:bg-white/10 p-4 rounded-lg transition-all duration-300"
                      >
                        {paragraph}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className={`bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-xl backdrop-blur-sm transition-opacity duration-500 ${
              isContactVisible ? "opacity-100" : "opacity-0"
            }`}>
              <h3 className="text-2xl font-thin text-white mb-4">Questions and Contact Information</h3>
              <p className="text-gray-400 mb-6">
                If you would like to access, correct, amend, or delete any personal information we have about you, 
                please contact our Privacy Compliance Officer at:
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

const sections = [
  {
    title: "WHAT DO WE DO WITH YOUR INFORMATION?",
    content: [
      <p key="1">When you register for a course or participate in an event at Good Shepherd Institute of Music, we collect personal information such as your name, email address, phone number, date of birth, and any other details necessary for enrollment and communication.</p>,
      <p key="2">When you browse our website, we may automatically receive your computer's internet protocol (IP) address in order to help us understand your browser and operating system for improved user experience.</p>,
      <p key="3">Email marketing (if applicable): With your permission, we may send you emails about upcoming events, courses, and other updates related to the institute.</p>
    ]
  },
  {
    title: "CONSENT",
    content: [
      <div key="1">
        <h4 className="font-semibold mb-2 text-white">How do you get my consent?</h4>
        <p>When you provide us with personal information to register for courses, communicate with us, or participate in any event, we imply that you consent to our collecting it and using it for those specific purposes.</p>
      </div>,
      <div key="2">
        <h4 className="font-semibold mb-2 text-white">How do I withdraw my consent?</h4>
        <p>If you change your mind after opting-in, you can withdraw your consent by contacting us.</p>
      </div>
    ]
  },
];

export default PrivacyPolicy;