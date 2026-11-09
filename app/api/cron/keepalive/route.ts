import { timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { createAdminClient } from '@/lib/supabase/server'

// ─── GET /api/cron/keepalive ─────────────────────────────
// Invoked daily by Vercel Cron (see vercel.json). Free-tier Supabase projects
// pause after ~7 days without DB activity and Upstash archives inactive free
// databases; one real query per day keeps both active.

type PingResult = 'ok' | 'skipped' | 'error'

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const expected = Buffer.from(`Bearer ${secret}`)
  const received = Buffer.from(request.headers.get('authorization') ?? '')
  return expected.length === received.length && timingSafeEqual(expected, received)
}

async function pingSupabase(): Promise<PingResult> {
  try {
    const { error } = await createAdminClient().from('leads').select('id').limit(1)
    if (error) {
      console.error('[cron/keepalive] Supabase error:', error)
      return 'error'
    }
    return 'ok'
  } catch (err) {
    console.error('[cron/keepalive] Supabase unreachable:', err)
    return 'error'
  }
}

async function pingRedis(): Promise<PingResult> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return 'skipped'
  }
  try {
    await Redis.fromEnv().set('keepalive', new Date().toISOString())
    return 'ok'
  } catch (err) {
    console.error('[cron/keepalive] Redis unreachable:', err)
    return 'error'
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }

  const [supabase, redis] = await Promise.all([pingSupabase(), pingRedis()])
  const failed = supabase === 'error' || redis === 'error'

  return NextResponse.json({ supabase, redis }, { status: failed ? 500 : 200 })
}
