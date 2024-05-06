<script lang="ts">
	import NavTopics from '$lib/ui/nav/nav_topics.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	import { goto } from '$app/navigation'
	export let data
</script>

<!-- HACK: to get scroll for now -->
<div class="content-container min-h-screen w-screen overflow-x-hidden lg:w-full">
	{#if data.topic.cards}
		<CardsContainer display={data.topic.display ?? 'cards'} cards={data.topic.cards}
		></CardsContainer>
	{/if}
</div>

<style>
	/* .cards { */
	/* 	border-right: 1px solid var(--theme-colour-4); */
	/* 	border-left: 1px solid var(--theme-colour-4); */
	/* } */
</style>
