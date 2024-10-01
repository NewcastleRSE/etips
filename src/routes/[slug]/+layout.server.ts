import type { Page } from '$lib/types'
import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from '../$types'
import { error, redirect } from '@sveltejs/kit'
import { verifyAccess } from '$lib/utils/auth'

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
	const accessAllowed = verifyAccess('slug', cookies, locals.bot, page[0].category)
	if (!accessAllowed) redirect(307, '/access')
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
