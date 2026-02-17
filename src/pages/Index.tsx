import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import AboutSection from "@/components/AboutSection";
import AppPromoSection from "@/components/AppPromoSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AppPromoSection />
      <WorksSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
