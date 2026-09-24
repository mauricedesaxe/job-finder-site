/// <reference types="@cloudflare/workers-types" />

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
}

const LEVELS = new Set(['junior', 'mid', 'senior']);
const REGIONS = new Set(['eu', 'na', 'other']);
const STATUSES = new Set(['booking', 'waitlist']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface IntakeBody {
  status?: unknown;
  level?: unknown;
  region?: unknown;
  looking?: unknown;
  email?: unknown;
  website?: unknown;
}

function clamp(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function handleIntake(request: Request, env: Env): Promise<Response> {
  let body: IntakeBody;
  try {
    body = await request.json();
  } catch {
    return new Response('bad request', { status: 400 });
  }

  // Honeypot: real users never fill this field. Pretend success and drop.
  if (clamp(body.website, 100) !== '') {
    return new Response(null, { status: 204 });
  }

  const status = clamp(body.status, 20);
  const level = clamp(body.level, 20);
  const region = clamp(body.region, 20);
  const looking = clamp(body.looking, 2000);
  const email = clamp(body.email, 320);

  if (!STATUSES.has(status) || !LEVELS.has(level) || !REGIONS.has(region)) {
    return new Response('bad request', { status: 400 });
  }
  if (status === 'waitlist' && !EMAIL_RE.test(email)) {
    return new Response('bad email', { status: 400 });
  }

  await env.DB.prepare(
    'INSERT INTO signups (status, level, region, looking, email) VALUES (?1, ?2, ?3, ?4, ?5)',
  )
    .bind(status, level, region, looking, status === 'waitlist' ? email : null)
    .run();

  return new Response(null, { status: 204 });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/intake') {
      if (request.method !== 'POST') {
        return new Response('method not allowed', { status: 405 });
      }
      try {
        return await handleIntake(request, env);
      } catch (error) {
        console.error('intake failed', error);
        return new Response('something went wrong', { status: 500 });
      }
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
