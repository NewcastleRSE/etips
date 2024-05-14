<script lang="ts">
	import '@fontsource-variable/league-spartan'
	import '@fontsource-variable/nunito'
	import '@fontsource-variable/libre-franklin'
	import '@fontsource/jua'
	import Nav from '$lib/ui/nav/nav.svelte'
	import { onMount } from 'svelte'
	import '../app.pcss'
	import { theme } from '$lib/stores/theme'
	import Footer from '$lib/ui/footer/footer.svelte'
	import Notification from '$lib/ui/notify/notification.svelte'
	import { afterNavigate } from '$app/navigation'
	import { navigated } from '$lib/stores/layout'
	export let data
	let debug = false
	let navigations = 0
	afterNavigate(() => {
		if (navigations >= 1) {
			$navigated = true
		}
		navigations++
	})
	onMount(() => {
		theme.load(
			{
				dark: false,
				fonts: [
					{ name: 'Jua', type: 'sans-serif', key: 'title' },
					{ name: 'Nunito Variable', type: 'sans-serif', key: 'title-2' },
					{ name: 'Libre Franklin Variable', type: 'sans-serif', key: 'paragraph' },
					{ name: 'League Spartan Variable', type: 'sans-serif', key: 'subtitle' }
				],
				colours: ['#FFFDF9', '#F2F9EB', '#013A67', '#44B3CE', '#609A29', '#EA931F', '#BF0034'],
				version: '0.0.1',
				language: 'en',
				reduce_animation: false
			},
			'etips-theme',
			'#theme-wrapper'
		)
	})
</script>

{#if debug}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/if}

<div id="theme-wrapper" class="lg:h-screen lg:w-screen lg:overflow-hidden">
	<Notification></Notification>
	<Nav></Nav>
	<main
		class="relative w-screen pb-12 lg:grid lg:h-[calc(100%-8rem)] lg:grid-cols-1 lg:overflow-hidden lg:pb-0"
	>
		<slot></slot>
	</main>
	<Footer></Footer>
</div>

<style>
	#theme-wrapper {
		background: var(--theme-colour-1);
	}
	main {
		background-color: var(--theme-colour-2);
	}
</style>
