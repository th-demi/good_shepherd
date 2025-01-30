import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ChevronArrow = () => (
  <svg viewBox="0 0 18 18" className="w-4 h-4">
    <polygon 
      fillRule="evenodd" 
      fill="currentColor" 
      stroke="currentColor" 
      strokeWidth=".5" 
      points="0 .682 6.635 3.999 0 7.317 0 8 8 3.999 0 0" 
      transform="translate(5 5)"
    />
  </svg>
);

const ChevronLink = ({ href, children }) => (
  <Link 
    href={href}
    className="flex items-center text-black hover:text-gray-700 transition-colors group"
  >
    <span className="mr-2">{children}</span>
    <div className="transition-transform group-hover:translate-x-1">
      <ChevronArrow />
    </div>
  </Link>
);

const FutureOfMusicBlock = () => {
  return (
    <div className="bg-black text-white py-16 ">
      <div className="container mx-auto px-4">
        {/* Mobile Heading */}
        <div className="lg:hidden mb-8">
          <div className="md:ml-[8.33%]">
            <h2 className="text-2xl font-thin mb-6">
              The Future of Music
            </h2>
          </div>
          <div className="hidden md:block md:ml-[8.33%] md:w-[83.33%]">
            <hr className="border-t border-gray-700" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {/* Image Section */}
          <div className="md:ml-[8.33%] lg:ml-0 md:w-[41.66%] lg:w-5/12">
            <div className="w-full h-full">
              <div className="relative w-full pt-[100%]">
                <Image
                  src="/Naarah-A-World-of-Opportunity-Comes-Closer_2024-10-09-140523_hwuv.jpg"
                  alt="A student peers up at a ceiling dotted with many ornate lights"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="md:ml-[8.33%] lg:ml-[16.66%] md:w-[41.66%] lg:w-5/12 mt-8 lg:mt-0">
            {/* Desktop Heading */}
            <h2 className="hidden lg:block text-2xl font-thin mb-6">
              The Future of Music
            </h2>

            {/* Content */}
            <div className="space-y-4 mb-8">
              <p>
                Together we have the power to help talented students
                realise their potential.
              </p>
              <p>
                With your support, we can help new generations discover, develop and master their craft – for the whole world to enjoy.
              </p>
            </div>

            {/* Links */}
            <ul className="space-y-4">
              <li>
                <ChevronLink href="/support-the-academy/campaign">
                  Find out more
                </ChevronLink>
              </li>
              <li>
                <ChevronLink href="https://community.ram.ac.uk/campaign-donate">
                  Give today
                </ChevronLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureOfMusicBlock;