# Contract: Granular Authorization & Data Privacy Matrix (AuthZ & BOLA/IDOR Shield)

**Category:** `01-contracts-and-schemas`  
**Purpose:** Enforce field-level access control, object-level ownership boundaries, and data classification invariants.

---

## 1. Object-Level Ownership & Tenant Isolation Rules

Every endpoint mutating or reading state MUST enforce tenant and user ownership checks at the database query level (preventing BOLA / IDOR):

| Entity / Resource | Owner ID Field | Tenant ID Field | Allowed Access Rule | Direct IDOR Prevention Check |
|---|---|---|---|---|
| `{{ENTITY_1}}` | `{{OWNER_FIELD_1}}` | `{{TENANT_FIELD_1}}` | `owner == auth.userId OR role in [admin]` | `WHERE id = :id AND tenant_id = :tenantId` |
| `{{ENTITY_2}}` | `{{OWNER_FIELD_2}}` | `{{TENANT_FIELD_2}}` | `role in [{{ALLOWED_ROLES_2}}]` | `WHERE id = :id AND tenant_id = :tenantId` |

---

## 2. Role-Based Field Access Control (RBAC / ABAC Matrix)

| Endpoint / View | Role / Persona | Permitted Fields (Read) | Permitted Fields (Write) | Strictly Redacted / Hidden Fields |
|---|---|---|---|---|
| `{{AUTHZ_ENDPOINT_1}}` | `{{ROLE_A}}` | `{{ROLE_A_READ_FIELDS}}` | `{{ROLE_A_WRITE_FIELDS}}` | `{{ROLE_A_REDACTED}}` |
| `{{AUTHZ_ENDPOINT_1}}` | `{{ROLE_B}}` | `{{ROLE_B_READ_FIELDS}}` | `{{ROLE_B_WRITE_FIELDS}}` | `{{ROLE_B_REDACTED}}` |

---

## 3. Data Classification & PII / Privacy Protection

* **Public:** `{{PUBLIC_FIELDS_LIST}}`
* **Confidential (Internal Only):** `{{CONFIDENTIAL_FIELDS_LIST}}`
* **Restricted (PII / Financial / KVKK / GDPR):** `{{PII_FIELDS_LIST}}`
  - Invariant: Restricted fields MUST NEVER appear in client-facing logs, error responses, or analytics payloads.
  - Invariant: Soft-deleted user records MUST scrub or mask PII fields within {{PII_RETENTION_DAYS}} days.
