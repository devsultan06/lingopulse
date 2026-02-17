import Hero from "../../components/home/Hero";
import WhoIsThisFor from "../../components/home/WhoIsThisFor";
import Features from "../../components/home/Features";
import DashboardPreview from "../../components/home/DashboardPreview";
import HowItWorks from "../../components/home/HowItWorks";
import CommunityRules from "../../components/home/CommunityRules";
import CTA from "../../components/home/CTA";
import FAQ from "../../components/home/FAQ";

const Home = () => {
  return (
    <div className="bg-daisy-white min-h-screen pt-[150px]">
      <Hero />
      <WhoIsThisFor />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <CommunityRules />
      <CTA />
      <FAQ />
    </div>
  );
};

export default Home;
