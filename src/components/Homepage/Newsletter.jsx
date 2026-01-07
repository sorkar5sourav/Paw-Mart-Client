const Newsletter = () => {
  return (
    <section className="py-12 bg-white/5 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-2xl font-bold">Stay in touch</h3>
        <p className="text-sm text-muted max-w-xl text-center">
          Get adoption stories, tips, and new listings delivered to your inbox.
        </p>
        <form className="w-full max-w-md">
          <div className="flex gap-2">
            <input
              aria-label="Email"
              type="email"
              placeholder="you@example.com"
              className="input flex-1"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
