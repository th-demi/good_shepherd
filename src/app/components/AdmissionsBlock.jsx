"use client";
import { Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import MusicRegistrationForm from './MusicRegistrationForm';
import AdmissionsDetails from './AdmissionDetails';

export default function AdmissionsBlock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-intersect="once"]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column (Heading + Form) */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {/* Heading - Always visible, responsive size */}
            <h2 
              data-intersect="once"
              className={`text-4xl md:text-5xl lg:text-7xl text-custom-red font-thin mb-6 transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              ADMISSIONS
            </h2>
            
            {/* Form */}
            <div 
              data-intersect="once"
              className={`transform transition-transform duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <MusicRegistrationForm />
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div 
              data-intersect="once"
              className={`transform transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src="https://supercool-ram.transforms.svdcdn.com/production/auditions.jpg?w=1024&q=90&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1728916365&s=1291259c3c06b6c46fdcb8b5609ca4ba"
                alt="Admissions"
                className="w-full h-auto grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}