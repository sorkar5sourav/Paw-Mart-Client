const Features = () => {
  return (
    <section className="py-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Adoption Listings",
            desc: "Browse verified pets ready for adoption.",
          },
          {
            title: "Safe Transactions",
            desc: "Secure messaging and verified contacts.",
          },
          { title: "Verified Shelters", desc: "Trusted partners and rescues." },
          { title: "Support Resources", desc: "Guides for new pet owners." },
        ].map((f) => (
          <div key={f.title} className="card p-6">
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
