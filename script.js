/* =====================================================================
   An Lord — Developer Portfolio
   Vanilla JS + Three.js (no backend, GitHub-Pages friendly)

   ALL user-editable content lives in the CONFIG block below.
   Change name, contacts, projects, tech badges without touching logic.
   ===================================================================== */

/* ---------------------------------------------------------------------
   CONFIG — edit everything here
   --------------------------------------------------------------------- */
const CONFIG = {
  // Developer identity
  name: "An Lord",

  // Contact links (used in CTA + footer + navbar anchors)
  contacts: {
    telegram: "https://t.me/anlord",
    github:   "https://github.com/anlord"
  },

  // Hero animated stats (data-target is the final number)
  stats: [
    { label: "Custom Development", value: 40 },
    { label: "Minecraft",          value: 25 },
    { label: "Telegram",           value: 30 },
    { label: "Automation",         value: 15 }
  ],

  // Technology badges
  technologies: [
    "Java", "Python", "JavaScript", "HTML", "CSS", "Three.js",
    "Spigot", "Paper", "PacketEvents", "Telegram API", "PyTorch", "Git", "GitHub"
  ],

  // Projects shown in the "Works" grid + modal.
  // `kind` drives the generated preview canvas style.
  // `image` is optional; if omitted a generated graphic is used.
  projects: [
    {
      title: "Minecraft Anti-Cheat",
      kind: "minecraft",
      description: "Система обнаружения подозрительного поведения игроков с анализом игровых пакетов и серверных событий.",
      task: "Сервер страдал от читеров, стандартные решения давали много ложных срабатываний.",
      solution: "Написал кастомный движок на основе PacketEvents: отслеживание аномалий движения, скорости и взаимодействий с плавной системой баллов и апелляций.",
      technologies: ["Java", "Spigot", "PacketEvents"],
      results: "Снижение числа читеров на 90% при минимальных ложных банах.",
      link: "https://github.com/anlord"
    },
    {
      title: "Custom Minecraft Plugin",
      kind: "minecraft",
      description: "Кастомная серверная механика, разработанная под индивидуальные требования проекта.",
      task: "Нужна уникальная игровая система, которой нет в готовых плагинах.",
      solution: "Спроектировал модульную архитектуру с собственными событиями, конфигурами и API для дальнейшего расширения.",
      technologies: ["Java", "Spigot/Paper"],
      results: "Гибкая система, легко настраиваемая под будущие обновления сервера.",
      link: "https://github.com/anlord"
    },
    {
      title: "Telegram Monitoring Bot",
      kind: "telegram",
      description: "Telegram-бот для автоматического мониторинга данных и отправки уведомлений.",
      task: "Команде нужно оперативно получать уведомления о событиях из внешних систем.",
      solution: "Бот с подписками, фильтрами и расписанием рассылки; интеграция с API источников и очередью сообщений.",
      technologies: ["Python", "Telegram API"],
      results: "Время реакции на инциденты сокращено с часов до секунд.",
      link: "https://github.com/anlord"
    },
    {
      title: "Automation Bot",
      kind: "automation",
      description: "Автоматизация повторяющихся действий через Telegram-интерфейс.",
      task: "Рутинные процессы отнимали время и выполнялись вручную.",
      solution: "Сценарии автоматизации с удобными кнопками, логами и правами доступа прямо в чате.",
      technologies: ["Python", "Telegram API", "Scripts"],
      results: "Рутинные задачи полностью переданы боту, освободив десятки часов в месяц.",
      link: "https://github.com/anlord"
    },
    {
      title: "Blockchain Project",
      kind: "network",
      description: "Экспериментальный блокчейн-проект с собственной архитектурой узлов и сетевым взаимодействием.",
      task: "Исследовательская задача: построить устойчивую распределённую сеть узлов.",
      solution: "Реализовал консенсус, передачу сообщений и хранение цепочки блоков с наблюдаемой телеметрией.",
      technologies: ["Python", "JavaScript", "Networking"],
      results: "Работающий прототип сети из нескольких узлов.",
      link: "https://github.com/anlord"
    },
    {
      title: "AI / ML Project",
      kind: "ai",
      description: "Эксперименты с обучением и интеграцией моделей машинного обучения.",
      task: "Требовалось встроить предсказательную модель в существующий продукт.",
      solution: "Пайплайн обучения на PyTorch, упаковка модели и интеграция через лёгкий API-сервис.",
      technologies: ["Python", "PyTorch", "Hugging Face"],
      results: "Модель достигает целевой точности и обслуживается в продакшене.",
      link: "https://github.com/anlord"
    }
  ]
};

/* Code snippet typed out in the terminal section */
const CODE_SNIPPET = `public class CustomPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        getLogger().info("Plugin enabled");
        // а здесь — ваша логика
    }
}`;

/* ---------------------------------------------------------------------
   Utilities
   --------------------------------------------------------------------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

/* Replace placeholder name everywhere */
$$("[data-name]").forEach(el => { el.textContent = CONFIG.name; });

/* Wire contact links */
$("#ctaTelegram").href = CONFIG.contacts.telegram;
$("#ctaGithub").href   = CONFIG.contacts.github;
$("#footerTelegram").href = CONFIG.contacts.telegram;
$("#footerGithub").href   = CONFIG.contacts.github;

/* ---------------------------------------------------------------------
   1. Navbar — scrolled state + mobile menu
   --------------------------------------------------------------------- */
const navbar = $("#navbar");
const hamburger = $("#hamburger");
const navLinks = $("#navLinks");

const onScrollNav = () => navbar.classList.toggle("scrolled", window.scrollY > 30);
onScrollNav();
window.addEventListener("scroll", onScrollNav, { passive: true });

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.classList.toggle("active", open);
  hamburger.setAttribute("aria-expanded", String(open));
});
$$(".nav-link").forEach(l => l.addEventListener("click", () => {
  navLinks.classList.remove("open");
  hamburger.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
}));

/* ---------------------------------------------------------------------
   2. Scroll progress bar
   --------------------------------------------------------------------- */
const progress = $(".scroll-progress span");
const updateProgress = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ---------------------------------------------------------------------
   3. Reveal on scroll (IntersectionObserver)
   --------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

$$(".reveal").forEach(el => revealObserver.observe(el));

/* ---------------------------------------------------------------------
   4. Hero quote fade-in
   --------------------------------------------------------------------- */
const heroQuote = $("#heroQuote");
setTimeout(() => heroQuote && heroQuote.classList.add("show"), 700);

/* ---------------------------------------------------------------------
   5. Hero stats — render from CONFIG, then animate counters
   --------------------------------------------------------------------- */
const heroStatsEl = $("#heroStats");
CONFIG.stats.forEach(s => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="stat-num" data-target="${s.value}" data-suffix="+">0</span><span class="stat-label">${s.label}</span>`;
  heroStatsEl.appendChild(li);
});

/* ---------------------------------------------------------------------
   5b. Animated counters
   --------------------------------------------------------------------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const suffix = el.dataset.suffix || "";
  if (prefersReduced) { el.textContent = target + suffix; return; }
  const dur = 1400, start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); statObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
$$(".stat-num").forEach(el => statObserver.observe(el));

/* ---------------------------------------------------------------------
   6. Service card tilt + glow follow
   --------------------------------------------------------------------- */
if (!isTouch && !prefersReduced) {
  $$(".service-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
}

/* ---------------------------------------------------------------------
   7. Technologies — render floating badges
   --------------------------------------------------------------------- */
const techWrap = $("#techBadges");
CONFIG.technologies.forEach((t, i) => {
  const b = document.createElement("span");
  b.className = "tech-badge";
  b.textContent = t;
  b.style.animationDelay = (i % 7) * 0.4 + "s";
  techWrap.appendChild(b);
});

/* ---------------------------------------------------------------------
   8. Projects — render cards + modal
   --------------------------------------------------------------------- */
const worksGrid = $("#worksGrid");

/* Generated preview "canvases" (cheap, dependency-free) keyed by project kind */
function buildPreview(kind) {
  const wrap = document.createElement("div");
  wrap.className = "thumb-fallback";
  wrap.dataset.kind = kind;
  // Each kind gets a distinct minimalist generated graphic via inline SVG
  const grads = {
    minecraft: ["#6f4bd8", "#22d3ee"],
    telegram:  ["#3da8ff", "#7c5cff"],
    automation:["#7c5cff", "#22d3ee"],
    network:   ["#22d3ee", "#3da8ff"],
    ai:        ["#7c5cff", "#3da8ff"]
  };
  const [a, b] = grads[kind] || ["#7c5cff", "#22d3ee"];
  let inner = "";
  if (kind === "minecraft") {
    inner = `<svg viewBox="0 0 200 170" width="100%" height="100%">
      <defs><linearGradient id="m" x1="0" y1="0" x2="200" y2="170"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
      ${[0,1,2,3].map(r=>[0,1,2,3].map(c=>`<rect x="${20+c*42}" y="${20+r*36}" width="34" height="30" rx="5" fill="url(#m)" opacity="${0.35+r*0.12}" stroke="rgba(255,255,255,.2)"/>`).join("")).join("")}
    </svg>`;
  } else if (kind === "telegram") {
    inner = `<svg viewBox="0 0 200 170" width="100%" height="100%">
      <circle cx="60" cy="55" r="22" fill="none" stroke="${a}" stroke-width="2"/>
      <circle cx="130" cy="100" r="22" fill="none" stroke="${b}" stroke-width="2"/>
      <path d="M78 58 L112 96" stroke="${a}" stroke-width="2" stroke-dasharray="3 4"/>
      <path d="M120 40 C150 50 160 80 150 120" fill="none" stroke="${b}" stroke-width="1.5" opacity=".6"/>
    </svg>`;
  } else if (kind === "automation") {
    inner = `<svg viewBox="0 0 200 170" width="100%" height="100%">
      ${[40,100,160].map((x,i)=>`<rect x="${x-16}" y="${i%2?70:60}" width="32" height="32" rx="8" fill="none" stroke="${i%2?a:b}" stroke-width="2"/>${i<2?`<line x1="${x+16}" y1="${i%2?86:76}" x2="${x+24}" y2="${i%2?76:86}" stroke="${b}" stroke-width="2"/>`:""}`).join("")}
    </svg>`;
  } else if (kind === "network") {
    inner = `<svg viewBox="0 0 200 170" width="100%" height="100%">
      ${[[40,40],[160,50],[100,120],[60,130],[150,130]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="9" fill="${i%2?a:b}"/>`).join("")}
      <path d="M40 40 L160 50 L100 120 L60 130 L150 130 L40 40" fill="none" stroke="${b}" stroke-width="1.3" opacity=".7"/>
    </svg>`;
  } else { // ai
    inner = `<svg viewBox="0 0 200 170" width="100%" height="100%">
      ${[[50,50],[150,50],[50,120],[150,120],[100,85]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="10" fill="${i===4?b:a}"/>`).join("")}
      <path d="M50 50 L100 85 L150 50 M50 120 L100 85 L150 120 M50 50 L50 120 M150 50 L150 120" stroke="${b}" stroke-width="1.3" fill="none" opacity=".7"/>
    </svg>`;
  }
  wrap.innerHTML = inner;
  return wrap;
}

CONFIG.projects.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = "work-card reveal";
  card.dataset.index = i;
  const tech = p.technologies.map(t => `<span>${t}</span>`).join("");
  card.innerHTML = `
    <div class="work-thumb"></div>
    <span class="work-more">Подробнее →</span>
    <div class="work-body">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="work-tech">${tech}</div>
    </div>`;
  card.querySelector(".work-thumb").appendChild(buildPreview(p.kind));
  card.addEventListener("click", () => openModal(i));
  worksGrid.appendChild(card);
  revealObserver.observe(card);
});

/* ---- Modal ---- */
const modal = $("#projectModal");
const modalContent = $("#modalContent");
let lastFocused = null;

function openModal(i) {
  const p = CONFIG.projects[i];
  modalContent.innerHTML = `
    <div class="modal-hero">${p.title}</div>
    <h2>${p.title}</h2>
    <div class="modal-kind">// ${p.kind}</div>
    <div class="modal-section"><h4>Кратко</h4><p>${p.description}</p></div>
    <div class="modal-section"><h4>Задача</h4><p>${p.task}</p></div>
    <div class="modal-section"><h4>Решение</h4><p>${p.solution}</p></div>
    <div class="modal-section"><h4>Технологии</h4><div class="modal-tech">${p.technologies.map(t=>`<span>${t}</span>`).join("")}</div></div>
    <div class="modal-section"><h4>Результаты</h4><p>${p.results}</p></div>
    <a class="modal-link" href="${p.link}" target="_blank" rel="noopener">Открыть на GitHub ↗</a>`;
  lastFocused = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  $(".modal-close").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocused) lastFocused.focus();
}
$$("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

/* ---------------------------------------------------------------------
   9. Code typing animation (terminal)
   --------------------------------------------------------------------- */
const typedCode = $("#typedCode");
const caret = $("#caret");
function typeCode() {
  if (!typedCode) return;
  if (prefersReduced) { typedCode.textContent = CODE_SNIPPET; return; }
  // tokenized-ish plain typing keeps it dependency-free
  let i = 0;
  const speed = 22;
  const tick = () => {
    if (i <= CODE_SNIPPET.length) {
      typedCode.textContent = CODE_SNIPPET.slice(0, i);
      i++;
      setTimeout(tick, speed + Math.random() * 22);
    }
  };
  tick();
}
// start when terminal scrolls into view
const termObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { typeCode(); termObserver.disconnect(); } });
}, { threshold: 0.4 });
const termEl = $("#terminal");
if (termEl) termObserver.observe(termEl);

/* ---------------------------------------------------------------------
   10. Custom cursor (desktop only)
   --------------------------------------------------------------------- */
if (!isTouch) {
  const cur = $(".cursor"), dot = $(".cursor-dot");
  let cx = 0, cy = 0, dx = 0, dy = 0;
  window.addEventListener("mousemove", (e) => {
    cx = e.clientX; cy = e.clientY;
    dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
  });
  const curLoop = () => {
    dx += (cx - dx) * 0.18; dy += (cy - dy) * 0.18;
    cur.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
    requestAnimationFrame(curLoop);
  };
  curLoop();
  $$("a, button, .work-card, .service-card, .tech-badge").forEach(el => {
    el.addEventListener("mouseenter", () => cur.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cur.classList.remove("is-hover"));
  });
}

/* ---------------------------------------------------------------------
   11. Mouse parallax (lightweight, applied to hero text + canvases)
   --------------------------------------------------------------------- */
const parallaxTargets = [".hero-text", ".brand"].filter(Boolean);
if (!isTouch && !prefersReduced) {
  let px = 0, py = 0;
  window.addEventListener("mousemove", (e) => {
    px = (e.clientX / window.innerWidth - 0.5);
    py = (e.clientY / window.innerHeight - 0.5);
  });
  const pLoop = () => {
    document.querySelectorAll(".hero-text").forEach(el => {
      el.style.transform = `translate(${px * 14}px, ${py * 10}px)`;
    });
    requestAnimationFrame(pLoop);
  };
  pLoop();
}

/* ---------------------------------------------------------------------
   12. Three.js scenes
   Quality auto-scales on weak / mobile devices.
   --------------------------------------------------------------------- */
const THREE = window.THREE;
const canUse3D = !!THREE && !prefersReduced;
const isMobile = window.innerWidth < 760;
const perfTier = isMobile ? "low" : (window.innerWidth < 1200 ? "med" : "high");

/* --- 12a. Hero scene: floating wireframe + particles, mouse-reactive --- */
function initHeroScene() {
  const canvas = $("#heroCanvas");
  if (!canvas || !canUse3D) { showFallback("#heroFallback"); return; }
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: perfTier !== "low" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, perfTier === "low" ? 1 : 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6;

    const group = new THREE.Group();
    scene.add(group);

    // central icosahedron wireframe
    const geo = new THREE.IcosahedronGeometry(1.8, perfTier === "high" ? 1 : 0);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x7c5cff, transparent: true, opacity: 0.7 })
    );
    group.add(wire);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.MeshBasicMaterial({ color: 0x3da8ff, wireframe: true, transparent: true, opacity: 0.25 })
    );
    group.add(inner);

    // floating small shapes
    const floaters = [];
    const n = perfTier === "high" ? 14 : perfTier === "med" ? 8 : 4;
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.18 + Math.random() * 0.12, 0),
        new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? 0x22d3ee : 0x7c5cff, transparent: true, opacity: 0.8 })
      );
      m.position.set((Math.random()-0.5)*6, (Math.random()-0.5)*4.5, (Math.random()-0.5)*3);
      m.userData = { sx: (Math.random()-0.5)*0.004, sy: (Math.random()-0.5)*0.004, baseY: m.position.y };
      group.add(m); floaters.push(m);
    }

    // particle field
    const pCount = perfTier === "high" ? 320 : perfTier === "med" ? 160 : 70;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pos[i] = (Math.random() - 0.5) * 14;
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x9d86ff, size: 0.035, transparent: true, opacity: 0.7 }));
    scene.add(particles);

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // mouse reactivity
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener("mousemove", (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    });

    const clock = new THREE.Clock();
    const loop = () => {
      const t = clock.getElapsedTime();
      mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
      group.rotation.y = t * 0.25 + mx * 0.6;
      group.rotation.x = my * 0.5;
      inner.rotation.y = -t * 0.4; inner.rotation.x = t * 0.2;
      particles.rotation.y = t * 0.04;
      floaters.forEach(f => {
        f.rotation.x += f.userData.sx; f.rotation.y += f.userData.sy;
        f.position.y = f.userData.baseY + Math.sin(t + f.position.x) * 0.2;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };
    loop();
  } catch (err) {
    console.warn("Hero 3D failed:", err);
    showFallback("#heroFallback");
  }
}

/* --- 12b. Graphics scene: network of glowing nodes + links --- */
function initGraphScene() {
  const canvas = $("#graphCanvas");
  if (!canvas || !canUse3D) { showFallback("#graphFallback"); return; }
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: perfTier !== "low" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, perfTier === "low" ? 1 : 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 9;

    const group = new THREE.Group();
    scene.add(group);

    // build nodes
    const count = perfTier === "high" ? 26 : perfTier === "med" ? 16 : 9;
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*6, (Math.random()-0.5)*5);
      nodes.push(v);
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? 0x7c5cff : 0x22d3ee })
      );
      dot.position.copy(v); group.add(dot);
    }
    // links between near nodes
    const lineMat = new THREE.LineBasicMaterial({ color: 0x3da8ff, transparent: true, opacity: 0.28 });
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (i < j && a.distanceTo(b) < 4.2) {
        const g = new THREE.BufferGeometry().setFromPoints([a, b]);
        group.add(new THREE.Line(g, lineMat));
      }
    }));

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener("mousemove", (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    });

    const clock = new THREE.Clock();
    const loop = () => {
      const t = clock.getElapsedTime();
      mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
      group.rotation.y = t * 0.08 + mx * 0.4;
      group.rotation.x = my * 0.3;
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    };
    loop();
  } catch (err) {
    console.warn("Graph 3D failed:", err);
    showFallback("#graphFallback");
  }
}

function showFallback(sel) {
  const el = $(sel);
  if (el) el.hidden = false;
}

// wait for deferred THREE to be available
function whenThreeReady(fn) {
  if (window.THREE) return fn();
  let tries = 0;
  const iv = setInterval(() => {
    if (window.THREE || tries++ > 40) { clearInterval(iv); fn(); }
  }, 50);
}
whenThreeReady(() => { initHeroScene(); initGraphScene(); });

/* ---------------------------------------------------------------------
   13. Misc: close mobile menu on resize to desktop
   --------------------------------------------------------------------- */
window.addEventListener("resize", () => {
  if (window.innerWidth > 760 && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }
});
