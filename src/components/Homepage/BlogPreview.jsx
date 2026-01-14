import { Link } from "react-router";
import { motion } from "framer-motion";

const BlogPreview = () => {
  const posts = [
    {
      title: "Preparing Your Home for a New Pet",
      id: 1,
      excerpt:
        "Practical tips to make your home safe and welcoming for a new pet.",
    },
    {
      title: "Top Nutrition Tips",
      id: 2,
      excerpt: "Guidance on age-appropriate diets and feeding schedules.",
    },
    {
      title: "Volunteer Spotlight: Mia",
      id: 3,
      excerpt: "Meet Mia, one of our long-time volunteers making a difference.",
    },
  ];

  return (
    <section className="py-12">
      <h3 className="mb-6 text-2xl font-bold">From the Blog</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((p) => (
          <motion.article
            key={p.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            className="card p-4 cursor-pointer"
          >
            <Link to={`/blog#post-${p.id}`} className="block">
              <h4 className="font-semibold text-lg text-primary-hover">
                {p.title}
              </h4>
              <p className="text-xs text-muted mt-2 line-clamp-3">
                {p.excerpt}
              </p>
              <div className="mt-3 text-sm text-primary font-medium">
                Read more →
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
