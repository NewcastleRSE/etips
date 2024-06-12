import { message } from '$lib/stores/notify.js'
import type { Page } from '$lib/types/index.js'
import { createItem, readItems } from '@directus/sdk'
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
	register: async ({ request, cookies, locals }) => {
		const email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
		const form = await request.formData()
		const disclaimer_consent = String(form.get('disclaimer-consent')) === 'on' ? true : false
		const role = String(form.get('role'))
		const specific_case = String(form.get('specific-case')) === 'on' ? true : false
		const age_weeks = Number(form.get('age-weeks'))
		const preterm = String(form.get('preterm')) === 'on' ? true : false
		const age_preterm = Number(form.get('age-preterm'))
		const side_affected = String(form.get('side-affected')) === 'on' ? 'right' : 'left'
		const gdpr_consent = String(form.get('gdpr-consent')) === 'on' ? true : false
		const job_title = String(form.get('job-title'))
		const first_name = String(form.get('first-name'))
		const last_name = String(form.get('last-name'))
		const email = String(form.get('email'))

		if (!disclaimer_consent) {
			return fail(406, {
				message: `You need to accept the disclaimer to continue`
			})
		}
		if (role !== 'carer' && role !== 'healthcare-professional') {
			return fail(406, {
				message: `The role ${role} doesn't exist...`
			})
		}
		if (role === 'carer') {
			if (Number.isNaN(age_weeks)) {
				return fail(406, {
					message: `Please provide a number for the baby's age`
				})
			}
		}
		if (role === 'healthcare-professional' && specific_case) {
			if (Number.isNaN(age_weeks)) {
				return fail(406, {
					message: `Please provide a number for the baby's age`
				})
			}
		}
		if (preterm) {
			if (Number.isNaN(age_preterm)) {
				return fail(406, {
					message: `Please provide a number for the baby's age`
				})
			}
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
			if (role === 'healthcare-professional' && job_title === '') {
				return fail(406, {
					message: 'Please provide a job title'
				})
			}
		}
		await locals.directus.request(
			createItem('contacts', {
				gdpr_consent,
				role,
				job_title,
				first_name,
				last_name,
				email,
				disclaimer_consent,
				side_affected,
				age_weeks,
				age_preterm
			})
		)
		const cookies_opts = {
			path: '/',
			secure: false,
			// httpOnly: true,
			maxAge: 1 * 60 * 60 * 24 * 30 * 12
		}
		cookies.set('etips-side', side_affected, cookies_opts)
		cookies.set('etips-role', role, cookies_opts)
		cookies.set('etips-disclaimer-consent', `${disclaimer_consent}`, cookies_opts)

		//TODO: manual checks ready, send to directus at this point; also check redirect url so its not manually set
		return {
			status: 200,
			message: 'ok',
			url: `/intro`
		}
	},
	'change-side': async ({ request, cookies }) => {
		const form = await request.formData()
		const side = form.get('side-selection')
		if (
			!cookies.get('etips-disclaimer-consent') ||
			!cookies.get('etips-role') ||
			cookies.get('etips-disclaimer-consent') !== 'true'
		) {
			return fail(400, { message: 'Must register first!' })
		}
		if (side === 'left' || side === 'right') {
			const cookies_opts = {
				path: '/',
				httpOnly: true,
				maxAge: 1 * 60 * 60 * 24 * 30 * 12
			}
			cookies.set('etips-side', side, cookies_opts)
			return {
				message: 'ok'
			}
		}
		return fail(400, {
			message: 'Side must be left or right!'
		})
	},
	reset: async ({ cookies }) => {
		cookies.delete('etips-disclaimer-consent', { path: '/' })
		cookies.delete('etips-role', { path: '/' })
		cookies.delete('etips-side', { path: '/' })
		redirect(307, '/access')
	}
}
