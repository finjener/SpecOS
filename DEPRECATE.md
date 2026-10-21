# DEPRECATE.md — Feature & Endpoint Retirement Protocol
*(Safe deprecation, dead code pruning, and documentation cleanup)*

Use this protocol when decommissioning features, removing dead code, retiring deprecated endpoints, or pruning obsolete architecture maps.

---

## 1. Invocation Syntax

```text
The following feature / endpoint / model is being deprecated and removed:
[SPECIFY FEATURE / ENDPOINT / MODEL TO RETIRE]

Execute SpecOS/DEPRECATE.md to prune dead code, update maps, and record retirement details in the deprecation ledger.
```

---

## 2. 4-Step Retirement Protocol

1. **Prune Architecture Maps (`maps/`):**
   * Remove decommissioned components and Mermaid nodes from the corresponding slice under `maps/`.
   * If an entire surface or route is eliminated, archive or remove the slice and update `maps/README.md`.

2. **Clean Dependency Matrix (`sibling-pairs-matrix.md`):**
   * Remove orphan dependency rows associated with the retired components to prevent false positives in pre-commit audits.

3. **Record in Deprecation Ledger (`gaps/deprecation-ledger.md`):**
   * Document the retirement date, rationale, migration path, and breaking changes.

4. **Verify Static Integrity:**
   * Run `node tools/verify-specos.mjs verify-maps` to ensure zero broken markdown links remain.
