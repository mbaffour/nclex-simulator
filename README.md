# 🩺 NCLEX Pro Simulator

> *"Nurses don't get coffee breaks. Coffee gets nurse breaks."*

An AI-powered, Next Gen NCLEX practice simulator built with love for nursing students preparing for licensure. Features adaptive testing, instant AI rationales, all 8 clinical domains, and every NGN question format.

**Built for Peyton — soon-to-be ICU nurse extraordinaire. You've got this. 💙**

---

## ✨ Features

| Feature | Details |
|---|---|
| **Practice Modes** | Practice (tutor), CAT Simulation, Next Gen NCLEX, Rapid Review |
| **Question Types** | MCQ, SATA, NGN Matrix, NGN Bow-tie, Drop-down, Ordered Response |
| **Clinical Domains** | All 8 NCLEX domains covered |
| **AI Rationales** | Claude AI generates real-time clinical insights per question |
| **Adaptive CAT** | Mirrors real NCLEX adaptive difficulty (75–145 Qs) |
| **Timed Mode** | 1 minute per question to simulate exam pressure |
| **Score Breakdown** | Domain-level performance tracking with visual charts |
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

---

## 🧠 Study Modes

### 📖 Practice Mode
Study with instant feedback after each question. Rationale, NCLEX tip, and AI clinical insight shown immediately. Best for learning new material.

### 🎯 CAT Simulation
Mirrors the real NCLEX Computerized Adaptive Test. Difficulty adjusts to your performance across 75–145 questions. Closest thing to the real deal.

### 🧠 Next Gen NCLEX (NGN)
Focused practice on NGN-specific formats: Matrix Grid, Bow-tie Clinical Judgment, Enhanced Hotspot, Drop-down Cloze. The 2023+ NCLEX format.

### ⚡ Rapid Review
High-yield 25-question sprint. Perfect for daily warmup or that final week grind.

---

## 💊 Nursing Meme Disclaimer

This simulator includes rotating nursing humor because if you're not laughing, you might be crying, and neither helps your O2 sat. The memes are medically inaccurate but emotionally accurate.

---

## 🛠️ Tech Stack

- **Vanilla HTML/CSS/JS** — zero dependencies, zero build step
- **Anthropic Claude API** — AI-generated clinical insights
- **Google Fonts** — Fraunces + DM Sans
- **CSS Grid & Flexbox** — responsive layout
- **CSS Custom Properties** — full theming system

---

## 🤝 Contributing

Want to add more questions? The question bank lives in the `QUESTIONS` array in `nclex_simulator.html`. Each question follows this schema:

```js
{
  id: 46,
  domain: "pharmacology",        // one of the 8 domains
  type: "mcq",                   // mcq | sata | ngn_matrix | ngn_bowties
  stem: "A nurse is caring for...",
  options: ["A. ...", "B. ...", "C. ...", "D. ..."],
  correct: 2,                    // 0-indexed (or array for SATA)
  rationale: "Option C is correct because...",
  tip: "NCLEX tip: ...",
  tags: ["pharmacology", "safety"]
}
```

---

## ⚖️ Disclaimer

This is an **unofficial** practice tool created for educational purposes. NCLEX® is a registered trademark of NCSBN. This simulator is not affiliated with, endorsed by, or sponsored by NCSBN. Always supplement with official NCSBN practice materials.

---

## 💙 A Note

This was built by someone who watched a nursing student grind through clinicals, pharmacology, care plans, and enough pathophysiology to make anyone's head spin — and still show up with a smile.

Peyton, you are going to be an **incredible** ICU nurse. The patients who get you are lucky. Now go pass that NCLEX. 🏥

---

*"The NCLEX tests your ability to make life-or-death decisions while sleep-deprived. Welcome to nursing!"*
