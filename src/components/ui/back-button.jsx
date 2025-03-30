import Link from "next/link";

const BackIcon = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={`w-12 h-12 text-white transform transition-transform hover:scale-110 ${className}`}
    shapeRendering="geometricPrecision"
  >
    <path 
      d="M13.83 18.83L7.17 12l6.66-6.83L14 4l-8 8 8 8z" 
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const BackButton = ({ 
  href = "/", 
  className = "",
  iconClassName = "mt-1" 
}) => {
  return (
    <Link 
      href={href} 
      className={`z-10 group self-center ${className}`}
    >
      <div className="relative inline-flex items-center">
        <BackIcon className={iconClassName} />
      </div>
    </Link>
  );
};

export default BackButton;