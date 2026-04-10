import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e8fed08c-77bf-4e2d-b03c-5f0281e4eca8.jpg";
const TECH_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e9bf28a1-6ae7-4674-a71d-c41ad73bce37.jpg";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Как мы работаем", href: "#process" },
  { label: "О компании", href: "#about" },
  { label: "Гарантия", href: "#guarantee" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  {
    icon: "Flame",
    title: "Духовые шкафы",
    brands: "Bosch, Siemens, Miele, Electrolux, Gorenje, Samsung",
    issues: ["Не нагревается / перегревается", "Сломан тэн или термостат", "Не работает гриль или конвекция", "Не закрывается дверца", "Ошибки на дисплее"],
  },
  {
    icon: "Zap",
    title: "Варочные панели",
    brands: "AEG, Hansa, Zanussi, Candy, Hotpoint, Indesit",
    issues: ["Не включается конфорка", "Трещина на стеклокерамике", "Не реагирует сенсор", "Искрит или щёлкает", "Не держит мощность"],
  },
  {
    icon: "Settings",
    title: "Встроенная техника",
    brands: "Neff, Gaggenau, Franke, Kuppersberg, Krona",
    issues: ["Встроенные духовки в кухонном гарнитуре", "Индукционные панели", "Пароварки и комби-печи", "Кофемашины встроенные", "Микроволновые печи"],
  },
];

const process = [
  { step: "01", icon: "Phone", title: "Звонок или заявка", desc: "Опишите неисправность. Дадим предварительную оценку стоимости прямо по телефону." },
  { step: "02", icon: "MapPin", title: "Выезд мастера", desc: "Приедем в удобное время. Выезд — в день обращения или к назначенному часу." },
  { step: "03", icon: "Search", title: "Диагностика", desc: "Бесплатная диагностика на месте. Называем точную сумму до начала ремонта." },
  { step: "04", icon: "Wrench", title: "Ремонт", desc: "Большинство поломок устраняем за один визит. Оригинальные и совместимые запчасти." },
  { step: "05", icon: "ShieldCheck", title: "Гарантия", desc: "Выдаём гарантийный документ. От 6 месяцев до 2 лет в зависимости от вида работ." },
];

const guaranteeItems = [
  { icon: "ShieldCheck", title: "До 2 лет на запчасти", desc: "Используем оригинальные комплектующие и сертифицированные аналоги. Гарантия на деталь — до 24 месяцев." },
  { icon: "Clock", title: "До 1 года на работу", desc: "Гарантийный срок на выполненные ремонтные работы — от 6 до 12 месяцев в зависимости от сложности." },
  { icon: "FileCheck", title: "Официальный документ", desc: "По окончании ремонта выдаём гарантийный талон с печатью, датой и перечнем выполненных работ." },
  { icon: "RefreshCw", title: "Бесплатный повторный выезд", desc: "Если в гарантийный период появилась та же неисправность — приедем и устраним бесплатно." },
  { icon: "Medal", title: "Только оригинальные запчасти", desc: "Работаем напрямую с поставщиками. Не используем б/у детали — только новые, с документами." },
  { icon: "BadgeCheck", title: "Фиксированная цена", desc: "Озвучиваем стоимость до ремонта. Цена не меняется в процессе — без скрытых доплат." },
];

const reviews = [
  { name: "Елена М.", city: "Москва", text: "Духовка Bosch перестала греть. Мастер приехал через 3 часа, нашёл сгоревший тэн, заменил за один визит. Всё чётко и без лишних слов.", rating: 5 },
  { name: "Игорь С.", city: "Москва", text: "Варочная панель Siemens вышла из строя — сенсор не реагировал. Починили быстро, дали гарантию год. Уже полгода работает отлично.", rating: 5 },
  { name: "Наталья В.", city: "Подольск", text: "Звонила поздно вечером, договорились на утро. Мастер пришёл вовремя, объяснил что случилось и что сделал. Осталась очень довольна.", rating: 5 },
];

function useInView(threshold = 0.12) {
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

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-14">
      <div className="section-label mb-4">{label}</div>
      <h2 className="font-cormorant text-5xl md:text-6xl font-light leading-tight" style={{ color: "#ece8e0" }}>
        {title}
      </h2>
      <div className="mt-5 h-px" style={{ background: "var(--gold)", width: "4rem", opacity: 0.7 }} />
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const servicesView = useInView();
  const processView = useInView();
  const aboutView = useInView();
  const guaranteeView = useInView();
  const reviewsView = useInView();
  const contactsView = useInView();

  return (
    <div className="min-h-screen" style={{ background: "#0d0d0d", fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(13,13,13,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,168,68,0.12)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <a href="#" className="font-cormorant text-2xl font-light tracking-widest" style={{ color: "#ece8e0" }}>
            ТЕХ<span style={{ color: "var(--gold)" }}>НАДЕЖНО</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-xs tracking-widest uppercase" style={{ color: "#b0a898", fontWeight: 400 }}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="tel:+74950000000" className="btn-gold hidden md:inline-block text-xs">Вызвать мастера</a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "var(--gold)" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-8 pt-4" style={{ background: "rgba(13,13,13,0.98)" }}>
            {navLinks.map((l) => (
              <a
                key={l.href} href={l.href}
                className="block py-3 text-sm tracking-widest uppercase border-b"
                style={{ color: "#b0a898", borderColor: "rgba(255,255,255,0.07)" }}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="tel:+74950000000" className="btn-gold mt-6 block text-center">Вызвать мастера</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-24" style={{ background: "#0d0d0d" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0d0d0d 35%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.75) 0%, transparent 65%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div style={{ maxWidth: "700px" }}>
            <div className="section-label mb-6 opacity-0-init animate-fade-up">Ремонт бытовой техники · Москва и область</div>
            <h1
              className="font-cormorant font-light leading-none mb-8 opacity-0-init animate-fade-up delay-200"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", color: "#ece8e0" }}
            >
              Духовые шкафы<br />и варочные<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>панели.</em>
            </h1>
            <p className="text-base mb-10 max-w-lg opacity-0-init animate-fade-up delay-300" style={{ color: "#8a8070", lineHeight: 1.85 }}>
              Профессиональный ремонт встроенной техники на дому. Выезд в день обращения. Диагностика бесплатно. Гарантия на все работы.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0-init animate-fade-up delay-500">
              <a href="tel:+74950000000" className="btn-gold">Вызвать мастера</a>
              <a href="#services" className="btn-outline-gold">Наши услуги</a>
            </div>
          </div>

          <div
            className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0-init animate-fade-up delay-600"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { n: "8+", l: "лет опыта" },
              { n: "4 000+", l: "ремонтов выполнено" },
              { n: "2 года", l: "гарантия на запчасти" },
              { n: "день", l: "выезд в день звонка" },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-cormorant text-4xl font-light" style={{ color: "var(--gold)" }}>{s.n}</div>
                <div className="text-xs mt-1 tracking-wider" style={{ color: "#5a5248" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28" style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={servicesView.ref}>
            {servicesView.inView && <SectionTitle label="Что ремонтируем" title="Услуги" />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="card-premium p-8 flex flex-col"
                style={{
                  opacity: servicesView.inView ? 1 : 0,
                  transform: servicesView.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.12}s`,
                }}
              >
                <div className="w-11 h-11 flex items-center justify-center mb-6 rounded-sm" style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                  <Icon name={s.icon} size={20} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-cormorant text-3xl font-medium mb-2" style={{ color: "#ece8e0" }}>{s.title}</h3>
                <p className="text-xs mb-5 tracking-wide" style={{ color: "#5a5248" }}>{s.brands}</p>
                <div className="divider-gold mb-5" />
                <ul className="space-y-2 flex-1">
                  {s.issues.map((issue) => (
                    <li key={issue} className="flex items-start gap-2 text-sm" style={{ color: "#7a7268" }}>
                      <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>—</span>
                      {issue}
                    </li>
                  ))}
                </ul>
                <a href="tel:+74950000000" className="btn-outline-gold mt-8 block text-center">Вызвать мастера</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* PROCESS */}
      <section id="process" className="py-28" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={processView.ref}>
            {processView.inView && <SectionTitle label="Просто и понятно" title="Как мы работаем" />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
            {process.map((p, i) => (
              <div
                key={p.step}
                className="card-premium p-7 flex flex-col"
                style={{
                  opacity: processView.inView ? 1 : 0,
                  transform: processView.inView ? "translateY(0)" : "translateY(18px)",
                  transition: `all 0.55s ease ${i * 0.1}s`,
                }}
              >
                <div className="font-cormorant text-5xl font-light mb-4" style={{ color: "rgba(212,168,68,0.2)" }}>{p.step}</div>
                <div className="w-9 h-9 flex items-center justify-center mb-4 rounded-sm" style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                  <Icon name={p.icon} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <h4 className="font-cormorant text-xl font-medium mb-2" style={{ color: "#ece8e0" }}>{p.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#5a5248" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* ABOUT */}
      <section id="about" className="py-28" style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className="relative order-2 lg:order-1"
            style={{
              opacity: aboutView.inView ? 1 : 0,
              transform: aboutView.inView ? "translateX(0)" : "translateX(-30px)",
              transition: "all 0.9s ease 0.2s",
            }}
          >
            <img src={TECH_IMG} alt="Техника" className="w-full object-cover" style={{ filter: "brightness(0.7)" }} />
            <div
              className="absolute -bottom-4 -right-4 p-6"
              style={{ background: "#141414", border: "1px solid var(--gold-border)", maxWidth: "220px" }}
            >
              <div className="font-cormorant text-4xl font-light" style={{ color: "var(--gold)" }}>4 000+</div>
              <div className="text-xs mt-1 tracking-wider leading-relaxed" style={{ color: "#5a5248" }}>
                ремонтов за<br />8 лет работы
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2" ref={aboutView.ref}>
            {aboutView.inView && <SectionTitle label="О компании" title={"ТехНадежно —\nэто опыт и честность"} />}
            <p className="text-base leading-loose mb-5" style={{ color: "#6a6258" }}>
              Мы специализируемся исключительно на ремонте встроенной кухонной техники — духовых шкафов и варочных панелей. Никакой «всё подряд» — только то, в чём разбираемся досконально.
            </p>
            <p className="text-base leading-loose mb-10" style={{ color: "#6a6258" }}>
              Мастера с опытом от 5 лет. Работаем с техникой любых марок — от бюджетных до премиальных. Запчасти в наличии — большинство ремонтов закрываем за один визит.
            </p>
            <div className="grid grid-cols-2 gap-5 mb-10">
              {[
                { n: "8 лет", l: "опыт работы" },
                { n: "50+", l: "брендов обслуживаем" },
                { n: "97%", l: "ремонт за 1 визит" },
                { n: "0 ₽", l: "диагностика на дому" },
              ].map((s) => (
                <div key={s.n} className="py-4 border-l-2 pl-5" style={{ borderColor: "var(--gold-border)" }}>
                  <div className="font-cormorant text-3xl" style={{ color: "var(--gold)" }}>{s.n}</div>
                  <div className="text-xs mt-1 tracking-wider" style={{ color: "#5a5248" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <a href="tel:+74950000000" className="btn-gold">Позвонить сейчас</a>
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* GUARANTEE */}
      <section id="guarantee" className="py-28" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={guaranteeView.ref}>
            {guaranteeView.inView && <SectionTitle label="Наши обязательства" title="Гарантия на ремонт" />}
          </div>

          <div className="mb-14 p-8 md:p-12" style={{ background: "#111", border: "1px solid var(--gold-border)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="font-cormorant text-3xl md:text-4xl font-light mb-4" style={{ color: "#ece8e0" }}>
                  Даём письменную гарантию на каждый ремонт
                </h3>
                <p className="text-sm leading-loose" style={{ color: "#6a6258" }}>
                  Гарантийный талон с печатью и подписью мастера вручаем при сдаче работы. В нём — дата, перечень работ, использованные запчасти и срок гарантии. Без условий мелким шрифтом.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="font-cormorant leading-none" style={{ fontSize: "6rem", color: "var(--gold)", fontWeight: 300 }}>2</div>
                <div className="section-label mt-1">года на запчасти</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guaranteeItems.map((g, i) => (
              <div
                key={g.title}
                className="card-premium p-7"
                style={{
                  opacity: guaranteeView.inView ? 1 : 0,
                  transform: guaranteeView.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-sm" style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                    <Icon name={g.icon} size={17} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <h4 className="font-cormorant text-xl font-medium mb-2" style={{ color: "#ece8e0" }}>{g.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#5a5248" }}>{g.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { w: "Замена тэна / термостата", t: "1 год" },
                { w: "Ремонт сенсорного модуля", t: "6 мес." },
                { w: "Замена нагревательных элементов", t: "2 года" },
                { w: "Работа мастера", t: "6 мес." },
              ].map((item) => (
                <div key={item.w} className="border-l pl-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="font-cormorant text-xl" style={{ color: "var(--gold)" }}>{item.t}</div>
                  <div className="text-xs mt-1" style={{ color: "#5a5248" }}>{item.w}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* REVIEWS */}
      <section id="reviews" className="py-28" style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={reviewsView.ref}>
            {reviewsView.inView && <SectionTitle label="Клиенты о нас" title="Отзывы" />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className="card-premium p-8"
                style={{
                  opacity: reviewsView.inView ? 1 : 0,
                  transform: reviewsView.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.7s ease ${i * 0.12}s`,
                }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Icon key={k} name="Star" size={13} style={{ color: "var(--gold)", fill: "var(--gold)" }} />
                  ))}
                </div>
                <p className="font-cormorant text-xl font-light italic leading-relaxed mb-8" style={{ color: "#b0a898" }}>
                  «{r.text}»
                </p>
                <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="font-medium text-sm" style={{ color: "#ece8e0" }}>{r.name}</div>
                  <div className="text-xs mt-1" style={{ color: "#4a4440" }}>{r.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* CONTACTS */}
      <section id="contacts" className="py-28" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={contactsView.ref}>
            {contactsView.inView && <SectionTitle label="Связаться с нами" title="Контакты" />}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-base leading-loose mb-10" style={{ color: "#6a6258" }}>
                Опишите неисправность — и мы сразу скажем, сможем ли помочь, и назовём ориентировочную стоимость. Выезд в день обращения, диагностика бесплатно.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                  { icon: "MessageCircle", label: "WhatsApp / Telegram", val: "+7 (495) 000-00-00" },
                  { icon: "MapPin", label: "Район работы", val: "Москва и Московская область" },
                  { icon: "Clock", label: "Режим работы", val: "Ежедневно 8:00–22:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 flex items-center justify-center rounded-sm flex-shrink-0" style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                      <Icon name={c.icon} size={15} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest uppercase mb-1" style={{ color: "#4a4440" }}>{c.label}</div>
                      <div className="text-sm" style={{ color: "#b0a898" }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-8 md:p-10"
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: contactsView.inView ? 1 : 0,
                transform: contactsView.inView ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.8s ease 0.2s",
              }}
            >
              <h3 className="font-cormorant text-3xl font-light mb-2" style={{ color: "#ece8e0" }}>Оставить заявку</h3>
              <p className="text-sm mb-8" style={{ color: "#5a5248" }}>Перезвоним в течение 15 минут</p>
              <div className="space-y-4">
                {[
                  { ph: "Ваше имя", type: "text" },
                  { ph: "Телефон", type: "tel" },
                  { ph: "Марка и модель техники", type: "text" },
                ].map(({ ph, type }) => (
                  <input
                    key={ph}
                    type={type}
                    placeholder={ph}
                    className="w-full px-5 py-4 text-sm outline-none"
                    style={{
                      background: "#0d0d0d",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#ece8e0",
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      transition: "border-color 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--gold-border)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                ))}
                <textarea
                  rows={3}
                  placeholder="Опишите неисправность"
                  className="w-full px-5 py-4 text-sm outline-none resize-none"
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#ece8e0",
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold-border)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
                <button className="btn-gold w-full text-center">Вызвать мастера</button>
                <p className="text-xs text-center" style={{ color: "#3a3532" }}>
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="font-cormorant text-xl font-light tracking-widest" style={{ color: "#ece8e0" }}>
            ТЕХ<span style={{ color: "var(--gold)" }}>НАДЕЖНО</span>
          </a>
          <p className="text-xs tracking-wider" style={{ color: "#3a3532" }}>
            © 2024 ТехНадежно. Ремонт духовых шкафов и варочных панелей.
          </p>
          <a href="tel:+74950000000" className="text-xs tracking-widest" style={{ color: "var(--gold-border)" }}>
            +7 (495) 000-00-00
          </a>
        </div>
      </footer>
    </div>
  );
}
