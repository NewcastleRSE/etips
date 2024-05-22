<script lang="ts">
	import type { PagesCard, TopicsCard } from '$lib/types'
	import CardAlert from './card_alert.svelte'
	import CardEmphasis from './card_emphasis.svelte'
	import CardHero from './card_hero.svelte'
	import CardMedia from './card_media.svelte'
	import CardNumbered from './card_numbered.svelte'
	import CardText from './card_text.svelte'
	export let display = 'cards'
	export let cards: PagesCard[] | TopicsCard[]
	export let desktop_left = false
</script>

{#if cards.length > 0}
	<div
		class="cards-container mx-4 overflow-x-hidden md:overflow-y-scroll"
		class:cards={display === 'cards'}
		class:list={display === 'list'}
		class:continuous={display === 'continuous'}
		class:two-columns={display === 'two-columns'}
		class:desktop_left
	>
		{#key cards}
			{#each cards as card, i}
				<!-- <div class="card-position-wrapper {card.cards_id.position}"> -->
				{#if card.cards_id && typeof card.cards_id !== 'string' && card.cards_id.position === 'full'}
					{#if card.cards_id && typeof card.cards_id !== 'string'}
						{#if card.cards_id.type === 'text' || card.cards_id.type === 'rhyme'}
							<CardText {display} card={card.cards_id}></CardText>
						{/if}
						{#if card.cards_id.type === 'media'}
							<CardMedia {display} card={card.cards_id}></CardMedia>
						{/if}
						{#if card.cards_id.type === 'numbered'}
							<CardNumbered {display} card={card.cards_id}></CardNumbered>
						{/if}
						{#if card.cards_id.type === 'emphasis'}
							<CardEmphasis card={card.cards_id}></CardEmphasis>
						{/if}
						{#if card.cards_id.type === 'alert'}
							<CardAlert card={card.cards_id}></CardAlert>
						{/if}
						{#if card.cards_id.type === 'hero'}
							<CardHero card={card.cards_id}></CardHero>
						{/if}
					{/if}
					{#if display === 'continuous' && i < cards.length - 1}
						<div class="separator"></div>
					{/if}
				{/if}
				<!-- </div> -->
			{/each}
			<div class="cards-container-columns lg:grid lg:grid-cols-2 lg:gap-8">
				<div class="cards-container-left-col">
					{#each cards as card, i}
						<!-- <div class="card-position-wrapper {card.cards_id.position}"> -->
						{#if card.cards_id && typeof card.cards_id !== 'string' && card.cards_id.position === 'left'}
							{#if card.cards_id && typeof card.cards_id !== 'string'}
								{#if card.cards_id.type === 'text' || card.cards_id.type === 'rhyme'}
									<CardText {display} card={card.cards_id}></CardText>
								{/if}
								{#if card.cards_id.type === 'media' || card.cards_id.type === 'hero'}
									<CardMedia {display} card={card.cards_id}></CardMedia>
								{/if}
								{#if card.cards_id.type === 'numbered'}
									<CardNumbered {display} card={card.cards_id}></CardNumbered>
								{/if}
								{#if card.cards_id.type === 'emphasis'}
									<CardEmphasis card={card.cards_id}></CardEmphasis>
								{/if}
								{#if card.cards_id.type === 'alert'}
									<CardAlert card={card.cards_id}></CardAlert>
								{/if}
							{/if}
							{#if display === 'continuous' && i < cards.length - 1}
								<div class="separator"></div>
							{/if}
						{/if}
						<!-- </div> -->
					{/each}
				</div>
				<div class="cards-container-right-col">
					{#each cards as card, i}
						<!-- <div class="card-position-wrapper {card.cards_id.position}"> -->
						{#if card.cards_id && typeof card.cards_id !== 'string' && card.cards_id.position === 'right'}
							{#if card.cards_id && typeof card.cards_id !== 'string'}
								{#if card.cards_id.type === 'text' || card.cards_id.type === 'rhyme'}
									<CardText {display} card={card.cards_id}></CardText>
								{/if}
								{#if card.cards_id.type === 'media' || card.cards_id.type === 'hero'}
									<CardMedia {display} card={card.cards_id}></CardMedia>
								{/if}
								{#if card.cards_id.type === 'numbered'}
									<CardNumbered {display} card={card.cards_id}></CardNumbered>
								{/if}
								{#if card.cards_id.type === 'emphasis'}
									<CardEmphasis card={card.cards_id}></CardEmphasis>
								{/if}
								{#if card.cards_id.type === 'alert'}
									<CardAlert card={card.cards_id}></CardAlert>
								{/if}
							{/if}
							{#if display === 'continuous' && i < cards.length - 1}
								<div class="separator"></div>
							{/if}
						{/if}
						<!-- </div> -->
					{/each}
				</div>
			</div>
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
		margin-right: 1rem;
	}
	.right {
		grid-column-start: 2;
		grid-column-end: 3;
		margin-left: 1rem;
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
