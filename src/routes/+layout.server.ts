import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals }) => {
	const { directus } = locals
	const pages = await directus
		.request(
			readItems('pages', {
				fields: [
					'*',
					{ cards: [{ cards_id: ['*'] }] },
					{ topics: [{ cards: [{ cards_id: ['*'] }] }] }
				]
			})
		)
		.catch(() => error(500, `Backend is not reachable right now...`))
	const topics = await directus.request(
		readItems('topics', {
			fields: ['*', { cards: [{ cards_id: ['*'] }] }]
		})
	)
	return {
		pages,
		topics
	}
}
