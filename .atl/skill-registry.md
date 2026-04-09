# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | C:\Users\omarp_v5mqor0\.claude\skills\branch-pr\SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | C:\Users\omarp_v5mqor0\.claude\skills\go-testing\SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | C:\Users\omarp_v5mqor0\.claude\skills\issue-creation\SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | C:\Users\omarp_v5mqor0\.claude\skills\judgment-day\SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | C:\Users\omarp_v5mqor0\.claude\skills\skill-creator\SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue — no exceptions
- Every PR MUST have exactly one `type:*` label
- Automated checks must pass before merge is possible
- Blank PRs without issue linkage will be blocked by GitHub Actions
- Branch name must follow convention matching the linked issue

### go-testing
- Use table-driven tests with `t.Run` for multiple test cases
- Use testify for assertions when available
- Bubbletea TUI: use `teatest.NewTestModel` for component testing
- Golden files: store expected outputs under `testdata/` directory
- Never mock the database — integration tests hit real DB

### issue-creation
- MUST use a template (bug report or feature request) — blank issues are disabled
- Every issue gets `status:needs-review` automatically on creation
- A maintainer MUST add `status:approved` before any PR can be opened
- Questions go to Discussions, not issues

### skill-creator
- Use when user asks to create/add a new skill or document an AI pattern
- Skills go in `~/.claude/skills/{name}/SKILL.md` with YAML frontmatter
- Always include: name, description, trigger, allowed-tools in frontmatter
- After creating, update the skill registry

### judgment-day
- Launch TWO independent blind judge sub-agents simultaneously — they must not see each other's reviews
- Synthesize findings, apply fixes, then re-judge until both pass
- Escalate to user after 2 failed iterations — do not loop indefinitely
- Both judges must independently pass before marking review complete
- Resolve skills from registry BEFORE launching judges

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| CLAUDE.md | D:\tempo\claudecode\lenateacher\CLAUDE.md | Project-level conventions, stack, rules, color palette, i18n config |
