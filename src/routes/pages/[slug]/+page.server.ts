import type { Page } from '$lib/types'
import { readItems } from '@directus/sdk'
import { error, redirect } from '@sveltejs/kit'

export const load = async ({ locals, params, cookies }) => {
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
				}
			}
		})
	)
	// const topics = await directus.request(
	// 	readItems('topics', {
	// 		fields: ['*', { category: ['title', 'slug'] }, { cards: [{ cards_id: ['*'] }] }],
	// 		filter: {
	// 			category: {
	// 				slug: {
	// 					_eq: params.slug
	// 				}
	// 			}
	// 		}
	// 	})
	// )

	return {
		//HACK: remove type assertion
		page: page[0] as Page
		// topics
	}
}
