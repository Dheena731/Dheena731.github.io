import { useTheme } from './hooks/useTheme';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Packages from './components/Packages';
import SkillsBoard from './components/SkillsBoard';
import Terminal from './components/Terminal';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const TICKER_A = [
  'LANGGRAPH AGENTS',
  'RAG PIPELINES',
  'EVIDENCE AUTOMATION',
  'RISK SCORING',
  'NIST + ISO MAPPING',
  'VECTOR SEARCH',
  'FASTAPI',
  'TRUST CENTER AI',
];

const TICKER_B = [
  'OPEN TO OPPORTUNITIES',
  'AI / ML ENGINEER',
  'CHENNAI, INDIA',
  'B.TECH AI & DS',
  "LET'S BUILD SOMETHING",
];

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <div className="scanlines" aria-hidden />
      <Cursor />

      <Nav theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <Ticker items={TICKER_A} />
        <Timeline />
        <Projects />
        <Packages />
        <SkillsBoard />
        <Ticker items={TICKER_B} background="var(--orange)" color="#fff" reverse />
        <Terminal />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
