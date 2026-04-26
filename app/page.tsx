import Navigation from "../components/Navigation";
import HeroSection from "../components/sections/HeroSection";
import DatasetSection from "../components/sections/DatasetSection";
import RegressionSection from "../components/sections/RegressionSection";
import LogisticSection from "../components/sections/LogisticSection";
import ModelSelectionSection from "../components/sections/ModelSelectionSection";
import TimeSeriesSection from "../components/sections/TimeSeriesSection";
import InsightsSection from "../components/sections/InsightsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <DatasetSection />
      <RegressionSection />
      <LogisticSection />
      <ModelSelectionSection />
      <TimeSeriesSection />
      <InsightsSection />
      <Footer />
    </main>
  );
}
