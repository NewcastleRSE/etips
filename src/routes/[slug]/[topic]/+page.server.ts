import type { Page, Topic } from '$lib/types'
import type { PageServerLoad } from './$types'
import { readItems } from '@directus/sdk'

export const load: PageServerLoad = async ({ locals, params }) => {
	const { directus } = locals
	const page = await directus.request(
		readItems('pages', {
			filter: { _and: [{ slug: { _eq: params.slug } }] },
			fields: [
				'*',
				{ cards: [{ cards_id: ['*'] }] },
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
	const topic = await directus.request(
		readItems('topics', {
			fields: [
				'*',
				{ category: ['title', 'slug'] },
				{ cards: [{ cards_id: ['*', { media: [{ directus_files_id: ['*'] }] }] }] }
			],
			filter: {
				_and: [
					{
						category: {
							slug: {
								_eq: params.slug
							}
						}
					},
					{
						slug: {
							_eq: params.topic
						}
					}
				]
			}
		})
	)

	return {
		//HACK: remove type assertion
		page: page[0] as Page,
		topic: topic[0] as Topic,
		topics
	}
}
