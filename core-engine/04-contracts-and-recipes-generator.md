# Pipeline 04: The Contracts & Recipes Generator
*(API Ledger and Canonical Code Recipe Seeder)*

**Directory:** `SpecOS/core-engine/04-contracts-and-recipes-generator.md`  
**Input:** APIs, data models, and tech stack from `01-plan-deconstructor.md`  
**Output:** Populated `rules/contracts/` and `rules/recipes/` directories

---

## 1. Compact Contracts Ledger (`rules/contracts/`)

To provide fast access to data models and route definitions without scanning entire source trees, this engine creates compact reference ledgers (<400 tokens):

### A. API Services Catalog (`contracts/api-services-catalog.md`)
Every planned endpoint's HTTP method, path, required parameters, and response structure:
| Endpoint / Method | Type | Required Parameters | Response Schema |
|---|:---:|---|---|
| `POST /api/v1/checkout` | Write | `cart_id`, `payment_method` | `{ status: "ok", order_id: string }` |
| `GET /api/v1/orders/:id` | Read | `id` | `{ order: OrderDetails, status: string }` |

### B. Database Schema Dictionary (`contracts/database-dictionary.md`)
Every planned database table's columns, types, foreign keys, and business rules:
* Table Name, Primary Key, Foreign Keys, Indexes, and immutability rules.

---

## 2. Canonical Code Recipes (`rules/recipes/`)

AI models tend to invent different design patterns on every prompt turn. This engine generates canonical, step-by-step recipes tailored to the target tech stack:

* **`add-new-api-endpoint.md`:** Standard 5-step recipe for adding an endpoint in the target backend (Express, FastAPI, Django, Go, Moodle, etc.).
* **`add-new-ui-modal.md`:** Standard accessible modal dialog component adhering to the project's design system and role boundaries.
* **`add-new-db-migration.md`:** Standard migration recipe for the project's ORM/database tool (Prisma, Alembic, raw SQL, Django).
* **`how-to-rollback-safely.md`:** 3-tier disaster recovery guide explaining how to roll back code, database migrations, and living maps without data loss.
