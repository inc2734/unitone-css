# `@inc2734/unitone-css-mcp`

MCP server for `unitone-css`.

This package helps AI coding assistants inspect the repository structure of `unitone-css` without re-scanning the entire codebase on every task.

## Package status

This package is designed to be publishable as a standalone npm package such as `@inc2734/unitone-css-mcp`.

The intended separation is:

- `@inc2734/unitone-css` for the framework itself
- `@inc2734/unitone-css-mcp` for AI assistant integration

That keeps MCP usage optional for framework users.

## Available tools

| Tool | Description |
| --- | --- |
| `list_primitives` | List available layout primitives under `src/layout-primitives`. |
| `get_primitive` | Return file-level details for a specific layout primitive. |
| `list_behaviors` | List available behaviors under `src/behaviors`. |
| `list_utilities` | List available utility classes under `src/utilities`. |
| `get_utilities` | Return file-level details for a specific utility class. |
| `get_variables` | Return Sass variable files and tokens (Global CSS Variables) candidates from `src/variables` and `src/settings`. |
| `list_docs` | List available MDX documentation files under `website/src/content/docs`. |
| `get_doc` | Read the content of a specific documentation file. |
| `search_docs` | Search documentation files by keyword or regex pattern. |

Utility and token discovery compiles the local Sass entrypoints in memory, including loops, interpolation, and nested selectors. It does not read or write `dist`.

- `list_utilities` returns CSS-escaped class names, such as `-font-size\:xl`, without a leading dot.
- `get_utilities` accepts both HTML class names (`-font-size:xl`) and CSS-escaped names (`-font-size\:xl`), with or without a leading dot. Results include the original Sass file paths, line numbers, and source lines.
- `get_variables` returns complete custom property names from compiled settings, including named font sizes and their fluid variants.
- `get_primitive` accepts only directory names returned by `list_primitives`.

## Initial scope

This server is intentionally narrow.

- It ignores `dist`.
- It reads the local repository only.
- It does not try to explain design intent beyond what can be derived from the file tree.

## Example setup

Requires Node.js 20.19.0 or later and a local checkout of the `unitone-css` repository containing `src` and `website/src/content/docs`. The MCP package includes Sass and PostCSS as runtime dependencies; the repository's build output is not required.

### Local repository usage

Run the server directly from this repository:

```bash
node packages/mcp/server.js
```

### Future npm usage

If this package is published to npm, the intended setup is:

```bash
npx -y @inc2734/unitone-css-mcp
```

### Claude Code

```bash
claude mcp add unitone-css -- node /absolute/path/to/packages/mcp/server.js
```

### Cursor

`.cursor/mcp.json`

```json
{
  "mcpServers": {
    "unitone-css": {
      "command": "node",
      "args": ["/absolute/path/to/packages/mcp/server.js"]
    }
  }
}
```

### VS Code / Copilot

`.vscode/mcp.json`

```json
{
  "servers": {
    "unitone-css": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/packages/mcp/server.js"]
    }
  }
}
```

If published to npm, the configuration can be simplified to:

```json
{
  "servers": {
    "unitone-css": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@inc2734/unitone-css-mcp"]
    }
  }
}
```

## Notes

- Run `npm run check` inside `packages/mcp` for a basic syntax check.
- Run `node --test tests/mcp.test.mjs` from the repository root for MCP integration checks.
- The default repository root is the current working directory.
- You can override the repository root with `UNITONE_CSS_ROOT`.
- The server is read-only and intentionally ignores `dist`.
