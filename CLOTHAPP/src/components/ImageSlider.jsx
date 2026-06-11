import React, { useState, useEffect, useCallback } from 'react';

const SLIDE_DATA = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    title: 'Summer Collection 2026',
    subtitle: 'Up to 50% Off on all bright styles.',
    btnText: 'Shop Now',
    link: '#',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    title: 'Elevated Basics',
    subtitle: 'Premium quality for everyday comfort.',
    btnText: 'Explore More',
    link: '#',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop',
    title: 'The New Trend',
    subtitle: 'Be the first to wear the future of fashion.',
    btnText: 'New Arrivals',
    link: '#',
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === SLIDE_DATA.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  // Handle automatic sliding every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[80vh] md:h-[85vh] overflow-hidden font-sans bg-gray-900">
      {/* Slides Wrapper */}
      <div className="relative w-full h-full">
        {SLIDE_DATA.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Clothing Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Slide Content Overlay */}
              <div className="absolute bottom-[15%] left-[10%] text-white z-20 max-w-md md:max-w-xl drop-shadow-lg">
                <h2 className="text-3xl md:text-5xl font-bold tracking-wider uppercase mb-3">
                  {slide.title}
                </h2>
                <p className="text-base md:text-xl mb-6 font-light">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.link}
                  className="inline-block px-6 py-3 bg-white text-black font-semibold uppercase tracking-medium text-sm transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  {slide.btnText}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3 z-30">
        {SLIDE_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
