import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Navbar from "@/components/layout/Navbar";
import Features from "@/components/sections/Features";
import Story from "@/components/sections/Story";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Page() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
