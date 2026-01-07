const CTASection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-2xl font-bold">
          Ready to give a pet a forever home?
        </h3>
        <p className="max-w-2xl text-center">
          Start browsing verified listings or create a listing to help a pet
          find a family.
        </p>
        <div className="flex gap-2">
          <a href="/pets-supply" className="btn btn-outline text-white">
            Browse Listings
          </a>
          <a
            href="/add-listing"
            className="btn bg-white text-[var(--color-primary)]"
          >
            Post a Listing
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
