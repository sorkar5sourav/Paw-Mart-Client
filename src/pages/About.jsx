import MyContainer from "../components/MyContainer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <MyContainer className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid gap-8 lg:grid-cols-2 items-center mb-12"
      >
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            alt="happy pet adoption"
            src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5a7fc0f10d6b6ff0f0f1e6a4b3c7d17d"
            className="w-full h-80 object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold mb-4">About PawMart</h1>
          <p className="text-lg text-muted mb-4">
            PawMart connects compassionate families with pets in need. Founded
            by a community of animal lovers, our mission is to make adoption
            easy, transparent, and safe. We partner with shelters and rescue
            organizations to list pets ready for forever homes and provide
            resources for responsible ownership.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-base-200 p-4 rounded-lg">
              <h4 className="font-semibold">Quick Facts</h4>
              <ul className="text-sm text-muted mt-2 space-y-1">
                <li>Verified shelters & partners across regions</li>
                <li>Secure messaging and verified contacts</li>
                <li>Support resources for new pet owners</li>
              </ul>
            </div>

            <div className="bg-base-200 p-4 rounded-lg">
              <h4 className="font-semibold">How we help</h4>
              <p className="text-sm text-muted mt-2">
                We streamline listings, verify shelter partners, and provide
                educational resources so adopters and rescuers can make
                informed, compassionate decisions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <section className="mb-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="card p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9b4723d0b2a1da6f8a4b3e8f6d3b0b1c"
                alt="mission"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">Our Mission</h4>
                <p className="text-sm text-muted mt-1">
                  Make pet adoption accessible and safe — matching animals with
                  caring homes while supporting shelters and volunteers.
                </p>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="card p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2f3b2a5a7d4c5e0b1a6a2d8f4a2c3b9d"
                alt="values"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">Our Values</h4>
                <p className="text-sm text-muted mt-1">
                  Transparency, animal welfare, community support, and long-term
                  success for every adoption.
                </p>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="card p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7c5a8f67b4d7f3e9a1f5b6c8d1e2f3a4"
                alt="community"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">Community</h4>
                <p className="text-sm text-muted mt-1">
                  We partner with local shelters, volunteers, and vets to ensure
                  pets receive care and the best chance at a loving home.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Aisha Khan",
              role: "Founder & CEO",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4c3c1f7ff8d9b9f3a8c9",
            },
            {
              name: "Jon Doe",
              role: "Head of Partnerships",
              img: "https://images.unsplash.com/photo-1545996124-7f9a7a7f5a83?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=8a7b7c6d5e4f3a2b1c0",
            },
            {
              name: "Mia Patel",
              role: "Volunteer Lead",
              img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3d2f8a9b7c6e5d4f1a2b",
            },
            {
              name: "Carlos Ruiz",
              role: "Community Manager",
              img: "https://images.unsplash.com/photo-1544739313-6c2e6d8b9a2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7a8b9c0",
            },
          ].map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="card p-4 text-center"
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <div className="mt-3">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </MyContainer>
  );
};

export default About;
