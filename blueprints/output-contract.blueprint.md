# Rule: Architecture Verification & Compliance Ledger

**Category:** `05-quality-gates-and-verification`  
**Priority:** Mandatory Verification Checklist

---

## 1. Objective

Enforce deterministic verification across dependent components, architecture maps, interface contracts, and quality gates prior to declaring a task complete.
---

## 2. Standard Verified Response Ledger

Every code or architecture task response MUST conclude with the following table:

```markdown
### Architecture & Verification Compliance Ledger
| Audit Item | Status | Inspected / Synchronized Files |
|---|:---:|---|
| Sibling Files & Role Parity | [OK] / [N/A] | Role A: `...`, Role B: `...` |
| Architecture Maps (maps/) | [OK] / [N/A] | `maps/...` |
| Interface Contracts (contracts/) | [OK] / [N/A] | `contracts/...` |
| Handoff Log (WHERE_WE_LEFT_OFF) | [OK] | `docs/handoff/WHERE_WE_LEFT_OFF.md` |
| Quality Verification Gates | [OK] | {{PROJECT_QUALITY_GATE_SUMMARY}} |
| Working Tree Status | [OK] | git status clean |
```

---

## 3. Compliance Table Rules

1. **Status Indicators:**
   * `[OK]`: Step completed and verified against test/static checks.
   * `[N/A]`: Not applicable to this specific change set.
   * `[FAIL]`: Verification failed; task cannot be delivered until resolved.
2. **Concrete Proof Invariant:**  
   The rightmost column must cite exact file paths. Generic words like `"done"` or `"ok"` are strict rule violations.
