import { directus } from '$lib/directus'
import { getId } from '@arturoguzman/art-ui'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const id = getId()
	console.time(`id: ${id}`)
	event.locals.directus = directus
	event.locals.session = {
		side: event.cookies.get('etips-side') ?? 'none'
	}
	const response = await resolve(event)
	console.timeEnd(`id: ${id}`)
	return response
}
