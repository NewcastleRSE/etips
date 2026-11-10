import type { MiniGuide, Page } from '$lib/types'
import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from '../$types'
import { error, redirect } from '@sveltejs/kit'
import { verifyAccess } from '$lib/utils/auth'

// Languages in the order set in Directus, then alphabetically
const byLanguage = (a: MiniGuide, b: MiniGuide) => {
	const la = typeof a.language === 'object' ? a.language : null
	const lb = typeof b.language === 'object' ? b.language : null
	return (la?.sort ?? 0) - (lb?.sort ?? 0) || (la?.name ?? '').localeCompare(lb?.name ?? '')
}

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

	// Mini guides for the visitor's side, used by the mini_guide card. Falls back to
	// none so pages still load if the collection is missing or unreadable
	const side = locals.session.side
	const mini_guides =
		side === 'left' || side === 'right'
			? await directus
					.request(
						readItems('mini_guides', {
							fields: [
								'id',
								{ language: ['code', 'name', 'native_name', 'sort'] },
								{ file: ['id', 'filesize'] }
							],
							filter: { status: { _eq: 'published' }, side: { _eq: side } },
							limit: -1
						})
					)
					.catch(() => [])
			: []

	return {
		//HACK: remove type assertion
		page: page[0] as Page,
		topics,
		mini_guides: (mini_guides as MiniGuide[]).sort(byLanguage)
	}
}
