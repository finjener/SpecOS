# Ledger: Deprecation & Feature Retirement Registry

**Category:** `02-impact-analysis-and-parity`  
**Purpose:** Track retired endpoints, deleted components, schema migrations, and obsolete maps to eliminate dead code and phantom artifacts.

---

## 1. Deprecated Components & Endpoints Registry

| Item Name / Path | Deprecation Milestone | Retirement (Hard Delete) Date | Replacement Route / Component | Maps & Contracts Cleaned? |
|---|---|---|---|:---:|
| `{{DEPRECATED_ITEM_1}}` | `{{DEP_MILESTONE_1}}` | `{{RETIRE_DATE_1}}` | `{{REPLACEMENT_1}}` | [ ] |
| `{{DEPRECATED_ITEM_2}}` | `{{DEP_MILESTONE_2}}` | `{{RETIRE_DATE_2}}` | `{{REPLACEMENT_2}}` | [ ] |

---

## 2. 4-Step Safe Retirement Protocol

When retiring or deleting an existing capability:
1. **Mark Deprecated:** Add `@deprecated` annotations in source code and mark endpoint in `contracts/api-services-catalog.md`.
2. **Prune Sibling Matrix:** Remove companion dependencies from `sibling-pairs-matrix.md` to prevent broken references.
3. **Archive Map Slice:** If an entire surface is retired, move `maps/XX-domain/file.md` to `maps/archive/` or delete and update `maps/README.md`.
4. **Run System Integrity:** Execute `tools/verify-system.mjs` to ensure zero broken links remain.
