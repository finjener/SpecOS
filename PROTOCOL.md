# PROTOCOL.md — Architecture Scaffolding Protocol
*(One-Shot & Staged Checkpointed Initialization Protocol)*

This protocol is the primary initialization trigger that converts an architecture plan or PRD into the project-tailored `<project>_specos` (e.g. `ex_specos`) repository ruleset, modular maps, interface contracts, and verification tools.

---

## 1. Invocation Syntax

### Mode A: Interactive Scaffolding (Default — Halts on Critical Omissions)
```text
Read the technical specification below. Execute SpecOS/PROTOCOL.md and scaffold the ex_specos architecture rules and maps in the target project:

[PASTE SPECIFICATION / PRD / ARCHITECTURE NOTES HERE]
```

### Mode B: Autonomous Scaffolding (Adopts Best-Practice Defaults)
```text
Read the technical specification below. Execute SpecOS/PROTOCOL.md with --assume-defaults to automatically adopt production standards for omitted decisions:

[PASTE SPECIFICATION / PRD / ARCHITECTURE NOTES HERE]
```

---

## 2. Execution Modes (One-Shot vs. Staged Checkpoints)

To ensure high output quality and avoid token truncation on large codebases:
* **Standard Projects (<10 views, <15 endpoints):** Execute all passes in a single run.
* **Large / Enterprise Projects (10+ views, 20+ endpoints):** Execute via **3 Checkpoints** per `core-engine/13-multi-stage-orchestrator.md`, committing files to disk after each stage.

---

## 3. Scaffolding Passes

### Pass 0: Environment & Codebase Detection (`core-engine/11`)
* Determine whether the project is Greenfield (empty repository) or Brownfield (existing codebase). If Brownfield, scan existing source files to align maps with reality without modifying application code.

### Pass 1: Architecture Specification Parsing (`core-engine/01`)
* Deconstruct the spec across 8 structural dimensions: actors, permission boundaries, technical tiers, state mutation flows, lifecycle state machines, build/test gates, cache/async infrastructure, and object-level authorization (AuthZ/IDOR).

### Pass 1.5: Pre-Flight Completeness & RFI Gate (`core-engine/01b`)
* Audit the parsed specification against the Strict Criticality Filter (`core-engine/01b`). Questions are **strictly forbidden** for reversible, cosmetic, or standard conventions (UI, layout, pagination, routine CRUD naming).
* **Interactive Mode:** Only halt if an irreversible Tier 3 architectural fork (multi-tenancy model, data retention/soft-delete, conflicting DB engines) has zero contextual clues. Strictly capped at **1–3 questions maximum** with recommended defaults.
* **Autonomous Mode (`--assume-defaults`):** Automatically adopt production best practices for all omissions, document rationale in `gaps/assumptions-ledger.md`, and proceed without interruption.

### Pass 2: Dependency Matrix Derivation (`core-engine/02`)
* Identify cross-component and cross-persona dependencies. Generate `sibling-pairs-matrix.md`.

### Pass 3: Modular Architecture Atlas (`core-engine/03`)
* Generate modular map slices under `maps/` (<3 KB per slice) with routing flowcharts and component inventory tables. Scaffold master index `maps/README.md`.

### Pass 4: Interface Contracts, Recipes & Debt Ledgers (`core-engine/04`, `06`, `01b`)
* Generate `rules/contracts/` (API catalog, database dictionary, AuthZ matrix, async queue contracts), `rules/recipes/` (canonical patterns + 4-tier test pyramid), and `gaps/` (`technical-debt.md` + `assumptions-ledger.md`).

### Pass 5: Blueprint Template Resolution (`core-engine/00`)
* Bind all project parameters into `blueprints/` templates. Verify zero unresolved `{{...}}` placeholders remain.

### Pass 6: Guardrails & Deterministic Verification Setup (`core-engine/05`, `07`, `09`, `10`)
* Install root `AGENTS.md`.
* Install `tools/verify-specos.mjs` and configure `.git/hooks/pre-commit`.
* Enforce Scope Tiers (Tier 1/2/3), Destructive Action Guard (`07`), and 7-Step Dependency Sequencing (`09`).

### Pass 7: Static Integrity Verification (`core-engine/12`)
* Execute `node tools/verify-specos.mjs all`: assert zero broken relative links, confirm <3 KB budget per slice, verify sibling matrix symmetry, and validate template resolution.

---

## 4. Initialization Report

Upon completion, output the system initialization summary:
* Scaffolded System Code: `<project>_specos` (e.g. `ex_specos`)
* Generated Architecture Maps: List of generated slices under `maps/`
* Sibling Dependency Matrix: Summary of mapped file dependencies
* Installed Verification Tools: `tools/verify-specos.mjs` & Pre-commit hook
* Next Steps: Review generated files. Use `RE-TRIGGER.md` for spec revisions, `REVERSE-SYNC.md` for code-to-doc reconciliation, or proceed with `CUTOVER.md` to begin feature construction.
