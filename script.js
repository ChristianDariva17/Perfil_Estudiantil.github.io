const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

// Keep mobile navigation visible when JavaScript is unavailable.
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

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

/* --- Spotlight Engine (Cursor-Reactive Lighting) --- */
const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

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

/* --- Hero HUD Magnetic 3D Tilt --- */
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

/* --- Castillo Yarinacocha Live Telemetry Simulator --- */
function initTelemetrySimulator() {
  const logContainer = document.querySelector(".telemetry-logs");
  const toggleBtn = document.querySelector(".telemetry-toggle");
  if (!logContainer) return;

  const events = [
    { tag: "AUTH", text: "Front Desk · Check-in Habitación #204 validado", color: "#38bdf8" },
    { tag: "SYNC", text: "WebSockets · Transmisión activa en 4 terminales", color: "#93c5fd" },
    { tag: "KDS", text: "Cocina Central · Comanda #118 despachada", color: "#4ade80" },
    { tag: "GATE", text: "Acceso Piscinas · QR validado (Torniquete ZKTeco)", color: "#a78bfa" },
    { tag: "CACHE", text: "Redis TLS · Estado de habitaciones sincronizado (8ms)", color: "#38bdf8" },
    { tag: "POS", text: "Caja Principal · Arqueo y corte Z registrado", color: "#facc15" },
    { tag: "SYS", text: "Cluster Node.js · Uptime 99.98% · Salud óptima", color: "#4ade80" },
  ];

  let eventIndex = 0;
  let intervalId = null;
  let isPaused = isReducedMotion;

  function getTimeString() {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  }

  function addLogEntry() {
    if (isPaused) return;

    const ev = events[eventIndex % events.length];
    eventIndex++;

    const row = document.createElement("div");
    row.className = "telemetry-row";
    row.innerHTML = `<span class="log-time">[${getTimeString()}]</span> <span class="log-tag" style="color: ${ev.color}">${ev.tag}</span> <span class="log-msg">${ev.text}</span>`;

    logContainer.appendChild(row);

    // Keep max 5 visible lines
    while (logContainer.children.length > 5) {
      logContainer.removeChild(logContainer.firstChild);
    }

    logContainer.scrollTop = logContainer.scrollHeight;
  }

  // Initial populate
  for (let i = 0; i < 3; i++) {
    addLogEntry();
  }

  if (!isReducedMotion) {
    intervalId = setInterval(addLogEntry, 3800);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      toggleBtn.setAttribute("aria-pressed", String(isPaused));
      toggleBtn.textContent = isPaused ? "Reanudar" : "Pausar";
      toggleBtn.classList.toggle("is-paused", isPaused);
    });
  }
}
initTelemetrySimulator();

/* --- Scroll Reveal Animations --- */
const revealTargets = document.querySelectorAll(
  ".section-heading, .project, .bento-card, .service-list article, .process-step, .about-stamp, .about-copy, .contact-inner",
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

