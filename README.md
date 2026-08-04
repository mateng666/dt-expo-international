# CircleMeet International (dt-expo-international)

圈会议国际版前台（Next.js）。当前已完成首页静态还原，数据为本地 mock。

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4（设计 token 写在 `src/app/globals.css`）
- lucide-react 图标

## Getting Started

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## Structure

```text
public/images/home/       # 设计稿静态图标 / banner / logo
public/images/meetings/   # 会议卡片占位图
src/app/                  # App Router
src/components/home/      # 首页区块
src/components/ui/        # 通用 UI
src/data/meetings.ts      # mock 会议数据
```

## Design Tokens

品牌色 `#0261FF`、内容宽 `1300px`、卡片 `400×330` 等见《圈会议国际版设计规范.docx》与 `docs/superpowers/specs/2026-08-03-circlemeet-homepage-design.md`。

字体预留 MiSans：将字体文件放入 `public/fonts/` 后，在 `globals.css` 中取消 `@font-face` 注释即可。
