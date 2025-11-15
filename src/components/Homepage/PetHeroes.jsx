import { motion } from "framer-motion";

const heroes = [
  {
    name: "Maya Rahman",
    role: "Foster Caregiver",
    story:
      "Maya has fostered over 18 senior dogs, helping them regain trust and find retirement homes filled with comfort.",
    image:
      "https://www.lawnstarter.com/blog/wp-content/uploads/2023/08/pexels-blue-bird-7210705new-1.png",
  },
  {
    name: "Aarav Chatterjee",
    role: "Adoption Champion",
    story:
      "After adopting Luna from PawMart, Aarav now volunteers every weekend to match families with their perfect pet.",
    image:
      "https://res.cloudinary.com/jerrick/image/upload/v1688440973/64a3908de5d820001c22beeb.jpg",
  },
  {
    name: "Selina Gomes",
    role: "Community Vet Partner",
    story:
      "Selina offers free wellness checks for newly adopted pets, ensuring every furry friend gets a healthy start.",
    image:
      "https://media.istockphoto.com/id/1410010187/video/woman-with-exotic-pets.jpg?s=640x640&k=20&c=EB4YGb6whg989X_hL5JDVC5vjEcWEWpuGFx4cvhXDcI=",
  },
  {
    name: "Hassan & Leila",
    role: "Rescue Advocates",
    story:
      "This husband-and-wife duo leads our rescue drives, transporting animals from remote shelters to PawMart foster homes.",
    image:
      "https://cdn.prod.website-files.com/661d3eb71206816721de681d/661d3eb71206816721de82aa_PetLovers.webp",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
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

const PetHeroes = () => {
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
          Meet Our Pet Heroes
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          The Faces Behind Every Happy Tail
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
          From fosters to adopters, these compassionate caretakers make PawMart
          a thriving rescue community. Their stories inspire families to choose
          adoption and show what’s possible when we rally for animals in need.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {heroes.map(({ name, role, story, image }) => (
          <MotionArticle
            key={name}
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow transition hover:-translate-y-1 hover:shadow-lg transition-colors duration-300"
            variants={cardVariants}
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
                loading="lazy"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-base-100/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow">
                {role}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-lg font-semibold text-base-content">{name}</h3>
              <p className="text-sm text-base-content/70">{story}</p>
            </div>
          </MotionArticle>
        ))}
      </div>
    </MotionSection>
  );
};

export default PetHeroes;
