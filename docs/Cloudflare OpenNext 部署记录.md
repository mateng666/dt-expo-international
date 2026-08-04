# Cloudflare OpenNext 部署记录（Next.js 16 App Router）

本文记录 `dt-expo-international`（CircleMeet 国际版前台）部署到 Cloudflare Workers 时的配置。  
技术路径为 **`@opennextjs/cloudflare`（OpenNext）**，不是已废弃的 `@cloudflare/next-on-pages`。

对照旧项目 `slhy-website`《Cloudflare Pages 部署记录》：该记录面向 Next.js 14 Pages Router + Pages；本仓库为 Next.js 16 App Router，官方适配已切换到 Workers + OpenNext。

## Cloudflare 配置

| 配置项 | 值 |
| --- | --- |
| 部署目标 | Cloudflare **Workers**（OpenNext） |
| 框架 / 适配器 | `@opennextjs/cloudflare` |
| 本地 / CI 构建 | `pnpm exec opennextjs-cloudflare build` 或 `pnpm run deploy` |
| Worker 名称 | `dt-expo-international`（见 `wrangler.jsonc`） |
| Node.js 版本 | 20（`.node-version`） |
| 包管理器 | `pnpm@10.11.1`（`package.json` 的 `packageManager` 字段；lockfile 须与 CI pnpm 10 兼容） |
| 兼容性标志 | `nodejs_compat`（`wrangler.jsonc` 已声明；控制台生产/预览也需具备） |

**不要**使用以下旧 Pages 路径：

- 构建命令 `npx @cloudflare/next-on-pages@1`
- 输出目录 `.vercel/output/static`
- 页面级 `export const runtime = 'experimental-edge'`（OpenNext 使用 Node.js runtime）

未设置 `nodejs_compat` 时会出现：

```text
Node.JS Compatibility Error
no nodejs_compat compatibility flag set
```

## 环境变量

| 变量 | 示例 | 说明 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://eventnovas.com` | 生产必须设置；用于 `metadataBase` / canonical，避免落到 `*.workers.dev` |

本地可参考仓库根目录 `.env.example`。Workers 控制台或 `wrangler` secrets/vars 中配置同名变量。

## 代码约束（已落地）

1. locale 路由使用 `src/middleware.ts`（next-intl），不使用 Next 16 `proxy.ts`（OpenNext 对 Proxy 支持不完整）。
2. 不在中间件 / 服务端路径使用 Node-only 模块：`fs` / `path` / `child_process` / `jsdom` 等。
3. 不使用 `export const runtime = "edge"`。
4. `open-next.config.ts` 使用默认 `defineCloudflareConfig()`（本期不上 R2 增量缓存）。
5. `public/_headers` 为 `/_next/static/*` 配置长缓存。

## 本地验证

```bash
pnpm install
pnpm build
```

`pnpm build`（Next 本体构建）可在 Windows 上验证通过。

OpenNext 打包（`pnpm preview` / `pnpm deploy` / `opennextjs-cloudflare build`）在 **原生 Windows 上不完全支持**，官方建议使用 **WSL / Linux / macOS**，或在 Cloudflare Workers Builds / GitHub Actions（Linux runner）中执行。本机若出现类似：

```text
ENOENT: ... open-next.config.edge.mjs
```

请改到 WSL 或 CI 执行 OpenNext 构建，不要在原生 PowerShell 上强行打包。

可选（Linux/WSL，耗时更长，在 Workers runtime 预览）：

```bash
pnpm preview
```

一键部署到 Cloudflare（需已登录 `wrangler`，建议在 Linux/WSL/CI）：

```bash
pnpm deploy
```

## 部署后检查

1. 打开 Workers 预览 / 自定义域，确认首页与主要 locale 路由可访问（如 `/en`、`/zh`）
2. 确认语言切换正常
3. 绑定 `eventnovas.com` 后，确认页面 canonical / Open Graph 域名指向 `https://eventnovas.com`

## 备注

- `@cloudflare/next-on-pages` 已废弃；本项目长期路径为 OpenNext Cloudflare
- Workers 支持控制台环境变量、Secrets、自定义域；能力不弱于旧 Pages 路径
- 若需 Git 推送自动构建，可使用 Cloudflare Workers Builds 或 GitHub Actions 调用 `pnpm run deploy` / `upload`
