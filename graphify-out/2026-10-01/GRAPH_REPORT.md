# Graph Report - Learnova  (2026-09-07)

## Corpus Check
- 70 files · ~1,788,811 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 350 nodes · 358 edges · 50 communities (33 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `635c03fd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.jsx
- dependencies
- What You Must Do When Invoked
- devDependencies
- What You Must Do When Invoked
- /graphify
- package.json
- graphify reference: extra exports and benchmark
- graphify reference: extra exports and benchmark
- My Learning.jsx
- Preferences.jsx
- Payment.jsx
- graphify reference: query, path, explain
- graphify reference: query, path, explain
- Course_start.jsx
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- React + Vite
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- AGENTS.md
- graphify.md
- graphify.md
- CLAUDE.md
- CLAUDE.md
- extraction-spec.md
- extraction-spec.md
- FAQ.jsx
- i18n.js
- Communication.jsx
- Payment_pay.jsx
- Security.jsx
- Save.jsx
- Header.jsx
- LandingPage.jsx
- Footer.jsx
- Verification_Code.jsx
- Check_email.jsx

## God Nodes (most connected - your core abstractions)
1. `What You Must Do When Invoked` - 12 edges
2. `What You Must Do When Invoked` - 12 edges
3. `/graphify` - 11 edges
4. `/graphify` - 10 edges
5. `🎓 Learnova` - 10 edges
6. `graphify reference: extra exports and benchmark` - 8 edges
7. `graphify reference: extra exports and benchmark` - 8 edges
8. `scripts` - 5 edges
9. `graphify reference: query, path, explain` - 5 edges
10. `graphify reference: query, path, explain` - 5 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (50 total, 17 thin omitted)

### Community 0 - "App.jsx"
Cohesion: 0.12
Nodes (11): App(), AboutUs(), Contact_us(), Course(), Teacher(), Footer(), Home(), ForgotPassword() (+3 more)

### Community 1 - "dependencies"
Cohesion: 0.06
Nodes (33): axios, i18next, leaflet, lucide-react, dependencies, axios, i18next, leaflet (+25 more)

### Community 2 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 3 - "devDependencies"
Cohesion: 0.11
Nodes (19): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+11 more)

### Community 4 - "What You Must Do When Invoked"
Cohesion: 0.07
Nodes (26): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+18 more)

### Community 5 - "/graphify"
Cohesion: 0.09
Nodes (21): bcryptjs, cors, dotenv, express, mongoose, author, dependencies, bcryptjs (+13 more)

### Community 6 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 7 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 8 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 9 - "My Learning.jsx"
Cohesion: 0.33
Nodes (7): CalendarUI(), createTaskId(), DAYS_OF_WEEK_SHORT, DEFAULT_TASKS_BY_DAY, loadTasksFromStorage(), loadVisitsFromStorage(), MyLearning()

### Community 11 - "Payment.jsx"
Cohesion: 0.32
Nodes (3): detectBrand(), Payment(), sortByDefault()

### Community 12 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 13 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 14 - "Course_start.jsx"
Cohesion: 0.50
Nodes (4): Course_start(), courseData, formatTime(), lessonIcons

### Community 15 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 16 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 17 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 18 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 19 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 20 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 21 - "React + Vite"
Cohesion: 0.12
Nodes (16): 1. Clone the repository, 2. Navigate to the project directory, 3. Install dependencies, 4. Start the development server, 🤝 Contributing, Frontend, 🔮 Future Improvements, 🚀 How to Run Locally (+8 more)

### Community 39 - "FAQ.jsx"
Cohesion: 0.40
Nodes (3): CATEGORIES, FAQ(), FAQ_DATA

### Community 40 - "i18n.js"
Cohesion: 0.17
Nodes (6): Explore(), Notification(), Privacy(), Profile(), generateTOTPSecret(), Security()

### Community 41 - "Communication.jsx"
Cohesion: 0.50
Nodes (3): Communication(), initialConversations, messagesList

### Community 42 - "Payment_pay.jsx"
Cohesion: 0.50
Nodes (3): levelColors, Payment_pay(), thumbColors

### Community 43 - "Security.jsx"
Cohesion: 0.18
Nodes (9): app, authRoutes, cors, express, mongoose, bcrypt, express, router (+1 more)

### Community 48 - "Verification_Code.jsx"
Cohesion: 0.50
Nodes (3): mongoose, { PhoneNumber }, userSchema

## Knowledge Gaps
- **172 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+167 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _172 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12318840579710146 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `What You Must Do When Invoked` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._