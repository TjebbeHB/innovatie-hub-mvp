/* ============================================================
   Innovatie Hub — applicatie (SPA met hash-routing)
   ============================================================ */

(function () {
  "use strict";

  const app = document.getElementById("app");

  /* ---------- Hulpfuncties ---------- */

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(k, fb) { try { const v = localStorage.getItem("ihub:" + k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
    set(k, v) { try { localStorage.setItem("ihub:" + k, JSON.stringify(v)); } catch { } }
  };

  function allProjects() { return PROJECTS.concat(store.get("extraProjects", [])); }
  function getProject(id) { return allProjects().find(p => p.id === id); }
  function person(id) { return PEOPLE.find(p => p.id === id) || PEOPLE[0]; }
  function initials(n) { return n.split(" ").filter(Boolean).map(w => w[0]).slice(0, 2).join("").toUpperCase(); }
  function interests() { return store.get("interests", USER.interesses); }

  function parseDate(d) { // "DD-MM-JJJJ" -> sorteerbaar
    if (!d || d === "-") return 0;
    const [dd, mm, yy] = d.split("-").map(Number);
    return (yy || 0) * 10000 + (mm || 0) * 100 + (dd || 0);
  }

  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------- Iconen ---------- */

  const I = {
    home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    bulb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.5 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0 0 12 3z"/></svg>',
    folder: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/></svg>',
    globe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
    gear: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.01a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.01a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"/></svg>',
    search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    filter: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16l-6.5 8v5L10 20v-7z"/></svg>',
    grid: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    listIc: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5-7 7 7 7"/></svg>',
    share: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="5.5" r="2.5"/><circle cx="17" cy="18.5" r="2.5"/><path d="m8.3 10.8 6.4-4M8.3 13.2l6.4 4"/></svg>',
    download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>',
    file: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/></svg>',
    linkIc: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 19"/></svg>',
    mail: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    linkedin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.98 0zM.4 8.4h4.6V24H.4zM8.6 8.4h4.4v2.1h.1c.6-1.2 2.1-2.4 4.3-2.4 4.6 0 5.5 3 5.5 7V24h-4.6v-7.9c0-1.9 0-4.3-2.6-4.3s-3 2-3 4.1V24H8.6z"/></svg>',
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>',
    reset: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5"/></svg>',
    pencil: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.8 2.8 0 0 1 4 4L8 20l-5 1 1-5z"/></svg>',
    upload: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 16V4m0 0 4 4m-4-4-4 4M4 20h16"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/></svg>',
    logo: '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 16h6M10 19h4M12 4.5a5.5 5.5 0 0 0-3.7 9.6c.6.6 1 1.3 1 2h5.4c0-.7.4-1.4 1-2A5.5 5.5 0 0 0 12 4.5z"/><path d="M17.5 3.5a5.5 5.5 0 0 1 2.8 7.7" opacity=".5"/><path d="M6.5 3.5a5.5 5.5 0 0 0-2.8 7.7" opacity=".5"/></svg>',
    lion: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.5 1.4 1.6 2.2 3 2.5-.6 1-.6 2 0 3-1.2.4-2 1.2-2.3 2.4h2.8c1.5 0 2.5 1 2.5 2.5v5.1c0 2-1.3 3.5-3.3 3.5H9.3C7.3 21 6 19.5 6 17.5v-5.1C6 10.9 7 10 8.5 10h2.8C11 8.8 10.2 8 9 7.6c.6-1 .6-2 0-3 1.4-.3 2.5-1.1 3-2.6z"/></svg>',
    trend: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
    chipIc: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10.2" y="10.2" width="3.6" height="3.6"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/></svg>',
    extern: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4h6v6M20 4 10 14M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></svg>'
  };

  /* Thema-iconen voor projectafbeeldingen */
  const THEME_ICONS = {
    "Data": '<svg class="icon" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6"/><path d="M4.5 11.5v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6"/></svg>',
    "AI": '<svg class="icon" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><rect x="6" y="7" width="12" height="11" rx="2.5"/><circle cx="9.7" cy="12" r="1.2" fill="#fff"/><circle cx="14.3" cy="12" r="1.2" fill="#fff"/><path d="M9.5 15.3h5M12 7V4.4M12 4.4a1.3 1.3 0 1 0-.1 0zM6 10.5H3.8M18 10.5h2.2"/></svg>',
    "Cloud": '<svg class="icon" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18.2 10 3.8 3.8 0 0 1 17.5 18z"/></svg>',
    "Digitale weerbaarheid": '<svg class="icon" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M12 3 5 5.5v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10v-5z"/><path d="m9.3 12 2 2 3.6-4"/></svg>',
    "Digitaal vakmanschap": '<svg class="icon" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12"/></svg>',
    "Burgergericht": '<svg class="icon" width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c0-3 2.5-4.8 5.5-4.8s5.5 1.8 5.5 4.8"/><circle cx="16.5" cy="9.5" r="2.4"/><path d="M16 14.6c2.6.2 4.5 1.9 4.5 4.4"/></svg>'
  };

  function thumbStyle(theme) {
    const c = THEME_COLORS[theme] || "#888";
    return `background: linear-gradient(135deg, ${c}cc, ${c});`;
  }

  function tagHtml(theme) {
    return `<span class="tag" style="background:${THEME_COLORS[theme] || "#888"}">${esc(theme)}</span>`;
  }

  function statusDot(status) {
    return `<span class="status-dot" style="background:${STATUS_COLORS[status] || "#999"}" title="${esc(status)}"></span>`;
  }

  /* ---------- Router ---------- */

  const routes = {
    "login": renderLogin,
    "onboarding": renderOnboarding,
    "home": renderHome,
    "trends": renderTrends,
    "trend": renderTrendDetail,
    "technologieen": renderTechnologieen,
    "technologie": renderTechnologieDetail,
    "innovaties": renderInnovaties,
    "projecten": renderInnovaties,
    "project": renderProject,
    "mijn-projecten": renderMijnProjecten,
    "nieuw-project": renderNieuwProject,
    "netwerk": renderNetwerk,
    "account": renderAccount
  };

  function nav(hash) { location.hash = hash; }

  function route() {
    const raw = location.hash.replace(/^#\/?/, "") || "login";
    const [path, queryStr] = raw.split("?");
    const [page, param] = path.split("/");
    const query = new URLSearchParams(queryStr || "");
    const loggedIn = sessionStorage.getItem("ihub:loggedin") === "1";
    if (!loggedIn && page !== "login") { location.hash = "#/login"; return; }
    if (loggedIn && (page === "login" || page === "")) { location.hash = "#/home"; return; }
    const fn = routes[page] || renderHome;
    window.scrollTo(0, 0);
    fn(param, query);
  }

  window.addEventListener("hashchange", route);

  /* ---------- Schil (sidebar) ---------- */

  function shell(active, content) {
    const items = [
      ["home", I.home, "Home"],
      ["trends", I.trend, "Trends"],
      ["technologieen", I.chipIc, "Technologieën"],
      ["innovaties", I.bulb, "Projecten"],
      ["mijn-projecten", I.folder, "Mijn projecten"],
      ["netwerk", I.globe, "Netwerk"]
    ];
    const bottom = [
      ["account", I.user, "Mijn account"],
      ["instellingen", I.gear, "Instellingen"]
    ];
    const link = ([id, ic, lbl]) => {
      const cls = "nav-item" + (active === id ? " active" : "");
      if (id === "instellingen") return `<button class="${cls}" onclick="IH.toast('Instellingen zijn nog niet beschikbaar in deze MVP')">${ic}<span>${lbl}</span></button>`;
      return `<a class="${cls}" href="#/${id}">${ic}<span>${lbl}</span></a>`;
    };
    app.innerHTML = `
      <div class="app">
        <aside class="sidebar">
          <div class="brand">Innovatie Hub</div>
          <nav>${items.map(link).join("")}</nav>
          <nav class="nav-bottom">${bottom.map(link).join("")}</nav>
        </aside>
        <main class="main">${content}</main>
      </div>`;
  }

  /* ---------- Login ---------- */

  function renderLogin() {
    app.innerHTML = `
      <div class="auth-page">
        <div class="ro-header"><div class="ro-ribbon">${I.lion}<span>Rijksoverheid</span></div></div>
        <div class="auth-body">
          <div class="auth-card">
            <div class="auth-logo">${I.logo}</div>
            <h1>Innovatie Hub</h1>
            <div class="auth-sub">Log in op je account</div>
            <form id="loginForm">
              <div class="field">
                <label for="email">E-mailadres</label>
                <input type="text" id="email" placeholder="Vul je e-mailadres in" autocomplete="off">
              </div>
              <div class="field">
                <label for="pw">Wachtwoord</label>
                <div class="pw-wrap">
                  <input type="password" id="pw" placeholder="Vul je wachtwoord in" autocomplete="off">
                  <button type="button" class="pw-toggle" id="pwToggle" aria-label="Toon wachtwoord">${I.eye}</button>
                </div>
              </div>
              <div class="auth-links"><a href="#" onclick="IH.toast('Wachtwoord herstellen is nog niet beschikbaar in deze MVP');return false;">Wachtwoord vergeten?</a></div>
              <button class="btn btn-primary" type="submit">Inloggen</button>
            </form>
            <div class="auth-alt">Nog geen account? <a href="#" onclick="IH.toast('Registreren is nog niet beschikbaar in deze MVP');return false;">Registreer</a></div>
          </div>
        </div>
        <div class="auth-footer">© 2026 Digicampus — demo met projectdata van digitaleoverheid.nl</div>
      </div>`;
    document.getElementById("pwToggle").onclick = () => {
      const pw = document.getElementById("pw");
      pw.type = pw.type === "password" ? "text" : "password";
    };
    document.getElementById("loginForm").onsubmit = e => {
      e.preventDefault();
      sessionStorage.setItem("ihub:loggedin", "1");
      nav(store.get("onboarded", false) ? "#/home" : "#/onboarding");
    };
  }

  /* ---------- Onboarding ---------- */

  function renderOnboarding() {
    const sel = new Set(interests());
    app.innerHTML = `
      <div class="auth-page">
        <div class="auth-body">
          <div class="auth-card wide">
            <div class="onb-top">
              <button class="icon-btn" onclick="history.back()">${I.back}</button>
              <a href="#/home" id="skip">Sla voor nu over</a>
            </div>
            <h1>Welkom bij de Innovatie Hub</h1>
            <div class="auth-sub">Selecteer de Trendroos-domeinen die aansluiten bij jouw interesses (Rijksbrede Trendverkenning)</div>
            <div class="chip-cloud" id="chips">
              ${DOMAINS.map(i => `<button type="button" class="chip ${sel.has(i) ? "selected" : ""}" data-i="${esc(i)}">${sel.has(i) ? "✓" : "+"} ${esc(i)}</button>`).join("")}
            </div>
            <button class="toon-meer" id="toonMeer" style="display:none">Toon meer</button>
            <button class="btn btn-primary" id="verder">Ga verder</button>
          </div>
        </div>
        <div class="auth-footer">© 2026 Digicampus — demo met projectdata van digitaleoverheid.nl</div>
      </div>`;

    let expanded = false;
    const chipsEl = document.getElementById("chips");

    function renderChips() {
      chipsEl.innerHTML = DOMAINS.map(i => `<button type="button" class="chip ${sel.has(i) ? "selected" : ""}" data-i="${esc(i)}">${sel.has(i) ? "✓" : "+"} ${esc(i)}</button>`).join("");
    }
    chipsEl.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      const v = b.dataset.i;
      sel.has(v) ? sel.delete(v) : sel.add(v);
      renderChips();
    });
    document.getElementById("toonMeer").onclick = e => {
      expanded = !expanded;
      e.target.textContent = expanded ? "Toon minder" : "Toon meer";
      renderChips();
    };
    document.getElementById("verder").onclick = () => {
      store.set("interests", [...sel]);
      store.set("onboarded", true);
      nav("#/home");
    };
    document.getElementById("skip").onclick = () => store.set("onboarded", true);
  }

  /* ---------- Home (dashboard) ---------- */

  const homeFilters = { org: "", fase: "", status: "" };

  function pieSvg(data) {
    // data: [{label, value, color}]
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const cx = 150, cy = 150, r = 105, lr = 128;
    let angle = -Math.PI / 2;
    let paths = "", labels = "";
    data.forEach(d => {
      if (!d.value) return;
      const frac = d.value / total;
      const a2 = angle + frac * Math.PI * 2;
      const large = frac > .5 ? 1 : 0;
      const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
      const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      if (frac >= .999) {
        paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${d.color}"/>`;
      } else {
        paths += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${d.color}" stroke="#fff" stroke-width="1.5"><title>${esc(d.label)}: ${d.value}</title></path>`;
      }
      const mid = (angle + a2) / 2;
      const lx = cx + lr * Math.cos(mid), ly = cy + lr * Math.sin(mid);
      const anchor = Math.cos(mid) > .25 ? "start" : (Math.cos(mid) < -.25 ? "end" : "middle");
      labels += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" font-size="11.5" fill="#1a1f26">${esc(d.label)} (${d.value})</text>`;
      angle = a2;
    });
    return `<svg viewBox="-140 -14 590 330" width="100%" style="max-width:560px" role="img" aria-label="Projecten per thema">${paths}${labels}</svg>`;
  }

  /* ---------- Trendroos-wiel (15 sub-domeinen, 7 clusters) ---------- */

  function polarPoint(cx, cy, r, deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }
  function wheelArcPath(cx, cy, rOuter, rInner, startDeg, endDeg) {
    const [x1, y1] = polarPoint(cx, cy, rOuter, startDeg);
    const [x2, y2] = polarPoint(cx, cy, rOuter, endDeg);
    const [x3, y3] = polarPoint(cx, cy, rInner, endDeg);
    const [x4, y4] = polarPoint(cx, cy, rInner, startDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M${x1.toFixed(1)},${y1.toFixed(1)} A${rOuter},${rOuter} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} A${rInner},${rInner} 0 ${large} 0 ${x4.toFixed(1)},${y4.toFixed(1)} Z`;
  }

  function trendroosWheel(counts) {
    // counts: { domein: aantal }
    const cx = 170, cy = 170;
    const rInnerOuter = 145, rInnerInner = 70;   // domeinring
    const rOuterOuter = 163, rOuterInner = 149;  // clusterring
    const step = 360 / DOMAINS.length;
    let start = 0, domainSegs = "", clusterSegs = "", labels = "";
    const clusters = [];
    DOMAINS.forEach(d => {
      const end = start + step;
      const color = DOMAIN_COLORS[d];
      const n = counts[d] || 0;
      domainSegs += `<path d="${wheelArcPath(cx, cy, rInnerOuter, rInnerInner, start, end)}" fill="${color}" stroke="#fff" stroke-width="1.5" opacity="${n ? 1 : .35}"><title>${esc(d)}: ${n}</title></path>`;
      if (n) {
        const [nx, ny] = polarPoint(cx, cy, (rInnerOuter + rInnerInner) / 2, (start + end) / 2);
        labels += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" font-size="11" font-weight="700" text-anchor="middle" dominant-baseline="central" fill="${DOMAIN_TEXT_COLORS[d]}">${n}</text>`;
      }
      let cl = clusters.find(c => c.name === DOMAIN_CLUSTERS[d]);
      if (!cl) { cl = { name: DOMAIN_CLUSTERS[d], start, color }; clusters.push(cl); }
      cl.end = end;
      start = end;
    });
    clusters.forEach(cl => {
      clusterSegs += `<path d="${wheelArcPath(cx, cy, rOuterOuter, rOuterInner, cl.start + 2, cl.end - 2)}" fill="${cl.color}" opacity="0.55"><title>${esc(cl.name)}</title></path>`;
    });
    return `<svg viewBox="0 0 340 340" width="100%" style="max-width:330px;display:block;margin:0 auto" aria-hidden="true">${domainSegs}${clusterSegs}${labels}</svg>`;
  }

  function domainListHtml(counts) {
    const byCluster = {};
    DOMAINS.forEach(d => { (byCluster[DOMAIN_CLUSTERS[d]] = byCluster[DOMAIN_CLUSTERS[d]] || []).push(d); });
    return `<div class="domain-list">${Object.entries(byCluster).map(([cluster, domains]) => `
      <div class="domain-cluster">
        <div class="domain-cluster-title">${esc(cluster)}</div>
        <div class="domain-chips">${domains.map(d => `
          <button type="button" class="domain-chip" style="background:${DOMAIN_COLORS[d]};color:${DOMAIN_TEXT_COLORS[d]}" data-domain="${esc(d)}">${esc(d)} · ${counts[d] || 0}</button>
        `).join("")}</div>
      </div>`).join("")}</div>`;
  }

  /* ---------- Trends: helpers ---------- */

  function trendRadar(t) {
    // seed-radar + eigen radar-vermeldingen uit localStorage
    const own = (store.get("trendRadar", {})[t.id]) || [];
    return t.radar.concat(own);
  }
  function tijdspadBadge(t) {
    return `<span class="pill" style="background:${TIJDSPAD_COLORS[t.tijdspad]}">${esc(t.tijdspad)}</span>`;
  }
  function radarBadge(positie) {
    return `<span class="pill" style="background:${RADAR_COLORS[positie] || "#6D727A"}">${esc(positie)}</span>`;
  }
  function relevantieBadge(niveau) {
    return `<span class="pill" style="background:${RELEVANTIE_COLORS[niveau] || "#6D727A"}">${esc(niveau)}</span>`;
  }

  function trendCardHtml(t) {
    const radar = trendRadar(t);
    const orgCount = new Set(radar.map(r => r.org)).size;
    const delen = radar.filter(r => r.resultaat).length;
    return `
      <div class="card pcard" data-id="${esc(t.id)}" data-type="trend" role="link" tabindex="0" aria-label="${esc(t.naam)}">
        <div class="thumb thumb-flat" style="background:${DOMAIN_COLORS[t.domein]}"><span class="tag tag-plain" style="color:${DOMAIN_TEXT_COLORS[t.domein]}">${esc(t.domein)}</span></div>
        <div class="body">
          <h3>${esc(t.naam)}</h3>
          <div class="org">${orgCount} organisatie${orgCount === 1 ? "" : "s"} op de radar${delen ? ` · ${delen} ${delen === 1 ? "deelt" : "delen"} resultaten` : ""}</div>
          <p>${esc(t.beschrijving)}</p>
          <div class="labels-block">${tijdspadBadge(t)}</div>
        </div>
      </div>`;
  }

  /* ---------- Technologieën: helpers ---------- */

  function techStats(t) {
    const expls = EXPLORATIES.filter(e => e.technologieId === t.id);
    return { explCount: expls.length, orgCount: new Set(expls.map(e => e.org)).size };
  }

  function technologieCardHtml(t) {
    const stats = techStats(t);
    return `
      <div class="card pcard" data-id="${esc(t.id)}" data-type="tech" role="link" tabindex="0" aria-label="${esc(t.naam)}">
        <div class="thumb thumb-flat" style="background:${DOMAIN_COLORS[t.domein]}"><span class="tag tag-plain" style="color:${DOMAIN_TEXT_COLORS[t.domein]}">${esc(t.domein)}</span></div>
        <div class="body">
          <h3>TRL ${t.trl} · ${esc(t.naam)}</h3>
          <div class="org">${stats.orgCount} organisatie${stats.orgCount === 1 ? "" : "s"} onderzoekt dit</div>
          <p>${esc(t.korteBeschrijving)}</p>
          <div class="labels-block">${t.labels.slice(0, 4).map(l => `<span class="label-chip">${esc(l)}</span>`).join("")}</div>
        </div>
      </div>`;
  }

  function renderHome() {
    const projs = allProjects();
    const orgs = [...new Set(projs.map(p => p.org))].sort();
    const fases = ["Idee", "Proof of concept", "Pilot", "Implementatie", "Opgeschaald"];
    const statuses = Object.keys(STATUS_COLORS);

    const my = interests();
    const recTrends = TRENDS.filter(t => my.includes(t.domein));
    const recTechs = TECHNOLOGIEEN.filter(t => my.includes(t.domein));
    const recProjs = projs.filter(p => my.includes(THEME_TO_DOMAIN[p.theme]));
    let recList = [
      ...recTrends.map(trendCardHtml),
      ...recTechs.map(technologieCardHtml),
      ...recProjs.slice(0, 6).map(cardHtml)
    ];
    if (!recList.length) recList = TRENDS.slice(0, 4).map(trendCardHtml).concat(projs.slice(0, 4).map(cardHtml));

    shell("home", `
      <h1 class="page-title" style="margin-bottom:22px">Welkom ${esc(USER.voornaam)}</h1>
      <div class="demo-banner">Projectdata afkomstig van digitaleoverheid.nl (Innovatiebudget Digitale Overheid); thema, labels, status en fase zijn redactioneel afgeleid. Technologieën en exploraties zijn representatief samengesteld op basis van publieke bronnen; trends en radar-vermeldingen zijn redactioneel/indicatief. Domeinindeling volgt de Rijksbrede Trendverkenning (mei 2026).</div>

      <div class="card dash-card">
        <div class="head">
          <div>
            <h2 id="trendTitle"></h2>
            <div class="sub">De 15 sub-domeinen uit de Rijksbrede Trendverkenning, gegroepeerd in 7 clusters — klik op een domein voor de trends</div>
          </div>
          <a href="#/trends">Bekijk alle trends</a>
        </div>
        <div class="dash-body">
          <div class="pie-wrap" id="wheel"></div>
          <div class="dash-filters">
            <div class="select-wrap"><select id="tTijdspad"><option value="">Filter op tijdspad</option>${TIJDSPAD_LABELS.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
            <div class="select-wrap"><select id="tSector"><option value="">Filter op sector (relevantie)</option>${SECTOREN.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
            <button class="reset" id="tReset">Reset filters ${I.reset}</button>
          </div>
        </div>
        <div id="domainListWrap"></div>
      </div>

      <div class="card dash-card">
        <div class="head">
          <div>
            <h2 id="dashTitle"></h2>
            <div class="sub">De thema's zijn verdeeld op basis van NDS-thema's (Nederlandse Digitaliseringsstrategie)</div>
          </div>
          <a href="#/innovaties">Bekijk alle projecten</a>
        </div>
        <div class="dash-body">
          <div class="pie-wrap" id="pie"></div>
          <div class="dash-filters">
            <div class="select-wrap"><select id="fOrg"><option value="">Filter op organisatie</option>${orgs.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
            <div class="select-wrap"><select id="fFase"><option value="">Filter op projectfase</option>${fases.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
            <div class="select-wrap"><select id="fStatus"><option value="">Filter op projectstatus</option>${statuses.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
            <button class="reset" id="fReset">Reset filters ${I.reset}</button>
          </div>
        </div>
      </div>

      <div class="section-head">
        <h2>Gebaseerd op jouw interesses</h2>
        <a href="#/account">Wijzig interesses ${I.pencil}</a>
      </div>
      <div class="hscroll">${recList.join("")}</div>
    `);

    // Trendroos-blok
    const tTijdspad = document.getElementById("tTijdspad"), tSector = document.getElementById("tSector");
    function trendCounts() {
      const filtered = TRENDS.filter(t =>
        (!tTijdspad.value || t.tijdspad === tTijdspad.value) &&
        (!tSector.value || ["Hoog", "Gemiddeld"].includes(t.sectorRelevantie[tSector.value]))
      );
      const c = {};
      filtered.forEach(t => { c[t.domein] = (c[t.domein] || 0) + 1; });
      return { c, n: filtered.length };
    }
    function updateTrends() {
      const { c, n } = trendCounts();
      document.getElementById("trendTitle").textContent = `Trends (${n}) per Trendroos-domein`;
      document.getElementById("wheel").innerHTML = trendroosWheel(c);
      document.getElementById("domainListWrap").innerHTML = domainListHtml(c);
      document.getElementById("domainListWrap").querySelectorAll(".domain-chip").forEach(btn => {
        btn.onclick = () => { location.hash = `#/trends?domein=${encodeURIComponent(btn.dataset.domain)}`; };
      });
    }
    tTijdspad.onchange = tSector.onchange = updateTrends;
    document.getElementById("tReset").onclick = () => { tTijdspad.value = tSector.value = ""; updateTrends(); };
    updateTrends();

    // Projecten-blok
    const fOrg = document.getElementById("fOrg"), fFase = document.getElementById("fFase"), fStatus = document.getElementById("fStatus");
    fOrg.value = homeFilters.org; fFase.value = homeFilters.fase; fStatus.value = homeFilters.status;

    function update() {
      homeFilters.org = fOrg.value; homeFilters.fase = fFase.value; homeFilters.status = fStatus.value;
      const filtered = projs.filter(p =>
        (!homeFilters.org || p.org === homeFilters.org) &&
        (!homeFilters.fase || p.fase === homeFilters.fase) &&
        (!homeFilters.status || p.status === homeFilters.status)
      );
      const data = THEMES.map(t => ({
        label: t, color: THEME_COLORS[t],
        value: filtered.filter(p => p.theme === t).length
      })).filter(d => d.value > 0);
      document.getElementById("dashTitle").textContent = `Alle innovatieprojecten (${filtered.length}) per thema`;
      document.getElementById("pie").innerHTML = filtered.length ? pieSvg(data) : `<div class="empty">Geen projecten gevonden met deze filters.</div>`;
    }
    fOrg.onchange = fFase.onchange = fStatus.onchange = update;
    document.getElementById("fReset").onclick = () => { fOrg.value = fFase.value = fStatus.value = ""; update(); };
    update();
    bindCards();
  }

  /* ---------- Trends: overzicht ---------- */

  const trendState = { q: "", domein: "", tijdspad: "", sector: "", sort: "naam" };

  function renderTrends(param, query) {
    if (query && query.get("domein")) trendState.domein = query.get("domein");

    shell("trends", `
      <div class="page-head">
        <div>
          <h1 class="page-title">Trends</h1>
          <div class="page-sub">Maatschappelijke en technologische trends uit de Rijksbrede Trendverkenning — wie heeft wat op de radar, en wat kwam eruit</div>
        </div>
      </div>
      <div class="toolbar">
        <div class="searchbox">${I.search}<input id="q" placeholder="Zoeken" value="${esc(trendState.q)}"></div>
        <div class="select-wrap"><select id="tDomein"><option value="">Alle domeinen</option>${DOMAINS.map(d => `<option>${esc(d)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="tTijdspad"><option value="">Alle tijdspaden</option>${TIJDSPAD_LABELS.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="tSector"><option value="">Alle sectoren</option>${SECTOREN.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
      </div>
      <div class="result-bar"><span id="count"></span></div>
      <div id="results" class="grid"></div>
    `);

    const $ = id => document.getElementById(id);
    $("tDomein").value = trendState.domein; $("tTijdspad").value = trendState.tijdspad; $("tSector").value = trendState.sector;

    function update() {
      const list = TRENDS.filter(t => {
        const hay = [t.naam, t.domein, t.beschrijving, ...trendRadar(t).map(r => r.org)].join(" ").toLowerCase();
        return (!trendState.q || hay.includes(trendState.q.toLowerCase())) &&
          (!trendState.domein || t.domein === trendState.domein) &&
          (!trendState.tijdspad || t.tijdspad === trendState.tijdspad) &&
          (!trendState.sector || ["Hoog", "Gemiddeld"].includes(t.sectorRelevantie[trendState.sector]));
      }).sort((a, b) => a.naam.localeCompare(b.naam, "nl"));
      $("count").textContent = `${list.length} ${list.length === 1 ? "trend" : "trends"}`;
      $("results").innerHTML = list.length ? list.map(trendCardHtml).join("") : `<div class="empty">Geen trends gevonden. Pas je zoekopdracht of filters aan.</div>`;
      bindCards();
    }
    $("q").oninput = e => { trendState.q = e.target.value; update(); };
    $("tDomein").onchange = e => { trendState.domein = e.target.value; update(); };
    $("tTijdspad").onchange = e => { trendState.tijdspad = e.target.value; update(); };
    $("tSector").onchange = e => { trendState.sector = e.target.value; update(); };
    update();
  }

  /* ---------- Trends: detail ---------- */

  function renderTrendDetail(id) {
    const t = TRENDS.find(x => x.id === id);
    if (!t) { shell("trends", `<div class="empty">Trend niet gevonden. <a href="#/trends">Terug naar trends</a></div>`); return; }
    const techs = TECHNOLOGIEEN.filter(x => t.technologieIds.includes(x.id));
    const linkedProjects = allProjects().filter(p => (t.projectIds || []).includes(p.id));

    function radarRows() {
      const radar = trendRadar(t);
      if (!radar.length) return `<div class="empty">Nog geen organisaties op de radar voor deze trend.</div>`;
      return radar.map(r => `
        <div class="card radar-row">
          <div class="radar-head">
            <div><strong>${esc(r.org)}</strong>${r.eigen ? ` <span class="label-chip">eigen invoer</span>` : ""}<div class="org">${esc(r.sector)} · ${esc(r.jaar)}</div></div>
            ${radarBadge(r.positie)}
          </div>
          <p><strong>Waarom:</strong> ${esc(r.waarom)}</p>
          ${r.resultaat ? `<div class="resultaat-box"><strong>Gedeeld resultaat</strong><br>${esc(r.resultaat)}</div>` : ""}
        </div>`).join("");
    }

    const onderzoekers = trendRadar(t).filter(r => r.positie !== "Op de radar").map(r => r.org);
    const delers = trendRadar(t).filter(r => r.resultaat).map(r => r.org);
    const alGemeld = trendRadar(t).some(r => r.org === USER.org);

    shell("trends", `
      <a href="#/trends" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;margin-bottom:14px">${I.back} Terug naar trends</a>
      <div class="page-head">
        <div>
          <h1 class="page-title">${esc(t.naam)}</h1>
          <div class="page-sub" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:8px">
            <span class="pill" style="background:${DOMAIN_COLORS[t.domein]};color:${DOMAIN_TEXT_COLORS[t.domein]}">${esc(t.domein)}</span>
            ${tijdspadBadge(t)}
            <span>${esc(DOMAIN_CLUSTERS[t.domein])}</span>
          </div>
        </div>
      </div>
      <p style="max-width:820px;margin-bottom:22px">${esc(t.beschrijving)}</p>

      <div class="two-col" style="margin-bottom:24px">
        <div class="card content-card">
          <h3>Relevantie per sector</h3>
          <div class="sector-table">
            ${SECTOREN.map(s => `<div class="sector-row"><span>${esc(s)}</span>${relevantieBadge(t.sectorRelevantie[s] || "Beperkt")}</div>`).join("")}
          </div>
        </div>
        <div class="card content-card">
          <h3>Samen onderzoeken</h3>
          <p>${onderzoekers.length ? `<strong>${esc([...new Set(onderzoekers)].join(", "))}</strong> ${new Set(onderzoekers).size === 1 ? "is" : "zijn"} met deze trend bezig${delers.length ? `; ${esc([...new Set(delers)].join(", "))} ${new Set(delers).size === 1 ? "deelt" : "delen"} de resultaten hieronder` : ""}.` : "Nog niemand onderzoekt deze trend actief — wees de eerste."}</p>
          ${alGemeld
        ? `<p style="margin-top:10px"><strong>${esc(USER.org)}</strong> staat op de radar voor deze trend. ✓</p>`
        : `<div class="radar-form" id="radarForm">
            <div class="row2" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              <div class="select-wrap"><select id="rfPositie">${RADAR_POSITIES.map(p => `<option>${esc(p)}</option>`).join("")}</select></div>
              <div class="select-wrap"><select id="rfSector">${SECTOREN.map(s => `<option>${esc(s)}</option>`).join("")}</select></div>
            </div>
            <textarea id="rfWaarom" placeholder="Waarom is deze trend relevant voor jullie organisatie?" style="width:100%;margin-top:10px;border:1px solid #c9ced6;border-radius:6px;padding:9px 12px;font-family:inherit;font-size:13.5px;min-height:64px"></textarea>
            <button class="btn btn-primary" id="rfSave" style="margin-top:10px">Zet ${esc(USER.org)} op de radar</button>
          </div>`}
        </div>
      </div>

      <div class="section-head"><h2>Wie heeft deze trend op de radar (${trendRadar(t).length})</h2></div>
      <div class="radar-list" id="radarList">${radarRows()}</div>

      ${techs.length ? `<div class="section-head" style="margin-top:28px"><h2>Technologieën bij deze trend</h2><a href="#/technologieen">Alle technologieën</a></div>
      <div class="hscroll">${techs.map(technologieCardHtml).join("")}</div>` : ""}

      ${linkedProjects.length ? `<div class="section-head" style="margin-top:28px"><h2>Innovatieprojecten bij deze trend</h2><a href="#/innovaties">Alle projecten</a></div>
      <div class="hscroll">${linkedProjects.map(p => cardHtml(p, { labels: true })).join("")}</div>` : ""}
    `);

    const saveBtn = document.getElementById("rfSave");
    if (saveBtn) saveBtn.onclick = () => {
      const waarom = document.getElementById("rfWaarom").value.trim();
      if (!waarom) { toast("Vul in waarom deze trend relevant is voor jullie organisatie"); return; }
      const all = store.get("trendRadar", {});
      (all[t.id] = all[t.id] || []).push({
        org: USER.org, sector: document.getElementById("rfSector").value,
        positie: document.getElementById("rfPositie").value,
        jaar: String(new Date().getFullYear()), waarom, resultaat: "", eigen: true
      });
      store.set("trendRadar", all);
      toast(`${USER.org} staat nu op de radar voor deze trend`);
      renderTrendDetail(id);
    };
    bindCards();
  }

  /* ---------- Technologieën: kompas & TRL ---------- */

  function kompasBadgeHtml(e) {
    if (!e.kompas) return "";
    const label = KOMPAS_LABELS[e.kompas.positie];
    const isRelational = e.kompas.positie === "samen" || e.kompas.positie === "doorgaan";
    const suffix = isRelational && e.kompas.gekoppeldeOrgs.length ? ": " + e.kompas.gekoppeldeOrgs.join(", ") : "";
    return `<span class="pill" style="background:${KOMPAS_COLORS[e.kompas.positie]};color:${KOMPAS_TEXT_COLORS[e.kompas.positie]}">${esc(label + suffix)}</span>`;
  }

  function kompasSummaryHtml(expls) {
    const order = ["wel", "nogniet", "pastniet", "nietrelevant", "samen", "doorgaan"];
    const counts = {};
    order.forEach(k => { counts[k] = 0; });
    expls.forEach(e => { if (e.kompas) counts[e.kompas.positie]++; });
    const used = order.filter(k => counts[k] > 0);
    if (!used.length) return "";
    const segments = used.map(k => `<div class="kompas-segment" style="flex:${counts[k]};background:${KOMPAS_COLORS[k]};color:${KOMPAS_TEXT_COLORS[k]}" title="${esc(KOMPAS_LABELS[k])}: ${counts[k]}">${counts[k]}</div>`).join("");
    const legend = used.map(k => `<span><span class="kompas-dot" style="background:${KOMPAS_COLORS[k]}"></span>${esc(KOMPAS_LABELS[k])} (${counts[k]})</span>`).join("");
    return `
      <div class="card content-card" style="margin-bottom:20px">
        <h3>Kompas — hoe staan organisaties hierin?</h3>
        <div class="kompas-bar">${segments}</div>
        <div class="kompas-legend">${legend}</div>
      </div>`;
  }

  function trlBar(trl) {
    return `<div class="trl-bar" title="Technology Readiness Level ${trl} van 9" aria-label="TRL ${trl} van 9">
      ${Array.from({ length: 9 }, (_, i) => `<span class="trl-step${i < trl ? " filled" : ""}"></span>`).join("")}
      <span class="trl-label">TRL ${trl}/9</span>
    </div>`;
  }

  /* ---------- Technologieën: overzicht ---------- */

  const techState = { q: "", domein: "", sort: "naam" };

  function renderTechnologieen(param, query) {
    if (query && query.get("domein")) techState.domein = query.get("domein");

    shell("technologieen", `
      <div class="page-head">
        <div>
          <h1 class="page-title">Technologieën</h1>
          <div class="page-sub">Opkomende technologieën waar overheidsorganisaties aan werken, geclassificeerd naar Trendroos-domein en volwassenheid (TRL)</div>
        </div>
      </div>
      <div class="toolbar">
        <div class="searchbox">${I.search}<input id="q" placeholder="Zoeken" value="${esc(techState.q)}"></div>
        <div class="select-wrap"><select id="tDomein"><option value="">Alle domeinen</option>${DOMAINS.map(d => `<option>${esc(d)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="tSort"><option value="naam">Sorteer op: naam</option><option value="trl">Sorteer op: TRL (hoog–laag)</option><option value="orgs">Sorteer op: meeste organisaties</option></select></div>
      </div>
      <div class="result-bar"><span id="count"></span></div>
      <div id="results" class="grid"></div>
    `);

    const $ = id => document.getElementById(id);
    $("tDomein").value = techState.domein; $("tSort").value = techState.sort;

    function update() {
      let list = TECHNOLOGIEEN.filter(t => {
        const hay = [t.naam, t.domein, t.korteBeschrijving, ...t.labels].join(" ").toLowerCase();
        return (!techState.q || hay.includes(techState.q.toLowerCase())) &&
          (!techState.domein || t.domein === techState.domein);
      });
      if (techState.sort === "naam") list.sort((a, b) => a.naam.localeCompare(b.naam, "nl"));
      if (techState.sort === "trl") list.sort((a, b) => b.trl - a.trl);
      if (techState.sort === "orgs") list.sort((a, b) => techStats(b).orgCount - techStats(a).orgCount);
      $("count").textContent = `${list.length} ${list.length === 1 ? "technologie" : "technologieën"}`;
      $("results").innerHTML = list.length ? list.map(technologieCardHtml).join("") : `<div class="empty">Geen technologieën gevonden.</div>`;
      bindCards();
    }
    $("q").oninput = e => { techState.q = e.target.value; update(); };
    $("tDomein").onchange = e => { techState.domein = e.target.value; update(); };
    $("tSort").onchange = e => { techState.sort = e.target.value; update(); };
    update();
  }

  /* ---------- Technologieën: detail ---------- */

  function renderTechnologieDetail(id) {
    const t = TECHNOLOGIEEN.find(x => x.id === id);
    if (!t) { shell("technologieen", `<div class="empty">Technologie niet gevonden. <a href="#/technologieen">Terug naar technologieën</a></div>`); return; }
    const expls = EXPLORATIES.filter(e => e.technologieId === t.id);
    const linkedTrends = TRENDS.filter(x => x.technologieIds.includes(t.id));
    const similar = TECHNOLOGIEEN.filter(x => x.id !== t.id && (x.domein === t.domein || x.labels.some(l => t.labels.includes(l)))).slice(0, 6);

    shell("technologieen", `
      <a href="#/technologieen" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;margin-bottom:14px">${I.back} Terug naar technologieën</a>
      <div class="page-head">
        <div>
          <h1 class="page-title">${esc(t.naam)}</h1>
          <div class="page-sub" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:8px">
            <span class="pill" style="background:${DOMAIN_COLORS[t.domein]};color:${DOMAIN_TEXT_COLORS[t.domein]}">${esc(t.domein)}</span>
            <span>${expls.length} exploratie${expls.length === 1 ? "" : "s"} · ${techStats(t).orgCount} organisaties</span>
          </div>
        </div>
      </div>
      <p style="max-width:820px">${esc(t.korteBeschrijving)}</p>
      <div style="margin:12px 0 6px">${trlBar(t.trl)}</div>
      <div class="labels-block" style="margin-bottom:22px">${t.labels.map(l => `<span class="label-chip">${esc(l)}</span>`).join(" ")}</div>

      ${kompasSummaryHtml(expls)}

      <div class="section-head"><h2>Wie onderzoekt dit (${expls.length})</h2></div>
      <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
        ${expls.map(e => `
          <div class="card content-card">
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
              <div><h3 style="margin-bottom:2px">${esc(e.org)}</h3>
              <div class="org">${esc(e.typeOrganisatie)} · ${esc(e.jaar)} · <strong style="color:${EXPL_STATUS_COLORS[e.status]}">${esc(e.status)}</strong></div></div>
              ${kompasBadgeHtml(e)}
            </div>
            <p style="margin-top:10px">${esc(e.samenvatting)}</p>
            ${e.uitkomst ? `<div class="resultaat-box"><strong>Uitkomst</strong><br>${esc(e.uitkomst)}</div>` : ""}
            <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
              <span class="org">${esc(e.team)}</span>
              ${e.bron ? `<a href="${esc(e.bron)}" target="_blank" rel="noopener">Bron ${I.extern}</a>` : ""}
            </div>
          </div>`).join("")}
      </div>

      ${linkedTrends.length ? `<div class="section-head" style="margin-top:28px"><h2>Hoort bij deze trends</h2><a href="#/trends">Alle trends</a></div>
      <div class="hscroll">${linkedTrends.map(trendCardHtml).join("")}</div>` : ""}

      ${similar.length ? `<div class="section-head" style="margin-top:28px"><h2>Soortgelijke technologieën</h2></div>
      <div class="hscroll">${similar.map(technologieCardHtml).join("")}</div>` : ""}
    `);
    bindCards();
  }

  /* ---------- Projectkaart ---------- */

  function cardHtml(p, opts = {}) {
    const c = person(p.contactId);
    return `
      <div class="card pcard" data-id="${esc(p.id)}" role="link" tabindex="0" aria-label="${esc(p.title)}">
        <div class="thumb" style="${thumbStyle(p.theme)}">${THEME_ICONS[p.theme] || ""}${tagHtml(p.theme)}</div>
        <div class="body">
          <h3>${statusDot(p.status)}${esc(p.title)}</h3>
          <div class="org">${esc(p.org)}</div>
          <p>${esc(p.kort)}</p>
          ${opts.labels ? `
            <div class="labels-block">
              <div class="lbl-title">Labels</div>
              ${p.labels.slice(0, 4).map(l => `<span class="label-chip">${esc(l)}</span>`).join("")}
            </div>
            <div class="contact"><span class="avatar" style="width:26px;height:26px;font-size:10.5px;background:${c.kleur}">${initials(c.naam)}</span> ${esc(c.naam)}</div>` : ""}
        </div>
      </div>`;
  }

  function bindCards() {
    document.querySelectorAll(".pcard[data-id]").forEach(el => {
      const base = { trend: "#/trend/", tech: "#/technologie/" }[el.dataset.type] || "#/project/";
      const go = () => nav(base + el.dataset.id);
      el.addEventListener("click", go);
      el.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
    });
  }

  /* ---------- Innovaties (alle projecten) ---------- */

  const innoState = { q: "", theme: "", org: "", fase: "", status: "", jaar: "", typeOrg: "", sort: "titel", view: "grid", filterOpen: false };

  function renderInnovaties() {
    const projs = allProjects();
    const orgs = [...new Set(projs.map(p => p.org))].sort();
    const fases = ["Idee", "Proof of concept", "Pilot", "Implementatie", "Opgeschaald"];
    const jaren = [...new Set(projs.map(p => p.jaar).filter(Boolean))].sort().reverse();
    const typesOrg = [...new Set(projs.map(p => p.typeOrganisatie).filter(Boolean))].sort();

    shell("innovaties", `
      <div class="page-head">
        <div>
          <h1 class="page-title">Innovatieprojecten</h1>
          <div class="page-sub">Alle projecten die zijn uitgevoerd met het Innovatiebudget Digitale Overheid (bron: digitaleoverheid.nl)</div>
        </div>
      </div>
      <div class="toolbar">
        <div class="searchbox">${I.search}<input id="q" placeholder="Zoeken" value="${esc(innoState.q)}"></div>
        <button class="btn btn-ghost" id="filterBtn">${I.filter} Filter</button>
        <div class="select-wrap">
          <select id="sort">
            <option value="titel">Sorteer op: titel</option>
            <option value="nieuwste">Sorteer op: nieuwste</option>
            <option value="organisatie">Sorteer op: organisatie</option>
          </select>
        </div>
      </div>
      <div class="filter-panel ${innoState.filterOpen ? "open" : ""}" id="filterPanel">
        <div class="select-wrap"><select id="pTheme"><option value="">Alle thema's</option>${THEMES.map(t => `<option>${esc(t)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="pOrg"><option value="">Alle organisaties</option>${orgs.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="pFase"><option value="">Alle projectfases</option>${fases.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="pStatus"><option value="">Alle statussen</option>${Object.keys(STATUS_COLORS).map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="pJaar"><option value="">Alle jaren</option>${jaren.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
        <div class="select-wrap"><select id="pTypeOrg"><option value="">Alle organisatietypes</option>${typesOrg.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
      </div>
      <div class="result-bar">
        <span id="count"></span>
        <div class="view-toggle">
          <button id="vGrid" title="Rasterweergave">${I.grid}</button>
          <button id="vList" title="Lijstweergave">${I.listIc}</button>
        </div>
      </div>
      <div id="results"></div>
    `);

    const $ = id => document.getElementById(id);
    $("sort").value = innoState.sort;
    $("pTheme").value = innoState.theme; $("pOrg").value = innoState.org;
    $("pFase").value = innoState.fase; $("pStatus").value = innoState.status;
    $("pJaar").value = innoState.jaar; $("pTypeOrg").value = innoState.typeOrg;

    function update() {
      let list = projs.filter(p => {
        const hay = [p.title, p.org, p.kort, p.beschrijving, p.theme, p.jaar, p.typeOrganisatie, p.plaats, ...(p.partners || []), ...(p.labels || [])].join(" ").toLowerCase();
        return (!innoState.q || hay.includes(innoState.q.toLowerCase())) &&
          (!innoState.theme || p.theme === innoState.theme) &&
          (!innoState.org || p.org === innoState.org) &&
          (!innoState.fase || p.fase === innoState.fase) &&
          (!innoState.status || p.status === innoState.status) &&
          (!innoState.jaar || p.jaar === innoState.jaar) &&
          (!innoState.typeOrg || p.typeOrganisatie === innoState.typeOrg);
      });
      if (innoState.sort === "titel") list.sort((a, b) => a.title.localeCompare(b.title, "nl"));
      if (innoState.sort === "nieuwste") list.sort((a, b) => (b.jaar || "").localeCompare(a.jaar || "") || parseDate(b.gepubliceerd) - parseDate(a.gepubliceerd));
      if (innoState.sort === "organisatie") list.sort((a, b) => a.org.localeCompare(b.org, "nl"));

      $("count").textContent = `${list.length} ${list.length === 1 ? "resultaat" : "resultaten"}`;
      $("vGrid").classList.toggle("active", innoState.view === "grid");
      $("vList").classList.toggle("active", innoState.view === "list");
      $("results").className = innoState.view === "grid" ? "grid" : "list";
      $("results").innerHTML = list.length
        ? list.map(p => cardHtml(p, { labels: true })).join("")
        : `<div class="empty">Geen projecten gevonden. Pas je zoekopdracht of filters aan.</div>`;
      bindCards();
    }

    $("q").oninput = e => { innoState.q = e.target.value; update(); };
    $("filterBtn").onclick = () => { innoState.filterOpen = !innoState.filterOpen; $("filterPanel").classList.toggle("open", innoState.filterOpen); };
    $("sort").onchange = e => { innoState.sort = e.target.value; update(); };
    ["pTheme", "pOrg", "pFase", "pStatus", "pJaar", "pTypeOrg"].forEach(id => {
      $(id).onchange = e => {
        innoState[{ pTheme: "theme", pOrg: "org", pFase: "fase", pStatus: "status", pJaar: "jaar", pTypeOrg: "typeOrg" }[id]] = e.target.value;
        update();
      };
    });
    $("vGrid").onclick = () => { innoState.view = "grid"; update(); };
    $("vList").onclick = () => { innoState.view = "list"; update(); };
    update();
  }

  /* ---------- Projectdetail ---------- */

  function renderProject(id) {
    const p = getProject(id);
    if (!p) { shell("innovaties", `<div class="empty">Project niet gevonden. <a href="#/innovaties">Terug naar overzicht</a></div>`); return; }
    const c = person(p.contactId);
    const similar = allProjects().filter(o => o.id !== p.id && (o.theme === p.theme || o.labels.some(l => p.labels.includes(l)))).slice(0, 8);

    const tabs = [
      ["info", "Projectinformatie"],
      ["probleem", "Probleem- & doelstelling"],
      ["lessen", "Geleerde lessen"],
      ["contact", "Contactpersoon"],
      ["bieb", "Bibliotheek"],
      ["soortgelijk", "Soortgelijke projecten"]
    ];

    const tabContent = {
      info: `
        <div class="two-col">
          <div class="card content-card">
            <h3>Projectbeschrijving</h3>
            <p>${esc(p.beschrijving)}</p>
            ${p.context ? `<h3>Broncontext</h3><p>${esc(p.context)}</p>` : ""}
          </div>
          <div style="display:flex;flex-direction:column;gap:20px">
            <div class="card content-card">
              <h3>GDI-bouwblokken</h3>
              <div>${p.gdi && p.gdi.length
                ? p.gdi.map((g, i) => `<span class="gdi-chip" style="background:${["#fce7f3", "#dcfce7", "#e0e7ff", "#f1f5f9", "#fef3c7", "#e0f2fe"][i % 6]}">${esc(g)}</span>`).join("")
                : `<p style="font-size:13px;color:var(--text-muted)">Geen GDI-bouwblokken herkend in de projectbeschrijving.</p>`}</div>
            </div>
            <div class="card content-card">
              <h3>Labels</h3>
              <div>${p.labels.map(l => `<span class="label-chip">${esc(l)}</span>`).join("")}</div>
            </div>
            ${(TRENDS.filter(t => (t.projectIds || []).includes(p.id))).length ? `
            <div class="card content-card">
              <h3>Onderdeel van trends</h3>
              ${TRENDS.filter(t => (t.projectIds || []).includes(p.id)).map(t => `
                <a href="#/trend/${esc(t.id)}" style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:13.5px">
                  <span class="kompas-dot" style="background:${DOMAIN_COLORS[t.domein]}"></span>${esc(t.naam)}
                </a>`).join("")}
            </div>` : ""}
          </div>
        </div>`,
      probleem: `
        <div class="two-col">
          <div class="card content-card"><h3>Probleemstelling</h3><p>${esc(p.probleem) || `Er is geen aparte probleemstelling gepubliceerd op digitaleoverheid.nl. Zie de projectbeschrijving of de bronpagina.`}</p></div>
          <div class="card content-card"><h3>Doelstelling</h3><p>${esc(p.doel) || `Er is geen aparte doelstelling gepubliceerd op digitaleoverheid.nl. Zie de projectbeschrijving of de bronpagina.`}</p></div>
        </div>`,
      lessen: `
        <div class="card content-card">
          <h3>Geleerde lessen</h3>
          ${p.lessen && p.lessen.length ? `<ul>${p.lessen.map(l => `<li>${esc(l)}</li>`).join("")}</ul>` : `<p>Er zijn geen geleerde lessen gepubliceerd voor dit project. Raadpleeg de bronpagina op digitaleoverheid.nl voor actuele informatie.</p>`}
        </div>`,
      contact: `
        <div class="contact-grid">
          <div class="card contact-card">
            <span class="avatar" style="width:74px;height:74px;font-size:22px;background:${c.kleur}">${initials(c.naam)}</span>
            <div class="info">
              <div class="name">${esc(c.naam)}</div>
              <div class="k">Organisatie</div><div class="v">${esc(c.org)}</div>
              <div class="k">Afdeling</div><div class="v">${esc(c.afdeling)}</div>
              <div class="k">Rol/functie</div><div class="v">${esc(c.rol)}</div>
              <div class="k">Betrokken bij</div><div class="v">${esc(c.betrokkenBij)}</div>
            </div>
          </div>
          <div class="card socials">
            <h3>Contact</h3>
            ${c.email ? `<div class="row"><span class="ic">${I.mail}</span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></div>` : ""}
            ${c.tel ? `<div class="row"><span class="ic">${I.phone}</span><span>${esc(c.tel)}</span></div>` : ""}
            ${p.bron ? `<div class="row"><span class="ic">${I.linkIc}</span><a href="${esc(p.bron)}" target="_blank" rel="noopener">Projectpagina op digitaleoverheid.nl</a></div>` : ""}
            ${!c.email && !c.tel ? `<p style="font-size:12.5px;color:var(--text-muted);margin-top:8px">Er zijn geen persoonlijke contactgegevens gepubliceerd; neem contact op via de projectpagina of de regievoerende organisatie.</p>` : ""}
          </div>
        </div>`,
      bieb: `
        <div class="file-list">
          ${p.files.map(f => `
            <div class="card file-row">
              ${f.type === "link" ? I.linkIc : I.file}
              <span class="fname">${esc(f.naam)}${f.type !== "link" ? ` (${esc(f.type)}, ${esc(f.grootte)}, ${esc(f.datum)})` : ` (${esc(f.datum)})`}</span>
              ${f.url
                ? `<a href="${esc(f.url)}" target="_blank" rel="noopener">Openen</a>`
                : `<a href="#" onclick="IH.toast('Voorbeeldbestand — downloads zijn niet beschikbaar in deze demo');return false;">${f.actie === "download" ? I.download + " Download" : "Openen"}</a>`}
            </div>`).join("")}
        </div>`,
      soortgelijk: similar.length
        ? `<div class="hscroll">${similar.map(o => cardHtml(o, { labels: true })).join("")}</div>`
        : `<div class="empty">Geen soortgelijke projecten gevonden.</div>`
    };

    shell("innovaties", `
      <div class="detail-top">
        <button class="icon-btn" onclick="history.back()" aria-label="Terug">${I.back}</button>
        <button class="icon-btn" id="shareBtn" aria-label="Delen">${I.share}</button>
      </div>
      <div class="detail-head">
        <div class="thumb" style="${thumbStyle(p.theme)}">${THEME_ICONS[p.theme] || ""}${tagHtml(p.theme)}</div>
        <div class="detail-meta">
          <h1>${esc(p.title)}</h1>
          <div class="meta-grid">
            <div class="meta-item"><div class="k">Project status</div><div class="v">${statusDot(p.status)}${esc(p.status)}</div></div>
            <div class="meta-item"><div class="k">Jaar innovatiebudget</div><div class="v">${esc(p.jaar || "-")}</div></div>
            <div class="meta-item"><div class="k">Projectfase</div><div class="v">${esc(p.fase)}</div></div>
            <div class="meta-item"><div class="k">Type organisatie</div><div class="v">${esc(p.typeOrganisatie || "-")}</div></div>
            <div class="meta-item"><div class="k">Regievoerder</div><div class="v">${esc(p.org)}</div></div>
            <div class="meta-item"><div class="k">Plaats</div><div class="v">${esc(p.plaats || "-")}</div></div>
            <div class="meta-item"><div class="k">Partnerorganisaties</div><div class="v">${esc((p.partners || []).join(", ") || "-")}</div></div>
            <div class="meta-item"><div class="k">Bron</div><div class="v">${p.bron ? `<a href="${esc(p.bron)}" target="_blank" rel="noopener">digitaleoverheid.nl</a>` : "-"}</div></div>
          </div>
        </div>
      </div>
      <div class="tabs" id="tabs">
        ${tabs.map(([tid, lbl], i) => `<button data-t="${tid}" class="${i === 0 ? "active" : ""}">${lbl}</button>`).join("")}
      </div>
      <div id="tabBody">${tabContent.info}</div>
    `);

    document.getElementById("tabs").addEventListener("click", e => {
      const b = e.target.closest("button[data-t]"); if (!b) return;
      document.querySelectorAll("#tabs button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      document.getElementById("tabBody").innerHTML = tabContent[b.dataset.t];
      bindCards();
    });
    document.getElementById("shareBtn").onclick = () => {
      const url = location.href;
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast("Link gekopieerd naar klembord"));
      else toast("Kopieer de link uit de adresbalk om te delen");
    };
    bindCards();
  }

  /* ---------- Mijn projecten ---------- */

  const mijnState = { tab: "Alle", q: "" };

  function renderMijnProjecten() {
    const mine = allProjects().filter(p => p.mine);
    const tabs = ["Alle", "Afgerond", "Lopend", "Gestopt", "On hold", "Concept"];
    const count = t => t === "Alle" ? mine.length : mine.filter(p => p.status === t).length;

    shell("mijn-projecten", `
      <div class="page-head">
        <div>
          <h1 class="page-title">Mijn projecten</h1>
          <div class="page-sub">Beheer, bekijk en werk verder aan je projecten</div>
        </div>
        <a class="btn btn-primary" href="#/nieuw-project">Nieuw project ${I.plus}</a>
      </div>
      <div class="toolbar">
        <div class="searchbox">${I.search}<input id="q" placeholder="Zoeken" value="${esc(mijnState.q)}"></div>
      </div>
      <div class="status-tabs" id="stabs">
        ${tabs.map(t => `<button data-t="${t}" class="${mijnState.tab === t ? "active" : ""}">${t === "Alle" ? "Alle projecten" : t} (${count(t)})</button>`).join("")}
      </div>
      <div id="results" class="grid"></div>
    `);

    function update() {
      let list = mine.filter(p =>
        (mijnState.tab === "Alle" || p.status === mijnState.tab) &&
        (!mijnState.q || (p.title + " " + p.org + " " + p.kort).toLowerCase().includes(mijnState.q.toLowerCase()))
      );
      document.getElementById("results").innerHTML = list.length
        ? list.map(p => cardHtml(p, { labels: true })).join("")
        : `<div class="empty">Geen projecten in deze categorie.</div>`;
      bindCards();
    }
    document.getElementById("stabs").addEventListener("click", e => {
      const b = e.target.closest("button[data-t]"); if (!b) return;
      mijnState.tab = b.dataset.t;
      document.querySelectorAll("#stabs button").forEach(x => x.classList.toggle("active", x === b));
      update();
    });
    document.getElementById("q").oninput = e => { mijnState.q = e.target.value; update(); };
    update();
  }

  /* ---------- Nieuw project ---------- */

  function renderNieuwProject() {
    const fases = ["Idee", "Proof of concept", "Pilot", "Implementatie", "Opgeschaald"];
    const statuses = Object.keys(STATUS_COLORS);

    shell("mijn-projecten", `
      <a href="#/mijn-projecten" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;margin-bottom:14px">${I.back} Terug naar projecten</a>
      <div class="np-layout">
        <form class="card np-form" id="npForm">
          <h1>Nieuw project aanmaken</h1>
          <div class="sub">Vul hieronder de gegevens in om een nieuw innovatieproject toe te voegen</div>

          <div class="np-section">
            <button type="button" class="sec-head">Projectinformatie <span>⌃</span></button>
            <div class="sec-body">
              <div class="row2">
                <div class="field"><label class="req" for="npTitel">Titel</label><input type="text" id="npTitel" placeholder="Voer projecttitel in"></div>
                <div class="field"><label class="req" for="npThema">Thema</label>
                  <div class="select-wrap"><select id="npThema"><option value="">Kies een thema</option>${THEMES.map(t => `<option>${esc(t)}</option>`).join("")}</select></div>
                </div>
              </div>
              <div class="field">
                <label>Afbeelding</label>
                <div class="upload-zone">
                  <button type="button" class="btn btn-ghost" onclick="IH.toast('Uploaden is nog niet beschikbaar in deze MVP')">Uploaden ${I.upload}</button>
                  <strong>Kies een bestand of sleep het hiernaartoe</strong>
                  JPEG, PNG, SVG en WebP-afbeeldingen
                </div>
              </div>
              <div class="field"><label class="req" for="npOms">Omschrijving</label><textarea id="npOms" placeholder="Voer projectomschrijving in"></textarea></div>
            </div>
          </div>

          <div class="np-section">
            <button type="button" class="sec-head">Projectdetails <span>⌃</span></button>
            <div class="sec-body">
              <div class="row2">
                <div class="field"><label class="req" for="npStatus">Projectstatus</label>
                  <div class="select-wrap"><select id="npStatus">${statuses.map(s => `<option>${esc(s)}</option>`).join("")}</select></div>
                </div>
                <div class="field"><label class="req" for="npFase">Projectfase</label>
                  <div class="select-wrap"><select id="npFase">${fases.map(f => `<option>${esc(f)}</option>`).join("")}</select></div>
                </div>
              </div>
              <div class="row2">
                <div class="field"><label class="req" for="npStart">Startdatum</label><input type="date" id="npStart"></div>
                <div class="field"><label for="npEind">Einddatum</label><input type="date" id="npEind"></div>
              </div>
            </div>
          </div>

          <div class="np-section">
            <button type="button" class="sec-head">Contactpersoon <span>⌃</span></button>
            <div class="sec-body">
              <div class="radio-row">
                <label><input type="radio" name="cp" checked> Ik ben de contactpersoon</label>
                <label><input type="radio" name="cp"> Selecteer een persoon</label>
                <label><input type="radio" name="cp"> Handmatig invoeren</label>
              </div>
              <div class="me-card">
                <span class="avatar">${USER.initialen}</span>
                <div>
                  <div class="nm">${esc(USER.naam)}</div>
                  <div class="sub2">${esc(USER.rol)}<br>${esc(USER.org)}</div>
                  <div class="contacts"><span>${I.mail} ${esc(USER.email)}</span><span>${I.phone} ${esc(USER.tel)}</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="np-section">
            <button type="button" class="sec-head">Organisaties <span>⌃</span></button>
            <div class="sec-body">
              <div class="field"><label class="req" for="npOrg">Projectorganisatie</label><input type="text" id="npOrg" placeholder="Voer organisatienaam in"></div>
              <div class="field"><label for="npPartners">Partnerorganisaties</label><input type="text" id="npPartners" placeholder="Voer partnerorganisaties in (gescheiden door komma's)"></div>
            </div>
          </div>

          <div class="np-section collapsed">
            <button type="button" class="sec-head">Projectinhoud <span>⌄</span></button>
            <div class="sec-body">
              <div class="field"><label for="npProbleem">Probleemstelling</label><textarea id="npProbleem" placeholder="Welk probleem lost dit project op?"></textarea></div>
              <div class="field"><label for="npDoel">Doelstelling</label><textarea id="npDoel" placeholder="Wat is het doel van het project?"></textarea></div>
            </div>
          </div>

          <div class="np-section collapsed">
            <button type="button" class="sec-head">GDI-bouwblokken <span>⌄</span></button>
            <div class="sec-body">
              <div class="chip-cloud" style="justify-content:flex-start" id="npGdi">
                ${GDI_BOUWBLOKKEN.map(g => `<button type="button" class="chip" data-v="${esc(g)}">+ ${esc(g)}</button>`).join("")}
              </div>
            </div>
          </div>

          <div class="np-section collapsed">
            <button type="button" class="sec-head">Labels <span>⌄</span></button>
            <div class="sec-body">
              <div class="chip-cloud" style="justify-content:flex-start" id="npLabels">
                ${INTERESSES.slice(0, 20).map(l => `<button type="button" class="chip" data-v="${esc(l)}">+ ${esc(l)}</button>`).join("")}
              </div>
            </div>
          </div>

          <div class="np-section collapsed">
            <button type="button" class="sec-head">Bestand toevoegen <span>⌄</span></button>
            <div class="sec-body">
              <div class="upload-zone">Bestanden uploaden is nog niet beschikbaar in deze MVP.</div>
            </div>
          </div>

          <div class="np-actions">
            <button type="submit" class="btn btn-primary" data-mode="delen">Project delen</button>
            <button type="submit" class="btn btn-outline" data-mode="concept">Opslaan als concept</button>
          </div>
        </form>

        <aside class="card np-aside">
          <h3>Vergelijkbare projecten</h3>
          <div class="sub">Ontdek of er al vergelijkbare projecten bestaan</div>
          <div id="similarBox"><p style="font-size:12.5px;color:var(--text-muted)">Er zijn nog geen vergelijkbare projecten gevonden…</p></div>
        </aside>
      </div>
    `);

    // Inklapbare secties
    document.querySelectorAll(".np-section .sec-head").forEach(h => {
      h.addEventListener("click", () => {
        const sec = h.parentElement;
        sec.classList.toggle("collapsed");
        h.querySelector("span").textContent = sec.classList.contains("collapsed") ? "⌄" : "⌃";
      });
    });

    // Chip-selectie
    const selGdi = new Set(), selLabels = new Set();
    function chipToggle(containerId, set) {
      document.getElementById(containerId).addEventListener("click", e => {
        const b = e.target.closest(".chip"); if (!b) return;
        const v = b.dataset.v;
        set.has(v) ? set.delete(v) : set.add(v);
        b.classList.toggle("selected", set.has(v));
        b.textContent = (set.has(v) ? "✓ " : "+ ") + v;
      });
    }
    chipToggle("npGdi", selGdi);
    chipToggle("npLabels", selLabels);

    // Vergelijkbare projecten (live op titel/omschrijving/thema)
    const titelEl = document.getElementById("npTitel"), omsEl = document.getElementById("npOms"), themaEl = document.getElementById("npThema");
    function updateSimilar() {
      const words = (titelEl.value + " " + omsEl.value).toLowerCase().split(/\W+/).filter(w => w.length > 3);
      const theme = themaEl.value;
      const scored = allProjects().map(p => {
        const hay = (p.title + " " + p.kort).toLowerCase();
        let score = words.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0);
        if (theme && p.theme === theme) score += 1;
        return { p, score };
      }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
      document.getElementById("similarBox").innerHTML = scored.length
        ? scored.map(({ p }) => `
            <div class="mini" onclick="location.hash='#/project/${esc(p.id)}'">
              <div class="sw" style="${thumbStyle(p.theme)}"></div>
              <div><h4>${esc(p.title)}</h4><p>${esc(p.org)} · ${esc(p.theme)}</p></div>
            </div>`).join("")
        : `<p style="font-size:12.5px;color:var(--text-muted)">Er zijn nog geen vergelijkbare projecten gevonden…</p>`;
    }
    titelEl.addEventListener("input", updateSimilar);
    omsEl.addEventListener("input", updateSimilar);
    themaEl.addEventListener("change", updateSimilar);

    // Opslaan
    let mode = "delen";
    document.querySelectorAll(".np-actions .btn").forEach(b => b.addEventListener("click", () => { mode = b.dataset.mode; }));
    document.getElementById("npForm").onsubmit = e => {
      e.preventDefault();
      const titel = titelEl.value.trim(), thema = themaEl.value, oms = omsEl.value.trim(), org = document.getElementById("npOrg").value.trim();
      if (!titel || !thema || !oms || !org) { toast("Vul de verplichte velden in (titel, thema, omschrijving, organisatie)"); return; }
      const fmt = iso => iso ? iso.split("-").reverse().join("-") : "-";
      const nieuw = {
        id: "eigen-" + Date.now(),
        title: titel, org, theme: thema,
        status: mode === "concept" ? "Concept" : document.getElementById("npStatus").value,
        fase: document.getElementById("npFase").value,
        start: fmt(document.getElementById("npStart").value), eind: fmt(document.getElementById("npEind").value),
        gepubliceerd: new Date().toLocaleDateString("nl-NL"), bijgewerkt: new Date().toLocaleDateString("nl-NL"),
        partners: document.getElementById("npPartners").value.split(",").map(s => s.trim()).filter(Boolean),
        kort: oms.slice(0, 220), beschrijving: oms,
        probleem: document.getElementById("npProbleem").value.trim() || "Nog niet ingevuld.",
        doel: document.getElementById("npDoel").value.trim() || "Nog niet ingevuld.",
        lessen: [], gdi: [...selGdi], labels: [...selLabels],
        contactId: "tdv", files: [], mine: true, eigen: true
      };
      const extra = store.get("extraProjects", []);
      extra.push(nieuw);
      store.set("extraProjects", extra);
      toast(mode === "concept" ? "Project opgeslagen als concept" : "Project gedeeld op de Innovatie Hub");
      nav("#/mijn-projecten");
    };
  }

  /* ---------- Netwerk ---------- */

  const netState = { q: "" };

  function renderNetwerk() {
    shell("netwerk", `
      <div class="page-head">
        <div>
          <h1 class="page-title">Netwerk</h1>
          <div class="page-sub">Vind de projectteams achter de innovatieprojecten en leg contact via de regievoerende organisatie</div>
        </div>
      </div>
      <div class="toolbar">
        <div class="searchbox">${I.search}<input id="q" placeholder="Zoek op naam, organisatie, rol/functie of expertise" value="${esc(netState.q)}"></div>
      </div>
      <div class="result-bar"><span id="count"></span></div>
      <div class="people-grid" id="results"></div>
    `);

    function update() {
      const q = netState.q.toLowerCase();
      const list = PEOPLE.filter(p => !q || [p.naam, p.org, p.rol, ...(p.expertise || [])].join(" ").toLowerCase().includes(q));
      document.getElementById("count").textContent = `${list.length} ${list.length === 1 ? "resultaat" : "resultaten"}`;
      document.getElementById("results").innerHTML = list.length ? list.map(p => `
        <div class="card person-card">
          <span class="avatar" style="width:46px;height:46px;background:${p.kleur}">${initials(p.naam)}</span>
          <div>
            <h3>${esc(p.naam)}</h3>
            <div class="rol">${esc(p.rol)}</div>
            <div class="meta">Organisatie: <strong>${esc(p.org)}</strong></div>
            <div class="exp"><span class="meta">Expertise:</span>
              ${p.expertise.slice(0, 3).map(x => `<span class="label-chip">${esc(x)}</span>`).join("")}
              ${p.expertise.length > 3 ? `<span class="meta">+${p.expertise.length - 3}</span>` : ""}
            </div>
            <div style="margin-top:9px">${p.email ? `<a href="mailto:${esc(p.email)}" style="font-size:12.5px">${esc(p.email)}</a>` : `<span style="font-size:12.5px;color:var(--text-muted)">Betrokken bij: ${esc(p.betrokkenBij)}</span>`}</div>
          </div>
        </div>`).join("") : `<div class="empty">Geen personen gevonden.</div>`;
    }
    document.getElementById("q").oninput = e => { netState.q = e.target.value; update(); };
    update();
  }

  /* ---------- Mijn account ---------- */

  function renderAccount() {
    const sel = new Set(interests());
    shell("account", `
      <div class="page-head">
        <div>
          <h1 class="page-title">Mijn account</h1>
          <div class="page-sub">Beheer je account en interesses</div>
        </div>
      </div>
      <div class="card account-card">
        <span class="avatar">${USER.initialen}</span>
        <div class="account-cols">
          <div class="kv">
            <h3>Accountinformatie</h3>
            <div class="k">Voor- en achternaam</div><div class="v">${esc(USER.naam)}</div>
            <div class="k">Organisatie</div><div class="v">${esc(USER.org)}</div>
            <div class="k">Rol/functie</div><div class="v">${esc(USER.rol)}</div>
            <div class="k">Afdeling</div><div class="v">${esc(USER.afdeling)}</div>
            <div class="k">Expertise</div><div class="v">${esc(USER.expertise)}</div>
          </div>
          <div>
            <h3>Socials</h3>
            <div class="socials" style="padding:0;border:none;box-shadow:none">
              <div class="row"><span class="ic">${I.mail}</span><a href="mailto:${esc(USER.email)}">${esc(USER.email)}</a></div>
              <div class="row"><span class="ic">${I.phone}</span><span>${esc(USER.tel)}</span></div>
              <div class="row"><span class="ic">${I.linkedin}</span><span>${esc(USER.linkedin)}</span></div>
            </div>
            <button class="btn btn-primary" style="margin-top:14px" onclick="IH.toast('Gegevens wijzigen is nog niet beschikbaar in deze MVP')">Wijzig gegevens</button>
          </div>
        </div>
      </div>
      <div class="card interests-card">
        <h3>Interesses <span style="font-weight:400;font-size:12px;color:var(--text-muted)">(Trendroos-domeinen)</span></h3>
        <div class="chip-cloud" id="chips">
          ${DOMAINS.map(i => `<button type="button" class="chip ${sel.has(i) ? "selected" : ""}" data-i="${esc(i)}">${sel.has(i) ? "✓" : "+"} ${esc(i)}</button>`).join("")}
        </div>
        <div class="actions"><button class="btn btn-primary" id="save">Opslaan</button></div>
      </div>
    `);
    document.getElementById("chips").addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      const v = b.dataset.i;
      sel.has(v) ? sel.delete(v) : sel.add(v);
      b.classList.toggle("selected", sel.has(v));
      b.textContent = (sel.has(v) ? "✓ " : "+ ") + v;
    });
    document.getElementById("save").onclick = () => {
      store.set("interests", [...sel]);
      toast("Interesses opgeslagen");
    };
  }

  /* ---------- Publieke API + start ---------- */

  window.IH = { toast, nav };
  route();
})();
