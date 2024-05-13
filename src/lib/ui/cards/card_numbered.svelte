<script lang="ts">
	import type { Card } from '$lib/types'
	import { Picture } from '@arturoguzman/art-ui'
	import CardText from './card_text.svelte'
	import Gallery from '../media/gallery.svelte'
	export let card: Card
	export let display = 'cards'
	export let nested = false
</script>

{#if card}
	<div
		class:card-cards={display === 'cards'}
		class:card-list={display === 'list'}
		class:card-continuous={display === 'continuous'}
		class="card-numbered relative flex grid-rows-1 flex-col lg:grid"
		class:grid-cols-2={card.media?.length > 0}
		class:nested
	>
		<div class="card-numbered-left-col mb-4 flex">
			<div class="card-numbered-number mb-4 ml-4 mt-4 flex-shrink-0 p-2 text-sm lg:text-2xl">
				{card.number}
			</div>
			<div class="card-numbered-copy mt-4 px-4">
				<CardText {card} nested></CardText>
			</div>
		</div>
		{#if card.media && card.media?.length > 0}
			<div class="card-numbered-right-col">
				<Gallery media={card.media}></Gallery>
			</div>
		{/if}
	</div>
{/if}

<style>
	.card-numbered-number {
		width: 2rem;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 3px;
		font-weight: 600;
		font-family: var(--theme-font-title);
		color: var(--theme-colour-1);
		background-color: color-mix(in oklab, var(--theme-colour-5) 95%, white 10%);
		/* border: 2px solid var(--theme-colour-5); */
	}
	@keyframes appear {
		0% {
			transform: translate(0%, -5%);
			opacity: 0;
		}
		100% {
			opacity: 1;
			transform: translate(0%, 0%);
		}
	}
	:global(.card-text) {
		color: var(--theme-colour-3);
	}
	.card-list:not(.nested) {
		background-color: var(--theme-colour-1);
		border-top: 1px solid var(--theme-colour-5);
	}
	.card-list:nth-child(1):not(.nested) {
		border-top: none;
	}
	.card-list:last-child:not(.nested) {
		border-bottom: 1px solid var(--theme-colour-5);
	}
	.card-cards:not(.nested) {
		margin: 1rem 0;
		border-radius: 0.5rem;
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-colour-5);
	}
	.card-continuous:not(.nested) {
		margin: 1.5rem 0;
	}
	@media (min-width: 1080px) {
		.card-numbered-number {
			width: 3rem;
			height: 3rem;
			/* border: 2px solid var(--theme-colour-5); */
		}
	}

	:global(.copy > h3) {
		font-size: 1.5rem /* 24px */;
		line-height: 2rem /* 32px */;
		font-family: var(--theme-font-title-2);
		font-weight: 700;
	}
	:global(.copy > h4) {
		font-size: 1.15rem;
		line-height: 1.25rem;
		font-family: var(--theme-font-subtitle);
		font-weight: 400;
	}
	:global(.copy > p) {
		font-family: var(--theme-font-paragraph);
	}
	:global(.copy > ul li) {
		list-style-type: circle;
	}
</style>
