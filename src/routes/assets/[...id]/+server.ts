import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private'
import { assetEndpoint } from '@arturoguzman/art-ui'

export const GET = async ({ url, fetch, params }) => {
	return assetEndpoint(
		params.id,
		`${DIRECTUS_URL}/assets`,
		fetch,
		encodeURI(url.searchParams.toString()),
		DIRECTUS_TOKEN
	)
}
