# CircleMeet International (dt-expo-international)

圈会议国际版门户（Next.js）。已对接 `expo-intl` 后端 `/api/intl/**`；账号登录/注册仍走 **intl-user-center**。

## Tech Stack

- Next.js (App Router) + TypeScript + next-intl
- Tailwind CSS v4
- lucide-react

## Getting Started

```bash
cp .env.example .env.development   # 如尚无本地 env
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。

需同时启动：

1. 后端 `ruoyi-admin`（含 `intl` profile，默认 `http://127.0.0.1:7033`）
2. 用户中心 `intl-user-center`（默认 `http://127.0.0.1:5174`），且 `VITE_PORTAL_ORIGIN` 指向门户

## 环境变量

见 `.env.example`：

| 变量 | 说明 |
|------|------|
| `API_PROXY_TARGET` | Next rewrite / 服务端请求后端地址 |
| `NEXT_PUBLIC_API_BASE_URL` | 浏览器直连 API（本地可留空走 rewrite） |
| `NEXT_PUBLIC_USER_CENTER_URL` | 登录/我的票入口 |
| `NEXT_PUBLIC_COOKIE_DOMAIN` | 与用户中心共享 `intl.token` 时配置父域 |

## 已接接口（门户侧）

| 能力 | 接口 |
|------|------|
| 会议列表/详情 | `GET /api/intl/meetings`、`GET /api/intl/meetings/{id}` |
| 报名深链 | `GET /api/intl/signup/resolve` → `/en/signup?e&c&m&i` |
| 票种 | `GET /api/intl/signup/ticket-types` |
| 下单/续付 | `POST /api/intl/orders`、`POST .../continue-pay` |
| 法务 | `GET /api/intl/legal/privacy\|terms`（失败回退静态文案） |
| 公开查票 | `POST /api/intl/lookup` → `/en/lookup` |
| 当前用户 | `GET /api/intl/auth/me`（Header 登录态） |

账号注册/登录/改密/注销、我的订单/门票列表在 **用户中心**，不在本仓库重复实现。

## Structure

```text
src/lib/api.ts          # Ajax 封装
src/lib/intl-api.ts     # 业务 API
src/lib/session.ts      # intl.token / 跳转用户中心
src/app/[locale]/       # 页面
```
