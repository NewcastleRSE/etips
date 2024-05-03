<script lang="ts">
	import Nav from '$lib/ui/nav/nav.svelte'
	import { onMount } from 'svelte'
	import '../app.pcss'
	import { theme } from '$lib/stores/theme'
	import Footer from '$lib/ui/footer/footer.svelte'
	import Notification from '$lib/ui/notify/notification.svelte'
	export let data
	let debug = false
	onMount(() => {
		theme.load(
			{
				dark: false,
				fonts: [{ name: 'Helvetica', type: 'sans-serif', key: 'title' }],
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

<div id="theme-wrapper">
	<Notification></Notification>
	<Nav></Nav>
	<main
		class="relative grid h-full w-screen grid-cols-1 md:grid-cols-[minmax(0,3fr),minmax(0,6fr)]"
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
