import { directus } from '$lib/directus'
import { verifyCookie } from '$lib/utils/cookies'
import { log } from '@arturoguzman/art-ui'
import { type Handle } from '@sveltejs/kit'

export const crawlers = ['Googlebot','Googlebot-Image','Googlebot-News', 'Storebot-Google', 'Google-InspectionTool', 'GoogleOther']

export const handle: Handle = async ({ event, resolve }) => {
  console.log(event.request.headers)
  event.locals.startTimer = Date.now()
	event.locals.directus = directus
  event.locals.bot = false
	event.locals.session = {
		side: event.cookies.get('etips-side') ?? 'none',
		role: event.cookies.get('etips-role') ?? 'public'
	}
	const role = event.cookies.get('etips-role')
  const user_agent = event.request.headers.get('user-agent')
  if(user_agent && crawlers.some(v => user_agent.includes(v))){
    event.locals.bot = true
    event.locals.session = {
      side: 'left',
      role: 'healthcare-professional'
    }
  }
	if (
    event.locals.bot === false && 
		!verifyCookie(role, ['carer', 'healthcare-professional']) &&
		!event.url.pathname.includes('/assets')
	) {
		event.cookies.delete('etips-disclaimer-consent', { path: '/' })
		event.cookies.delete('etips-role', { path: '/' })
		event.cookies.delete('etips-side', { path: '/' })
	}
	const response = await resolve(event)
	if (!event.url.pathname.includes('/assets')) {
		log({ response: response, event: event, status: response.status })
	}
	return response
}

export const handleError = async ({ event, status, message }) => {
	log({ status: status, event: event, content: message })
	return {
		message: status === 404 ? `This page does not exist!` : 'Whoops!'
		// errorId
	}
}
