import { SmoothScrollProvider } from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Packages } from "./components/Packages";
import { TrainingPrograms } from "./components/TrainingPrograms";
import { Locations } from "./components/Locations";
import { Testimonials } from "./components/Testimonials";
import { BMISection } from "./components/BMISection";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <WhyChooseUs />
          <Packages />
          <TrainingPrograms />
          <Locations />
          <Testimonials />
          <BMISection />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
