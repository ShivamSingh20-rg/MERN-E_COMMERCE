import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&auto=format",
    title: "Summer Energy",
    highlight: "Unleashed",
    badge: "40% OFF",
    description:
      "Fresh drops, bold colors, and premium everyday essentials made to move with you.",
    cta: "Shop Collection",
    accent: "from-[#FF3D5A] to-[#E879F9]",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&auto=format",
    title: "Elevated Basics",
    highlight: "Every Day",
    badge: "New In",
    description:
      "Clean silhouettes and refined details designed for effortless daily styling.",
    cta: "Explore New Arrivals",
    accent: "from-[#5B4FF5] to-purple-500",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&auto=format",
    title: "Define Your",
    highlight: "Style",
    badge: "Just Landed",
    description:
      "Standout pieces with a modern edge, built to feel premium from the first wear.",
    cta: "Discover Styles",
    accent: "from-teal-400 to-emerald-500",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1800&auto=format",
    title: "Urban Street",
    highlight: "Culture",
    badge: "Trending",
    description:
      "Oversized fits, cargo details, and the raw energy of modern streetwear.",
    cta: "Shop Streetwear",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800&auto=format",
    title: "Minimalist",
    highlight: "Chic",
    badge: "Premium",
    description:
      "Monochrome palettes and sharp tailoring for an understated, powerful look.",
    cta: "View Premium",
    accent: "from-gray-300 to-gray-100",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1800&auto=format",
    title: "Vintage",
    highlight: "Revival",
    badge: "Exclusive",
    description:
      "Throwback silhouettes and retro washes making a massive comeback this season.",
    cta: "Shop Vintage",
    accent: "from-rose-400 to-red-500",
  }
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Removed the isPaused dependency so it loops continuously every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative h-screen min-h-[650px] w-full overflow-hidden bg-gray-950"
      aria-roledescription="carousel"
      aria-label="Homepage hero slider"
    >
      {slides.map((slide, index) => {
        const isActive = index === current;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              isActive
                ? "z-10 scale-100 opacity-100"
                : "z-0 scale-[1.03] opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          </div>
        );
      })}

      <div className="absolute inset-0 z-20 flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl text-white">
          <span className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur-md animate-fade-in">
            {slides[current].badge}
          </span>

          <h1 className="animate-fade-up text-5xl font-black leading-none md:text-7xl lg:text-8xl">
            {slides[current].title}
            <br />
            <span
              className={`bg-gradient-to-r ${slides[current].accent} bg-clip-text text-transparent`}
            >
              {slides[current].highlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-lg text-white/80 md:text-xl">
            {slides[current].description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up">
            <Link
              to="/shop"
              className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${slides[current].accent} px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
            >
              {slides[current].cta}
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Browse All
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 md:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 md:right-6"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => {
          const isActive = current === index;

          return (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-300 ${
                isActive ? "h-2 w-10 bg-white" : "h-2 w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
