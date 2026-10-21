# CUTOVER.md — Project Transition & Milestone 1 Inception
*(Protocol for declaring scaffolding approved and starting implementation)*

This protocol defines the formal transition from architecture scaffolding to feature construction under the generated `<project>_specos` (e.g. `ex_specos`) ruleset.

---

## 1. Cutover Approval

Once the generated architecture maps, contracts, and test recipes have been reviewed and validated (`node tools/verify-specos.mjs all`), transition to active construction with:

```text
The ex_specos scaffolding is approved. Transition to active construction and begin Milestone 1 under ex_specos repository rules.
```

---

## 2. Operational Rules During Active Construction

1. **Active Repository Rules:**  
   The root `AGENTS.md`, `rules/`, and `maps/` now serve as the active source of truth. All ongoing prompts and commits must adhere to these invariants.
2. **Implementation Workflow:**  
   Every engineering task follows the defined dependency sequence:
   * **Data Layer First:** Write and verify schema migrations before implementing API endpoints.
   * **Contract & Test:** Implement the backend route and automated tests before binding frontend components.
   * **UI & Siblings:** Implement primary UI state, then synchronize companion persona views mapped in `sibling-pairs-matrix.md`.
   * **Synchronized Documentation:** Update corresponding `maps/` and `contracts/` entries in the same change set.
   * **Pre-Commit Verification:** Run `node tools/verify-specos.mjs` to ensure zero broken links and complete sibling parity before committing.
