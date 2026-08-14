/* ============================================================
   НАСТРОЙКИ САЙТА
   Тексты в трёх языках: en / ru / it.
   Цены задаются ОДИН раз в долларах (price) — евро и рубли
   пересчитываются по курсам из блока currencies ниже.
   ============================================================ */
const CONFIG = {
  artistName: {
    en: "Elizaveta Fursova",
    ru: "Елизавета Фурсова",
    it: "Elizaveta Fursova",
  },
  tagline: {
    en: "Painting · Original art",
    ru: "Живопись · Оригинальные работы",
    it: "Pittura · Opere originali",
  },
  aboutGreeting: {
    en: "Welcome to my world of art!",
    ru: "Добро пожаловать в мой мир искусства!",
    it: "Benvenuti nel mio mondo dell'arte!",
  },
  about: {
    en: [
      "My name is Elizaveta, and I am delighted to immerse you in my unique vision.",
      "In my work, I explore the delicate boundary between the inner world of a human being and the elemental beauty that surrounds us. Through the azure glimmers of clear water, natural forms, the tenderness of flowers, and the fluid grace of the body, I create a space of absolute lightness and freedom. For me, the canvas becomes a portal not merely to self-discovery, but to returning to one's natural, primal state.",
      "My art is about trust in oneself, the ability to feel the moment with every cell of your being, to melt away any fears and doubts, and to reclaim your inner strength through softness, flow, and oneness with the elements.",
    ],
    ru: [
      "Меня зовут Елизавета, и я рада погрузить вас в моё уникальное видение.",
      "В своих работах я исследую тонкую границу между внутренним миром человека и стихийной красотой, которая нас окружает. Через лазурные блики чистой воды, природные формы, нежность цветов и текучую грацию тела я создаю пространство абсолютной лёгкости и свободы. Холст для меня становится порталом не просто к самопознанию, а к возвращению в своё естественное, первозданное состояние.",
      "Моё искусство — о доверии к себе, об умении чувствовать момент каждой клеточкой, растворять страхи и сомнения и возвращать внутреннюю силу через мягкость, поток и единение со стихией.",
    ],
    it: [
      "Mi chiamo Elizaveta e sono felice di immergervi nella mia visione unica.",
      "Nelle mie opere esploro il confine delicato tra il mondo interiore dell'essere umano e la bellezza elementare che ci circonda. Attraverso i riflessi azzurri dell'acqua limpida, le forme naturali, la tenerezza dei fiori e la grazia fluida del corpo, creo uno spazio di assoluta leggerezza e libertà. Per me la tela diventa un portale non solo verso la scoperta di sé, ma verso il ritorno al proprio stato naturale e primordiale.",
      "La mia arte parla di fiducia in se stessi, della capacità di sentire il momento con ogni cellula del proprio essere, di dissolvere paure e dubbi e di ritrovare la propria forza interiore attraverso morbidezza, flusso e unione con gli elementi.",
    ],
  },
  city: {
    en: "Minsk, Belarus",
    ru: "Минск, Беларусь",
    it: "Minsk, Bielorussia",
  },
  email: "elifejka@gmail.com",
  telegram: "elizafursova",      // арт-канал в Telegram
  instagram: "lisafursovaart",   // арт-страница в Instagram

  /* Валюты. rate — сколько единиц валюты в 1 долларе.
     Обновляйте курсы время от времени вручную. */
  currencies: [
    { code: "USD", symbol: "$",  rate: 1,    before: true  },
    { code: "BYN", symbol: "Br", rate: 3.30, before: false },
    { code: "EUR", symbol: "€",  rate: 0.90, before: true  },
  ],
};

/* ============================================================
   КАТЕГОРИИ (пока одна — живопись; принты добавим позже)
   ============================================================ */
const CATEGORIES = [
  { id: "painting", label: { en: "Painting", ru: "Живопись", it: "Pittura" } },
];

/* Материалы — чтобы не повторять переводы в каждой работе */
const MAT = {
  oil:     { en: "Oil on canvas",                   ru: "Холст, масло",          it: "Olio su tela" },
  acrylic: { en: "Acrylic on canvas",               ru: "Холст, акрил",          it: "Acrilico su tela" },
  gold:    { en: "Acrylic on canvas, gold leaf",    ru: "Холст, акрил, поталь",  it: "Acrilico su tela, foglia d'oro" },
};

/* ============================================================
   КАТАЛОГ
   Порядок в этом списке = порядок на сайте.
   price — цена в долларах; sold: true — работа продана
   (остаётся в архиве с плашкой, купить нельзя).
   ============================================================ */
const PRODUCTS = [
  { id: "p01", category: "painting", unique: true, price: 1100, size: "70 × 50 cm",  image: "images/works/01-natures-vitiligo.jpg",
    title: { en: "Nature's Vitiligo", ru: "Nature's Vitiligo", it: "Nature's Vitiligo" }, materials: MAT.oil, sold: false },
  { id: "p02", category: "painting", unique: true, price: 2000, size: "115 × 80 cm", image: "images/works/02-bond-of-lilies.jpg",
    title: { en: "Bond of Lilies", ru: "Bond of Lilies", it: "Bond of Lilies" }, materials: MAT.oil, sold: false },
  { id: "p03", category: "painting", unique: true, price: 1100, size: "60 × 50 cm",  image: "images/works/03-deep-breath.jpg",
    title: { en: "Deep Breath", ru: "Deep Breath", it: "Deep Breath" }, materials: MAT.oil, sold: false },
  { id: "p04", category: "painting", unique: true, price: 500,  size: "40 × 40 cm",  image: "images/works/04-aquamarine-dream.jpg",
    title: { en: "Aquamarine Dream", ru: "Aquamarine Dream", it: "Aquamarine Dream" }, materials: MAT.oil, sold: false },
  { id: "p05", category: "painting", unique: true, price: 500,  size: "40 × 40 cm",  image: "images/works/05-harmony.jpg",
    title: { en: "Harmony", ru: "Harmony", it: "Harmony" }, materials: MAT.oil, sold: false },
  { id: "p06", category: "painting", unique: true, price: 1500, size: "60 × 90 cm",  image: "images/works/06-aspiration.jpg",
    title: { en: "Aspiration", ru: "Aspiration", it: "Aspiration" }, materials: MAT.acrylic, sold: false },
  { id: "p07", category: "painting", unique: true, price: 400,  size: "30 × 24 cm",  image: "images/works/07-i-see-you.jpg",
    title: { en: "I See You", ru: "I See You", it: "I See You" }, materials: MAT.acrylic, sold: false },
  { id: "p08", category: "painting", unique: true, price: 500,  size: "40 × 30 cm",  image: "images/works/08-in-the-embrace-of-poppies.jpg",
    title: { en: "In the Embrace of Poppies", ru: "In the Embrace of Poppies", it: "In the Embrace of Poppies" }, materials: MAT.oil, sold: false },
  { id: "p09", category: "painting", unique: true, price: 1500, size: "90 × 60 cm",  image: "images/works/09-rebirth.jpg",
    title: { en: "Rebirth", ru: "Rebirth", it: "Rebirth" }, materials: MAT.gold, sold: false },
  { id: "p10", category: "painting", unique: true, price: 1500, size: "80 × 60 cm",  image: "images/works/10-contemplation.jpg",
    title: { en: "Contemplation", ru: "Contemplation", it: "Contemplation" }, materials: MAT.oil, sold: false },
  { id: "p11", category: "painting", unique: true, price: 1500, size: "70 × 60 cm",  image: "images/works/11-spark.jpg",
    title: { en: "Spark", ru: "Spark", it: "Spark" }, materials: MAT.oil, sold: false },
  { id: "p12", category: "painting", unique: true, price: 500,  size: "40 × 30 cm",  image: "images/works/12-sweet-pearl.jpg",
    title: { en: "Sweet Pearl", ru: "Sweet Pearl", it: "Sweet Pearl" }, materials: MAT.acrylic, sold: false },

  /* ---------- Проданные работы (архив) ---------- */
  { id: "p13", category: "painting", unique: true, price: 0, size: "80 × 60 cm", image: "images/works/13-immersion.jpg",
    title: { en: "Immersion", ru: "Immersion", it: "Immersion" }, materials: MAT.oil, sold: true },
  { id: "p14", category: "painting", unique: true, price: 0, size: "70 × 70 cm", image: "images/works/14-rhythm-of-the-sky.jpg",
    title: { en: "Rhythm of the Sky", ru: "Rhythm of the Sky", it: "Rhythm of the Sky" }, materials: MAT.acrylic, sold: true },
  { id: "p15", category: "painting", unique: true, price: 0, size: "30 × 20 cm", image: "images/works/15-cranes.jpg",
    title: { en: "Cranes", ru: "Cranes", it: "Cranes" }, materials: MAT.acrylic, sold: true },
  { id: "p16", category: "painting", unique: true, price: 0, size: "50 × 70 cm", image: "images/works/16-northern-lights.jpg",
    title: { en: "Northern Lights", ru: "Northern Lights", it: "Northern Lights" }, materials: MAT.acrylic, sold: true },
];

/* ============================================================
   ИНТЕРФЕЙСНЫЕ ТЕКСТЫ (меню, кнопки, подписи, корзина)
   ============================================================ */
const I18N = {
  en: {
    docTitle: "Elizaveta Fursova — original paintings",
    nav: { home: "Home", buy: "Buy art", prints: "Prints", about: "About", how: "How to order", contacts: "Contacts" },
    home: { cta: "View available works" },
    works: { title: "Buy art" },
    prints: { title: "Prints", soon: "Prints are coming soon — stay tuned." },
    about: { title: "About", based: "Based in" },
    how: {
      title: "How to order",
      steps: [
        { t: "Choose a piece", p: "Add paintings to your cart — or write to me directly if you have questions." },
        { t: "Place the order", p: "Fill in a short form in the cart — the order goes straight to the artist via Telegram or e-mail." },
        { t: "Payment & delivery", p: "I will get back to you within a day to arrange payment and shipping — worldwide." },
      ],
      payTitle: "Payment & shipping",
      pay: [
        "Card payment by secure link, bank transfer, or cash on personal pickup — we will agree on the most convenient option in the chat.",
        "For international orders — international bank transfer or another method agreed individually.",
        "A painting is reserved for you once the payment is confirmed; you will receive a confirmation and packing photos.",
        "Shipping worldwide with tracking and careful packaging. Delivery cost depends on the destination and is calculated before payment.",
      ],
    },
    contacts: { title: "Contacts", lead: "For commissions, collaborations or general inquiries, please get in touch." },
    footer: "All images are protected by copyright.",
    footerNav: { privacy: "Privacy policy", cookies: "Cookie preferences" },
    policy: {
      title: "Privacy policy",
      p1: "This website is the personal portfolio and online showcase of artist Elizaveta Fursova. It does not collect, store or process personal data on any server.",
      p2: "Orders are placed through Telegram or e-mail. Any information you share there (name, contact details, delivery address) is used only to arrange your order and is never passed to third parties.",
      p3: "The site is hosted on GitHub Pages. GitHub may log technical data (such as IP addresses) required to operate the service — see GitHub's privacy statement.",
      p4: "For any privacy questions, contact elifejka@gmail.com.",
      cookiesTitle: "Cookies",
      c1: "This site does not use tracking cookies or analytics.",
      c2: "Your browser's local storage keeps only your interface preferences (language, currency, theme) and cart contents. This data never leaves your device, and you can clear it at any time in your browser settings.",
    },
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
    docTitle: "Елизавета Фурсова — оригинальная живопись",
    nav: { home: "Главная", buy: "Купить картину", prints: "Принты", about: "Обо мне", how: "Как заказать", contacts: "Контакты" },
    home: { cta: "Смотреть работы в продаже" },
    works: { title: "Купить картину" },
    prints: { title: "Принты", soon: "Принты скоро появятся — следите за обновлениями." },
    about: { title: "Обо мне", based: "Живу и работаю —" },
    how: {
      title: "Как заказать",
      steps: [
        { t: "Выберите работу", p: "Добавьте картины в корзину — или напишите напрямую, если есть вопросы." },
        { t: "Оформите заказ", p: "Заполните короткую форму в корзине — заказ придёт художнице в Telegram или на почту." },
        { t: "Оплата и доставка", p: "Я свяжусь с вами в течение дня, обсудим оплату и удобный способ доставки — по всему миру." },
      ],
      payTitle: "Оплата и доставка",
      pay: [
        "Оплата картой по защищённой ссылке, банковским переводом или наличными при личной передаче — удобный вариант согласуем в переписке.",
        "Для зарубежных заказов — международный банковский перевод или другой способ по договорённости.",
        "Картина резервируется за вами после подтверждения оплаты; вы получите подтверждение и фото упаковки.",
        "Доставка по всему миру с трекингом и бережной упаковкой. Стоимость зависит от направления и рассчитывается до оплаты.",
      ],
    },
    contacts: { title: "Контакты", lead: "По вопросам заказных работ, сотрудничества и любым другим — напишите мне." },
    footer: "Все изображения защищены авторским правом.",
    footerNav: { privacy: "Политика конфиденциальности", cookies: "Настройки cookie" },
    policy: {
      title: "Политика конфиденциальности",
      p1: "Этот сайт — персональное портфолио и онлайн-витрина художницы Елизаветы Фурсовой. Сайт не собирает, не хранит и не обрабатывает персональные данные на сервере.",
      p2: "Заказы оформляются через Telegram или электронную почту. Данные, которыми вы делитесь там (имя, контакты, адрес доставки), используются только для оформления вашего заказа и не передаются третьим лицам.",
      p3: "Сайт размещён на GitHub Pages. GitHub может записывать технические данные (например, IP-адреса), необходимые для работы сервиса — см. заявление о конфиденциальности GitHub.",
      p4: "По любым вопросам о персональных данных пишите на elifejka@gmail.com.",
      cookiesTitle: "Cookies",
      c1: "Сайт не использует отслеживающие cookies и аналитику.",
      c2: "В локальном хранилище браузера сохраняются только ваши настройки интерфейса (язык, валюта, тема) и содержимое корзины. Эти данные не покидают ваше устройство; их можно удалить в настройках браузера в любой момент.",
    },
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
    docTitle: "Elizaveta Fursova — dipinti originali",
    nav: { home: "Home", buy: "Acquista arte", prints: "Stampe", about: "Chi sono", how: "Come ordinare", contacts: "Contatti" },
    home: { cta: "Guarda le opere disponibili" },
    works: { title: "Acquista arte" },
    prints: { title: "Stampe", soon: "Le stampe arriveranno presto — restate sintonizzati." },
    about: { title: "Chi sono", based: "Vivo e lavoro a" },
    how: {
      title: "Come ordinare",
      steps: [
        { t: "Scegli un'opera", p: "Aggiungi i quadri al carrello — oppure scrivimi direttamente se hai domande." },
        { t: "Invia l'ordine", p: "Compila un breve modulo nel carrello — l'ordine arriva all'artista via Telegram o e-mail." },
        { t: "Pagamento e consegna", p: "Ti risponderò entro un giorno per concordare pagamento e spedizione — in tutto il mondo." },
      ],
      payTitle: "Pagamento e spedizione",
      pay: [
        "Pagamento con carta tramite link sicuro, bonifico bancario o contanti alla consegna personale — concorderemo l'opzione più comoda in chat.",
        "Per gli ordini internazionali — bonifico internazionale o altro metodo concordato individualmente.",
        "Il quadro viene riservato dopo la conferma del pagamento; riceverete conferma e foto dell'imballaggio.",
        "Spedizione in tutto il mondo con tracciamento e imballaggio accurato. Il costo dipende dalla destinazione e viene calcolato prima del pagamento.",
      ],
    },
    contacts: { title: "Contatti", lead: "Per commissioni, collaborazioni o altre richieste, non esitate a contattarmi." },
    footer: "Tutte le immagini sono protette da copyright.",
    footerNav: { privacy: "Informativa sulla privacy", cookies: "Preferenze cookie" },
    policy: {
      title: "Informativa sulla privacy",
      p1: "Questo sito è il portfolio personale e la vetrina online dell'artista Elizaveta Fursova. Il sito non raccoglie, conserva né elabora dati personali su alcun server.",
      p2: "Gli ordini vengono effettuati tramite Telegram o e-mail. Le informazioni condivise (nome, contatti, indirizzo di consegna) vengono usate solo per gestire l'ordine e non vengono mai cedute a terzi.",
      p3: "Il sito è ospitato su GitHub Pages. GitHub può registrare dati tecnici (come gli indirizzi IP) necessari al funzionamento del servizio — si veda l'informativa sulla privacy di GitHub.",
      p4: "Per qualsiasi domanda sulla privacy: elifejka@gmail.com.",
      cookiesTitle: "Cookies",
      c1: "Questo sito non utilizza cookie di tracciamento né analytics.",
      c2: "La memoria locale del browser conserva solo le preferenze dell'interfaccia (lingua, valuta, tema) e il contenuto del carrello. Questi dati non lasciano mai il vostro dispositivo e possono essere cancellati in qualsiasi momento dalle impostazioni del browser.",
    },
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
