# Ledger: Architecture Assumptions & Inferred Defaults

**Category:** `02-impact-analysis-and-parity`  
**Purpose:** Explicitly track all architectural decisions, default configurations, and inferred invariants adopted when specifications are omitted or ambiguous.

---

## 1. Active Assumptions Registry

| ID | Domain | Specification State | Assumed Decision & Rationale | Criticality Tier | Override Method |
|---|---|---|---|:---:|---|
| `{{ASSUMPTION_ID_1}}` | `{{ASSUMPTION_DOMAIN_1}}` | `{{ASSUMPTION_STATE_1}}` | `{{ASSUMPTION_DECISION_1}}` | `{{ASSUMPTION_TIER_1}}` | Update via `RE-TRIGGER.md` or modify schema |
| `{{ASSUMPTION_ID_2}}` | `{{ASSUMPTION_DOMAIN_2}}` | `{{ASSUMPTION_STATE_2}}` | `{{ASSUMPTION_DECISION_2}}` | `{{ASSUMPTION_TIER_2}}` | Update via `RE-TRIGGER.md` or modify contract |
{{ASSUMPTIONS_TABLE_ROWS}}

---

## 2. Assumption Criticality Tiers

* **Tier 3 (Core Architectural Invariant):** Multi-tenancy isolation model, data retention/soft-delete rules, core ORM/database technology, or root permission boundaries.
  - Invariant: When scaffolding in interactive mode, Tier 3 omissions must be confirmed via RFI before code generation.
  - When scaffolding with `--assume-defaults`, Tier 3 decisions are selected using production best practices and logged above for team review.
* **Tier 2 (Service / API Standard):** Default pagination caps (e.g., `limit=20, max=100`), error envelope format (RFC 7807), or timestamp standard (UTC ISO-8601).
* **Tier 1 (Local / Component Default):** Default sorting column, debounce intervals, or placeholder labels.

---

## 3. Override Lifecycle

Any recorded assumption can be amended without discarding existing scaffolding:
1. Update the specification file (`PLAN.md`) with the explicit requirement.
2. Execute `RE-TRIGGER.md`.
3. The engine non-destructively reconciles maps, contracts, and updates this ledger row to `Status: Explicitly Defined`.
