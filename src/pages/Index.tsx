import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e8fed08c-77bf-4e2d-b03c-5f0281e4eca8.jpg";
const TECH_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e9bf28a1-6ae7-4674-a71d-c41ad73bce37.jpg";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Как работаем", href: "#process" },
  { label: "О нас", href: "#about" },
  { label: "Гарантия", href: "#guarantee" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  {
    icon: "Flame",
    title: "Духовые шкафы",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    brands: "Bosch · Siemens · Miele · Electrolux · Gorenje · Samsung",
    issues: [
      "Не нагревается / перегревается",
      "Не работает гриль или конвекция",
      "Сломан тэн или термостат",
      "Не закрывается дверца",
      "Ошибки на дисплее",
    ],
  },
  {
    icon: "Zap",
    title: "Варочные панели",
    color: "#2563EB",
    bg: "rgba(37,99,235,0.08)",
    brands: "AEG · Hansa · Zanussi · Candy · Indesit · Hotpoint",
    issues: [
      "Не включается конфорка",
      "Трещина на стеклокерамике",
      "Не реагирует сенсор",
      "Искрит или щёлкает",
      "Не держит мощность",
    ],
  },
  {
    icon: "Settings",
    title: "Встроенная техника",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    brands: "Neff · Gaggenau · Franke · Kuppersberg · Krona",
    issues: [
      "Встроенные духовки в гарнитуре",
      "Индукционные панели",
      "Пароварки и комби-печи",
      "Встроенные кофемашины",
      "Микроволновые печи",
    ],
  },
];

const process = [
  { num: "01", icon: "PhoneCall", title: "Звонок", desc: "Опишите поломку — дадим предварительную цену прямо по телефону." },
  { num: "02", icon: "CalendarCheck", title: "Запись", desc: "Согласуем удобное время. Выезд в день обращения." },
  { num: "03", icon: "ScanSearch", title: "Диагностика", desc: "Мастер приедет и бесплатно определит причину неисправности." },
  { num: "04", icon: "Wrench", title: "Ремонт", desc: "Называем точную цену — и только с вашего согласия начинаем работу." },
  { num: "05", icon: "BadgeCheck", title: "Гарантия", desc: "Выдаём гарантийный талон. От 6 месяцев до 2 лет." },
];

const guaranteeItems = [
  { icon: "ShieldCheck", title: "До 2 лет на запчасти", desc: "Оригинальные комплектующие и сертифицированные аналоги. Гарантия на деталь — до 24 месяцев." },
  { icon: "Clock", title: "До 1 года на работу", desc: "Гарантийный срок на выполненные работы — от 6 до 12 месяцев в зависимости от сложности." },
  { icon: "FileCheck", title: "Письменный документ", desc: "По окончании ремонта выдаём гарантийный талон с печатью, датой и перечнем работ." },
  { icon: "RefreshCw", title: "Бесплатный повторный выезд", desc: "Если в гарантийный период та же поломка — приедем и устраним бесплатно." },
  { icon: "Package", title: "Только новые запчасти", desc: "Не используем б/у детали. Только новые, с документами от поставщика." },
  { icon: "Tag", title: "Фиксированная цена", desc: "Цена озвучивается до ремонта и не меняется в процессе. Никаких доплат." },
];

const reviews = [
  { name: "Елена М.", text: "Духовка Bosch перестала греть. Мастер приехал через 3 часа, нашёл сгоревший тэн, заменил за один визит. Всё чётко!", rating: 5 },
  { name: "Игорь С.", text: "Варочная панель Siemens вышла из строя — сенсор не реагировал. Починили быстро, дали гарантию год. Уже 8 месяцев работает отлично.", rating: 5 },
  { name: "Наталья В.", text: "Звонила вечером, договорились на утро. Мастер пришёл вовремя, всё объяснил. Осталась очень довольна, рекомендую!", rating: 5 },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SectionHead({ badge, title, sub }: { badge: string; title: string; sub?: string }) {
  return (
    <div className="mb-12">
      <div className="badge mb-4">{badge}</div>
      <h2 style={{ fontFamily: "'Golos Text'", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--text-primary)", lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && <p style={{ marginTop: "0.75rem", color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px", lineHeight: 1.65 }}>{sub}</p>}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const srvRef = useInView();
  const procRef = useInView();
  const aboutRef = useInView();
  const guarRef = useInView();
  const revRef = useInView();
  const ctaRef = useInView();

  return (
    <div style={{ background: "#fff", fontFamily: "'Golos Text', sans-serif", color: "var(--text-primary)" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#" style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--text-primary)", textDecoration: "none" }}>
            Тех<span style={{ color: "var(--brand)" }}>Надежно</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden md:flex">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>
          <a href="tel:+73912000000" className="btn-primary hidden md:inline-flex" style={{ padding: "0.65rem 1.4rem", fontSize: "0.85rem" }}>
            <Icon name="Phone" size={15} />
            Вызвать мастера
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} style={{ color: "var(--text-primary)" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid var(--border-color)", padding: "16px 24px 24px" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link" style={{ display: "block", padding: "12px 0", borderBottom: "1px solid var(--border-color)" }}
                onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="tel:+73912000000" className="btn-primary" style={{ display: "flex", marginTop: 16, justifyContent: "center" }}>
              <Icon name="Phone" size={15} /> Вызвать мастера
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 68, background: "linear-gradient(135deg, #EFF6FF 0%, #fff 50%, #F0FDF4 100%)", position: "relative", overflow: "hidden" }}>
        {/* декоративные круги */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "0%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }} className="grid-cols-1 md:grid-cols-2">

          {/* левая колонка */}
          <div>
            <div className="badge anim-init anim d1" style={{ marginBottom: 20 }}>
              <Icon name="MapPin" size={13} />
              Красноярск и пригород
            </div>
            <h1 className="anim-init anim d2" style={{ fontWeight: 900, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1, marginBottom: 20, color: "var(--text-primary)" }}>
              Ремонт духовых шкафов<br />
              <span style={{ color: "var(--brand)" }}>и варочных панелей</span>
            </h1>
            <p className="anim-init anim d3" style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32, maxWidth: 460 }}>
              Профессиональный ремонт встроенной техники на дому. Выезд в день обращения. Диагностика бесплатно.
            </p>

            <div className="anim-init anim d4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="tel:+73912000000" className="btn-primary">
                <Icon name="Phone" size={17} />
                +7 (391) 200-00-00
              </a>
              <a href="#services" className="btn-ghost">
                Наши услуги
                <Icon name="ChevronDown" size={17} />
              </a>
            </div>

            <div className="anim-init anim d5" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[
                { icon: "Clock", text: "Выезд в день обращения" },
                { icon: "ShieldCheck", text: "Гарантия до 2 лет" },
                { icon: "BadgeRussianRuble", text: "Диагностика 0 ₽" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={item.icon} size={15} style={{ color: "var(--brand)" }} />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* правая колонка — фото + карточки */}
          <div className="anim-init anim d3 hidden md:block" style={{ position: "relative" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(37,99,235,0.12)" }}>
              <img src={HERO_IMG} alt="Ремонт техники" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            </div>
            {/* поп-ап статистики */}
            <div style={{ position: "absolute", bottom: -20, left: -20, background: "#fff", borderRadius: 16, padding: "16px 20px", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", display: "flex", gap: 20, border: "1px solid var(--border-color)" }}>
              {[
                { n: "4000+", l: "ремонтов" },
                { n: "8 лет", l: "опыта" },
                { n: "97%", l: "с 1 визита" },
              ].map(s => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: "1.3rem", color: "var(--brand)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 24px", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={srvRef.ref}>
            <SectionHead badge="Что ремонтируем" title="Услуги" sub="Специализируемся только на встроенной кухонной технике — знаем её досконально" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {services.map((s, i) => (
              <div key={s.title} className="card" style={{
                padding: 28,
                opacity: srvRef.inView ? 1 : 0,
                transform: srvRef.inView ? "none" : "translateY(20px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon name={s.icon} size={24} style={{ color: s.color }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 6, color: "var(--text-primary)" }}>{s.title}</h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 18, fontWeight: 500 }}>{s.brands}</p>
                <div style={{ height: 1, background: "var(--border-color)", marginBottom: 18 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {s.issues.map(issue => (
                    <li key={issue} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                      <div style={{ marginTop: 3, width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                      {issue}
                    </li>
                  ))}
                </ul>
                <a href="tel:+73912000000" className="btn-primary" style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
                  Вызвать мастера
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={procRef.ref}>
            <SectionHead badge="Просто и понятно" title="Как мы работаем" sub="От звонка до гарантийного талона — всё прозрачно и без сюрпризов" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {process.map((p, i) => (
              <div key={p.num} style={{
                padding: "28px 24px",
                background: "var(--surface)",
                borderRadius: 20,
                border: "1px solid var(--border-color)",
                opacity: procRef.inView ? 1 : 0,
                transform: procRef.inView ? "none" : "translateY(18px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
              }}>
                <div style={{ fontWeight: 900, fontSize: "2.5rem", lineHeight: 1, marginBottom: 16, color: "transparent", WebkitTextStroke: "2px var(--brand-border)" }}>{p.num}</div>
                <div className="icon-box" style={{ marginBottom: 14, borderRadius: 12 }}>
                  <Icon name={p.icon} size={20} />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 8, color: "var(--text-primary)" }}>{p.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 24px", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">

          <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", opacity: aboutRef.inView ? 1 : 0, transform: aboutRef.inView ? "none" : "translateX(-24px)", transition: "all 0.8s ease 0.1s" }} ref={aboutRef.ref}>
            <img src={TECH_IMG} alt="Техника" style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 20, right: 20, background: "#fff", borderRadius: 14, padding: "14px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
              <div style={{ fontWeight: 700, fontSize: "1.5rem", color: "var(--brand)" }}>0 ₽</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>диагностика на дому</div>
            </div>
          </div>

          <div style={{ opacity: aboutRef.inView ? 1 : 0, transform: aboutRef.inView ? "none" : "translateX(24px)", transition: "all 0.8s ease 0.2s" }}>
            <SectionHead badge="О компании" title={"ТехНадежно —\nремонт с гарантией"} sub="Работаем в Красноярске с 2016 года. Специализируемся только на встроенной кухонной технике — никакой «всё подряд»." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
              {[
                { n: "8 лет", l: "работаем в Красноярске" },
                { n: "50+", l: "брендов обслуживаем" },
                { n: "97%", l: "ремонт за один визит" },
                { n: "4000+", l: "довольных клиентов" },
              ].map(s => (
                <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: "18px 20px", border: "1px solid var(--border-color)" }}>
                  <div style={{ fontWeight: 700, fontSize: "1.5rem", color: "var(--brand)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <a href="tel:+73912000000" className="btn-primary">
              <Icon name="Phone" size={17} />
              Позвонить сейчас
            </a>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section id="guarantee" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={guarRef.ref}>
            <SectionHead badge="Наши обязательства" title="Гарантия на ремонт" sub="Даём письменную гарантию на каждый ремонт — без мелкого шрифта и скрытых условий" />
          </div>

          {/* большой баннер */}
          <div style={{ background: "linear-gradient(135deg, var(--brand) 0%, #1D4ED8 100%)", borderRadius: 24, padding: "40px 48px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem", marginBottom: 10 }}>Письменная гарантия на каждый ремонт</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", maxWidth: 480, lineHeight: 1.65 }}>
                Гарантийный талон с подписью мастера вручаем при сдаче работы. В нём — дата, перечень работ, запчасти и срок гарантии.
              </p>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontWeight: 900, fontSize: "5rem", lineHeight: 1, color: "#fff" }}>2</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>года на запчасти</div>
            </div>
          </div>

          {/* карточки гарантий */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {guaranteeItems.map((g, i) => (
              <div key={g.title} className="card" style={{
                padding: "22px 24px", display: "flex", gap: 16, alignItems: "flex-start",
                opacity: guarRef.inView ? 1 : 0,
                transform: guarRef.inView ? "none" : "translateY(18px)",
                transition: `all 0.55s ease ${i * 0.08}s`,
              }}>
                <div className="icon-box">
                  <Icon name={g.icon} size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 6, color: "var(--text-primary)" }}>{g.title}</h4>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* таблица сроков */}
          <div style={{ marginTop: 20, background: "var(--surface)", borderRadius: 20, padding: "28px 32px", border: "1px solid var(--border-color)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { w: "Замена тэна / термостата", t: "1 год" },
              { w: "Ремонт сенсорного модуля", t: "6 мес." },
              { w: "Нагревательные элементы", t: "2 года" },
              { w: "Работа мастера", t: "6 мес." },
            ].map(item => (
              <div key={item.w} style={{ borderLeft: "3px solid var(--brand)", paddingLeft: 16 }}>
                <div style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--brand)" }}>{item.t}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{item.w}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ padding: "100px 24px", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={revRef.ref}>
            <SectionHead badge="Отзывы клиентов" title="Нам доверяют в Красноярске" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {reviews.map((r, i) => (
              <div key={r.name} className="card" style={{
                padding: 28,
                opacity: revRef.inView ? 1 : 0,
                transform: revRef.inView ? "none" : "translateY(18px)",
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Icon key={k} name="Star" size={16} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  ))}
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>
                  «{r.text}»
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid var(--border-color)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--brand)", fontSize: "0.9rem" }}>
                    {r.name[0]}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>{r.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="grid-cols-1 md:grid-cols-2">

          <div ref={ctaRef.ref} style={{ opacity: ctaRef.inView ? 1 : 0, transform: ctaRef.inView ? "none" : "translateY(20px)", transition: "all 0.7s ease" }}>
            <SectionHead badge="Связаться с нами" title="Оставить заявку" sub="Перезвоним в течение 15 минут. Выезд в тот же день." />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "Phone", label: "Телефон", val: "+7 (391) 200-00-00" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", val: "+7 (391) 200-00-00" },
                { icon: "MapPin", label: "Город", val: "Красноярск и Красноярский край" },
                { icon: "Clock", label: "Режим работы", val: "Ежедневно 8:00 — 22:00" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "var(--surface)", borderRadius: 14, border: "1px solid var(--border-color)" }}>
                  <div className="icon-box" style={{ width: 40, height: 40, borderRadius: 10 }}>
                    <Icon name={c.icon} size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "var(--surface)", borderRadius: 24, padding: "36px 32px", border: "1px solid var(--border-color)", opacity: ctaRef.inView ? 1 : 0, transform: ctaRef.inView ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.2s" }}>
            <h3 style={{ fontWeight: 700, fontSize: "1.4rem", marginBottom: 6, color: "var(--text-primary)" }}>Оставить заявку</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: 24 }}>Перезвоним в течение 15 минут</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { ph: "Ваше имя", type: "text" },
                { ph: "Номер телефона", type: "tel" },
                { ph: "Марка и модель техники", type: "text" },
              ].map(({ ph, type }) => (
                <input key={ph} type={type} placeholder={ph} className="input-modern" />
              ))}
              <textarea
                rows={3}
                placeholder="Опишите неисправность"
                className="input-modern"
                style={{ resize: "none" }}
              />
              <button className="btn-primary" style={{ justifyContent: "center", padding: "0.95rem" }}>
                <Icon name="Send" size={17} />
                Отправить заявку
              </button>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--text-primary)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
            Тех<span style={{ color: "#60A5FA" }}>Надежно</span>
          </span>
          <span style={{ color: "#64748B", fontSize: "0.85rem" }}>© 2024 ТехНадежно · Красноярск</span>
          <a href="tel:+73912000000" style={{ color: "#60A5FA", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
            +7 (391) 200-00-00
          </a>
        </div>
      </footer>
    </div>
  );
}
