# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | /home/omar/.claude/skills/branch-pr/SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | /home/omar/.claude/skills/go-testing/SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | /home/omar/.claude/skills/issue-creation/SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | /home/omar/.claude/skills/judgment-day/SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI. | skill-creator | /home/omar/.claude/skills/skill-creator/SKILL.md |
| When writing, reviewing, or refactoring React/Next.js code; tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements. | vercel-react-best-practices | /home/omar/.claude/skills/vercel-react-best-practices/SKILL.md |
| When asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices". | web-design-guidelines | /home/omar/.claude/skills/web-design-guidelines/SKILL.md |
| When adding page transitions, animating route changes, shared element animations, enter/exit of components, list reorder, or directional navigation animations in React/Next.js. | vercel-react-view-transitions | /home/omar/.claude/skills/vercel-react-view-transitions/SKILL.md |
| When building web components, pages, landing pages, dashboards, React components, HTML/CSS layouts, or styling/beautifying any web UI. | frontend-design | /home/omar/.claude/skills/frontend-design/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue (`Closes #N`) and the issue must have `status:approved` label.
- Branch names MUST match `type/description` regex format (e.g., `feat/user-login`).
- PR Body MUST use template `Closes #N`, check ONE PR Type, provide Summary, Changes Table, and Checklist.
- Add exactly ONE `type:*` label to the PR matching the PR template selection.
- Commit messages MUST follow conventional commits: `type(scope): description`.

### go-testing
- Follow standard Go testing practices.
- Use `teatest` when writing tests for Bubbletea TUIs.

### issue-creation
- Blank issues are disabled; MUST use `bug_report.yml` or `feature_request.yml` templates.
- Ensure Pre-flight Checks (no duplicates, workflow understood) and all required fields are filled.
- Issues automatically get `status:needs-review` on creation.
- A maintainer MUST add `status:approved` before any PR can be opened.
- Questions should go to Discussions, not issues.

### judgment-day
- Review using Parallel Blind Review: launch TWO sub-agents async to review same target independently.
- ALWAYS inject matching project Skill Registry compact rules into BOTH Judge prompts and Fix Agent prompt.
- Orchestrator synthesizes findings as Confirmed, Suspect, or Contradiction.
- WARNINGs must be classified as real (fix required) or theoretical (report as INFO only).
- Delegate Fix Agent for confirmed CRITICALs or real WARNINGs, then launch both judges parallel for re-judgment.
- Ask user to continue if issues remain after 2 iterations.
- NEVER run `git push`, commit, or conclude task until Judgment Day is completely `APPROVED` or `ESCALATED`.

### skill-creator
- Create skills only for repeated patterns or specific workflows, not for trivial instances or generic docs.
- Put skill files in `skills/{skill-name}/SKILL.md` using the exact Frontmatter requirements (name, description with Trigger, Apache-2.0 license, semantic versioning).
- Use `assets/` for templates and schemas, and `references/` to link to LOCAL documentation.
- Do NOT include long explanations; focus on `Critical Patterns`, minimal `Code Examples`, and `Commands` section.
- Register new skills by adding them to `AGENTS.md`.

### vercel-react-best-practices
- Use Server Components by default; add `'use client'` only when the component uses browser APIs or hooks.
- Parallelize independent async operations with `Promise.all()` — sequential awaits create waterfalls.
- Import directly from module paths, never from barrel files (`index.ts`) — prevents large bundle chunks.
- Use `next/dynamic` for heavy components (editors, charts, maps) that are not needed on first paint.
- Use `React.cache()` for per-request deduplication in RSC; LRU cache for cross-request caching.
- Avoid defining components inside other components — extract to module level to prevent remount on re-render.
- Use `startTransition` / `useTransition` for non-urgent state updates to keep the UI responsive.

### web-design-guidelines
- Fetch latest rules from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` before every review.
- Output all findings in `file:line` format as specified in the fetched guidelines.

### vercel-react-view-transitions
- Import `ViewTransition` from `'react'` — available in Next.js App Router out of the box, no canary install needed.
- Always set `default="none"` and explicitly enable only the desired triggers (`enter`, `exit`, `share`).
- Only `startTransition`, `useDeferredValue`, or `Suspense` activate VTs — regular `setState` does NOT animate.
- Tag navigations with `addTransitionType('nav-forward')` / `addTransitionType('nav-back')` for directional slides.
- `<ViewTransition>` enter/exit only fires if it appears BEFORE any DOM wrapper nodes around it.
- Use unique names per item (`photo-${id}`) — two VTs with the same name must never be mounted simultaneously.
- Directional slides only for hierarchical navigation (list→detail); lateral/tab navigation uses fade or `default="none"`.

### frontend-design
- Commit to a bold, specific aesthetic direction before writing code — brutally minimal, editorial, luxury, brutalist, etc.
- Avoid generic fonts (Inter, Roboto, Arial, Space Grotesk) and purple-gradient-on-white clichés.
- Use CSS variables for the full color system; dominant colors + sharp accents over evenly-distributed palettes.
- Add depth via grain overlays, gradient meshes, noise textures, layered transparencies, dramatic shadows.
- Prioritize one well-orchestrated page-load sequence (staggered `animation-delay`) over scattered micro-interactions.
- Use Motion library for React animations; CSS-only for plain HTML artifacts.
- Match implementation complexity to the aesthetic — elegance in minimalism, elaborate effects in maximalism.

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| CLAUDE.md | /mnt/d/tempo/claudecode/lenateacher/CLAUDE.md | Stack, rules, palette, i18n, image list |

Read the convention files listed above for project-specific patterns and rules. All referenced paths have been extracted — no need to read index files to discover more.
