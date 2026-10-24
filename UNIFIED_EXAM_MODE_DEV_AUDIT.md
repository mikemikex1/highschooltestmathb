# Unified Math B + Official Exam Mode — DEV Audit

Date: 2026-10-24

## Architecture

- The repository root now mounts the Math B app shell directly; it no longer performs a meta-refresh to a gateway page.
- The app has one hash router with three top-level modes: `#mode=curriculum`, `#mode=exam&year=115&question=1`, and `#mode=supplementary`.
- Curriculum keeps the existing lesson/unit renderer and lesson sidebar. Exam mode replaces the sidebar with year and question navigation. Supplementary mode uses the same shell.
- `Math-B-Review/index.html` remains as a legacy direct page for compatibility, but the unified app does not link through it and the root entry does not route through it.

## Canonical source and exam contract

- Question authority remains `數學B快速複習/question-bank.js` plus its existing 115 override layer.
- Presentation metadata remains `Math-B-Review/review-presentation-metadata.js`; it is not an answer source.
- Verified baseline: 5 years, 100 questions, type counts single 39 / multiple 25 / fill 26 / non-selection 10.
- Exam renderer mounts exactly one `.exam-question-card` for the current hash question. It does not render the other questions and hide them with CSS.
- Pre-submit DOM contains the prompt, official image, options/input, and submit/reset controls only. The result and solution section is created only after submit/confirm.
- Question state is keyed by `year-Qn`, so switching questions cannot reuse another question's answer. Reset deletes that session state and remounts the unanswered view.
- Invalid year/question hashes deterministically canonicalize to `#mode=exam&year=115&question=1`.

## Groups and images

- The renderer accepts the existing optional `group` hash parameter and canonical question `groupId` / `sharedContextId` fields without creating a second data source.
- Current canonical data has no populated group relationships; no group data was invented or altered.
- All 100 canonical question images exist and are loaded from repository-local paths.

## Runtime evidence

- Root HTTP entry: `http://127.0.0.1:8792/` loaded directly with the unified shell.
- Deep link tested: `#mode=exam&year=113&question=17` rendered one fill question and one official image.
- Curriculum → exam → supplementary → back navigation was exercised without page errors.
- Invalid hash rendered the deterministic fallback and canonicalized the URL.
- Submitted Q17 exposed result content; navigating to Q18 mounted one fresh unanswered question with no result section.
- Browser request/page errors during the smoke flow: 0.
- Document overflow measurements at 1440, 768, 390, and 320 CSS pixels were 0 (`scrollWidth === clientWidth` in each run). Complex official images remain in a local scroll container when needed.

## Regression evidence

- `scripts/validate-exam-mode.js`: PASS
- `scripts/validate-all-math-visuals.js`: 72/72, PASS
- `scripts/audit-practice-uniqueness.js`: 240/240, PASS
- `scripts/validate-math-b-supplement.js`: 36/36, PASS
- `scripts/validate-quiz-interaction.js`: PASS, 100 questions
- `scripts/validate-question-bank.js`: 100/100, PASS
- `scripts/validate-lesson-formulas.js`: 61/61, PASS
- `scripts/test-math-format-r5.js`: 27/27, PASS

## Known follow-up

- Independent QA should perform the requested visual review of all exam question images and accessibility behavior at the public deployment surface. No known runtime blocker remains in the local unified-app smoke.
