/* ==========================================================================
   CD STUDIO — Engine Interactivo Vanguardia Disruptiva
   Software Design & Development · Christian Dariva (Pucallpa, Perú)
   Architecture: 100% Vanilla Web Nativo (ES Modules / Web Standards)
   ========================================================================== */

/* --- Mobile Navigation Menu --- */
const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
  document.documentElement.classList.add("js");
}

function setMenu(open) {
  if (!menuButton || !siteNav) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  siteNav.classList.toggle("is-open", open);
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* --- Device & Accessibility Capabilities --- */
const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

/* ==========================================================================
   1. Web Audio API — Haptic Synthesizer (Zero Audio File Bloat)
   ========================================================================== */
let audioCtx = null;
let isAudioEnabled = false;

function initAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioCtor();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playHaptic(freq = 880, type = "sine", duration = 0.035, gainVal = 0.04) {
  if (!isAudioEnabled) return;
  try {
    initAudioContext();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Ignore audio autoplay policy restrictions
  }
}

function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;
  initAudioContext();
  const audioBtn = document.querySelector("#dock-audio-btn");
  const audioLabel = document.querySelector("#dock-audio-label");
  if (audioBtn) audioBtn.setAttribute("aria-pressed", String(isAudioEnabled));
  if (audioLabel) audioLabel.textContent = isAudioEnabled ? "🔊 ON" : "🔇 OFF";
  if (isAudioEnabled) {
    playHaptic(1046, "triangle", 0.08, 0.06);
  }
}

document.querySelector("#dock-audio-btn")?.addEventListener("click", toggleAudio);

/* ==========================================================================
   2. Theme Switcher Engine (Precision, Emerald, Solar, Monolith)
   ========================================================================== */
const VALID_THEMES = ["precision", "emerald", "solar", "monolith"];

function applyTheme(themeName, persist = true) {
  if (!VALID_THEMES.includes(themeName)) return;
  document.documentElement.setAttribute("data-theme", themeName);
  if (persist) {
    try {
      localStorage.setItem("cd_studio_theme", themeName);
    } catch {
      // Storage unavailable
    }
  }
  playHaptic(784, "sine", 0.05);
}

try {
  const savedTheme = localStorage.getItem("cd_studio_theme");
  if (savedTheme && VALID_THEMES.includes(savedTheme)) {
    applyTheme(savedTheme, false);
  }
} catch {
  // Storage unavailable
}

/* ==========================================================================
   3. Spotlight Engine (Cursor-Reactive Lighting Shader)
   ========================================================================== */
function initSpotlight() {
  if (isReducedMotion || isTouchDevice) return;

  const spotlightCards = document.querySelectorAll(".spotlight-card");
  if (!spotlightCards.length) return;

  let rafId = null;

  function updateCard(card, e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }

  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateCard(card, e));
    });

    card.addEventListener("mouseleave", () => {
      card.style.removeProperty("--mouse-x");
      card.style.removeProperty("--mouse-y");
    });
  });
}
initSpotlight();

/* ==========================================================================
   4. Hero HUD Magnetic 3D Tilt
   ========================================================================== */
function initHeroHUD() {
  if (isReducedMotion || isTouchDevice) return;

  const heroArt = document.querySelector(".hero-art");
  const hudCore = document.querySelector(".hud-core, .art-core");
  if (!heroArt || !hudCore) return;

  let ticking = false;

  heroArt.addEventListener("mousemove", (e) => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const rect = heroArt.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = (y * -16).toFixed(2);
      const tiltY = (x * 16).toFixed(2);

      hudCore.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`;
      ticking = false;
    });
  });

  heroArt.addEventListener("mouseleave", () => {
    hudCore.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  });
}
initHeroHUD();

/* ==========================================================================
   5. Castillo Yarinacocha Live Telemetry Simulator
   ========================================================================== */
const telemetryEvents = [
  { tag: "AUTH", text: "Front Desk · Check-in Habitación #204 validado", color: "#38bdf8" },
  { tag: "SYNC", text: "WebSockets · Transmisión activa en 4 terminales", color: "#93c5fd" },
  { tag: "KDS", text: "Cocina Central · Comanda #118 despachada", color: "#4ade80" },
  { tag: "GATE", text: "Acceso Piscinas · QR validado (Torniquete ZKTeco)", color: "#a78bfa" },
  { tag: "CACHE", text: "Redis TLS · Estado de habitaciones sincronizado (8ms)", color: "#38bdf8" },
  { tag: "POS", text: "Caja Principal · Arqueo y corte Z registrado", color: "#facc15" },
  { tag: "SYS", text: "Cluster Node.js · Uptime 99.98% · Salud óptima", color: "#4ade80" },
];

let telemetryIndex = 0;
let isTelemetryPaused = isReducedMotion;

function getTimestamp() {
  return new Date().toTimeString().split(" ")[0];
}

function injectTelemetryRow(tag, text, color = "#38bdf8") {
  const logContainer = document.querySelector(".telemetry-logs");
  if (!logContainer) return;

  const row = document.createElement("div");
  row.className = "telemetry-row";
  row.innerHTML = `<span class="log-time">[${getTimestamp()}]</span> <span class="log-tag" style="color: ${color}">${tag}</span> <span class="log-msg">${text}</span>`;

  logContainer.appendChild(row);

  while (logContainer.children.length > 5) {
    logContainer.removeChild(logContainer.firstChild);
  }

  logContainer.scrollTop = logContainer.scrollHeight;
}

function initTelemetrySimulator() {
  const logContainer = document.querySelector(".telemetry-logs");
  const toggleBtn = document.querySelector(".telemetry-toggle");
  if (!logContainer) return;

  function cycleLog() {
    if (isTelemetryPaused) return;
    const ev = telemetryEvents[telemetryIndex % telemetryEvents.length];
    telemetryIndex++;
    injectTelemetryRow(ev.tag, ev.text, ev.color);
  }

  // Populate first lines
  for (let i = 0; i < 3; i++) {
    cycleLog();
  }

  if (!isReducedMotion) {
    setInterval(cycleLog, 3800);
  }

  toggleBtn?.addEventListener("click", () => {
    isTelemetryPaused = !isTelemetryPaused;
    toggleBtn.setAttribute("aria-pressed", String(isTelemetryPaused));
    toggleBtn.textContent = isTelemetryPaused ? "Reanudar" : "Pausar";
    toggleBtn.classList.toggle("is-paused", isTelemetryPaused);
    playHaptic(650, "sine", 0.03);
  });
}
initTelemetrySimulator();

/* ==========================================================================
   6. Castillo Yarinacocha Architecture Packet Flow
   ========================================================================== */
function initArchitectureTopology() {
  const simBtn = document.querySelector("#simulate-packet-btn");
  if (!simBtn) return;

  const nodes = [
    { el: document.querySelector('.topo-node[data-node="front"]'), arrow: document.querySelector("#arrow-1") },
    { el: document.querySelector('.topo-node[data-node="node"]'), arrow: document.querySelector("#arrow-2") },
    { el: document.querySelector('.topo-node[data-node="redis"]'), arrow: document.querySelector("#arrow-3") },
    { el: document.querySelector('.topo-node[data-node="db"]'), arrow: null },
  ];

  let isRunning = false;

  simBtn.addEventListener("click", () => {
    if (isRunning) return;
    isRunning = true;
    simBtn.disabled = true;
    simBtn.style.opacity = "0.6";
    playHaptic(880, "sine", 0.04);

    let step = 0;

    function stepFlow() {
      // Clear previous active nodes
      nodes.forEach((n) => {
        n.el?.classList.remove("active-packet");
        n.arrow?.classList.remove("flowing");
      });

      if (step < nodes.length) {
        nodes[step].el?.classList.add("active-packet");
        nodes[step].arrow?.classList.add("flowing");
        playHaptic(600 + step * 180, "triangle", 0.04);
        step++;
        setTimeout(stepFlow, 340);
      } else {
        // Complete flow
        injectTelemetryRow("FLOW", "Pipeline distribuido: Evento sincronizado en 14ms (4 nodos)", "#4ade80");
        playHaptic(1200, "sine", 0.08);

        setTimeout(() => {
          nodes.forEach((n) => {
            n.el?.classList.remove("active-packet");
            n.arrow?.classList.remove("flowing");
          });
          isRunning = false;
          simBtn.disabled = false;
          simBtn.style.opacity = "1";
        }, 500);
      }
    }

    stepFlow();
  });
}
initArchitectureTopology();

/* ==========================================================================
   7. Live API Sandbox Inspector
   ========================================================================== */
const API_ENDPOINTS = {
  "/api/v1/health": {
    status: 200,
    data: {
      status: "healthy",
      node: "pucallpa-edge-01",
      uptime: "99.98%",
      latency_ms: 12,
      redis_cluster: "tls-synchronized",
      author: "Christian Dariva",
    },
  },
  "/api/v1/castillo/rooms": {
    status: 200,
    data: {
      hotel: "Castillo Yarinacocha",
      location: "Yarinacocha, Pucallpa, PE",
      total_rooms: 48,
      occupied: 36,
      available: 12,
      occupancy_rate: "75%",
      kds_active_tickets: 2,
      turnstiles_active: 3,
    },
  },
  "/api/v1/services": {
    status: 200,
    data: {
      studio: "CD STUDIO",
      specialties: [
        "Sistemas web de gestión (PMS, ERP, KDS)",
        "APIs e integraciones en tiempo real (WebSockets, Redis)",
        "Experiencias interactivas 3D/WebGL de alta velocidad",
      ],
      lead_engineer: "Christian Dariva",
      contact: "cristiandariva8@gmail.com",
    },
  },
  "/api/v1/stack": {
    status: 200,
    data: {
      backend: ["Node.js", "TypeScript", "PostgreSQL", "Redis TLS", "Docker"],
      frontend: ["Vanilla Web Nativo", "WebGL / Three.js", "CSS3 Modern Variables"],
      hardware: ["ZKteco Biometric / QR", "Impresoras Térmicas 80mm ESC/POS"],
    },
  },
};

function initApiSandbox() {
  const select = document.querySelector("#api-endpoint-select");
  const runBtn = document.querySelector("#api-run-btn");
  const badgeStatus = document.querySelector("#api-status-badge");
  const badgeTime = document.querySelector("#api-time-badge");
  const display = document.querySelector("#api-json-display");

  if (!select || !runBtn || !display) return;

  function renderJson(obj) {
    const jsonStr = JSON.stringify(obj, null, 2);
    const highlighted = jsonStr
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span class="json-str">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="json-num">$1</span>');
    display.innerHTML = `<code>${highlighted}</code>`;
  }

  runBtn.addEventListener("click", () => {
    const endpoint = select.value;
    const res = API_ENDPOINTS[endpoint] || API_ENDPOINTS["/api/v1/health"];
    const randomLatency = Math.floor(Math.random() * 14) + 11;

    playHaptic(920, "sine", 0.04);
    runBtn.style.transform = "scale(0.96)";
    setTimeout(() => (runBtn.style.transform = ""), 150);

    if (badgeStatus) badgeStatus.textContent = `STATUS: ${res.status} OK`;
    if (badgeTime) badgeTime.textContent = `LATENCIA: ${randomLatency}ms · CACHED`;

    const cloneData = { ...res.data };
    if ("latency_ms" in cloneData) {
      cloneData.latency_ms = randomLatency;
    }

    renderJson(cloneData);
  });
}
initApiSandbox();

/* ==========================================================================
   8. Floating Dynamic Island Dock (Scroll Spy & Auto-Hide)
   ========================================================================== */
function initFloatingDock() {
  const dock = document.querySelector("#floating-dock");
  if (!dock) return;

  let lastScrollY = window.scrollY;
  let isTicking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY;

          // Auto-hide when scrolling down past 280px
          if (diff > 14 && currentScrollY > 280) {
            dock.classList.add("is-hidden");
          } else if (diff < -8 || currentScrollY <= 150) {
            dock.classList.remove("is-hidden");
          }

          lastScrollY = currentScrollY;
          isTicking = false;
        });
        isTicking = true;
      }
    },
    { passive: true },
  );

  // Active section spy
  const dockLinks = dock.querySelectorAll(".dock-link");
  const trackedSections = ["inicio", "proyectos", "servicios", "contacto"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window && trackedSections.length) {
    const dockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            dockLinks.forEach((link) => {
              const href = link.getAttribute("href");
              link.classList.toggle("active", href === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    trackedSections.forEach((sec) => dockObserver.observe(sec));
  }
}
initFloatingDock();

/* ==========================================================================
   9. Command Palette Modal (Cmd + K / Ctrl + K)
   ========================================================================== */
const PALETTE_COMMANDS = [
  { id: "nav-inicio", label: "Ir a Inicio", meta: "Navegación", badge: "NAV", action: () => (window.location.hash = "#inicio") },
  { id: "nav-proyectos", label: "Ir a Proyectos", meta: "Navegación", badge: "NAV", action: () => (window.location.hash = "#proyectos") },
  { id: "nav-servicios", label: "Ir a Qué desarrollo", meta: "Navegación", badge: "NAV", action: () => (window.location.hash = "#servicios") },
  { id: "nav-como", label: "Ir a Cómo trabajo", meta: "Navegación", badge: "NAV", action: () => (window.location.hash = "#como-trabajo") },
  { id: "nav-sobre", label: "Ir a Sobre mí", meta: "Navegación", badge: "NAV", action: () => (window.location.hash = "#sobre-mi") },
  { id: "nav-contacto", label: "Ir a Contacto", meta: "Navegación", badge: "NAV", action: () => (window.location.hash = "#contacto") },

  { id: "proj-castillo", label: "Ver Caso: Castillo Yarinacocha (PMS)", meta: "Proyecto", badge: "PROJ", action: () => (window.location.href = "proyectos/castillo-yarinacocha.html") },
  { id: "proj-flores", label: "Abrir Demo: Flores Amarillas (3D WebGL)", meta: "Proyecto", badge: "PROJ", action: () => window.open("https://flores-amarillas-omega-virid.vercel.app/", "_blank", "noreferrer") },
  { id: "proj-canales", label: "Ver Caso: Canales Abiertos (Streaming HLS)", meta: "Proyecto", badge: "PROJ", action: () => (window.location.href = "proyectos/canales-abiertos.html") },
  { id: "proj-pulso", label: "Ver Caso: Landing Pulso (UX)", meta: "Proyecto", badge: "PROJ", action: () => (window.location.href = "proyectos/pulso.html") },
  { id: "proj-decide", label: "Ver Caso: Ucayali Decide 2026", meta: "Proyecto", badge: "PROJ", action: () => (window.location.href = "proyectos/ucayali-decide.html") },
  { id: "proj-desayunos", label: "Ver Caso: SistemaDesayunos (Laravel)", meta: "Proyecto", badge: "PROJ", action: () => (window.location.href = "proyectos/sistema-desayunos.html") },

  { id: "theme-precision", label: "Tema: Precision (Azul Predeterminado)", meta: "Apariencia", badge: "TEMA", action: () => applyTheme("precision") },
  { id: "theme-emerald", label: "Tema: Emerald (Matrix Verde)", meta: "Apariencia", badge: "TEMA", action: () => applyTheme("emerald") },
  { id: "theme-solar", label: "Tema: Solar (Ámbar Cálido)", meta: "Apariencia", badge: "TEMA", action: () => applyTheme("solar") },
  { id: "theme-monolith", label: "Tema: Monolith (Grafito Minimalista)", meta: "Apariencia", badge: "TEMA", action: () => applyTheme("monolith") },

  { id: "tool-cli", label: "Abrir Terminal CLI Interactivo", meta: "Herramienta", badge: "CLI", action: () => openCliOverlay() },
  { id: "tool-audio", label: "Alternar Audio Háptico ON/OFF", meta: "Herramienta", badge: "AUDIO", action: () => toggleAudio() },
  { id: "tool-matrix", label: "Lanzar Lluvia Digital Matrix", meta: "Easter Egg", badge: "SYS", action: () => startMatrixRain() },

  { id: "contact-whatsapp", label: "Contactar por WhatsApp (+51 947 648 334)", meta: "Contacto", badge: "CHAT", action: () => window.open("https://wa.me/51947648334", "_blank", "noreferrer") },
  { id: "contact-email", label: "Enviar Correo (cristiandariva8@gmail.com)", meta: "Contacto", badge: "MAIL", action: () => (window.location.href = "mailto:cristiandariva8@gmail.com") },
  { id: "contact-github", label: "Ver Perfil en GitHub", meta: "Social", badge: "LINK", action: () => window.open("https://github.com/ChristianDariva17", "_blank", "noreferrer") },
  { id: "contact-linkedin", label: "Ver Perfil en LinkedIn", meta: "Social", badge: "LINK", action: () => window.open("https://www.linkedin.com/in/christiandarivasoria/", "_blank", "noreferrer") },
];

let selectedPaletteIndex = 0;
let filteredPaletteCommands = [...PALETTE_COMMANDS];

function openCommandPalette() {
  const palette = document.querySelector("#command-palette");
  const input = document.querySelector("#palette-search");
  if (!palette || !input) return;

  palette.classList.add("is-open");
  input.value = "";
  filterPaletteCommands("");
  input.focus();
  playHaptic(1046, "sine", 0.04);
}

function closeCommandPalette() {
  const palette = document.querySelector("#command-palette");
  if (!palette) return;
  palette.classList.remove("is-open");
  playHaptic(523, "sine", 0.03);
}

function filterPaletteCommands(query) {
  const list = document.querySelector("#palette-results");
  if (!list) return;

  const normalized = query.trim().toLowerCase();
  filteredPaletteCommands = PALETTE_COMMANDS.filter((cmd) => {
    return (
      cmd.label.toLowerCase().includes(normalized) ||
      cmd.meta.toLowerCase().includes(normalized) ||
      cmd.badge.toLowerCase().includes(normalized)
    );
  });

  selectedPaletteIndex = 0;
  renderPaletteResults();
}

function renderPaletteResults() {
  const list = document.querySelector("#palette-results");
  if (!list) return;

  list.innerHTML = "";

  if (filteredPaletteCommands.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.className = "palette-item";
    emptyLi.style.justifyContent = "center";
    emptyLi.style.color = "#64748b";
    emptyLi.textContent = "No se encontraron comandos coincidentes";
    list.appendChild(emptyLi);
    return;
  }

  filteredPaletteCommands.forEach((cmd, idx) => {
    const li = document.createElement("li");
    li.className = `palette-item ${idx === selectedPaletteIndex ? "is-selected" : ""}`;
    li.id = `palette-opt-${cmd.id}`;

    const left = document.createElement("div");
    left.className = "palette-item-left";

    const badge = document.createElement("span");
    badge.className = "palette-item-badge";
    badge.textContent = cmd.badge;

    const text = document.createElement("span");
    text.textContent = cmd.label;

    left.appendChild(badge);
    left.appendChild(text);

    const meta = document.createElement("span");
    meta.style.fontSize = "11px";
    meta.style.color = "#64748b";
    meta.textContent = cmd.meta;

    li.appendChild(left);
    li.appendChild(meta);

    li.addEventListener("click", () => {
      closeCommandPalette();
      cmd.action();
    });

    list.appendChild(li);
  });

  const activeItem = list.children[selectedPaletteIndex];
  activeItem?.scrollIntoView({ block: "nearest" });
}

function executeSelectedPaletteCommand() {
  const cmd = filteredPaletteCommands[selectedPaletteIndex];
  if (cmd) {
    closeCommandPalette();
    cmd.action();
  }
}

function initCommandPalette() {
  const palette = document.querySelector("#command-palette");
  const input = document.querySelector("#palette-search");
  if (!palette || !input) return;

  // Global Shortcut Cmd + K or Ctrl + K
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (palette.classList.contains("is-open")) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === "Escape" && palette.classList.contains("is-open")) {
      closeCommandPalette();
    }
  });

  // Buttons triggers
  document.querySelector("#open-palette-btn")?.addEventListener("click", openCommandPalette);
  document.querySelector("#dock-palette-btn")?.addEventListener("click", openCommandPalette);

  // Backdrop click
  palette.addEventListener("click", (e) => {
    if (e.target === palette) {
      closeCommandPalette();
    }
  });

  // Input filter & Arrow navigation
  input.addEventListener("input", (e) => {
    filterPaletteCommands(e.target.value);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (selectedPaletteIndex < filteredPaletteCommands.length - 1) {
        selectedPaletteIndex++;
        renderPaletteResults();
        playHaptic(700, "sine", 0.02);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (selectedPaletteIndex > 0) {
        selectedPaletteIndex--;
        renderPaletteResults();
        playHaptic(700, "sine", 0.02);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      executeSelectedPaletteCommand();
    }
  });
}
initCommandPalette();

/* ==========================================================================
   10. Dual-Mode: Terminal CLI Overlay
   ========================================================================== */
let cliHistory = [];
let cliHistoryIndex = -1;

function openCliOverlay() {
  const overlay = document.querySelector("#cli-overlay");
  const input = document.querySelector("#cli-input");
  if (!overlay || !input) return;

  overlay.classList.add("is-open");
  input.focus();
  playHaptic(987, "sine", 0.05);

  const output = document.querySelector("#cli-output");
  if (output && output.children.length === 0) {
    printCliBanner();
  }
}

function closeCliOverlay() {
  const overlay = document.querySelector("#cli-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  playHaptic(440, "sine", 0.04);
}

function printCliLine(text, className = "cli-line", color = null) {
  const output = document.querySelector("#cli-output");
  const scrollBody = document.querySelector("#cli-scroll-body");
  if (!output) return;

  const div = document.createElement("div");
  div.className = className;
  if (color) div.style.color = color;
  div.innerHTML = text;
  output.appendChild(div);

  if (scrollBody) {
    scrollBody.scrollTop = scrollBody.scrollHeight;
  }
}

function printCliBanner() {
  printCliLine("╔══════════════════════════════════════════════════════════════╗", "cli-line", "#38bdf8");
  printCliLine("║  CD STUDIO CLI · INTERFACE DE CONTROL DE SISTEMAS v2.4.0      ║", "cli-line", "#93c5fd");
  printCliLine("║  Software Design & Development · Christian Dariva            ║", "cli-line", "#cbd5e1");
  printCliLine("╚══════════════════════════════════════════════════════════════╝", "cli-line", "#38bdf8");
  printCliLine("Escribe <strong style='color:#38bdf8'>help</strong> para ver la lista de comandos disponibles, o <strong style='color:#38bdf8'>gui</strong> para volver al portafolio.", "cli-line");
}

function executeCliCommand(rawCmd) {
  const cmd = rawCmd.trim();
  if (!cmd) return;

  cliHistory.push(cmd);
  cliHistoryIndex = cliHistory.length;

  printCliLine(`<span style="color:#38bdf8">cd-studio:~ guest$</span> ${cmd}`, "cli-line", "#ffffff");
  playHaptic(1100, "sine", 0.03);

  const parts = cmd.split(" ");
  const mainCmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (mainCmd) {
    case "help":
    case "?":
      printCliLine("Comandos disponibles en CD STUDIO CLI:", "cli-line", "#38bdf8");
      printCliLine("  <strong>projects</strong>               Lista los proyectos desarrollados en producción.", "cli-line");
      printCliLine("  <strong>castillo</strong>               Muestra telemetría y estado de Castillo Yarinacocha.", "cli-line");
      printCliLine("  <strong>skills</strong> | <strong>stack</strong>         Muestra el stack tecnológico y capacidades.", "cli-line");
      printCliLine("  <strong>theme &lt;nombre&gt;</strong>         Cambia el tema: precision | emerald | solar | monolith.", "cli-line");
      printCliLine("  <strong>audio &lt;on|off&gt;</strong>        Activa o desactiva la síntesis háptica de audio.", "cli-line");
      printCliLine("  <strong>matrix</strong>                 Ejecuta la lluvia digital Matrix en pantalla completa.", "cli-line");
      printCliLine("  <strong>contact</strong>                Muestra los canales de contacto directo.", "cli-line");
      printCliLine("  <strong>whoami</strong>                 Muestra la sesión actual del sistema.", "cli-line");
      printCliLine("  <strong>date</strong>                   Muestra la fecha y hora del sistema.", "cli-line");
      printCliLine("  <strong>clear</strong>                  Limpia la pantalla de la terminal.", "cli-line");
      printCliLine("  <strong>gui</strong> | <strong>exit</strong>             Cierra la terminal y vuelve a la vista normal.", "cli-line");
      break;

    case "projects":
    case "proyectos":
    case "ls":
      printCliLine("Portafolio Seleccionado:", "cli-line", "#38bdf8");
      printCliLine("  [01] <strong>Castillo Yarinacocha</strong> — PMS, KDS, Redis TLS, WebSockets (Pucallpa, PE)", "cli-line");
      printCliLine("  [02] <strong>Flores Amarillas</strong> — Escena interactiva 3D WebGL / Three.js", "cli-line");
      printCliLine("  [03] <strong>Canales Abiertos</strong> — Streaming multimedia HLS y cine legal en español", "cli-line");
      printCliLine("  [04] <strong>Landing Pulso</strong> — Landing de producto y microinteracciones", "cli-line");
      printCliLine("  [05] <strong>Ucayali Decide 2026</strong> — Plataforma cívica con datos abiertos del JNE", "cli-line");
      printCliLine("  [06] <strong>SistemaDesayunos</strong> — Gestión comercial integral en Laravel / PHP", "cli-line");
      break;

    case "castillo":
      printCliLine("Telemetría Castillo Yarinacocha Core:", "cli-line", "#4ade80");
      printCliLine("  • Estado: ONLINE (Cluster Node.js + Redis TLS + Postgres)", "cli-line");
      printCliLine("  • Áreas operativas: Front Desk, KDS Cocina, Caja Z 80mm, Torniquetes ZK", "cli-line");
      printCliLine("  • Latencia de evento: 12ms · Sincronización WebSockets bidireccional", "cli-line");
      printCliLine("  • Portal: <a href='https://admin.grupodariva.cloud/' target='_blank' style='color:#38bdf8;text-decoration:underline;'>admin.grupodariva.cloud ↗</a>", "cli-line");
      break;

    case "skills":
    case "stack":
      printCliLine("Stack Tecnológico · Christian Dariva:", "cli-line", "#38bdf8");
      printCliLine("  • <strong>Backend &amp; Sistemas:</strong> Node.js, TypeScript, PostgreSQL, Redis TLS, Docker, Linux", "cli-line");
      printCliLine("  • <strong>Frontend &amp; Interacción:</strong> Vanilla Web Nativo, CSS3 Grid/Variables, WebGL, Three.js", "cli-line");
      printCliLine("  • <strong>Hardware &amp; IoT:</strong> Torniquetes ZKteco, Lectores QR, Impresoras Térmicas 80mm", "cli-line");
      printCliLine("  • <strong>Metodología:</strong> Arquitectura limpia, telemetría en vivo, cero bloat.", "cli-line");
      break;

    case "theme":
      if (args[0] && VALID_THEMES.includes(args[0].toLowerCase())) {
        const selected = args[0].toLowerCase();
        applyTheme(selected);
        printCliLine(`Tema cambiado exitosamente a: <strong>${selected}</strong>`, "cli-line", "#4ade80");
      } else {
        printCliLine(`Uso: theme &lt;nombre&gt;. Opciones válidas: ${VALID_THEMES.join(" | ")}`, "cli-line", "#facc15");
      }
      break;

    case "audio":
      if (args[0] === "on") {
        if (!isAudioEnabled) toggleAudio();
        printCliLine("Audio háptico: ACTIVADO 🔊", "cli-line", "#4ade80");
      } else if (args[0] === "off") {
        if (isAudioEnabled) toggleAudio();
        printCliLine("Audio háptico: DESACTIVADO 🔇", "cli-line", "#facc15");
      } else {
        printCliLine("Uso: audio on | audio off", "cli-line", "#facc15");
      }
      break;

    case "matrix":
      closeCliOverlay();
      startMatrixRain();
      break;

    case "contact":
    case "contacto":
      printCliLine("Canales de Contacto Directo:", "cli-line", "#38bdf8");
      printCliLine("  • WhatsApp: <a href='https://wa.me/51947648334' target='_blank' style='color:#4ade80;'>+51 947 648 334 ↗</a>", "cli-line");
      printCliLine("  • Email: <a href='mailto:cristiandariva8@gmail.com' style='color:#38bdf8;'>cristiandariva8@gmail.com ↗</a>", "cli-line");
      printCliLine("  • LinkedIn: <a href='https://www.linkedin.com/in/christiandarivasoria/' target='_blank' style='color:#93c5fd;'>linkedin.com/in/christiandarivasoria/ ↗</a>", "cli-line");
      printCliLine("  • GitHub: <a href='https://github.com/ChristianDariva17' target='_blank' style='color:#93c5fd;'>github.com/ChristianDariva17 ↗</a>", "cli-line");
      break;

    case "whoami":
      printCliLine("guest@cd-studio (Pucallpa, PE) · Privilegios de observador", "cli-line");
      break;

    case "date":
      printCliLine(new Date().toString(), "cli-line");
      break;

    case "clear":
      const output = document.querySelector("#cli-output");
      if (output) output.innerHTML = "";
      break;

    case "gui":
    case "exit":
    case "quit":
      closeCliOverlay();
      break;

    default:
      printCliLine(`Comando no reconocido: '<strong>${cmd}</strong>'. Escribe '<strong>help</strong>' para ayuda.`, "cli-line", "#ef4444");
      playHaptic(300, "sawtooth", 0.06);
      break;
  }
}

function initCliOverlay() {
  const overlay = document.querySelector("#cli-overlay");
  const form = document.querySelector("#cli-form");
  const input = document.querySelector("#cli-input");
  const closeBtn = document.querySelector("#cli-close-btn");

  if (!overlay || !form || !input) return;

  document.querySelector("#open-cli-btn")?.addEventListener("click", openCliOverlay);
  document.querySelector("#dock-cli-btn")?.addEventListener("click", openCliOverlay);

  closeBtn?.addEventListener("click", closeCliOverlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeCliOverlay();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value;
    input.value = "";
    executeCliCommand(val);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCliOverlay();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cliHistory.length > 0 && cliHistoryIndex > 0) {
        cliHistoryIndex--;
        input.value = cliHistory[cliHistoryIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cliHistoryIndex < cliHistory.length - 1) {
        cliHistoryIndex++;
        input.value = cliHistory[cliHistoryIndex];
      } else {
        cliHistoryIndex = cliHistory.length;
        input.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.value.trim().toLowerCase();
      const candidates = ["help", "projects", "castillo", "skills", "theme", "audio", "matrix", "contact", "clear", "gui", "exit"];
      const match = candidates.find((c) => c.startsWith(current));
      if (match) {
        input.value = match;
      }
    }
  });
}
initCliOverlay();

/* ==========================================================================
   11. Matrix Digital Rain Canvas & Konami Code Easter Egg
   ========================================================================== */
let matrixInterval = null;

function startMatrixRain() {
  const canvas = document.querySelector("#matrix-canvas");
  if (!canvas) return;

  canvas.classList.add("is-active");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789CDSTUDIO";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  playHaptic(1200, "triangle", 0.1, 0.08);

  function draw() {
    ctx.fillStyle = "rgba(4, 7, 15, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#4ade80";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  if (matrixInterval) clearInterval(matrixInterval);
  matrixInterval = setInterval(draw, 33);

  function stopMatrixRain() {
    if (matrixInterval) clearInterval(matrixInterval);
    canvas.classList.remove("is-active");
    window.removeEventListener("keydown", handleMatrixEsc);
    canvas.removeEventListener("click", stopMatrixRain);
  }

  function handleMatrixEsc(e) {
    if (e.key === "Escape") stopMatrixRain();
  }

  window.addEventListener("keydown", handleMatrixEsc);
  canvas.addEventListener("click", stopMatrixRain);
}

// Konami Code Listener (↑ ↑ ↓ ↓ ← → ← → B A)
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiPosition = 0;

document.addEventListener("keydown", (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === konamiCode[konamiPosition]) {
    konamiPosition++;
    if (konamiPosition === konamiCode.length) {
      konamiPosition = 0;
      startMatrixRain();
    }
  } else {
    konamiPosition = 0;
  }
});

/* ==========================================================================
   12. Scroll Reveal Animations
   ========================================================================== */
const revealTargets = document.querySelectorAll(
  ".section-heading, .project, .bento-card, .service-list article, .process-step, .about-stamp, .about-copy, .contact-inner, .api-sandbox-card",
);

if ("IntersectionObserver" in window && !isReducedMotion) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    observer.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

/* ==========================================================================
   13. Developer Console Signature Banner
   ========================================================================== */
console.log(
  "%c CD STUDIO %c Software Design & Development %c Pucallpa, PE ",
  "background: #1d4ed8; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;",
  "background: #0f172a; color: #38bdf8; padding: 4px 8px; border: 1px solid #1d4ed8;",
  "background: #334155; color: #ffffff; padding: 4px 8px; border-radius: 0 4px 4px 0;",
);
console.log(
  "%cPresiona Ctrl+K para abrir la paleta de comandos, o escribe 'startMatrixRain()' en la consola.",
  "color: #94a3b8; font-size: 11px; margin-top: 4px;",
);
