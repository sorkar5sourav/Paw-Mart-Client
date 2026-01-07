import MyContainer from "../components/MyContainer";

const About = () => {
  return (
    <MyContainer className="py-12">
      <h1 className="text-3xl font-bold mb-4">About PawMart</h1>
      <p className="text-lg text-muted mb-6">
        PawMart connects compassionate families with pets in need. Founded by
        animal lovers, our mission is to make adoption easy, transparent, and
        safe. We partner with shelters and rescue organizations to list pets
        ready for forever homes and provide resources for responsible ownership.
      </p>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-sm text-muted">
            Enable more successful adoptions by providing a trusted platform for
            listings, clear contact channels, and verified shelter partners.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-sm text-muted">
            Transparency, animal welfare, community support, and long-term
            success for every adoption.
          </p>
        </div>
      </section>
    </MyContainer>
  );
};

export default About;
