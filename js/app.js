/* ============================================================
   ЛОГИКА САЙТА: темы, языки, валюты, галерея, корзина.
   Контент редактируется в js/products.js — этот файл трогать
   не нужно.
   ============================================================ */

/* Без этого класса CSS не прячет контент — страховка от пустой страницы */
document.documentElement.classList.add("js");

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Красивый адрес: без «/index.html» в строке браузера ---------- */
(function () {
  if (location.protocol === "file:") return; // при локальном просмотре ссылки нужны как есть
  const clean = location.pathname.replace(/index\.html$/, "");
  if (clean !== location.pathname) {
    history.replaceState(null, "", clean + location.search + location.hash);
  }
  $$('a[href="index.html"]').forEach((a) => a.setAttribute("href", "./"));
})();

/* ---------- Тема (по умолчанию — светлая) ---------- */
let theme = localStorage.getItem("art-theme") === "dark" ? "dark" : "light";
applyTheme();

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.dispatchEvent(new CustomEvent("themechange")); // шейдеры перечитают цвета
}

$("#themeBtn").onclick = () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("art-theme", theme);
  applyTheme();
};

/* ---------- Язык и валюта ---------- */
const LANGS = ["en", "ru", "it"];
let lang = localStorage.getItem("art-lang");
if (!LANGS.includes(lang)) lang = "en";

let cur = localStorage.getItem("art-cur");
if (!CONFIG.currencies.some((c) => c.code === cur)) cur = "EUR"; // валюта по умолчанию

const t = (path) => path.split(".").reduce((o, k) => (o || {})[k], I18N[lang]) ?? path;
const L = (obj) => (typeof obj === "object" ? obj[lang] ?? obj.en : obj);

/* Цена хранится в долларах, пересчитывается по курсам из CONFIG */
function fmt(priceUSD) {
  const c = CONFIG.currencies.find((x) => x.code === cur);
  const v = Math.round(priceUSD * c.rate).toLocaleString("en-US").replace(/,/g, " ");
  return c.before ? `${c.symbol}${v}` : `${v} ${c.symbol}`;
}

const catLabel = (id) => {
  const c = CATEGORIES.find((x) => x.id === id);
  return c ? L(c.label) : id;
};

const LANG_NAMES = { en: "English", ru: "Русский", it: "Italiano" };
const CHEV = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

function renderSwitchers() {
  const curObj = CONFIG.currencies.find((c) => c.code === cur);
  $$(".switchers").forEach((box) => {
    box.innerHTML = `
      <div class="dd">
        <button class="dd-btn" type="button">${lang.toUpperCase()} ${CHEV}</button>
        <div class="dd-list" hidden>
          ${LANGS.map((l) => `<button class="dd-item ${l === lang ? "active" : ""}" data-lang="${l}">${LANG_NAMES[l]}</button>`).join("")}
        </div>
      </div>
      <div class="dd">
        <button class="dd-btn" type="button">${curObj.code} ${curObj.symbol} ${CHEV}</button>
        <div class="dd-list" hidden>
          ${CONFIG.currencies.map((c) => `<button class="dd-item ${c.code === cur ? "active" : ""}" data-cur="${c.code}">${c.code} ${c.symbol}</button>`).join("")}
        </div>
      </div>`;
  });
}

/* открытие/закрытие выпадающих списков */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".dd-btn");
  $$(".dd-list").forEach((l) => {
    if (btn && l.parentElement.contains(btn)) l.hidden = !l.hidden;
    else l.hidden = true;
  });
});

document.addEventListener("click", (e) => {
  const lBtn = e.target.closest("[data-lang]");
  if (lBtn) {
    lang = lBtn.dataset.lang;
    localStorage.setItem("art-lang", lang);
    applyAll();
  }
  const cBtn = e.target.closest("[data-cur]");
  if (cBtn) {
    cur = cBtn.dataset.cur;
    localStorage.setItem("art-cur", cur);
    applyAll();
  }
});

/* ---------- Применение переводов ---------- */
function applyStatic() {
  document.documentElement.lang = lang;
  const pageKey = document.body.dataset.titleKey;
  document.title = pageKey ? `${t(pageKey)} — ${L(CONFIG.artistName)}` : t("docTitle");

  $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  $$("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));

  $$("[data-artist-name]").forEach((el) => (el.textContent = L(CONFIG.artistName)));
  $$("[data-city]").forEach((el) => (el.textContent = L(CONFIG.city)));
  $$("[data-about-greeting]").forEach((el) => (el.textContent = L(CONFIG.aboutGreeting)));
  $$("[data-about]").forEach((el) => {
    el.innerHTML = L(CONFIG.about).map((p) => `<p>${p}</p>`).join("");
  });

  /* Иконки контактов: Instagram, Telegram-канал, почта.
     WhatsApp и личный Telegram — только в оформлении заказа. */
  const contactLinks = $("#contactLinks");
  if (contactLinks) contactLinks.innerHTML = `
    <a class="soc" href="https://instagram.com/${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>
    </a>
    <a class="soc" href="https://t.me/${CONFIG.telegramChannel || CONFIG.telegram}" target="_blank" rel="noopener" aria-label="Telegram" title="Telegram">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.6 18.7 19.9c-.24 1.08-.88 1.35-1.79.84l-4.95-3.65-2.39 2.3c-.26.26-.48.48-.99.48l.36-5.05 9.18-8.3c.4-.35-.09-.55-.62-.2L6.16 13.47l-4.88-1.53c-1.06-.33-1.08-1.06.22-1.57L20.57 3.06c.88-.33 1.65.2 1.37 1.54Z"/></svg>
    </a>
    <a class="soc" href="mailto:${CONFIG.email}" aria-label="E-mail" title="${CONFIG.email}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 6.5 8.5 6.7 8.5-6.7"/></svg>
    </a>`;

  const emailLink = $("#emailLink");
  if (emailLink) {
    emailLink.href = `mailto:${CONFIG.email}`;
    emailLink.textContent = CONFIG.email;
  }

  const stepsList = $("#stepsList");
  if (stepsList) stepsList.innerHTML = t("how.steps")
    .map((s, i) => `<li class="reveal" style="--d:${i * 0.12}s"><span>0${i + 1}</span><h3>${s.t}</h3><p>${s.p}</p></li>`)
    .join("");

  const payList = $("#payList");
  if (payList) payList.innerHTML = t("how.pay").map((p) => `<li>${p}</li>`).join("");

  /* Запасные каналы под формой заказа: WhatsApp → Instagram → Telegram.
     Основной путь — кнопка «Отправить заказ» (письмо уходит само).
     WhatsApp подставляет текст заказа в сообщение сам; Instagram и
     Telegram открывают чат, текст уже скопирован — остаётся вставить. */
  const orderAlt = $("#orderAlt");
  if (orderAlt) {
    const prep = async (e) => {
      if (!$("#orderForm").reportValidity()) { e.preventDefault(); return null; }
      const text = orderText();
      await copyText(text);
      return text;
    };
    orderAlt.innerHTML = `
      ${CONFIG.whatsapp ? `
      <a class="soc soc-sm" id="altWa" href="#" target="_blank" rel="noopener" title="${t("cart.sendWa")}" aria-label="WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.1 15.06l-.3-.17-3.1.89.9-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 4.06c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.71 4.19 3.7 2.07.81 2.49.65 2.94.61.45-.04 1.45-.59 1.66-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.75-1.82-.2-.47-.4-.41-.55-.42h-.46Z"/></svg>
      </a>` : ""}
      <a class="soc soc-sm" id="altIg" href="https://ig.me/m/${CONFIG.instagram}" target="_blank" rel="noopener" title="${t("cart.sendIg")}" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.3"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>
      </a>
      <a class="soc soc-sm" id="altTg" href="https://t.me/${CONFIG.telegram}" target="_blank" rel="noopener" title="${t("cart.sendTg")}" aria-label="Telegram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 4.6 18.7 19.9c-.24 1.08-.88 1.35-1.79.84l-4.95-3.65-2.39 2.3c-.26.26-.48.48-.99.48l.36-5.05 9.18-8.3c.4-.35-.09-.55-.62-.2L6.16 13.47l-4.88-1.53c-1.06-.33-1.08-1.06.22-1.57L20.57 3.06c.88-.33 1.65.2 1.37 1.54Z"/></svg>
      </a>`;
    const wa = $("#altWa");
    if (wa) wa.onclick = async (e) => {
      e.preventDefault();
      const text = await prep(e);
      if (text) window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    };
    const igEl = $("#altIg");
    if (igEl) igEl.onclick = async (e) => {
      const text = await prep(e);
      if (text) toast(t("toast.copied"));
    };
    const tgEl = $("#altTg");
    if (tgEl) tgEl.onclick = async (e) => {
      const text = await prep(e);
      if (text) toast(t("toast.copied"));
    };
  }

  /* страница «Условия продажи» — блоки собираются из terms.* */
  const termsBody = $("#termsBody");
  if (termsBody) {
    const fill = (s) => s
      .replace("{email}", `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`)
      .replace("{telegram}", CONFIG.telegram);
    const seller = `<p class="terms-seller">${L(CONFIG.legalName)}${CONFIG.legalUnp ? `, ${lang === "ru" ? "УНП" : "UNP"} ${CONFIG.legalUnp}` : ""}</p>`;
    termsBody.innerHTML = [1, 2, 3, 4, 5]
      .map((n) => {
        const paras = t(`terms.s${n}`).map((p) => `<p>${fill(p)}</p>`).join("");
        return `<h3>${t(`terms.s${n}t`)}</h3>${n === 1 ? seller : ""}${paras}`;
      })
      .join("");
  }

  /* компактная шапка, появляющаяся при прокрутке вверх */
  const miniNav = $(".mini-nav");
  if (miniNav) miniNav.innerHTML = $(".site-nav").innerHTML;
}

/* ---------- Компактная шапка при скролле вверх ---------- */
(function () {
  const mh = document.createElement("div");
  mh.className = "mini-head";
  mh.innerHTML = `<nav class="mini-nav site-nav"></nav>`;
  document.body.appendChild(mh);

  let lastY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    mh.classList.toggle("show", y > 420 && y < lastY);
    lastY = y;
  }, { passive: true });
})();

/* ---------- Галерея ---------- */
function renderGrid() {
  const grid = $("#grid");
  if (!grid) return; // на страницах без галереи делать нечего
  let html = PRODUCTS
    .map(
      (p, i) => `
    <article class="card ${p.sold ? "is-sold" : ""} ${carouselMode ? "" : "reveal"}" style="--d:${(i % 3) * 0.1}s" data-id="${p.id}" tabindex="0" role="button" aria-label="${L(p.title)}">
      <div class="card-img ${p.contain ? "is-contain" : ""}">
        ${p.sold ? `<span class="card-badge">${t("card.sold")}</span>` : ""}
        <img src="${p.image}" alt="${L(p.title)}" loading="lazy">
      </div>
      <h3 class="card-title">${L(p.title)}</h3>
      <p class="card-meta">${L(p.materials)} · ${p.size}</p>
      <p class="card-price ${p.sold ? "sold" : ""}">${p.sold ? t("card.soldPrice") : fmt(p.price)}</p>
    </article>`
    )
    .join("");

  /* бесконечная лента (режим карусели): три копии подряд, старт с середины */
  if (carouselMode) html = html + html + html;
  grid.innerHTML = html;
  if (carouselMode) {
    requestAnimationFrame(() => { grid.scrollLeft = grid.scrollWidth / 3; });
  }

  grid.querySelectorAll(".card").forEach((card) => {
    card.onclick = () => openProduct(card.dataset.id);
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProduct(card.dataset.id);
      }
    };
  });

  /* магнитный 3D-наклон карточек — только в режиме карусели */
  if (carouselMode && matchMedia("(pointer: fine)").matches && !reducedMotion) {
    grid.querySelectorAll(".card").forEach((card) => {
      const img = card.querySelector(".card-img");
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
        img.style.transform = `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => (img.style.transform = ""));
    });
  }
  observeReveals();
}

/* ---------- Магнитная карусель (запасной режим галереи) ---------- */
const carouselMode = document.body.classList.contains("carousel-mode");

function initCarousel() {
  if (!carouselMode) return;
  const grid = $("#grid");
  if (!grid) return;

  if (!document.querySelector(".car-nav")) {
    const nav = document.createElement("div");
    nav.className = "car-nav";
    nav.innerHTML = `
      <button class="icon-btn" data-car="-1" aria-label="Previous">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="icon-btn" data-car="1" aria-label="Next">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
      </button>`;
    document.querySelector(".works-head").appendChild(nav);
    nav.addEventListener("click", (e) => {
      const b = e.target.closest("[data-car]");
      if (!b) return;
      const card = grid.querySelector(".card");
      const step = card ? card.getBoundingClientRect().width + 28 : 400;
      grid.scrollBy({ left: step * +b.dataset.car, behavior: "smooth" });
    });
  }

  if (grid.dataset.carInit) return;
  grid.dataset.carInit = "1";

  grid.addEventListener("scroll", () => {
    const w = grid.scrollWidth / 3;
    if (w <= grid.clientWidth) return;
    if (grid.scrollLeft < w * 0.5) grid.scrollLeft += w;
    else if (grid.scrollLeft > w * 1.5) grid.scrollLeft -= w;
  }, { passive: true });

  let down = false, moved = 0, sx = 0, ss = 0, vel = 0, lx = 0, lt = 0, raf;

  grid.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    e.preventDefault();
    grid.setPointerCapture(e.pointerId);
    down = true;
    moved = 0;
    sx = e.clientX;
    ss = grid.scrollLeft;
    lx = e.clientX;
    lt = performance.now();
    cancelAnimationFrame(raf);
  });
  grid.addEventListener("dragstart", (e) => e.preventDefault());
  grid.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      grid.scrollLeft += e.deltaY;
    }
  }, { passive: false });
  grid.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - sx;
    moved = Math.max(moved, Math.abs(dx));
    if (moved > 4) grid.classList.add("dragging");
    grid.scrollLeft = ss - dx;
    const now = performance.now();
    vel = ((e.clientX - lx) / Math.max(1, now - lt)) * 16;
    lx = e.clientX;
    lt = now;
  });
  grid.addEventListener("click", (e) => {
    if (moved > 4) {
      e.stopPropagation();
      e.preventDefault();
      moved = 0;
    }
  }, true);
  const endDrag = () => {
    if (!down) return;
    down = false;
    (function glide() {
      grid.scrollLeft -= vel;
      vel *= 0.94;
      if (Math.abs(vel) > 0.4) raf = requestAnimationFrame(glide);
      else grid.classList.remove("dragging");
    })();
  };
  grid.addEventListener("pointerup", endDrag);
  grid.addEventListener("pointerleave", endDrag);
}

/* ---------- Появление при скролле (+страховка) ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        revealObserver.unobserve(en.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
);

function observeReveals() {
  $$(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
}
/* если что-то пошло не так — показываем всё, что на экране */
setInterval(() => {
  $$(".reveal:not(.in)").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add("in");
  });
}, 2500);

/* ---------- Модальное окно работы (с листанием ракурсов) ---------- */
const productModal = $("#productModal");
let modalProduct = null;
let slides = [];      // все фото текущей работы
let slideIdx = 0;

/* можно ли приближать текущий кадр (интерьерные визуализации — нельзя) */
function slideZoomable() {
  if (!modalProduct) return false;
  const src = slides[slideIdx];
  return !(modalProduct.noZoom || []).includes(src);
}

function showSlide(i) {
  if (!slides.length) return;
  slideIdx = (i + slides.length) % slides.length;
  const img = $("#mImg");
  img.src = slides[slideIdx];
  /* прозрачный PNG круглой работы показываем целиком, без обрезки */
  img.classList.toggle("img-contain", slideIdx === 0 && !!modalProduct.contain);
  const many = slides.length > 1;
  $("#mPrev").hidden = !many;
  $("#mNext").hidden = !many;
  const cEl = $("#mCount");
  cEl.hidden = !many;
  cEl.textContent = `${slideIdx + 1} / ${slides.length}`;
  img.style.cursor = slideZoomable() ? "zoom-in" : "default";
  img.title = slideZoomable() ? "Click to zoom" : "";
}

function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  modalProduct = p;
  slides = [p.image, ...(p.extra || [])];
  $("#mImg").alt = L(p.title);
  showSlide(0);
  $("#mCat").textContent = catLabel(p.category);
  $("#mTitle").textContent = L(p.title);
  $("#mMeta").textContent = `${L(p.materials)} · ${p.size}`;
  /* авторская подпись — рукописным шрифтом */
  const quote = p.quote ? L(p.quote) : "";
  const qEl = $("#mQuote");
  qEl.hidden = !quote;
  qEl.textContent = quote;
  const desc = p.description ? L(p.description) : "";
  const dEl = $("#mDesc");
  dEl.hidden = !desc;
  dEl.textContent = desc;
  $("#mPrice").textContent = p.sold ? t("modal.sold") : fmt(p.price);
  const shipEl = $("#mShip");
  shipEl.hidden = !!p.sold;
  shipEl.textContent = t("modal.shipping");
  const uEl = $("#mUnique");
  uEl.hidden = !p.unique || p.sold;
  uEl.textContent = t("modal.unique");
  const addBtn = $("#mAdd");
  addBtn.hidden = p.sold;
  addBtn.textContent = t("modal.add");
  productModal.hidden = false;
  document.body.style.overflow = "hidden";
}

/* стрелки и клавиатура */
if (productModal) {
  $("#mPrev").onclick = (e) => { e.stopPropagation(); showSlide(slideIdx - 1); };
  $("#mNext").onclick = (e) => { e.stopPropagation(); showSlide(slideIdx + 1); };
  document.addEventListener("keydown", (e) => {
    if (productModal.hidden || slides.length < 2) return;
    if (e.key === "ArrowLeft") showSlide(slideIdx - 1);
    if (e.key === "ArrowRight") showSlide(slideIdx + 1);
  });
}

function closeModals() {
  if (lightbox && !lightbox.hidden) { lightbox.hidden = true; return; } // сначала закрываем зум
  if (productModal) productModal.hidden = true;
  cartDrawer.hidden = true;
  document.body.style.overflow = "";
}

if (productModal) {
  productModal.addEventListener("click", (e) => {
    if (e.target === productModal || e.target.hasAttribute("data-close")) closeModals();
  });

  $("#mAdd").onclick = () => {
    if (modalProduct) addToCart(modalProduct.id);
    closeModals();
    openCart();
  };
}
document.addEventListener("keydown", (e) => e.key === "Escape" && closeModals());

/* ---------- Лайтбокс: приближение картины ---------- */
const lightbox = $("#lightbox");
if (lightbox && productModal) {
  const lbImg = $("#lbImg");
  const mImg = $("#mImg");
  mImg.onclick = () => {
    if (!slideZoomable()) return; // интерьерные кадры не приближаем
    lbImg.src = mImg.src;
    lbImg.alt = mImg.alt;
    lbImg.classList.remove("zoomed");
    lightbox.hidden = false;
  };
  /* клик по картине — увеличение в точке клика, повторный — обратно */
  lbImg.onclick = (e) => {
    e.stopPropagation();
    const r = lbImg.getBoundingClientRect();
    lbImg.style.transformOrigin =
      `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`;
    lbImg.classList.toggle("zoomed");
  };
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.hasAttribute("data-close-lb")) lightbox.hidden = true;
  });
}

/* ---------- Корзина ---------- */
const CART_KEY = "art-site-cart";
const cartDrawer = $("#cartDrawer");
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
} catch (e) { cart = []; }
cart = cart.filter((it) => {
  const p = PRODUCTS.find((x) => x.id === it.id);
  return p && !p.sold;
});
cart.forEach((it) => {
  const p = PRODUCTS.find((x) => x.id === it.id);
  if (p && p.unique) it.qty = 1;
});

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  const item = cart.find((it) => it.id === id);
  if (item) {
    if (p.unique) {
      toast(t("toast.uniqueMax"));
      return;
    }
    item.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  toast(t("toast.added"));
}

function updateCartBadge() {
  const count = cart.reduce((s, it) => s + it.qty, 0);
  const badge = $("#cartCount");
  badge.hidden = count === 0;
  badge.textContent = count;
}

function cartTotalUSD() {
  return cart.reduce((s, it) => {
    const p = PRODUCTS.find((x) => x.id === it.id);
    return s + (p ? p.price * it.qty : 0);
  }, 0);
}

function renderCart() {
  const box = $("#cartItems");
  const empty = $("#cartEmpty");
  const form = $("#orderForm");

  box.innerHTML = cart
    .map((it) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      if (!p) return "";
      const qtyBlock = p.unique
        ? `<span class="cart-item-unique">${t("cart.uniqueNote")}</span>`
        : `<div class="cart-item-qty">
             <button data-dec="${p.id}" aria-label="−">−</button>
             <span>${it.qty}</span>
             <button data-inc="${p.id}" aria-label="+">+</button>
           </div>`;
      return `
      <div class="cart-item">
        <img src="${p.image}" alt="${L(p.title)}">
        <div>
          <div class="cart-item-title">${L(p.title)}</div>
          <div class="cart-item-price">${fmt(p.price)}</div>
          ${qtyBlock}
        </div>
        <button class="cart-item-remove" data-del="${p.id}" aria-label="×">×</button>
      </div>`;
    })
    .join("");

  empty.hidden = cart.length > 0;
  form.hidden = cart.length === 0;
  $("#cartTotal").textContent = fmt(cartTotalUSD());

  box.querySelectorAll("[data-inc]").forEach((b) => (b.onclick = () => changeQty(b.dataset.inc, 1)));
  box.querySelectorAll("[data-dec]").forEach((b) => (b.onclick = () => changeQty(b.dataset.dec, -1)));
  box.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => removeItem(b.dataset.del)));
}

function changeQty(id, d) {
  const it = cart.find((x) => x.id === id);
  const p = PRODUCTS.find((x) => x.id === id);
  if (!it || !p) return;
  if (p.unique && d > 0) {
    toast(t("toast.uniqueMax"));
    return;
  }
  it.qty += d;
  if (it.qty <= 0) cart = cart.filter((x) => x.id !== id);
  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((x) => x.id !== id);
  saveCart();
  renderCart();
}

function openCart() {
  renderCart();
  cartDrawer.hidden = false;
  document.body.style.overflow = "hidden";
}

$("#cartBtn").onclick = openCart;
cartDrawer.addEventListener("click", (e) => {
  if (e.target === cartDrawer || e.target.hasAttribute("data-close-cart")) closeModals();
});

/* ---------- Оформление заказа ---------- */
function orderText() {
  const lines = cart.map((it) => {
    const p = PRODUCTS.find((x) => x.id === it.id);
    return `• [${p.id}] ${L(p.title)} (${p.size}) — ${it.qty} ${t("order.pcs")} × ${fmt(p.price)}`;
  });
  return [
    t("order.greeting"),
    ``,
    ...lines,
    ``,
    `${t("order.total")}: ${fmt(cartTotalUSD())}`,
    ``,
    `${t("order.name")}: ${$("#fName").value.trim()}`,
    `${t("order.contact")}: ${$("#fContact").value.trim()}`,
    $("#fCity") && $("#fCity").value.trim() ? `${t("order.city")}: ${$("#fCity").value.trim()}` : ``,
    $("#fComment").value.trim() ? `${t("order.comment")}: ${$("#fComment").value.trim()}` : ``,
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

/* «Отправить заказ»: письмо со всеми полями уходит художнице само
   (через Web3Forms). Если ключ не задан или сервис недоступен —
   заказ уходит готовым сообщением в WhatsApp (без системных окон). */
function orderFallback(text) {
  if (CONFIG.whatsapp) {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  } else {
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Order from elizavetafursova.com")}&body=${encodeURIComponent(text)}`;
  }
}

$("#orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = orderText();
  if (!CONFIG.web3formsKey) { orderFallback(text); return; }
  const btn = e.target.querySelector('[type="submit"]');
  btn.disabled = true;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: CONFIG.web3formsKey,
        subject: "Order from elizavetafursova.com",
        from_name: $("#fName").value.trim(),
        name: $("#fName").value.trim(),
        contact: $("#fContact").value.trim(),
        city: $("#fCity") ? $("#fCity").value.trim() : "",
        message: text,
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "send failed");
    toast(t("cart.sent"));
    cart = [];
    saveCart();
    renderCart();
    e.target.reset();
    setTimeout(closeModals, 1400);
  } catch (err) {
    orderFallback(text); // сервис недоступен — заказ уйдёт в WhatsApp
  } finally {
    btn.disabled = false;
  }
});

/* ---------- Тост ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), 2600);
}

/* ---------- Полное обновление (язык/валюта) ---------- */
function applyAll() {
  renderSwitchers();
  applyStatic();
  renderGrid();
  initCarousel();
  if (!cartDrawer.hidden) renderCart();
  updateCartBadge();
  observeReveals();
}

$("#year").textContent = new Date().getFullYear();
applyAll();
