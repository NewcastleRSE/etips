import { directus } from '$lib/directus'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.directus = directus
	const response = await resolve(event)
	return response
}
