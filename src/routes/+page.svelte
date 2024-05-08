<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/ui/button/button.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	export let data
	$: cards = data.page.cards.filter((c) => c.cards_id?.type === 'hero')
	//NOTE:assersion to stop ts yell, add checks?
</script>

<div class="content-container min-h-screen overflow-x-hidden lg:col-span-full">
	{#if data.page.cards}
		<CardsContainer {cards}></CardsContainer>
	{/if}
	<div class="button-wrapper flex h-12 w-full items-center justify-center px-4 lg:w-96">
		<Button
			label="Go"
			on:click={() => {
				goto('/access')
			}}
		></Button>
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
