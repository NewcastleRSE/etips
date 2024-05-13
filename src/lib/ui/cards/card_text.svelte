<script lang="ts">
	import type { Card } from '$lib/types'
	export let card: Card
	export let display = 'cards'
	export let nested = false
</script>

{#if card}
	<div
		class:card-cards={display === 'cards'}
		class:card-list={display === 'list'}
		class:card-continuous={display === 'continuous'}
		class="card-text"
		class:nested
	>
		{#if card.title || card.subtitle}
			<div class="text-title-container mb-4">
				<h3 class:hidden={!card.title} class="mb-2 text-xl md:text-2xl">{card.title}</h3>
				<h4 class:hidden={!card.subtitle} class="text-xl">{card.subtitle}</h4>
			</div>
		{/if}
		<div class:hidden={!card.copy || card.copy === ''} class="copy prose-sm lg:prose-base">
			{@html card.copy
				?.replaceAll('LEFT', '<strong>LEFT</strong>')
				.replaceAll('RIGHT', '<strong>RIGHT</strong>')}
		</div>
	</div>
{/if}

<style>
	.card-text {
		color: var(--theme-colour-3);
	}
	.card-text:not(.nested) {
		animation: appear 0.3s ease-in-out forwards;
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
	.card-text:not(.nested) {
		padding: 1rem;
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
	@media (min-width: 768px) {
		.card-text:not(.nested) {
			padding: 2rem;
		}
	}
	h3 {
		font-family: var(--theme-font-title-2);
		font-weight: 700;
	}
	h4 {
		font-family: var(--theme-font-subtitle);
		font-weight: 400;
	}
	p {
		font-family: var(--theme-font-paragraph);
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
