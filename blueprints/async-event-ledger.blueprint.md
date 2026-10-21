# Contract: Asynchronous Event & Message Queue Ledger

**Category:** `01-contracts-and-schemas`  
**Purpose:** Define message schemas, queue topics, idempotency keys, and dead-letter queue (DLQ) policies for background workers and webhooks.

---

## 1. Queue & Topic Catalog

| Topic / Queue Name | Broker (Redis/RabbitMQ/Kafka/SQS) | Producing Service | Consuming Worker(s) | Max Concurrency |
|---|---|---|---|---|
| `{{QUEUE_TOPIC_1}}` | `{{QUEUE_BROKER_1}}` | `{{PRODUCER_SERVICE_1}}` | `{{CONSUMER_WORKER_1}}` | `{{CONCURRENCY_1}}` |
| `{{QUEUE_TOPIC_2}}` | `{{QUEUE_BROKER_2}}` | `{{PRODUCER_SERVICE_2}}` | `{{CONSUMER_WORKER_2}}` | `{{CONCURRENCY_2}}` |

---

## 2. Event Payload Schemas & Idempotency Rules

| Event Name | Idempotency Key Formula | Retry Policy | Dead Letter Queue (DLQ) |
|---|---|---|---|
| `{{EVENT_NAME_1}}` | `{{IDEMPOTENCY_KEY_1}}` | 3 retries (exponential backoff) | `{{DLQ_TOPIC_1}}` |
| `{{EVENT_NAME_2}}` | `{{IDEMPOTENCY_KEY_2}}` | 5 retries (fixed interval) | `{{DLQ_TOPIC_2}}` |

### Event Payload Contract Template: `{{EVENT_NAME_1}}`
```json
{
  "event_id": "uuid-v4",
  "timestamp": "ISO-8601 UTC",
  "topic": "{{QUEUE_TOPIC_1}}",
  "producer": "{{PRODUCER_SERVICE_1}}",
  "data": {
    "entity_id": "string",
    "mutation_type": "CREATED | UPDATED | DELETED",
    "payload": {}
  }
}
```

---

## 3. Idempotency & Poison Pill Defense

1. **Duplicate Protection:** Consumers MUST check the idempotency key against cache or a processed_events table before mutating state.
2. **Dead Letter Queue Routing:** Poison-pill payloads failing after max retries MUST route to DLQ with full error stack and trigger alert.
