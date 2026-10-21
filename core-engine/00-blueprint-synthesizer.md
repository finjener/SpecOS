# Pipeline 00: The Master Blueprint Synthesizer & Variable Binder
*(Template Synthesizer and Placeholder Resolution Engine)*

**Directory:** `SpecOS/core-engine/00-blueprint-synthesizer.md`  
**Input:** 6-Dimensional system identity summary from `01-plan-deconstructor.md` + 16 universal templates from `blueprints/`  
**Output:** Concrete project files populated with domain data, with zero unresolved `{{...}}` placeholders

---

## 1. Exhaustive Variable Binding Map

This engine binds deconstructed plan data to every template placeholder with surgical precision across 6 structural groups:

### Group A: Root & System Identity Variables
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{PROJECT_CODE_NAME}}` | User / 01-plan | Unique system code name | `ex_specos`, `saas_specos` |
| `{{PROJECT_NAME}}` | 01-plan-deconstructor | Official project title | `Acme SaaS`, `Logistics Engine` |
| `{{PROJECT_DESCRIPTION_AND_TIERS}}` | 01-plan-deconstructor | Multi-tier architecture overview | `1. Web SPA (React)... 2. API (FastAPI)...` |
| `{{PROJECT_OWNER_INVARIANTS}}` | 01-plan-deconstructor | Immutable owner preferences & rules | Role gates, payment rules, DB constraints |
| `{{PROJECT_VERIFICATION_COMMANDS}}` | 01-plan-deconstructor | Build, typecheck, and test commands | `npm run build`, `pytest`, `cargo test` |
| `{{PROJECT_QUALITY_GATE_SUMMARY}}` | 01-plan-deconstructor | Quality gate summary string | `build, contract, lint, test pass` |
| `{{ACTIVE_GIT_BRANCH}}` | Environment detection | Target repo active git branch | `main`, `master`, `feature/mvp` |
| `{{INITIAL_COMMIT_HASH}}` | Environment detection | Latest git commit hash | `a1b2c3d` or `initial-scaffold` |

### Group B: Modular Maps Index Variables (`maps/README.md`)
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{SYSTEM_TOPOLOGY_MERMAID}}` | 01 & 03-modular-map | Top-level Mermaid system diagram | `graph TD; Client --> API; ...` |
| `{{CLIENT_MAP_FILES_LIST}}` | 03-modular-map | Directory tree list of client maps | `├── user-dashboard.md ...` |
| `{{ADMIN_MAP_FILES_LIST}}` | 03-modular-map | Directory tree list of admin maps | `├── admin-console.md ...` |
| `{{API_MAP_FILES_LIST}}` | 03-modular-map | Directory tree list of backend maps | `├── orders-api.md ...` |
| `{{BRIDGES_MAP_FILES_LIST}}` | 03-modular-map | Directory tree list of bridge maps | `├── stripe-webhook.md ...` |

### Group C: Modular Map Slice Variables (`maps/**/*.md`)
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{MODULE_TITLE}}` | 03-modular-map | Human-readable title of the module | `Customer Checkout`, `Driver Dispatch` |
| `{{MODULE_NAME}}` | 03-modular-map | Identifier of the module | `Checkout`, `Dispatch` |
| `{{DOMAIN_FOLDER}}` | 03-modular-map | Parent subfolder name | `01-client-surfaces`, `02-admin-surfaces` |
| `{{FILE_NAME}}` | 03-modular-map | Target markdown file name without extension | `customer-checkout`, `driver-dispatch` |
| `{{TARGET_ROLES}}` | 01-plan-deconstructor | User personas accessing this surface | `customer`, `driver`, `admin` |
| `{{SOURCE_CODE_FILES}}` | 01-plan-deconstructor | Primary source code implementation files | `src/views/Checkout.tsx` |
| `{{SIBLING_MAP_LINKS}}` | 02-sibling-matrix | Relative markdown links to companion maps | `[Admin View](../02-admin/orders.md)` |
| `{{MODULE_FLOW_MERMAID}}` | 03-modular-map | Component flow diagram | `graph TD; Cart --> Pay; ...` |
| `{{COMPONENT_INVENTORY_TABLE_ROWS}}`| 03-modular-map | Table rows of frames, buttons & modals | `\| Hero \| Balance \| Add Funds \| Modal \|` |
| `{{ALLOWED_ACTIONS_DESCRIPTION}}` | 01-plan-deconstructor | Description of permitted actions | `View orders, edit shipping address` |
| `{{RESTRICTED_ACTIONS_DESCRIPTION}}`| 01-plan-deconstructor | Description of prohibited actions | `Cannot edit settled prices, cannot refund` |

### Group D: Sibling Pairs Matrix & Scope Tiers Variables
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{SIBLING_MATRIX_ROWS}}` | 02-sibling-matrix-deriver | Derived sibling markdown rows | `\| Cart.tsx \| AdminOrder.tsx \| ... \|` |
| `{{TIER_1_EXAMPLES}}` | 01 & 05-enforcement | Scope Tier 1 examples (cosmetic/local) | `CSS tweaks, typo fixes, label updates` |
| `{{TIER_2_EXAMPLES}}` | 01 & 05-enforcement | Scope Tier 2 examples (features/modals) | `New modal, form field change, API binding` |
| `{{TIER_3_EXAMPLES}}` | 01 & 05-enforcement | Scope Tier 3 examples (core/invariants) | `DB schema migration, auth flow, role change` |

### Group E: Contracts Ledger Variables (`rules/contracts/*.md`)
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{CONTRACT_TITLE}}` | 04-contracts-and-recipes | Title of the contract document | `Orders API Service Catalog` |
| `{{CONTRACT_NAME}}` | 04-contracts-and-recipes | Entity or domain identifier | `Orders API`, `User DB Model` |
| `{{CONTRACT_SLUG}}` | 04-contracts-and-recipes | File slug name | `orders-api-catalog`, `user-db-models` |
| `{{CONTRACT_OBJECTIVE}}` | 04-contracts-and-recipes | Summary purpose of contract | `Compact schema reference for orders API` |
| `{{CONTRACT_TABLE_ROWS}}` | 04-contracts-and-recipes | Endpoint / entity specification rows | `\| POST /pay \| cart_id \| status: ok \|` |
| `{{CONTRACT_LIFECYCLE_RULES}}` | 01-plan-deconstructor | State transitions and immutability rules | `Settled payments cannot be deleted` |

### Group F: Canonical Recipe Variables (`rules/recipes/*.md`)
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{RECIPE_TITLE}}` | 04-contracts-and-recipes | Recipe document title | `Adding a New Payment Endpoint` |
| `{{RECIPE_NAME}}` | 04-contracts-and-recipes | Operation name | `Payment Endpoint`, `Modal Dialog` |
| `{{RECIPE_SLUG}}` | 04-contracts-and-recipes | File slug name | `add-payment-endpoint`, `add-new-modal` |
| `{{RECIPE_OBJECTIVE}}` | 04-contracts-and-recipes | Specific goal of the recipe | `Canonical 5-step recipe to add a payment route` |
| `{{RECIPE_FLOW_MERMAID}}` | 04-contracts-and-recipes | Recipe step flowchart | `graph LR; Route --> Validate --> Model` |
| `{{RECIPE_PREREQUISITES}}` | 01 & 04 | Pre-implementation requirements | `DB migration applied, auth middleware wired` |
| `{{RECIPE_CODE_BLOCKS_AND_EXPLANATIONS}}` | 04 | Exact canonical code pattern | `Step 1: Write controller... Step 2: Bind route...` |
| `{{RECIPE_ERROR_HANDLING_AND_SECURITY}}` | 01 & 04 | Security and error boundaries | `Validate CSRF, sanitize inputs, catch 400` |
| `{{RECIPE_TESTING_STEP}}` | 01 & 04 | Concrete test verification command | `Run pytest tests/test_payment.py` |


### Group G: Advanced Architecture, Security & Distributed Variables
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{ENTITY_1}}`, `{{ENTITY_2}}` | 01-plan-deconstructor | Sensitive core resource entities | `Order`, `StudentGrade`, `BillingInvoice` |
| `{{OWNER_FIELD_1}}`, `{{TENANT_FIELD_1}}` | 01-plan-deconstructor | Ownership and tenant isolation fields | `user_id`, `tenant_id`, `school_id` |
| `{{AUTHZ_ENDPOINT_1}}` | 01 & 04 | Endpoint requiring granular authz | `GET /api/v1/students/:id/grades` |
| `{{PUBLIC_FIELDS_LIST}}` | 01-plan-deconstructor | Safe unauthenticated fields | `id, title, avatar_url, public_bio` |
| `{{PII_FIELDS_LIST}}` | 01-plan-deconstructor | Protected personal/financial data | `email, phone, national_id, credit_card` |
| `{{CACHE_LAYER_1}}`, `{{CACHE_TECH_1}}` | 01 & 04 | Cache engine and layer | `L2 Distributed Cache`, `Redis 7.2` |
| `{{KEY_PATTERN_1}}`, `{{TTL_1}}` | 01 & 04 | Cache key prefix and expiration | `user:profile:{id}`, `3600s` |
| `{{QUEUE_TOPIC_1}}`, `{{QUEUE_BROKER_1}}` | 01 & 04 | Message broker and topic name | `order.created`, `RabbitMQ / BullMQ` |
| `{{IDEMPOTENCY_KEY_1}}` | 01 & 04 | Event deduplication formula | `sha256(order_id + event_timestamp)` |
| `{{LINT_COMMAND}}`, `{{UNIT_TEST_COMMAND}}` | 01-plan-deconstructor | Fast test execution commands | `eslint .`, `npm run test:unit` |
| `{{INTEGRATION_TEST_COMMAND}}` | 01-plan-deconstructor | Deep contract/integration test command | `pytest tests/integration/` |

### Group H: Architecture Assumptions Variables (`gaps/assumptions-ledger.md`)
| Placeholder Variable | Source Pipeline | Populated Concrete Data | Example Output |
|---|---|---|---|
| `{{ASSUMPTIONS_TABLE_ROWS}}` | 01b-plan-completeness | Additional assumption rows | `\| ASM-003 \| AuthZ \| Omitted \| Bearer JWT \| Tier 2 \| ... \|` |
| `{{ASSUMPTION_ID_1}}`, `{{ASSUMPTION_ID_2}}` | 01b-plan-completeness | Unique assumption IDs | `ASM-001`, `ASM-002` |
| `{{ASSUMPTION_DOMAIN_1}}` | 01b-plan-completeness | Domain category | `Tenancy`, `Data Retention` |
| `{{ASSUMPTION_STATE_1}}` | 01b-plan-completeness | Specification state | `Omitted`, `Ambiguous` |
| `{{ASSUMPTION_DECISION_1}}` | 01b-plan-completeness | Assumed decision and rationale | `Soft-delete via deleted_at` |
| `{{ASSUMPTION_TIER_1}}` | 01b-plan-completeness | Criticality tier | `Tier 3`, `Tier 2` |
---

## 2. Invariant Rule
* No file may be written to the target project with unparsed or lingering `{{...}}` placeholders. Every recognized blueprint placeholder must be resolved by this synthesizer before disk write.
