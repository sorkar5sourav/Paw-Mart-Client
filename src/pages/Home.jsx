import { useLoaderData } from "react-router";
import MyContainer from "../components/MyContainer";
import Banner from "../components/Homepage/Banner";
import CategoryCard from "../components/Homepage/CategoryCard";
import RecentListings from "../components/Homepage/RecentListings";
import WhyAdopt from "../components/Homepage/WhyAdopt";
import PetHeroes from "../components/Homepage/PetHeroes";
import Features from "../components/Homepage/Features";
import Services from "../components/Homepage/Services";
import Highlights from "../components/Homepage/Highlights";
import Stats from "../components/Homepage/Stats";
import Testimonials from "../components/Homepage/Testimonials";
import BlogPreview from "../components/Homepage/BlogPreview";
import Newsletter from "../components/Homepage/Newsletter";
import FAQ from "../components/Homepage/FAQ";
import CTASection from "../components/Homepage/CTASection";

const Homepage = () => {
  const listings = useLoaderData() || [];
  return (
    <MyContainer className="flex min-h-screen flex-1 flex-col py-10">
      <div className="mx-4 flex flex-col gap-12">
        <Banner />
        <div id="homepage-sections" className="flex flex-col gap-12">
          <CategoryCard />
          <Features />
          <Services />
          <RecentListings listings={listings} />
          <Highlights />
          <Stats />
          <Testimonials />
          <BlogPreview />
          <Newsletter />
          <FAQ />
          <PetHeroes />
          <CTASection />
        </div>
      </div>
    </MyContainer>
  );
};

export default Homepage;
