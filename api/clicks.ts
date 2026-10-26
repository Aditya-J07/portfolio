import { Redis } from '@upstash/redis';

export const config = {
  runtime: 'edge',
};

// Check both Vercel KV and standard Upstash environment variable names
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;
const COUNTER_KEY = 'global_portfolio_clicks';

export default async function handler(req: Request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store, max-age=0',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Graceful fallback if database credentials are not yet linked
  if (!redis) {
    return new Response(
      JSON.stringify({ clicks: 0, status: 'mock', message: 'Redis credentials not found' }),
      { status: 200, headers }
    );
  }

  try {
    if (req.method === 'POST') {
      let amount = 1;
      try {
        const body = await req.json();
        if (typeof body.amount === 'number' && body.amount > 0 && body.amount <= 50) {
          amount = Math.floor(body.amount);
        }
      } catch {
        amount = 1;
      }

      // Atomic increment in Redis
      const newTotal = await redis.incrby(COUNTER_KEY, amount);
      return new Response(JSON.stringify({ clicks: newTotal, status: 'ok' }), {
        status: 200,
        headers,
      });
    }

    // Default GET: Fetch current global count
    const count = (await redis.get<number>(COUNTER_KEY)) || 0;
    return new Response(JSON.stringify({ clicks: count, status: 'ok' }), {
      status: 200,
      headers,
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ clicks: 0, error: err?.message || 'Server error' }),
      { status: 500, headers }
    );
  }
}
