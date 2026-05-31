# Graduation Invitation · Bùi Thái Hoàng

Thiệp mời lễ tốt nghiệp — pure frontend, glassmorphism futuristic, deployed via GitHub Pages.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3
- Framer Motion 11
- Canvas2D particles (self-rolled, no extra dep)

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output to dist/
npm run preview  # serve dist/
```

## Customize content

Tất cả text / ngày / link nằm ở [`src/data.ts`](src/data.ts) — edit file đó là xong.

Thay accent color: chỉnh trong [`tailwind.config.js`](tailwind.config.js) (`colors.accent`) + [`src/index.css`](src/index.css) (`.text-gradient`).

Thay avatar initials → ảnh thật: edit [`src/components/Avatar.tsx`](src/components/Avatar.tsx), thay block initials bằng `<img src="..." />` (đặt ảnh vào `public/`).

## Deploy lên GitHub Pages

1. Push repo lên GitHub (branch `main`).
2. Trên GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) sẽ tự build + deploy mỗi lần push lên `main`.
4. Site sẽ live ở `https://<username>.github.io/<repo-name>/`.

**Lưu ý**: `vite.config.ts` đã set `base: './'` để asset path relative — đúng cho cả custom domain lẫn subpath. Không cần đổi gì thêm.

## License

Personal use — chia sẻ tự nhiên với những ai cần template tương tự.
