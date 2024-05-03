import { browser } from '$app/environment'
import { writable } from 'svelte/store'
// import { websiteHeight } from './layout'

export type Font = {
	name: string
	key: string
	type: 'monospace' | 'sans-serif' | 'serif'
}

export type ThemeStore = {
	version: string
	language: string
	dark: boolean
	reduce_animation: boolean
	fonts: Font[]
	colours: string[]
}

export const theme = (() => {
	const version = '1.0.0'
	const { subscribe, set, update } = writable<ThemeStore>()
	function load(_theme: ThemeStore, key: string, element?: HTMLElement | string) {
		_theme = readLocal(_theme, key)
		_theme = element ? setColours(_theme, element) : _theme
		_theme = element ? setFonts(_theme) : _theme
		return _theme
	}

	function readLocal(theme: ThemeStore, key: string) {
		if (browser) {
			const localStorageTheme = localStorage.getItem(key)
			if (localStorageTheme) {
				const parsed = JSON.parse(localStorageTheme)
				return parsed.version === version ? parsed : theme
			}
		}
		return theme
	}

	function setColours(theme: ThemeStore, element: HTMLElement | string) {
		if (browser) {
			const el =
				typeof element === 'string' ? document.querySelector<HTMLElement>(element) : element
			if (el) {
				let index = 1
				for (const colour of theme.colours) {
					el.style.setProperty(`--theme-colour-${index}`, colour)
					index++
				}
			}
		}
		return theme
	}

	function setLanguage(theme: ThemeStore, element) {
		return theme
	}

	function setFonts(theme: ThemeStore) {
		if (browser) {
			for (const font of theme.fonts) {
				document.documentElement.style.setProperty(`--theme-font-${font.key}`, font.name)
			}
		}
		return theme
	}

	// function fonts(entry: 'title' | 'paragraph') {
	// 	let fonts = ''
	// 	const unsub = subscribe((store) => {
	// 		fonts = `${store.font[entry].reduce((acc, e, i, a) => {
	// 			let res = ''
	// 			if (i === 0) {
	// 				res = e
	// 			} else {
	// 				res = `${acc}, ${e}`
	// 			}
	// 			return res
	// 		}, '')}, system-ui, -apple-system, Helvetica Neue, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji`
	// 	})
	// 	unsub()
	// 	return fonts
	// }

	// function toggleTheme() {
	// 	const htmlEl = document.querySelector('html') as HTMLHtmlElement
	// 	update((st) => {
	// 		if (st.dark) {
	// 			st.colour.background = 'white'
	// 			st.colour.font = 'black'
	// 			st.dark = false
	// 			htmlEl.style.backgroundColor = 'white'
	// 		} else {
	// 			st.colour.background = 'black'
	// 			st.colour.font = 'white'
	// 			st.dark = true
	// 			htmlEl.style.backgroundColor = 'black'
	// 		}
	// 		return st
	// 	})
	// }

	// function setLanguage(lang: string) {
	// 	update((st) => {
	// 		st.language = lang
	// 		return st
	// 	})
	// }

	return {
		load,
		subscribe,
		// fonts,
		set,
		update,
		// toggleTheme,
		setLanguage
	}
})()

export const state = (() => {
	const { set, update, subscribe } = writable<{
		loaded: boolean
		loadingProgress: number
		step: string
		sections: { name: string; height: number; top: number; bottom: number; range: number[] }[]
		height: number
	}>({
		loaded: false,
		loadingProgress: 0,
		step: 'home',
		sections: [],
		height: 0
	})
	function loaded() {
		update((st) => {
			st.loaded = true
			return st
		})
	}
	function readDom(el: string) {
		if (browser) {
			const selector = document.querySelectorAll(el)
			const landingContainer = selector[0]
			const sections = landingContainer.querySelectorAll('[data-structure]')
			update((st) => {
				st.height = 0
				st.sections = []
				sections.forEach((e) => {
					const toAdd = {
						name: e.getAttribute('data-structure') || '',
						height: e.getBoundingClientRect().height,
						top: st.height,
						bottom: st.height + e.getBoundingClientRect().height,
						range: [Math.round(st.height), Math.round(st.height + e.getBoundingClientRect().height)]
					}
					st.height += e.getBoundingClientRect().height
					st.sections.push(toAdd)
					const mainElement = document.querySelector('main')
					// if (mainElement) {
					// 	websiteHeight.set(mainElement.clientHeight)
					// }
				})
				return st
			})
		}
	}
	function setStep(currentScroll: number) {
		const windowCompensation = 25
		update((st) => {
			const section = st.sections.find(
				(e) =>
					currentScroll >= e.range[0] - windowCompensation &&
					currentScroll <= e.range[1] - windowCompensation
			)

			st.step = section?.name || 'error :('
			return st
		})
	}
	return {
		subscribe,
		readDom,
		setStep,
		loaded,
		update
	}
})()
