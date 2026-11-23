// Smart FAQ chatbot: searches ALL of DATA (data.js) and returns the best matching pieces.
// Runs fully in the visitor's browser: no server, no API key, no cost.
// It only answers from your real data, so it never invents facts.
// Load it AFTER data.js:  <script src="chatbot.js"></script>
(() => {
  const D = DATA;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const first = D.name.split(" ")[0];

  // ---------- 1. Words: split, drop filler words, cut endings ("projects" -> "project") ----------
  const STOP = new Set(("a an the is are was were be been do does did can could would will you your he him his she her they them their " +
    "i me my we our it its this that what which who whom how when why to of in on at for with and or about tell give gave show " +
    "any some has have had please know knows mark " + first.toLowerCase()).split(" "));
  const stem = w => w.length > 5 && /(ing|ed)$/.test(w) ? w.replace(/(ing|ed)$/, "") : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w;
  const words = text => String(text).toLowerCase().replace(/ci\/cd/g, "cicd").split(/[^a-z0-9#+]+/).filter(w => w && !STOP.has(w)).map(stem);

  // Extra words a question can mean (after stemming). Lets "container" find Docker, "phone" find Contact, etc.
  const SYN = {
    phone: ["contact"], number: ["contact"], call: ["contact"], mobile: ["contact"], email: ["contact"], reach: ["contact"],
    hire: ["contact", "available"], salary: ["contact"], based: ["location"], live: ["location"], locat: ["location"], where: ["location"],
    school: ["education"], study: ["education"], degree: ["education"], college: ["education"], university: ["education"], graduate: ["education"],
    container: ["docker"], image: ["docker"], cicd: ["pipeline", "action"], ci: ["pipeline"], cd: ["pipeline", "deploy"],
    cloud: ["gcp", "aws"], google: ["gcp"], amazon: ["aws"], server: ["linux", "nginx"], proxy: ["nginx"], web: ["nginx", "site"],
    java: ["tomcat", "maven", "war"], script: ["bash"], automation: ["script", "pipeline"], monitor: ["uptimerobot", "alert"],
    job: ["experience", "intern"], work: ["experience", "project"], internship: ["intern"], tool: ["skill"], tech: ["skill"], stack: ["skill"]
  };

  // ---------- 2. Knowledge base: every piece of DATA becomes a small "card" ----------
  const docs = [];
  const add = (topic, html, text) => docs.push({ topic, html, terms: new Set(words(text)) });
  const contactHtml = () => `Based in ${esc(D.location)}, open to on-site, hybrid or remote roles.<br>Email: <a href="mailto:${esc(D.email)}">${esc(D.email)}</a> · <a href="${esc(D.github)}" target="_blank">GitHub</a>`;

  D.about.split(/(?<=\.)\s+/).forEach(s => add("About", esc(s), "about summary " + s));
  add("Skills", `${esc(first)} works with: ${D.skills.map(esc).join(", ")}.`, "skill " + D.skills.join(" "));
  D.projects.forEach(p => add("Projects",
    `<b>${esc(p.title)}</b> (${esc(p.year)})<br>${esc(p.desc)}${p.link ? `<br><a href="${esc(p.link)}" target="_blank">View code →</a>` : ""}`,
    `project built ${p.title} ${p.tags.join(" ")} ${p.desc}`));
  D.experience.forEach(e => {
    add("Experience", `<b>${esc(e.title)}</b>, ${esc(e.org)} (${esc(e.date)})`, `experience intern internship job ${e.title} ${e.org} ${e.date}`);
    e.points.forEach(pt => add("Experience", `${esc(pt)}<br><small>${esc(e.title)}, ${esc(e.org)}</small>`, `experience intern internship job duty ${pt}`));
  });
  add("Education", esc(D.education), "education " + D.education);
  add("Contact", contactHtml(), `contact location available remote hybrid onsite ${D.location}`);
  add("Resume", `<a href="assets/resume.pdf" target="_blank">Open the resume (PDF)</a>`, "resume cv pdf download");

  // Rare words count more than common ones (IDF): "terraform" beats "project".
  const idf = {};
  docs.forEach(d => d.terms.forEach(t => idf[t] = (idf[t] || 0) + 1));
  Object.keys(idf).forEach(t => idf[t] = Math.log(1 + docs.length / idf[t]));

  // ---------- 3. Search: score every card, return the best 1-3 ----------
  const search = q => {
    const qw = [...new Set(words(q))];
    const weights = new Map();
    qw.forEach(w => { weights.set(w, 1); (SYN[w] || []).forEach(s => { if (!weights.has(s)) weights.set(s, 0.7); }); });
    return docs
      .map(d => { let s = 0; weights.forEach((wt, t) => { if (d.terms.has(t)) s += wt * idf[t]; }); return { d, s }; })
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s);
  };

  const has = (q, list) => list.some(w => new RegExp(`\\b${w}\\b`, "i").test(q)); // whole words only ("him" is not "hi")

  const reply = q => {
    if (has(q, ["phone", "number", "call", "mobile", "cellphone", "whatsapp", "viber"]))
      return `${esc(first)}'s phone number isn't shared on this site. The fastest way to reach ${esc(first)} is email:<br>${contactHtml()}`;
    const hits = search(q);
    if (hits.length) {
      const top = hits.filter(x => x.s >= hits[0].s * 0.6).slice(0, 3);
      if (top.length === 1) return top[0].d.html;
      return `Here's what I found:<ul>${top.map(x => `<li>${x.d.html}</li>`).join("")}</ul>`;
    }
    if (has(q, ["thanks", "thank", "ty", "salamat"])) return "You're welcome! Anything else?";
    if (has(q, ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]))
      return `Hi! I'm ${esc(first)}'s assistant. Ask me anything about ${esc(first)}'s skills, projects, experience or contact.`;
    return `I couldn't find that in ${esc(first)}'s profile, so I won't guess. Try the buttons below, or email <a href="mailto:${esc(D.email)}">${esc(D.email)}</a>.`;
  };

  // ---------- 4. Quick buttons ----------
  const chips = [
    ["Skills", () => docs.find(d => d.topic === "Skills").html],
    ["Projects", () => `Projects:<ul>${D.projects.map(p => `<li><b>${esc(p.title)}</b><br><small>${esc(p.tags.join(", "))}</small></li>`).join("")}</ul><a href="#projects">See all projects ↓</a>`],
    ["Experience", () => D.experience.map(e => `<b>${esc(e.title)}</b>, ${esc(e.org)} (${esc(e.date)})<ul>${e.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`).join("")],
    ["Education", () => esc(D.education)],
    ["Resume", () => docs.find(d => d.topic === "Resume").html],
    ["Contact", contactHtml]
  ];

  // ---------- 5. Chat window ----------
  document.body.insertAdjacentHTML("beforeend", `
<button id="cb-open" aria-label="Open chat" aria-expanded="false">💬</button>
<div id="cb" role="dialog" aria-label="Chat with ${esc(first)}'s assistant" hidden>
  <div class="cb-head"><span>$ ask ${esc(first.toLowerCase())}</span><button id="cb-x" aria-label="Close chat">×</button></div>
  <div id="cb-log" aria-live="polite"></div>
  <div class="cb-chips">${chips.map((c, i) => `<button data-i="${i}">${c[0]}</button>`).join("")}</div>
  <form id="cb-form"><input id="cb-in" placeholder="Ask me anything..." autocomplete="off" maxlength="200" aria-label="Your question"><button class="btn" type="submit">Send</button></form>
</div>`);

  const $ = id => document.getElementById(id);
  const box = $("cb"), log = $("cb-log"), input = $("cb-in"), openBtn = $("cb-open");

  const say = (html, who) => {
    const m = document.createElement("div");
    m.className = "cb-msg " + who;
    if (who === "me") m.textContent = html; else m.innerHTML = html; // visitor text is never parsed as HTML
    log.appendChild(m);
    log.scrollTop = m.offsetTop - log.offsetTop - 8; // show the start of long answers
  };
  const ask = (text, html) => {
    say(text, "me");
    const typing = document.createElement("div");
    typing.className = "cb-msg bot cb-typing"; typing.textContent = "...";
    log.appendChild(typing); log.scrollTop = log.scrollHeight;
    setTimeout(() => { typing.remove(); say(html, "bot"); }, 450);
  };

  const toggle = show => {
    box.hidden = !show;
    openBtn.setAttribute("aria-expanded", show);
    if (show && !log.children.length) say(`Hi! I'm ${esc(first)}'s assistant. Ask me anything about ${esc(first)}'s skills, projects or experience.`, "bot");
    if (show) input.focus();
  };
  openBtn.onclick = () => toggle(box.hidden);
  $("cb-x").onclick = () => toggle(false);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !box.hidden) toggle(false); });

  box.querySelectorAll(".cb-chips button").forEach(b => b.onclick = () => { const c = chips[b.dataset.i]; ask(c[0], c[1]()); });
  $("cb-form").onsubmit = e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    ask(q, reply(q));
  };
})();
