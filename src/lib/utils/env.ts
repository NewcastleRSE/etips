import { DIRECTUS_TOKEN, DIRECTUS_URL } from '$env/static/private'

export const directus_token = DIRECTUS_TOKEN ?? process.env.DIRECTUS_TOKEN
export const directus_url = DIRECTUS_URL ?? process.env.DIRECTUS_URL
