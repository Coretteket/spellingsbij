import { CRON_SECRET, BUILD_HOOK } from '$env/static/private'

export function GET({ request, fetch }) {
  const bearer = request.headers.get('Authorization')
  if (bearer === `Bearer ${CRON_SECRET}`) return fetch(BUILD_HOOK)
  return new Response('Unauthorized', { status: 401 })
}
