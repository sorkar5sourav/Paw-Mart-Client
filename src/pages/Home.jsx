import MyContainer from "../components/MyContainer";
import CategoryCard from "../components/Homepage/CategoryCard";
import RecentListings from "../components/Homepage/RecentListings";

const Homepage = () => {
  return (
    <MyContainer className="flex min-h-screen flex-1 flex-col gap-12 py-10">
      <CategoryCard />
      <RecentListings />
    </MyContainer>
  );
};

export default Homepage;
