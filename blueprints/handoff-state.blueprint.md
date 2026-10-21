# Template: Session State and Engineering Handoff (WHERE_WE_LEFT_OFF)

**Directory:** `docs/handoff/WHERE_WE_LEFT_OFF.md`  
**Objective:** Compact session handoff state (<500 tokens) providing immediate project context and task tracking.
---

## 1. Quick Status Card

* **Project Code:** `{{PROJECT_CODE_NAME}}`
* **Active Git Branch:** `{{ACTIVE_GIT_BRANCH}}`
* **Latest Commit:** `{{INITIAL_COMMIT_HASH}}` — `Initial scaffold of {{PROJECT_CODE_NAME}} architecture`
* **Working Tree Status:** `git status clean` (0 uncommitted changes)
* **Active Milestone:** `Milestone 1: Core Foundation & Infrastructure Setup`

---

## 2. Quick Documentation Index

* **Architecture Maps:** [`maps/README.md`](../../maps/README.md)
* **Sibling Pairs Matrix:** [`rules/02-impact-analysis-and-parity/sibling-pairs-matrix.md`](../../rules/02-impact-analysis-and-parity/sibling-pairs-matrix.md)
* **API & DB Contracts:** [`rules/contracts/`](../../rules/contracts/)
* **Coding Recipes:** [`rules/recipes/`](../../rules/recipes/)
* **Scope Tiers Playbook:** [`rules/00-scope-tiers/change-classification.md`](../../rules/00-scope-tiers/change-classification.md)
---

## 3. Active Task Ledger

### Recently Completed Tasks
- [x] Project architecture analyzed and `{{PROJECT_CODE_NAME}}` repository rules scaffolded.
- [x] Architecture maps (`maps/`), rules (`rules/`), and contracts established.
- [x] Static system integrity verified (0 broken links, <3 KB token budget).
### Immediate Next Actions
- [ ] Milestone 1: Implement foundational database models and migrations.
- [ ] Implement first backend API endpoints following canonical recipes.
- [ ] Build initial client views and bind sibling persona surfaces.
