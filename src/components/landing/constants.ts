export const PHONE = "+7 (913) 191-68-28";
export const PHONE_HREF = "tel:+79131916828";
export const WA_HREF = "https://wa.me/79131916828";
export const HERO_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e8fed08c-77bf-4e2d-b03c-5f0281e4eca8.jpg";
export const TECH_IMG = "https://cdn.poehali.dev/projects/2ad63936-ee7e-42bf-a6a1-2ba1cf7060aa/files/e9bf28a1-6ae7-4674-a71d-c41ad73bce37.jpg";

export const services = [
  { icon: "Flame", color: "#EF4444", bg: "#FEF2F2", title: "Духовые шкафы", brands: "Bosch, Siemens, Miele, Electrolux, Gorenje, Samsung", list: ["Не нагревается или перегревается", "Не работает гриль / конвекция", "Сломан тэн или термостат", "Не закрывается дверца", "Ошибки на дисплее"] },
  { icon: "Zap", color: "#2563EB", bg: "#EFF6FF", title: "Варочные панели", brands: "AEG, Hansa, Zanussi, Candy, Indesit, Hotpoint", list: ["Не включается конфорка", "Трещина на стеклокерамике", "Не реагирует сенсор", "Искрит или щёлкает", "Не держит мощность"] },
  { icon: "Settings", color: "#7C3AED", bg: "#F5F3FF", title: "Встроенная техника", brands: "Neff, Gaggenau, Franke, Kuppersberg, Krona", list: ["Встроенные духовки в гарнитуре", "Индукционные панели", "Пароварки и комби-печи", "Встроенные кофемашины", "Микроволновые печи"] },
];

export const whyItems = [
  { icon: "Timer", title: "Выезд в день обращения", desc: "Работаем ежедневно с 8:00 до 22:00. Звоните — приедем сегодня." },
  { icon: "Banknote", title: "Диагностика бесплатно", desc: "Определяем причину поломки без скрытых платежей." },
  { icon: "ShieldCheck", title: "Гарантия до 2 лет", desc: "Письменная гарантия на работы и запчасти." },
  { icon: "Package", title: "Запчасти в наличии", desc: "97% ремонтов закрываем за один визит." },
  { icon: "BadgeCheck", title: "Опыт 8 лет", desc: "Специализируемся только на духовых шкафах и варочных панелях." },
  { icon: "Wallet", title: "Цена — после диагностики", desc: "Называем точную цену до начала работ. Без доплат." },
];

export const steps = [
  { n: "1", icon: "PhoneCall", title: "Звоните", desc: "Расскажите о поломке — дадим предварительную оценку" },
  { n: "2", icon: "CalendarCheck", title: "Согласуем время", desc: "Выбираем удобный час, мастер приедет вовремя" },
  { n: "3", icon: "ScanSearch", title: "Диагностика", desc: "Бесплатно выявляем причину и называем точную цену" },
  { n: "4", icon: "Wrench", title: "Ремонт", desc: "Чиним при вас, используя только новые запчасти" },
  { n: "5", icon: "FileCheck", title: "Гарантия", desc: "Выдаём гарантийный талон с датой и печатью" },
];

export const reviews = [
  { name: "Елена М.", date: "март 2025", stars: 5, text: "Духовка Bosch не грела уже неделю. Мастер приехал через 2 часа, нашёл сгоревший тэн, заменил прямо на месте. Работает как новая!" },
  { name: "Игорь С.", date: "февраль 2025", stars: 5, text: "Варочная панель Siemens не реагировала на сенсор. Приехали на следующий день, починили за час. Дали гарантию год — всё отлично." },
  { name: "Наталья В.", date: "январь 2025", stars: 5, text: "Очень довольна! Звонила вечером, договорились на утро. Мастер пунктуальный, всё объяснил, цена не изменилась. Рекомендую!" },
];

export const guarantees = [
  { icon: "ShieldCheck", title: "2 года на запчасти", desc: "Оригинальные детали с документами от поставщика" },
  { icon: "Clock", title: "1 год на работу", desc: "Гарантийный срок на все выполненные работы" },
  { icon: "RefreshCw", title: "Бесплатный повтор", desc: "Та же поломка в гарантийный период — приедем бесплатно" },
  { icon: "FileText", title: "Письменный договор", desc: "Фиксируем всё: цену, работы, сроки и гарантию" },
];

export const NAV_LINKS: [string, string][] = [
  ["Услуги", "#services"],
  ["Почему мы", "#why"],
  ["Как работаем", "#steps"],
  ["Отзывы", "#reviews"],
  ["Контакты", "#contacts"],
];
