import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/b17676d2-42ff-4600-8a42-ff0a88d7647d.jpg";
const PORTFOLIO_IMG1 = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/f6344986-2062-4ed2-841d-5dc458cbc449.jpg";
const TEAM_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/93decab0-6101-4401-93ce-43e1740c55de.jpg";

const navLinks = [
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "О компании", href: "#about" },
  { label: "Гарантия", href: "#guarantee" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const services = [
  { icon: "Layers", title: "Капитальный ремонт", desc: "Полный цикл работ: от демонтажа до финишной отделки с использованием премиальных материалов." },
  { icon: "Sparkles", title: "Дизайнерский ремонт", desc: "Реализация авторских проектов любой сложности. Работаем с ведущими дизайн-бюро." },
  { icon: "Building2", title: "Коммерческие объекты", desc: "Офисы, ресторации, бутики. Понимаем специфику бизнеса и соблюдаем сроки." },
  { icon: "Wrench", title: "Отделочные работы", desc: "Штукатурка, покраска, укладка плитки и паркета. Точность до миллиметра." },
  { icon: "Zap", title: "Электрика и сантехника", desc: "Скрытая прокладка коммуникаций. Работы сертифицированных специалистов." },
  { icon: "Home", title: "Под ключ", desc: "Принимаем квартиру в черновом состоянии — сдаём полностью готовую к жизни." },
];

const portfolio = [
  { title: "Апартаменты на Арбате", area: "180 м²", type: "Жилой", year: "2024", img: PORTFOLIO_IMG1 },
  { title: "Офис архитектурной студии", area: "320 м²", type: "Коммерческий", year: "2024", img: HERO_IMG },
  { title: "Загородная резиденция", area: "650 м²", type: "Жилой", year: "2023", img: PORTFOLIO_IMG1 },
  { title: "Ресторан «Белый зал»", area: "210 м²", type: "Общественный", year: "2023", img: HERO_IMG },
];

const reviews = [
  { name: "Александр В.", role: "Владелец квартиры", text: "Сдали в срок. Ни одного нарекания. Спустя год — всё как в первый день. Рекомендую без оговорок.", rating: 5 },
  { name: "Марина К.", role: "Директор бутика", text: "Работали в жёстких условиях — ремонт вести, пока торговля не останавливается. Справились блестяще.", rating: 5 },
  { name: "Дмитрий Ф.", role: "Архитектор", text: "Как специалист, понимаю нюансы. Эта команда — редкость на рынке. Детали соблюдены безупречно.", rating: 5 },
];

const guaranteeItems = [
  {
    icon: "ShieldCheck",
    title: "5 лет на отделочные работы",
    desc: "Штукатурка, покраска, укладка плитки и напольных покрытий. Гарантия распространяется на скрытые дефекты материалов и нарушение технологии.",
  },
  {
    icon: "Clock",
    title: "3 года на инженерные системы",
    desc: "Электромонтаж, сантехника, вентиляция и климатическое оборудование. Все работы выполняются с оформлением актов скрытых работ.",
  },
  {
    icon: "FileCheck",
    title: "Официальный договор",
    desc: "Смета, техническое задание и сроки — всё фиксируется в договоре. Никаких устных договорённостей и неожиданных доплат в процессе.",
  },
  {
    icon: "RefreshCw",
    title: "Бесплатное устранение",
    desc: "В течение гарантийного срока мы устраняем выявленные недостатки за собственный счёт в течение 5 рабочих дней после обращения.",
  },
  {
    icon: "Medal",
    title: "Сертифицированные материалы",
    desc: "Работаем только с поставщиками, предоставляющими полный пакет документов. Сертификаты на все применённые материалы передаются заказчику.",
  },
  {
    icon: "Handshake",
    title: "Гарантийный фонд",
    desc: "Формируем резервный фонд в размере 5% от стоимости объекта. Средства удерживаются до истечения гарантийного срока.",
  },
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
  const portfolioView = useInView();
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
            АРТ<span style={{ color: "var(--gold)" }}>СТРОЙ</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-xs tracking-widest uppercase" style={{ color: "#b0a898", fontWeight: 400 }}>
                {l.label}
              </a>
            ))}
          </div>
          <button className="btn-gold hidden md:inline-block text-xs">Консультация</button>
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
            <button className="btn-gold mt-6 w-full">Консультация</button>
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
            backgroundPosition: "center 30%",
            opacity: 0.32,
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0d0d0d 30%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.65) 0%, transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div style={{ maxWidth: "700px" }}>
            <div className="section-label mb-6 opacity-0-init animate-fade-up">Премиальный ремонт · Москва</div>
            <h1
              className="font-cormorant font-light leading-none mb-8 opacity-0-init animate-fade-up delay-200"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", color: "#ece8e0" }}
            >
              Ремонт,<br />который<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>остаётся.</em>
            </h1>
            <p className="text-base mb-10 max-w-md opacity-0-init animate-fade-up delay-300" style={{ color: "#8a8070", lineHeight: 1.8 }}>
              Создаём пространства, которые сохраняют ценность годами. Гарантия на все работы — до 5 лет.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0-init animate-fade-up delay-500">
              <button className="btn-gold">Обсудить проект</button>
              <button className="btn-outline-gold">Смотреть портфолио</button>
            </div>
          </div>

          <div
            className="mt-16 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0-init animate-fade-up delay-600"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { n: "12+", l: "лет на рынке" },
              { n: "340+", l: "объектов сдано" },
              { n: "5 лет", l: "гарантия" },
              { n: "98%", l: "клиентов рекомендуют" },
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
            {servicesView.inView && <SectionTitle label="Что мы делаем" title="Полный спектр услуг" />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
            {services.map((s, i) => (
              <div
                key={s.title}
                className="card-premium p-10 group"
                style={{
                  opacity: servicesView.inView ? 1 : 0,
                  transform: servicesView.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.08}s`,
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center mb-6 rounded-sm" style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                  <Icon name={s.icon} size={18} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-cormorant text-2xl font-medium mb-3" style={{ color: "#ece8e0" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6a6258" }}>{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gold)" }}>
                  <span className="text-xs tracking-widest uppercase">Подробнее</span>
                  <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={portfolioView.ref}>
            {portfolioView.inView && <SectionTitle label="Наши работы" title="Портфолио" />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  opacity: portfolioView.inView ? 1 : 0,
                  transform: portfolioView.inView ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.7s ease ${i * 0.1}s`,
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "brightness(0.65)" }}
                  />
                </div>
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 30%, transparent)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="section-label">{p.type}</span>
                    <span className="text-xs" style={{ color: "#5a5248" }}>·</span>
                    <span className="text-xs tracking-wider" style={{ color: "#5a5248" }}>{p.year}</span>
                  </div>
                  <h3 className="font-cormorant text-3xl font-light" style={{ color: "#ece8e0" }}>{p.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm" style={{ color: "#8a8070" }}>{p.area}</span>
                    <div
                      className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"
                      style={{ color: "var(--gold)" }}
                    >
                      <span className="text-xs tracking-widest uppercase">Смотреть</span>
                      <Icon name="ArrowRight" size={13} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="btn-outline-gold">Все проекты</button>
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* ABOUT */}
      <section id="about" className="py-28" style={{ background: "#0f0f0f" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={aboutView.ref}>
            {aboutView.inView && <SectionTitle label="О компании" title={"АртСтрой —\nбольше чем ремонт"} />}
            <p className="text-base leading-loose mb-6" style={{ color: "#6a6258" }}>
              С 2012 года мы создаём пространства, где каждая деталь имеет значение. Наш подход — это синтез строительной точности и архитектурного мышления.
            </p>
            <p className="text-base leading-loose mb-10" style={{ color: "#6a6258" }}>
              Мы не занимаемся потоковым ремонтом. Каждый объект — это штучная работа с выделенной командой и персональным куратором.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { n: "12", l: "лет опыта" },
                { n: "40+", l: "специалистов" },
                { n: "3", l: "города присутствия" },
                { n: "∞", l: "внимание к деталям" },
              ].map((s) => (
                <div key={s.n} className="py-5 border-l-2 pl-5" style={{ borderColor: "var(--gold-border)" }}>
                  <div className="font-cormorant text-3xl" style={{ color: "var(--gold)" }}>{s.n}</div>
                  <div className="text-xs mt-1 tracking-wider" style={{ color: "#5a5248" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button className="btn-gold">Познакомиться с командой</button>
          </div>
          <div
            className="relative"
            style={{
              opacity: aboutView.inView ? 1 : 0,
              transform: aboutView.inView ? "translateX(0)" : "translateX(30px)",
              transition: "all 0.9s ease 0.2s",
            }}
          >
            <img src={TEAM_IMG} alt="Команда" className="w-full object-cover" style={{ filter: "brightness(0.75) sepia(0.15)" }} />
            <div
              className="absolute -bottom-4 -left-4 p-6"
              style={{ background: "#141414", border: "1px solid var(--gold-border)", maxWidth: "240px" }}
            >
              <div className="font-cormorant text-4xl font-light" style={{ color: "var(--gold)" }}>5 лет</div>
              <div className="text-xs mt-1 tracking-wider leading-relaxed" style={{ color: "#5a5248" }}>
                гарантия на все<br />выполненные работы
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* GUARANTEE */}
      <section id="guarantee" className="py-28" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div ref={guaranteeView.ref}>
            {guaranteeView.inView && <SectionTitle label="Наши обязательства" title="Гарантия качества" />}
          </div>

          <div className="mb-16 p-8 md:p-12" style={{ background: "#111", border: "1px solid var(--gold-border)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="font-cormorant text-3xl md:text-4xl font-light mb-4" style={{ color: "#ece8e0" }}>
                  Мы берём на себя полную ответственность за результат
                </h3>
                <p className="text-sm leading-loose" style={{ color: "#6a6258" }}>
                  Гарантийный документ оформляется при сдаче объекта и имеет юридическую силу. Условия гарантии прописаны в договоре и не содержат скрытых исключений.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="font-cormorant leading-none" style={{ fontSize: "7rem", color: "var(--gold)", fontWeight: 300 }}>5</div>
                <div className="section-label mt-1">лет максимальная гарантия</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guaranteeItems.map((g, i) => (
              <div
                key={g.title}
                className="card-premium p-8"
                style={{
                  opacity: guaranteeView.inView ? 1 : 0,
                  transform: guaranteeView.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-sm" style={{ background: "var(--gold-dim)", border: "1px solid var(--gold-border)" }}>
                    <Icon name={g.icon} size={18} style={{ color: "var(--gold)" }} />
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="section-label mb-5">Гарантийные сроки по видам работ</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { w: "Отделка стен и потолков", t: "5 лет" },
                    { w: "Напольные покрытия", t: "5 лет" },
                    { w: "Электромонтаж", t: "3 года" },
                    { w: "Сантехника", t: "3 года" },
                  ].map((item) => (
                    <div key={item.w} className="border-l pl-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <div className="font-cormorant text-xl" style={{ color: "var(--gold)" }}>{item.t}</div>
                      <div className="text-xs mt-1" style={{ color: "#5a5248" }}>{item.w}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn-gold flex-shrink-0">Скачать условия</button>
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
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Icon key={k} name="Star" size={14} style={{ color: "var(--gold)", fill: "var(--gold)" }} />
                  ))}
                </div>
                <p className="font-cormorant text-xl font-light italic leading-relaxed mb-8" style={{ color: "#b0a898" }}>
                  «{r.text}»
                </p>
                <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="font-medium text-sm" style={{ color: "#ece8e0" }}>{r.name}</div>
                  <div className="text-xs mt-1" style={{ color: "#4a4440" }}>{r.role}</div>
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
                Расскажите о вашем проекте — и мы предложим решение в течение одного рабочего дня. Первичная консультация и выезд специалиста бесплатны.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Почта", val: "info@artstroy.ru" },
                  { icon: "MapPin", label: "Адрес", val: "Москва, ул. Арбат, 10" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт 9:00–19:00" },
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
              <h3 className="font-cormorant text-3xl font-light mb-8" style={{ color: "#ece8e0" }}>Оставить заявку</h3>
              <div className="space-y-5">
                {["Ваше имя", "Телефон или email"].map((ph) => (
                  <input
                    key={ph}
                    type="text"
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
                  rows={4}
                  placeholder="Краткое описание проекта"
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
                <button className="btn-gold w-full text-center">Отправить заявку</button>
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
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="font-cormorant text-xl font-light tracking-widest" style={{ color: "#ece8e0" }}>
            АРТ<span style={{ color: "var(--gold)" }}>СТРОЙ</span>
          </a>
          <p className="text-xs tracking-wider" style={{ color: "#3a3532" }}>
            © 2024 АртСтрой. Все права защищены.
          </p>
          <div className="flex gap-8">
            {navLinks.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="text-xs tracking-widest uppercase" style={{ color: "#3a3532" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}