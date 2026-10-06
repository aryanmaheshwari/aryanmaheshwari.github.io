import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Current from './sections/Current';
import Playground from './sections/Playground';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import About from './sections/About';
import Contact, { Footer } from './sections/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-4 sm:px-6">
        <Hero />
        <Current />
        <Playground />
        <Work />
        <Experience />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
