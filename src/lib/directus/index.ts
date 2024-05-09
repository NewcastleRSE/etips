// import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private'
import { directus_url, directus_token } from '$lib/utils/env'
import type { Collections } from '$lib/types'
import { createDirectus, rest, staticToken } from '@directus/sdk'

export const directus = createDirectus<Collections>(directus_url)
	.with(staticToken(directus_token))
	.with(rest())
