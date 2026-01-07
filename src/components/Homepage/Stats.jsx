const Stats = () => {
  const stats = [
    { label: "Pets Adopted", value: "12.4k" },
    { label: "Active Listings", value: "3.2k" },
    { label: "Shelter Partners", value: "420" },
    { label: "Volunteers", value: "1.1k" },
  ];

  return (
    <section className="py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="card p-6 text-center">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
