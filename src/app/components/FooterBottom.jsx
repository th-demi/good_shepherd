import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FooterBottom = () => {
  return (
    <div className="w-full text-white bg-black">
      <div className="flex flex-col items-center py-8">
        {/* Logo */}
        <Link href="https://goodshepherdim.com/" className="mb-8">
          <Image
            src="/INS.png"
            alt="Royal Academy of Music"
            width={300}
            height={60}
            className="h-12 w-auto"
          />
          <span className="sr-only">Royal Academy of Music</span>
        </Link>

        {/* Address and Details */}
        <div className="text-center mb-8">
          <address className="mb-6 not-italic">
            Good Shepherd Institute Of Music <br />
            No. 33, Sankarapuram Main Road, Sankarapuram, Sithalapakkam, Chennai, Tamil Nadu
          </address>

          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="text-center mb-6 md:mb-0">
              <h6 className="text-sm font-bold mb-1">Telephone</h6>
              <p className="m-0">
                <a href="tel:+919884556997" className="text-white">+91 98845 56997</a>
              </p>
              <p className="m-0">
                <a href="tel:+9198939396179" className="text-white">+91 89393 96179</a>
              </p>
            </div>
            <div className="text-center">
              <h6 className="text-sm font-bold mb-1">Mail to</h6>
              <p className="m-0">
                <a
                  href="mailto:goodshepherdim@gmail.com"
                  className="relative text-white font-bold group"
                >
                  goodshepherdim@gmail.com
                  <span className="absolute left-0 bottom-0 block w-0 h-0.25 bg-custom-red transition-all duration-300 group-hover:w-full"></span>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Crest Logo */}
        <div className="mb-4">
          <Image
            src="/GSIM_only_logo.png"
            alt="Royal Academy of Music"
            width={80}
            height={80}
            className="w-20 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;