---
name: specos
description: SpecOS — Architecture Scaffolding & Rules Engine. Scaffolds and maintains modular maps, contracts, and repository rules from an architecture specification.
---

# SpecOS Skill

Use this skill when the user provides an architecture specification, plan, or PRD to bootstrap project rules, modular architecture maps, interface contracts, and static verification tools (`<project>_specos`, e.g. `ex_specos`).

## When to Trigger
* **Project Initialization:** User requests to scaffold `ex_specos` or provides an architecture specification (with optional `--assume-defaults` flag).
* **Delta Update:** User provides specification revisions and requests to update existing maps and contracts (`RE-TRIGGER.md`).
* **Reverse Sync (Drift Reconciliation):** User requests to reconcile maps and contracts with recent code changes or pull requests (`REVERSE-SYNC.md`).
* **Feature Pruning / Retirement:** User requests to deprecate or remove a feature, endpoint, or obsolete map slice (`DEPRECATE.md`).
* **Architecture Verification:** User requests to verify system integrity, link validity, or sibling parity (`tools/verify-specos.mjs`).

## Execution Workflow

### 1. Environment & Codebase Detection
* Inspect project root: Determine if the repository is empty (Greenfield) or contains existing code (Brownfield).
* If Brownfield, inspect the existing directory structure without modifying source files.

### 2. Architecture Synthesis (Pipelines 01 - 15)
Execute synthesis sequentially (using 3-Stage Checkpointed mode via `13-multi-stage-orchestrator.md` for large specifications):
1. **01-plan-deconstructor:** Extract personas, boundaries, tiers, state machines, AuthZ/IDOR rules, cache topology, and async queues.
2. **01b-plan-completeness-gate:** Apply Strict Criticality Filter. Questions are strictly forbidden for non-blockers (UI, pagination, standard conventions). In interactive mode, halt ONLY for irreversible Tier 3 forks with zero clues (max 1–3 questions). If `--assume-defaults`, adopt standards and log to `gaps/assumptions-ledger.md`.
3. **02-sibling-matrix-deriver:** Derive cross-component and cross-persona dependency matrix (`sibling-pairs-matrix.md`).
4. **03-modular-map-scaffolder:** Scaffold `maps/` in modular slices (<3 KB per slice) with routing flowcharts.
5. **04-contracts-and-recipes:** Scaffold compact API, DB, AuthZ, and async ledgers (`rules/contracts/`) + canonical recipes and 4-tier test pyramid (`rules/recipes/`).
6. **00-blueprint-synthesizer:** Bind template placeholders from `blueprints/` into concrete project files.
7. **05-enforcement-inoculator:** Install root `AGENTS.md`, Scope Tiers, verification contract, `tools/verify-specos.mjs`, and Git pre-commit hook.
8. **07, 09, 10 Security & Ordering:** Enforce destructive action guard, 7-step dependency sequence (DB -> API -> Test -> UI), and environment isolation rules.
9. **14-agent-concurrency:** Partition handoff states if multi-agent swarm or parallel workers are active.

### 3. Static Verification (Pipeline 12 & tools/verify-specos.mjs)
* Run `node tools/verify-specos.mjs all`:
  - Assert zero broken relative links in `maps/`.
  - Assert all map slices remain within the `<3 KB` limit.
  - Assert sibling matrix symmetry.
  - Assert zero unparsed `{{...}}` placeholders.
  - Assert zero unconfirmed critical blockers in `gaps/assumptions-ledger.md`.
* Emit the initialization report and inform the user that `<project>_specos` is initialized and ready for feature implementation under `CUTOVER.md`.
