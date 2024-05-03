<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/ui/button/button.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	export let data
	//NOTE:assersion to stop ts yell, add checks?
</script>

<div class="content-container min-h-screen w-screen overflow-x-hidden">
	{#if data.page.cards}
		<CardsContainer cards={data.page.cards}></CardsContainer>
	{/if}
	<Button
		label="Go"
		on:click={() => {
			goto('/intro')
		}}
	></Button>
</div>

<style>
	/* .cards { */
	/* 	border-right: 1px solid var(--theme-colour-4); */
	/* 	border-left: 1px solid var(--theme-colour-4); */
	/* } */
</style>
