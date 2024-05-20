import { readItems } from '@directus/sdk'
import type { LayoutServerLoad } from './$types'
import type { Page } from '$lib/types'
import { fail } from '@sveltejs/kit'

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
				'*',
				{ cards: [{ cards_id: [{ media: [{ directus_files_id: ['*'] }] }, '*'] }] },
				{ topics: [{ cards: [{ cards_id: ['*'] }] }] }
			]
		})
	)
	return {
		page: page[0] as Page
	}
}

export const actions = {
	'change-side': async ({ request, cookies }) => {
		const form = await request.formData()
		const side = form.get('side-selection')
		if (side === 'left' || side === 'right') {
			const cookies_opts = {
				path: '/',
				httpOnly: true,
				maxAge: 1 * 60 * 60 * 24 * 30 * 12
			}
			console.log(side)
			cookies.set('etips-side', side, cookies_opts)
			return {
				message: 'ok'
			}
		}
		return fail(400, {
			message: 'Side must be left or right!'
		})
	}
}
