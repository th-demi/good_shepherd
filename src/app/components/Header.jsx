export default function Header() {
    return (
      <header className="relative w-full h-screen">
        <video playsInline autoPlay muted loop aria-hidden="true" className="object-cover w-full h-full z-0">
          <source src="/GSIM_bg_video.mp4" type="video/mp4" />
        </video>
      </header>
    );
  }

// id = "layer-site" = main navbar
// id = "layer-nav" = options
// class = "headder search" = search bar