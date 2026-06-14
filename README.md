# coree for Zed

Persistent memory and code intelligence for AI agents in [Zed](https://zed.dev).

## Install

Add to your Zed `settings.json`
(`~/.config/zed/settings.json` on Linux, `~/Library/Application Support/Zed/settings.json` on macOS):

```json
{
  "context_servers": {
    "coree": {
      "command": {
        "path": "npx",
        "args": ["--yes", "@coree-ai/coree@0.15.0", "serve"],
        "env": {}
      }
    }
  }
}
```

For project-scoped config, use `.zed/settings.json` at your project root.

## Context File

Copy `CLAUDE.md` to your project root so Zed's AI assistant loads coree usage instructions:

```sh
curl -fsSL https://raw.githubusercontent.com/coree-ai/zed/main/CLAUDE.md -o CLAUDE.md
```

## Environment Variables

To use remote memory sync, set these in your shell profile and they will be inherited by Zed:

| Variable | Description |
|----------|-------------|
| `COREE__MEMORY__REMOTE_AUTH_TOKEN` | Auth token for remote memory sync |
| `COREE__MEMORY__REMOTE_URL` | Remote memory database URL |
| `COREE__INDEX__REMOTE_AUTH_TOKEN` | Auth token for remote index sync |
| `COREE__INDEX__REMOTE_URL` | Remote index database URL |

## Requirements

- [Node.js](https://nodejs.org) 18+ with `npx` on `PATH`
- Zed 0.160.0+ with context server support enabled

## Version Bumping

```sh
node scripts/update-npx-pin.mjs 0.14.0
```

Updates version references in `extension.toml`, `Cargo.toml`, and `src/lib.rs`.
