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
    brands: "Bosch · Siemens · Miele · Electrolux · Samsung · Gorenje",
    issues: ["Не нагревается или перегревается", "Сломан тэн или термостат", "Не работает гриль или конвекция", "Не закрывается дверца", "Ошибки на дисплее"],
    color: "#FF4D1C",
  },
  {
    icon: "Zap",
    title: "Варочные панели",
    brands: "AEG · Hansa · Zanussi · Candy · Hotpoint · Indesit",
    issues: ["Не включается конфорка", "Трещина на стеклокерамике", "Не реагирует сенсор", "Искрит или щёлкает", "Не держит мощность"],
    color: "#2563EB",
  },
  {
    icon: "Settings",
    title: "Встроенная техника",
    brands: "Neff · Gaggenau · Franke · Kuppersberg · Krona",
    issues: ["Встроенные духовки", "Индукционные панели", "Пароварки и комби-печи", "Встроенные кофемашины", "Микроволновые печи"],
    color: "#059669",
  },
];

const process = [
  { step: "01", icon: "Phone", title: "Звоните нам", desc: "Принимаем звонки ежедневно с 8:00 до 22:00. Назовём цену прямо по телефону." },
  { step: "02", icon: "MapPin", title: "Выезд мастера", desc: "Мастер приедет в удобное для вас время. Работаем по всему Красноярску." },
  { step: "03", icon: "Search", title: "Диагностика", desc: "Бесплатная диагностика на месте. Точная стоимость — до начала работ." },
  { step: "04", icon: "Wrench", title: "Ремонт", desc: "Большинство поломок устраняем за один визит. Только новые запчасти." },
  { step: "05", icon: "ShieldCheck", title: "Гарантия", desc: "Выдаём письменный гарантийный талон. От 6 месяцев до 2 лет." },
];

const guaranteeItems = [
  { icon: "ShieldCheck", title: "До 2 лет на запчасти", desc: "Оригинальные комплектующие и сертифицированные аналоги с гарантией до 24 месяцев." },
  { icon: "Clock", title: "До 1 года на работу", desc: "Гарантийный срок на выполненные работы — от 6 до 12 месяцев в зависимости от сложности." },
  { icon: "FileCheck", title: "Письменный документ", desc: "Гарантийный талон с печатью и подписью мастера. Дата, перечень работ, запчасти." },
  { icon: "RefreshCw", title: "Бесплатный повторный выезд", desc: "Та же поломка в гарантийный период — приедем и устраним без доплат." },
  { icon: "Medal", title: "Только новые детали", desc: "Не используем б/у запчасти. Работаем напрямую с поставщиками." },
  { icon: "BadgeCheck", title: "Цена не меняется", desc: "Называем стоимость до ремонта. Скрытых доплат в процессе — нет." },
];

const reviews = [
  { name: "Елена М.", text: "Духовка Bosch перестала греть. Мастер приехал через 3 часа, нашёл сгоревший тэн и заменил за один визит. Всё чётко и без лишних слов.", rating: 5 },
  { name: "Игорь С.", text: "Варочная панель Siemens не реагировала на сенсор. Починили быстро, дали гарантию год. Уже полгода работает отлично.", rating: 5 },
  { name: "Наталья В.", text: "Звонила вечером, договорились на утро. Мастер пришёл вовремя, объяснил в чём причина. Осталась очень довольна.", rating: 5 },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SectionHead({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="mb-12">
      <div className="tag mb-4">{tag}</div>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#111318", lineHeight: 1.15 }}>
        {title}
      </h2>
      {sub && <p className="mt-3 text-base" style={{ color: "var(--text-muted)", maxWidth: "520px" }}>{sub}</p>}
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

  const servicesRef = useInView();
  const processRef  = useInView();
  const aboutRef    = useInView();
  const guarRef     = useInView();
  const revRef      = useInView();
  const contRef     = useInView();

  return (
    <div style={{ background: "#FAFBFC", fontFamily: "'Golos Text', sans-serif", color: "#111318" }}>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--gray-mid)" : "none",
          transition: "all 0.35s ease",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.35rem", color: "#111318", textDecoration: "none", letterSpacing: "0.02em" }}>
            ТЕХ<span style={{ color: "var(--brand)" }}>НАДЕЖНО</span>
          </a>

          <div className="hidden md:flex" style={{ gap: 28 }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <a href="tel:+79131916828" className="btn-brand hidden md:inline-flex" style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}>
            <Icon name="Phone" size={15} />
            Вызвать мастера
          </a>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} style={{ color: "#111318" }} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid var(--gray-mid)", padding: "16px 24px 24px" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "12px 0", fontSize: "1rem", fontWeight: 500, color: "#111318", textDecoration: "none", borderBottom: "1px solid var(--gray)" }}>
                {l.label}
              </a>
            ))}
            <a href="tel:+79131916828" className="btn-brand" style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>
              <Icon name="Phone" size={15} />
              Вызвать мастера
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 68, background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          className="grid-cols-1 md:grid-cols-2">

          {/* Left */}
          <div>
            <div className="tag anim-init anim d1" style={{ marginBottom: 20 }}>Красноярск · Ремонт на дому</div>
            <h1 className="anim-init anim d2"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.8rem, 6vw, 4.2rem)", lineHeight: 1.1, color: "#111318", marginBottom: 24 }}>
              Ремонт духовых<br />шкафов и<br /><span style={{ color: "var(--brand)" }}>варочных панелей</span>
            </h1>
            <p className="anim-init anim d3" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#555B6E", marginBottom: 36, maxWidth: 480 }}>
              Профессиональный ремонт встроенной кухонной техники. Выезд в день обращения. Бесплатная диагностика. Гарантия на все работы.
            </p>

            <div className="anim-init anim d4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="tel:+79131916828" className="btn-brand">
                <Icon name="Phone" size={16} />
                +7 (913) 191-68-28
              </a>
              <a href="#services" className="btn-outline">
                Наши услуги
                <Icon name="ArrowRight" size={15} />
              </a>
            </div>

            <div className="anim-init anim d5" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                { n: "8 лет", l: "на рынке" },
                { n: "4 000+", l: "ремонтов" },
                { n: "0 ₽", l: "диагностика" },
                { n: "день", l: "выезд" },
              ].map(s => (
                <div key={s.n}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "var(--brand)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="anim-init anim d3 hidden md:block" style={{ position: "relative" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3" }}>
              <img src={HERO_IMG} alt="Мастер за работой" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Floating badge */}
            <div style={{
              position: "absolute", bottom: -20, left: -20,
              background: "#fff", borderRadius: 16, padding: "16px 20px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ width: 44, height: 44, background: "var(--brand-light)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="ShieldCheck" size={22} style={{ color: "var(--brand)" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#111318" }}>Гарантия 2 года</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>на запчасти</div>
              </div>
            </div>
            {/* Second badge */}
            <div style={{
              position: "absolute", top: 20, right: -16,
              background: "var(--brand)", borderRadius: 14, padding: "12px 18px",
              boxShadow: "0 8px 24px rgba(255,77,28,0.35)",
            }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Выезд сегодня</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", marginTop: 2 }}>Работаем 8:00–22:00</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "96px 0", background: "var(--gray)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div ref={servicesRef.ref}>
            {servicesRef.inView && (
              <SectionHead tag="Что ремонтируем" title="Наши услуги" sub="Работаем с техникой любых марок — от бюджетных до премиальных." />
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {services.map((s, i) => (
              <div key={s.title} className="card-modern" style={{ padding: 32, opacity: servicesRef.inView ? 1 : 0, transform: servicesRef.inView ? "none" : "translateY(20px)", transition: `all 0.6s ease ${i * 0.1}s` }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon name={s.icon} size={24} style={{ color: s.color }} />
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#111318", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>{s.brands}</p>
                <div style={{ height: 1, background: "var(--gray-mid)", marginBottom: 20 }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {s.issues.map(issue => (
                    <li key={issue} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.875rem", color: "#555B6E" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0, marginTop: 6 }} />
                      {issue}
                    </li>
                  ))}
                </ul>
                <a href="tel:+79131916828" className="btn-brand" style={{ marginTop: 28, width: "100%", justifyContent: "center", background: s.color }}>
                  Вызвать мастера
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "96px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div ref={processRef.ref}>
            {processRef.inView && (
              <SectionHead tag="Просто и понятно" title="Как мы работаем" sub="5 шагов от звонка до готовой техники с гарантией." />
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {process.map((p, i) => (
              <div key={p.step} className="card-modern" style={{ padding: 28, opacity: processRef.inView ? 1 : 0, transform: processRef.inView ? "none" : "translateY(18px)", transition: `all 0.55s ease ${i * 0.1}s` }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "2.5rem", color: "var(--brand-light)", marginBottom: 16, letterSpacing: "-0.02em" }}
                  className="text-4xl">{p.step}</div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon name={p.icon} size={18} style={{ color: "var(--brand)" }} />
                </div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#111318", marginBottom: 8 }}>{p.title}</div>
                <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "96px 0", background: "var(--gray)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          className="grid-cols-1 md:grid-cols-2">

          <div ref={aboutRef.ref} style={{ opacity: aboutRef.inView ? 1 : 0, transform: aboutRef.inView ? "none" : "translateX(-24px)", transition: "all 0.8s ease" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
              <img src={TECH_IMG} alt="Техника" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: 20, left: 20, right: 20,
                background: "rgba(255,255,255,0.95)", borderRadius: 14, padding: "16px 20px",
                display: "flex", gap: 24,
              }}>
                {[{ n: "97%", l: "за 1 визит" }, { n: "50+", l: "брендов" }, { n: "8 лет", l: "опыт" }].map(s => (
                  <div key={s.n}>
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--brand)" }}>{s.n}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ opacity: aboutRef.inView ? 1 : 0, transform: aboutRef.inView ? "none" : "translateX(24px)", transition: "all 0.8s ease 0.15s" }}>
            {aboutRef.inView && <SectionHead tag="О компании" title="ТехНадежно — это опыт и честность" />}
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#555B6E", marginBottom: 16 }}>
              Специализируемся исключительно на ремонте встроенной кухонной техники. Никакой «всё подряд» — только духовые шкафы и варочные панели. Работаем по всему Красноярску.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#555B6E", marginBottom: 32 }}>
              Мастера с опытом от 5 лет. Запчасти в наличии — большинство ремонтов закрываем за один визит прямо у вас дома.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
              {[
                { n: "8 лет", l: "опыт работы" },
                { n: "50+", l: "брендов обслуживаем" },
                { n: "97%", l: "ремонт за 1 визит" },
                { n: "0 ₽", l: "диагностика на дому" },
              ].map(s => (
                <div key={s.n} className="card-modern" style={{ padding: "16px 20px" }}>
                  <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--brand)" }}>{s.n}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <a href="tel:+79131916828" className="btn-brand">
              <Icon name="Phone" size={16} />
              Позвонить сейчас
            </a>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section id="guarantee" style={{ padding: "96px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div ref={guarRef.ref}>
            {guarRef.inView && <SectionHead tag="Наши обязательства" title="Гарантия на ремонт" sub="Все условия прописаны в договоре. Без скрытых исключений." />}
          </div>

          {/* Big banner */}
          <div style={{ background: "var(--brand)", borderRadius: 24, padding: "40px 48px", marginBottom: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#fff", marginBottom: 12 }}>
                Письменная гарантия на каждый ремонт
              </div>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 520 }}>
                Гарантийный талон с печатью и подписью мастера вручаем при сдаче работы. Дата, перечень работ, использованные запчасти и срок гарантии — всё прозрачно.
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "5rem", color: "#fff", lineHeight: 1 }}>2</div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.06em" }}>года на запчасти</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {guaranteeItems.map((g, i) => (
              <div key={g.title} className="card-modern" style={{ padding: 24, display: "flex", gap: 16, opacity: guarRef.inView ? 1 : 0, transform: guarRef.inView ? "none" : "translateY(18px)", transition: `all 0.55s ease ${i * 0.08}s` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={g.icon} size={20} style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111318", marginBottom: 6 }}>{g.title}</div>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Срок таблица */}
          <div style={{ marginTop: 20, background: "var(--gray)", borderRadius: 16, padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { w: "Замена тэна / термостата", t: "1 год" },
              { w: "Ремонт сенсорного модуля", t: "6 мес." },
              { w: "Нагревательные элементы", t: "2 года" },
              { w: "Работа мастера", t: "6 мес." },
            ].map(item => (
              <div key={item.w} style={{ borderLeft: "3px solid var(--brand)", paddingLeft: 16 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "var(--brand)" }}>{item.t}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>{item.w}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ padding: "96px 0", background: "var(--gray)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div ref={revRef.ref}>
            {revRef.inView && <SectionHead tag="Клиенты о нас" title="Отзывы" sub="Реальные отзывы клиентов из Красноярска." />}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {reviews.map((r, i) => (
              <div key={r.name} className="card-modern" style={{ padding: 32, opacity: revRef.inView ? 1 : 0, transform: revRef.inView ? "none" : "translateY(18px)", transition: `all 0.6s ease ${i * 0.12}s` }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Icon key={k} name="Star" size={16} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  ))}
                </div>
                <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "#333", marginBottom: 24, fontStyle: "italic" }}>«{r.text}»</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--gray-mid)", paddingTop: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--brand)" }}>{r.name[0]}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#111318" }}>{r.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Красноярск</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" style={{ padding: "96px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div ref={contRef.ref}>
            {contRef.inView && <SectionHead tag="Связаться с нами" title="Контакты" sub="Работаем по всему Красноярску. Выезд в день обращения." />}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { icon: "Phone", label: "Телефон", val: "+7 (913) 191-68-28", href: "tel:+79131916828" },
              { icon: "MessageCircle", label: "WhatsApp / Telegram", val: "+7 (913) 191-68-28", href: "https://wa.me/79131916828" },
              { icon: "MapPin", label: "Район работы", val: "Весь Красноярск и пригород", href: undefined },
              { icon: "Clock", label: "Режим работы", val: "Ежедневно 8:00–22:00", href: undefined },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px", background: "var(--gray)", borderRadius: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--brand-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={c.icon} size={18} style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} style={{ fontWeight: 700, fontSize: "1rem", color: "var(--brand)", textDecoration: "none" }}>{c.val}</a>
                    : <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#111318" }}>{c.val}</div>
                  }
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <a href="tel:+79131916828" className="btn-brand" style={{ fontSize: "1.05rem", padding: "1rem 2rem" }}>
              <Icon name="Phone" size={18} />
              +7 (913) 191-68-28 — Позвонить
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--dark)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <a href="#" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#fff", textDecoration: "none" }}>
            ТЕХ<span style={{ color: "var(--brand)" }}>НАДЕЖНО</span>
          </a>
          <p style={{ fontSize: "0.8rem", color: "#555B6E" }}>© 2024 ТехНадежно · Ремонт духовых шкафов и варочных панелей в Красноярске</p>
          <a href="tel:+79131916828" style={{ fontWeight: 600, color: "var(--brand)", textDecoration: "none", fontSize: "0.95rem" }}>
            +7 (913) 191-68-28
          </a>
        </div>
      </footer>
    </div>
  );
}