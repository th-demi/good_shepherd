import React from 'react';
import Link from 'next/link';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current transform transition-transform duration-300 group-hover:scale-110">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current transform transition-transform duration-300 group-hover:scale-110">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current transform transition-transform duration-300 group-hover:scale-110">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FooterTop = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Navigation */}
          <nav aria-label="Social" className="mb-6 md:mb-0">
            <h5 className="sr-only">Social Media Navigation</h5>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="https://www.facebook.com/goodshepherdmusic/?_rdr"
                  className="text-white hover:text-gray-300 group"
                  aria-label="A link to facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">facebook</span>
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/goodshepherdim?igsh=enNqcXZlbHhseDVh"
                  className="text-white hover:text-gray-300 group"
                  aria-label="A link to instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">instagram</span>
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@goodshepherdinstituteofmus1616?si=MnNhjRKhsCaDvK6O"
                  className="text-white hover:text-gray-300 group"
                  aria-label="A link to youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">youtube</span>
                  <YouTubeIcon />
                </a>
              </li>
            </ul>
          </nav>

          {/* Secondary Navigation */}
          <nav aria-label="Secondary Navigation" className="md:ml-auto">
            <h5 className="sr-only">Secondary Navigation</h5>
            <ul className="flex flex-wrap md:flex-nowrap items-center space-x-4 md:space-x-8">
              <li className="whitespace-nowrap">
                <Link href="/about-us" className="relative text-white font-bold group">
                  About us
                  <span className="absolute left-0 bottom-0 block w-0 h-0.25 bg-custom-red transition-all duration-30 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
