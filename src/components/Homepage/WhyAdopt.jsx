import { motion } from "framer-motion";

const reasons = [
  {
    title: "Give a Second Chance",
    description:
      "Every adoption opens space at shelters and offers a loving home to a pet who has been waiting for one.",
  },
  {
    title: "Support Responsible Care",
    description:
      "Adoption fees fund vaccinations, spaying/neutering, and health checks that keep more pets safe and healthy.",
  },
  {
    title: "Companionship That Matters",
    description:
      "Rescued pets are remarkably loyal—they know you’ve chosen them and return that love every day.",
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
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const MotionSection = motion.section;
const MotionArticle = motion.article;

const WhyAdopt = () => {
  return (
    <MotionSection
      className="w-full rounded-3xl bg-emerald-50/60 p-8 shadow-sm md:p-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Why Adopt from PawMart?
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Rescue. Rehabilitate. Rehome.
          </h2>
          <p className="mt-4 text-sm text-slate-700 md:text-base">
            When you adopt through PawMart, you become part of a compassionate
            network that champions rescue over retail. Your decision keeps pets
            from spending another night in overcrowded shelters and helps us
            continue lifesaving outreach, medical care, and foster programs.
          </p>
        </div>
        <div className="space-y-6">
          {reasons.map(({ title, description }) => (
            <MotionArticle
              key={title}
              className="rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow"
              variants={cardVariants}
            >
              <h3 className="text-lg font-semibold text-emerald-700">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </MotionArticle>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default WhyAdopt;
