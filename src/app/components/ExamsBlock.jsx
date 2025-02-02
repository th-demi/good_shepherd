import Image from 'next/image';
import Link from 'next/link';

const ChevronIcon = () => (
  <svg viewBox="0 0 18 18" className="w-4 h-4 text-white">
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

const ExamsBlock = () => {
  return (
    <section className="bg-custom-red py-12">
      <div className="container mx-auto px-4">
        {/* Mobile/Tablet Header */}
        <div className="lg:hidden mb-8">
          <div className="md:ml-[8.33%] md:w-1/2">
            <h2 className="text-4xl font-thin mb-6 text-white">
              INTERNATIONAL EXAM BOARDS
            </h2>
          </div>
          <div className="hidden md:block md:ml-[8.33%] md:w-[83.33%]">
            <hr className="border-t border-gray-300" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Image Section */}
          <div className="md:ml-[8.33%] lg:ml-0 md:w-5/12">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/student-life-strings.jpeg"
                alt="String students look over the shoulder of a piano accompanist"
                fill
                className="object-cover filter grayscale"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:ml-[8.33%] lg:ml-[16.67%] md:w-5/12 mt-8 lg:mt-0 text-white">
            <div className="pr-4 lg:pr-24">
              {/* Desktop Header */}
              <h2 className="hidden lg:block text-6xl font-thin mb-6">
                INTERNATIONAL EXAM BOARDS
              </h2>

              {/* Content */}
              <div className="hidden md:block">
                <div className="prose max-w-none mb-6">
                  <p>
                    We offer exams from ABRSM, LCM, MTB, and RSL, providing students with the opportunity to earn recognized certifications in music performance and theory, as part of their learning journey.
                  </p>
                </div>
                <ul className="space-y-4">
                <li>
                  <Link href="/exams" className="group flex items-center text-white hover:text-white">
                    <div className="relative inline-block">
                      <span className="mr-2">Learn About Our Exam Partnerships</span>
                      {/* Underline effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                    </div>
                    <ChevronIcon />
                  </Link>
                </li>
                <li>
                  <Link href="/results" className="group flex items-center text-white hover:text-white">
                    <div className="relative inline-block">
                      <span className="mr-2">Check out Exam Results</span>
                      {/* Underline effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                    </div>
                    <ChevronIcon />
                  </Link>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="block md:hidden mt-8">
          <div className="prose max-w-none mb-6 text-white">
            <p>
              We offer exams from ABRSM, LCM, MTB, and RSL, providing students with the opportunity to earn recognized certifications in music performance and theory, as part of their learning journey.
            </p>
          </div>
          <ul className="space-y-4">
          <li>
            <Link href="/exams" className="group flex items-center text-white hover:text-white">
              <div className="relative inline-block">
                <span className="mr-2">Learn About Our Exam Partnerships</span>
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </div>
              <ChevronIcon />
            </Link>
          </li>
          <li>
            <Link href="/results" className="group flex items-center text-white hover:text-white">
              <div className="relative inline-block">
                <span className="mr-2">Check out Exam Results</span>
                {/* Underline effect */}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </div>
              <ChevronIcon />
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </section>
  );
};

export default ExamsBlock;