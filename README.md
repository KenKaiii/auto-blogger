# Auto Blogger

Auto Blogger is a Next.js and Payload CMS app for running a clean editorial blog today, with AI-assisted publishing workflows ready to grow into it.

It gives you the public blog, the admin CMS, rich text editing, SEO fields, media, categories, keywords, sources, prompt templates, and generation job models in one focused starter.

## Why it is useful

- Ship a real blog with Payload CMS and a polished Next.js frontend
- Manage posts, drafts, categories, media, sources, keywords, and prompts from `/admin`
- Keep editorial status separate from published draft status
- Build toward automated content pipelines without rewriting the CMS later
- Use Postgres, Payload, Lexical, SEO, search, forms, RSS, and sitemap foundations from day one

## Stack

- Next.js 16
- React 19
- Payload CMS 3
- Postgres
- Lexical rich text
- MDX
- Biome

## Run it locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000` for the site and `http://localhost:3000/admin` for the CMS.

You need `PAYLOAD_SECRET` and `DATABASE_URL` in `.env`. `OPENAI_API_KEY` and `REDIS_URL` are optional for future AI and background job work.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run generate:types
npm run generate:importmap
```

## Status

This is an early but practical base for an automated publishing product. The CMS and content model are in place. The generation worker pipeline is the next big piece.
