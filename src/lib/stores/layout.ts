import { writable } from 'svelte/store'
export const navigated = writable(false)
export const windowStore = writable()
export const side = writable<string>()
