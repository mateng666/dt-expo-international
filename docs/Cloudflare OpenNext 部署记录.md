# Cloudflare OpenNext 部署记录（Next.js 16 App Router）

本文记录 `dt-expo-international`（CircleMeet 国际版前台）部署到 Cloudflare Workers 时的配置，以及本次实际上线踩坑项。  
技术路径为 **`@opennextjs/cloudflare`（OpenNext）**，不是已废弃的 `@cloudflare/next-on-pages`。

对照旧项目 `slhy-website`《Cloudflare Pages 部署记录》：该记录面向 Next.js 14 Pages Router + Pages；本仓库为 Next.js 16 App Router，官方适配已切换到 Workers + OpenNext。

创建 Worker 时选 **Create Worker → Continue with GitHub**，不要点底部「想要部署 Pages?」。

## Cloudflare 配置

| 配置项 | 值 |
| --- | --- |
| 部署目标 | Cloudflare **Workers**（OpenNext） |
| 框架 / 适配器 | `@opennextjs/cloudflare` |
| 本地 / CI 构建 | `pnpm exec opennextjs-cloudflare build` 或 `pnpm run deploy` |
| Worker 名称 | `dt-expo-international`（见 `wrangler.jsonc`） |
| Node.js 版本 | 22（`.node-version`；Wrangler 4 要求 ≥ 22，勿再用 20） |
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

Cloudflare Workers Builds 建议：

| 项 | 值 |
| --- | --- |
| Build command | `pnpm exec opennextjs-cloudflare build` |
| Deploy command | `pnpm exec wrangler deploy`（或 `pnpm exec opennextjs-cloudflare deploy`） |
| Node.js | 22（由 `.node-version` 指定；控制台不要手动锁成 20） |

说明：平台会先自动跑一次 `pnpm install --frozen-lockfile`，构建命令里不必再写 `pnpm install`。

## 自定义域绑定（eventnovas.com）

绑定入口（正确）：

1. **Workers 与 Pages** → 打开 Worker `dt-expo-international`
2. **设置 → 域和路由 / 自定义域** → 添加 `eventnovas.com`

**不是**域名下的「Workers 路由」空列表页（那是给已有 Zone 配 `域名/* → Worker` 规则用的）。

若添加自定义域时报：

```text
Hostname 'eventnovas.com' already has externally managed DNS records (A, CNAME, etc).
Delete them first or try a different hostname.
```

说明该主机名上已有冲突 DNS，需先清理再绑定：

1. Cloudflare 域名列表 → `eventnovas.com` → **配置 DNS**（不是 SSL/TLS）
2. 按需删除冲突记录后再回 Worker 添加自定义域

| 记录类型 | 名称示例 | 处理 |
| --- | --- | --- |
| A / AAAA | `eventnovas.com`（或 `@`） | **必须删除**（常见旧站/转发 IP，即冲突主因） |
| CNAME | `www` | 若 `www` 也要挂到本 Worker：**可删**；绑定成功后再在自定义域添加 `www.eventnovas.com` |
| CNAME | `_domainconnect…` | 非冲突主因，可留可删 |
| TXT | `_dmarc…` | **保留**（邮件策略，与 Worker 无关） |

删除根域名 A/CNAME 前确认旧站可下线；绑定成功后 Cloudflare 通常会自动写入指向 Worker 的新记录。DNS 生效可能需要数分钟。

## 本次踩坑记录

### 1. pnpm lockfile 与 CI 不兼容

**现象：**

```text
Ignoring not compatible lockfile at .../pnpm-lock.yaml
ERR_PNPM_NO_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent
```

**原因：** 本地曾用 pnpm 8 生成 `lockfileVersion: '6.0'`，Cloudflare Builds 使用 pnpm 10.11.1，会忽略旧 lockfile，再按 `--frozen-lockfile` 安装即失败。

**处理：**

- 用与 CI 一致的 pnpm 10 重生成 lockfile（现为 `lockfileVersion: '9.0'`）
- `package.json` 固定 `"packageManager": "pnpm@10.11.1"`
- 本地可用 `pnpm install --frozen-lockfile` 自检

### 2. 构建成功但部署失败：Node 版本过低

**现象：** OpenNext 已 `OpenNext build complete`，随后：

```text
Executing user deploy command: npx wrangler deploy
Wrangler requires at least Node.js v22.0.0. You are using v20.20.2.
```

**原因：** Wrangler 4 要求 Node ≥ 22；仅把 Node 设为 20（或旧文档习惯）会导致「构建过、部署挂」。

**处理：**

- `.node-version` 设为 `22`
- Cloudflare 构建环境不要手动覆盖为 Node 20
- Deploy 使用 `pnpm exec wrangler deploy`（与项目内 wrangler 一致）

### 3. 构建命令重复 install

平台已自动执行 `pnpm install --frozen-lockfile`。用户构建命令写成 `pnpm install && pnpm exec opennextjs-cloudflare build` 虽不一定失败，但多余；建议构建命令只保留 OpenNext build。

### 4. 自定义域绑错入口 / DNS 冲突

见上文「自定义域绑定」。要点：

- 用 Worker 的 **自定义域**，不要只在「Workers 路由」页操作
- 先删根域名冲突 A（及需要时的 www CNAME），再添加域名
- 保留 `_dmarc` 等无关 TXT

### 5. 本机 Windows 无法完成 OpenNext 打包

见上文「本地验证」。CI（Linux）可正常完成 OpenNext bundle；原生 Windows 可能在复制 `open-next.config.edge.mjs` 时 ENOENT。

### 6. Next 对 middleware 的弃用提示

构建日志可能出现：

```text
The "middleware" file convention is deprecated. Please use "proxy" instead.
```

本项目**仍使用** `src/middleware.ts`：OpenNext 对 Next 16 `proxy` 支持不完整。该警告可忽略，不要为消警告改回 `proxy.ts` 除非确认 OpenNext 已支持。

## 部署后检查

1. 打开 Workers 预览 / 自定义域，确认首页与主要 locale 路由可访问（如 `/en`、`/zh`）
2. 确认语言切换正常
3. 绑定 `eventnovas.com` 后，确认页面 canonical / Open Graph 域名指向 `https://eventnovas.com`

## 备注

- `@cloudflare/next-on-pages` 已废弃；本项目长期路径为 OpenNext Cloudflare
- Workers 支持控制台环境变量、Secrets、自定义域；能力不弱于旧 Pages 路径
- 若需 Git 推送自动构建，可使用 Cloudflare Workers Builds 或 GitHub Actions 调用 `pnpm run deploy` / `upload`
