<script lang="ts">
	import type { Card, PagesCard, TopicsCard } from '$lib/types'
	import CardAlert from './card_alert.svelte'
	import CardEmphasis from './card_emphasis.svelte'
	import CardHero from './card_hero.svelte'
	import CardMedia from './card_media.svelte'
	import CardNumbered from './card_numbered.svelte'
	import CardText from './card_text.svelte'
	export let display = 'cards'
	export let cards: PagesCard[] | TopicsCard[]
	export let desktop_left = false
	$: organised_cards = cards.reduce(
		(acc, el, i) => {
			const card = el.cards_id
			if (card && typeof card !== 'string') {
				if (i === 0) {
					acc.push({ type: `${card.position}`, cards: [card] })
					return acc
				}
				if (acc[acc.length - 1] && acc[acc.length - 1].type === card.position) {
					acc[acc.length - 1].cards.push(card)
					return acc
				}
				acc.push({ type: `${card.position}`, cards: [card] })
			}
			return acc
		},
		[] as { type: string; cards: Card[] }[]
	)
</script>

{#if cards.length > 0}
	<div
		class="cards-container mx-4 grid grid-cols-2 overflow-x-hidden md:overflow-y-scroll"
		class:cards={display === 'cards'}
		class:list={display === 'list'}
		class:continuous={display === 'continuous'}
		class:two-columns={display === 'two-columns'}
		class:desktop_left
	>
		{#key organised_cards}
			{#each organised_cards as card_col, i}
				{#if card_col.type === 'full'}
					<div class="full">
						{#each card_col.cards as card}
							{#if card.type === 'text' || card.type === 'rhyme'}
								<CardText {display} {card}></CardText>
							{/if}
							{#if card.type === 'media'}
								<CardMedia {display} {card}></CardMedia>
							{/if}
							{#if card.type === 'numbered'}
								<CardNumbered {display} {card}></CardNumbered>
							{/if}
							{#if card.type === 'emphasis'}
								<CardEmphasis {card}></CardEmphasis>
							{/if}
							{#if card.type === 'alert'}
								<CardAlert {card}></CardAlert>
							{/if}
							{#if card.type === 'hero'}
								<CardHero {card}></CardHero>
							{/if}
							{#if display === 'continuous' && i < cards.length - 1}
								<div class="separator"></div>
							{/if}
						{/each}
					</div>
				{/if}
				{#if card_col.type === 'left'}
					<div class="left">
						{#each card_col.cards as card}
							{#if card.type === 'text' || card.type === 'rhyme'}
								<CardText {display} {card}></CardText>
							{/if}
							{#if card.type === 'media'}
								<CardMedia {display} {card}></CardMedia>
							{/if}
							{#if card.type === 'numbered'}
								<CardNumbered {display} {card}></CardNumbered>
							{/if}
							{#if card.type === 'emphasis'}
								<CardEmphasis {card}></CardEmphasis>
							{/if}
							{#if card.type === 'alert'}
								<CardAlert {card}></CardAlert>
							{/if}
							{#if card.type === 'hero'}
								<CardHero {card}></CardHero>
							{/if}
							{#if display === 'continuous' && i < cards.length - 1}
								<div class="separator"></div>
							{/if}
						{/each}
					</div>
				{/if}
				{#if card_col.type === 'right'}
					<div class="right">
						{#each card_col.cards as card}
							{#if card.type === 'text' || card.type === 'rhyme'}
								<CardText {display} {card}></CardText>
							{/if}
							{#if card.type === 'media'}
								<CardMedia {display} {card}></CardMedia>
							{/if}
							{#if card.type === 'numbered'}
								<CardNumbered {display} {card}></CardNumbered>
							{/if}
							{#if card.type === 'emphasis'}
								<CardEmphasis {card}></CardEmphasis>
							{/if}
							{#if card.type === 'alert'}
								<CardAlert {card}></CardAlert>
							{/if}
							{#if card.type === 'hero'}
								<CardHero {card}></CardHero>
							{/if}
							{#if display === 'continuous' && i < cards.length - 1}
								<div class="separator"></div>
							{/if}
						{/each}
					</div>
				{/if}
			{/each}
		{/key}
	</div>
{/if}

<style>
	.cards-container {
		border-bottom: 1px solid var(--theme-colour-5);
		width: min(100% - 2rem, 1200px);
		margin-inline: auto;
	}
	.cards {
		border: none;
	}
	.full {
		grid-column-start: 1;
		grid-column-end: 3;
	}
	.left {
		grid-column-start: 1;
		grid-column-end: 2;
		margin-right: 0.5rem;
	}
	.right {
		grid-column-start: 2;
		grid-column-end: 3;
		margin-left: 0.5rem;
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
	.two-columns {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
	}
</style>
