<script lang="ts">
	import type { PagesCard, TopicsCard } from '$lib/types'
	import CardMedia from './card_media.svelte'
	import CardText from './card_text.svelte'
	export let display = 'continuous'
	export let cards: PagesCard[] | TopicsCard[]
</script>

{#if cards.length > 0}
	<div
		class="cards-container max-w-screen mx-4 mb-12 overflow-x-hidden"
		class:cards={display === 'cards'}
		class:list={display === 'list'}
		class:continuous={display === 'continuous'}
	>
		{#each cards as card}
			{#if card.cards_id && typeof card.cards_id !== 'string'}
				{#if card.cards_id.type === 'text'}
					<CardText {display} card={card.cards_id}></CardText>
				{/if}
				{#if card.cards_id.type === 'media'}
					<CardMedia {display} card={card.cards_id}></CardMedia>
				{/if}
			{/if}
		{/each}
	</div>
{/if}

<style>
	.cards-container {
		border-bottom: 1px solid var(--theme-colour-5);
	}
	.cards {
		border: none;
	}
	.list {
		border-left: 1px solid var(--theme-colour-5);
		border-right: 1px solid var(--theme-colour-5);
		background-color: var(--theme-colour-1);
	}
	.continuous {
		border-left: 1px solid var(--theme-colour-5);
		border-right: 1px solid var(--theme-colour-5);
		background-color: var(--theme-colour-1);
	}
</style>
