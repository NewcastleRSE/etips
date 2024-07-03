<script lang="ts">
	import { page } from '$app/stores'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import { genTitle } from '$lib/utils/seo.js'
	export let data
</script>

<svelte:head>
	{#key $page}
		<title>{genTitle([$page.params.slug, $page.params.topic])}</title>
	{/key}
</svelte:head>
<div class="content-container h-full overflow-x-hidden lg:w-full">
	{#if data.page.cards}
		<CardsContainer cards={data.page.cards}></CardsContainer>
	{/if}
</div>

<style>
	.content-container {
		width: min(100% - 4rem, 800px);
		margin-inline: auto;
	}
</style>
