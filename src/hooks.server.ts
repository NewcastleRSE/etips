import { directus } from '$lib/directus'
import { log } from '@arturoguzman/art-ui'
import { type Handle } from '@sveltejs/kit'

const roles = ['carer', 'healthcare-professional']
export const handle: Handle = async ({ event, resolve }) => {
	// const id = getId()
	// console.time(`id: ${id}`)
	event.locals.startTimer = Date.now()
	event.locals.directus = directus
	event.locals.session = {
		side: event.cookies.get('etips-side') ?? 'none',
		role: event.cookies.get('etips-role') ?? 'public'
	}
	const role = event.cookies.get('etips-role')
	if (role && !roles.includes(role)) {
		event.cookies.delete('etips-disclaimer-consent', { path: '/' })
		event.cookies.delete('etips-role', { path: '/' })
		event.cookies.delete('etips-side', { path: '/' })
	}
	const response = await resolve(event)
	if (!event.url.pathname.includes('/assets')) {
		log({ response: response, event: event, status: response.status })
	}
	// console.timeEnd(`id: ${id}`)
	return response
}

export const handleError = async ({ event, status, message }) => {
	// const errorId = crypto.randomUUID()
	log({ status: status, event: event, content: message })

	return {
		message: status === 404 ? `This page does not exist!` : 'Whoops!'
		// errorId
	}
}
