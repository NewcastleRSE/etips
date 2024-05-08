<script lang="ts">
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	export let data
</script>

<!-- HACK: to get scroll for now -->
<div class="content-container min-h-screen overflow-x-hidden lg:w-full">
	{#if data.topic.cards}
		<CardsContainer display={data.topic.display ?? 'cards'} cards={data.topic.cards}
		></CardsContainer>
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
