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
  telegram: "elifejka",          // личные сообщения в Telegram — сюда приходят заказы
  telegramChannel: "elizafursova", // арт-канал — показывается на странице контактов
  instagram: "lisafursovaart",   // арт-страница в Instagram

  /* WhatsApp — основной мессенджер в Европе. Номер в международном формате
     без плюса и пробелов. Если очистить — кнопки WhatsApp исчезнут с сайта. */
  whatsapp: "375297785701",

  /* Ключ сервиса Web3Forms — заказы с формы уходят письмом на почту.
     Если очистить — кнопка «Отправить заказ» будет открывать WhatsApp
     с готовым текстом заказа. */
  web3formsKey: "451854cb-9ec7-4426-9a58-084b500516cd",

  /* Данные продавца для страницы «Условия продажи».
     По ст. 8 Закона «О защите прав потребителей» физлицу достаточно ФИО.
     ВПИШИТЕ ОТЧЕСТВО в legalName.ru — закон требует ФИО полностью.
     legalUnp можно оставить пустым: показывается, только если заполнен. */
  legalName: {
    en: "Elizaveta Fursova",
    ru: "Фурсова Елизавета Андреевна",
    it: "Elizaveta Fursova",
  },
  legalUnp: "AE7325890",

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
  watercolor: { en: "Watercolour on paper",         ru: "Бумага, акварель",      it: "Acquerello su carta" },
};

/* ============================================================
   КАТАЛОГ
   Порядок в этом списке = порядок на сайте.
   price — цена в долларах; sold: true — работа продана.
   image — главное фото; extra — дополнительные ракурсы (листаются
   стрелками); noZoom — кадры, которые НЕЛЬЗЯ приближать
   (интерьерные визуализации); contain: true — картинка с прозрачным
   фоном (круглые работы), показывается целиком без обрезки;
   quote — авторская подпись-описание в карточке.
   ============================================================ */
const W = "images/works/";
const PRODUCTS = [
  { id: "p01", category: "painting", unique: true, price: 1500, size: "70 × 50 cm",  image: W + "01-natures-vitiligo.jpg",
    extra: [W + "01-natures-vitiligo_2.jpg", W + "01-natures-vitiligo_3.jpg", W + "01-natures-vitiligo_4.jpg"],
    title: { en: "Nature's Vitiligo", ru: "Nature's Vitiligo", it: "Nature's Vitiligo" }, materials: MAT.oil, sold: false,
    quote: {
      en: "On the power and uniqueness found in chance. On the rich diversity within us all, and loving oneself unconditionally as a piece of a larger whole. Nature loves us unconditionally.",
      ru: "О силе и уникальности случайного. О богатом разнообразии внутри каждого из нас и о безусловной любви к себе — как к части большого целого. Природа любит нас безусловно.",
      it: "Sulla forza e l'unicità del caso. Sulla ricca diversità dentro ognuno di noi e sull'amarsi incondizionatamente come parte di un tutto più grande. La natura ci ama incondizionatamente." } },
  { id: "p02", category: "painting", unique: true, price: 2000, size: "115 × 80 cm", image: W + "02-bond-of-lilies.jpg",
    extra: [W + "02-bond-of-lilies_2.jpg", W + "02-bond-of-lilies_3.jpg", W + "02-bond-of-lilies_4.jpg"],
    title: { en: "Bond of Lilies", ru: "Bond of Lilies", it: "Bond of Lilies" }, materials: MAT.oil, sold: false,
    quote: {
      en: "This artwork is about the ability to hear your inner voice through touch. About vulnerability and strength coexisting. About allowing yourself to feel the full spectrum of emotions and desires.",
      ru: "Эта работа — об умении слышать свой внутренний голос через прикосновение. О том, как уязвимость и сила существуют рядом. О разрешении себе чувствовать весь спектр эмоций и желаний.",
      it: "Quest'opera parla della capacità di ascoltare la propria voce interiore attraverso il tatto. Della vulnerabilità e della forza che convivono. Del permettersi di sentire l'intero spettro di emozioni e desideri." } },
  { id: "p03", category: "painting", unique: true, price: 1100, size: "60 × 50 cm",  image: W + "03-deep-breath.jpg",
    extra: [W + "03-deep-breath_2.jpg"],
    title: { en: "Deep Breath", ru: "Deep Breath", it: "Deep Breath" }, materials: MAT.oil, sold: false,
    quote: {
      en: "The ribs and spine act not merely as a skeleton, but as the soil from which human emotional depth, vulnerability, and beauty grow.",
      ru: "Рёбра и позвоночник здесь — не просто скелет, а почва, из которой растут эмоциональная глубина, уязвимость и красота человека.",
      it: "Le costole e la colonna vertebrale non sono soltanto uno scheletro, ma il suolo da cui crescono la profondità emotiva, la vulnerabilità e la bellezza dell'essere umano." } },
  { id: "p04", category: "painting", unique: true, price: 500,  size: "40 × 40 cm",  image: W + "04-aquamarine-dream.jpg",
    extra: [W + "04-aquamarine-dream_2.jpg", W + "04-aquamarine-dream_3.jpg"],
    title: { en: "Aquamarine Dream", ru: "Aquamarine Dream", it: "Aquamarine Dream" }, materials: MAT.oil, sold: false,
    quote: {
      en: "They say you can watch water forever. Rich turquoise and aquamarine shades draw the artwork toward aesthetic hypnosis.",
      ru: "Говорят, на воду можно смотреть бесконечно. Насыщенные бирюзовые и аквамариновые оттенки погружают работу в эстетический гипноз.",
      it: "Dicono che si possa guardare l'acqua all'infinito. Le intense sfumature turchesi e acquamarina conducono l'opera verso un'ipnosi estetica." } },
  { id: "p23", category: "painting", unique: true, price: 1200, size: "60 × 70 cm",  image: W + "23-dreams-of-madeira.jpg",
    extra: [W + "23-dreams-of-madeira_2.jpg", W + "23-dreams-of-madeira_3.jpg"],
    noZoom: [W + "23-dreams-of-madeira_3.jpg"],
    title: { en: "Dreams of Madeira", ru: "Dreams of Madeira", it: "Dreams of Madeira" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "I haven't been to Madeira yet, but I know I will be there one day. A painting carrying the spirit of freedom, the wind, and deep emotion.",
      ru: "Я ещё не была на Мадейре, но знаю, что однажды окажусь там. Картина, несущая в себе дух свободы, ветра и глубокого чувства.",
      it: "Non sono ancora stata a Madeira, ma so che un giorno ci sarò. Un dipinto che porta con sé lo spirito della libertà, del vento e di un'emozione profonda." } },
  { id: "p05", category: "painting", unique: true, price: 500,  size: "40 × 40 cm",  image: W + "05-harmony.jpg",
    extra: [W + "05-harmony_2.jpg"],
    title: { en: "Harmony", ru: "Harmony", it: "Harmony" }, materials: MAT.oil, sold: false,
    quote: {
      en: "The unseen presence of a person. A fleeting stay inscribed into the eternal rhythm of nature.",
      ru: "Незримое присутствие человека. Мимолётное пребывание, вписанное в вечный ритм природы.",
      it: "La presenza invisibile dell'uomo. Una permanenza fugace inscritta nel ritmo eterno della natura." } },
  { id: "p06", category: "painting", unique: true, price: 1500, size: "60 × 90 cm",  image: W + "06-aspiration.jpg",
    extra: [W + "06-aspiration_2.jpg", W + "06-aspiration_3.jpg", W + "06-aspiration_4.jpg"],
    noZoom: [W + "06-aspiration_4.jpg"],
    title: { en: "Aspiration", ru: "Aspiration", it: "Aspiration" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "Some souls will always strive to be together, even if they currently belong to different worlds. Nothing can stop true longing.",
      ru: "Некоторые души всегда будут стремиться быть вместе, даже если сейчас они принадлежат разным мирам. Ничто не остановит истинное стремление.",
      it: "Alcune anime cercheranno sempre di stare insieme, anche se al momento appartengono a mondi diversi. Nulla può fermare un vero desiderio." } },
  { id: "p07", category: "painting", unique: true, price: 500,  size: "30 × 24 cm",  image: W + "07-i-see-you.jpg",
    title: { en: "I See You", ru: "I See You", it: "I See You" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "Sometimes I paint people's energies even before they knock on my door and bring significant changes to my life. I am truly grateful for these events. It helps me believe more in myself and my creative power of attraction.",
      ru: "Иногда я пишу энергии людей ещё до того, как они постучатся в мою дверь и принесут значимые перемены в мою жизнь. Я по-настоящему благодарна этим событиям: они помогают мне сильнее верить в себя и в творческую силу притяжения.",
      it: "A volte dipingo le energie delle persone ancora prima che bussino alla mia porta portando cambiamenti importanti nella mia vita. Sono davvero grata per questi eventi: mi aiutano a credere di più in me stessa e nel potere creativo dell'attrazione." } },
  { id: "p08", category: "painting", unique: true, price: 500,  size: "40 × 30 cm",  image: W + "08-in-the-embrace-of-poppies.jpg",
    title: { en: "In the Embrace of Poppies", ru: "In the Embrace of Poppies", it: "In the Embrace of Poppies" }, materials: MAT.oil, sold: false,
    quote: {
      en: "The silence and embrace of poppies.",
      ru: "Тишина и объятия маков.",
      it: "Il silenzio e l'abbraccio dei papaveri." } },
  { id: "p09", category: "painting", unique: true, price: 1500, size: "90 × 60 cm",  image: W + "09-rebirth.jpg",
    extra: [W + "09-rebirth_2.jpg", W + "09-rebirth_3.jpg", W + "09-rebirth_4.jpg", W + "09-rebirth_5.jpg"],
    noZoom: [W + "09-rebirth_5.jpg"],
    title: { en: "Rebirth", ru: "Rebirth", it: "Rebirth" }, materials: MAT.gold, sold: false,
    quote: {
      en: "If you believe that a painting is just a painting — a random mix of paint spots — you are wrong. Sometimes paintings act as portals. How you choose to use it is another question entirely; you dictate the rules. I simply create the fertile ground.",
      ru: "Если ты думаешь, что картина — это просто картина, случайное сочетание пятен краски, ты ошибаешься. Иногда картины становятся порталами. Как ты этим воспользуешься — уже другой вопрос: правила диктуешь ты. Я лишь создаю благодатную почву.",
      it: "Se credi che un dipinto sia solo un dipinto — una combinazione casuale di macchie di colore — ti sbagli. A volte i dipinti diventano portali. Come sceglierai di usarlo è un'altra questione: le regole le detti tu. Io creo soltanto il terreno fertile." } },
  { id: "p10", category: "painting", unique: true, price: 1500, size: "80 × 60 cm",  image: W + "10-contemplation.jpg",
    title: { en: "Contemplation", ru: "Contemplation", it: "Contemplation" }, materials: MAT.oil, sold: false,
    quote: {
      en: "A real taste for life awakens when you can pause in the present moment and simply begin to contemplate it. Casting off the clutter of your thoughts, you begin to feel your body and the surrounding space vibrate as one. It is a divine moment within everyone's reach. Just remember who you truly are.",
      ru: "Настоящий вкус к жизни просыпается, когда умеешь остановиться в настоящем мгновении и просто начать его созерцать. Сбросив шелуху мыслей, начинаешь чувствовать, как тело и окружающее пространство вибрируют в унисон. Это божественный момент, доступный каждому. Просто вспомни, кто ты на самом деле.",
      it: "Il vero gusto della vita si risveglia quando sai fermarti nel momento presente e cominciare semplicemente a contemplarlo. Liberandoti dal rumore dei pensieri, inizi a sentire il corpo e lo spazio intorno vibrare all'unisono. È un momento divino alla portata di tutti. Ricorda soltanto chi sei veramente." } },
  { id: "p11", category: "painting", unique: true, price: 1500, size: "70 × 60 cm",  image: W + "11-spark.jpg",
    extra: [W + "11-spark_2.jpg", W + "11-spark_3.jpg", W + "11-spark_4.jpg"],
    noZoom: [W + "11-spark_4.jpg"],
    title: { en: "Spark", ru: "Spark", it: "Spark" }, materials: MAT.oil, sold: false,
    quote: {
      en: "Sometimes all it takes for others to feel your power is to look into your eyes. And within those eyes, you can trace everything, right down to the creation of the universe. Few people possess such strength. But you can only recognize them if you carry that same part, that code, inside yourself.",
      ru: "Иногда, чтобы другие почувствовали твою силу, достаточно посмотреть им в глаза. А в этих глазах можно проследить всё — вплоть до сотворения Вселенной. Немногие обладают такой силой. Но узнать их можно, лишь если носишь ту же частицу, тот же код, в себе.",
      it: "A volte, perché gli altri sentano la tua forza, basta guardarli negli occhi. E in quegli occhi si può rintracciare tutto, fino alla creazione dell'universo. Poche persone possiedono una tale forza. Ma puoi riconoscerle solo se porti dentro di te quella stessa parte, quello stesso codice." } },
  { id: "p12", category: "painting", unique: true, price: 500,  size: "40 × 30 cm",  image: W + "12-sweet-pearl.jpg",
    extra: [W + "12-sweet-pearl_2.jpg"],
    title: { en: "Sweet Pearl", ru: "Sweet Pearl", it: "Sweet Pearl" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "If I give in to temptation, then I am right where I want to be.",
      ru: "Если я поддаюсь искушению — значит, я именно там, где хочу быть.",
      it: "Se cedo alla tentazione, sono esattamente dove voglio essere." } },

  /* ---------- Новые работы ---------- */
  { id: "p17", category: "painting", unique: true, price: 500, size: "30 × 42 cm", image: W + "17-ethereal-touch.jpg",
    extra: [W + "17-ethereal-touch_2.jpg"],
    title: { en: "Ethereal Touch", ru: "Ethereal Touch", it: "Ethereal Touch" }, materials: MAT.watercolor, sold: false,
    quote: {
      en: "Love in every accidental drip.",
      ru: "Любовь в каждой случайной капле.",
      it: "Amore in ogni goccia accidentale." } },
  { id: "p18", category: "painting", unique: true, price: 700, size: "⌀ 40 cm", image: W + "18-perceptive-portal.png", contain: true,
    extra: [W + "18-perceptive-portal_2.jpg", W + "18-perceptive-portal_3.jpg", W + "18-perceptive-portal_4.jpg"],
    noZoom: [W + "18-perceptive-portal_4.jpg"],
    title: { en: "Perceptive Portal", ru: "Perceptive Portal", it: "Perceptive Portal" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "The flowers admire you just as much as you admire them.",
      ru: "Цветы любуются тобой так же, как ты любуешься ими.",
      it: "I fiori ti ammirano proprio come tu ammiri loro." } },
  { id: "p19", category: "painting", unique: true, price: 750, size: "60 × 60 cm", image: W + "19-serpents-lily.jpg",
    extra: [W + "19-serpents-lily_2.jpg"],
    title: { en: "Serpent's Lily", ru: "Serpent's Lily", it: "Serpent's Lily" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "When you return to your medieval castle, you will remember how deeply you loved lilies.",
      ru: "Когда ты вернёшься в свой средневековый замок, ты вспомнишь, как сильно любила лилии.",
      it: "Quando tornerai nel tuo castello medievale, ricorderai quanto amavi i gigli." } },
  { id: "p20", category: "painting", unique: true, price: 750, size: "⌀ 50 cm", image: W + "20-transcendental-garden.png", contain: true,
    extra: [W + "20-transcendental-garden_2.jpg", W + "20-transcendental-garden_3.jpg", W + "20-transcendental-garden_4.jpg", W + "20-transcendental-garden_5.jpg"],
    noZoom: [W + "20-transcendental-garden_5.jpg"],
    title: { en: "Transcendental Garden", ru: "Transcendental Garden", it: "Transcendental Garden" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "The touch of flowers like a silent dialogue.",
      ru: "Прикосновение цветов — как безмолвный диалог.",
      it: "Il tocco dei fiori come un dialogo silenzioso." } },
  { id: "p21", category: "painting", unique: true, price: 550, size: "40 × 40 cm", image: W + "21-together.jpg",
    extra: [W + "21-together_2.jpg", W + "21-together_3.jpg"],
    title: { en: "Together", ru: "Together", it: "Together" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "Sure, I can sail through life on my own, but I'm better off with you.",
      ru: "Конечно, я могу плыть по жизни и одна, но с тобой мне лучше.",
      it: "Certo, posso navigare la vita da sola, ma con te sto meglio." } },
  { id: "p22", category: "painting", unique: true, price: 1200, size: "80 × 60 cm", image: W + "22-between-worlds.jpg",
    extra: [W + "22-between-worlds_2.jpg", W + "22-between-worlds_3.jpg"],
    noZoom: [W + "22-between-worlds_3.jpg"],
    title: { en: "Between Worlds", ru: "Between Worlds", it: "Between Worlds" }, materials: MAT.acrylic, sold: false,
    quote: {
      en: "The composition centers on a flight of white cranes, yet this natural harmony is deliberately fractured, as if disintegrating under the impact of deep, dark vertical voids. These bands create an effect of “digital noise” or a screen through which we glimpse an elusive moment. The snow-white birds symbolize a pure, primordial essence attempting to push through the modern world's strict structure.",
      ru: "В центре композиции — полёт белых журавлей, но эта природная гармония намеренно расколота, словно распадается под ударами глубоких тёмных вертикальных пустот. Эти полосы создают эффект «цифрового шума», экрана, сквозь который мы улавливаем ускользающее мгновение. Белоснежные птицы — символ чистой, первозданной сущности, пытающейся пробиться сквозь жёсткую структуру современного мира.",
      it: "Al centro della composizione c'è il volo di gru bianche, ma questa armonia naturale è deliberatamente spezzata, come se si disgregasse sotto l'impatto di profondi vuoti verticali scuri. Queste bande creano un effetto di «rumore digitale», uno schermo attraverso cui intravediamo un attimo sfuggente. Gli uccelli candidi simboleggiano un'essenza pura e primordiale che cerca di farsi strada attraverso la rigida struttura del mondo moderno." } },

  /* ---------- Проданные работы (архив) ---------- */
  { id: "p13", category: "painting", unique: true, price: 0, size: "80 × 60 cm", image: W + "13-immersion.jpg",
    extra: [W + "13-immersion_2.jpg", W + "13-immersion_3.jpg", W + "13-immersion_4.jpg", W + "13-immersion_5.jpg", W + "13-immersion_6.jpg"],
    noZoom: [W + "13-immersion_6.jpg"],
    title: { en: "Immersion", ru: "Immersion", it: "Immersion" }, materials: MAT.oil, sold: true,
    quote: {
      en: "I am ready to immerse you in my world and guide you there. Just say that you want it too.",
      ru: "Я готова погрузить тебя в свой мир и провести по нему. Просто скажи, что ты тоже этого хочешь.",
      it: "Sono pronta a immergerti nel mio mondo e a guidarti. Dimmi solo che lo desideri anche tu." } },
  { id: "p14", category: "painting", unique: true, price: 0, size: "⌀ 70 cm", image: W + "14-rhythm-of-the-sky.png", contain: true,
    extra: [W + "14-rhythm-of-the-sky_2.jpg", W + "14-rhythm-of-the-sky_3.jpg", W + "14-rhythm-of-the-sky_4.jpg", W + "14-rhythm-of-the-sky_5.jpg"],
    noZoom: [W + "14-rhythm-of-the-sky_5.jpg"],
    title: { en: "Rhythm of the Sky", ru: "Rhythm of the Sky", it: "Rhythm of the Sky" }, materials: MAT.acrylic, sold: true,
    quote: {
      en: "A symbol of freedom, lightness, and boundlessness. This is how I see the trinity.",
      ru: "Символ свободы, лёгкости и безграничности. Такой я вижу троицу.",
      it: "Un simbolo di libertà, leggerezza e sconfinatezza. Così vedo la trinità." } },
  { id: "p15", category: "painting", unique: true, price: 0, size: "30 × 20 cm", image: W + "15-cranes.jpg",
    title: { en: "Cranes", ru: "Cranes", it: "Cranes" }, materials: MAT.acrylic, sold: true,
    quote: {
      en: "Free flight in infinite space.",
      ru: "Свободный полёт в бесконечном пространстве.",
      it: "Volo libero nello spazio infinito." } },
  { id: "p16", category: "painting", unique: true, price: 0, size: "50 × 70 cm", image: W + "16-northern-lights.jpg",
    extra: [W + "16-northern-lights_2.jpg"],
    title: { en: "Northern Lights", ru: "Northern Lights", it: "Northern Lights" }, materials: MAT.acrylic, sold: true,
    quote: {
      en: "I will let you shine even brighter by my side. I will never betray your light.",
      ru: "Рядом со мной ты будешь сиять ещё ярче. Я никогда не предам твой свет.",
      it: "Accanto a me brillerai ancora più forte. Non tradirò mai la tua luce." } },
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
        { t: "Choose a piece", p: "Browse the gallery and open a painting — inside you will find all photos, details and the price with shipping included." },
        { t: "Send the order", p: "Fill in the short form in the cart — the order goes straight to the artist. Or, if it is easier, write via WhatsApp, Instagram or Telegram." },
        { t: "Payment & delivery", p: "Within a day I confirm the order and send you a personal secure card-payment link (bePaid). After the payment I pack the work carefully and ship it worldwide with tracking — shipping is already included in the price." },
      ],
      payTitle: "Payment & shipping",
      pay: [
        "Pay by card online — Visa, Mastercard, Belkart, Mir, Google Pay or Samsung Pay — via a personal secure bePaid payment link that I send you once the order is confirmed. Your card details never reach us; the charge is made in Belarusian rubles (BYN), your bank converts the amount automatically.",
        "For buyers in Belarus — also via the ERIP system: Sistema «Raschet» (ERIP) → E-POS service → E-POS — payment for goods and services, account number 42674-1-X, where X is your order number (we will tell you the number when confirming the order).",
        "An international bank transfer or another individually agreed method is also possible.",
        "A painting is reserved for you once the payment is confirmed; you will receive a confirmation and packing photos.",
        "Shipping worldwide with tracking and careful packaging — already included in the price.",
      ],
    },
    contacts: { title: "Contacts", lead: "For commissions, collaborations or general inquiries, please get in touch." },
    footer: "All images are protected by copyright.",
    footerNav: { privacy: "Privacy policy", cookies: "Cookie preferences", terms: "Terms of sale" },
    terms: {
      title: "Terms of sale",
      s1t: "Seller",
      s1: [
        "The seller is a private individual creating and selling original paintings.",
        "Contact: {email} · Telegram @{telegram}",
      ],
      s2t: "About the works",
      s2: [
        "Every work is an original hand-made painting and exists in a single copy. Size, materials and technique are stated on each work's page.",
        "Colours on your screen may differ slightly from the original — this is normal for photographs of paintings.",
        "The works are sold without documents certifying their quality and safety.",
      ],
      s3t: "Placing an order",
      s3: [
        "The catalogue on this site is an offer to buy a work. An order is placed through the form on the site, WhatsApp, Instagram, Telegram or e-mail, and the agreement is concluded once the artist confirms it.",
        "The price of the work is shown on its page and includes worldwide shipping. The delivery time is confirmed to you before payment.",
      ],
      s4t: "Returns",
      s4: [
        "A work bought remotely may be returned within 14 days of delivery, provided it has not been used, its appearance and properties are intact, and the original packaging is kept.",
        "To arrange a return, write to {email}. Return shipping is paid by the buyer. The money is refunded within 7 days of the work coming back.",
        "Works created to individual order — a portrait, or a subject or size chosen by you — cannot be returned or exchanged. You are informed of this before the order is confirmed.",
      ],
      s5t: "Copyright",
      s5: [
        "Buying a work transfers ownership of the original. Copyright remains with the artist: reproduction, printing and any commercial use of the images require her written permission.",
      ],
    },
    policy: {
      title: "Privacy policy",
      p1: "This website is the personal portfolio and online showcase of artist Elizaveta Fursova. It does not collect, store or process personal data on any server.",
      p2: "Orders are placed through Telegram or e-mail. Any information you share there (name, contact details, delivery address) is used only to arrange your order and is never passed to third parties.",
      p3: "Your data is kept only as long as needed to complete the order and to meet accounting obligations, and is never used for advertising or passed to anyone else. You may at any time ask what data is held about you, have it corrected, or have it deleted — just write to the address below.",
      p4: "The site is hosted on GitHub Pages (USA). GitHub may log technical data such as IP addresses, which is required to deliver the pages. The order form is delivered to the artist's e-mail via the Web3Forms service (USA). Telegram also stores messages on servers outside Belarus — if you prefer, use e-mail instead.",
      p5: "For any privacy question, or to have your data deleted, contact elifejka@gmail.com.",
      cookiesTitle: "Cookies",
      c1: "This site does not use tracking cookies or analytics.",
      c2: "Your browser's local storage keeps only your interface preferences (language, currency, theme) and cart contents. This data never leaves your device, and you can clear it at any time in your browser settings.",
    },
    card: { sold: "Sold", soldPrice: "In a private collection", unique: "1 of 1" },
    modal: { add: "Add to cart", sold: "Sold", unique: "Unique work — exists in a single copy", shipping: "Worldwide shipping included in the price" },
    cart: {
      title: "Cart", empty: "Your cart is empty", total: "Total:",
      name: "Your name", contact: "Telegram, phone or e-mail", city: "Country and city — to plan the delivery", comment: "Order notes (optional)",
      sendTg: "Send order via Telegram", sendMail: "Send by e-mail", sendWa: "Send order via WhatsApp", sendIg: "Send order via Instagram", send: "Send order", sent: "Order sent! I will get back to you within a day.", orDirect: "…or write to me directly:",
      hint: "The messenger buttons copy your order text and open the chat — just paste and send.",
      uniqueNote: "unique · 1 of 1",
    },
    toast: {
      added: "Added to cart",
      copied: "Order copied — paste it into the chat",
      copyFail: "Open the chat and describe your order",
      uniqueMax: "This is a one-of-a-kind work — only one available",
    },
    order: { greeting: "Hello! I would like to place an order:", total: "Total", name: "Name", contact: "Contact", city: "Country/city", comment: "Notes", pcs: "pcs" },
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
        { t: "Выберите работу", p: "Смотрите галерею и открывайте картину — внутри все фото, детали и цена, в которую уже включена доставка." },
        { t: "Отправьте заказ", p: "Заполните короткую форму в корзине — заказ сразу придёт художнице. А если удобнее — напишите в WhatsApp, Instagram или Telegram." },
        { t: "Оплата и доставка", p: "В течение дня я подтвержу заказ и пришлю персональную защищённую ссылку на оплату картой (bePaid). После оплаты бережно упакую работу и отправлю в любую точку мира с трекингом — доставка уже включена в стоимость." },
      ],
      payTitle: "Оплата и доставка",
      pay: [
        "Оплата картой онлайн — Visa, Mastercard, Белкарт, Мир, Google Pay или Samsung Pay — по персональной защищённой ссылке bePaid, которую я пришлю после подтверждения заказа. Данные карты к нам не попадают; списание — в белорусских рублях (BYN), банк конвертирует сумму автоматически.",
        "Покупателям из Беларуси — также через систему «Расчёт» (ЕРИП): Система «Расчёт» (ЕРИП) → Сервис E-POS → E-POS — оплата товаров и услуг, лицевой счёт 42674-1-X, где X — номер вашего заказа (сообщим его при подтверждении заказа).",
        "Возможен международный банковский перевод или другой способ по договорённости.",
        "Картина резервируется за вами после подтверждения оплаты; вы получите подтверждение и фото упаковки.",
        "Доставка по всему миру с трекингом и бережной упаковкой — уже включена в стоимость.",
      ],
    },
    contacts: { title: "Контакты", lead: "По вопросам заказных работ, сотрудничества и любым другим — напишите мне." },
    footer: "Все изображения защищены авторским правом.",
    footerNav: { privacy: "Политика конфиденциальности", cookies: "Настройки cookie", terms: "Условия продажи" },
    terms: {
      title: "Условия продажи",
      s1t: "Продавец",
      s1: [
        "Продавец — физическое лицо, создающее и реализующее произведения живописи собственного изготовления.",
        "Связь: {email} · Telegram @{telegram}",
      ],
      s2t: "О работах",
      s2: [
        "Каждая работа — оригинальная живопись ручной работы, существующая в единственном экземпляре. Размер, материалы и техника указаны на странице работы.",
        "Цвета на вашем экране могут незначительно отличаться от оригинала — это обычное свойство фотографий живописи.",
        "Работы реализуются без документов, подтверждающих их качество и безопасность.",
      ],
      s3t: "Оформление заказа",
      s3: [
        "Каталог на сайте — предложение приобрести работу. Заказ оформляется через форму на сайте, WhatsApp, Instagram, Telegram или электронную почту; договор считается заключённым с момента подтверждения заказа художницей.",
        "Цена работы указана на её странице и включает доставку по всему миру. Срок доставки сообщается вам до оплаты.",
      ],
      s4t: "Возврат и обмен",
      s4: [
        "Работу, приобретённую дистанционно, можно вернуть в течение 14 дней с момента получения, если она не была в употреблении, сохранены её вид и потребительские свойства, а также оригинальная упаковка.",
        "Чтобы оформить возврат, напишите на {email}. Обратную пересылку оплачивает покупатель. Деньги возвращаются в течение 7 дней с момента поступления работы обратно.",
        "Работы, созданные по индивидуальному заказу — портрет, а также сюжет или размер по вашему пожеланию, — возврату и обмену не подлежат. Об этом вам сообщается до подтверждения заказа.",
      ],
      s5t: "Авторские права",
      s5: [
        "Покупая работу, вы приобретаете право собственности на оригинал. Авторские права остаются за художницей: воспроизведение, тиражирование и любое коммерческое использование изображений возможны только с её письменного разрешения.",
      ],
    },
    policy: {
      title: "Политика конфиденциальности",
      p1: "Этот сайт — персональное портфолио и онлайн-витрина художницы Елизаветы Фурсовой. Сайт не собирает, не хранит и не обрабатывает персональные данные на сервере.",
      p2: "Заказы оформляются через Telegram или электронную почту. Данные, которыми вы делитесь там (имя, контакты, адрес доставки), используются только для оформления вашего заказа и не передаются третьим лицам.",
      p3: "Данные хранятся ровно столько, сколько нужно для выполнения заказа и соблюдения требований учёта, никогда не используются для рекламы и не передаются третьим лицам. Вы в любой момент можете узнать, какие ваши данные у нас есть, потребовать их исправить или удалить — просто напишите по адресу ниже.",
      p4: "Сайт размещён на GitHub Pages (США). GitHub может записывать технические данные, например IP-адреса, — это необходимо для загрузки страниц. Форма заказа доставляется на почту художницы через сервис Web3Forms (США). Telegram также хранит переписку на серверах за пределами Беларуси; если для вас это важно, напишите на электронную почту.",
      p5: "По вопросам о персональных данных и для их удаления пишите на elifejka@gmail.com.",
      cookiesTitle: "Cookies",
      c1: "Сайт не использует отслеживающие cookies и аналитику.",
      c2: "В локальном хранилище браузера сохраняются только ваши настройки интерфейса (язык, валюта, тема) и содержимое корзины. Эти данные не покидают ваше устройство; их можно удалить в настройках браузера в любой момент.",
    },
    card: { sold: "Продано", soldPrice: "В частной коллекции", unique: "1 из 1" },
    modal: { add: "В корзину", sold: "Продано", unique: "Уникальная работа — существует в единственном экземпляре", shipping: "Доставка по всему миру включена в стоимость" },
    cart: {
      title: "Корзина", empty: "Корзина пока пуста", total: "Итого:",
      name: "Ваше имя", contact: "Telegram, телефон или e-mail", city: "Страна и город — чтобы спланировать доставку", comment: "Комментарий к заказу (необязательно)",
      sendTg: "Отправить заказ в Telegram", sendMail: "Отправить на почту", sendWa: "Отправить заказ в WhatsApp", sendIg: "Отправить заказ в Instagram", send: "Отправить заказ", sent: "Заказ отправлен! Отвечу вам в течение дня.", orDirect: "…или напишите мне напрямую:",
      hint: "Кнопки мессенджеров копируют текст заказа и открывают чат — просто вставьте и отправьте.",
      uniqueNote: "уникальная · 1 из 1",
    },
    toast: {
      added: "Добавлено в корзину",
      copied: "Заказ скопирован — вставьте его в чат",
      copyFail: "Откройте чат и опишите заказ",
      uniqueMax: "Это единственный экземпляр — доступна только одна штука",
    },
    order: { greeting: "Здравствуйте! Хочу оформить заказ:", total: "Итого", name: "Имя", contact: "Связь", city: "Страна/город", comment: "Комментарий", pcs: "шт." },
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
        { t: "Scegli un'opera", p: "Sfoglia la galleria e apri un quadro: all'interno trovi tutte le foto, i dettagli e il prezzo con la spedizione già inclusa." },
        { t: "Invia l'ordine", p: "Compila il breve modulo nel carrello — l'ordine arriva direttamente all'artista. Oppure, se preferisci, scrivi via WhatsApp, Instagram o Telegram." },
        { t: "Pagamento e consegna", p: "Entro un giorno confermo l'ordine e ti invio un link personale e sicuro per il pagamento con carta (bePaid). Dopo il pagamento imballo l'opera con cura e la spedisco in tutto il mondo con tracciamento — la spedizione è già inclusa nel prezzo." },
      ],
      payTitle: "Pagamento e spedizione",
      pay: [
        "Pagamento con carta online — Visa, Mastercard, Belkart, Mir, Google Pay o Samsung Pay — tramite un link di pagamento bePaid personale e sicuro che vi invio dopo la conferma dell'ordine. I dati della carta non ci raggiungono mai; l'addebito è in rubli bielorussi (BYN), la vostra banca converte l'importo automaticamente.",
        "Per gli acquirenti in Bielorussia — anche tramite il sistema ERIP: Sistema «Raschet» (ERIP) → servizio E-POS → E-POS — pagamento di beni e servizi, conto 42674-1-X, dove X è il numero del vostro ordine (ve lo comunichiamo alla conferma).",
        "È possibile anche un bonifico bancario internazionale o un altro metodo concordato individualmente.",
        "Il quadro viene riservato dopo la conferma del pagamento; riceverete conferma e foto dell'imballaggio.",
        "Spedizione in tutto il mondo con tracciamento e imballaggio accurato — già inclusa nel prezzo.",
      ],
    },
    contacts: { title: "Contatti", lead: "Per commissioni, collaborazioni o altre richieste, non esitate a contattarmi." },
    footer: "Tutte le immagini sono protette da copyright.",
    footerNav: { privacy: "Informativa sulla privacy", cookies: "Preferenze cookie", terms: "Condizioni di vendita" },
    terms: {
      title: "Condizioni di vendita",
      s1t: "Venditore",
      s1: [
        "Il venditore è una persona fisica che crea e vende dipinti originali di propria realizzazione.",
        "Contatti: {email} · Telegram @{telegram}",
      ],
      s2t: "Le opere",
      s2: [
        "Ogni opera è un dipinto originale realizzato a mano ed esiste in un solo esemplare. Dimensioni, materiali e tecnica sono indicati nella pagina di ciascuna opera.",
        "I colori sul vostro schermo possono differire leggermente dall'originale: è una caratteristica normale delle fotografie di dipinti.",
        "Le opere sono vendute senza documenti che ne certifichino qualità e sicurezza.",
      ],
      s3t: "Come ordinare",
      s3: [
        "Il catalogo del sito è una proposta di acquisto. L'ordine si effettua tramite il modulo del sito, WhatsApp, Instagram, Telegram o e-mail e il contratto si intende concluso quando l'artista lo conferma.",
        "Il prezzo dell'opera è indicato nella sua pagina e include la spedizione in tutto il mondo. I tempi di consegna vengono comunicati prima del pagamento.",
      ],
      s4t: "Diritto di recesso",
      s4: [
        "Un'opera acquistata a distanza può essere restituita entro 14 giorni dalla consegna, purché non sia stata utilizzata, ne siano integri aspetto e caratteristiche e sia conservato l'imballaggio originale.",
        "Per il reso scrivete a {email}. Le spese di restituzione sono a carico dell'acquirente. Il rimborso avviene entro 7 giorni dal rientro dell'opera.",
        "Le opere realizzate su ordinazione — un ritratto, oppure soggetto o dimensioni scelti da voi — non sono soggette a recesso né a cambio. Ne siete informati prima della conferma dell'ordine.",
      ],
      s5t: "Diritto d'autore",
      s5: [
        "L'acquisto trasferisce la proprietà dell'originale. Il diritto d'autore resta all'artista: riproduzione, stampa e qualsiasi uso commerciale delle immagini richiedono il suo consenso scritto.",
      ],
    },
    policy: {
      title: "Informativa sulla privacy",
      p1: "Questo sito è il portfolio personale e la vetrina online dell'artista Elizaveta Fursova. Il sito non raccoglie, conserva né elabora dati personali su alcun server.",
      p2: "Gli ordini vengono effettuati tramite Telegram o e-mail. Le informazioni condivise (nome, contatti, indirizzo di consegna) vengono usate solo per gestire l'ordine e non vengono mai cedute a terzi.",
      p3: "I dati sono conservati solo per il tempo necessario a completare l'ordine e ad adempiere agli obblighi contabili, non vengono mai usati per pubblicità né ceduti a terzi. Potete in qualsiasi momento chiedere quali dati vi riguardano, farli correggere o cancellare: basta scrivere all'indirizzo indicato sotto.",
      p4: "Il sito è ospitato su GitHub Pages (USA). GitHub può registrare dati tecnici come gli indirizzi IP, necessari per la consegna delle pagine. Il modulo d'ordine viene recapitato all'e-mail dell'artista tramite il servizio Web3Forms (USA). Anche Telegram conserva i messaggi su server fuori dalla Bielorussia: se preferite, scrivete via e-mail.",
      p5: "Per qualsiasi domanda sulla privacy o per la cancellazione dei dati: elifejka@gmail.com.",
      cookiesTitle: "Cookies",
      c1: "Questo sito non utilizza cookie di tracciamento né analytics.",
      c2: "La memoria locale del browser conserva solo le preferenze dell'interfaccia (lingua, valuta, tema) e il contenuto del carrello. Questi dati non lasciano mai il vostro dispositivo e possono essere cancellati in qualsiasi momento dalle impostazioni del browser.",
    },
    card: { sold: "Venduto", soldPrice: "In collezione privata", unique: "1 di 1" },
    modal: { add: "Aggiungi al carrello", sold: "Venduto", unique: "Opera unica — esiste in un solo esemplare", shipping: "Spedizione in tutto il mondo inclusa nel prezzo" },
    cart: {
      title: "Carrello", empty: "Il carrello è vuoto", total: "Totale:",
      name: "Il tuo nome", contact: "Telegram, telefono o e-mail", city: "Paese e città — per organizzare la consegna", comment: "Note sull'ordine (facoltativo)",
      sendTg: "Invia l'ordine su Telegram", sendMail: "Invia per e-mail", sendWa: "Invia l'ordine su WhatsApp", sendIg: "Invia l'ordine su Instagram", send: "Invia l'ordine", sent: "Ordine inviato! Vi risponderò entro un giorno.", orDirect: "…oppure scrivetemi direttamente:",
      hint: "I pulsanti dei messenger copiano il testo dell'ordine e aprono la chat — incolla e invia.",
      uniqueNote: "unica · 1 di 1",
    },
    toast: {
      added: "Aggiunto al carrello",
      copied: "Ordine copiato — incollalo nella chat",
      copyFail: "Apri la chat e descrivi il tuo ordine",
      uniqueMax: "È un pezzo unico — disponibile in un solo esemplare",
    },
    order: { greeting: "Salve! Vorrei effettuare un ordine:", total: "Totale", name: "Nome", contact: "Contatto", city: "Paese/città", comment: "Note", pcs: "pz" },
  },
};
