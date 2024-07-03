import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from './$types'
import type { Page } from '$lib/types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const { directus } = locals
	const page = await directus.request(
		readItems('pages', {
			filter: {
				_and: [
					{
						category: {
							_eq: 'home'
						}
					}
				]
			},
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
				{ cards: [{ cards_id: [{ media: [{ directus_files_id: ['*'] }] }, '*'] }] },
				{ topics: [{ cards: [{ cards_id: ['*'] }] }] }
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
	return {
		page: page[0] as Page
	}
}
