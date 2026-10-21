# Rule: Environment Matrix & Deployment Boundaries

**Category:** `03-owner-preferences-and-invariants`  
**Priority:** High (Environment Integrity & Isolation)

---

## 1. 3-Tier Environment Isolation Matrix

| Environment | Database & Migrations | Services & Integrations | Secrets & Keys |
|---|---|---|---|
| **Local Dev** | Local SQLite / Docker DB. Arbitrary test seed data allowed. | Mock APIs, Mailpit local mail catcher. | Local `.env` (git-ignored). |
| **Staging** | Isolated staging DB. Zero live user PII. | Sandbox API keys (Test payment gateway). | Staging environment variables. |
| **Production** | Live production DB. Hard resets and unmigrated DDL prohibited. | Live payment gateways, verified domain SMTP. | Managed vault / host environment variables. NEVER committed! |

---

## 2. Invariant Rule
* Local mock logic must never leak into production release bundles (`NODE_ENV === 'production'` guards).
