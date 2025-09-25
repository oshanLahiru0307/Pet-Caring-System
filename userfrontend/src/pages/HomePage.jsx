import React from 'react'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Availability from '../components/Availability';
import Stats from '../components/Stats';
import Footer from '../components/Footer';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import FloatingChatButton from '../components/FloatingChatButton';
const HomePage = () => {
  return (
    <div>
            <Navbar />
              <Hero />
              <About />
              <Services />
              <Availability />
              <Stats />
              <FAQ />
              <Contact />
              <Footer />
              
              {/* Floating Chat Button for Users */}
              <FloatingChatButton />
      
    </div>
  )
}

export default HomePage
