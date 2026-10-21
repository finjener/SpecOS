# Rule: Destructive Action Shield & Disaster Prevention

**Category:** `03-owner-preferences-and-invariants`  
**Priority:** Critical (System & Data Integrity Guard)

---

## 1. Strictly Prohibited Operations (Hard Prohibitions)
1. **Blind Recursive Deletions:** Executing commands like `rm -rf /` or `rm -rf *`.
2. **Unconfirmed Database Purges:** Executing `DROP DATABASE`, `TRUNCATE TABLE`, or unfiltered `DELETE FROM`.
3. **Schema Corruption:** Executing raw DDL against managed production databases without going through the migration engine.
4. **Credential Leakage:** Hardcoding `.env` files, private API keys, or database credentials in source code.

---

## 2. Operations Requiring Explicit User Authorization
* Deleting a database table or permanently purging files requires unambiguous confirmation from the user prompt before execution.
