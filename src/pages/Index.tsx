import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "+7 (913) 191-68-28";
const PHONE_HREF = "tel:+79131916828";
const WA_HREF = "https://wa.me/79131916828";
const HERO_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e8fed08c-77bf-4e2d-b03c-5f0281e4eca8.jpg";
const TECH_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e9bf28a1-6ae7-4674-a71d-c41ad73bce37.jpg";

/* ---- данные ---- */
const services = [
  { icon: "Flame", color: "#EF4444", bg: "#FEF2F2", title: "Духовые шкафы", brands: "Bosch, Siemens, Miele, Electrolux, Gorenje, Samsung", list: ["Не нагревается или перегревается", "Не работает гриль / конвекция", "Сломан тэн или термостат", "Не закрывается дверца", "Ошибки на дисплее"] },
  { icon: "Zap", color: "#2563EB", bg: "#EFF6FF", title: "Варочные панели", brands: "AEG, Hansa, Zanussi, Candy, Indesit, Hotpoint", list: ["Не включается конфорка", "Трещина на стеклокерамике", "Не реагирует сенсор", "Искрит или щёлкает", "Не держит мощность"] },
  { icon: "Settings", color: "#7C3AED", bg: "#F5F3FF", title: "Встроенная техника", brands: "Neff, Gaggenau, Franke, Kuppersberg, Krona", list: ["Встроенные духовки в гарнитуре", "Индукционные панели", "Пароварки и комби-печи", "Встроенные кофемашины", "Микроволновые печи"] },
];

const whyItems = [
  { icon: "Timer", title: "Выезд в день обращения", desc: "Работаем ежедневно с 8:00 до 22:00. Звоните — приедем сегодня." },
  { icon: "Banknote", title: "Диагностика бесплатно", desc: "Определяем причину поломки без скрытых платежей." },
  { icon: "ShieldCheck", title: "Гарантия до 2 лет", desc: "Письменная гарантия на работы и запчасти." },
  { icon: "Package", title: "Запчасти в наличии", desc: "97% ремонтов закрываем за один визит." },
  { icon: "BadgeCheck", title: "Опыт 8 лет", desc: "Специализируемся только на духовых шкафах и варочных панелях." },
  { icon: "Wallet", title: "Цена — после диагностики", desc: "Называем точную цену до начала работ. Без доплат." },
];

const steps = [
  { n: "1", icon: "PhoneCall", title: "Звоните", desc: "Расскажите о поломке — дадим предварительную оценку" },
  { n: "2", icon: "CalendarCheck", title: "Согласуем время", desc: "Выбираем удобный час, мастер приедет вовремя" },
  { n: "3", icon: "ScanSearch", title: "Диагностика", desc: "Бесплатно выявляем причину и называем точную цену" },
  { n: "4", icon: "Wrench", title: "Ремонт", desc: "Чиним при вас, используя только новые запчасти" },
  { n: "5", icon: "FileCheck", title: "Гарантия", desc: "Выдаём гарантийный талон с датой и печатью" },
];

const reviews = [
  { name: "Елена М.", date: "март 2025", stars: 5, text: "Духовка Bosch не грела уже неделю. Мастер приехал через 2 часа, нашёл сгоревший тэн, заменил прямо на месте. Работает как новая!" },
  { name: "Игорь С.", date: "февраль 2025", stars: 5, text: "Варочная панель Siemens не реагировала на сенсор. Приехали на следующий день, починили за час. Дали гарантию год — всё отлично." },
  { name: "Наталья В.", date: "январь 2025", stars: 5, text: "Очень довольна! Звонила вечером, договорились на утро. Мастер пунктуальный, всё объяснил, цена не изменилась. Рекомендую!" },
];

const guarantees = [
  { icon: "ShieldCheck", title: "2 года на запчасти", desc: "Оригинальные детали с документами от поставщика" },
  { icon: "Clock", title: "1 год на работу", desc: "Гарантийный срок на все выполненные работы" },
  { icon: "RefreshCw", title: "Бесплатный повтор", desc: "Та же поломка в гарантийный период — приедем бесплатно" },
  { icon: "FileText", title: "Письменный договор", desc: "Фиксируем всё: цену, работы, сроки и гарантию" },
];

/* ---- хук ---- */
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

/* ---- компоненты ---- */
function Stars({ n = 5 }) {
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

/* ---- главный компонент ---- */
export default function Index() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const whyRef = useInView();
  const srvRef = useInView();
  const stepsRef = useInView();
  const guarRef = useInView();
  const revRef = useInView();
  const ctaRef = useInView();

  const S: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

  return (
    <div style={{ ...S, background: "#fff", color: "var(--text-dark)" }}>

      {/* ======= NAVBAR ======= */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(15,28,63,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* лого */}
          <a href="#" style={{ fontWeight: 800, fontSize: "1.15rem", color: "#fff", textDecoration: "none", letterSpacing: "-0.02em" }}>
            ТЕХ<span style={{ color: "var(--brand)" }}>НАДЕЖНО</span>
          </a>

          {/* десктоп навигация */}
          <nav className="hide-mob" style={{ display: "flex", gap: 28 }}>
            {[["Услуги","#services"],["Почему мы","#why"],["Как работаем","#steps"],["Отзывы","#reviews"],["Контакты","#contacts"]].map(([l,h]) => (
              <a key={h} href={h} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color="#fff")}
                onMouseLeave={e => (e.currentTarget.style.color="rgba(255,255,255,0.75)")}
              >{l}</a>
            ))}
          </nav>

          {/* кнопка звонка */}
          <a href={PHONE_HREF} className="btn-cta hide-mob" style={{ padding: "0.6rem 1.4rem", fontSize: "0.88rem" }}>
            <Icon name="Phone" size={15} /> {PHONE}
          </a>

          {/* бургер */}
          <button onClick={() => setMenu(!menu)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
            className="md:hidden">
            <Icon name={menu ? "X" : "Menu"} size={26} style={{ color: "#fff" }} />
          </button>
        </div>

        {/* мобильное меню */}
        {menu && (
          <div style={{ background: "var(--navy)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 20px 24px" }}>
            {[["Услуги","#services"],["Почему мы","#why"],["Как работаем","#steps"],["Отзывы","#reviews"],["Контакты","#contacts"]].map(([l,h]) => (
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

      {/* ======= HERO ======= */}
      <section style={{ position: "relative", background: "var(--navy)", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* фоновое фото */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
        {/* градиент */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,28,63,0.95) 40%, rgba(15,28,63,0.7) 100%)" }} />

        <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "120px 20px 80px", width: "100%" }}>

          {/* лейбл */}
          <div className="anim-init anim d1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,43,0.15)", border: "1px solid rgba(255,107,43,0.35)", borderRadius: 999, padding: "0.4rem 1rem", marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 0 3px rgba(74,222,128,0.3)" }} />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.82rem", fontWeight: 600 }}>Красноярск • Выезд сегодня</span>
          </div>

          {/* заголовок */}
          <h1 className="anim-init anim d2" style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", fontWeight: 900, color: "#fff", lineHeight: 1.08, marginBottom: 20, maxWidth: 720, letterSpacing: "-0.03em" }}>
            Ремонт духовых шкафов<br />
            <span style={{ color: "var(--brand)" }}>и варочных панелей</span>
          </h1>

          {/* подзаголовок */}
          <p className="anim-init anim d3" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 40, maxWidth: 540 }}>
            Профессиональный ремонт на дому в Красноярске.<br />
            Диагностика <strong style={{ color: "#fff" }}>бесплатно</strong>. Гарантия до <strong style={{ color: "#fff" }}>2 лет</strong>.
          </p>

          {/* кнопки */}
          <div className="anim-init anim d4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
            <a href={PHONE_HREF} className="btn-cta" style={{ fontSize: "1.05rem", padding: "1.1rem 2.2rem" }}>
              <Icon name="Phone" size={19} /> Вызвать мастера
            </a>
            <a href={WA_HREF} className="btn-white" target="_blank" rel="noreferrer">
              <Icon name="MessageCircle" size={18} /> WhatsApp
            </a>
          </div>

          {/* плашки доверия */}
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

        {/* волна-переход */}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#fff" />
          </svg>
        </div>
      </section>

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

          {/* сроки */}
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
    </div>
  );
}
