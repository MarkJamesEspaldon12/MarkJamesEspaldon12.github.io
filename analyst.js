// ===== EDIT DATA ANALYST CONTENT HERE =====
const DA = {
  dashboards: [
    { img: "assets/img/da-sales.png", title: "Sales Dashboard", tools: "Power BI · DAX · Map visual",
      desc: "Car sales across Malaysia, Philippines and Singapore: ₱8.05M revenue, ₱941.7K profit. Revenue by country, quantity by model, profit by segment, and smart narrative insights." },
    { img: "assets/img/da-finance.png", title: "Financial Dashboard Report", tools: "Power BI · Excel · Conditional formatting",
      desc: "₱115.42M revenue and 1.02M units sold. Monthly revenue trend, revenue by segment, discount band impact, and country/product tables." },
    { img: "assets/img/da-survey.png", title: "Data Professionals Survey Breakdown", tools: "Power BI · Power Query · Data cleaning",
      desc: "630 respondents analyzed: salary by job title, favorite languages, difficulty breaking into data, and work/life and salary happiness gauges." }
  ],
  skills: {
    "Analysis & Visualization": ["Power BI", "Microsoft Excel", "Google Sheets", "Data Cleaning", "Statistical Analysis", "Report Writing"],
    "Querying & Databases": ["SQL", "MySQL"],
    "Tools": ["GitHub", "GitLab", "Jira", "Notion", "Trello", "VS Code"],
    "Design": ["Figma", "Canva", "Photoshop"]
  },
  experience: [
    { title: "Management Information Specialist (MIS)", org: "GreatSource Corporation", date: "Nov 2025 – Mar 2026",
      points: ["Delivered daily, weekly and monthly reports to management and an external client bank.",
               "Analyzed automated Excel models and collection datasets to find and reconcile discrepancies.",
               "Maintained the VICI dialer system and was the main contact for data and reporting requests."] },
    { title: "System Analyst Intern", org: "PIXEL8 Web Solution & Consultancy Inc.", date: "Feb – May 2024",
      points: ["Analyzed business processes and wrote system specifications, wireframes and prototypes.",
               "Supported system documentation and reporting; led a small team on project tasks."] }
  ],
  certs: [
    { name: "Associate Data Analyst", org: "DataCamp", date: "Oct 2026",
      skills: "Certified Associate Data Analyst", file: "assets/certs/datacamp-associate-data-analyst.pdf",
      verify: "https://www.datacamp.com/certificate/DAA0011790907240", id: "DAA0011790907240" },
    { name: "Data Analytics Fundamentals", org: "DataSense Analytics Inc.", date: "Sep 2026",
      skills: "Data Cleaning · Data Analysis · Data Visualization", file: "assets/certs/data-analytics-fundamentals.pdf",
      verify: "https://app.datasenseph.com/credential-validation", id: "MRHO0RVQF8SHP" },
    { name: "Professional: Gen AI + Power BI + Excel", org: "8-hour professional course", date: "May 2026",
      skills: "Generative AI · Power BI · Excel", file: "assets/certs/genai-powerbi-excel.pdf", id: "4BDDE791" },
    { name: "Data Analytics Essentials", org: "Cisco Networking Academy", date: "May 2025",
      skills: "Data Analysis · Data Visualization", file: "assets/certs/data-analytics-essentials.pdf" }
  ]
};

const $ = id => document.getElementById(id);
$("yr").textContent = new Date().getFullYear();

// Carousel with captions + thumbnails
const D = DA.dashboards; let i = 0;
$("track").innerHTML = D.map(d => `<div class="slide"><img src="${d.img}" alt="${d.title}" loading="lazy"></div>`).join("");
$("thumbs").innerHTML = D.map((d, k) => `<button data-k="${k}"><img src="${d.img}" alt=""><span>${d.title}</span></button>`).join("");
const go = k => {
  i = (k + D.length) % D.length;
  $("track").style.transform = `translateX(-${i * 100}%)`;
  $("cap").innerHTML = `<h3>${D[i].title}</h3><p class="tools">${D[i].tools}</p><p>${D[i].desc}</p>`;
  document.querySelectorAll("#thumbs button").forEach((b, j) => b.classList.toggle("on", j === i));
};
document.querySelector(".prev").onclick = () => go(i - 1);
document.querySelector(".next").onclick = () => go(i + 1);
document.querySelectorAll("#thumbs button").forEach(b => b.onclick = () => go(+b.dataset.k));
let x0 = null; const car = document.querySelector(".car");
car.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
car.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); x0 = null; });
go(0);

$("skills").innerHTML = Object.entries(DA.skills).map(([g, l]) => `<div class="sk"><h4>${g}</h4><div>${l.map(s => `<span>${s}</span>`).join("")}</div></div>`).join("");
$("exp").innerHTML = DA.experience.map(e => `<div class="job"><div class="row"><h3>${e.title}</h3><span>${e.date}</span></div><p class="org">${e.org}</p><ul>${e.points.map(p => `<li>${p}</li>`).join("")}</ul></div>`).join("");
$("cert-list").innerHTML = DA.certs.map(c => `<div class="cert"><div class="badge">✓</div><h3>${c.name}</h3><p class="org">${c.org} · ${c.date}</p><p>${c.skills}</p>${c.id ? `<p class="cid">ID: ${c.id}</p>` : ""}<div class="links"><a href="${c.file}" target="_blank">View certificate</a>${c.verify ? `<a href="${c.verify}" target="_blank">Verify</a>` : ""}</div></div>`).join("");

// Contact (same Formspree/mailto setup as data.js)
$("form").onsubmit = async e => {
  e.preventDefault(); const f = e.target, st = $("status");
  if (DATA.formspree.includes("YOUR_FORM_ID")) {
    location.href = `mailto:${DATA.email}?subject=${encodeURIComponent("Portfolio message from " + f.name.value)}&body=${encodeURIComponent(f.message.value + "\n\nReply to: " + f.email.value)}`; return;
  }
  st.textContent = "Sending...";
  try { const r = await fetch(DATA.formspree, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
    st.textContent = r.ok ? "Thanks! I'll get back to you soon." : "Something went wrong. Please email me directly."; if (r.ok) f.reset();
  } catch { st.textContent = "Network error. Please email me directly."; }
};
