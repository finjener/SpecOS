# Template: Brownfield Existing Codebase Inventory & Debt

**Directory:** `SpecOS/blueprints/brownfield-retrofit.blueprint.md`  
**Objective:** Document legacy files and unmapped state discovered when retrofitting `ex_specos` onto an existing project.

---

## 1. Existing Codebase Alignment Table

| Existing File / Directory | Planned Module Equivalent | Map Status | Required Action |
|---|---|---|---|
| `src/legacy/...` | `Module X` | Mapped into `maps/01-...md` | Refactor scheduled / Sibling linked |
| `backend/old_api/...` | `Unplanned Legacy` | Logged into `gaps/technical-debt.md` | Triage in future milestone |

---

## 2. Invariant Rule
* Existing source files must NEVER be blindly deleted; they must be mapped or documented in the gap ledger first.
