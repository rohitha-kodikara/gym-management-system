import { SmoothScrollProvider } from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/hero/Hero";
import { About } from "./components/about/About";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Packages } from "./components/packages/Packages";
import { TrainingPrograms } from "./components/TrainingPrograms";
import { Locations } from "./components/locations/Locations";
import { Testimonials } from "./components/Testimonials";
import { BMISection } from "./components/bmi/BMISection";
import { FinalCTA } from "./components/finalcta/FinalCTA";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
        <Navbar />
        <main>
          <Hero />
                  <BMISection />
          <About />
          <WhyChooseUs />
          <Packages />
          <TrainingPrograms />
          <Locations />
          <Testimonials />
  
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
