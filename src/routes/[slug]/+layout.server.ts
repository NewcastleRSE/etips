import type { Page } from '$lib/types'
import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from '../$types'

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const { directus } = locals
	const page = await directus.request(
		readItems('pages', {
			filter: { _and: [{ slug: { _eq: params.slug } }] },
			fields: [
				'*',
				{ cards: [{ cards_id: ['*', { media: [{ directus_files_id: ['*'] }] }] }] },
				{ topics: [{ cards: [{ cards_id: ['*'] }] }] }
			]
		})
	)
	const topics = await directus.request(
		readItems('topics', {
			fields: ['*', { category: ['title', 'slug'] }, { cards: [{ cards_id: ['*'] }] }],
			filter: {
				category: {
					slug: {
						_eq: params.slug
					}
				}
			}
		})
	)

	return {
		//HACK: remove type assertion
		page: page[0] as Page,
		topics
	}
}
