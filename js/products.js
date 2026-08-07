/* ============================================================
   НАСТРОЙКИ САЙТА
   Тексты в трёх языках: en / ru / it.
   Цены задаются ОДИН раз в евро (priceEUR) — доллары и рубли
   пересчитываются по курсам из блока currencies ниже.
   ============================================================ */
const CONFIG = {
  artistName: {
    en: "Elizaveta Fursova",
    ru: "Елизавета Фурсова",
    it: "Elizaveta Fursova",
  },
  tagline: {
    en: "Painting · Works on paper · Prints",
    ru: "Живопись · Графика · Принты",
    it: "Pittura · Opere su carta · Stampe",
  },
  about: {
    en: "I paint in oil and acrylic, inspired by the light of northern cities and the quiet life of everyday things. Every painting is one of a kind and signed by the artist. Prints are produced in limited, numbered editions on heavyweight archival paper.",
    ru: "Я пишу маслом и акрилом, вдохновляясь светом северных городов и тихой жизнью вещей. Каждая картина — единственный экземпляр, подписана автором. Принты печатаются ограниченным нумерованным тиражом на плотной архивной бумаге.",
    it: "Dipingo a olio e acrilico, ispirandomi alla luce delle città del nord e alla vita silenziosa delle cose. Ogni quadro è un pezzo unico, firmato dall'artista. Le stampe sono prodotte in edizioni limitate e numerate su carta d'archivio di alta grammatura.",
  },
  city: {
    en: "Minsk, Belarus",
    ru: "Минск, Беларусь",
    it: "Minsk, Bielorussia",
  },
  email: "artist@example.com",   // TODO: почта для заказов (пока заглушка)
  telegram: "elizafursova",      // арт-канал в Telegram
  instagram: "lisafursovaart",   // арт-страница в Instagram

  /* Валюты. rate — курс к евро (1 EUR = rate единиц валюты).
     Обновляйте курсы время от времени вручную. */
  currencies: [
    { code: "EUR", symbol: "€",  rate: 1,    before: true  },
    { code: "USD", symbol: "$",  rate: 1.15, before: true  },
    { code: "BYN", symbol: "Br", rate: 3.60, before: false },
  ],
};

/* ============================================================
   КАТЕГОРИИ
   Новый раздел портфолио = одна строка здесь.
   ============================================================ */
const CATEGORIES = [
  { id: "all",      label: { en: "All works",  ru: "Все работы", it: "Tutte le opere" } },
  { id: "painting", label: { en: "Paintings",  ru: "Картины",    it: "Quadri" } },
  { id: "print",    label: { en: "Prints",     ru: "Принты",     it: "Stampe" } },
  { id: "goods",    label: { en: "Objects",    ru: "Вещи",       it: "Oggetti" } },
];

/* ============================================================
   КАТАЛОГ
   unique: true  — работа в единственном экземпляре (картина):
                   в корзину можно положить только 1 штуку.
   sold: true    — продана (остаётся в галерее с пометкой).
   priceEUR      — цена в евро, остальные валюты считаются сами.
   ============================================================ */
const PRODUCTS = [
  {
    id: "p01",
    category: "painting",
    unique: true,
    priceEUR: 350,
    size: "50 × 70 cm",
    year: 2025,
    image: "images/work-01.svg",
    sold: false,
    title:       { en: "Morning on the River", ru: "Утро на Немиге", it: "Mattina sul fiume" },
    materials:   { en: "Oil on canvas", ru: "Холст, масло", it: "Olio su tela" },
    description: {
      en: "A city view in a warm morning palette. Stretched on a wooden frame, ready to hang.",
      ru: "Городской пейзаж в тёплой утренней гамме. На деревянном подрамнике, готова к развеске.",
      it: "Un paesaggio urbano in una calda tavolozza mattutina. Su telaio in legno, pronta da appendere.",
    },
  },
  {
    id: "p02",
    category: "painting",
    unique: true,
    priceEUR: 480,
    size: "60 × 80 cm",
    year: 2025,
    image: "images/work-02.svg",
    sold: false,
    title:       { en: "Still Water", ru: "Тихая вода", it: "Acqua calma" },
    materials:   { en: "Acrylic on canvas", ru: "Холст, акрил", it: "Acrilico su tela" },
    description: {
      en: "An abstract composition about stillness. Deep layered blues and greens with textured brushwork.",
      ru: "Абстрактная композиция о спокойствии. Глубокие сине-зелёные слои с фактурными мазками.",
      it: "Una composizione astratta sulla quiete. Profondi strati di blu e verde con pennellate materiche.",
    },
  },
  {
    id: "p03",
    category: "painting",
    unique: true,
    priceEUR: 320,
    size: "40 × 60 cm",
    year: 2024,
    image: "images/work-03.svg",
    sold: true,
    title:       { en: "Noon", ru: "Полдень", it: "Mezzogiorno" },
    materials:   { en: "Oil on canvas", ru: "Холст, масло", it: "Olio su tela" },
    description: {
      en: "A still life with fruit against the light. Warm glow, dense impasto painting.",
      ru: "Натюрморт с фруктами в контражуре. Тёплый свет, плотная пастозная живопись.",
      it: "Natura morta con frutta in controluce. Luce calda, pittura densa a impasto.",
    },
  },
  {
    id: "p04",
    category: "painting",
    unique: true,
    priceEUR: 240,
    size: "30 × 40 cm",
    year: 2024,
    image: "images/work-04.svg",
    sold: false,
    title:       { en: "Garden. Study II", ru: "Сад. Этюд II", it: "Giardino. Studio II" },
    materials:   { en: "Oil on board", ru: "Картон, масло", it: "Olio su cartone" },
    description: {
      en: "A plein-air study painted in a single session. Loose, quick, alive brushwork.",
      ru: "Пленэрный этюд, написанный за один сеанс. Живой, быстрый мазок.",
      it: "Uno studio en plein air dipinto in un'unica sessione. Pennellata rapida e viva.",
    },
  },
  {
    id: "p05",
    category: "print",
    unique: false,
    priceEUR: 45,
    size: "30 × 40 cm",
    year: 2025,
    image: "images/work-05.svg",
    sold: false,
    title:       { en: "City Lines — print", ru: "Принт «Линии города»", it: "Linee della città — stampa" },
    materials:   { en: "Giclée, 300 gsm archival paper", ru: "Жикле, архивная бумага 300 г/м²", it: "Giclée, carta d'archivio 300 g/m²" },
    description: {
      en: "Limited edition of 50, each print numbered and hand-signed. Archival pigment inks.",
      ru: "Лимитированный тираж 50 экземпляров, каждый пронумерован и подписан вручную. Архивные пигментные чернила.",
      it: "Edizione limitata di 50, ogni stampa numerata e firmata a mano. Inchiostri a pigmenti d'archivio.",
    },
  },
  {
    id: "p06",
    category: "print",
    unique: false,
    priceEUR: 40,
    size: "21 × 30 cm (A4)",
    year: 2025,
    image: "images/work-06.svg",
    sold: false,
    title:       { en: "The Wave — print", ru: "Принт «Волна»", it: "L'onda — stampa" },
    materials:   { en: "Giclée, 300 gsm archival paper", ru: "Жикле, архивная бумага 300 г/м²", it: "Giclée, carta d'archivio 300 g/m²" },
    description: {
      en: "Edition of 100, numbered and signed. Pairs beautifully with «City Lines».",
      ru: "Тираж 100 экземпляров, пронумерован и подписан. Отлично смотрится в паре с «Линиями города».",
      it: "Edizione di 100, numerata e firmata. Sta benissimo accanto a «Linee della città».",
    },
  },
  {
    id: "p07",
    category: "goods",
    unique: false,
    priceEUR: 18,
    size: "10 × 15 cm",
    year: 2025,
    image: "images/work-07.svg",
    sold: false,
    title:       { en: "Postcard set of 6", ru: "Открытки, набор из 6 шт.", it: "Set di 6 cartoline" },
    materials:   { en: "Designer cardstock", ru: "Дизайнерский картон", it: "Cartoncino di design" },
    description: {
      en: "Six postcards with reproductions of selected works, packed in a kraft envelope.",
      ru: "Шесть открыток с репродукциями избранных работ. Упакованы в крафтовый конверт.",
      it: "Sei cartoline con riproduzioni di opere selezionate, in una busta kraft.",
    },
  },
  {
    id: "p08",
    category: "goods",
    unique: false,
    priceEUR: 30,
    size: "38 × 42 cm",
    year: 2025,
    image: "images/work-08.svg",
    sold: false,
    title:       { en: "Tote bag «Noon»", ru: "Тоут-бэг «Полдень»", it: "Borsa tote «Mezzogiorno»" },
    materials:   { en: "100% cotton, screen print", ru: "Хлопок 100%, шелкография", it: "100% cotone, serigrafia" },
    description: {
      en: "A heavy cotton tote with an original print. Holds up to 10 kg, washable at 30°.",
      ru: "Плотная хлопковая сумка с авторским принтом. Выдерживает до 10 кг, можно стирать при 30°.",
      it: "Una tote in cotone pesante con stampa originale. Regge fino a 10 kg, lavabile a 30°.",
    },
  },
  {
    id: "p09",
    category: "goods",
    unique: false,
    priceEUR: 25,
    size: "A5, 80 sheets",
    year: 2025,
    image: "images/work-09.svg",
    sold: false,
    title:       { en: "Sketchbook with artist cover", ru: "Скетчбук с авторской обложкой", it: "Sketchbook con copertina d'autore" },
    materials:   { en: "120 gsm paper", ru: "Бумага 120 г/м²", it: "Carta 120 g/m²" },
    description: {
      en: "A spiral sketchbook with a reproduction cover. Paper suits graphite, ink and light watercolour.",
      ru: "Скетчбук на пружине с обложкой-репродукцией. Бумага подходит для графики и лёгкой акварели.",
      it: "Uno sketchbook a spirale con copertina-riproduzione. Carta adatta a grafite, inchiostro e acquerello leggero.",
    },
  },
];

/* ============================================================
   ИНТЕРФЕЙСНЫЕ ТЕКСТЫ (кнопки, подписи, шаги, корзина)
   ============================================================ */
const I18N = {
  en: {
    docTitle: "Elizaveta Fursova — paintings, prints & objects",
    nav: { works: "Works", about: "About", how: "How to order", contacts: "Contact" },
    hero: {
      l1: "Art that",
      l2: "lives <em>beside</em>",
      l3: "you",
      sub: "Original paintings, limited edition prints and artist-made objects. Every piece is signed by the artist.",
      cta: "View works",
      view: "View",
      scroll: "Scroll",
    },
    marquee: "Original paintings — one of a kind · Limited edition prints, numbered & signed · Worldwide shipping · ",
    works: { title: "Works" },
    about: { title: "About the artist", based: "Based in" },
    how: {
      title: "How to order",
      steps: [
        { t: "Choose a piece", p: "Add paintings, prints or objects to your cart — or write to me directly if you have questions." },
        { t: "Place the order", p: "Fill in a short form in the cart — the order goes straight to the artist via Telegram or e-mail." },
        { t: "Payment & delivery", p: "I will get back to you within a day to arrange payment and shipping — across Belarus and worldwide." },
      ],
    },
    contacts: { title: "Contact", lead: "For purchases, commissions and collaborations:" },
    footer: "All images are protected by copyright.",
    card: { sold: "Sold", soldPrice: "In a private collection", unique: "1 of 1" },
    modal: { add: "Add to cart", sold: "Sold", unique: "Unique work — exists in a single copy" },
    cart: {
      title: "Cart", empty: "Your cart is empty", total: "Total:",
      name: "Your name", contact: "Telegram, phone or e-mail", comment: "Order notes (optional)",
      sendTg: "Send order via Telegram", sendMail: "Send by e-mail",
      hint: "The button copies your order text and opens the chat — just paste and send.",
      uniqueNote: "unique · 1 of 1",
    },
    toast: {
      added: "Added to cart",
      copied: "Order copied — paste it into the chat",
      copyFail: "Open the chat and describe your order",
      uniqueMax: "This is a one-of-a-kind work — only one available",
    },
    order: { greeting: "Hello! I would like to place an order:", total: "Total", name: "Name", contact: "Contact", comment: "Notes", pcs: "pcs" },
  },

  ru: {
    docTitle: "Елизавета Фурсова — картины, принты и авторские вещи",
    nav: { works: "Работы", about: "О художнице", how: "Как заказать", contacts: "Контакты" },
    hero: {
      l1: "Искусство,",
      l2: "которое <em>живёт</em>",
      l3: "рядом",
      sub: "Оригинальные картины, лимитированные принты и авторские вещи. Каждая работа подписана художницей.",
      cta: "Смотреть работы",
      view: "Смотреть",
      scroll: "Листайте",
    },
    marquee: "Оригинальные картины — в единственном экземпляре · Лимитированные принты с номером и подписью · Доставка по всему миру · ",
    works: { title: "Работы" },
    about: { title: "О художнице", based: "Живу и работаю —" },
    how: {
      title: "Как заказать",
      steps: [
        { t: "Выберите работу", p: "Добавьте картины, принты или вещи в корзину — или напишите напрямую, если есть вопросы." },
        { t: "Оформите заказ", p: "Заполните короткую форму в корзине — заказ придёт художнице в Telegram или на почту." },
        { t: "Оплата и доставка", p: "Я свяжусь с вами в течение дня, обсудим оплату и удобный способ доставки — по Беларуси и миру." },
      ],
    },
    contacts: { title: "Контакты", lead: "По вопросам покупки, заказных работ и сотрудничества:" },
    footer: "Все изображения защищены авторским правом.",
    card: { sold: "Продано", soldPrice: "В частной коллекции", unique: "1 из 1" },
    modal: { add: "В корзину", sold: "Продано", unique: "Уникальная работа — существует в единственном экземпляре" },
    cart: {
      title: "Корзина", empty: "Корзина пока пуста", total: "Итого:",
      name: "Ваше имя", contact: "Telegram, телефон или e-mail", comment: "Комментарий к заказу (необязательно)",
      sendTg: "Отправить заказ в Telegram", sendMail: "Отправить на почту",
      hint: "Кнопка скопирует текст заказа и откроет чат — просто вставьте и отправьте.",
      uniqueNote: "уникальная · 1 из 1",
    },
    toast: {
      added: "Добавлено в корзину",
      copied: "Заказ скопирован — вставьте его в чат",
      copyFail: "Откройте чат и опишите заказ",
      uniqueMax: "Это единственный экземпляр — доступна только одна штука",
    },
    order: { greeting: "Здравствуйте! Хочу оформить заказ:", total: "Итого", name: "Имя", contact: "Связь", comment: "Комментарий", pcs: "шт." },
  },

  it: {
    docTitle: "Elizaveta Fursova — quadri, stampe e oggetti d'autore",
    nav: { works: "Opere", about: "L'artista", how: "Come ordinare", contacts: "Contatti" },
    hero: {
      l1: "L'arte che",
      l2: "vive <em>accanto</em>",
      l3: "a te",
      sub: "Quadri originali, stampe in edizione limitata e oggetti d'autore. Ogni opera è firmata dall'artista.",
      cta: "Guarda le opere",
      view: "Vedi",
      scroll: "Scorri",
    },
    marquee: "Quadri originali — pezzi unici · Stampe in edizione limitata, numerate e firmate · Spedizione in tutto il mondo · ",
    works: { title: "Opere" },
    about: { title: "L'artista", based: "Vivo e lavoro a" },
    how: {
      title: "Come ordinare",
      steps: [
        { t: "Scegli un'opera", p: "Aggiungi quadri, stampe o oggetti al carrello — oppure scrivimi direttamente se hai domande." },
        { t: "Invia l'ordine", p: "Compila un breve modulo nel carrello — l'ordine arriva all'artista via Telegram o e-mail." },
        { t: "Pagamento e consegna", p: "Ti risponderò entro un giorno per concordare pagamento e spedizione — in tutto il mondo." },
      ],
    },
    contacts: { title: "Contatti", lead: "Per acquisti, opere su commissione e collaborazioni:" },
    footer: "Tutte le immagini sono protette da copyright.",
    card: { sold: "Venduto", soldPrice: "In collezione privata", unique: "1 di 1" },
    modal: { add: "Aggiungi al carrello", sold: "Venduto", unique: "Opera unica — esiste in un solo esemplare" },
    cart: {
      title: "Carrello", empty: "Il carrello è vuoto", total: "Totale:",
      name: "Il tuo nome", contact: "Telegram, telefono o e-mail", comment: "Note sull'ordine (facoltativo)",
      sendTg: "Invia l'ordine su Telegram", sendMail: "Invia per e-mail",
      hint: "Il pulsante copia il testo dell'ordine e apre la chat — incolla e invia.",
      uniqueNote: "unica · 1 di 1",
    },
    toast: {
      added: "Aggiunto al carrello",
      copied: "Ordine copiato — incollalo nella chat",
      copyFail: "Apri la chat e descrivi il tuo ordine",
      uniqueMax: "È un pezzo unico — disponibile in un solo esemplare",
    },
    order: { greeting: "Salve! Vorrei effettuare un ordine:", total: "Totale", name: "Nome", contact: "Contatto", comment: "Note", pcs: "pz" },
  },
};
