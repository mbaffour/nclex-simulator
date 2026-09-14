# Contributing to the NCLEX Pro Simulator

Thanks for helping. This project is used by people studying for a licensure
exam that decides whether they get to work as nurses, so the bar for clinical
accuracy is higher than for most side projects. A wrong answer key here doesn't
just lose a point — it teaches an unsafe habit to someone who will be at a
bedside in a few months.

Everything below exists to keep that from happening.

---

## The one-minute version

1. Both HTML files must change together — `nclex_simulator.html` and
   `nclex_public.html` share the same question bank.
2. Run `node tools/validate-questions.mjs` before you commit. It must exit `OK`.
3. Every clinical claim needs a source you can name, and that source needs to be
   current. See [Clinical accuracy](#clinical-accuracy).
4. No build step, no dependencies, no framework. Vanilla HTML/CSS/JS in one file.

---

## Repository layout

| File | What it is |
|---|---|
| `nclex_simulator.html` | The simulator. Single file: styles, markup, question bank, app. |
| `nclex_public.html` | Identical app with the personal dedications removed. |
| `blog.html` / `blog_public.html` | Project write-up, same personal/public split. |
| `tools/validate-questions.mjs` | Question-bank validator. Run before every commit. |
| `CLINICAL_REVIEW.md` | Log of guideline-driven answer changes, with sources. |
| `FEATURE_IDEAS.md` | Proposed enhancements, scoped to the single-file architecture. |

### Keeping the two HTML files in sync

`nclex_public.html` is not generated — it is a maintained copy. The two files
differ **only** in the personal dedication lines and two CSS rules. Any change to
the question bank or the app must be applied to both.

The quickest way to confirm you haven't drifted:

```bash
# Should show only dedication text and the two known CSS differences
diff <(sed 's/Peyton//g' nclex_simulator.html) <(sed 's/Peyton//g' nclex_public.html)
```

---

## Clinical accuracy

This is the part that matters most.

### Every question needs a nameable source

When you add or change a question, you must be able to say where the answer
comes from. Acceptable sources, roughly in order of weight:

- **NCSBN** — test plan, NGN case study materials, practice analyses.
- **Specialty bodies** for the relevant content: AHA (cardiac, BLS/ACLS, endocarditis
  prophylaxis), ACOG (obstetrics), AAP (paediatrics), ADA (diabetes), USPSTF and
  ACS (screening), CDC (immunisation, infection control), Surviving Sepsis
  Campaign, ACR (contrast media), NPIAP (pressure injury staging), Joint
  Commission and CMS (restraints, safety standards).
- **Current editions of standard nursing texts** — Potter & Perry, Lewis,
  Saunders/Silvestri — used to *corroborate*, not as the primary authority for a
  number that a specialty body sets.

A source you cannot name is not a source. "I remember this from school" is how
outdated content gets in.

### Guidelines change, so record the date

The single biggest source of wrong answers in this bank has been questions that
were correct when written and quietly went stale. Real examples already fixed:

- Colorectal cancer screening moved from age 50 to age 45 (ACS 2018, USPSTF 2021).
- USPSTF breast screening moved to biennial mammography from age 40 (2024).
- Metformin is no longer held 48 hours *before* contrast; the ACR–NKF consensus
  (2020) ties the hold to eGFR and to the period *after* contrast.
- The AHA removed clindamycin from dental endocarditis prophylaxis (2021).
- ACOG redefined postpartum hemorrhage as ≥1,000 mL regardless of delivery route
  (Practice Bulletin 183, 2017), retiring the 500 mL vaginal / 1,000 mL cesarean split.

So: **when a question turns on a number, a threshold, an age, or a drug
regimen, name the guideline and its year in the rationale or the tip.** A future
reviewer can then tell at a glance whether the item needs rechecking, instead of
having to re-derive the whole thing.

### Where a guideline is genuinely contested

Some questions have no single right answer because organisations disagree —
breast screening is the standard example. Don't pretend consensus. Either:

- write the stem to name the organisation ("According to ACS guidelines…"), or
- make the correct option the one that reflects the disagreement, and lay out both
  positions in the rationale.

What you must not do is key an answer to one body's position while the stem says
"current guidelines" — that is exactly the fault that made q63 and q151 wrong.

### Internal consistency

Before adding a question, search the bank for the same topic:

```bash
grep -o '{id:[0-9]*[^\n]*metformin[^\n]*' nclex_simulator.html | head
```

If an existing question teaches something different, one of them is wrong. Fix
both in the same commit rather than leaving the bank to contradict itself. Four
questions already taught colorectal screening at 45 while a fifth taught 50 —
that contradiction sat in the bank for months.

### Reporting a suspected error

Open an issue with the question `id`, what the current key says, what you believe
it should be, and the source with its year. You do not need to supply a patch —
a well-sourced report is the hard part, and it is genuinely valuable. Reports
that lead to a fix are credited in [`CLINICAL_REVIEW.md`](CLINICAL_REVIEW.md).

---

## Question schema

The bank is the `QUESTION_BANK` array in each HTML file. One question per line,
starting at column 1 with `{id:` — the validator and several helper scripts rely
on that, so keep the formatting.

### Shared fields

```js
{
  id: 1801,                    // unique integer across the whole bank
  domain: "pharmacology",      // one of the eight domain keys below
  type: "mcq",                 // mcq | sata | ngn_matrix | ngn_bowties
  ngn: true,                   // optional; marks the item as Next Gen format
  stem: "A nurse is caring for…",
  rationale: "Option C is correct because…",
  tip: "NCLEX tip: …",         // short, high-yield takeaway
  tags: ["metformin", "contrast", "lactic acidosis"],
}
```

**Domain keys** — these are the exact strings; anything else is unreachable from
the filter chips and will fail validation:

`management` · `safety` · `health` · `psychosocial` · `basic` · `pharmacology` ·
`reduction` · `physio`

**Type keys** — again exact. `ngn_bowties` is plural; `ngn_bowtie` is not a type
and will fail validation. (Eight questions once used it and crashed the exam
screen.)

### `mcq` — single best answer

```js
{
  …shared…,
  type: "mcq",
  options: ["A. …", "B. …", "C. …", "D. …"],
  correct: 2,                  // zero-based index into options
}
```

### `sata` — select all that apply

```js
{
  …shared…,
  type: "sata",
  options: ["A. …", "B. …", "C. …", "D. …", "E. …"],
  correct: [0, 2, 4],          // zero-based indices, no duplicates
}
```

If the stem says "select all that apply", the type must be `sata`. A SATA
question typed `mcq` renders as radio buttons and can never be answered
correctly — three questions in the bank had exactly this fault.

### `ngn_matrix` — matrix grid

Two shapes are supported. Prefer the explicit one for new questions:

```js
{
  …shared…,
  type: "ngn_matrix", ngn: true,
  caseData: {                             // optional client chart panel
    history: "A 68-year-old male with…",
    labs: "Troponin I: 2.8 ng/mL…",
    meds: "metformin, lisinopril…",
  },
  matrix: {
    rows: ["Administer aspirin 325 mg PO", "Elevate the head of bed…"],
    cols: ["Indicated", "Not Indicated"],
    correct: [0, 1],                      // column index chosen per row
    rationale: "STEMI management…",       // may live here instead of top level
  },
}
```

The second shape carries per-row objects and no columns; `matrixModel()`
normalises it to a two-column *Expected / Requires Immediate Action* grid:

```js
matrix: {
  rows: [
    { label: "Potassium 6.2 mEq/L", expected: false, action_needed: true,
      rationale: "Hyperkalemia is dangerous in CKD…" },
  ],
}
```

`expected` and `action_needed` must be opposites — a row that is both expected
and action-needing is contradictory, and the validator warns about it.

### `ngn_bowties` — bow-tie clinical judgment

Two shapes, both normalised by `bowtieModel()`. The NGN-style shape:

```js
{
  …shared…,
  type: "ngn_bowties", ngn: true,
  bowtie: {
    condition: "Acute decompensated heart failure (pulmonary edema)",
    actions_to_take: ["Elevate the head of bed to high-Fowler's…", …],
    actions_to_avoid: ["Administer IV normal saline bolus", …],
    parameters: ["Urine output ≥30 mL/hour…", …],
  },
}
```

`actions_to_take` and `actions_to_avoid` are merged into one column with a
deterministic, id-seeded shuffle, so the correct answers are not simply the
first items. Always supply `actions_to_avoid`; without distractors every option
in the column is correct and the question teaches nothing.

The explicit shape, used by older items:

```js
bowtie: {
  causes: [...], actions: [...], outcomes: [...],
  correctCauses: [0, 2], correctActions: [0, 1, 3], correctOutcomes: [0, 2],
}
```

---

## Writing a good question

The structural rules above keep the app working. These keep the question worth
answering.

- **Test judgment, not recall.** "Which client should the nurse assess FIRST?"
  beats "What is the normal range for serum potassium?" The NCLEX is a clinical
  judgment exam.
- **Put the cue in the stem.** The data a nurse would actually have — vitals,
  labs, timing, the client's own words — belongs in the stem, not the rationale.
- **Make every distractor plausible.** An option nobody would pick is a wasted
  option. Good distractors are things a student might genuinely do: the right
  action at the wrong time, the second priority, the delegated task.
- **One defensible answer.** If two options are arguably right, the question is
  broken. This is the most common flaw in hand-written items.
- **The rationale explains the distractors too.** Say why C is right *and* why A
  and D are tempting but wrong. That is where the learning happens.
- **Keep the tip short and portable.** A mnemonic, a threshold, a hold parameter —
  something that survives being read once at 2am.
- **Avoid absolutes** (`always`, `never`, `all`) in options unless the clinical
  fact really is absolute. Students learn to pick against them.

---

## Changing the app

- **No dependencies and no build step.** Everything ships in the one HTML file.
  The only external resources are Google Fonts, and the page must still work when
  those fail to load.
- **Keep new features additive.** The progress tracker persists to
  `localStorage` under `nclexProgress` and exports as JSON. Prefer deriving new
  state from what is already stored — the gamification layer adds no keys at all,
  which is why a progress file exported before it existed still imports cleanly
  and produces the right rank, streak and badges.
- **If you must add a key**, make it optional and degrade gracefully when it is
  absent. Someone's exported progress from six months ago has to keep working.
- **Escape anything that reaches the DOM.** Use the existing `escapeHtml()` for
  question text, option text and any imported value.
- **Responsive down to 375px.** The layout is checked at phone width; the page
  must not scroll horizontally.
- **Never call an API from the client.** Clinical insights are curated text
  bundled with each question, deliberately — a browser-side API key would be
  public. This was already fixed once; please don't reintroduce it.

---

## Before you commit

```bash
# 1. The bank must validate clean
node tools/validate-questions.mjs

# 2. The app's JavaScript must parse
for f in nclex_simulator.html nclex_public.html; do
  sed -n '/^<script>$/,/^<\/script>$/p' "$f" | sed '1d;$d' > /tmp/check.js
  node --check /tmp/check.js && echo "$f OK"
done

# 3. Open both files in a browser and actually answer a few questions,
#    including at least one NGN matrix and one bow-tie.
```

For clinical changes, note in the commit message which guideline changed, which
body published it, and in what year. `CLINICAL_REVIEW.md` is the running record
of those changes — add an entry there too.

---

## Acknowledgments

Clinical review contributions are credited in
[`ACKNOWLEDGMENTS.md`](ACKNOWLEDGMENTS.md). If your report or fix improves a
question, your name belongs there.

---

## Gamification and accessibility

The reward layer has rules of its own, because the point is to help someone
study — not to farm engagement.

- **Never reward speed.** The combo counter tracks consecutive *correct* answers
  and nothing is timed. A student who learns to rush in order to protect a streak
  has been taught the wrong habit for a clinical judgment exam.
- **Haptics are always optional and never load-bearing.** `buzz()` is a no-op
  where the Vibration API is unsupported (iOS Safari implements none of it), and
  the toggle persists in `localStorage` under `nclexHaptics`. Every haptic cue
  must have a visual equivalent — nothing should be communicable only by
  vibration.
- **Respect `prefers-reduced-motion`.** Confetti is suppressed entirely and the
  combo/toast animations are disabled. Check `prefersReducedMotion()` before
  adding anything that moves.
- **Losing a streak should point at the learning, not scold.** The message when a
  combo breaks tells the student to read the rationale. Keep that tone.
- **Prefer derived state.** Ranks, streaks and badges are computed from
  `progressData`, which is why old exports still work. `bestCombo` on a session
  record is the only field the reward layer adds, and it degrades to `0`.
