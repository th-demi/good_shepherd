import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import "../app/globals.css";

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>About Us - GSIM</title>
        <meta name="description" content="Learn more about GSIM - Good Shepherd Institute Of Music" />
      </Head>

      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="relative w-32 h-32 mb-8 transform transition-all duration-1000 hover:scale-110">
              <Image
                src="/GSIM_only_logo.png"
                alt="GSIM Logo"
                fill
                className={`object-contain transition-opacity duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-thin text-center mb-6 
              bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent
              transform transition-all duration-1000 hover:scale-105">
              ABOUT GSIM
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {['about', 'vision'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-8 py-3 text-lg rounded-full transition-all duration-500 transform
                  ${activeSection === section 
                    ? 'bg-white text-black scale-105 shadow-lg'
                    : 'bg-white/10 hover:bg-white/20'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="max-w-4xl mx-auto">
            {activeSection === 'about' && (
              <div className="space-y-8 animate-slideUp">
                <p className="text-xl text-gray-300 leading-relaxed transform transition-all duration-500 hover:translate-x-2">
                  Welcome to Good Shepherd Music Institute (GSIM), one of Chennai's most respected music institutions! For over 5 years, GSIM has been dedicated to spreading the joy of music, nurturing talent, and cultivating excellence in students of all ages.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    "A generation ago, becoming a successful musician required a good ear, solid technique, sensitivity, and a strong work ethic. While these qualities are still vital, today's young musicians must bring even more to the table.",
                    "Whether you're an advanced student preparing for a career in music or a parent introducing your child to music for the first time, GSIM has something special for you.",
                    "As society evolves, so do its expectations of artists. Collaboration is now the key. Musicians can no longer simply exist in the world—they must actively engage with it.",
                    "We invite you to explore the many opportunities an education at GSIM offers. We hope you find success in your musical journey with us."
                  ].map((text, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 p-6 rounded-xl backdrop-blur-sm
                        transform transition-all duration-500 hover:scale-105 hover:bg-white/10"
                    >
                      <p className="text-gray-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'vision' && (
              <div className="space-y-8 animate-slideUp">
                <div className="bg-gradient-to-br from-white/10 to-transparent p-8 rounded-xl mb-12
                  transform transition-all duration-500 hover:translate-y-[-4px]">
                  <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    Our Vision
                  </h3>
                  <p className="text-xl text-gray-300">
                    To inspire individuals to think musically and make a difference in the world.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Excellence",
                      content: "We cultivate greatness by offering rigorous education and holding students to the highest standards of excellence."
                    },
                    {
                      title: "Innovation",
                      content: "We challenge our students to not only follow established paths but to lead the way, creating new opportunities."
                    },
                    {
                      title: "Community",
                      content: "Our diverse community allows different perspectives to expand minds and enrich experiences."
                    },
                    {
                      title: "Impact",
                      content: "We mold students into extraordinary musicians and people who create positive change through their music."
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white/5 p-6 rounded-xl backdrop-blur-sm
                        transform transition-all duration-500 hover:scale-105 hover:bg-white/10"
                    >
                      <h4 className="text-xl font-semibold mb-3 text-white/90">{item.title}</h4>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}