import type { Page } from '$lib/types'
import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from '../$types'
import { error, redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals, params, cookies }) => {
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
				{ topics: [{ cards: [{ cards_id: ['*'] }] }, 'title', 'slug', 'icon'] }
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
	if (page.length === 0) {
		error(404, `${params.slug} doesn't exist...`)
	}
	if (
		(page[0].category === 'restricted' || page[0].category === 'restricted_hcp') &&
		(!cookies.get('etips-side') ||
			!cookies.get('etips-role') ||
			!cookies.get('etips-disclaimer-consent'))
	) {
		redirect(307, '/access')
	}
	if (cookies.get('etips-disclaimer-consent') !== 'true') {
		cookies.delete('etips-disclaimer-consent', { path: '/' })
		cookies.delete('etips-role', { path: '/' })
		cookies.delete('etips-side', { path: '/' })
		redirect(307, '/access')
	}
	if (page[0].category !== 'restricted' && page[0].category !== 'restricted_hcp') {
		console.log('wheenenenenenn')
		redirect(307, '/access')
	}
	const topics = await directus.request(
		readItems('topics', {
			fields: ['*', { category: ['title', 'slug'] }, { cards: [{ cards_id: ['*'] }] }],
			filter: {
				status: {
					_eq: 'published'
				},
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
