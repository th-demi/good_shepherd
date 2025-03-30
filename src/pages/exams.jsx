import { useState, useEffect } from "react";
import "../app/globals.css";
import ImageCarousel from "@/components/ui/ImageCarousel";
import Head from "next/head";
import Image from "next/image";
import { examBoards } from "@/data/examBoards";
import BackButton from "@/components/ui/back-button";

export default function ExamPage() {
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [isExamSectionVisible, setIsExamSectionVisible] = useState(false);
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [activeBoard, setActiveBoard] = useState('ABRSM');

  // Animation timing sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setIsHeadingVisible(true), 100),      // Heading first
      setTimeout(() => setIsLineVisible(true), 200),        // Then line break
      setTimeout(() => setIsCarouselVisible(true), 300),   // Then carousel
      setTimeout(() => setIsContentVisible(true), 400),    // Then content
      setTimeout(() => setIsExamSectionVisible(true), 500),// Then exam section
      setTimeout(() => setIsBackButtonVisible(true), 600)  // Finally back button
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <>
      <Head>
        <title>International Exam Boards - GSIM</title>
        <meta name="description" content="Explore our music exams from international boards like ABRSM, Trinity, LCM, MTB, and RSL." />
      </Head>

      <div className="bg-black text-white py-12 min-h-screen">
        <div className="container mx-auto px-4">
          {/* New Header Section */}
          <div className="mb-12">
            <div className="relative -ml-2 sm:ml-0 px-4 sm:px-0">
              {/* Back Button - updated positioning to match login page */}
              <div className={`absolute left-0 top-1 transition-opacity duration-500 ${
                isBackButtonVisible ? "opacity-100" : "opacity-0"
              }`}>
                <BackButton className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              
              {/* Heading - updated to match login page's responsive behavior */}
              <h2 className={`text-4xl md:text-5xl xl:text-7xl font-thin text-white transition-opacity duration-500 ${
                isHeadingVisible ? "opacity-100" : "opacity-0"
              } pl-12 sm:pl-14`}>
                INTERNATIONAL EXAM BOARDS
              </h2>
              
              {/* Line Break - unchanged */}
              <hr className={`border-t border-white/20 mb-8 transition-opacity duration-500 ${
                isLineVisible ? "opacity-100" : "opacity-0"
              }`} />
            </div>
          </div>

          {/* Rest of the content remains exactly the same */}
          <div className="flex flex-wrap -mx-4">
            {/* Image Section (Carousel) */}
            <div className="w-full px-4 mb-8 md:mb-0 md:w-[41.66%] md:ml-[8.33%] lg:ml-0">
              <div className={`h-[300px] md:h-[400px] bg-gray-900 rounded-lg overflow-hidden transition-opacity duration-700 ${
                isCarouselVisible ? "opacity-100" : "opacity-0"
              }`}>
                <ImageCarousel />
              </div>
            </div>

            {/* Text Content */}
            <div className={`w-full px-4 md:w-[41.66%] md:ml-[8.33%] lg:ml-[16.66%] transition-opacity duration-700 ${
              isContentVisible ? "opacity-100" : "opacity-0"
            }`}>
              <div className="flex flex-col justify-center h-full space-y-4">
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

          {/* Exam Boards Section */}
          <div className={`transition-opacity duration-700 ${
            isExamSectionVisible ? "opacity-100" : "opacity-0"
          }`}>
            <div className="mt-20 mb-12">
              <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                {/* Logos Column */}
                <div className="w-full lg:w-1/3 sticky top-4 h-fit">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                    {Object.entries(examBoards).map(([key, board]) => (
                      <button
                        key={key}
                        onClick={() => setActiveBoard(key)}
                        className={`group relative p-6 rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                          activeBoard === key 
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
                        <div className={`h-0.5 bg-white/30 transform scale-x-0 transition-transform duration-500 mt-4 ${
                          activeBoard === key ? 'scale-x-100' : 'group-hover:scale-x-75'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Column */}
                <div className="w-full lg:w-2/3">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl lg:bg-white/10">
                    {/* Mobile Content */}
                    <div className="lg:hidden bg-black/85 rounded-xl p-6">
                      <div className="space-y-8 animate-slideUp">
                        <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                          {examBoards[activeBoard].title}
                        </h3>

                        <div className="transform transition-all duration-500 hover:translate-x-2">
                          <h4 className="text-xl text-gray-300 mb-3">Overview</h4>
                          <p className="text-gray-400 leading-relaxed">
                            {examBoards[activeBoard].content.overview}
                          </p>
                        </div>

                        <div className="transform transition-all duration-500 hover:translate-x-2">
                          <h4 className="text-xl text-gray-300 mb-3">Offerings</h4>
                          <ul className="space-y-3">
                            {examBoards[activeBoard].content.offerings.map((item, index) => (
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
                            {examBoards[activeBoard].content.strengths.map((item, index) => (
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
                            {examBoards[activeBoard].content.bestFor}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop Content */}
                    <div className="hidden lg:block">
                      <div className="space-y-8 animate-slideUp">
                        <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                          {examBoards[activeBoard].title}
                        </h3>

                        <div className="transform transition-all duration-500 hover:translate-x-2">
                          <h4 className="text-xl text-gray-300 mb-3">Overview</h4>
                          <p className="text-gray-400 leading-relaxed">
                            {examBoards[activeBoard].content.overview}
                          </p>
                        </div>

                        <div className="transform transition-all duration-500 hover:translate-x-2">
                          <h4 className="text-xl text-gray-300 mb-3">Offerings</h4>
                          <ul className="space-y-3">
                            {examBoards[activeBoard].content.offerings.map((item, index) => (
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
                            {examBoards[activeBoard].content.strengths.map((item, index) => (
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
                            {examBoards[activeBoard].content.bestFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}