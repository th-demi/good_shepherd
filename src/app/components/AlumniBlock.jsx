import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AlumniBlock = () => {
  return (
    <div className="bg-black py-16">
      <div className="container mx-auto px-4">
        {/* Top Image Row */}
        <div className="hidden lg:flex">
          <div className="w-2/12 ml-[8.333%]">
            <div className="relative aspect-[7/8]">
              <Image
                src="/Evelyn-Glennie-Headshot.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-2/12 ml-[58.333%]">
            <div className="relative aspect-[7/8]">
              <Image
                src="/Alexis-Ffrench-100.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Header Row */}
        <div className="flex flex-wrap">
          <div className="lg:w-4/12">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-white text-6xl md:text-7xl font-display">
                Follow 
                {/* <span className="block lg:inline">Their Lead</span>*/}
              </h2>
            </div>
          </div>
          <div className="lg:w-4/12">
            <div className="relative aspect-[7/8]">
              <Image
                src="/Jacob-Collier-Headshot.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:w-4/12 hidden lg:block">
            <div className="flex items-start">
              <h2 className="text-white text-6xl md:text-7xl font-display" aria-hidden="true">
                Their Lead
              </h2>
            </div>
          </div>
        </div>

        {/* Content and Bottom Images Row */}
        <div className="flex flex-wrap mt-8">
          {/* Content Section */}
          <div className="w-full lg:w-6/12 lg:ml-[8.333%] order-2 lg:order-1">
            <div className="text-white mb-8">
              <p className="text-xl">Academy alumni shape musical culture in countless ways.</p>
            </div>
            
            {/* Desktop Links */}
            <ul className="hidden lg:flex space-x-8">
              <li>
                <Link href="/alumni/alumni-portal" className="text-white hover:underline">
                  Alumni Portal
                </Link>
              </li>
              <li>
                <Link href="/alumni/meet-our-alumni" className="text-white hover:underline">
                  Meet our alumni
                </Link>
              </li>
              <li>
                <Link href="/alumni/alumni-benefits" className="text-white hover:underline">
                  Alumni benefits
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom Images */}
          <div className="w-4/12 lg:w-2/12 order-1 lg:order-2">
            <div className="relative aspect-[7/8]">
              <Image
                src="/chloeflower-officialheadshot_720.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-8/12 lg:w-2/12 order-1 lg:order-3">
            <div className="relative aspect-[7/8]">
              <Image
                src="/RATTLE-Simon-Oliver-Helbig_2023-09-27-115006_pplb.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile Link */}
        <div className="flex justify-center my-8 lg:hidden">
          <Link href="/alumni" className="text-white hover:underline">
            our alumni
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlumniBlock;