# Rule: Cache Topology & Invalidation Matrix

**Category:** `03-owner-preferences-and-invariants`  
**Purpose:** Prevent stale state, race conditions, and cache poisoning across distributed tiers.

---

## 1. Cache Storage Tiers & Key Topology

| Tier / Layer | Technology | Key Pattern | Default TTL | Serialization Format |
|---|---|---|---|---|
| `{{CACHE_LAYER_1}}` | `{{CACHE_TECH_1}}` | `{{KEY_PATTERN_1}}` | `{{TTL_1}}` | `{{FORMAT_1}}` |
| `{{CACHE_LAYER_2}}` | `{{CACHE_TECH_2}}` | `{{KEY_PATTERN_2}}` | `{{TTL_2}}` | `{{FORMAT_2}}` |

---

## 2. Mutation-Triggered Invalidation Matrix

Whenever a database mutation occurs, the corresponding cache keys MUST be purged or updated in the exact same transaction or lifecycle hook:

| Mutated Entity / DB Action | Invalidation Trigger Hook | Target Cache Key(s) to Invalidate | Invalidation Strategy |
|---|---|---|---|
| `{{MUTATION_ACTION_1}}` | `{{TRIGGER_HOOK_1}}` | `{{CACHE_KEY_1}}` | Immediate Purge (`DEL`) |
| `{{MUTATION_ACTION_2}}` | `{{TRIGGER_HOOK_2}}` | `{{CACHE_KEY_2}}` | Re-fetch & Write (`SETEX`) |

---

## 3. Cache Invariants & Safety Guardrails

1. **Stampede Prevention:** High-traffic read keys MUST use mutex locking, stale-while-revalidate, or probabilistic early expiration.
2. **Environment Separation:** Local development and test environments MUST use prefixed or isolated database indexes (`CACHE_PREFIX={{ENV_CACHE_PREFIX}}`) to prevent cross-contamination.
3. **No Sensitive PII in Plaintext Cache:** Cached tokens or session payloads MUST be signed or encrypted at rest.
