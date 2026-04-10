import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MainSections from "@/components/landing/MainSections";

export default function Index() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "var(--text-dark)" }}>
      <Navbar />
      <HeroSection />
      <MainSections />
    </div>
  );
}
