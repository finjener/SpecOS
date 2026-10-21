# RE-TRIGGER.md — Delta Update Protocol
*(Non-destructive delta updates for amended specifications)*

Use this protocol when requirements change, new user personas are added, or existing architecture plans are updated after initial scaffolding. It applies targeted updates to `maps/`, `contracts/`, and `rules/` without overwriting existing code or developed documentation.

---

## 1. Invocation Syntax

```text
The architecture specification has been updated with the following requirements:
[PASTE UPDATES OR REVISIONS HERE]

Execute SpecOS/RE-TRIGGER.md to apply non-destructive delta updates to ex_specos without overwriting existing code or populated maps.
```

---

## 2. Delta Application Rules

1. **Non-Destructive Invariant:**  
   Existing populated files in `maps/`, `contracts/`, and `rules/` must never be wiped or overwritten blindly. All updates are additive and targeted.
2. **Targeted Ingestion & Synchronization:**  
   * **New Pages / Views:** Create corresponding modular slices under `maps/` conforming to the `<3 KB` limit.
   * **Topology Index:** Update `maps/README.md` to index newly added slices and update top-level Mermaid routing.
   * **Dependency Matrix:** Append new cross-persona and cross-tier rows to `sibling-pairs-matrix.md`.
   * **Interface Contracts:** Append new route or model entries to `rules/contracts/`.
3. **Static Audit:**  
   Run `node tools/verify-specos.mjs verify-maps` to ensure new slices contain valid links and adhere to the token budget.
4. **Change Summary:**  
   Output an exact list of modified and newly created files.
