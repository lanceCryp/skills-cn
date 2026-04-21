# skills-cn

开放 Agent Skills 生态系统的 CLI 工具。

> [!NOTE]
> 本项目是基于 [vercel-labs/skills](https://github.com/vercel-labs/skills) 的中国内地加速版本，针对 GitHub 访问速度进行了优化。

[**English**](./README-en.md) | 中文

<!-- agent-list:start -->
支持 **OpenCode**、**Claude Code**、**Codex**、**Cursor** 等 [41+ 种 Agent](#支持的-agent)。
<!-- agent-list:end -->

## 特性

- 🚀 **GitHub 加速**：使用 kkgithub.com 和 gh-proxy.org 代理，解决中国大陆访问 GitHub 网络问题
- 📦 **一键安装**：支持多种来源格式安装 skills
- 🔄 **自动更新**：check 和 update 命令方便管理已安装的 skills
- 🌐 **多 Agent 支持**：支持 46+ 种主流 Coding Agent

## 为什么创建此项目

### 背景

在中国大陆使用 Coding Agent 时，通过 [skills.sh](https://skills.sh) 安装的 skills 质量普遍较高，但安装过程经常因为 GitHub 网络问题而失败。虽有 [clawhub](https://clawhub.com) 等提供中国加速的平台，但其 skills 质量参差不齐，难以满足日常开发需求。

### 解决方案

本项目保留 [vercel-labs/skills](https://github.com/vercel-labs/skills) 原版的高质量 skills，通过 `kkgithub.com` 和 `gh-proxy.org` 代理实现 GitHub 访问加速，让中国大陆用户也能流畅地安装和使用优质 skills。

### 与原版的区别

| 对比项 | vercel-labs/skills | skills-cn |
| ------ | ----------------- | --------- |
| GitHub 访问 | 直连（国内缓慢/失败） | kkgithub.com + gh-proxy.org 加速 |
| skills 来源 | 官方高质量仓库 | 官方高质量仓库 |
| CLI 命令 | `npx skills` | `npx skills-cn` |
| 维护更新 | Vercel 官方 | 社区维护 |

## 安装 Skills

```bash
npx skills-cn add vercel-labs/agent-skills
```

### 安装来源格式

```bash
# GitHub 简写格式 (owner/repo)
npx skills-cn add vercel-labs/agent-skills

# 完整 GitHub URL
npx skills-cn add https://github.com/vercel-labs/agent-skills

# 指定 repo 中的某个 skill 路径
npx skills-cn add https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines

# GitLab URL
npx skills-cn add https://gitlab.com/org/repo

# 任意 git URL
npx skills-cn add git@github.com:vercel-labs/agent-skills.git

# 本地路径
npx skills-cn add ./my-local-skills
```

### 选项

| 选项                      | 说明                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| `-g, --global`            | 安装到用户目录而非项目目录                                                                       |
| `-a, --agent <agents...>` | <!-- agent-names:start -->安装到指定 Agent（如 `claude-code`、`codex`）。见 [支持的 Agent](#支持的-agent)<!-- agent-names:end --> |
| `-s, --skill <skills...>` | 按名称安装指定 skills（使用 `'*'` 安装所有 skills）                                               |
| `-l, --list`              | 列出可用 skills 而不安装                                                                       |
| `--copy`                  | 复制文件而非符号链接到 Agent 目录                                                              |
| `-y, --yes`               | 跳过所有确认提示                                                                               |
| `--all`                   | 安装所有 skills 到所有 Agent，无需提示                                                          |

### 示例

```bash
# 列出仓库中的所有 skills
npx skills-cn add vercel-labs/agent-skills --list

# 安装指定的 skills
npx skills-cn add vercel-labs/agent-skills --skill frontend-design --skill skill-creator

# 安装名称带空格的 skill（需加引号）
npx skills-cn add owner/repo --skill "Convex Best Practices"

# 安装到指定 Agent
npx skills-cn add vercel-labs/agent-skills -a claude-code -a opencode

# 非交互式安装（适合 CI/CD）
npx skills-cn add vercel-labs/agent-skills --skill frontend-design -g -a claude-code -y

# 从仓库安装所有 skills 到所有 Agent
npx skills-cn add vercel-labs/agent-skills --all

# 安装所有 skills 到指定 Agent
npx skills-cn add vercel-labs/agent-skills --skill '*' -a claude-code

# 安装指定 skills 到所有 Agent
npx skills-cn add vercel-labs/agent-skills --agent '*' --skill frontend-design
```

### 安装范围

| 范围        | 标志      | 位置               | 用途                                   |
| ----------- | --------- | ------------------ | -------------------------------------- |
| **项目级** | （默认）  | `./<agent>/skills/` | 随项目提交，与团队共享                 |
| **全局**  | `-g`      | `~/<agent>/skills/` | 在所有项目中可用                       |

### 安装方式

交互式安装时，可选择：

| 方式                    | 说明                                                                           |
| ---------------------- | ------------------------------------------------------------------------------ |
| **符号链接**（推荐） | 从每个 Agent 链接到 canonical 副本。单一数据源，更新方便                        |
| **复制**               | 为每个 Agent 创建独立副本。用于不支持符号链接的情况                              |

## 其他命令

| 命令                      | 说明                                 |
| ------------------------ | ------------------------------------ |
| `npx skills-cn list`            | 列出已安装的 skills（别名：`ls`）   |
| `npx skills-cn find [query]`    | 交互式或按关键词搜索 skills          |
| `npx skills-cn remove [skills]` | 从 Agent 中移除 skills               |
| `npx skills-cn check`           | 检查可用的 skill 更新                |
| `npx skills-cn update`          | 更新所有已安装的 skills 到最新版本    |
| `npx skills-cn init [name]`     | 创建新的 SKILL.md 模板               |

### `skills list`

列出所有已安装的 skills。类似 `npm ls`。

```bash
# 列出所有已安装的 skills（项目级和全局）
npx skills-cn list

# 仅列出全局 skills
npx skills-cn ls -g

# 按 Agent 过滤
npx skills-cn ls -a claude-code -a cursor
```

### `skills find`

交互式或按关键词搜索 skills。

```bash
# 交互式搜索（fzf 风格）
npx skills-cn find

# 按关键词搜索
npx skills-cn find typescript
```

### `skills check` / `skills update`

```bash
# 检查是否有可用的 skill 更新
npx skills-cn check

# 更新所有 skills 到最新版本
npx skills-cn update
```

### `skills init`

```bash
# 在当前目录创建 SKILL.md
npx skills-cn init

# 在子目录中创建新的 skill
npx skills-cn init my-skill
```

### `skills remove`

从 Agent 中移除 skills。

```bash
# 交互式选择要移除的 skills
npx skills-cn remove

# 按名称移除指定的 skill
npx skills-cn remove web-design-guidelines

# 移除多个 skills
npx skills-cn remove frontend-design web-design-guidelines

# 从全局范围移除
npx skills-cn remove --global web-design-guidelines

# 仅从指定 Agent 移除
npx skills-cn remove --agent claude-code cursor my-skill

# 无需确认移除所有已安装的 skills
npx skills-cn remove --all

# 从特定 Agent 移除所有 skills
npx skills-cn remove --skill '*' -a cursor

# 从所有 Agent 移除特定 skill
npx skills-cn remove my-skill --agent '*'

# 使用 rm 别名
npx skills-cn rm my-skill
```

| 选项          | 说明                                      |
| ------------- | ----------------------------------------- |
| `-g, --global` | 从全局范围（~/.）而非项目移除             |
| `-a, --agent` | 从指定 Agent 移除（使用 `'*'` 表示所有）   |
| `-s, --skill`  | 指定要移除的 skills（使用 `'*'` 表示所有） |
| `-y, --yes`    | 跳过确认提示                              |
| `--all`        | `--skill '*' --agent '*' -y` 的简写       |

## 什么是 Agent Skills？

Agent Skills 是可重用的指令集，用于扩展 Coding Agent 的能力。它们定义在带有 YAML frontmatter 的 `SKILL.md` 文件中，包含 `name` 和 `description`。

Skills 使 Agent 能够执行专业任务，例如：

- 从 git 历史生成发版说明
- 按团队规范创建 PR
- 集成外部工具（Linear、Notion 等）

在 **[skills.sh](https://skills.sh)** 发现更多 Skills。

## 支持的 Agent

Skills 可以安装到以下任意 Agent：

<!-- supported-agents:start -->
| Agent | `--agent` | 项目路径 | 全局路径 |
|-------|-----------|----------|----------|
| Amp, Kimi Code CLI, Replit, Universal | `amp`, `kimi-cli`, `replit`, `universal` | `.agents/skills/` | `~/.config/agents/skills/` |
| Antigravity | `antigravity` | `.agents/skills/` | `~/.gemini/antigravity/skills/` |
| Augment | `augment` | `.augment/skills/` | `~/.augment/skills/` |
| IBM Bob | `bob` | `.bob/skills/` | `~/.bob/skills/` |
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| OpenClaw | `openclaw` | `skills/` | `~/.openclaw/skills/` |
| Cline, Warp | `cline`, `warp` | `.agents/skills/` | `~/.agents/skills/` |
| CodeBuddy | `codebuddy` | `.codebuddy/skills/` | `~/.codebuddy/skills/` |
| Codex | `codex` | `.agents/skills/` | `~/.codex/skills/` |
| Command Code | `command-code` | `.commandcode/skills/` | `~/.commandcode/skills/` |
| Continue | `continue` | `.continue/skills/` | `~/.continue/skills/` |
| Cortex Code | `cortex` | `.cortex/skills/` | `~/.snowflake/cortex/skills/` |
| Crush | `crush` | `.crush/skills/` | `~/.config/crush/skills/` |
| Cursor | `cursor` | `.agents/skills/` | `~/.cursor/skills/` |
| Deep Agents | `deepagents` | `.agents/skills/` | `~/.deepagents/agent/skills/` |
| Droid | `droid` | `.factory/skills/` | `~/.factory/skills/` |
| Firebender | `firebender` | `.agents/skills/` | `~/.firebender/skills/` |
| Gemini CLI | `gemini-cli` | `.agents/skills/` | `~/.gemini/skills/` |
| GitHub Copilot | `github-copilot` | `.agents/skills/` | `~/.copilot/skills/` |
| Goose | `goose` | `.goose/skills/` | `~/.config/goose/skills/` |
| Junie | `junie` | `.junie/skills/` | `~/.junie/skills/` |
| iFlow CLI | `iflow-cli` | `.iflow/skills/` | `~/.iflow/skills/` |
| Kilo Code | `kilo` | `.kilocode/skills/` | `~/.kilocode/skills/` |
| Kiro CLI | `kiro-cli` | `.kiro/skills/` | `~/.kiro/skills/` |
| Kode | `kode` | `.kode/skills/` | `~/.kode/skills/` |
| MCPJam | `mcpjam` | `.mcpjam/skills/` | `~/.mcpjam/skills/` |
| Mistral Vibe | `mistral-vibe` | `.vibe/skills/` | `~/.vibe/skills/` |
| Mux | `mux` | `.mux/skills/` | `~/.mux/skills/` |
| OpenCode | `opencode` | `.agents/skills/` | `~/.config/opencode/skills/` |
| OpenHands | `openhands` | `.openhands/skills/` | `~/.openhands/skills/` |
| Pi | `pi` | `.pi/skills/` | `~/.pi/agent/skills/` |
| Qoder | `qoder` | `.qoder/skills/` | `~/.qoder/skills/` |
| Qwen Code | `qwen-code` | `.qwen/skills/` | `~/.qwen/skills/` |
| Roo Code | `roo` | `.roo/skills/` | `~/.roo/skills/` |
| Trae | `trae` | `.trae/skills/` | `~/.trae/skills/` |
| Trae CN | `trae-cn` | `.trae/skills/` | `~/.trae-cn/skills/` |
| Windsurf | `windsurf` | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |
| Zencoder | `zencoder` | `.zencoder/skills/` | `~/.zencoder/skills/` |
| Neovate | `neovate` | `.neovate/skills/` | `~/.neovate/skills/` |
| Pochi | `pochi` | `.pochi/skills/` | `~/.pochi/skills/` |
| AdaL | `adal` | `.adal/skills/` | `~/.adal/skills/` |
<!-- supported-agents:end -->

> [!NOTE]
> **Kiro CLI 用户：**安装 skills 后，需要手动将其添加到自定义 Agent 的 `resources` 中：
>
> ```json
> {
>   "resources": ["skill://.kiro/skills/**/SKILL.md"]
> }
> ```

CLI 会自动检测已安装的 Coding Agent。如未检测到，会提示选择要安装到的 Agent。

## 创建 Skills

Skills 是包含 `SKILL.md` 文件（带 YAML frontmatter）的目录：

```markdown
---
name: my-skill
description: 这个 skill 的作用及使用场景
---

# My Skill

激活此 skill 时 Agent 遵循的指令。

## 使用场景

描述适合使用此 skill 的场景。

## 步骤

1. 首先这样做
2. 然后做那件事
```

### 必需字段

- `name`：唯一标识符（小写，允许连字符）
- `description`：简要说明 skill 的作用

### 可选字段

- `metadata.internal`：设为 `true` 可隐藏 skill。内部 skill 仅在设置 `INSTALL_INTERNAL_SKILLS=1` 时可见和可安装。适用于开发中的 skill 或仅供内部使用的工具。

```markdown
---
name: my-internal-skill
description: 默认不显示的内部 skill
metadata:
  internal: true
---
```

### Skill 发现位置

CLI 在仓库的以下位置搜索 skills：

<!-- skill-discovery:start -->
- 根目录（如果包含 `SKILL.md`）
- `skills/`
- `skills/.curated/`
- `skills/.experimental/`
- `skills/.system/`
- `.agents/skills/`
- `.augment/skills/`
- `.bob/skills/`
- `.claude/skills/`
- `./skills/`
- `.codebuddy/skills/`
- `.commandcode/skills/`
- `.continue/skills/`
- `.cortex/skills/`
- `.crush/skills/`
- `.factory/skills/`
- `.goose/skills/`
- `.junie/skills/`
- `.iflow/skills/`
- `.kilocode/skills/`
- `.kiro/skills/`
- `.kode/skills/`
- `.mcpjam/skills/`
- `.vibe/skills/`
- `.mux/skills/`
- `.openhands/skills/`
- `.pi/skills/`
- `.qoder/skills/`
- `.qwen/skills/`
- `.roo/skills/`
- `.trae/skills/`
- `.windsurf/skills/`
- `.zencoder/skills/`
- `.neovate/skills/`
- `.pochi/skills/`
- `.adal/skills/`
<!-- skill-discovery:end -->

### 插件清单发现

如果存在 `.claude-plugin/marketplace.json` 或 `.claude-plugin/plugin.json`，也会发现其中声明的 skills：

```json
// .claude-plugin/marketplace.json
{
  "metadata": { "pluginRoot": "./plugins" },
  "plugins": [
    {
      "name": "my-plugin",
      "source": "my-plugin",
      "skills": ["./skills/review", "./skills/test"]
    }
  ]
}
```

这支持与 [Claude Code 插件市场](https://code.claude.com/docs/en/plugin-marketplaces) 生态系统的兼容性。

如果标准位置未找到 skills，则执行递归搜索。

## 兼容性

Skills 遵循共享的 [Agent Skills 规范](https://agentskills.io)，因此在各 Agent 之间基本兼容。但某些功能可能特定于某些 Agent：

| 功能          | OpenCode | OpenHands | Claude Code | Cline | CodeBuddy | Codex | Command Code | Kiro CLI | Cursor | Antigravity | Roo Code | Github Copilot | Amp | OpenClaw | Neovate | Pi  | Qoder | Zencoder |
| ------------- | -------- | --------- | ----------- | ----- | --------- | ----- | ------------ | -------- | ------ | ----------- | -------- | -------------- | --- | -------- | ------- | --- | ----- | -------- |
| 基础 skills   | Yes      | Yes       | Yes         | Yes   | Yes       | Yes   | Yes          | Yes      | Yes    | Yes         | Yes      | Yes            | Yes | Yes      | Yes     | Yes | Yes   | Yes      |
| `allowed-tools` | Yes      | Yes       | Yes         | Yes   | Yes       | Yes   | Yes          | No       | Yes    | Yes         | Yes      | Yes            | Yes | Yes      | Yes     | Yes | Yes   | No       |
| `context: fork` | No       | No        | Yes         | No    | No        | No    | No           | No       | No     | No          | No       | No             | No  | No       | No      | No  | No    | No       |
| Hooks         | No       | No        | Yes         | Yes   | No        | No    | No           | No       | No     | No          | No       | No             | No  | No       | No      | No  | No    | No       |

## 故障排除

### "找不到 skills"

确保仓库包含有效的 `SKILL.md` 文件，且 frontmatter 中有 `name` 和 `description`。

### Skill 未在 Agent 中加载

- 验证 skill 安装到了正确路径
- 查看 Agent 文档了解 skill 加载要求
- 确保 `SKILL.md` frontmatter 是有效的 YAML

### 权限错误

确保你对目标目录有写权限。

## 环境变量

| 变量                     | 说明                                                          |
| ------------------------ | ------------------------------------------------------------- |
| `INSTALL_INTERNAL_SKILLS` | 设为 `1` 或 `true` 以显示和安装标记为 `internal: true` 的 skills |
| `DISABLE_TELEMETRY`      | 设为 `1` 禁用匿名使用量遥测                                    |
| `DO_NOT_TRACK`           | 禁用遥测的替代方式                                            |
| `GITHUB_PROXY_URL`       | 自定义 GitHub 代理 URL（默认：`https://kkgithub.com`）        |
| `GITHUB_RAW_PROXY_URL`   | 自定义 GitHub raw 代理 URL（默认：`https://gh-proxy.org`） |
| `GITHUB_API_PROXY_URL`   | 自定义 GitHub API 代理 URL（默认：`https://api.bgithub.com`） |

```bash
# 安装内部 skills
INSTALL_INTERNAL_SKILLS=1 npx skills-cn add vercel-labs/agent-skills --list
```

## 遥测

此 CLI 收集匿名使用数据以帮助改进工具。不收集任何个人信息。

CI 环境中会自动禁用遥测。

## 相关链接

- [Agent Skills 规范](https://agentskills.io)
- [Skills 目录](https://skills.sh)
- [Amp Skills 文档](https://ampcode.com/manual#agent-skills)
- [Antigravity Skills 文档](https://antigravity.google/docs/skills)
- [Factory AI / Droid Skills 文档](https://docs.factory.ai/cli/configuration/skills)
- [Claude Code Skills 文档](https://code.claude.com/docs/en/skills)
- [OpenClaw Skills 文档](https://docs.openclaw.ai/tools/skills)
- [Cline Skills 文档](https://docs.cline.bot/features/skills)
- [CodeBuddy Skills 文档](https://www.codebuddy.ai/docs/ide/Features/Skills)
- [Codex Skills 文档](https://developers.openai.com/codex/skills)
- [Command Code Skills 文档](https://commandcode.ai/docs/skills)
- [Crush Skills 文档](https://github.com/charmbracelet/crush?tab=readme-ov-file#agent-skills)
- [Cursor Skills 文档](https://cursor.com/docs/context/skills)
- [Firebender Skills 文档](https://docs.firebender.com/multi-agent/skills)
- [Gemini CLI Skills 文档](https://geminicli.com/docs/cli/skills/)
- [GitHub Copilot Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [iFlow CLI Skills 文档](https://platform.iflow.cn/en/cli/examples/skill)
- [Kimi Code CLI Skills 文档](https://moonshotai.github.io/kimi-cli/en/customization/skills.html)
- [Kiro CLI Skills 文档](https://kiro.dev/docs/cli/custom-agents/configuration-reference/#skill-resources)
- [Kode Skills 文档](https://github.com/shareAI-lab/kode/blob/main/docs/skills.md)
- [OpenCode Skills 文档](https://opencode.ai/docs/skills)
- [Qwen Code Skills 文档](https://qwenlm.github.io/qwen-code-docs/en/users/features/skills/)
- [OpenHands Skills 文档](https://docs.openhands.ai/modules/usage/how-to/using-skills)
- [Pi Skills 文档](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md)
- [Qoder Skills 文档](https://docs.qoder.com/cli/Skills)
- [Replit Skills 文档](https://docs.replit.com/replitai/skills)
- [Roo Code Skills 文档](https://docs.roocode.com/features/skills)
- [Trae Skills 文档](https://docs.trae.ai/ide/skills)
- [Vercel Agent Skills 仓库](https://github.com/vercel-labs/agent-skills)

## 致谢

本项目基于 [vercel-labs/skills](https://github.com/vercel-labs/skills) 开发，专门为解决中国大陆用户访问 GitHub 的网络问题而添加了 kkgithub.com 和 gh-proxy.org 代理支持。

## 许可证

MIT
