# Clinical Review Log

A running record of question changes driven by clinical accuracy — chiefly
guidelines that moved after a question was written.

Questions in this bank are not static facts. Screening ages shift, drug-hold
protocols get rewritten, and definitions are revised. An item that was correct
when it was authored can quietly become wrong, and a practice bank nobody
re-reads will keep teaching the old answer indefinitely. This file is how we
keep track.

**How to use it:** before changing an answer key, check whether the item appears
below. When you do change one, add an entry with the guideline, the issuing body
and the year.

---

## 2026 — Guideline currency review

Reported by **Mrs. Sandra Brown**, who reviewed the bank against current practice
guidelines and identified a set of questions whose answers or rationales had gone
out of date. Every item below traces to that review.

### Answer keys corrected

These questions had a **keyed answer that is now wrong**.

#### q63 — Colorectal cancer screening start age

- **Was:** keyed option read *"Begin colonoscopy at age 50 and repeat every 10 years."*
- **Now:** *"Begin colonoscopy at age 45 and repeat every 10 years."*
- **Why:** The American Cancer Society lowered the average-risk start age to 45 in
  2018; the USPSTF followed in 2021 (Grade B, ages 45–49). Age 50 is the retired
  recommendation.
- **Also:** the item contradicted q239, q486, q694 and q903 in the same bank, all
  of which already taught 45. The rationale and tip were rewritten to match.

#### q151 — Breast cancer screening per USPSTF

- **Was:** keyed option read *"Begin mammograms at age 50; annual or biennial
  screening until age 74 (per USPSTF)."*
- **Now:** *"Begin biennial mammograms at age 40 and continue through age 74
  (per USPSTF 2024)."*
- **Why:** The USPSTF 2024 final recommendation is biennial screening mammography
  for women aged 40–74 (Grade B). The item's own rationale already said so — the
  keyed option contradicted it.

#### q428 — Metformin and iodinated contrast

- **Was:** keyed option read *"Hold metformin 48 hours before the procedure and
  restart only when creatinine is confirmed normal."*
- **Now:** *"Check the eGFR — metformin is withheld from the time of contrast and
  for 48 hours after only if eGFR is below 30 or acute kidney injury is present."*
- **Why:** The ACR–NKF consensus statement (2020), carried into the current ACR
  Manual on Contrast Media, does **not** require holding metformin before or after
  IV contrast in clients with eGFR ≥30 mL/min/1.73 m² and no AKI. The hold applies
  from the time of contrast through 48 hours after, and only when eGFR is <30, AKI
  is present or suspected, or contrast is given intra-arterially with likely renal
  artery exposure. The blanket "hold 48 hours before every scan" rule is obsolete.

### Rationales and tips corrected

The keyed answers here were still defensible, but the teaching text stated a
superseded guideline as current.

| Question | Topic | Correction |
|---|---|---|
| q25 | STEMI NGN matrix | Metformin hold tied to eGFR / AKI / intra-arterial contrast rather than "any contrast procedure". |
| q43 | Metformin teaching | Removed "MUST be held 24–48 hours before contrast". The distractor stating that rule as fact was reworded, since under current guidance it is no longer a correct statement. |
| q204 | Metformin before CT | Rationale now gives the eGFR-based ACR standard; tip no longer says "hold 48 h before". |
| q417 | Contrast nephropathy prevention | Same correction to the metformin aside. |
| q789 | Pre-angiogram assessment | Same correction to the metformin aside. |
| q1029 | CKD medication review | Hold now described as from the time of contrast through 48 hours after. |
| q1228 | Metformin with raised creatinine | Rationale and tip rewritten around eGFR thresholds. |
| q1421 | Metformin + linagliptin | Tip rewritten; removed "not all institutions hold 48 h before — know your policy", which taught the obsolete rule as an acceptable variant. |
| q1576 | Metformin before cardiac cath | Removed "this is a STANDARD pre-procedure protocol for all patients on metformin". |
| q396 | Infective endocarditis prophylaxis | **Clindamycin removed** from the penicillin-allergy regimens. The AHA dropped it in its 2021 update (*Circulation*) over *C. difficile* and other adverse effects. Current alternatives: cephalexin, azithromycin or clarithromycin, or doxycycline. |
| q423 | Postpartum hemorrhage NGN bow-tie | PPH definition updated to ACOG Practice Bulletin 183. |
| q661 | Boggy uterus / bladder distension | Same; the old 500 mL vaginal / 1,000 mL cesarean split is explicitly flagged as outdated. |
| q1751 | Third-stage PPH | Same. |
| q306 | Breast self-examination | Rationale said BSE "should be performed by ALL women". The ACS no longer recommends routine BSE for average-risk women; it has not been shown to reduce mortality. |

**Postpartum hemorrhage, current definition** (ACOG Practice Bulletin 183, 2017):
cumulative blood loss of ≥1,000 mL, **or** blood loss accompanied by signs or
symptoms of hypovolemia, within 24 hours of birth — **regardless of delivery
route**. Blood loss over 500 mL after a vaginal birth remains abnormal and
warrants evaluation, but it is no longer the diagnostic threshold.

---

## 2026 — Structural faults found by validation

Not guideline changes, but questions that could not be answered correctly.
Found by `tools/validate-questions.mjs`, which was written during this review.

| Questions | Fault | Effect |
|---|---|---|
| q489, q532, q590 | Stem says "select all that apply" and `correct` is an array, but `type` was `"mcq"` | Rendered as radio buttons; the scorer compared a number to an array, so they could **never** be answered correctly. Retyped as `sata`. |
| q123, q1267 | `rationale` key misspelled as `bationale` and `resale` | The feedback panel displayed the literal text "undefined" instead of the explanation. |
| 8 bow-tie questions | Typed `ngn_bowtie` (the renderer dispatches on `ngn_bowties`), and using a data shape the renderer never supported | The exam screen threw and went blank whenever one appeared. Fixed by correcting the type and adding `bowtieModel()` to normalise both shapes. |
| 6 matrix questions | Row-object shape with no `cols`/`correct` | `renderMatrix()` threw on the missing `cols` array. Fixed by adding `matrixModel()`. |
| 68 questions | `domain: "psychosocial"` while the filter chip used `"psycho"` | Selecting *Psychosocial Integrity* reached only 18 of 86 psychosocial questions; the other 68 showed on the dashboard under a raw, unlabelled row. Normalised on `psychosocial`. |

---

## Reporting a suspected error

Open an issue with:

- the question `id`
- what the current answer or rationale says
- what it should say
- the guideline, the issuing body, and the year

You do not need to supply a patch. A well-sourced report is the hard part.
Reports that lead to a fix are credited in [`ACKNOWLEDGMENTS.md`](ACKNOWLEDGMENTS.md)
and logged here.
