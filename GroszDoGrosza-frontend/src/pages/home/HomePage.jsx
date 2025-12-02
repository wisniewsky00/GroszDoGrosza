import { Header } from '../../components/Header';
import { MissionSection } from '../../components/sections/MissionSection';
import { FeaturesSection } from '../../components/sections/FeaturesSection';
import { ContactSection } from '../../components/sections/ContactSection';
import './HomePage.css';
import { Footer } from '../../components/Footer';

export function HomePage() {

  return (
    <>
      <Header />
      <MissionSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </>
  );
}