# REVERSE-SYNC.md — Code-to-Doc Drift Reconciliation Protocol
*(Synchronizing architecture maps and contracts with external code changes)*

Use this protocol when developers, external pull requests, or hotfixes modify the codebase directly, causing `maps/` and `contracts/` to diverge from current implementation.

---

## 1. Invocation Syntax

```text
The codebase has been updated with recent commits/PRs:
Execute SpecOS/REVERSE-SYNC.md to reconcile maps/ and contracts/ with current code state.
```

---

## 2. Synchronization Steps (`core-engine/15`)

1. **Inspect Diffs & Source Symbols:**
   * Run `git diff` against the last sync commit or inspect project controllers, routers, and data models.
   * Identify newly added, altered, or removed:
     - API route handlers and validation schemas
     - Database tables, columns, and foreign keys
     - Frontend views, routes, and modal components

2. **Update Interface Contracts (`rules/contracts/`):**
   * If a new route was introduced in code, append its specification row to `contracts/api-services-catalog.md`.
   * If database schema migrations were added, update `contracts/database-dictionary.md`.
   * If authorization policies changed, update `contracts/authz-matrix.md`.

3. **Update Modular Architecture Maps (`maps/`):**
   * Record new UI views, sub-tabs, or actionable buttons into the relevant `<3 KB` slice under `maps/`.
   * Update `maps/README.md` if new architectural domains or subsystems were introduced.

4. **Verify Static Integrity:**
   * Run `node tools/verify-specos.mjs all` to ensure zero broken links, enforce the <3 KB budget, and confirm contracts match code reality.
   * Emit an audit table detailing all reconciled items.
