import MyContainer from "../components/MyContainer";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Preparing Your Home for a New Pet",
      excerpt:
        "Practical tips to make your home safe and welcoming for a new pet.",
    },
    {
      id: 2,
      title: "Nutrition Basics for Puppies and Kittens",
      excerpt: "Guidance on age-appropriate diets and feeding schedules.",
    },
    {
      id: 3,
      title: "How to Introduce Pets to Each Other",
      excerpt: "Step-by-step methods to ensure a smooth introduction.",
    },
  ];

  return (
    <MyContainer className="py-12">
      <h1 className="text-3xl font-bold mb-4">PawMart Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.id} className="card p-6">
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-muted">{p.excerpt}</p>
            <a className="link mt-3 block text-primary" href="#">
              Read more →
            </a>
          </article>
        ))}
      </div>
    </MyContainer>
  );
};

export default Blog;
