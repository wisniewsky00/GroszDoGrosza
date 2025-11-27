import { Header } from '../../components/Header';
import { MissionSection } from '../../components/sections/MissionSection';
import { FeaturesSection } from '../../components/sections/FeaturesSection';
import { ContactSection } from '../../components/sections/ContactSection';
import './HomePage.css';

export function HomePage() {

  return (
    <>
      <Header />
      <MissionSection />
      <FeaturesSection />
      <ContactSection />
    </>
  );
}