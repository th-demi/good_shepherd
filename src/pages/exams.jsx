import { useState, useEffect } from "react";
import "../app/globals.css";
import ImageCarousel from "./ImageCarousel";
import Head from "next/head";
import Image from "next/image";

export default function ExamPage() {
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isExamSectionVisible, setIsExamSectionVisible] = useState(false);
  const [activeBoard, setActiveBoard] = useState('ABRSM');

  const boards = {
    ABRSM: {
      logo: '/schools/abrsm-logo.jpg',
      title: 'ABRSM (Associated Board of the Royal Schools of Music) – UK',
      content: {
        overview: 'ABRSM is one of the most widely recognized music examination boards in the world, affiliated with prestigious UK conservatoires such as the Royal Academy of Music and the Royal College of Music.',
        offerings: [
          'Graded music exams (Grades 1–8)',
          'Performance Grades (online assessments)',
          'Theory exams (Grades 1–8)',
          'Diplomas (ARSM, DipABRSM, LRSM, FRSM)',
          'Music Medals for beginners'
        ],
        strengths: [
          'Strong focus on classical music',
          'Internationally respected syllabus',
          'High-quality examiners and assessment standards'
        ],
        bestFor: 'Students pursuing a structured and rigorous classical music education.'
      }
    },
    Trinity: {
      logo: '/schools/trinity-logo.jpg',
      title: 'Trinity College London',
      content: {
        overview: 'Trinity College London offers a flexible and contemporary approach to music assessment, with a strong emphasis on musical expression and stylistic diversity.',
        offerings: [
          'Graded exams (Grades 1–8)',
          'Performance certificates and diplomas (ATCL, LTCL, FTCL)',
          'Rock & Pop exams for modern musicians',
          'Theory and composition assessments'
        ],
        strengths: [
          'Flexible repertoire choices',
          'Practical, performance-based assessment style',
          'Strong recognition worldwide'
        ],
        bestFor: 'Students who want more freedom in repertoire selection and contemporary musicians.'
      }
    },
    LCM: {
      logo: '/schools/lcm-logo.jpg',
      title: 'London College of Music (LCM) – University of West London',
      content: {
        overview: 'LCM provides a comprehensive music exam system, covering classical, jazz, pop, and musical theatre.',
        offerings: [
          'Classical music exams (Grades 1–8)',
          'Pop, rock, and jazz exams',
          'Performance and teaching diplomas',
          'Music theory and composition assessments'
        ],
        strengths: [
          'Diverse syllabus covering multiple genres',
          'Recognized for contemporary music specializations',
          'Offers ensemble and music production exams'
        ],
        bestFor: 'Those seeking a broad range of musical styles, including jazz and pop.'
      }
    },
    RSL: {
      logo: '/schools/rsl-logo.jpg',
      title: 'RSL Awards (Rockschool – RSL)',
      content: {
        overview: 'Rockschool specializes in contemporary music assessments, focusing on rock, pop, and jazz instruments.',
        offerings: [
          'Graded exams in guitar, bass, drums, vocals, piano, and ukulele',
          'Popular music performance and production qualifications',
          'Theory exams with a modern approach',
          'Digital music and DJ skills certification'
        ],
        strengths: [
          'Ideal for contemporary musicians',
          'Backing tracks and improvisation encouraged',
          'Practical and industry-relevant assessments'
        ],
        bestFor: 'Students interested in pop, rock, jazz, and digital music.'
      }
    },
    MTB: {
      logo: '/schools/mtb-logo.jpg',
      title: 'MTB Exams (Music Teachers\' Board)',
      content: {
        overview: 'MTB provides online music exams, allowing students to take assessments remotely.',
        offerings: [
          'Graded exams (1–8)',
          'Performance and diploma qualifications',
          'Theory exams available online'
        ],
        strengths: [
          'Fully online assessment model',
          'Flexible and convenient for students worldwide'
        ],
        bestFor: 'Students who prefer online assessments.'
      }
    }
  };

  // Trigger visibility of the carousel after 400ms
  useEffect(() => {
    const carouselTimer = setTimeout(() => {
      setIsCarouselVisible(true);
    }, 400); // 400ms for the carousel to appear

    // Trigger visibility of the content after 500ms
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 500); // 500ms for the content to appear

    // Trigger visibility of the heading after 600ms
    const headingTimer = setTimeout(() => {
      setIsHeadingVisible(true);
    }, 600); // 600ms for the heading to appear

    // Trigger visibility of the exam section after 700ms
    const examSectionTimer = setTimeout(() => {
      setIsExamSectionVisible(true);
    }, 700); // 700ms for the exam section to appear

    // Cleanup the timeouts if the component unmounts
    return () => {
      clearTimeout(carouselTimer);
      clearTimeout(contentTimer);
      clearTimeout(headingTimer);
      clearTimeout(examSectionTimer);
    };
  }, []);

  return (
    <>
      {/* Add Head for setting the page title */}
      <Head>
        <title>International Exam Boards - GSIM</title>
        <meta name="description" content="Explore our music exams from international boards like ABRSM, Trinity, LCM, MTB, and RSL." />
      </Head>

      <div className="bg-black text-white py-12 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Mobile/Tablet Header Section */}
          <div className="lg:hidden mb-8">
            <div className="md:ml-[8.33%] md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-thin mb-6">
                INTERNATIONAL EXAM BOARDS
              </h2>
            </div>
            <div className="hidden md:block md:ml-[8.33%] md:w-[83.33%]">
              <hr className="border-t border-white/20" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-wrap -mx-4">
            {/* Image Section (Carousel) */}
            <div className="w-full px-4 mb-8 md:mb-0 md:w-[41.66%] md:ml-[8.33%] lg:ml-0">
              <div
                className={`h-[300px] md:h-[400px] bg-gray-900 rounded-lg overflow-hidden transition-opacity duration-700 ${
                  isCarouselVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <ImageCarousel />
              </div>
            </div>

            {/* Text Content */}
            <div
              className={`w-full px-4 md:w-[41.66%] md:ml-[8.33%] lg:ml-[16.66%] transition-opacity duration-700 ${
                isContentVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Desktop Header */}
              <h2 className="hidden lg:block text-5xl xl:text-7xl font-thin mb-12">
                INTERNATIONAL EXAM BOARDS
              </h2>

              {/* Content for all screen sizes */}
              <div className="space-y-4">
                <p className="text-lg text-gray-300">
                  We offer music exams from leading international boards: <strong>ABRSM</strong>, <strong>Trinity</strong>, <strong>LCM</strong>, <strong>MTB</strong>, and <strong>RSL</strong>.
                </p>

                <p className="text-lg text-gray-300">
                  Our syllabus follows the official guidelines of these boards, ensuring top-quality preparation for all levels.
                </p>

                <p className="text-lg text-gray-300">
                  Students receive globally recognized certifications upon passing their exams, providing them with valuable qualifications for their music career.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Boards Section */}
        <div className={`transition-opacity duration-700 ${
          isExamSectionVisible ? "opacity-100" : "opacity-0"
        }`}>
          <ExamBoardsSection 
            boards={boards} 
            activeBoard={activeBoard} 
            setActiveBoard={setActiveBoard} 
            isHeadingVisible={isHeadingVisible}
          />
        </div>
      </div>
    </>
  );
}

const ExamBoardsSection = ({ boards, activeBoard, setActiveBoard, isHeadingVisible }) => {
  return (
    <div className="mt-20 mb-12">
      <h2 className={`text-4xl font-thin mb-12 text-center transform transition-all duration-500 hover:scale-105 ${
        isHeadingVisible ? "opacity-100" : "opacity-0"
      }`}>
        OUR EXAMINATION BOARDS
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Logos Column */}
        <div className="w-full lg:w-1/3 sticky top-4 h-fit">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {Object.entries(boards).map(([key, board]) => (
              <button
                key={key}
                onClick={() => setActiveBoard(key)}
                className={`group relative p-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl
                  ${activeBoard === key 
                    ? 'bg-gradient-to-br from-white/15 to-white/5 shadow-xl scale-105' 
                    : 'bg-white/5 hover:bg-white/10'
                  }`}
              >
                <div className="relative h-20 w-full transition-transform duration-300 group-hover:-translate-y-1">
                  <Image
                    src={board.logo}
                    alt={`${key} logo`}
                    fill
                    className="object-contain filter transition-all duration-300 group-hover:brightness-125"
                  />
                </div>
                <div className={`h-0.5 bg-white/30 transform scale-x-0 transition-transform duration-500 mt-4
                  ${activeBoard === key ? 'scale-x-100' : 'group-hover:scale-x-75'}`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Column */}
        <div className="w-full lg:w-2/3">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl lg:bg-white/10">
            {/* Mobile: Solid background for better readability */}
            <div className="lg:hidden bg-black/85 rounded-xl p-6">
              <div key={activeBoard} className="space-y-8 animate-slideUp">
                <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {boards[activeBoard].title}
                </h3>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Overview</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {boards[activeBoard].content.overview}
                  </p>
                </div>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Offerings</h4>
                  <ul className="space-y-3">
                    {boards[activeBoard].content.offerings.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 text-gray-400">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Key Strengths</h4>
                  <ul className="space-y-3">
                    {boards[activeBoard].content.strengths.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 text-gray-400">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Best For</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {boards[activeBoard].content.bestFor}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop: Transparent background */}
            <div className="hidden lg:block">
              <div key={activeBoard} className="space-y-8 animate-slideUp">
                <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {boards[activeBoard].title}
                </h3>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Overview</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {boards[activeBoard].content.overview}
                  </p>
                </div>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Offerings</h4>
                  <ul className="space-y-3">
                    {boards[activeBoard].content.offerings.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 text-gray-400">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Key Strengths</h4>
                  <ul className="space-y-3">
                    {boards[activeBoard].content.strengths.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 text-gray-400">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="transform transition-all duration-500 hover:translate-x-2">
                  <h4 className="text-xl text-gray-300 mb-3">Best For</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {boards[activeBoard].content.bestFor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};