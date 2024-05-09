// import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private'
import { directus_token, directus_url } from '$lib/utils/env.js'
import { assetEndpoint } from '@arturoguzman/art-ui'

export const GET = async ({ url, fetch, params }) => {
	return assetEndpoint(
		params.id,
		`${directus_url}/assets`,
		fetch,
		encodeURI(url.searchParams.toString()),
		directus_token
	)
}
