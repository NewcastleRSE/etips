<script lang="ts">
	import type { Card } from '$lib/types'
	export let card: Card
	export let display = 'cards'
	export let nested = false
</script>

<div
	class:card-cards={display === 'cards'}
	class:card-list={display === 'list'}
	class:card-continuous={display === 'continuous'}
	class="card-text"
	class:nested
>
	<h3 class:hidden={!card.title} class="mb-2 mt-4 font-bold">{card.title}</h3>
	<h4 class:hidden={!card.subtitle} class="mb-2 font-semibold">{card.subtitle}</h4>
	<p class:hidden={!card.copy || card.copy === ''} class="prose-sm">{@html card.copy}</p>
</div>

<style>
	.card-text {
		color: var(--theme-colour-3);
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
</style>
