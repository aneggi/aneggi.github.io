# Alessandro Aneggi — AstroWind site

Personal site built on top of the AstroWind template (Astro + Tailwind). The homepage is customized with my research,
academic path, work experience, and contact details. The blog is used to share what I read about greener software and
power-aware engineering.

## Local development

1) Install Node.js 20+  
2) Install deps: `npm install`  
3) Run dev server: `npm run dev` and open the printed URL  
4) Blog posts live in `src/data/post/` as Markdown/MDX.

## Blog content model

Frontmatter keys used in `src/data/post/*.md[x]`:

- Required: `title`, `excerpt`, `publishDate`
- Optional: `updateDate`, `tags` (array), `category`, `image`, `draft` (boolean), `metadata.canonical`
- Body: Markdown; MDX is also supported.
- Validation helper: `npm run validate:post -- src/data/post/your-post.md`

## Decap CMS (`/admin`)

- Admin UI: `admin/index.html`, config at `admin/config.yml`
- Set `repo`, `branch`, `base_url`, and `auth_endpoint` to match your GitHub repo and OAuth provider.
- Folder: `src/data/post`
- Media uploads: committed to `public/uploads` and referenced as `/uploads/<file>` (or `/<REPO>/uploads` for project pages).
- The static site build does not depend on CMS auth; it only affects editor login.

## Deployment (GitHub Pages)

- Workflow: `.github/workflows/deploy.yml` builds on pushes to `main` and deploys to Pages.
- Set environment variables if needed:
  - `PUBLIC_BASE_PATH` (e.g., `/<repo>/` for project pages; `/` for user/org pages)
  - `SITE_URL` (full Pages URL, including repo segment for project pages)
- Build locally: `npm run build` (outputs to `dist/`).

## Contact

- Email: aaneggi@unibz.it  
- Office: NOI Techpark B1.4.26, Bruno-Buozzi-Straße 1, Bolzano, Italy  
- ORCID: https://orcid.org/0009-0009-3709-5051
