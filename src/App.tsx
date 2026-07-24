import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SpaceProvider } from "@/lib/space/SpaceContext";
import { SpaceShell } from "@/components/space/SpaceShell";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Approach } from "@/pages/Approach";
import { FAQ } from "@/pages/FAQ";
import { Contact } from "@/pages/Contact";
import { Privacy } from "@/pages/Privacy";
import { NotFound } from "@/pages/NotFound";
import { SpaceHome } from "@/pages/space/SpaceHome";
import { Triage } from "@/pages/space/Triage";
import { Breathing } from "@/pages/space/Breathing";
import { Grounding } from "@/pages/space/Grounding";
import { ScreenerList, ScreenerRunner } from "@/pages/space/Screeners";
import { Journal } from "@/pages/space/Journal";
import { SessionPrep } from "@/pages/space/SessionPrep";
import { SpaceSettings } from "@/pages/space/Settings";

export function App() {
  return (
    <HashRouter>
      <SpaceProvider>
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/confidentialitate" element={<Privacy />} />
              <Route path="/spatiul-tau" element={<SpaceShell />}>
                <Route index element={<SpaceHome />} />
                <Route path="verifica" element={<Triage />} />
                <Route path="respiratie" element={<Breathing />} />
                <Route path="ancorare" element={<Grounding />} />
                <Route path="chestionare" element={<ScreenerList />} />
                <Route path="chestionare/:id" element={<ScreenerRunner />} />
                <Route path="jurnal" element={<Journal />} />
                <Route path="pregatire" element={<SessionPrep />} />
                <Route path="setari" element={<SpaceSettings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SpaceProvider>
    </HashRouter>
  );
}
