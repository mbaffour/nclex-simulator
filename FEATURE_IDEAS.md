# 💡 Feature Ideas

A running list of low-risk, additive enhancements for the NCLEX Pro Simulator.
Each idea is scoped to fit the single-file, vanilla HTML/CSS/JS architecture with
no build step and no new dependencies.

> **Note:** Portable **progress export/import** (download/upload a JSON of the
> user's stats and progress from `localStorage`) is **already implemented**. See
> `exportProgress()`, `triggerImport()`, and `importProgressFile()` in
> `nclex_simulator.html`, wired to the `💾 Save` / `📂 Load` buttons in the
> progress bar. The ideas below build on that foundation rather than duplicate it.

---

## 1. Study streak counter

Track consecutive days with at least one completed session using the existing
`progressData.sessions` array (each session already carries a `date`). Compute
the current streak on the fly from unique session dates and surface it as a small
badge next to the existing `📊` progress pill. Pure read-only derivation from
data already stored — no schema change required.

## 2. Weakest-domain "focus mode"

The dashboard already computes per-domain accuracy from `progressData.domainTotals`.
Add a "Practice my weakest domain" button that reads the lowest-accuracy domain
and launches a practice session filtered to that domain's questions. Reuses the
existing question-filtering and session-start code paths.

## 3. Bookmark / flag questions for review

Let the user star a question during a session and revisit flagged items later.
Store an array of question IDs under a new `bookmarks` key in `progressData` so it
travels with the existing export/import JSON automatically. Additive to the
schema; older exports without the key degrade gracefully.

## 4. Printable / shareable score summary

Add a "Print summary" button on the results screen that opens `window.print()`
against a print-optimized stylesheet (`@media print`). No new data or storage —
just CSS plus one button — giving students a clean PDF of their score breakdown
for study logs or tutors.

## 5. Keyboard shortcuts for navigation

Bind keys for common actions: number keys `1–4` to select MCQ options, `Enter`
to submit/advance, and `←/→` to move between questions in review mode. Implemented
with a single `keydown` listener that no-ops outside an active session, improving
accessibility and speed without altering existing click handlers.

---

*These are proposals only — implement incrementally, keeping each change isolated
and testable in the single-file app.*
