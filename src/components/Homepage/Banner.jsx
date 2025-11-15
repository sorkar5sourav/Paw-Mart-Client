import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Typewriter } from "react-simple-typewriter";

const slides = [
  {
    image:
      "https://i.ibb.co.com/Zp8JMc4r/Gemini-Generated-Image-hdostjhdostjhdos.png",
    alt: "Happy family adopting a dog from PawMart",
    tagline: "Find Your Furry Friend Today!",
    description:
      "Discover loving companions waiting to join your family through compassionate adoption.",
  },
  {
    image:
      "https://i.ibb.co.com/MxmYxQVW/Gemini-Generated-Image-9yarel9yarel9yar.png",
    alt: "Volunteer caring for rescued puppies",
    tagline: "Adopt, Don’t Shop — Give a Pet a Home.",
    description:
      "Each adoption gives a rescued pet a second chance and supports lifesaving shelter work.",
  },
  {
    image:
      "https://i.ibb.co.com/s95wC8BX/Gemini-Generated-Image-sd6cnfsd6cnfsd6c.png",
    alt: "Cat relaxing comfortably in a new home",
    tagline: "Because Every Pet Deserves Love and Care.",
    description:
      "Provide warmth, safety, and endless affection to animals who need it most.",
  },
  {
    image:
      "https://i.ibb.co.com/wrWK4Mnv/Gemini-Generated-Image-1j7pic1j7pic1j7p.png",
    alt: "PawMart adopters celebrating with pets",
    tagline: "Make Their Happy Ending Start Today.",
    description:
      "Join thousands of PawMart adopters creating happier futures for pets across the country.",
  },
];

const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionDiv = motion.div;
const MotionA = motion.a;

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlide = slides[activeIndex];

  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay]}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-[340px] md:h-[460px]"
        >
          {slides.map(({ image, alt, tagline }) => (
            <SwiperSlide key={tagline}>
              <img
                src={image}
                alt={alt}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/40 to-black/10" />

        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center gap-4 px-6 text-white md:px-14">
          <span className="pointer-events-auto inline-flex w-fit items-center rounded-full bg-base-100/20 backdrop-blur-sm px-4 py-1 text-xs font-semibold uppercase tracking-widest md:text-sm">
            PawMart Adoption Center
          </span>
          <AnimatePresence mode="wait">
            <MotionH2
              key={`headline-${activeIndex}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="pointer-events-none text-3xl font-bold leading-snug md:text-5xl lg:text-6xl"
            >
              <Typewriter
                key={activeIndex}
                words={[currentSlide.tagline]}
                cursor={false}
                typeSpeed={55}
                deleteSpeed={25}
              />
            </MotionH2>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <MotionP
              key={`description-${activeIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="pointer-events-none max-w-2xl text-sm text-white/90 md:text-lg"
            >
              {currentSlide.description}
            </MotionP>
          </AnimatePresence>
          <MotionDiv
            className="pointer-events-auto flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <MotionA
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="/pets-supply"
              className="btn bg-emerald-500 font-semibold text-white transition hover:bg-emerald-600"
            >
              Explore Adoptions
            </MotionA>
            <MotionA
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="/pets-supply?category=Pets"
              className="btn btn-outline border-white text-white hover:border-emerald-300 hover:bg-emerald-500 hover:text-white"
            >
              View Pets
            </MotionA>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default Banner;
