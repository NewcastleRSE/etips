import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private'
import type { Collections } from '$lib/types'
import { createDirectus, rest, staticToken } from '@directus/sdk'

export const directus = createDirectus<Collections>(DIRECTUS_URL)
	.with(staticToken(DIRECTUS_TOKEN))
	.with(rest())
