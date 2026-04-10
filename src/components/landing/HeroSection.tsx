import Icon from "@/components/ui/icon";
import { PHONE, PHONE_HREF, WA_HREF, HERO_IMG } from "./constants";

export default function HeroSection() {
  return (
    <section style={{ position: "relative", background: "var(--navy)", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,28,63,0.95) 40%, rgba(15,28,63,0.7) 100%)" }} />

      <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "120px 20px 80px", width: "100%" }}>

        <div className="anim-init anim d1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,43,0.15)", border: "1px solid rgba(255,107,43,0.35)", borderRadius: 999, padding: "0.4rem 1rem", marginBottom: 28 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 0 3px rgba(74,222,128,0.3)" }} />
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.82rem", fontWeight: 600 }}>Красноярск • Выезд сегодня</span>
        </div>

        <h1 className="anim-init anim d2" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, marginBottom: 20, maxWidth: 720, letterSpacing: "-0.03em" }}>
          Ремонт духовых шкафов<br />
          <span style={{ color: "var(--brand)" }}>и варочных панелей</span>
        </h1>

        <p className="anim-init anim d3" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 40, maxWidth: 540 }}>
          Профессиональный ремонт на дому в Красноярске.<br />
          Диагностика <strong style={{ color: "#fff" }}>бесплатно</strong>. Гарантия до <strong style={{ color: "#fff" }}>2 лет</strong>.
        </p>

        <div className="anim-init anim d4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
          <a href={PHONE_HREF} className="btn-cta" style={{ fontSize: "1.05rem", padding: "1.1rem 2.2rem" }}>
            <Icon name="Phone" size={19} /> Вызвать мастера
          </a>
          <a href={WA_HREF} className="btn-white" target="_blank" rel="noreferrer">
            <Icon name="MessageCircle" size={18} /> WhatsApp
          </a>
        </div>

        <div className="anim-init anim d5" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { icon: "Clock", text: "Выезд в день звонка" },
            { icon: "ShieldCheck", text: "Гарантия до 2 лет" },
            { icon: "Banknote", text: "Диагностика 0 ₽" },
            { icon: "Star", text: "8 лет на рынке" },
          ].map(p => (
            <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "9px 16px" }}>
              <Icon name={p.icon} size={15} style={{ color: "var(--brand)" }} />
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", fontWeight: 500 }}>{p.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#fff" />
        </svg>
      </div>
    </section>
  );
}
