# Pipeline 01: Architecture Specification Parser
*(Specification Analyzer and Entity Extraction Engine)*
**Directory:** `SpecOS/core-engine/01-plan-deconstructor.md`  
**Input:** Finalized user plan text (`PLAN.md` / PRD / Spec notes)  
**Output:** 6-Dimensional Structured Architecture Blueprint

---

## 1. Deconstruction Logic (How it Operates)

When provided with a finalized plan, the AI executes this pipeline to convert unstructured prose into a **6-dimensional architectural breakdown**:

### Dimension 1: Personas & Permission Topography
Scan the plan to isolate all human and system actors:
* **Primary Personas:** End-user, administrator, staff operator, guest, worker, etc.
* **Hard Permission Boundaries:** What can each actor do, and what are they **STRICTLY PROHIBITED** from doing? (e.g. "Customer can view order but cannot cancel after dispatch", "Parent has read-only visibility on student academic goals").
* Define for each role: Read permissions, Write permissions, Billing/Financial authority, Deletion rights.

### Dimension 2: Architectural Tiers & Tech Stack
Deconstruct components into 3 to 4 distinct tiers:
* **Client Surfaces:** Web SPA, Mobile App, Desktop Client, Public Brochure.
* **Backend Services:** API Gateway, Monolith / Microservices, Background Workers (Cron, Queue).
* **Data & Storage:** Relational DB, Document/NoSQL, In-Memory Cache (Redis), Object Storage (S3).
* **Third-Party Integrations:** Payment gateways, SMS/Email providers, external auth brokers.

### Dimension 3: Data Mutation & Propagation Chains
Trace how state changes flow across layers:
* *User Interaction $\rightarrow$ Client Validation $\rightarrow$ API Endpoint $\rightarrow$ DB Transaction $\rightarrow$ Background Event $\rightarrow$ Sibling Role Views*
* Example: "When a driver accepts a delivery, the database status updates, an SMS triggers to the customer, and the dispatcher board status turns green."

### Dimension 4: State Machines & Lifecycle Invariants
Extract core entity states and forbidden transitions:
* Example: `Draft` $\rightarrow$ `Published` $\rightarrow$ `Archived`.
* Forbidden transition: "Archived entity cannot revert to Draft", "Settled payment cannot be deleted without an explicit Refund state".

### Dimension 5: Hard Architectural Invariants
Identify non-negotiable project constraints:
* Example: "Must run on Docker", "Zero unauthenticated endpoints", "SQLite for local dev, PostgreSQL for production", "Strict GDPR/KVKK compliance".

### Dimension 6: Quality Gates & Test Commands
Extract concrete build and test commands for the target stack:
* Build commands (`npm run build`, `cargo build`, `go build`).
* Typecheck and linting commands (`tsc --noEmit`, `eslint`, `php -l`, `flake8`).
* Test execution commands (`pytest`, `npm test`, `cargo test`).


### Dimension 7: Cache Topology & Async Queues
Identify high-load read paths and background processing:
* Cache layers (Redis, Memcached, in-memory) and invalidation hooks.
* Asynchronous message topics (BullMQ, Kafka, RabbitMQ) and worker boundaries.

### Dimension 8: Granular Authorization & Data Privacy (AuthZ / IDOR)
Map object-level access boundaries and sensitive data:
* Resource ownership fields (`user_id`, `tenant_id`, `workspace_id`).
* PII and financial fields requiring encryption, masking, and GDPR/KVKK audit trails.
---

## 2. Output Standard

Upon completion, this pipeline produces the **System Identity Summary** passed directly into [`02-sibling-matrix-deriver.md`](02-sibling-matrix-deriver.md).
