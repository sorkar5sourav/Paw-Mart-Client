import { useLoaderData } from "react-router";
import MyContainer from "../components/MyContainer";
import Banner from "../components/Homepage/Banner";
import CategoryCard from "../components/Homepage/CategoryCard";
import RecentListings from "../components/Homepage/RecentListings";
import WhyAdopt from "../components/Homepage/WhyAdopt";
import PetHeroes from "../components/Homepage/PetHeroes";

const Homepage = () => {
  const listings = useLoaderData() || [];
  return (
    <MyContainer className="flex min-h-screen flex-1 flex-col gap-12 py-10">
      <Banner />
      <CategoryCard />
      <RecentListings listings={listings} />
      <WhyAdopt />
      <PetHeroes />
    </MyContainer>
  );
};

export default Homepage;
