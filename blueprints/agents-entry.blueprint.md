# {{PROJECT_CODE_NAME}} — Universal Agent Directives & Project Rules

> **System Code:** `{{PROJECT_CODE_NAME}}`  
> **Activation Status:** **100% AUTOMATICALLY ACTIVE ON EVERY PROMPT AND TASK (ALWAYS ACTIVE).**  
> **Standard:** Universal Agentic AI Foundation (`AGENTS.md`) open standard.  
> **Modular Rules System:** [`rules/README.md`](rules/README.md) · **Living Maps:** [`maps/README.md`](maps/README.md) · **Contracts:** [`rules/contracts/`](rules/contracts/).

---

## 0. Architecture Specification & System Rules

`{{PROJECT_CODE_NAME}}` defines the architectural invariants, access boundaries, interface contracts, and cross-tier dependencies for this project.
All contributors and automated assistants operating in this repository must adhere to these policies on every change set.
---

## 1. Project Context & Architecture

{{PROJECT_DESCRIPTION_AND_TIERS}}

---

## 2. Mandatory Policy 1: Architecture Documentation Lifecycle

**Keep architecture maps and contracts in lockstep with implementation.**
Whenever features, schema migrations, bug fixes, or UI components are modified:
1. **Handoff Log:** Update `docs/handoff/WHERE_WE_LEFT_OFF.md` with the latest commit hash, affected files, and verification status.
2. **Architecture Maps:** If a page, route, view, or modal is modified or introduced, update the corresponding slice under [`maps/`](maps/README.md).
3. **Component Inventory:** If an actionable element, button, or container is added or changed, update the component inventory table in the relevant map slice.
---

## 3. Mandatory Policy 2: Map-Driven Blast-Radius & Sibling Parity

**Never make isolated, single-silo code modifications.** Every change radiates across roles and tiers:
1. **Pre-Implementation Map Scan:** Before modifying code, scan [`maps/README.md`](maps/README.md) and [`rules/02-impact-analysis-and-parity/sibling-pairs-matrix.md`](rules/02-impact-analysis-and-parity/sibling-pairs-matrix.md).
2. **Sibling Pairs Matrix:** When modifying a primary file, all mapped sibling files (e.g. Customer $\leftrightarrow$ Admin $\leftrightarrow$ Warehouse) must be updated in lockstep.
3. **Multi-Role Parity:** A change in one role's view must be evaluated and mirrored across all companion roles.
4. **Living Map Sync:** Synchronize maps immediately upon task completion.

---

## 4. Mandatory Policy 3: Hard Architectural Invariants & Owner Preferences

{{PROJECT_OWNER_INVARIANTS}}

---

## 5. Mandatory Policy 4: Scope Tiers Triage

* **Tier 1 (Cosmetic):** CSS, typo fixes $\rightarrow$ Touch single file; no sibling check needed.
* **Tier 2 (Component/Feature):** New modal, form revision $\rightarrow$ Sibling matrix scan + update matching `maps/` slice.
* **Tier 3 (Core/Platform):** API schema, database, role permission boundaries $\rightarrow$ Full cross-role parity check + verification gates + handoff log.

---

## 6. Mandatory Policy 5: Quality Verification Gates

Never yield work without executing and passing:
{{PROJECT_VERIFICATION_COMMANDS}}

---

## 7. Mandatory Policy 6: Verification & Compliance Ledger

Every task response must conclude with the following verified compliance audit table:

```markdown
### Architecture & Verification Compliance Ledger
| Audit Item | Status | Inspected / Synchronized Files |
|---|:---:|---|
| Sibling Files & Role Parity | [OK] / [N/A] | ... |
| Architecture Maps (maps/) | [OK] / [N/A] | ... |
| Interface Contracts (contracts/) | [OK] / [N/A] | ... |
| Test & Verification Gates | [OK] | ... |
| Working Tree Status | [OK] | git status clean |
```
