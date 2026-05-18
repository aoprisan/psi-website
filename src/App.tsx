import { HashRouter, Route, Routes } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Approach } from "@/pages/Approach";
import { FAQ } from "@/pages/FAQ";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
