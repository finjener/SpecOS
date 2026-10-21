# SpecOS

**Architecture rules and living maps to keep AI coding assistants from breaking your codebase.**

---

## What is SpecOS?

If you build real software with AI tools (like Claude Code, Cursor, Windsurf, or ChatGPT), you probably noticed this pattern:

* **Day 1:** It feels like magic. The AI writes clean components and moves fast.
* **Day 3:** It starts forgetting earlier decisions. It hallucinates database columns that do not exist.
* **Day 5:** It updates the customer checkout page and quietly breaks the admin dashboard. Or it writes shiny UI buttons before the database migration or API endpoints even exist.

**SpecOS solves this.**

SpecOS is an architecture engine and a set of rules for your project. You give it your project plan or product requirements (PRD), and it generates an active ruleset inside your repository (called `<project>_specos`, for example `myapp_specos`).

This folder contains:
1. **Modular Architecture Maps:** Small, focused markdown files describing each part of your system.
2. **Sibling Dependency Matrix:** Tells the AI: *"If you change File A, you must also update companion File B."*
3. **Contracts & Recipes:** Compact database schemas, API specs, and coding patterns.
4. **Verification Tool:** A zero-dependency script (`node tools/verify-specos.mjs`) to test links, file sizes, and consistency.

Once created, your AI assistant reads these rules on every task. It cannot guess, it cannot work in reverse order, and it cannot silently break other parts of your app.

---

## When Should You Use SpecOS? (Project Scale Fit)

SpecOS is powerful, but you do not need it for every project. Here is an honest breakdown of when to use it:

### ❌ Do NOT use it for:
* **Single-page landing sites or blogs:** There are not enough moving parts. SpecOS will just add unnecessary files.
* **Weekend prototypes and quick scripts:** If you plan to throw the code away on Monday, do not spend time scaffolding architecture rules.
* **Small apps with 2–3 files:** Just let your AI write code directly.

### ✅ Sweet Spot (Highly Recommended):
* **SaaS products and multi-role web apps:** Any app with different user types (for example: Customers, Admins, Support, Managers). SpecOS makes sure changes for one role never break another role.
* **Full-stack apps:** Apps with a real SQL/NoSQL database, backend APIs, background jobs, and frontend screens (10+ views or 15+ endpoints).
* **Growing codebases:** Projects where you work across multiple days or weeks with AI, and you are tired of repeating context in every chat session.
* **Team or multi-agent projects:** When different developers or subagents touch different parts of the same repository.

### 🏢 Large / Enterprise Projects:
* For large systems (20+ pages, 30+ services), SpecOS includes a **3-stage checkpoint mode** (`core-engine/13-multi-stage-orchestrator.md`). This splits the setup into three smaller steps so the AI never hits token limits or cuts off files halfway.

---

## How It Works (The Core Ideas)

SpecOS is built around 5 practical principles:

### 1. Tiny Modular Maps (<3 KB each)
Most teams put their entire architecture in one giant 50 KB document. When the AI reads it, it wastes 15,000+ tokens before writing a single line of code.
SpecOS breaks your system into tiny slices under `maps/`. When the AI works on payments, it only loads the payment map slice (~700 tokens).

### 2. Sibling Dependency Matrix
In web apps, backend and frontend changes belong together. If an AI adds a `"phone_number"` field to the User model, it must also update the User Profile UI and the Admin User table.
SpecOS derives a `sibling-pairs-matrix.md` file. Before the AI touches a file, it checks the matrix and updates all companion files in the same pull request.

### 3. Strict Bottom-Up Build Order (7 Steps)
AI assistants love to write UI first because it is easy. Then you end up with mock data, missing APIs, and runtime errors.
SpecOS enforces a strict order:
$$\text{Database Migration} \longrightarrow \text{API Route} \longrightarrow \text{Automated Tests} \longrightarrow \text{Client Bridge} \longrightarrow \text{Primary UI} \longrightarrow \text{Sibling Views} \longrightarrow \text{Smoke Run}$$

### 4. Fast Session Boot (<2,000 tokens)
Every time you open a fresh chat or reset context, the AI has total amnesia. Instead of making it read 100 source files, SpecOS sets up:
* `AGENTS.md` (System rules and boundaries, ~1,500 tokens)
* `WHERE_WE_LEFT_OFF.md` (Current branch, last commit, next tasks, ~500 tokens)

The AI gets up to speed in seconds using less than 2,000 tokens.

### 5. Destructive Action Shield
Blocks dangerous actions like raw `DROP TABLE`, `rm -rf`, hard deletes without soft-delete flags, or committing plain-text secrets into git.

---

## How to Use SpecOS (Step-by-Step)

### Step 1: Put SpecOS in your workspace
Place the `SpecOS/` folder inside your repository or project workspace container.

### Step 2: Prepare your architecture plan
Write down what you want to build in a file (e.g. `PLAN.md` or PRD). It should describe:
* What the app does.
* Who the users are (personas/roles).
* Your tech stack (e.g., PostgreSQL, Node.js, React).
* The main pages and endpoints.

### Step 3: Run the initialization protocol
Paste this prompt into your AI coding tool (Claude Code, Cursor, Windsurf, or web chat):

```text
Read the technical specification in PLAN.md. 
Execute SpecOS/PROTOCOL.md and scaffold the architecture rules and maps for this project.
```

> **Tip:** If you do not want the AI to pause and ask you questions about minor setup details, add `--assume-defaults`:
> ```text
> Execute SpecOS/PROTOCOL.md with --assume-defaults to adopt production standards for any omitted decisions.
> ```

The AI will parse your plan and generate your project's ruleset (`AGENTS.md`, `maps/`, `rules/`, `tools/`).

### Step 4: Verify the setup
Open your terminal and run the built-in checker:

```bash
node tools/verify-specos.mjs all
```

This verifies that:
* No markdown links are broken.
* Every map slice stays under the 3 KB limit.
* No unfinished `{{...}}` template tags were left behind.
* All sibling pairs are valid.

### Step 5: Start building features
Once verification passes, run `CUTOVER.md`:

```text
The architecture scaffolding is approved. Transition to active construction and begin Milestone 1.
```

Your AI assistant will now build features one by one, following the strict 7-step dependency sequence and keeping maps updated as it writes code.

---

## Daily Workflow Protocols

After the initial setup, you use these 4 short protocols during everyday development:

| Protocol | When to use it | What it does |
|---|---|---|
| [`RE-TRIGGER.md`](RE-TRIGGER.md) | Requirements changed or new feature added | Adds new maps and contracts without touching your existing code. |
| [`REVERSE-SYNC.md`](REVERSE-SYNC.md) | A human developer wrote code directly or merged a PR | Updates maps and contracts to match what was written in code. |
| [`DEPRECATE.md`](DEPRECATE.md) | Removing an old feature or retiring an endpoint | Safely deletes code and cleans up dead links across maps. |
| [`CUTOVER.md`](CUTOVER.md) | Scaffolding complete | Transitions the repository from planning to active feature construction. |

---

## Zero Runtime Dependency

SpecOS adds **zero external npm packages, zero libraries, and zero runtime overhead** to your application:
* The generated rules are standard Markdown (`.md`) files.
* The verification tool (`verify-specos.mjs`) uses only built-in Node.js modules (`fs`, `path`, `child_process`).
* Once scaffolding is finished, you can even move the original `SpecOS/` generator folder out of your git repository completely (see [`docs/clean-extraction-guide.md`](docs/clean-extraction-guide.md)). Your project rules will continue to work on their own.

---

## Repository Structure

```
SpecOS/
├── PROTOCOL.md              ← Main scaffolding protocol (Interactive & Autonomous)
├── RE-TRIGGER.md            ← Non-destructive updates for changed requirements
├── REVERSE-SYNC.md          ← Syncs maps when code changes directly
├── DEPRECATE.md             ← Safe endpoint and feature retirement
├── CUTOVER.md               ← Handoff protocol to start Milestone 1
│
├── core-engine/             ← 17 step-by-step pipeline instructions for the AI
│   ├── 00-blueprint-synthesizer.md     ← Fills template variables
│   ├── 01-plan-deconstructor.md        ← Parses requirements into 8 dimensions
│   ├── 01b-plan-completeness-gate.md   ← Catches missing architecture choices
│   ├── 02-sibling-matrix-deriver.md    ← Maps dependencies between files
│   ├── 03-modular-map-scaffolder.md    ← Builds <3 KB architecture slices
│   ├── 07-destructive-action-shield.md ← Blocks dangerous shell & DB commands
│   ├── 08-session-bootstrap-engine.md  ← Context recovery in <2,000 tokens
│   ├── 09-dependency-sequencer.md      ← Enforces DB -> API -> UI order
│   └── ...                             ← Concurrency, brownfield, and integrity engines
│
├── blueprints/              ← 22 starter templates for maps, rules, and contracts
├── tools/
│   └── verify-specos.mjs    ← Built-in zero-dependency architecture checker
├── skills/
│   └── skill-specos/        ← Standard agent skill definition (SKILL.md)
└── docs/
    ├── how-to-use-and-integrate.md ← Integration guide (Skills, Prompts, IDEs)
    └── clean-extraction-guide.md   ← How to archive SpecOS post-scaffold
```

---

## Requirements

* **Node.js** (v18+ recommended) to run `node tools/verify-specos.mjs`.
* **Any AI Assistant** (Claude Code, Cursor, Windsurf, Roo Code, ChatGPT, or similar).

---

## License

This project is licensed under the [MIT License](LICENSE).
