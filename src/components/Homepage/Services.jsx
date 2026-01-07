const Services = () => {
  return (
    <section className="py-12 bg-white/5 rounded-lg">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Grooming", desc: "Partner salons for happy pets." },
          { title: "Vet Care", desc: "Find local veterinarians and clinics." },
          { title: "Training", desc: "Behavior and obedience resources." },
        ].map((s) => (
          <div key={s.title} className="card p-6">
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
