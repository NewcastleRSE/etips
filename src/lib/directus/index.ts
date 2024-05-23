import { env } from '$env/dynamic/private'
import type { Collections } from '$lib/types'
import { createDirectus, rest, staticToken } from '@directus/sdk'

// console.log(DIRECTUS_URL, DIRECTUS_URL)
const { DIRECTUS_TOKEN, DIRECTUS_URL } = env
export const directus = createDirectus<Collections>(DIRECTUS_URL)
	.with(staticToken(DIRECTUS_TOKEN))
	.with(rest())
