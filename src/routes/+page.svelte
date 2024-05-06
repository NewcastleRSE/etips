<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/ui/button/button.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	export let data
	//NOTE:assersion to stop ts yell, add checks?
</script>

<div
	class="content-container flex min-h-screen flex-col items-center overflow-x-hidden lg:col-span-full"
>
	{#if data.page.cards}
		<CardsContainer cards={data.page.cards}></CardsContainer>
	{/if}
	<div class="button-wrapper flex h-12 w-full items-center justify-center px-4 lg:w-96">
		<Button
			label="Go"
			on:click={() => {
				goto('/intro')
			}}
		></Button>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.content-container {
			width: min(100%, 1200px);
			margin-inline: auto;
		}
	}

	/* .cards { */
	/* 	border-right: 1px solid var(--theme-colour-4); */
	/* 	border-left: 1px solid var(--theme-colour-4); */
	/* } */
</style>
