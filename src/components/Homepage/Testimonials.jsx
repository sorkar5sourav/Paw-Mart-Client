const Testimonials = () => {
  const items = [
    { by: "S. Miller", quote: "We found our forever friend through PawMart!" },
    { by: "A. Khan", quote: "Fantastic support and easy process." },
    { by: "R. Lopez", quote: "Highly recommend for rescuers and adopters." },
  ];

  return (
    <section className="py-12 bg-white/5 rounded-lg">
      <div className="grid gap-6 sm:grid-cols-3">
        {items.map((t, i) => (
          <blockquote key={i} className="card p-6">
            <p className="mb-3 text-sm">“{t.quote}”</p>
            <footer className="text-xs text-muted">— {t.by}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
