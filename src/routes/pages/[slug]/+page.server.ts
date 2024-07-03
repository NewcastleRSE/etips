import type { Page } from '$lib/types'
import { readItems } from '@directus/sdk'

export const load = async ({ locals, params }) => {
	const { directus } = locals
	const page = await directus.request(
		readItems('pages', {
			filter: { _and: [{ slug: { _eq: params.slug } }] },
			fields: [
				'id',
				'status',
				'sort',
				'title',
				'category',
				'slug',
				'copy',
				'icon',
				'topics',
				{ cards: [{ cards_id: ['*', { media: [{ directus_files_id: ['*'] }] }] }] },
				{ topics: [{ cards: [{ cards_id: ['*'] }] }, 'title', 'slug'] }
			],
			deep: {
				cards: {
					_filter: {
						_or: [
							{
								cards_id: {
									category: {
										_eq: 'all'
									}
								}
							},
							{
								cards_id: {
									category: {
										_eq: 'twin'
									}
								}
							},
							{
								cards_id: {
									category: {
										_eq: locals.session.side
									}
								}
							}
						]
					}
				},
				topics: {
					_filter: {
						status: {
							_eq: 'published'
						}
					}
				}
			}
		})
	)

	return {
		//HACK: remove type assertion
		page: page[0] as Page
		// topics
	}
}
