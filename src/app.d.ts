// See https://kit.svelte.dev/docs/types#app
/// <reference types="svelte-adapter-azure-swa" />

import type { Collections } from '$lib/types'
import type { DirectusClient, RestClient, StaticTokenClient } from '@directus/sdk'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			directus: DirectusClient<Collections> &
				StaticTokenClient<Collections> &
				RestClient<Collections>
			session: {
				side: string
				role: string
			}
			startTimer: number
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
