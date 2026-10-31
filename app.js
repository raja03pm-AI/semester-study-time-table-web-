const subjects = [
  { id: "dis", name: "Data & Information Security", short: "Data & Info Security", date: "2026-11-21", priority: "High", className: "high" },
  { id: "bda", name: "Big Data Analytics", short: "Big Data Analytics", date: "2026-11-24", priority: "High", className: "high" },
  { id: "dc", name: "Distributed Computing", short: "Distributed Computing", date: "2026-11-26", priority: "Medium", className: "medium" },
  { id: "cloud", name: "Cloud Computing", short: "Cloud Computing", date: "2026-12-02", priority: "Medium", className: "medium" },
  { id: "nndl", name: "Neural Networks & Deep Learning", short: "Neural Networks & DL", date: "2026-12-09", priority: "High", className: "high" },
  { id: "ml", name: "Machine Learning", short: "Machine Learning", date: "2026-12-10", priority: "Standard", className: "standard" },
  { id: "ps", name: "Probability & Statistics", short: "Probability & Statistics", date: "2026-12-12", priority: "High", className: "high" },
  { id: "dl", name: "Deep Learning", short: "Deep Learning", date: "2026-12-19", priority: "Medium", className: "medium" }
];

const firstPass = {
  "2026-11-01": [["dis", 1], ["dis", 2]],
  "2026-11-02": [["dis", 3], ["bda", 1], ["bda", 2]],
  "2026-11-03": [["dis", 4], ["bda", 3], ["dc", 1]],
  "2026-11-04": [["dis", 5], ["bda", 4], ["dc", 2]],
  "2026-11-05": [["bda", 5], ["dc", 3], ["cloud", 1]],
  "2026-11-06": [["dc", 4], ["cloud", 2], ["nndl", 1]],
  "2026-11-07": [["dc", 5], ["cloud", 3], ["nndl", 2]],
  "2026-11-08": [["cloud", 4], ["nndl", 3], ["ps", 1]],
  "2026-11-09": [["cloud", 5], ["nndl", 4], ["ps", 2]],
  "2026-11-10": [["nndl", 5], ["ps", 3], ["ml", 1]],
  "2026-11-11": [["ps", 4], ["ml", 2], ["dl", 1]],
  "2026-11-12": [["ps", 5], ["ml", 3], ["dl", 2]],
  "2026-11-13": [["ml", 4], ["dl", 3]],
  "2026-11-14": [["ml", 5], ["dl", 4]],
  "2026-11-15": [["dl", 5]]
};

const reviewPlan = {
  "2026-11-16": ["dis", "Big Data Analytics: light recap", "Repair DIS Units 1–2 + core definitions"],
  "2026-11-17": ["dis", "bda", "DIS Units 3–4 + access-control practice"],
  "2026-11-18": ["dis", "bda", "DIS Unit 5 + one timed answer set"],
  "2026-11-19": ["dis", "bda", "DIS past-paper questions + weak areas"],
  "2026-11-20": ["dis", "bda", "DIS final formula/diagram sheet; early finish"],
  "2026-11-21": ["bda", "dis", "Data & Information Security exam — only light BDA restart later"],
  "2026-11-22": ["bda", "dc", "BDA Units 1–3 retrieval + analytics workflows"],
  "2026-11-23": ["bda", "dc", "BDA Units 4–5 + timed practice; early finish"],
  "2026-11-24": ["dc", "bda", "Big Data Analytics exam — distributed systems quick recall later"],
  "2026-11-25": ["dc", "cloud", "Distributed Computing full-syllabus recall + past questions"],
  "2026-11-26": ["cloud", "dc", "Distributed Computing exam — cloud essentials later"],
  "2026-11-27": ["cloud", "nndl", "Cloud Units 1–2 recap + architecture sketches"],
  "2026-11-28": ["cloud", "nndl", "Cloud Units 3–4 retrieval + service comparisons"],
  "2026-11-29": ["cloud", "nndl", "Cloud Unit 5 + question practice"],
  "2026-11-30": ["cloud", "nndl", "Cloud past questions + weak-topic repair"],
  "2026-12-01": ["cloud", "nndl", "Cloud final summary; early finish"],
  "2026-12-02": ["nndl", "cloud", "Cloud Computing exam — NNDL restart later"],
  "2026-12-03": ["nndl", "ml", "NNDL Units 1–2 recap + Machine Learning foundations"],
  "2026-12-04": ["nndl", "ml", "NNDL Unit 3 + ML algorithms retrieval"],
  "2026-12-05": ["nndl", "ml", "NNDL Unit 4 + ML practice questions"],
  "2026-12-06": ["nndl", "ml", "NNDL Unit 5 + ML weak areas"],
  "2026-12-07": ["nndl", "ml", "NNDL past questions + ML compact notes"],
  "2026-12-08": ["nndl", "ml", "NNDL final review; ML formulas for the evening"],
  "2026-12-09": ["ml", "ps", "NNDL exam — ML final recall and light P&S restart"],
  "2026-12-10": ["ps", "ml", "Machine Learning exam — Probability & Statistics focus later"],
  "2026-12-11": ["ps", "dl", "P&S formulas, distributions and timed problems"],
  "2026-12-12": ["dl", "ps", "Probability & Statistics exam — Deep Learning restart later"],
  "2026-12-13": ["dl", "", "Deep Learning Units 1–2 recall + diagrams"],
  "2026-12-14": ["dl", "", "Deep Learning Unit 3 + model comparisons"],
  "2026-12-15": ["dl", "", "Deep Learning Unit 4 + numerical practice"],
  "2026-12-16": ["dl", "", "Deep Learning Unit 5 + past questions"],
  "2026-12-17": ["dl", "", "Deep Learning weak areas + timed answers"],
  "2026-12-18": ["dl", "", "Deep Learning final summary; early finish"],
  "2026-12-19": ["dl", "", "Deep Learning exam — trust your preparation"],
};

const dateStart = new Date("2026-11-01T12:00:00");
const dateEnd = new Date("2026-12-19T12:00:00");
let selectedDate = "2026-11-01";

const stored = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
let progress = stored("exam-focus-units", {});
let revisions = stored("exam-focus-revisions", {});

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(dateString, options = { weekday: "long", day: "numeric", month: "long" }) {
  return new Intl.DateTimeFormat("en-GB", options).format(new Date(`${dateString}T12:00:00`));
}

function getSubject(id) {
  return subjects.find((subject) => subject.id === id);
}

function isExamDay(date) {
  return subjects.some((subject) => subject.date === date);
}

function subjectName(idOrName) {
  return getSubject(idOrName)?.short || idOrName;
}

function getDayPlan(date) {
  const tasks = firstPass[date];
  if (tasks) {
    const unitSessions = tasks.map(([id, unit]) => ({
      title: `${subjectName(id)} · Unit ${unit}`,
      detail: "First pass: understand the outline, make compact notes, then mark the unit when complete.",
      tag: "new unit"
    }));
    while (unitSessions.length < 3) {
      unitSessions.push({
        title: "Catch-up & active recall",
        detail: "Use this block to finish a difficult section, redraw a diagram or recall today’s units without notes.",
        tag: "buffer"
      });
    }
    const subjectsToday = [...new Set(tasks.map(([id]) => subjectName(id)))].join(" + ");
    return {
      headline: `Syllabus sprint: ${tasks.length} planned unit${tasks.length === 1 ? "" : "s"}`,
      sessions: [
        { time: "7:30–8:30 AM", ...unitSessions[0] },
        { time: "9:45 AM–12:30 PM", ...unitSessions[1] },
        { time: "2:00–4:30 PM", ...unitSessions[2] },
        { time: "8:15–10:45 PM", title: `${subjectsToday}: practice & summary`, detail: "Do 4–6 questions or flashcards, then turn notes into a one-page recall sheet.", tag: "practice" }
      ],
      revision: [
        "Close notes and list today’s key terms / formulas",
        "Correct two unclear points from today’s sessions",
        "Review the one-page summary or flashcards",
        "Choose tomorrow’s first topic; stop at midnight"
      ]
    };
  }

  const plan = reviewPlan[date] || ["dl", "", "Light consolidation and rest"];
  const primary = getSubject(plan[0]);
  const secondary = getSubject(plan[1]);
  const exam = subjects.find((subject) => subject.date === date);
  const primaryName = primary?.short || "Focused review";
  const secondaryName = secondary?.short;
  const firstTitle = exam ? `${exam.short} — exam-day reset` : `${primaryName} — retrieve without notes`;
  return {
    headline: plan[2],
    sessions: [
      { time: "7:30–8:30 AM", title: firstTitle, detail: exam ? "Keep it light: glance at your final sheet, eat well and go calmly." : "Use a closed-book recall sheet before opening notes.", tag: exam ? "exam day" : "retrieve" },
      { time: "9:45 AM–12:30 PM", title: `${primaryName} — targeted repair`, detail: exam ? "After the exam, take a real break before returning to the next subject." : "Repair weak concepts and solve representative questions.", tag: "practice" },
      { time: "2:00–4:30 PM", title: secondaryName ? `${secondaryName} — keep warm` : `${primaryName} — application practice`, detail: secondaryName ? "A small second-subject block prevents later exams from going cold." : "Use timed answers, diagrams or a concept map.", tag: "support" },
      { time: "8:15–10:45 PM", title: "Compress & plan the next block", detail: "Build a short final sheet, review errors and set up tomorrow’s recall target.", tag: "summary" }
    ],
    revision: [
      `Recall ${primaryName} essentials without notes`,
      "Review mistakes from today’s practice questions",
      secondaryName ? `Read the compact summary for ${secondaryName}` : "Review diagrams, formulas or definitions",
      "Pack up / plan tomorrow; no new topic after 11 PM"
    ]
  };
}

function renderDates() {
  const strip = document.querySelector("#date-strip");
  strip.innerHTML = "";
  for (let cursor = new Date(dateStart); cursor <= dateEnd; cursor.setDate(cursor.getDate() + 1)) {
    const date = isoDate(cursor);
    const button = document.createElement("button");
    button.className = `date-button ${date === selectedDate ? "is-selected" : ""} ${isExamDay(date) ? "exam-day" : ""}`;
    button.dataset.date = date;
    button.innerHTML = `<span>${formatDate(date, { weekday: "short" })}</span><strong>${cursor.getDate()}</strong>`;
    button.setAttribute("aria-label", `Show plan for ${formatDate(date)}`);
    button.addEventListener("click", () => selectDate(date));
    strip.appendChild(button);
  }
}

function renderPlan() {
  const plan = getDayPlan(selectedDate);
  document.querySelector("#selected-date-heading").textContent = formatDate(selectedDate);
  const sessions = document.querySelector("#session-list");
  sessions.innerHTML = plan.sessions.map((session) => `
    <article class="session">
      <div class="session-time">${session.time}</div>
      <div><h3>${session.title}<span class="tag">${session.tag}</span></h3><p>${session.detail}</p></div>
    </article>`).join("");
  const revision = document.querySelector("#revision-checklist");
  revision.innerHTML = plan.revision.map((item, index) => {
    const key = `${selectedDate}-${index}`;
    return `<label class="check-row"><input type="checkbox" data-revision="${key}" ${revisions[key] ? "checked" : ""}><span>${item}</span></label>`;
  }).join("");
  revision.querySelectorAll("input").forEach((input) => input.addEventListener("change", (event) => {
    revisions[event.target.dataset.revision] = event.target.checked;
    localStorage.setItem("exam-focus-revisions", JSON.stringify(revisions));
    updateOverview();
  }));
}

function renderTrackers() {
  const container = document.querySelector("#subject-trackers");
  container.innerHTML = subjects.map((subject) => {
    const units = Array.from({ length: 5 }, (_, index) => {
      const unit = index + 1;
      const key = `${subject.id}-${unit}`;
      return `<label class="unit" title="Mark ${subject.short}, Unit ${unit} complete"><input type="checkbox" data-unit="${key}" ${progress[key] ? "checked" : ""}>U${unit}</label>`;
    }).join("");
    return `<article class="subject-card">
      <div class="subject-top"><h3>${subject.name}</h3><span class="priority ${subject.className}">${subject.priority}</span></div>
      <div class="unit-grid">${units}</div>
    </article>`;
  }).join("");
  container.querySelectorAll("input").forEach((input) => input.addEventListener("change", (event) => {
    progress[event.target.dataset.unit] = event.target.checked;
    localStorage.setItem("exam-focus-units", JSON.stringify(progress));
    updateOverview();
  }));
}

function renderExams() {
  document.querySelector("#exam-list").innerHTML = subjects.map((subject) => `
    <article class="exam-item">
      <div class="exam-date">${formatDate(subject.date, { day: "2-digit", month: "short" }).replace(" ", "<br>")}</div>
      <div><h3>${subject.name}</h3><p>${subject.priority === "High" ? "Protect daily progress and final-review blocks." : subject.priority === "Standard" ? "Included as a core course; priority was not specified." : "Covered regularly, then protected before its exam."}</p></div>
      <span class="priority ${subject.className}">${subject.priority}</span>
    </article>`).join("");
}

function updateOverview() {
  const completed = Object.values(progress).filter(Boolean).length;
  const revisionCount = [0, 1, 2, 3].filter((index) => revisions[`${selectedDate}-${index}`]).length;
  const percentage = (completed / 40) * 100;
  document.querySelector("#completed-units").textContent = completed;
  document.querySelector("#syllabus-meter").style.width = `${percentage}%`;
  document.querySelector("#revision-count").textContent = revisionCount;
  const status = document.querySelector("#syllabus-status");
  status.textContent = completed === 40 ? "Syllabus complete" : completed >= 20 ? "Good momentum" : completed > 0 ? "Building consistency" : "Getting started";
  document.querySelector("#progress-message").textContent = completed === 40
    ? "All 40 units are marked complete. Use the planned final-review blocks for retrieval and past questions."
    : `${40 - completed} unit${40 - completed === 1 ? "" : "s"} remaining. One thorough unit is better than three rushed ones.`;
  document.querySelector("#deadline-message").textContent = completed === 40
    ? "All 40 units are complete — keep the revision blocks protected."
    : `40 units in 15 days is ambitious — roughly ${Math.max(1, Math.ceil((40 - completed) / 15))} units/day from zero. Use buffers honestly.`;
}

function renderNextExam() {
  const next = subjects[0];
  document.querySelector("#next-exam-date").textContent = formatDate(next.date, { day: "numeric", month: "short" });
  document.querySelector("#next-exam-name").textContent = next.short;
}

function selectDate(date) {
  selectedDate = date;
  renderDates();
  renderPlan();
  updateOverview();
  document.querySelector(`[data-date="${date}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
}

function changeDay(delta) {
  const next = new Date(`${selectedDate}T12:00:00`);
  next.setDate(next.getDate() + delta);
  const nextString = isoDate(next);
  if (next >= dateStart && next <= dateEnd) selectDate(nextString);
}

document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("is-active", item === tab));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === tab.dataset.tab));
}));

document.querySelector("#previous-day").addEventListener("click", () => changeDay(-1));
document.querySelector("#next-day").addEventListener("click", () => changeDay(1));
document.querySelector("#jump-to-start").addEventListener("click", () => selectDate("2026-11-01"));
document.querySelector("#reset-progress").addEventListener("click", () => {
  if (!window.confirm("Reset all saved unit and revision progress in this browser?")) return;
  progress = {};
  revisions = {};
  localStorage.removeItem("exam-focus-units");
  localStorage.removeItem("exam-focus-revisions");
  renderTrackers();
  renderPlan();
  updateOverview();
});

renderDates();
renderPlan();
renderTrackers();
renderExams();
renderNextExam();
updateOverview();
