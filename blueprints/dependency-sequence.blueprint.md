# Rule: Dependency Sequencing & Construction Order

**Category:** `00-scope-tiers`  
**Priority:** Critical (Bottom-Up Construction Standard)

---

## 1. Mandatory 5-Stage Construction Sequence

```mermaid
graph TD
    S1["1. Data Layer (DB Migration, Model Schema)"] --> S2["2. Backend Contract (API Endpoint, Validation, Unit Tests)"]
    S2 --> S3["3. Client API Bridge (Type Definitions, API Fetcher)"]
    S3 --> S4["4. Primary User Interface (Component, View, Loading States)"]
    S4 --> S5["5. Sibling Persona Surfaces (Companion Views, Notifications)"]
```

* Binding client UI buttons to database state before migrations and API endpoints are implemented and verified is STRICTLY PROHIBITED.
