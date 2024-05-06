<script lang="ts">
	import type { PagesCard, TopicsCard } from '$lib/types'
	import CardMedia from './card_media.svelte'
	import CardText from './card_text.svelte'
	export let display = 'continuous'
	export let cards: PagesCard[] | TopicsCard[]
	export let desktop_left = false
</script>

{#if cards.length > 0}
	<div
		class="cards-container mx-4 mb-12 overflow-x-hidden"
		class:cards={display === 'cards'}
		class:list={display === 'list'}
		class:continuous={display === 'continuous'}
		class:desktop_left
	>
		{#each cards as card, i}
			{#if card.cards_id && typeof card.cards_id !== 'string'}
				{#if card.cards_id.type === 'text'}
					<CardText {display} card={card.cards_id}></CardText>
				{/if}
				{#if card.cards_id.type === 'media'}
					<CardMedia {display} card={card.cards_id}></CardMedia>
				{/if}
			{/if}
			{#if display === 'continuous' && i < cards.length - 1}
				<div class="separator"></div>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.cards-container {
		border-bottom: 1px solid var(--theme-colour-5);
		width: min(100% - 2rem, 600px);
		margin-inline: auto;
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
	.desktop_left {
		border-left: 0;
		border-right: 0;
	}
	.separator {
		border-bottom: 1px solid
			color-mix(in oklab, var(--theme-colour-5) 60%, var(--theme-colour-1) 100%);
		width: 70%;
		margin-inline: auto;
	}
</style>
