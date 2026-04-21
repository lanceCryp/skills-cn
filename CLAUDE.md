# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`skills-cn` is the CLI for the open agent skills ecosystem. It manages reusable skill definitions (in `SKILL.md` files) that extend coding agents' capabilities. Supports 46+ agents including Claude Code, Cursor, Codex, OpenCode, and more.

This is a China mainland-accelerated fork of `vercel-labs/skills`, using `kkgithub.com` and `gh-proxy.org` proxies to solve GitHub access issues.

## Commands

```bash
pnpm install           # Install dependencies
pnpm build             # Build (runs generate-licenses + obuild)
pnpm dev add <pkg>     # Test CLI locally (e.g., pnpm dev add vercel-labs/agent-skills --list)
pnpm dev check         # Check for skill updates
pnpm dev update        # Update all installed skills
pnpm dev init [name]   # Create new SKILL.md template
pnpm test              # Run all tests
pnpm test <file>       # Run specific test file(s)
pnpm type-check        # TypeScript check
pnpm format            # Format code with prettier
pnpm format:check      # Check formatting without fixing
```

## Architecture

```
src/
├── cli.ts            # Entry point, command routing, init/check/update
├── add.ts            # Core add command logic
├── find.ts           # Find/search command
├── list.ts           # List installed skills
├── remove.ts         # Remove command
├── agents.ts         # Agent definitions and detection (46+ agents)
├── installer.ts      # Installation logic (symlink/copy), listInstalledSkills
├── skills.ts         # Skill discovery and SKILL.md parsing
├── skill-lock.ts     # Global lock file (~/.agents/.skill-lock.json)
├── local-lock.ts     # Local lock file (skills-lock.json, committed)
├── sync.ts           # Experimental sync - crawl node_modules for skills
├── source-parser.ts  # Parse git URLs, GitHub shorthand, local paths
├── git.ts            # Git clone operations
├── blob.ts           # GitHub blob/content fetching with proxy support
├── telemetry.ts      # Anonymous usage tracking (disabled in CI)
├── plugin-manifest.ts # Plugin manifest discovery (.claude-plugin/)
├── constants.ts      # GitHub proxy URLs (kkgithub.com, gh-proxy.org)
├── providers/        # Remote skill providers
│   ├── registry.ts   # Registry provider
│   ├── huggingface.ts
│   ├── mintlify.ts
│   └── wellknown.ts
└── prompts/          # Interactive prompt helpers
```

## Key Systems

**GitHub Proxy**: All GitHub URLs are routed through proxy for China mainland acceleration:
- `https://github.com/` → `https://kkgithub.com/` (git clone)
- `https://raw.githubusercontent.com/` → `https://gh-proxy.org/https://raw.githubusercontent.com/` (raw content)
- `https://api.github.com/` → `https://gh-proxy.org/https://api.github.com/` (API)

Override with environment variables: `GITHUB_PROXY_URL`, `GITHUB_RAW_PROXY_URL`, `GITHUB_API_PROXY_URL`

**Skill Discovery**: CLI searches for `SKILL.md` files in `skills/`, `.agents/skills/`, and agent-specific directories. SKILL.md requires YAML frontmatter with `name` and `description`.

**Lock Files**: Two lock files track installations:
- `skills-lock.json` (local, committed) - project-level installs
- `~/.agents/.skill-lock.json` (global) - global installs with `skillFolderHash` for update checking

**Update Checking** (`skills-cn check/update`): Uses local CLI entry point to avoid updating to upstream `skills`. Compares folder tree SHA against lock file hash.

**Installation**: Supports symlink (default, recommended) or copy. Skills are installed to agent-specific paths (e.g., `.claude/skills/` for Claude Code).

## Code Style

Prettier is used for formatting. **Run `pnpm format` before committing.** CI will fail on formatting issues.

## Adding a New Agent

1. Add agent definition to `src/agents.ts`
2. Run `pnpm run -C scripts validate-agents.ts` to validate
3. Run `pnpm run -C scripts sync-agents.ts` to update README.md and package.json keywords
