const Highlights = () => {
  return (
    <section className="py-12">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="card p-6">
          <h4 className="text-xl font-bold">Featured Pets</h4>
          <p className="text-sm text-muted">
            Handpicked profiles from our shelters.
          </p>
        </div>
        <div className="card p-6">
          <h4 className="text-xl font-bold">Success Stories</h4>
          <p className="text-sm text-muted">Real adoptions and updates.</p>
        </div>
        <div className="card p-6">
          <h4 className="text-xl font-bold">Community Events</h4>
          <p className="text-sm text-muted">
            Local meetups, drives, and fundraisers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
