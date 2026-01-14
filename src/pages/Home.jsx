import { useLoaderData } from "react-router";
import MyContainer from "../components/MyContainer";
import Banner from "../components/Homepage/Banner";
import CategoryCard from "../components/Homepage/CategoryCard";
import RecentListings from "../components/Homepage/RecentListings";
import PetHeroes from "../components/Homepage/PetHeroes";
import Stats from "../components/Homepage/Stats";
import Testimonials from "../components/Homepage/Testimonials";
import BlogPreview from "../components/Homepage/BlogPreview";
import Newsletter from "../components/Homepage/Newsletter";
import FAQ from "../components/Homepage/FAQ";
import CTASection from "../components/Homepage/CTASection";
import FeaturesServices from "../components/Homepage/FeaturesServices";

const Homepage = () => {
  const listings = useLoaderData() || [];
  return (
    <MyContainer className="flex min-h-screen flex-1 flex-col py-10">
      <div className="mx-4 md:mx-0 flex flex-col gap-12">
        <Banner />
        <CategoryCard />
        <FeaturesServices />
        <RecentListings listings={listings} />
        <Stats />
        <BlogPreview />
        <Newsletter />
        <FAQ />
        <PetHeroes />
        <CTASection />
      </div>
    </MyContainer>
  );
};

export default Homepage;
