import { useState, useEffect } from "react";
import "../app/globals.css";
import ImageCarousel from "./ImageCarousel";
import Head from "next/head"; // Import Head from next/head

export default function ExamPage() {
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Trigger visibility of the carousel after 400ms
  useEffect(() => {
    const carouselTimer = setTimeout(() => {
      setIsCarouselVisible(true);
    }, 400); // 400ms for the carousel to appear

    // Trigger visibility of the content after 500ms
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 500); // 500ms for the content to appear

    // Cleanup the timeouts if the component unmounts
    return () => {
      clearTimeout(carouselTimer);
      clearTimeout(contentTimer);
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
      </div>
    </>
  );
}
