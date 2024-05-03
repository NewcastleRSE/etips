<script lang="ts">
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	export let data
</script>

<!-- HACK: to get scroll for now -->
<div class="content-container min-h-screen w-screen overflow-x-hidden">
	{#if data.page.cards}
		<CardsContainer cards={data.page.cards}></CardsContainer>
	{/if}
</div>

<style>
	/* .cards { */
	/* 	border-right: 1px solid var(--theme-colour-4); */
	/* 	border-left: 1px solid var(--theme-colour-4); */
	/* } */
</style>
