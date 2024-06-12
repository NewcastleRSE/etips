<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$lib/ui/button/button.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import { genTitle } from '$lib/utils/seo.js'
	export let data
	$: cards = data.page.cards.filter((c) => c.cards_id?.type === 'hero')
	//NOTE:assersion to stop ts yell, add checks?
</script>

<svelte:head>
	{#key $page}
		<title>{genTitle(['Welcome'])}</title>
	{/key}
</svelte:head>

<div class="content-container overflow-y-scroll">
	{#if data.page.cards}
		<CardsContainer {cards}></CardsContainer>
	{/if}
	<div class="button-wrapper mb-6 flex h-12 w-full items-center justify-center px-4 lg:w-96">
		<Button
			label="Access the materials"
			on:click={() => {
				goto('/access')
			}}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="icon icon-tabler icon-tabler-arrow-right absolute right-8 top-1/2 -translate-y-1/2"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="#44B3CE"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M5 12l14 0" />
				<path d="M13 18l6 -6" />
				<path d="M13 6l6 6" />
			</svg></Button
		>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.content-container {
			width: min(100%, 1000px);
			margin-inline: auto;
		}
	}
</style>
