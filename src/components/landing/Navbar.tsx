import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { PHONE, PHONE_HREF, NAV_LINKS } from "./constants";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,28,63,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.3s ease",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontWeight: 800, fontSize: "1.15rem", color: "#fff", textDecoration: "none", letterSpacing: "-0.02em" }}>
          ТЕХ<span style={{ color: "var(--brand)" }}>НАДЕЖНО</span>
        </a>

        <nav className="hide-mob" style={{ display: "flex", gap: 28 }}>
          {NAV_LINKS.map(([l, h]) => (
            <a key={h} href={h} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            >{l}</a>
          ))}
        </nav>

        <a href={PHONE_HREF} className="btn-cta hide-mob" style={{ padding: "0.6rem 1.4rem", fontSize: "0.88rem" }}>
          <Icon name="Phone" size={15} /> {PHONE}
        </a>

        <button onClick={() => setMenu(!menu)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
          className="md:hidden">
          <Icon name={menu ? "X" : "Menu"} size={26} style={{ color: "#fff" }} />
        </button>
      </div>

      {menu && (
        <div style={{ background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 20px 24px" }}>
          {NAV_LINKS.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setMenu(false)}
              style={{ display: "block", padding: "13px 0", color: "rgba(255,255,255,0.8)", fontSize: "1rem", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >{l}</a>
          ))}
          <a href={PHONE_HREF} className="btn-cta" style={{ width: "100%", marginTop: 18, fontSize: "1rem" }}>
            <Icon name="Phone" size={17} /> {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}
