import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ChevronArrow = () => (
  <svg viewBox="0 0 18 18" className="w-4 h-4">
    <polygon 
      fillRule="evenodd" 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth=".5" 
      points="0 .682 6.635 3.999 0 7.317 0 8 8 3.999 0 0" 
      transform="translate(5 5)"
    />
  </svg>
);

const StudentLifeBlock = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="row">
        <div className="col-12 mt-20 lg:mt-0">
          <h2 className="text-6xl md:text-8xl font-display mb-8">
            Student Life
          </h2>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4">
          <div>
            <div className="bg-white p-6">
              <div className="prose">
                <p>
                  When you come to the Academy, you will form lifelong friendships with people from around the world.
                </p>
              </div>
              
              <Link href="/student-life" className="inline-flex items-center mt-4 text-sm hover:underline">
                <span>Explore Student Life</span>
                <span className="ml-2">
                  <ChevronArrow />
                </span>
              </Link>
            </div>

            <div className="block lg:hidden mt-6">
              <Image
                src="https://supercool-ram.transforms.svdcdn.com/production/200731-COMM-WEBS-StudentLifeImage-1_2020-08-19-151828.jpg"
                alt="A student carries a cello case into the entrance of the Academy"
                width={960}
                height={640}
                className="w-full"
              />
            </div>

            <div className="bg-black text-white p-6 mt-6">
              <div className="space-y-4">
                <Link href="/student-life/living-in-london" className="block hover:underline">
                  Living in London
                </Link>
                <Link href="/student-life/health-wellbeing" className="block hover:underline">
                  Health and wellbeing
                </Link>
                <Link href="/student-life/term-dates" className="block hover:underline">
                  Term dates
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-3/4 pl-6">
          <Image
            src="https://supercool-ram.transforms.svdcdn.com/production/200731-COMM-WEBS-StudentLifeImage-1_2020-08-19-151828.jpg"
            alt="A student carries a cello case into the entrance of the Academy"
            width={960}
            height={640}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentLifeBlock;