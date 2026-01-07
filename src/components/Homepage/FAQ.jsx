const FAQ = () => {
  const faqs = [
    {
      q: "How do I adopt?",
      a: "Create an account, browse listings and contact the lister.",
    },
    {
      q: "Can I foster?",
      a: "Yes — look for foster-friendly listings or contact shelters.",
    },
    {
      q: "Is there a fee?",
      a: "Adoption fees vary and help cover vaccinations and care.",
    },
  ];

  return (
    <section className="py-12">
      <h3 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h3>
      <div className="grid gap-4">
        {faqs.map((f, i) => (
          <details key={i} className="card p-4">
            <summary className="font-semibold cursor-pointer">{f.q}</summary>
            <p className="mt-2 text-sm text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
