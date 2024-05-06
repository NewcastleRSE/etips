<script lang="ts">
	import type { Card } from '$lib/types'
	import type { DirectusFile } from '@directus/sdk'
	import CardText from './card_text.svelte'
	export let card: Card
	export let display: string
	export let direction: 'horizontal' | 'vertical' = 'vertical'
	$: media = card.media.reduce((acc: DirectusFile[], m) => {
		if (m && m.directus_files_id && typeof m.directus_files_id !== 'string') {
			const file = m.directus_files_id
			acc.push(file)
		}
		return acc
	}, [])
</script>

<!-- class="media-card flex flex-col gap-2 p-4 lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:p-8" -->
<div
	class:card-cards={display === 'cards'}
	class:card-list={display === 'list'}
	class:card-continuous={display === 'continuous'}
	class="media-card flex flex-col gap-4 p-4 lg:p-8"
>
	<!-- <CardText {card}></CardText> -->
	<div
		class="media-card-left-col"
		class:horizontal={direction === 'horizontal'}
		class:vertical={direction === 'vertical'}
	>
		<div class="gallery flex h-64 snap-x snap-mandatory gap-4 overflow-x-scroll">
			{#each media as m}
				<div
					class="gallery-child flex h-full w-full flex-shrink-0 snap-center items-center justify-center"
				>
					<img class="h-full object-contain" src="/assets/{m.id}" alt="" />
				</div>
			{:else}
				<div class="h-full bg-slate-300 w-full h-full flex justify-center items-center font-mono">
					<p class="-rotate-45">insert image here</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="media-card-right-col">
		<CardText nested {card}></CardText>
	</div>
</div>

<style>
	.card-list {
		background-color: var(--theme-colour-1);
		border-top: 1px solid var(--theme-colour-5);
	}
	.card-list:nth-child(1) {
		border-top: none;
	}
	.card-list:last-child {
		border-bottom: 1px solid var(--theme-colour-5);
	}
	.card-continuous {
		margin: 1.5rem 0;
	}
	.card-cards {
		margin: 1rem 0;
		border-radius: 0.5rem;
		background-color: var(--theme-colour-1);
		border: 1px solid var(--theme-colour-5);
	}
</style>
