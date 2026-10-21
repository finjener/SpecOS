# Pipeline 09: The Dependency & Migration Sequencer
*(Execution Ordering and Dependency Sequencing Engine)*

**Directory:** `SpecOS/core-engine/09-dependency-sequencer.md`  
**Input:** New feature specification or data model change  
**Output:** Strict bottom-up execution order enforced in `ex_specos`

---

## 1. Why is this Required?

AI models frequently write code in **reverse order**:
* They build UI buttons and complex client views before the database migration has been run or the backend API exists.
* This leads to "phantom data", broken types, unhandled network failures, and runtime crashes.

This engine enforces a strict **"Bottom-Up Construction Sequence"** into `ex_specos`.

---

## 2. Mandatory 7-Step Order of Operations (Test-Inoculated)

```mermaid
graph TD
    Step1["1. Data Layer (DB Migration, Model Schema, Indexes)"] --> Step2["2. Backend Contract (API Endpoint & Validation)"]
    Step2 --> Step3["3. Contract & API Tests (Pytest / Vitest / Jest)"]
    Step3 --> Step4["4. Client API Bridge (Type Definitions, Fetchers)"]
    Step4 --> Step5["5. Primary User Interface (Components & States)"]
    Step5 --> Step6["6. Sibling Persona Surfaces (Admin & Companion Views)"]
    Step6 --> Step7["7. Smoke Run & Parity Verification (Exit 0 Proof)"]
```

1. **Step 1 (Data Layer):** Database schema migrations must be written and verified before backend endpoints are coded.
2. **Step 2 (Backend Contract):** The API route must be implemented and validated against input schemas.
3. **Step 3 (Contract & API Tests):** Automated tests asserting 200 OK, 400 validation error, and 403 authorization boundary MUST pass before client code is written.
4. **Step 4 (Client Bridge):** TypeScript types and API client functions must be defined before UI state binds to them.
5. **Step 5 (Primary UI):** The primary view is built with explicit loading, empty, and error fallback states.
6. **Step 6 (Sibling Views):** All companion persona views mapped in `sibling-pairs-matrix.md` are updated in lockstep.
7. **Step 7 (Smoke Run):** Verification commands (`tools/verify-system.mjs`, test suites) execute with exit code 0.
