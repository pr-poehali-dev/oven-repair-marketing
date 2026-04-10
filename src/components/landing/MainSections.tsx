import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import {
  PHONE, PHONE_HREF, WA_HREF, TECH_IMG,
  services, whyItems, steps, reviews, guarantees,
} from "./constants";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
    </div>
  );
}

function SectionTag({ text }: { text: string }) {
  return <div className="badge-o" style={{ marginBottom: 16 }}>{text}</div>;
}

export default function MainSections() {
  const whyRef = useInView();
  const srvRef = useInView();
  const stepsRef = useInView();
  const guarRef = useInView();
  const revRef = useInView();
  const ctaRef = useInView();

  return (
    <>
      {/* ======= ПОЧЕМУ МЫ ======= */}
      <section id="why" style={{ padding: "90px 20px", background: "#fff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={whyRef.ref} style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionTag text="Почему выбирают нас" />
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
              6 причин доверить нам ремонт
            </h2>
            <p style={{ color: "var(--text-mid)", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto" }}>
              Мы специализируемся только на кухонной технике — и делаем это лучше всех
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {whyItems.map((w, i) => (
              <div key={w.title} className="feat-card" style={{
                opacity: whyRef.vis ? 1 : 0,
                transform: whyRef.vis ? "none" : "translateY(20px)",
                transition: `all 0.55s ease ${i * 0.08}s`,
              }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon name={w.icon} size={22} style={{ color: "var(--brand)" }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>{w.title}</h3>
                <p style={{ color: "var(--text-mid)", fontSize: "0.9rem", lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= УСЛУГИ ======= */}
      <section id="services" style={{ padding: "90px 20px", background: "var(--gray-bg)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={srvRef.ref} style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionTag text="Что ремонтируем" />
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Наши услуги
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {services.map((s, i) => (
              <div key={s.title} className="feat-card" style={{
                opacity: srvRef.vis ? 1 : 0,
                transform: srvRef.vis ? "none" : "translateY(24px)",
                transition: `all 0.55s ease ${i * 0.12}s`,
                display: "flex", flexDirection: "column",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={s.icon} size={24} style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: "1.15rem", marginBottom: 3 }}>{s.title}</h3>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-light)", fontWeight: 500 }}>{s.brands}</p>
                  </div>
                </div>
                <div style={{ height: 1, background: "var(--border-c)", marginBottom: 18 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {s.list.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.9rem", color: "var(--text-mid)" }}>
                      <Icon name="Check" size={16} style={{ color: s.color, marginTop: 2, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={PHONE_HREF} className="btn-cta" style={{ marginTop: 24, width: "100%" }}>
                  <Icon name="Phone" size={16} /> Вызвать мастера
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= КАК РАБОТАЕМ ======= */}
      <section id="steps" style={{ padding: "90px 20px", background: "#fff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={stepsRef.ref} style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionTag text="Простой процесс" />
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Как мы работаем
            </h2>
            <p style={{ color: "var(--text-mid)", fontSize: "1.05rem", maxWidth: 440, margin: "0 auto" }}>
              От звонка до готового ремонта — всё прозрачно
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{
                background: "var(--gray-bg)", borderRadius: 20, padding: "28px 22px",
                opacity: stepsRef.vis ? 1 : 0,
                transform: stepsRef.vis ? "none" : "translateY(20px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 12, right: 16, fontSize: "3.5rem", fontWeight: 900, color: "rgba(255,107,43,0.07)", lineHeight: 1 }}>{s.n}</div>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "#fff", border: "1px solid var(--border-c)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <Icon name={s.icon} size={20} style={{ color: "var(--brand)" }} />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-mid)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= О НАС + ФОТО ======= */}
      <section style={{ padding: "90px 20px", background: "var(--gray-bg)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
          <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,0.12)" }}>
            <img src={TECH_IMG} alt="Мастер за работой" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, display: "flex", gap: 12 }}>
              {[{ n: "4000+", l: "ремонтов" }, { n: "97%", l: "с 1 визита" }, { n: "8 лет", l: "опыта" }].map(s => (
                <div key={s.n} style={{ flex: 1, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.25rem", color: "var(--brand)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-mid)", fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTag text="О компании" />
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.2 }}>
              ТехНадежно — ремонт, которому доверяют
            </h2>
            <p style={{ color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 12 }}>
              С 2016 года специализируемся исключительно на ремонте встроенных духовых шкафов и варочных панелей. Никакой «всё подряд» — только то, что умеем лучше всех.
            </p>
            <p style={{ color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.75, marginBottom: 32 }}>
              Мастера с опытом от 5 лет. Запчасти всегда в наличии — большинство поломок устраняем прямо на месте за один визит.
            </p>
            <a href={PHONE_HREF} className="btn-cta">
              <Icon name="Phone" size={18} /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ======= ГАРАНТИЯ ======= */}
      <section id="guarantee" style={{ padding: "90px 20px", background: "var(--navy)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={guarRef.ref} style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="badge-o" style={{ marginBottom: 16, background: "rgba(255,107,43,0.15)", border: "1px solid rgba(255,107,43,0.3)" }}>Наши обязательства</div>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", marginBottom: 12 }}>
              Гарантия на каждый ремонт
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", maxWidth: 440, margin: "0 auto" }}>
              Даём письменный гарантийный талон — без мелкого шрифта
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 32 }}>
            {guarantees.map((g, i) => (
              <div key={g.title} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20, padding: "28px 24px",
                opacity: guarRef.vis ? 1 : 0,
                transform: guarRef.vis ? "none" : "translateY(20px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,107,43,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon name={g.icon} size={22} style={{ color: "var(--brand)" }} />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: 8 }}>{g.title}</h4>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{g.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {[
              { t: "2 года", w: "Нагревательные элементы" },
              { t: "1 год", w: "Замена тэна / термостата" },
              { t: "6 мес.", w: "Ремонт платы / сенсора" },
              { t: "6 мес.", w: "Работа мастера" },
            ].map(item => (
              <div key={item.w} style={{ borderLeft: "3px solid var(--brand)", paddingLeft: 16 }}>
                <div style={{ fontWeight: 800, fontSize: "1.4rem", color: "var(--brand)" }}>{item.t}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{item.w}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= ОТЗЫВЫ ======= */}
      <section id="reviews" style={{ padding: "90px 20px", background: "#fff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={revRef.ref} style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionTag text="Отзывы клиентов" />
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Нам доверяют в Красноярске
            </h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Stars />
              <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-mid)" }}>5.0 · более 200 отзывов</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {reviews.map((r, i) => (
              <div key={r.name} className="feat-card" style={{
                opacity: revRef.vis ? 1 : 0,
                transform: revRef.vis ? "none" : "translateY(20px)",
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}>
                <Stars n={r.stars} />
                <p style={{ fontSize: "0.97rem", color: "var(--text-mid)", lineHeight: 1.75, margin: "16px 0 20px" }}>
                  «{r.text}»
                </p>
                <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-c)", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "var(--brand)", fontSize: "0.95rem", flexShrink: 0 }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{r.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA-БАННЕР ======= */}
      <section style={{ padding: "0 20px 90px", background: "#fff" }}>
        <div ref={ctaRef.ref} style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, var(--navy) 0%, #1a2d5a 100%)",
            borderRadius: 28, padding: "clamp(32px,5vw,60px) clamp(24px,5vw,64px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 32, flexWrap: "wrap",
            opacity: ctaRef.vis ? 1 : 0,
            transform: ctaRef.vis ? "none" : "translateY(20px)",
            transition: "all 0.7s ease",
          }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 10 }}>
                Техника сломалась? <span style={{ color: "var(--brand)" }}>Звоните сейчас!</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", maxWidth: 420 }}>
                Мастер приедет в день обращения. Диагностика бесплатно.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={PHONE_HREF} className="btn-cta" style={{ fontSize: "1.05rem", padding: "1.1rem 2rem" }}>
                <Icon name="Phone" size={18} /> {PHONE}
              </a>
              <a href={WA_HREF} className="btn-white" target="_blank" rel="noreferrer">
                <Icon name="MessageCircle" size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======= КОНТАКТЫ ======= */}
      <section id="contacts" style={{ padding: "90px 20px", background: "var(--gray-bg)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionTag text="Контакты" />
            <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Как с нами связаться
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { icon: "Phone", label: "Телефон", val: PHONE, href: PHONE_HREF },
              { icon: "MessageCircle", label: "WhatsApp", val: PHONE, href: WA_HREF },
              { icon: "MapPin", label: "Район работы", val: "Весь Красноярск", href: undefined },
              { icon: "Clock", label: "Режим работы", val: "Ежедневно 8:00 – 22:00", href: undefined },
            ].map(c => (
              <div key={c.label} className="feat-card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={c.icon} size={22} style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} style={{ fontWeight: 700, fontSize: "1rem", color: "var(--brand)", textDecoration: "none" }} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{c.val}</a>
                    : <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{c.val}</div>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer style={{ background: "var(--navy)", padding: "32px 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff", letterSpacing: "-0.02em" }}>
            ТЕХ<span style={{ color: "var(--brand)" }}>НАДЕЖНО</span>
          </span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem" }}>© 2025 ТехНадежно · Красноярск</span>
          <a href={PHONE_HREF} style={{ color: "var(--brand)", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>{PHONE}</a>
        </div>
      </footer>

      {/* ======= ПЛАВАЮЩАЯ КНОПКА ======= */}
      <a href={PHONE_HREF} style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 200,
        width: 58, height: 58, borderRadius: "50%",
        background: "var(--brand)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 28px rgba(255,107,43,0.5)",
        transition: "transform 0.2s",
        textDecoration: "none",
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Icon name="Phone" size={24} />
      </a>
    </>
  );
}
