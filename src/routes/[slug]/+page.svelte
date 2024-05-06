<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import Button from '$lib/ui/button/button.svelte'
	import CardsContainer from '$lib/ui/cards/cards_container.svelte'
	export let data
</script>

<!-- HACK: to get scroll for now -->
<div class="content-container min-h-screen w-screen overflow-x-hidden lg:w-full">
	{#if data.page.cards}
		<div class="content-mobile lg:hidden">
			<CardsContainer cards={data.page.cards}></CardsContainer>
			{#if data.page.topics && data.page.cards.length === 0}
				{#each data.page.topics as topic}
					<div class="m-4 h-12">
						<Button
							label={topic.title}
							on:click={() => {
								goto(`/${$page.params.slug}/${topic.slug}`)
							}}
						></Button>
					</div>
				{/each}
			{/if}
		</div>
		<div class="content-desktop hidden h-full lg:block">
			{#if data.page.topics}
				{#each data.page.topics as topic}
					<div class="available-topics-button m-8 h-12">
						<Button
							label={topic.title}
							on:click={() => {
								goto(`/${$page.params.slug}/${topic.slug}`)
							}}
						></Button>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	.content-mobile {
		margin-inline: auto;
	}
	/* .cards { */
	/* 	border-right: 1px solid var(--theme-colour-4); */
	/* 	border-left: 1px solid var(--theme-colour-4); */
	/* } */
</style>
