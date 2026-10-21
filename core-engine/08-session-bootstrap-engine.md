# Pipeline 08: The Zero-Session Fast Bootloader
*(Zero-Session Context Recovery Engine)*

**Directory:** `SpecOS/core-engine/08-session-bootstrap-engine.md`  
**Input:** Fresh AI session with zero prior conversation history  
**Output:** 100% Context Recovery in <2,000 Tokens

---

## 1. The Problem: AI Context Amnesia

In AI development workflows, users frequently start new chat sessions or clear the context window. When a fresh AI model enters a repository and attempts to scan hundreds of source files:
* It wastes 50,000+ tokens on initial exploration,
* It clutters its context window with implementation details,
* It risks misinterpreting active architectural rules.

This engine injects a **2-step rapid bootloader protocol** into `ex_specos`:

---

## 2. The 2-Step Fast Bootloader Protocol

```mermaid
sequenceDiagram
    autonumber
    actor User as User (Opens Fresh AI Session)
    participant AI as Fresh AI Model (Zero Memory)
    participant Anchor as AGENTS.md (<1,500 tokens)
    participant Handoff as docs/handoff/WHERE_WE_LEFT_OFF.md (<500 tokens)

    User->>AI: "Build next feature" or "Fix bug X"
    Note over AI: Step 1: Root AGENTS.md is automatically parsed
    AI->>Anchor: Reads architecture, role boundaries & Sibling Matrix (~1,500 tokens)
    Note over AI: Step 2: Reads WHERE_WE_LEFT_OFF.md
    AI->>Handoff: Reads current commit, active branch & immediate next tasks (~500 tokens)
    Note over AI: TOTAL: Full project awareness recovered in <2,000 tokens!
    AI-->>User: Begins task immediately with senior-level accuracy
```

1. **Step 1: Root Invariants Anchor (`AGENTS.md`):**  
   The AI ingests the multi-tier architecture, role boundaries, sibling matrix, and output contract in a single read (~1,500 tokens).
2. **Step 2: Living State Anchor (`WHERE_WE_LEFT_OFF.md`):**  
   The latest commit, verified test gates, active branch, and immediate next actions (~500 tokens).
3. **Result:** Fast project awareness in <2,000 tokens, eliminating exploratory file scanning overhead.
