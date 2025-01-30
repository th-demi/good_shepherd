import { useState, useEffect } from "react";
import Head from "next/head"; // Import Head from next/head
import "../app/globals.css";

export default function AboutUsPage() {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  // Trigger visibility of the logo after 250ms
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setIsLogoVisible(true);
    }, 400); // 250ms for the logo to appear

    // Trigger visibility of the content after 500ms
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 500); // 500ms for the content to appear

    // Cleanup the timeouts if the component unmounts
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <>
      {/* Set the title for this page */}
      <Head>
        <title>About Us - GSIM</title>
        <meta name="description" content="Learn more about GSIM - Good Shepherd Institute Of Music" />
      </Head>

      <div className="bg-black text-white py-12 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Mobile/Tablet Header Section */}
          <div className="lg:hidden mb-8">
            <div className="md:ml-[8.33%] md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-thin mb-6">ABOUT US</h2>
            </div>
            <div className="hidden md:block md:ml-[8.33%] md:w-[83.33%]">
              <hr className="border-t border-white/20" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-wrap -mx-4">
            {/* Image Section - Logo */}
            <div className="w-full px-4 mb-8 md:mb-0 md:w-[41.66%] md:ml-[8.33%] lg:ml-0">
              <div className="h-[300px] md:h-[400px] bg-transparent rounded-lg overflow-hidden">
                <img
                  src="/GSIM_only_logo.png"
                  alt="GSIM Logo"
                  className={`w-full h-full object-contain transition-opacity duration-700 ${
                    isLogoVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>

            {/* Text Content Section */}
            <div
              className={`w-full px-4 md:w-[41.66%] md:ml-[8.33%] lg:ml-[16.66%] transition-opacity duration-700 ${
                isContentVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Desktop Header */}
              <h2 className="hidden lg:block text-5xl xl:text-7xl font-thin mb-12">ABOUT US</h2>

              {/* Content for all screen sizes */}
              <div className="space-y-4">
                <p className="text-lg text-gray-300">
                  We are a dedicated music academy committed to nurturing talent and providing world-class music education.
                </p>

                <p className="text-lg text-gray-300">
                  Our team consists of experienced instructors, all passionate about helping students achieve their musical goals.
                </p>

                <p className="text-lg text-gray-300">
                  With partnerships with globally recognized exam boards like <strong>ABRSM</strong>, <strong>Trinity</strong>, <strong>LCM</strong>, <strong>MTB</strong>, and <strong>RSL</strong>, we ensure our students receive the best possible preparation and certifications.
                </p>

                <p className="text-lg text-gray-300">
                  Whether you're a beginner or an advanced student, our curriculum and expert guidance provide the skills needed for success in music and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
