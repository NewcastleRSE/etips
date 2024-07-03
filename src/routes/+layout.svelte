<script lang="ts">
	import '@fontsource-variable/league-spartan'
	import '@fontsource-variable/nunito'
	import '@fontsource-variable/libre-franklin'
	import '@fontsource/jua'
	import Nav from '$lib/ui/nav/nav.svelte'
	import { onMount } from 'svelte'
	import '../app.pcss'
	// import { theme } from '$lib/stores/theme'
	import Footer from '$lib/ui/footer/footer.svelte'
	import Notification from '$lib/ui/notify/notification.svelte'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { navigated } from '$lib/stores/layout'
	import Button from '$lib/ui/button/button.svelte'
	import Reset from '$lib/dialogs/reset.svelte'
	import { side } from '$lib/stores/layout'
	import { PUBLIC_ANALYTICS_DOMAIN, PUBLIC_ANALYTICS_WEBSITE_ID } from '$env/static/public'
	export let data
	$side = data.side
	let debug = false
	let navigations = 0
	let navigating = false
	beforeNavigate(() => {
		navigating = true
	})
	afterNavigate(() => {
		navigating = false
		if (navigations >= 1) {
			$navigated = true
		}
		navigations++
	})
	const theme = {
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
	}

	onMount(() => {
		// theme.load(
		// 	{
		// 		dark: false,
		// 		fonts: [
		// 			{ name: 'Jua', type: 'sans-serif', key: 'title' },
		// 			{ name: 'Nunito Variable', type: 'sans-serif', key: 'title-2' },
		// 			{ name: 'Libre Franklin Variable', type: 'sans-serif', key: 'paragraph' },
		// 			{ name: 'League Spartan Variable', type: 'sans-serif', key: 'subtitle' }
		// 		],
		// 		colours: ['#FFFDF9', '#F2F9EB', '#013A67', '#44B3CE', '#609A29', '#EA931F', '#BF0034'],
		// 		version: '0.0.1',
		// 		language: 'en',
		// 		reduce_animation: false
		// 	},
		// 	'etips-theme',
		// 	'#theme-wrapper'
		// )
	})
</script>

<svelte:head>
	<script
		defer
		src="{PUBLIC_ANALYTICS_DOMAIN}/script.js"
		data-website-id={PUBLIC_ANALYTICS_WEBSITE_ID}
	></script>
</svelte:head>

{#if debug}
	<pre class="text-xs">{JSON.stringify(data, null, 2)}</pre>
{/if}
<div
	id="theme-wrapper"
	class="lg:h-screen lg:w-screen lg:overflow-hidden"
	style:--theme-colour-1={theme.colours[0]}
	style:--theme-colour-2={theme.colours[1]}
	style:--theme-colour-3={theme.colours[2]}
	style:--theme-colour-4={theme.colours[3]}
	style:--theme-colour-5={theme.colours[4]}
	style:--theme-colour-6={theme.colours[5]}
	style:--theme-colour-7={theme.colours[6]}
	style:--theme-font-title={theme.fonts[0].name}
	style:--theme-font-title-2={theme.fonts[1].name}
	style:--theme-font-paragraph={theme.fonts[2].name}
	style:--theme-font-subtitle={theme.fonts[3].name}
>
	<Notification></Notification>
	<Nav {navigating} copy={data.copy}></Nav>
	<main
		class="relative w-screen pb-12 lg:grid lg:h-[calc(100%-8rem)] lg:grid-cols-1 lg:overflow-hidden lg:pb-0"
	>
		<slot></slot>
	</main>
	<Footer {data}></Footer>
	<Reset {data}></Reset>
</div>

<style>
	#theme-wrapper {
		background: var(--theme-colour-1);
	}
	main {
		background-color: var(--theme-colour-2);
	}
</style>
