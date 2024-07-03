import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load = async ({ locals }) => {
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
					{ topics: ['*'] }
				],
				deep: {
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
		.catch(() => error(500, `Backend is not reachable right now...`))
	return {
		sitemap: pages
	}
}
