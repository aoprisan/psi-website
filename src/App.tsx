import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Approach } from "@/pages/Approach";
import { FAQ } from "@/pages/FAQ";
import { Contact } from "@/pages/Contact";
import { Privacy } from "@/pages/Privacy";
import { NotFound } from "@/pages/NotFound";
import { ResourcesHub } from "@/pages/resources/ResourcesHub";
import { Screeners } from "@/pages/resources/Screeners";
import { Breathing } from "@/pages/resources/Breathing";
import { Grounding } from "@/pages/resources/Grounding";
import { Journal } from "@/pages/resources/Journal";

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <a href="#main" className="skip-link">Sari la conținut</a>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/despre" element={<About />} />
            <Route path="/servicii" element={<Services />} />
            <Route path="/cum-lucrez" element={<Approach />} />
            <Route path="/intrebari-frecvente" element={<FAQ />} />
            <Route path="/resurse" element={<ResourcesHub />} />
            <Route path="/resurse/chestionare" element={<Screeners />} />
            <Route path="/resurse/chestionare/:slug" element={<Screeners />} />
            <Route path="/resurse/respiratie" element={<Breathing />} />
            <Route path="/resurse/ancorare" element={<Grounding />} />
            <Route path="/resurse/jurnal" element={<Journal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/confidentialitate" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
