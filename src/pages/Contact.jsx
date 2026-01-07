import MyContainer from "../components/MyContainer";

const Contact = () => {
  return (
    <MyContainer className="py-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-sm text-muted mb-6">We'd love to hear from you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form className="card p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="input input-bordered w-full"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={6}
              placeholder="How can we help?"
            />
          </div>
          <div>
            <button className="btn btn-primary">Send Message</button>
          </div>
        </form>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-2">Head Office</h3>
          <p className="text-sm text-muted mb-4">
            1234 Pet Lane, Happy Town, HT 56789
          </p>
          <p className="text-sm">Email: support@pawmart.example</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    </MyContainer>
  );
};

export default Contact;
