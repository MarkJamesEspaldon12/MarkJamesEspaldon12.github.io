const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const D = DATA;

$("name").textContent = $("fname").textContent = D.name;
$("role").textContent = `${D.role} · ${D.location}`;
$("about").textContent = D.about;
$("yr").textContent = new Date().getFullYear();
$("edu").textContent = D.education;
$("skills").innerHTML = D.skills.map(s => `<li>${esc(s)}</li>`).join("");
$("links").innerHTML = `<a href="mailto:${D.email}">${D.email}</a><a href="${D.github}" target="_blank">GitHub</a><a href="${D.linkedin}" target="_blank">LinkedIn</a>`;

// Projects + carousel
$("project-list").innerHTML = D.projects.map(p => `
  <article class="card">
    <div class="car">
      <div class="track">${p.images.map((src, i) => `<div class="slide"><img src="${src}" alt="${esc(p.title)} screenshot ${i + 1}" loading="lazy" onerror="this.parentNode.innerHTML='${esc(p.title).replace(/'/g, "\\'")}<br>Screenshot ${i + 1}'"></div>`).join("")}</div>
      ${p.images.length > 1 ? `<button class="prev" aria-label="Previous">‹</button><button class="next" aria-label="Next">›</button><div class="dots">${p.images.map(() => "<span></span>").join("")}</div>` : ""}
    </div>
    <div class="body">
      <div class="meta"><h3>${esc(p.title)}</h3><span class="muted">${esc(p.year)}</span></div>
      <p>${esc(p.desc)}</p>
      <ul class="chips">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      ${p.link ? `<p><a href="${p.link}" target="_blank">View code →</a></p>` : ""}
    </div>
  </article>`).join("");

document.querySelectorAll(".car").forEach(car => {
  const track = car.querySelector(".track"), dots = car.querySelectorAll(".dots span"), n = dots.length;
  if (!n) return;
  let i = 0, x0 = null;
  const go = k => { i = (k + n) % n; track.style.transform = `translateX(-${i * 100}%)`; dots.forEach((d, j) => d.classList.toggle("on", j === i)); };
  car.querySelector(".prev").onclick = () => go(i - 1);
  car.querySelector(".next").onclick = () => go(i + 1);
  dots.forEach((d, j) => d.onclick = () => go(j));
  car.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  car.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
  go(0);
});

// Experience
$("exp-list").innerHTML = D.experience.map(e => `
  <div class="exp"><div class="meta"><h3>${esc(e.title)}</h3> <span class="muted">${esc(e.date)}</span></div>
  <div class="muted">${esc(e.org)}</div><ul>${e.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");

// Contact form (Formspree; falls back to mailto until a form ID is set)
$("form").onsubmit = async e => {
  e.preventDefault();
  const f = e.target, st = $("status");
  if (D.formspree.includes("YOUR_FORM_ID")) {
    location.href = `mailto:${D.email}?subject=${encodeURIComponent("Portfolio message from " + f.name.value)}&body=${encodeURIComponent(f.message.value + "\n\nReply to: " + f.email.value)}`;
    return;
  }
  st.textContent = "Sending...";
  try {
    const r = await fetch(D.formspree, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
    st.textContent = r.ok ? "Thanks! I'll get back to you soon." : "Something went wrong. Please email me directly.";
    if (r.ok) f.reset();
  } catch { st.textContent = "Network error. Please email me directly."; }
};
