import { CRON_SECRET, BUILD_HOOK } from '$env/static/private'

export const GET = ({ request, fetch }) =>
  request.headers.get('Authorization') === `Bearer ${CRON_SECRET}`
    ? fetch(BUILD_HOOK)
    : new Response('Unauthorized', { status: 401 })
