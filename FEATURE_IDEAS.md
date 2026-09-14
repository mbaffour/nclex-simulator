# 💡 Feature Ideas

A running list of low-risk, additive enhancements for the NCLEX Pro Simulator.
Each idea is scoped to fit the single-file, vanilla HTML/CSS/JS architecture with
no build step and no new dependencies.

---

## ✅ Already shipped

- **Portable progress export/import** — download/upload a JSON of stats and
  progress from `localStorage`. See `exportProgress()`, `triggerImport()` and
  `importProgressFile()`, wired to the `💾 Save` / `📂 Load` buttons.
- **Study streak counter** — current and best consecutive-day streaks, derived on
  the fly from unique dates in `progressData.sessions`. Shown in the header pill
  and on the progress dashboard. See `gameStats()`.
- **Ranks, XP and badges** — ten nursing-career ranks, an XP formula weighted
  toward accuracy and consistency, and 16 unlockable badges. All derived from
  `progressData`, so nothing new is stored and older exports still work. See
  `RANKS`, `BADGES` and `gameSnapshot()`.
- **Question-bank validator** — `tools/validate-questions.mjs` checks the bank for
  the structural faults that break the app at runtime.

---

## 1. Weakest-domain "focus mode"

The dashboard already computes per-domain accuracy from `progressData.domainTotals`
and sorts the weakest three. Add a "Practice my weakest domain" button that reads
the lowest-accuracy domain and launches a practice session filtered to it — reusing
the existing `buildExam()` domain filtering by pre-selecting that chip. Pairs
naturally with the 🧠 *Domain Specialist* badge, which already tracks mastery.

## 2. Bookmark / flag questions for review

`examState.flags` already exists for in-session flagging but is discarded at the
end. Persist it: store an array of question IDs under a new `bookmarks` key in
`progressData` so it travels with the existing export/import JSON automatically.
Additive to the schema; older exports without the key degrade gracefully.

## 3. Spaced repetition on missed questions

`progressData.questionHistory` already records `seen`, `correct` and `lastSeen`
per question ID. A "Review my misses" mode could weight the pool toward questions
with a low correct/seen ratio and an old `lastSeen`. All the data is there — this
is a pool-selection change in `buildExam()`, nothing more.

## 4. Printable / shareable score summary

Add a "Print summary" button on the results screen that opens `window.print()`
against a print-optimized stylesheet (`@media print`). No new data or storage —
just CSS plus one button — giving students a clean PDF of their score breakdown
and badge case for study logs or tutors.

## 5. Keyboard shortcuts for navigation

Bind keys for common actions: number keys `1–4` to select MCQ options, `Enter` to
submit/advance, and `←/→` to move between questions in review mode. Implemented
with a single `keydown` listener that no-ops outside an active session, improving
accessibility and speed without altering existing click handlers.

## 6. Daily challenge

A fixed 10-question set seeded by the calendar date, so everyone studying that day
gets the same questions. `_stableOrder()` (added for bow-tie option shuffling)
already provides a deterministic seeded shuffle to build it from. Would give the
streak mechanic a concrete daily target.

## 7. Source and review date per question

`CONTRIBUTING.md` now asks authors to name the guideline and year behind any
question that turns on a threshold, age or drug regimen. Making that a structured
field — `source: "USPSTF 2021"`, `reviewed: "2026-09"` — would let the validator
flag questions that haven't been rechecked in N years, and surface the citation in
the rationale panel. The highest-value idea on this list for long-term accuracy.

---

*These are proposals only — implement incrementally, keeping each change isolated
and testable in the single-file app.*
