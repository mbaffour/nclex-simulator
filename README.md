# 🩺 NCLEX Pro Simulator

> *"Nurses don't get coffee breaks. Coffee gets nurse breaks."*

A Next Gen NCLEX practice simulator built with love for nursing students preparing for licensure. Features adaptive testing, instant built-in rationales, all 8 clinical domains, and every NGN question format.

**Built for Peyton — soon-to-be ICU nurse extraordinaire. You've got this. 💙**

---

## ✨ Features

| Feature | Details |
|---|---|
| **Practice Modes** | Practice (tutor), CAT Simulation, Next Gen NCLEX, Rapid Review |
| **Question Types** | MCQ, SATA, NGN Matrix Grid, NGN Bow-tie Clinical Judgment |
| **Clinical Domains** | All 8 NCLEX domains covered |
| **Clinical Rationales** | Built-in expert rationale and clinical insight per question |
| **Adaptive CAT** | Mirrors real NCLEX adaptive difficulty (75–145 Qs) |
| **Timed Mode** | 1 minute per question to simulate exam pressure |
| **Score Breakdown** | Domain-level performance tracking with visual charts |
| **Ranks & XP** | 10 nursing-career ranks, earned by answering — accuracy counts for more than volume |
| **Study Streaks** | Consecutive-day tracking, so showing up daily is worth something |
| **Badges** | 17 unlockable badges, with progress bars showing how close you are |
| **Live Combos** | Consecutive-correct counter during a session, with milestone feedback |
| **Haptics** | Vibration feedback for answers, milestones and unlocks (Android; toggleable) |
| **Daily Goal** | A 20-question target that keeps your streak alive |
| **Focus Practice** | Tap your weakest domain to start a session in it |
| **Zero Setup** | Single HTML file — open in any browser, no install needed |

---

## 🏥 Clinical Domains

- Management of Care
- Safety & Infection Control
- Health Promotion & Maintenance
- Psychosocial Integrity
- Basic Care & Comfort
- Pharmacology & Parenteral Therapies
- Reduction of Risk Potential
- Physiological Adaptation

---

## 🚀 Quick Start

**Option 1 — Just open it:**
```
Download nclex_simulator.html → double-click → study!
```

**Option 2 — GitHub Pages (live link):**

The simulator is hosted live at:
👉 **[https://mbaffour.github.io/nclex-simulator/nclex_simulator.html](https://mbaffour.github.io/nclex-simulator/nclex_simulator.html)**

No installation. No login. Just click and go.

**Option 3 — Install it as an app:**

The simulator is a Progressive Web App, so you can put it on your phone's home
screen and it will **work with no signal at all** — a service worker caches the
whole thing on first load. Useful on a commute, or in a hospital with dead spots.

| Platform | How |
|---|---|
| **iPhone / iPad** | Open the link in **Safari** → tap **Share** (□↑) → **Add to Home Screen**. It must be Safari; Chrome on iOS can't install web apps. |
| **Android** | Open in Chrome → menu (⋮) → **Install app** / **Add to Home Screen**. |
| **Desktop** | Chrome or Edge → the install icon (⊕) in the address bar. |

It launches full-screen with its own icon, no browser chrome, and your progress
keeps working exactly as before.

> **One thing worth knowing on iOS:** progress is stored in `localStorage`, and
> iOS clears script-writeable storage for *websites* that go unused for 7 days.
> Apple exempts installed home-screen apps from that, which is a good reason to
> install rather than bookmark — but the exemption isn't a cast-iron guarantee,
> and iOS treats the installed app and Safari as separate storage. **Use the
> `💾 Save` button to export your progress JSON now and then.** That file is
> yours, it survives anything, and `📂 Load` brings it straight back.

---

## 🧠 Study Modes

### 📖 Practice Mode
Study with instant feedback after each question. Rationale, NCLEX tip, and built-in clinical insight shown immediately. Best for learning new material.

### 🎯 CAT Simulation
Mirrors the real NCLEX Computerized Adaptive Test. Difficulty adjusts to your performance across 75–145 questions. Closest thing to the real deal.

### 🧠 Next Gen NCLEX (NGN)
Focused practice on the NGN item types in the bank: Matrix Grid and Bow-tie Clinical Judgment, built on unfolding client-chart case data. The 2023+ NCLEX format.

### ⚡ Rapid Review
High-yield 25-question sprint. Perfect for daily warmup or that final week grind.

---

## 🎮 Ranks, Streaks & Badges

Grinding 1,800 questions is a slog. So the simulator keeps score of more than
your percentage.

**Ranks.** You climb ten ranks as you study, from 📖 *Pre-Nursing* up through
💉 *Clinical Rotation*, 🎓 *NCLEX Candidate*, 🚑 *ICU RN*, and finally
👑 *Nurse Preceptor*. The XP bar on your progress dashboard shows exactly how far
the next one is.

**XP rewards the right things.** A correct answer is worth five times a wrong
one, every study day pays out, and each badge is worth a chunk. Steady daily
practice will out-earn a single panicked cram session — which is also how you
actually pass.

**Streaks.** Your current and best consecutive-day streaks sit at the top of the
dashboard, and the flame shows in the header. Study today or yesterday and the
streak lives; skip two days and it resets. (Your best streak is kept forever.)

**Live streaks while you study.** Answer correctly and a combo counter appears in
the exam header — ⚡ at 3, 🔥 from 10 up — with milestone messages as you climb.
It counts *consecutive correct answers only*, never speed; nothing here is timed,
because rushing to protect a combo is exactly the habit you don't want going into
the exam. Break the streak and it tells you plainly to go read the rationale.

**Haptics.** Distinct vibration patterns for a correct answer, a wrong one, a
combo milestone, a badge unlock and a rank-up, so the feedback registers without
you looking. Toggle it from the header (`📳 Haptics on`); the setting sticks.
Web vibration works on Android browsers — iOS Safari doesn't implement it at all,
and the button says so honestly rather than pretending. Haptics are never the
only feedback for anything.

**A daily goal.** 20 questions — roughly a fifteen-minute sitting, small enough to
manage on a clinical day. The ring at the top of your dashboard shows where you
are, and hitting it is what keeps the streak alive.

**Tap your weakest domain to practise it.** The *Focus Areas* panel already knew
where you were struggling; now each row is a button that starts a session in that
domain. That's the part that actually moves your score.

**17 badges** to collect, including:

| | | |
|---|---|---|
| 👣 **First Steps** — finish your first session | 💯 **Century Club** — 100 questions | 🏔️ **Four Digits** — 1,000 questions |
| 🧭 **Full Sweep** — practice all 8 domains | 🎯 **Flawless** — 100% on a session of 10+ | 🔬 **Sharp Practice** — hold 80%+ over 200 questions |
| 🔥 **On a Roll** — 3 days running | 🗓️ **Thirty Days** — 30 days running | 🧠 **Domain Specialist** — 80%+ in a domain |
| 🌐 **Polymath** — master 4 domains | ⏱️ **Marathoner** — a 75+ question session | 📈 **Comeback** — follow a rough session with an 80%+ one |
| ⚡ **Combo Master** — 15 correct in a row | | |

Locked badges show how close you are — `225 / 500` beats a grey square.

After every session you'll see the XP you earned and anything you just unlocked.

All of it is computed from the progress data you already have — so if you've been
saving progress JSON since before any of this existed, load it and your rank,
streak and badges will be waiting.

---

## 💊 Nursing Meme Disclaimer

This simulator includes rotating nursing humor because if you're not laughing, you might be crying, and neither helps your O2 sat. The memes are medically inaccurate but emotionally accurate.

---

## 🛠️ Tech Stack

- **Vanilla HTML/CSS/JS** — zero dependencies, zero build step
- **Progressive Web App** — installable, works fully offline via a service worker
- **Built-in clinical rationales** — curated insight bundled with each question
- **Google Fonts** — Fraunces + DM Sans
- **CSS Grid & Flexbox** — responsive layout
- **CSS Custom Properties** — full theming system

---

## 🤝 Contributing

Want to add questions, or found one that's wrong? Please read
**[CONTRIBUTING.md](CONTRIBUTING.md)** — it covers the full question schema for
all four question types, the clinical accuracy policy, and what makes an error
report actionable.

The short version:

```js
{
  id: 1801,
  domain: "pharmacology",      // management | safety | health | psychosocial
                               // basic | pharmacology | reduction | physio
  type: "mcq",                 // mcq | sata | ngn_matrix | ngn_bowties
  stem: "A nurse is caring for...",
  options: ["A. ...", "B. ...", "C. ...", "D. ..."],
  correct: 2,                  // index for mcq, array of indices for sata
  rationale: "Option C is correct because...",
  tip: "NCLEX tip: ...",
  tags: ["pharmacology", "safety"]
}
```

Two things before you commit:

```bash
node tools/validate-questions.mjs      # must print OK
```

and apply every question-bank change to **both** `nclex_simulator.html` and
`nclex_public.html` — they share the bank.

### 🩺 Found a wrong answer?

Guidelines change, and questions go stale. If you spot one, open an issue with
the question `id`, what it should say, and the guideline with its year. You don't
need to write the patch — the sourcing is the hard part, and it's the most
valuable thing you can contribute.

Corrections are logged in **[CLINICAL_REVIEW.md](CLINICAL_REVIEW.md)** and
contributors are credited in **[ACKNOWLEDGMENTS.md](ACKNOWLEDGMENTS.md)**.

---

## ⚖️ Disclaimer

This is an **unofficial** practice tool created for educational purposes. NCLEX® is a registered trademark of NCSBN. This simulator is not affiliated with, endorsed by, or sponsored by NCSBN. Always supplement with official NCSBN practice materials.

---

## 🙏 With Thanks

Special thanks to **Mrs. Sandra Brown**, whose clinical review caught a set of
questions whose answers had gone out of date as practice guidelines changed —
including three keyed answers that were flat wrong. Seventeen questions are
better because of her. Details in [ACKNOWLEDGMENTS.md](ACKNOWLEDGMENTS.md).

---

## 💙 A Note

This was built by someone who watched a nursing student grind through clinicals, pharmacology, care plans, and enough pathophysiology to make anyone's head spin — and still show up with a smile.

Peyton, you are going to be an **incredible** ICU nurse. The patients who get you are lucky. Now go pass that NCLEX. 🏥

---

*"The NCLEX tests your ability to make life-or-death decisions while sleep-deprived. Welcome to nursing!"*
