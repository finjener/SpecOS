# Guide: Clean Extraction & Archiving SpecOS Post-Scaffolding
*(Moving SpecOS Outside the Project Repository After Scaffolding)*

**Directory:** `SpecOS/docs/clean-extraction-guide.md`  
**Objective:** Safely archive or move `SpecOS/` out of the project repository after `<project>_specos` has been generated and validated.

---

## 1. When to Archive

Once the user executes `CUTOVER.md` and begins feature construction, `SpecOS/` has fulfilled its initialization role.
Moving `SpecOS/` out of the version-controlled project leaves only application source code, configuration files, and `<project>_specos` artifacts (`AGENTS.md`, `maps/`, `rules/`, `contracts/`, `tools/`).

---

## 2. Extraction Steps

```bash
# Option A: Move SpecOS to an external tools or archive directory:
mv SpecOS/ ~/tools/SpecOS/

# Option B: Move up to the outer workspace container:
mv SpecOS/ ../SpecOS_archive/

# Verify git working tree:
git status
```

---

## 3. Zero Runtime Dependency Guarantee

* `<project>_specos` carries **zero runtime or compile-time dependencies** on `SpecOS/`.
* All generated rules, modular maps, contracts, and verification scripts (`tools/verify-specos.mjs`) are fully self-contained inside the target repository.
