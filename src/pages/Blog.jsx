import MyContainer from "../components/MyContainer";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

const initialPosts = [
  {
    id: 1,
    title: "Preparing Your Home for a New Pet",
    excerpt:
      "Practical tips to make your home safe and welcoming for a new pet.",
    body: "Preparing your home means securing hazards, creating a comfort space, and planning a feeding and exercise routine. Start with small changes and give your new pet time to settle.",
  },
  {
    id: 2,
    title: "Nutrition Basics for Puppies and Kittens",
    excerpt: "Guidance on age-appropriate diets and feeding schedules.",
    body: "Young animals need nutrient-rich, easily digestible diets and frequent small meals. Consult your vet for breed and age-specific recommendations.",
  },
  {
    id: 3,
    title: "How to Introduce Pets to Each Other",
    excerpt: "Step-by-step methods to ensure a smooth introduction.",
    body: "Introduce pets gradually in neutral territory, allow scent swapping, supervise short interactions, and increase time together as they show calm behavior.",
  },
  {
    id: 4,
    title: "Positive Reinforcement Training 101",
    excerpt:
      "The basics of training your pet using rewards rather than punishment.",
    body: "Focus on rewarding desired behaviors with treats, praise, or play. Consistency and timing are key; avoid physical punishment, as it can cause fear and aggression.",
  },
  {
    id: 5,
    title: "Understanding Pet Body Language",
    excerpt: "How to interpret tail wags, ear positions, and vocalizations.",
    body: "Learn to read subtle cues. A wagging tail doesn't always mean happy—it can signal arousal or nervousness. Watch the ears and posture to truly understand how your pet feels.",
  },
  {
    id: 6,
    title: "The Importance of Regular Vet Checkups",
    excerpt: "Why annual wellness exams are crucial for long-term health.",
    body: "Routine visits allow vets to catch health issues early before they become serious. They are also essential for keeping vaccinations and parasite prevention up to date.",
  },
  {
    id: 7,
    title: "Grooming Essentials for Every Owner",
    excerpt: "Maintenance tips for coats, nails, and dental hygiene.",
    body: "Regular brushing reduces shedding and prevents painful mats. Don't forget nail trimming to prevent joint issues and daily tooth brushing to fight gum disease.",
  },
  {
    id: 8,
    title: "Caring for Senior Pets",
    excerpt: "Adjusting your care routine as your companion ages.",
    body: "Older pets may need softer bedding, joint supplements, and more frequent bathroom breaks. Switch to a senior diet to support their changing metabolism and kidney health.",
  },
  {
    id: 9,
    title: "Pet-Proofing Your Garden and Yard",
    excerpt: "Identifying toxic plants and securing escape routes.",
    body: "Many common plants like lilies and azaleas are toxic. Ensure your fencing is secure without gaps, and avoid using chemical pesticides where your pets play.",
  },
  {
    id: 10,
    title: "Managing Separation Anxiety",
    excerpt: "Helping your pet feel safe when you are away from home.",
    body: "Practice short departures, provide puzzle toys for distraction, and avoid making a big fuss when leaving or returning to help normalize your absence.",
  },
  {
    id: 11,
    title: "The Benefits of Spaying and Neutering",
    excerpt: "Health and behavioral advantages of sterilization.",
    body: "Spaying and neutering can prevent certain cancers, reduce the risk of roaming, and decrease aggressive behaviors, contributing to a longer, happier life.",
  },
  {
    id: 12,
    title: "Choosing the Right Pet Insurance",
    excerpt: "Financial planning for unexpected veterinary costs.",
    body: "Compare plans based on deductibles, reimbursement rates, and coverage for pre-existing conditions. Insurance provides peace of mind during medical emergencies.",
  },
  {
    id: 13,
    title: "Socializing Your Rescue Dog",
    excerpt: "Building confidence in new environments and with new people.",
    body: "Take it slow. Introduce new stimuli at a distance and reward calm behavior. Never force an interaction if your dog shows signs of fear or stress.",
  },
  {
    id: 14,
    title: "Nutrition: Dry vs. Wet Food",
    excerpt: "Pros and cons of different food types for your pet's diet.",
    body: "Dry food is convenient and good for teeth, while wet food provides hydration and is often more palatable. Many owners find a mix of both works best.",
  },
  {
    id: 15,
    title: "Emergency First Aid for Pets",
    excerpt: "What to have in your kit and how to handle minor injuries.",
    body: "Keep a kit with bandages, antiseptic, and tweezers. Learn basic CPR for pets and always have the number for your local 24-hour emergency vet saved in your phone.",
  },
];

const Blog = () => {
  const [posts] = useState(initialPosts);
  const [expanded, setExpanded] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#post-", "");
      const numId = Number(id);
      if (!Number.isNaN(numId)) {
        setExpanded(numId);
        // scroll the element into view smoothly
        const el = document.getElementById(`post-${numId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setExpanded(null);
    }
  }, [location.hash]);

  return (
    <MyContainer className="py-12" ref={containerRef}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">PawMart Blog</h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm hidden sm:inline-block"
        >
          Back
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => {
          const isOpen = expanded === p.id;
          return (
            <motion.article
              id={`post-${p.id}`}
              key={p.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              className={`card p-6 cursor-pointer ${isOpen ? "shadow-lg" : ""}`}
              onClick={() => {
                if (isOpen) {
                  // close and remove hash
                  setExpanded(null);
                  navigate("/blog", { replace: true });
                } else {
                  setExpanded(p.id);
                  navigate(`/blog#post-${p.id}`);
                }
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted">{p.excerpt}</p>

              <motion.div
                layout
                initial={{ height: 0, opacity: 0 }}
                animate={
                  isOpen
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.32, ease: "easeInOut" }}
                className="overflow-hidden mt-4"
              >
                <div className="text-sm leading-relaxed text-gray-700">
                  {p.body}
                </div>
                <div className="mt-4 flex gap-3">
                  <a href="#" className="btn btn-sm btn-primary">
                    Read full article
                  </a>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(null);
                      navigate("/blog", { replace: true });
                    }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </MyContainer>
  );
};

export default Blog;
