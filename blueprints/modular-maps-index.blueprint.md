# {{PROJECT_NAME}} — Master Modular System Maps (Topological Atlas)

This directory (`maps/`) indexes all pages, routes, components, and service bridges for {{PROJECT_NAME}} in modular slices (<3 KB each).

Per `{{PROJECT_CODE_NAME}}` conventions, modular documentation slices prevent documentation rot and ensure fast, targeted updates.
---

## 1. Modular Map Directory Tree

```
maps/
├── README.md                                  ← This Master Atlas Index & Top-Level Architecture
│
├── 01-client-surfaces/                        ← 1. Client and User-Facing Interfaces
│   {{CLIENT_MAP_FILES_LIST}}
│
├── 02-admin-surfaces/                         ← 2. Admin, Operator and Staff Consoles
│   {{ADMIN_MAP_FILES_LIST}}
│
├── 03-backend-apis/                           ← 3. Backend Endpoints and Mutation Flows
│   {{API_MAP_FILES_LIST}}
│
└── 04-bridges-and-events/                     ← 4. Integrations, Webhooks and Event Handlers
    {{BRIDGES_MAP_FILES_LIST}}
```

---

## 2. System Architecture Diagram

```mermaid
graph TD
    {{SYSTEM_TOPOLOGY_MERMAID}}
```

---

## 3. Living Synchronization Mandate

* When a client button or card changes: update the corresponding `01-client-surfaces/` slice.
* When an admin view changes: update the corresponding `02-admin-surfaces/` slice.
* When an API or backend service changes: update the corresponding `03-backend-apis/` slice.

This maintains all files at `<3 KB (~500 tokens)`, cuts token usage by 90%, and keeps documentation perpetually synchronized with code.
