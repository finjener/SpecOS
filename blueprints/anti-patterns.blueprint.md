# Rule: Universal Anti-Patterns Catalog (Prohibited Habits)

**Category:** `05-quality-gates-and-verification`  
**Priority:** Critical (Preventing 10 Common Development Pitfalls)

---

## The 10 Universal Development Anti-Patterns

1. **Single-Silo Tunneling:** Modifying only the specific file named by the user while ignoring companion views and models in the Sibling Matrix.
2. **Privilege Leaks:** Leaving an action, button, or endpoint active for a restricted or guest role when it was intended only for elevated personas.
3. **Deferred Documentation:** Committing code changes without updating corresponding architecture maps and interface contracts in the same change set.
4. **Reverse-Order Construction:** Building client UI views before the database migration and backend API contracts have been coded and verified.
5. **Environment Contamination:** Hardcoding live production secrets or leaking local mock logic into production release builds.
6. **Infrastructure Disruption (Version Bump Disaster):** Arbitrarily bumping core engine versions or applying raw DDL that violates deployment environment constraints.
7. **Silent Error Swallowing:** Catching errors with empty `catch {}` blocks or failing to log exceptions, masking underlying bugs.
8. **Dirty Working Tree:** Leaving untracked debug artifacts, temporary bundles, or scratch files in the version-controlled repository.
9. **Phantom Documentation:** Documenting features, routes, or endpoints that do not actually exist in the codebase.
10. **Unchecked Assumptions (Context Guessing):** Guessing project structure, conventions, or state instead of inspecting `AGENTS.md` and `docs/handoff/WHERE_WE_LEFT_OFF.md`.
