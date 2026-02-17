import Hero from "../../components/home/Hero";
import WhoIsThisFor from "../../components/home/WhoIsThisFor";
import Features from "../../components/home/Features";
import DashboardPreview from "../../components/home/DashboardPreview";
import HowItWorks from "../../components/home/HowItWorks";
import CommunityRules from "../../components/home/CommunityRules";
import CTA from "../../components/home/CTA";
import FAQ from "../../components/home/FAQ";

interface HomeProps {
  onJoinClick: () => void;
}

const Home = ({ onJoinClick }: HomeProps) => {
  return (
    <div className="bg-daisy-white min-h-screen pt-[150px]">
      <Hero onJoinClick={onJoinClick} />
      <WhoIsThisFor />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <CommunityRules />
      <CTA onJoinClick={onJoinClick} />
      <FAQ />
    </div>
  );
};

export default Home;
