#!/usr/bin/env node
/**
 * Question-bank validator for the NCLEX Pro Simulator.
 *
 * Checks the QUESTION_BANK array inside each simulator HTML file for the
 * structural faults that actually break the app at runtime — an unknown
 * `type` that no renderer handles, a `domain` with no filter chip, a
 * `correct` index pointing past the end of `options`, a bow-tie whose data
 * shape the renderer cannot consume, duplicate ids, and so on.
 *
 * Usage:
 *   node tools/validate-questions.mjs                    # both HTML files
 *   node tools/validate-questions.mjs nclex_public.html  # one file
 *
 * Exits 0 when clean, 1 when any error is found. Warnings never fail the run.
 */
import { readFileSync } from 'node:fs';

const DEFAULT_FILES = ['nclex_simulator.html', 'nclex_public.html'];

// Kept in sync with renderQuestion()/checkCorrect() and the domain chips.
const TYPES = new Set(['mcq', 'sata', 'ngn_matrix', 'ngn_bowties']);
const DOMAINS = new Set([
  'management', 'safety', 'health', 'psychosocial',
  'basic', 'pharmacology', 'reduction', 'physio',
]);

function extractBank(html, file) {
  const start = html.indexOf('const QUESTION_BANK = [');
  if (start === -1) throw new Error(`${file}: QUESTION_BANK not found`);
  const open = html.indexOf('[', start);
  let depth = 0, i = open, inStr = null, esc = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    // The bank is interleaved with `//` section banners whose text contains
    // apostrophes and dashes; skip them or they open phantom strings.
    if (c === '/' && html[i + 1] === '/') {
      i = html.indexOf('\n', i);
      if (i === -1) break;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0) break; }
  }
  const literal = html.slice(open, i + 1);
  // The bank is a plain array literal of object literals — no identifiers,
  // no calls — so evaluating it in isolation is safe and needs no parser.
  return Function(`"use strict"; return (${literal});`)();
}

function validate(file) {
  const bank = extractBank(readFileSync(file, 'utf8'), file);
  const errors = [], warnings = [];
  const seen = new Map();
  const err = (q, msg) => errors.push(`${file} q${q?.id ?? '?'}: ${msg}`);
  const warn = (q, msg) => warnings.push(`${file} q${q?.id ?? '?'}: ${msg}`);

  bank.forEach((q, idx) => {
    if (typeof q.id !== 'number') return err(q, `missing numeric id (position ${idx})`);
    if (seen.has(q.id)) err(q, `duplicate id (also at position ${seen.get(q.id)})`);
    else seen.set(q.id, idx);

    if (!q.stem || !q.stem.trim()) err(q, 'missing stem');
    if (!TYPES.has(q.type)) err(q, `unknown type "${q.type}" — no renderer handles it`);
    if (!DOMAINS.has(q.domain)) err(q, `unknown domain "${q.domain}" — no filter chip selects it`);
    const ngnType = q.type === 'ngn_matrix' || q.type === 'ngn_bowties';
    if (!q.rationale || !q.rationale.trim()) {
      // NGN items may carry their explanation inside the matrix rows instead.
      (ngnType ? warn : err)(q, 'missing top-level rationale');
    }
    if (!q.tip || !q.tip.trim()) warn(q, 'missing NCLEX tip');
    if (!Array.isArray(q.tags) || q.tags.length === 0) warn(q, 'missing tags');

    if (q.type === 'mcq' || q.type === 'sata') {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        return err(q, `${q.type} needs an options array of at least 2 entries`);
      }
      if (q.type === 'mcq') {
        if (!Number.isInteger(q.correct)) err(q, 'mcq correct must be an integer index');
        else if (q.correct < 0 || q.correct >= q.options.length) {
          err(q, `correct index ${q.correct} is outside options (0-${q.options.length - 1})`);
        }
      } else {
        if (!Array.isArray(q.correct) || q.correct.length === 0) {
          err(q, 'sata correct must be a non-empty array of indices');
        } else {
          q.correct.forEach(c => {
            if (!Number.isInteger(c) || c < 0 || c >= q.options.length) {
              err(q, `correct index ${c} is outside options (0-${q.options.length - 1})`);
            }
          });
          if (new Set(q.correct).size !== q.correct.length) err(q, 'duplicate index in correct');
          if (q.correct.length === q.options.length) warn(q, 'every option is correct');
        }
      }
    }

    if (q.type === 'ngn_matrix') {
      const m = q.matrix;
      if (!m || !Array.isArray(m.rows) || m.rows.length === 0) {
        return err(q, 'ngn_matrix needs a non-empty matrix.rows');
      }
      const explicit = Array.isArray(m.cols) && Array.isArray(m.correct);
      const rowObjects = m.rows.every(r => r && typeof r === 'object' && 'label' in r);
      if (!explicit && !rowObjects) {
        return err(q, 'matrix matches neither supported shape — needs either ' +
          'rows/cols/correct, or rows of {label, expected, action_needed}');
      }
      if (explicit) {
        if (m.correct.length !== m.rows.length) {
          err(q, `matrix.correct has ${m.correct.length} entries for ${m.rows.length} rows`);
        }
        m.correct.forEach((c, i) => {
          if (!Number.isInteger(c) || c < 0 || c >= m.cols.length) {
            err(q, `matrix.correct[${i}] = ${c} is outside cols (0-${m.cols.length - 1})`);
          }
        });
      } else {
        m.rows.forEach((r, i) => {
          if (typeof r.action_needed !== 'boolean') {
            err(q, `matrix.rows[${i}] needs a boolean action_needed`);
          }
          if (typeof r.expected === 'boolean' && r.expected === r.action_needed) {
            warn(q, `matrix.rows[${i}] has expected === action_needed, which is contradictory`);
          }
        });
      }
    }

    if (q.type === 'ngn_bowties') {
      const b = q.bowtie;
      if (!b) return err(q, 'ngn_bowties needs a bowtie object');
      const classic = ['causes', 'actions', 'outcomes'].every(k => Array.isArray(b[k]));
      const ngn = Array.isArray(b.actions_to_take) && Array.isArray(b.parameters);
      if (!classic && !ngn) {
        return err(q, 'bowtie matches neither supported shape — needs either ' +
          'causes/actions/outcomes + correctCauses/correctActions/correctOutcomes, ' +
          'or condition/actions_to_take/actions_to_avoid/parameters');
      }
      if (classic) {
        [['causes', 'correctCauses'], ['actions', 'correctActions'], ['outcomes', 'correctOutcomes']]
          .forEach(([items, key]) => {
            if (!Array.isArray(b[key])) return err(q, `bowtie missing ${key}`);
            b[key].forEach(c => {
              if (!Number.isInteger(c) || c < 0 || c >= b[items].length) {
                err(q, `bowtie.${key} index ${c} is outside ${items} (0-${b[items].length - 1})`);
              }
            });
          });
      } else {
        if (!b.condition) warn(q, 'NGN bowtie has no condition to display in the centre panel');
        if (!Array.isArray(b.actions_to_avoid) || b.actions_to_avoid.length === 0) {
          warn(q, 'NGN bowtie has no actions_to_avoid, so every action in the column is correct');
        }
      }
    }
  });

  return { file, count: bank.length, errors, warnings };
}

const files = process.argv.slice(2);
const targets = files.length ? files : DEFAULT_FILES;
let failed = false;

for (const file of targets) {
  const r = validate(file);
  console.log(`\n${r.file} — ${r.count} questions`);
  r.errors.forEach(e => console.log(`  ERROR   ${e}`));
  r.warnings.forEach(w => console.log(`  warning ${w}`));
  if (!r.errors.length && !r.warnings.length) console.log('  clean');
  else console.log(`  ${r.errors.length} error(s), ${r.warnings.length} warning(s)`);
  if (r.errors.length) failed = true;
}

console.log(failed ? '\nFAILED' : '\nOK');
process.exit(failed ? 1 : 0);
