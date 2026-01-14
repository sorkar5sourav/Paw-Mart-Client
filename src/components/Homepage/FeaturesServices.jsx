import React, { useState } from "react";
import { motion } from "framer-motion";

const data = [
  {
    key: "adoption",
    title: "Adoption Listings",
    subtitle: "Verified pets ready for loving homes",
    details:
      "Browse curated, verified pet profiles with health summaries, vaccinations and shelter backgrounds to help you make a confident choice.",
    emoji: "🐶",
  },
  {
    key: "grooming",
    title: "Grooming",
    subtitle: "Partner salons for happy pets",
    details:
      "Book professional grooming packages — from full grooms to express washes — with trusted partner salons and mobile groomers.",
    emoji: "✂️",
  },
  {
    key: "vet",
    title: "Vet Care",
    subtitle: "Local clinics & telehealth",
    details:
      "Find nearby veterinarians, book appointments, and access telehealth consultations for quick medical advice and follow-ups.",
    emoji: "🩺",
  },
  {
    key: "training",
    title: "Training",
    subtitle: "Behavioral & obedience resources",
    details:
      "Access training guides, local trainers, and video courses to help your pet thrive at home and out in public.",
    emoji: "🎓",
  },
  {
    key: "safety",
    title: "Safe Transactions",
    subtitle: "Secure messaging & verifications",
    details:
      "We protect both buyers and sellers with verified profiles, secure messaging, and guidance for safe meetups and payments.",
    emoji: "🔒",
  },
  {
    key: "support",
    title: "Support Resources",
    subtitle: "Guides for new pet owners",
    details:
      "Find adoption checklists, first-week plans, nutrition guides, and community support to help you and your pet succeed.",
    emoji: "📚",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.36, ease: "easeOut" } },
};

const FeaturesServices = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-primary uppercase">
              Our Services
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold mt-2">
              Everything you need for a happy pet
            </h3>
            <p className="text-muted mt-2 max-w-xl">
              From adoption to ongoing care, we bring shelters, clinics and
              trusted partners together in one delightful experience.
            </p>
          </div>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {data.map((d) => {
            const isOpen = open === d.key;
            return (
              <motion.article
                key={d.key}
                className="card p-6 relative overflow-hidden cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 12px 30px rgba(2,6,23,0.12)",
                }}
                onClick={() => setOpen(isOpen ? null : d.key)}
                style={{ borderRadius: "16px" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center text-2xl w-12 h-12 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,97,92,0.12), rgba(105,199,172,0.08))",
                    }}
                  >
                    <span aria-hidden className="select-none">
                      {d.emoji}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold">{d.title}</h4>
                    <p className="text-sm text-muted mt-1">{d.subtitle}</p>
                  </div>

                  <div className="ml-4 text-muted text-sm">
                    {isOpen ? "Hide" : "Learn"}
                  </div>
                </div>

                <motion.div
                  className="mt-4 text-sm text-gray-600 leading-relaxed"
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    isOpen
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.36, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pt-2">{d.details}</div>

                  <div className="mt-4 flex items-center gap-3">
                    <button className="btn btn-sm btn-ghost">Explore</button>
                    <button className="btn btn-sm btn-outline">Contact</button>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesServices;
