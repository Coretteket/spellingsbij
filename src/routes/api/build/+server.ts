import { CRON_SECRET, BUILD_HOOK } from '$env/static/private'

export function GET({ request }) {
  const bearer = request.headers.get('Authorization')
  if (bearer !== `Bearer ${CRON_SECRET}`) return new Response('Unauthorized', { status: 401 })
  console.log('Triggering build.')
  return fetch(BUILD_HOOK)
}
