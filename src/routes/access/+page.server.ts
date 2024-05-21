import type { Page } from '$lib/types/index.js'
import { readItems } from '@directus/sdk'
import { fail, redirect, type Actions } from '@sveltejs/kit'

export const load = async ({ cookies, locals }) => {
	const etips_side = cookies.get('etips-side')
	const etips_role = cookies.get('etips-role')
	const etips_disclaimer_consent = cookies.get('etips-disclaimer-consent')
	if (etips_side || etips_disclaimer_consent || etips_role) {
		redirect(307, '/intro')
	}
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
			deep: {
				cards: {
					_filter: {
						_and: [
							{
								cards_id: {
									type: {
										_eq: 'form'
									}
								}
							}
						]
					}
				}
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
				{ cards: [{ cards_id: ['*'] }] },
				{ topics: [{ cards: [{ cards_id: ['*'] }] }] }
			]
		})
	)
	return {
		page: page[0] as Page
	}
}

export const actions: Actions = {
	register: async ({ request, cookies }) => {
		const email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
		const form = await request.formData()
		// const criteria_met = String(form.get('criteria-met')) === 'on' ? true : false
		const disclaimer_consent = String(form.get('disclaimer-consent')) === 'on' ? true : false
		const gdpr_consent = String(form.get('gdpr-consent')) === 'on' ? true : false
		const side_affected = String(form.get('side-affected')) === 'on' ? 'left' : 'right'
		const first_name = String(form.get('first-name'))
		const last_name = String(form.get('last-name'))
		const email = String(form.get('email'))
		const age_weeks = Number(form.get('age-weeks'))
		// if (!criteria_met) {
		// 	return fail(406, {
		// 		message: `You need to accept the criteria to continue`
		// 	})
		// }
		if (!disclaimer_consent) {
			return fail(406, {
				message: `You need to accept the disclaimer to continue`
			})
		}
		if (gdpr_consent) {
			if (first_name === '') {
				return fail(406, {
					message: `Please provide a name`
				})
			}
			if (last_name === '') {
				return fail(406, {
					message: `Please provide a last name`
				})
			}
			if (!email_regex.test(email)) {
				return fail(406, {
					message: `Please provide a valid email`
				})
			}
		}
		const cookies_opts = {
			path: '/',
			httpOnly: true,
			maxAge: 1 * 60 * 60 * 24 * 30 * 12
		}
		cookies.set('etips-side', side_affected, cookies_opts)
		//TODO: add access role from form!
		cookies.set('etips-role', 'parent', cookies_opts)
		cookies.set('etips-disclaimer-consent', `${disclaimer_consent}`, cookies_opts)

		//TODO: enable right side, right now (he he) only left is enabled

		// if (side_affected === 'right') {
		// 	return fail(406, {
		// 		message: `Only left side right now to avoid confusion, thanks :)`
		// 	})
		// }

		//TODO: manual checks ready, send to directus at this point; also check redirect url so its not manually set
		return {
			status: 200,
			message: 'ok',
			url: `/intro`
		}
	}
}
