import { readItems } from '@directus/sdk'
import { fail, type Actions } from '@sveltejs/kit'

const getResults = async (query: string, directus: App.Locals['directus'], side: string) => {
	return directus
		.request(
			readItems('topics', {
				deep: {
					cards: {
						_filter: {
							_and: [
								{
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
													_eq: side
												}
											}
										}
									]
								},
								{
									_or: [
										{
											cards_id: {
												title: {
													_icontains: query.trim()
												}
											}
										},
										{
											cards_id: {
												subtitle: {
													_icontains: query.trim()
												}
											}
										},
										{
											cards_id: {
												copy: {
													_icontains: query.trim()
												}
											}
										}
									]
								}
							]
						}
					}
				},
				fields: ['title', 'slug', { category: ['slug', 'title'] }, { cards: [{ cards_id: ['*'] }] }]
			})
		)
		.then((res) => {
			const data = res.filter((topic) => topic.cards && topic.cards.length > 0)
			return data
		})
}

export const load = async ({ locals, url }) => {
	const query = url.searchParams.get('query')
	if (query === null || query === undefined || query === '') {
		return {
			results: []
		}
	}
	return {
		results: await getResults(query, locals.directus, locals.session.side)
	}
}

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const form = await request.formData()
		const query = String(form.get('query'))
		if (query === '' || query === 'undefined' || query === 'null' || !query || query.length === 0) {
			return fail(400)
		}
		return {
			status: 200,
			message: 'ok',
			results: await getResults(query, locals.directus),
			query: query
		}
	}
}
