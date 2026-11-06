import { env } from '$env/dynamic/private'
import type { Collections } from '$lib/types'
import { createDirectus, rest, staticToken } from '@directus/sdk'

export const directus = createDirectus<Collections>(env.DIRECTUS_URL)
	.with(staticToken(env.DIRECTUS_TOKEN))
	.with(rest())
