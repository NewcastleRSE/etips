import type { Page, Topic } from '$lib/types'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { readItems } from '@directus/sdk'

export const load: PageServerLoad = async ({ locals, params, cookies }) => {
	const { directus } = locals
	// const page = await directus.request(
	// 	readItems('pages', {
	// 		filter: { _and: [{ slug: { _eq: params.slug } }] },
	// 		fields: [
	// 			'id',
	// 			'status',
	// 			'sort',
	// 			'title',
	// 			'category',
	// 			'slug',
	// 			'copy',
	// 			'icon',
	// 			'topics',
	// 			{ cards: [{ cards_id: ['*'] }] },
	// 			{ topics: [{ cards: [{ cards_id: ['*'] }] }] }
	// 		]
	// 	})
	// )
	const topic = await directus.request(
		readItems('topics', {
			fields: [
				'id',
				'status',
				'sort',
				'title',
				'slug',
				'icon',
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
			},
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
	if (
		!cookies.get('etips-side') ||
		!cookies.get('etips-role') ||
		!cookies.get('etips-disclaimer-consent')
	) {
		redirect(307, '/access')
	}
	if (cookies.get('etips-disclaimer-consent') !== 'true') {
		cookies.delete('etips-disclaimer-consent', { path: '/' })
		cookies.delete('etips-role', { path: '/' })
		cookies.delete('etips-side', { path: '/' })
		redirect(307, '/access')
	}
	return {
		//HACK: remove type assertion
		// page: page[0] as Page,
		topic: topic[0] as Topic
		// topics
	}
}
