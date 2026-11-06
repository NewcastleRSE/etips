<script lang="ts">
	import type { Card } from '$lib/types'
	export let card: Card
</script>

{#if card.transcript}
	<section class="card-transcript" aria-labelledby="transcript-{card.id}">
		<h4 id="transcript-{card.id}" class="mb-2 text-lg md:text-xl">
			Transcript{card.title ? `: ${card.title}` : ''}
		</h4>
		<!-- Scrolls on its own so the video stays in view. tabindex lets keyboard users scroll it -->
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="transcript-text copy prose-sm lg:prose-base"
			tabindex="0"
			aria-labelledby="transcript-{card.id}"
		>
			{@html card.transcript}
		</div>
	</section>
{/if}

<style>
	.card-transcript {
		color: var(--theme-colour-3);
		border-top: 1px solid var(--theme-text-green);
		padding-top: 1rem;
	}
	.transcript-text {
		max-height: 16rem;
		overflow-y: auto;
		padding-right: 0.75rem;
	}
	/* Show the scrollbar so it's clear there's more text. app.html hides all scrollbars globally */
	.transcript-text {
		scrollbar-width: thin;
		scrollbar-color: var(--theme-text-green) var(--theme-colour-2);
	}
	/* Older Safari */
	.transcript-text::-webkit-scrollbar {
		width: 8px;
	}
	.transcript-text::-webkit-scrollbar-track {
		background: var(--theme-colour-2);
		border-radius: 4px;
	}
	.transcript-text::-webkit-scrollbar-thumb {
		background: var(--theme-text-green);
		border-radius: 4px;
	}
	.transcript-text:focus-visible {
		outline: 2px solid var(--theme-text-blue);
		outline-offset: 2px;
	}
</style>
