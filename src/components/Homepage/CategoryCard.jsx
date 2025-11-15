import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Pets (Adoption)",
    description: "Meet dogs, cats, and small pets eager to join loving homes.",
    icon: "🐾",
    accent: "bg-emerald-100/70",
    value: "Pets",
  },
  {
    title: "Pet Food",
    description: "Nutritious meals and treats tailored for every pet’s diet.",
    icon: "🥣",
    accent: "bg-amber-100/70",
    value: "Food",
  },
  {
    title: "Accessories",
    description:
      "Leashes, PetCareProducts, beds, and gear to keep tails wagging.",
    icon: "🎀",
    accent: "bg-sky-100/70",
    value: "Accessories",
  },
  {
    title: "Pet Care Products",
    description: "Grooming essentials and wellness picks for happy pets.",
    icon: "🧴",
    accent: "bg-rose-100/70",
    value: "Pet Care Products",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const MotionSection = motion.section;
const MotionArticle = motion.article;

const CategoryCard = () => {
  const navigate = useNavigate();

  const handleNavigate = (categoryValue) => {
    navigate(`/pets-supply?category=${encodeURIComponent(categoryValue)}`);
  };

  return (
    <MotionSection
      className="w-full py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
          Explore Categories
        </p>
        <h2 className="mt-2 text-3xl font-bold text-base-content md:text-4xl">
          Everything Your Pet Needs
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-base-content/70 md:text-base">
          Browse our curated sections to find adoptable companions, nourishing
          food, playful accessories, and trusted care essentials.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ title, description, icon, accent, value }) => (
          <MotionArticle
            key={title}
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate(value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleNavigate(value);
              }
            }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            variants={cardVariants}
          >
            <div
              className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${accent} blur-3xl opacity-60 transition duration-300 group-hover:opacity-100`}
            />
            <div className="relative flex h-full flex-col">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl">
                <span role="img" aria-hidden="true">
                  {icon}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-base-content">
                {title}
              </h3>
              <p className="mt-3 text-sm text-base-content/70">{description}</p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleNavigate(value);
                }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition group-hover:gap-3 group-hover:text-emerald-500"
              >
                Discover now
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </MotionArticle>
        ))}
      </div>
    </MotionSection>
  );
};

export default CategoryCard;
