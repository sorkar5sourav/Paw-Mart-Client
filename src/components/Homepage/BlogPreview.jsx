const BlogPreview = () => {
  const posts = [
    { title: "Preparing Your Home for a New Pet", id: 1 },
    { title: "Top Nutrition Tips", id: 2 },
    { title: "Volunteer Spotlight: Mia", id: 3 },
  ];

  return (
    <section className="py-12">
      <h3 className="mb-6 text-2xl font-bold">From the Blog</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((p) => (
          <article key={p.id} className="card p-4">
            <h4 className="font-semibold">{p.title}</h4>
            <p className="text-xs text-muted mt-2">Read more</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
