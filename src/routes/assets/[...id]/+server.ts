import { env } from '$env/dynamic/private'
import { assetEndpoint } from '@arturoguzman/art-ui'

export const GET = async ({ url, fetch, params }) => {
	return assetEndpoint(
		params.id,
		`${env.DIRECTUS_URL}/assets`,
		fetch,
		encodeURI(url.searchParams.toString()),
		env.DIRECTUS_TOKEN
	)
}
