import { HomePageHeader } from './HomePageHeader';
import { MissionSection } from '../../components/sections/MissionSection';
import { FeaturesSection } from '../../components/sections/FeaturesSection';
import { ContactSection } from '../../components/sections/ContactSection';
import './HomePage.css';
import { Footer } from '../../components/Footer';

export function HomePage() {

  return (
    <>
      <HomePageHeader />
      <MissionSection />
      <FeaturesSection />
      <ContactSection />
      <Footer />
    </>
  );
}