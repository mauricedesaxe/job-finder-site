# Job Fiend

Public site for [jobfiend.io](https://jobfiend.io). Product copy lives in [job-finder#175](https://github.com/mauricedesaxe/job-finder/issues/175).

Same shape as [leetsoftware.com](https://github.com/mauricedesaxe/leetsoftware.com): static Astro 4, Yarn 4, Cloudflare Worker serving `dist`.

## Local

```sh
corepack enable
yarn install
yarn dev
```

```sh
yarn build
yarn preview
```

## Deploy

GitHub Actions deploys PR previews and `main` to production. That needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` on the repo.

Until those exist, the site is local only. After Wrangler is authorized:

```sh
yarn build
npx wrangler deploy
```

Attach `jobfiend.io` in Cloudflare. Worker name is `jobfiend`.
