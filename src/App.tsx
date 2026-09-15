import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Academics from '@/components/Academics';
import Faculty from '@/components/Faculty';
import Admissions from '@/components/Admissions';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Academics />
        <Faculty />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
