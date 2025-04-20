import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import GameJourneySection from './components/GameJourneySection';
import CharacterCreationSection from './components/CharacterCreationSection';
import MinigamesSection from './components/MinigamesSection';
import ARExperienceSection from './components/ARExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <GameJourneySection />
        <CharacterCreationSection />
        <MinigamesSection />
        <ARExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;