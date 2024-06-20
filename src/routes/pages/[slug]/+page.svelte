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
<!-- HACK: to get scroll for now -->
<div class="content-container min-h-screen overflow-x-hidden lg:w-full">
	<!-- <pre>{JSON.stringify(data.page, null, 2)}</pre> -->
	{#if data.page.cards}
		<CardsContainer cards={data.page.cards}></CardsContainer>

		<!-- <CardsContainer display={data.topic.display ?? 'cards'} cards={data.topic.cards} -->
		<!-- ></CardsContainer> -->
	{/if}
</div>

<style>
	.content-container {
		width: min(100% - 4rem, 800px);
		margin-inline: auto;
	}
	/* .cards { */
	/* 	border-right: 1px solid var(--theme-colour-4); */
	/* 	border-left: 1px solid var(--theme-colour-4); */
	/* } */
</style>
