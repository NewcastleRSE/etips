import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals }) => {
	const { directus } = locals
	const pages = await directus
		.request(
			readItems('pages', {
				fields: ['id', 'status', 'sort', 'title', 'category', 'slug', 'copy', 'icon', 'topics']
			})
		)
		.catch(() => error(500, `Backend is not reachable right now...`))
	return {
		pages,
		side: locals.session.side,
		role: locals.session.role,
		copy:
			locals.session.side === 'left'
				? 'Best from the Left'
				: locals.session.side === 'right'
					? 'Right from the Start'
					: 'Welcome'
	}
}
