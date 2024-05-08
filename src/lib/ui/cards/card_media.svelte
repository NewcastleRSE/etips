<script lang="ts">
	import type { Card, CardsFile } from '$lib/types'
	import type { DirectusFile } from '@directus/sdk'
	import CardText from './card_text.svelte'
	import Vimeo from '../media/vimeo.svelte'
	export let card: Card
	export let display: string = 'cards'
	export let direction: 'horizontal' | 'vertical' = 'vertical'
	$: media =
		card.media?.reduce((acc, m) => {
			if (m && m.directus_files_id && typeof m.directus_files_id !== 'string') {
				const file = m.directus_files_id
				acc.push(file)
			}
			return acc
		}, [] as DirectusFile[]) || []
</script>

<div
	class:card-cards={display === 'cards'}
	class:card-list={display === 'list'}
	class:card-continuous={display === 'continuous'}
	class="media-card flex flex-col gap-4 p-4 lg:p-8"
>
	<div
		class="media-card-left-col"
		class:horizontal={direction === 'horizontal'}
		class:vertical={direction === 'vertical'}
	>
		{#if card.media_type === 'photo'}
			<div class="gallery flex snap-x snap-mandatory gap-4 overflow-x-scroll">
				{#each media as m, i}
					<!-- {@const custom_class = m.height > m.width ? 'w-full' : 'h-full'} -->
					<div
						class="gallery-child relative flex w-full flex-shrink-0 snap-center items-center justify-center"
					>
						<img class="h-full object-contain" src="/assets/{m.id}" alt="" />
						<!-- TODO: add IntersectionObserver -->
						<p
							class="absolute bottom-0 right-0 rounded-full bg-slate-600 px-2 text-white"
							class:hidden={media.length === 1}
						>
							{i + 1} of {media.length}
						</p>
					</div>
				{:else}
					<div class="h-64 bg-slate-300 w-full flex justify-center items-center font-mono">
						<p class="-rotate-45">insert image here</p>
					</div>
				{/each}
			</div>
		{/if}
		{#if card.media_type === 'youtube'}
			<iframe src={card.url} title={card.title ?? ''} class="aspect-video w-full"></iframe>
		{/if}
		{#if card.media_type === 'vimeo'}
			<Vimeo video_id={card.url?.replaceAll('https://vimeo.com/', '')}></Vimeo>
		{/if}
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
	.media-card {
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
	.gallery {
		max-height: 50lvh;
	}
</style>
