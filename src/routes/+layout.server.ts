import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals }) => {
	const { directus } = locals
	const pages = await directus
		.request(
			readItems('pages', {
				fields: [
					'id',
					'status',
					'sort',
					'title',
					'category',
					'slug',
					'copy',
					'icon',
					'topics'
					// { cards: ['*'] },
					// { cards: [{ cards_id: ['*'] }] },
					// { topics: ['*'] }
					// { topics: [{ cards: [{ cards_id: ['*'] }] }] }
				]
			})
		)
		.catch(() => error(500, `Backend is not reachable right now...`))
	const topics = await directus.request(
		readItems('topics', {
			fields: ['id', 'status', 'sort', 'display', 'title', 'icon', 'slug']
			// fields: ['*', { cards: [{ cards_id: ['*'] }] }]
		})
	)
	console.log(`setting with side: ${locals.session.side}`)
	return {
		pages,
		topics,
		side: locals.session.side,
		copy:
			locals.session.side === 'left'
				? 'Best from the Left'
				: locals.session.side === 'right'
					? 'Right from the Start'
					: 'Welcome'
	}
}
