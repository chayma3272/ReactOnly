import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import Courses from '../components/Courses';
import Certificates from '../components/Certificates';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Courses />
      <Certificates />
      <Footer />
    </div>
  );
};

export default LandingPage;