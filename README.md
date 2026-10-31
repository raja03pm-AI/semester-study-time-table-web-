# Exam Focus

A small, responsive study timetable for the November–December 2026 exam period. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency installation.

## Included

- Daily timetable from 1 November through 19 December, with the study, meal, gym, and revision blocks preserved.
- A day-by-day syllabus plan that targets all 40 units by 15 November.
- Revision-only checklist for 11 PM–12 AM.
- Eight-subject, 40-unit checklist and progress overview.
- Exam dates, stated priorities, and a final revision pattern.
- Browser-local saving for checked units and revision checklist items.

Machine Learning was not assigned a priority in the supplied list, so it is shown as **Standard (unlisted)** rather than silently assigning it a stated priority.

## Important planning note

Forty units in 1–15 November is a stretch: about 2–3 substantial units a day from a zero start. The plan treats it as a syllabus-first target but deliberately retains buffers and final review blocks. Do not compromise sleep to “catch up”; carry an unfinished unit into the next available buffer and protect the upcoming exam subject.

## Run locally

Open `index.html` directly in a browser, or run a small local server from this folder:

```powershell
py -m http.server 3000
```

Then visit `http://localhost:3000`.

## Run / deploy in Replit

1. Create a **Static HTML, CSS, JS** Repl (or import this folder).
2. Keep `index.html`, `styles.css`, and `app.js` in the project root.
3. Click **Run**. Replit serves the app preview; there is no install command.
4. Use Replit’s **Deployments** panel and choose a static site deployment to publish it.

The completion checks use the browser’s `localStorage`. They persist on the same browser/device but do not sync between devices, and this version has no background reminders or notifications.

## AI website-builder options

| Tool | Best fit | Why choose it | Watch-out |
| --- | --- | --- | --- |
| Replit Agent | Best all-round choice for this app | Can build, preview, edit, and deploy a small working web app in one workspace. | Review its generated scope; keep the request specific and test interactions. |
| v0 | Fast UI starting point | Excellent for quickly exploring polished React/Tailwind layouts. | Usually needs a separate deployment/backend choice and more technical cleanup. |
| Lovable | Prompt-first product prototype | Very fast for a multi-page prototype with integrations. | Easy to overbuild a simple offline timetable; check plan and export limits. |
| Bolt | Browser-based rapid prototypes | Useful for iterating on interactive web experiences from a prompt. | Verify generated dependencies and persistence before relying on it. |
| GitHub Copilot in VS Code | Best if you want full code control | Fits a normal local development workflow and helps explain edits. | You set up preview/deployment yourself. |

For a 30-minute version, use **Replit Agent** with a scope such as: “Build a static responsive study timetable. Use localStorage only for completion checkboxes. Do not add logins, notifications, or a backend.”
